export type Position = 'F' | 'D' | 'G';
export type NHLRound = 1 | 2 | 3 | 4;
export type DraftRound = 0 | 2 | 3 | 4;

export interface Season {
  year: number;
  status: 'setup' | 'initial-draft' | 'playoffs' | 'mid-draft' | 'complete';
  currentNHLRound: NHLRound;
  commissionerUid: string;
  createdAt: number;
  lockedAt?: number;
  eliminatedTeams?: string[];
  draftOrder?: string[];
  // Snapshotted when commissioner starts a mid-draft. Reverse-standings
  // order (worst team first) for the current round's regular picks.
  midDraftOrder?: string[];
  // Maps a participant's uid → list of uids allowed to draft on their behalf.
  draftDelegates?: Record<string, string[]>;
}

export interface Participant {
  uid: string;
  displayName: string;
  email: string;
  teamName?: string;
  joinedAt: number;
}

export interface NHLPlayer {
  id: string;
  fullName: string;
  position: Position;
  nhlTeam: string;
}

export interface DraftPick {
  id: string;
  participantUid: string;
  nhlPlayerId: string;
  draftedInRound: DraftRound;
  pickNumber: number;
  acquiredAt: number;
  pointsBeforeAcquiring: number;
  droppedAt?: number;
  replacedByPickId?: string;
  usedBankedPickFromRound?: 0 | 2 | 3;
}

export interface BankedPick {
  id: string;
  participantUid: string;
  bankedInRound: 0 | 2 | 3;
  bankedAt: number;
  usedInRound?: 2 | 3 | 4;
}

export interface BonusPoints {
  id: string;
  nhlPlayerId: string;
  points: number;
  reason: string;
  addedByUid: string;
  addedAt: number;
}

export interface PlayerStats {
  nhlPlayerId: string;
  goals: number;
  assists: number;
  wins: number;
  shutouts: number;
  lastUpdated: number;
}

export type AuditAction =
  | 'team-eliminated'
  | 'team-reinstated'
  | 'mid-draft-started'
  | 'mid-draft-finished'
  | 'season-completed'
  | 'bonus-added'
  | 'stats-synced';

export interface AuditEntry {
  id: string;
  action: AuditAction;
  actorUid: string;
  actorEmail: string;
  details: Record<string, string | number | boolean | null>;
  createdAt: number;
}

export interface MarketBias {
  nhlPlayerId: string;
  bias: number;
  reason?: string;
  updatedAt: number;
}
