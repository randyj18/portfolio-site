import { NextResponse } from 'next/server';
import { getAdmin } from '@/app/playoffhockey/_lib/firebaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

type Position = 'F' | 'D' | 'G';
type NHLPlayerDoc = { id: string; position: Position };

type SkaterGame = { goals?: number; assists?: number };
type GoalieGame = {
  decision?: string;
  goalsAgainst?: number;
  toi?: string;
};
type GameLogResponse = { gameLog?: (SkaterGame & GoalieGame)[] };

const CONCURRENCY = 2;
const REQUEST_TIMEOUT_MS = 5000;
const THROTTLE_MS = 400;
const CHUNK_SIZE = 30;
const INTER_CHUNK_PAUSE_MS = 1500;
const RATE_LIMIT_RETRIES = 2;
const RATE_LIMIT_BACKOFF_MS = 2000;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function poolSeasonId(year: number): string {
  return `${year - 1}${year}`;
}

function parseToiToSeconds(toi: string | undefined): number {
  if (!toi) return 0;
  const [m, s] = toi.split(':').map(Number);
  if (Number.isNaN(m) || Number.isNaN(s)) return 0;
  return m * 60 + s;
}

type StatRow = {
  nhlPlayerId: string;
  goals: number;
  assists: number;
  wins: number;
  shutouts: number;
};
type Result = { ok: true; stat: StatRow } | { ok: false; id: string; error: string };

async function fetchPlayerStats(
  player: NHLPlayerDoc,
  seasonId: string,
  gameType: 2 | 3
): Promise<Result> {
  const url = `https://api-web.nhle.com/v1/player/${player.id}/game-log/${seasonId}/${gameType}`;
  let attempt = 0;
  while (true) {
    try {
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
      let res: Response;
      try {
        res = await fetch(url, { cache: 'no-store', signal: ctrl.signal });
      } finally {
        clearTimeout(timeout);
      }
      if (res.status === 404) {
        return {
          ok: true,
          stat: { nhlPlayerId: player.id, goals: 0, assists: 0, wins: 0, shutouts: 0 },
        };
      }
      if (res.status === 429 && attempt < RATE_LIMIT_RETRIES) {
        attempt++;
        await sleep(RATE_LIMIT_BACKOFF_MS * attempt);
        continue;
      }
      if (!res.ok) return { ok: false, id: player.id, error: `HTTP ${res.status}` };
      const data: GameLogResponse = await res.json();
      const games = data.gameLog ?? [];
      const stat: StatRow = {
        nhlPlayerId: player.id,
        goals: 0,
        assists: 0,
        wins: 0,
        shutouts: 0,
      };
      for (const g of games) {
        if (player.position === 'G') {
          if (g.decision === 'W') stat.wins++;
          const toi = parseToiToSeconds(g.toi);
          if (typeof g.goalsAgainst === 'number' && g.goalsAgainst === 0 && toi >= 3000) {
            stat.shutouts++;
          }
        } else {
          stat.goals += g.goals ?? 0;
          stat.assists += g.assists ?? 0;
        }
      }
      return { ok: true, stat };
    } catch (e) {
      return { ok: false, id: player.id, error: e instanceof Error ? e.message : 'fetch' };
    }
  }
}

async function runPool<T, R>(
  items: T[],
  worker: (item: T) => Promise<R>,
  concurrency: number
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function run() {
    while (true) {
      const idx = next++;
      if (idx >= items.length) return;
      results[idx] = await worker(items[idx]);
      await sleep(THROTTLE_MS);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, run));
  return results;
}

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = req.headers.get('authorization') ?? '';
  return header === `Bearer ${secret}`;
}

async function activeSeason(): Promise<{ year: number; gameType: 2 | 3 } | null> {
  const { db } = getAdmin();
  const snap = await db
    .collection('seasons')
    .where('status', 'in', ['playoffs', 'mid-draft', 'initial-draft'])
    .get();
  if (snap.empty) return null;
  const docs = snap.docs.map((d) => d.data() as { year: number; status: string });
  docs.sort((a, b) => b.year - a.year);
  const top = docs[0];
  const gameType: 2 | 3 = top.status === 'initial-draft' ? 2 : 3;
  return { year: top.year, gameType };
}

async function handle(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  try {
    const active = await activeSeason();
    if (!active) {
      return NextResponse.json({ skipped: 'no active season' });
    }
    const { year, gameType } = active;
    const { db } = getAdmin();
    const playersSnap = await db.collection('nhlPlayers').get();
    const players: NHLPlayerDoc[] = playersSnap.docs.map((d) => {
      const data = d.data() as { id?: string; position: Position };
      return { id: data.id ?? d.id, position: data.position };
    });
    if (players.length === 0) {
      return NextResponse.json({ skipped: 'no players synced' });
    }

    const seasonId = poolSeasonId(year);
    const stats: StatRow[] = [];
    const failed: { id: string; error: string }[] = [];
    for (let i = 0; i < players.length; i += CHUNK_SIZE) {
      const chunk = players.slice(i, i + CHUNK_SIZE);
      const results = await runPool(
        chunk,
        (p) => fetchPlayerStats(p, seasonId, gameType),
        CONCURRENCY
      );
      for (const r of results) {
        if (r.ok === true) {
          stats.push(r.stat);
          continue;
        }
        failed.push({ id: r.id, error: r.error });
      }
      if (i + CHUNK_SIZE < players.length) {
        await sleep(INTER_CHUNK_PAUSE_MS);
      }
    }

    const subcollection = gameType === 3 ? 'playerStats' : 'regularSeasonStats';
    const now = Date.now();
    const chunkSize = 400;
    for (let i = 0; i < stats.length; i += chunkSize) {
      const batch = db.batch();
      for (const s of stats.slice(i, i + chunkSize)) {
        const ref = db
          .collection('seasons')
          .doc(String(year))
          .collection(subcollection)
          .doc(s.nhlPlayerId);
        batch.set(ref, { ...s, lastUpdated: now });
      }
      await batch.commit();
    }

    await db
      .collection('seasons')
      .doc(String(year))
      .collection('auditLog')
      .add({
        action: 'stats-synced',
        actorUid: 'cron',
        actorEmail: 'cron',
        details: {
          gameType,
          count: stats.length,
          failed: failed.length,
          seasonId,
        },
        createdAt: now,
      });

    return NextResponse.json({
      year,
      gameType,
      seasonId,
      count: stats.length,
      failed: failed.length,
      sampleFailures: failed.slice(0, 5),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'unknown';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}
