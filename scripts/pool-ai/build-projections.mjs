/**
 * Build per-player projected playoff points from:
 *   - Firestore regular-season stats (seasons/{year}/regularSeasonStats)
 *   - Firestore player roster (nhlPlayers)
 *   - MoneyPuck snapshot (scripts/pool-ai/data/moneypuck-*.json)
 *
 * Output: public/playoff-pool/projections.json (static, consumed by UI)
 *
 * Skater projection:
 *   projectedPoints = PPG × PLAYOFF_DECAY × E[GP_team]
 * with regression for small sample sizes.
 *
 * Goalie projection:
 *   projectedWinsPts = E[team wins] × 2 × starterShare
 *   (shutouts ignored for v1; adjust starterShare manually via override file)
 *
 * Usage: node scripts/pool-ai/build-projections.mjs [year] [snapshotFile]
 *   year default 2026
 *   snapshot default data/moneypuck-2026-04-15.json
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAdminDb } from './lib/firebase.mjs';
import { expectedGamesPlayed, expectedTeamWins, perRoundBreakdown } from './lib/odds.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const YEAR = parseInt(process.argv[2] || '2026', 10);
const SNAPSHOT = process.argv[3] || 'data/moneypuck-2026-04-15.json';

const PLAYOFF_DECAY = 0.83;          // league-wide playoff PPG / regular PPG
const MIN_GP_FOR_FULL_TRUST = 40;    // below this, regress toward position mean
const REGRESSION_PRIOR = {           // anchor PPG if GP very low
  F: 0.35,
  D: 0.22,
  G: 0,
};

// Optional per-goalie starter-share override (manually edited)
const GOALIE_STARTER_PATH = path.join(__dirname, 'data/goalie-starter-share.json');

function loadStarterShare() {
  if (!existsSync(GOALIE_STARTER_PATH)) return {};
  return JSON.parse(readFileSync(GOALIE_STARTER_PATH, 'utf8'));
}

function regressedPPG(ppgRaw, gp, position) {
  if (gp >= MIN_GP_FOR_FULL_TRUST) return ppgRaw;
  const prior = REGRESSION_PRIOR[position] ?? 0.3;
  const weight = gp / MIN_GP_FOR_FULL_TRUST;
  return weight * ppgRaw + (1 - weight) * prior;
}

async function main() {
  const db = getAdminDb();

  const snapshotPath = path.join(__dirname, SNAPSHOT);
  const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8'));
  const teamByAbbr = new Map(snapshot.teams.map((t) => [t.abbr, t]));

  console.log(`Loading nhlPlayers...`);
  const playersSnap = await db.collection('nhlPlayers').get();
  const players = playersSnap.docs.map((d) => ({
    id: d.data().id ?? d.id,
    fullName: d.data().fullName,
    position: d.data().position,
    nhlTeam: d.data().nhlTeam,
  }));
  console.log(`  ${players.length} players`);

  console.log(`Loading regular-season stats for ${YEAR}...`);
  const rsSnap = await db
    .collection('seasons')
    .doc(String(YEAR))
    .collection('regularSeasonStats')
    .get();
  const rs = new Map();
  rsSnap.docs.forEach((d) => {
    const s = d.data();
    rs.set(s.nhlPlayerId ?? d.id, s);
  });
  console.log(`  ${rs.size} stat rows`);

  // Pull actual games-played from NHL game log length via regularSeasonStats?
  // Our regularSeasonStats shape doesn't include GP — we use goals+assists
  // divided by an inferred GP. Since we never stored GP, approximate it from
  // total points with a rough league-avg PPG anchor; allow override by team.
  // FIX-UP: if we don't have GP, fall back to "use full-season PPG assuming
  // 82 GP × position-adjusted activity ratio." A cleaner next step is to
  // extend the stats schema to store GP directly.
  // For v1, we approximate GP = 82 × (skaters), 55 × (goalies). This is
  // only used if no better source is available.
  const APPROX_GP = { F: 82, D: 82, G: 55 };

  const starterShare = loadStarterShare();

  const teamMeta = {};
  for (const t of snapshot.teams) {
    teamMeta[t.abbr] = {
      ...t,
      eGamesPlayed: expectedGamesPlayed(t),
      eWins: expectedTeamWins(t),
      rounds: perRoundBreakdown(t),
    };
  }

  const projections = [];
  for (const p of players) {
    const team = teamByAbbr.get(p.nhlTeam);
    if (!team) continue; // team didn't make playoffs
    const s = rs.get(p.id);
    const goals = s?.goals ?? 0;
    const assists = s?.assists ?? 0;
    const wins = s?.wins ?? 0;
    const approxGp = APPROX_GP[p.position] ?? 82;
    const rsPoints = goals + assists;
    const ppgRaw = rsPoints / approxGp;

    const eGp = expectedGamesPlayed(team);
    const eTeamWins = expectedTeamWins(team);

    let projected = 0;
    let expectedDetail = {};
    if (p.position === 'G') {
      const share = starterShare[p.id] ?? starterShare[p.fullName] ?? null;
      // If no override, crude heuristic: assume one starter per team, the
      // goalie with the most regular-season wins gets share=1, others 0.
      expectedDetail = {
        rsWins: wins,
        rsSaves: null,
        eTeamWins,
        starterShareOverride: share,
      };
      // Projection computed in a 2nd pass after we know team top-W goalie.
      projections.push({
        id: p.id,
        fullName: p.fullName,
        position: 'G',
        team: p.nhlTeam,
        projected: null, // filled below
        ppgAdj: null,
        eGp,
        eTeamWins,
        _goalieWinsRS: wins,
        detail: expectedDetail,
      });
      continue;
    }
    const ppgAdj = regressedPPG(ppgRaw, approxGp, p.position) * PLAYOFF_DECAY;
    projected = ppgAdj * eGp;
    expectedDetail = {
      rsGoals: goals,
      rsAssists: assists,
      rsPoints,
      rsPPG: ppgRaw,
      ppgAdjusted: ppgAdj,
    };
    projections.push({
      id: p.id,
      fullName: p.fullName,
      position: p.position,
      team: p.nhlTeam,
      projected,
      ppgAdj,
      eGp,
      eTeamWins,
      detail: expectedDetail,
    });
  }

  // Goalie second pass: per team, whoever has the most RS wins gets
  // starterShare = 1 unless overridden.
  const goaliesByTeam = new Map();
  for (const row of projections) {
    if (row.position !== 'G') continue;
    const list = goaliesByTeam.get(row.team) ?? [];
    list.push(row);
    goaliesByTeam.set(row.team, list);
  }
  for (const [, list] of goaliesByTeam) {
    list.sort((a, b) => (b._goalieWinsRS ?? 0) - (a._goalieWinsRS ?? 0));
    list.forEach((g, idx) => {
      const override = g.detail.starterShareOverride;
      const share = override !== null && override !== undefined ? override : idx === 0 ? 1 : 0;
      g.projected = (g.eTeamWins ?? 0) * 2 * share;
      g.detail.starterShareApplied = share;
      delete g._goalieWinsRS;
    });
  }

  projections.sort((a, b) => (b.projected ?? 0) - (a.projected ?? 0));

  const out = {
    generatedAt: new Date().toISOString(),
    year: YEAR,
    snapshot: path.basename(snapshotPath),
    params: {
      AVG_SERIES_LEN: 5.8,
      PLAYOFF_DECAY,
      MIN_GP_FOR_FULL_TRUST,
      REGRESSION_PRIOR,
    },
    teams: teamMeta,
    projections,
  };

  const outPath = path.resolve(__dirname, '../../public/playoff-pool/projections.json');
  writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`Wrote ${projections.length} projections → ${outPath}`);

  // Top-20 preview
  console.log(`\nTop 20 by projected points:`);
  for (const p of projections.slice(0, 20)) {
    console.log(
      `  ${String(p.projected ?? 0).padStart(6).slice(0, 6)}  ${p.position}  ${p.team}  ${p.fullName}`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
