/**
 * Fetch current draft state and emit JSON to stdout + write to
 * scripts/pool-ai/data/state-latest.json for convenience.
 *
 * Usage: node scripts/pool-ai/fetch-state.mjs [year]
 */

import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAdminDb } from './lib/firebase.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const YEAR = parseInt(process.argv[2] || '2026', 10);

async function main() {
  const db = getAdminDb();
  const yearStr = String(YEAR);

  const seasonDoc = await db.collection('seasons').doc(yearStr).get();
  const season = seasonDoc.exists ? seasonDoc.data() : null;

  const partsSnap = await db.collection('seasons').doc(yearStr).collection('participants').get();
  const participants = partsSnap.docs.map((d) => d.data());

  const picksSnap = await db
    .collection('seasons')
    .doc(yearStr)
    .collection('draftPicks')
    .get();
  const picks = picksSnap.docs
    .map((d) => ({ ...d.data(), id: d.id }))
    .sort((a, b) => (a.pickNumber ?? 0) - (b.pickNumber ?? 0));

  const bankedSnap = await db
    .collection('seasons')
    .doc(yearStr)
    .collection('bankedPicks')
    .get();
  const banked = bankedSnap.docs.map((d) => ({ ...d.data(), id: d.id }));

  const biasSnap = await db
    .collection('seasons')
    .doc(yearStr)
    .collection('marketBias')
    .get();
  const marketBias = biasSnap.docs.map((d) => ({ ...d.data(), nhlPlayerId: d.id }));

  // Derive next pick (initial draft only for now).
  let nextPick = null;
  if (season?.status === 'initial-draft' && Array.isArray(season.draftOrder)) {
    const n = season.draftOrder.length;
    const made = picks.filter((p) => p.draftedInRound === 0).length;
    const round = Math.floor(made / n);
    const idxInRound = made % n;
    const row = round % 2 === 0 ? season.draftOrder : [...season.draftOrder].reverse();
    nextPick = {
      pickNumber: made + 1,
      round: round + 1,
      participantUid: row[idxInRound],
    };
  }

  const byParticipant = {};
  for (const p of participants) {
    byParticipant[p.uid] = {
      teamName: p.teamName ?? p.displayName,
      displayName: p.displayName,
      picks: [],
    };
  }
  for (const pk of picks) {
    const t = byParticipant[pk.participantUid];
    if (t) t.picks.push(pk);
  }

  const out = {
    fetchedAt: new Date().toISOString(),
    year: YEAR,
    season,
    nextPick,
    participants,
    picksMade: picks.length,
    picks,
    bankedPicks: banked,
    marketBias,
    rosters: byParticipant,
  };

  const outPath = path.join(__dirname, 'data/state-latest.json');
  writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
  console.error(`\n[wrote ${outPath}]`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
