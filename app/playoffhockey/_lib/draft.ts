import type { Position, DraftPick, NHLPlayer } from './types';

export const INITIAL_DRAFT_ROUNDS = 7;
export const ROSTER_SIZE = 7;
export const ROSTER_MIN = { F: 3, D: 2, G: 1 } as const;
export const ROSTER_MAX = { F: 4, D: 3, G: 1 } as const;

export type RosterCounts = { F: number; D: number; G: number };

export function countByPosition(
  picks: DraftPick[],
  players: Map<string, NHLPlayer>
): RosterCounts {
  const counts: RosterCounts = { F: 0, D: 0, G: 0 };
  for (const pick of picks) {
    if (pick.droppedAt) continue;
    const player = players.get(pick.nhlPlayerId);
    if (!player) continue;
    counts[player.position]++;
  }
  return counts;
}

export function canPickPosition(
  current: RosterCounts,
  position: Position,
  picksMadeSoFar: number
): boolean {
  const next = { ...current, [position]: current[position] + 1 };
  if (next.F > ROSTER_MAX.F) return false;
  if (next.D > ROSTER_MAX.D) return false;
  if (next.G > ROSTER_MAX.G) return false;
  const remaining = ROSTER_SIZE - picksMadeSoFar - 1;
  const stillNeeded =
    Math.max(0, ROSTER_MIN.F - next.F) +
    Math.max(0, ROSTER_MIN.D - next.D) +
    Math.max(0, ROSTER_MIN.G - next.G);
  return remaining >= stillNeeded;
}

export interface ScheduledPick {
  pickNumber: number;
  round: number;
  participantUid: string;
}

export function computeInitialDraftSchedule(draftOrder: string[]): ScheduledPick[] {
  const schedule: ScheduledPick[] = [];
  const n = draftOrder.length;
  for (let round = 0; round < INITIAL_DRAFT_ROUNDS; round++) {
    const rowOrder = round % 2 === 0 ? draftOrder : [...draftOrder].reverse();
    for (let i = 0; i < n; i++) {
      schedule.push({
        pickNumber: round * n + i + 1,
        round,
        participantUid: rowOrder[i],
      });
    }
  }
  return schedule;
}

export function nextOpenPickNumber(
  initialPicks: DraftPick[],
  totalSlots: number
): number {
  const filled = new Set(
    initialPicks.filter((p) => p.draftedInRound === 0).map((p) => p.pickNumber)
  );
  for (let n = 1; n <= totalSlots; n++) {
    if (!filled.has(n)) return n;
  }
  return -1;
}
