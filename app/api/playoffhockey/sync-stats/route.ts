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

const CONCURRENCY = 12;

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
): Promise<PlayerStat> {
  const stat: PlayerStat = {
    nhlPlayerId: player.id,
    goals: 0,
    assists: 0,
    wins: 0,
    shutouts: 0,
  };
  try {
    const url = `https://api-web.nhle.com/v1/player/${player.id}/game-log/${seasonId}/${gameType}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return stat;
    const data: GameLogResponse = await res.json();
    const games = data.gameLog ?? [];
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
  } catch {
    // Tolerate individual failures; player just gets zeros.
  }
  return stat;
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
    const stats = await runPool(
      players,
      (p) => fetchPlayerStats(p, seasonId, gameType),
      CONCURRENCY
    );
    return NextResponse.json({
      stats,
      count: stats.length,
      seasonId,
      gameType,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
