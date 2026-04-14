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
