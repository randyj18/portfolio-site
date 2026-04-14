import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

type Position = 'F' | 'D' | 'G';
type PlayerInput = { id: string; position: Position };
type PlayerStat = {
  nhlPlayerId: string;
  goals: number;
  assists: number;
  wins: number;
  shutouts: number;
};

type SkaterGame = {
  goals?: number;
  assists?: number;
};
type GoalieGame = {
  decision?: 'W' | 'L' | 'O' | string;
  goalsAgainst?: number;
  shutouts?: number;
  toi?: string;
};
type GameLogResponse = {
  gameLog?: (SkaterGame & GoalieGame)[];
};

const CONCURRENCY = 5;
const MAX_ATTEMPTS = 3;
const BASE_BACKOFF_MS = 1000;
const REQUEST_TIMEOUT_MS = 6000;

type PlayerResult =
  | { ok: true; stat: PlayerStat }
  | { ok: false; id: string; error: string };

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

async function fetchPlayerStats(
  player: PlayerInput,
  seasonId: string,
  gameType: 2 | 3
): Promise<PlayerResult> {
  const url = `https://api-web.nhle.com/v1/player/${player.id}/game-log/${seasonId}/${gameType}`;
  let lastError = 'unknown';
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
      let res: Response;
      try {
        res = await fetch(url, { cache: 'no-store', signal: ctrl.signal });
      } finally {
        clearTimeout(timeout);
      }
      // 404 is a legitimate "no games played" for this player/season/type.
      if (res.status === 404) {
        return {
          ok: true,
          stat: {
            nhlPlayerId: player.id,
            goals: 0,
            assists: 0,
            wins: 0,
            shutouts: 0,
          },
        };
      }
      if (!res.ok) {
        lastError = `HTTP ${res.status}`;
        if (res.status === 429) {
          const retryAfter = res.headers.get('Retry-After');
          if (retryAfter) {
            const waitSecs = parseInt(retryAfter, 10);
            if (!isNaN(waitSecs) && waitSecs > 0) {
              await sleep(waitSecs * 1000);
              continue;
            }
          }
        }
      } else {
        const data: GameLogResponse = await res.json();
        const games = data.gameLog ?? [];
        const stat: PlayerStat = {
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
            if (
              typeof g.goalsAgainst === 'number' &&
              g.goalsAgainst === 0 &&
              toi >= 3000
            ) {
              stat.shutouts++;
            }
          } else {
            stat.goals += g.goals ?? 0;
            stat.assists += g.assists ?? 0;
          }
        }
        return { ok: true, stat };
      }
    } catch (e) {
      lastError = e instanceof Error ? e.message : 'fetch error';
    }
    if (attempt < MAX_ATTEMPTS) {
      const isRateLimit = lastError.includes('429');
      const jitter = Math.random() * 500;
      const backoff = isRateLimit 
        ? (2500 * attempt) + jitter 
        : (BASE_BACKOFF_MS * 2 ** (attempt - 1)) + jitter;
      await sleep(backoff);
    }
  }
  return { ok: false, id: player.id, error: lastError };
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
    }
  }
  await Promise.all(Array.from({ length: concurrency }, run));
  return results;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      year?: number;
      players?: PlayerInput[];
      gameType?: 2 | 3;
    };
    const year = body.year;
    const players = body.players;
    const gameType = body.gameType === 2 ? 2 : 3;
    if (!year || !Array.isArray(players) || players.length === 0) {
      return NextResponse.json(
        { error: 'Missing year or players' },
        { status: 400 }
      );
    }
    const seasonId = poolSeasonId(year);
    const results: PlayerResult[] = await runPool(
      players,
      (p): Promise<PlayerResult> => fetchPlayerStats(p, seasonId, gameType),
      CONCURRENCY
    );
    const stats: PlayerStat[] = [];
    const failed: { id: string; error: string }[] = [];
    for (const r of results) {
      if (r.ok === true) {
        stats.push(r.stat);
        continue;
      }
      failed.push({ id: r.id, error: r.error });
    }
    return NextResponse.json({
      stats,
      count: stats.length,
      failed,
      failedCount: failed.length,
      seasonId,
      gameType,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
