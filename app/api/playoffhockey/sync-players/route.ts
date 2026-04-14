import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PLAYOFF_TEAMS = [
  'BUF', 'TBL', 'MTL', 'CAR', 'PIT', 'PHI', 'BOS', 'OTT',
  'COL', 'DAL', 'MIN', 'VGK', 'EDM', 'ANA', 'UTA', 'LAK',
];

type NHLApiPlayer = {
  id: number;
  firstName: { default: string };
  lastName: { default: string };
  positionCode: 'C' | 'L' | 'R' | 'D' | 'G';
};

type NHLApiRoster = {
  forwards: NHLApiPlayer[];
  defensemen: NHLApiPlayer[];
  goalies: NHLApiPlayer[];
};

type Position = 'F' | 'D' | 'G';

function toPosition(code: string): Position {
  if (code === 'G') return 'G';
  if (code === 'D') return 'D';
  return 'F';
}

export async function GET() {
  try {
    const results = await Promise.all(
      PLAYOFF_TEAMS.map(async (team) => {
        const res = await fetch(
          `https://api-web.nhle.com/v1/roster/${team}/current`,
          { cache: 'no-store' }
        );
        if (!res.ok) {
          throw new Error(`${team}: HTTP ${res.status}`);
        }
        const data: NHLApiRoster = await res.json();
        const roster = [
          ...data.forwards,
          ...data.defensemen,
          ...data.goalies,
        ];
        return roster.map((p) => ({
          id: String(p.id),
          fullName: `${p.firstName.default} ${p.lastName.default}`,
          position: toPosition(p.positionCode),
          nhlTeam: team,
        }));
      })
    );

    const players = results.flat();
    return NextResponse.json({ players, count: players.length });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
