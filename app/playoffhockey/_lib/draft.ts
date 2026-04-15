import type { Position, DraftPick, NHLPlayer, BankedPick, PlayerStats } from './types';

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

export function fantasyPointsFor(
  player: NHLPlayer | undefined,
  stats: PlayerStats | undefined
): number {
  if (!player || !stats) return 0;
  if (player.position === 'G') return stats.wins * 2 + stats.shutouts;
  return stats.goals + stats.assists;
}

export function activeRosterCounts(
  picks: DraftPick[],
  players: Map<string, NHLPlayer>,
  eliminatedTeams: Set<string>
): RosterCounts {
  const counts: RosterCounts = { F: 0, D: 0, G: 0 };
  for (const pick of picks) {
    if (pick.droppedAt) continue;
    const player = players.get(pick.nhlPlayerId);
    if (!player) continue;
    if (eliminatedTeams.has(player.nhlTeam)) continue;
    counts[player.position]++;
  }
  return counts;
}

export function activePickCount(counts: RosterCounts): number {
  return counts.F + counts.D + counts.G;
}

// Mid-draft slot: either a banked pick being used, or a round-N regular pick.
export interface MidDraftSlot {
  slotNumber: number;
  type: 'banked' | 'regular';
  participantUid: string;
  round: 2 | 3 | 4;
  bankedPickId?: string;
  bankedFromRound?: 2 | 3;
}

export function computeMidDraftSchedule(
  round: 2 | 3 | 4,
  bankedPicks: BankedPick[],
  reverseStandingsOrder: string[]
): MidDraftSlot[] {
  const slots: MidDraftSlot[] = [];
  const unused = bankedPicks
    .filter((bp) => !bp.usedInRound)
    .sort((a, b) => a.bankedAt - b.bankedAt);
  for (const bp of unused) {
    slots.push({
      slotNumber: slots.length + 1,
      type: 'banked',
      participantUid: bp.participantUid,
      round,
      bankedPickId: bp.id,
      bankedFromRound: bp.bankedInRound as 2 | 3,
    });
  }
  for (const uid of reverseStandingsOrder) {
    slots.push({
      slotNumber: slots.length + 1,
      type: 'regular',
      participantUid: uid,
      round,
    });
  }
  return slots;
}

export function nextOpenMidDraftSlot(
  schedule: MidDraftSlot[],
  roundPicks: DraftPick[],
  usedBankedPickIds: Set<string>
): MidDraftSlot | null {
  const regularTaken = new Set(
    roundPicks
      .filter((p) => !p.usedBankedPickFromRound)
      .map((p) => p.participantUid)
  );
  for (const slot of schedule) {
    if (slot.type === 'banked') {
      if (!usedBankedPickIds.has(slot.bankedPickId!)) return slot;
    } else {
      if (!regularTaken.has(slot.participantUid)) return slot;
    }
  }
  return null;
}
