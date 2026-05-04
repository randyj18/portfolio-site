/**
 * Sync NHL playoff stats for every nhlPlayer into seasons/{year}/playerStats.
 * Equivalent to clicking "Sync playoff" in the dashboard, but server-side.
 *
 * Usage: node scripts/pool-ai/sync-playoff-stats.mjs [year]
 */

import { getAdminDb } from './lib/firebase.mjs';

const YEAR = parseInt(process.argv[2] || '2026', 10);
const SEASON_ID = `${YEAR - 1}${YEAR}`;
const CONCURRENCY = 1;
const THROTTLE_MS = 700;

function parseToi(t) {
  if (!t) return 0;
  const [m, s] = t.split(':').map(Number);
  return (m || 0) * 60 + (s || 0);
}

async function fetchPlayer(p) {
  const url = `https://api-web.nhle.com/v1/player/${p.id}/game-log/${SEASON_ID}/3`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (res.status === 404) {
      return { ok: true, stat: { nhlPlayerId: p.id, goals: 0, assists: 0, wins: 0, shutouts: 0 } };
    }
    if (!res.ok) return { ok: false, id: p.id, error: `HTTP ${res.status}` };
    const data = await res.json();
    const stat = { nhlPlayerId: p.id, goals: 0, assists: 0, wins: 0, shutouts: 0 };
    for (const g of data.gameLog || []) {
      if (p.position === 'G') {
        if (g.decision === 'W') stat.wins++;
        const toi = parseToi(g.toi);
        if (typeof g.goalsAgainst === 'number' && g.goalsAgainst === 0 && toi >= 3000) {
          stat.shutouts++;
        }
      } else {
        stat.goals += g.goals || 0;
        stat.assists += g.assists || 0;
      }
    }
    return { ok: true, stat };
  } catch (e) {
    return { ok: false, id: p.id, error: e.message || 'fetch error' };
  }
}

async function runPool(items, worker, concurrency) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (true) {
      const idx = next++;
      if (idx >= items.length) return;
      results[idx] = await worker(items[idx]);
      await new Promise((r) => setTimeout(r, THROTTLE_MS));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, run));
  return results;
}

async function main() {
  const db = getAdminDb();
  const playersSnap = await db.collection('nhlPlayers').get();
  const players = playersSnap.docs.map((d) => d.data()).map((p) => ({ id: p.id, position: p.position }));
  console.log(`Fetching playoff stats for ${players.length} players...`);

  const results = await runPool(players, fetchPlayer, CONCURRENCY);
  const ok = results.filter((r) => r.ok).map((r) => r.stat);
  const failed = results.filter((r) => !r.ok);
  console.log(`Got ${ok.length} ok, ${failed.length} failed`);
  if (failed.length) console.log('First failures:', failed.slice(0, 5));

  console.log(`Writing ${ok.length} rows to seasons/${YEAR}/playerStats...`);
  const now = Date.now();
  const BATCH = 400;
  for (let i = 0; i < ok.length; i += BATCH) {
    const batch = db.batch();
    for (const r of ok.slice(i, i + BATCH)) {
      batch.set(
        db.collection('seasons').doc(String(YEAR)).collection('playerStats').doc(r.nhlPlayerId),
        { ...r, lastUpdated: now }
      );
    }
    await batch.commit();
  }
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
