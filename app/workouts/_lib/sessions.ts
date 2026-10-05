// Firestore persistence for generated sessions.
//
// Layout (no composite indexes needed):
//   workoutUsers/{uid}                 meta: email, lastScheme, lastPrimaryLift,
//                                      lastDroppedPool, sessionCount, updatedAt
//   workoutUsers/{uid}/sessions/{id}   one document per saved session

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { getFirebase } from '../../playoffhockey/_lib/firebase';
import { startingLoad } from './startingLoads';
import {
  EMPTY_META,
  type LastPerformance,
  type PlannedExercise,
  type PlannedSession,
  type Pool,
  type PrimaryLift,
  type Role,
  type Scheme,
  type SessionMeta,
} from './generator';

export interface SetEntry {
  weight: number | null;
  reps: number | null;
  done: boolean;
}

export interface SessionExercise extends PlannedExercise {
  sets: SetEntry[];
}

export interface WorkoutSession {
  id?: string;
  uid: string;
  email: string;
  date: string; // YYYY-MM-DD local
  startedAt: string; // ISO
  completedAt: string | null;
  scheme: Scheme;
  primaryLift: PrimaryLift;
  seed: number;
  reroll: number;
  droppedPools: Pool[];
  exercises: SessionExercise[];
  notes: string;
  durationMin: number | null;
  createdAt: string;
  /** 'generated' (Today tab) or 'freeform' (Log tab). Missing = generated. */
  source?: 'generated' | 'freeform';
  location?: string | null;
  /** Freeform entries: the notes exactly as typed. Structured elsewhere. */
  rawText?: string;
  /** Optional air bike intervals after the session. */
  finisher?: Finisher | null;
}

export interface Finisher {
  kind: 'air-bike-intervals';
  workSec: number;
  restSec: number;
  rounds: number;
}

export const FINISHER_PLAN = { workSec: 20, restSec: 70, startRounds: 6, maxRounds: 10 } as const;

/** Rounds from the most recent session that logged a finisher. */
export function lastFinisher(sessions: WorkoutSession[]): { date: string; rounds: number } | null {
  for (const s of sessions) {
    if (s.finisher && s.finisher.rounds > 0) return { date: s.date, rounds: s.finisher.rounds };
  }
  return null;
}

function userRef(uid: string) {
  return doc(getFirebase().db, 'workoutUsers', uid);
}

function sessionsRef(uid: string) {
  return collection(getFirebase().db, 'workoutUsers', uid, 'sessions');
}

export async function loadMeta(uid: string): Promise<SessionMeta> {
  const snap = await getDoc(userRef(uid));
  if (!snap.exists()) return EMPTY_META;
  const d = snap.data();
  return {
    lastScheme: (d.lastScheme as Scheme | undefined) ?? null,
    lastPrimaryLift: (d.lastPrimaryLift as PrimaryLift | undefined) ?? null,
    lastDroppedPool: (d.lastDroppedPool as Pool | undefined) ?? null,
    sessionCount: typeof d.sessionCount === 'number' ? d.sessionCount : 0,
  };
}

export async function listSessions(uid: string, n = 30): Promise<WorkoutSession[]> {
  const q = query(sessionsRef(uid), orderBy('createdAt', 'desc'), limit(n));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...(d.data() as WorkoutSession), id: d.id }));
}

/** Firestore rejects `undefined`; a JSON round-trip strips it. */
function clean<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export async function saveSession(session: WorkoutSession): Promise<string> {
  const data: WorkoutSession = { ...session };
  delete data.id;
  const ref = await addDoc(sessionsRef(session.uid), clean(data));
  // Freeform sessions count, but they don't advance the scheme rotation:
  // the next generated session should still be the one the rotation owed.
  const rotation =
    session.source === 'freeform'
      ? {}
      : {
          lastScheme: session.scheme,
          lastPrimaryLift: session.primaryLift,
          lastDroppedPool: session.droppedPools[0] ?? null,
        };
  await setDoc(
    userRef(session.uid),
    {
      email: session.email,
      ...rotation,
      sessionCount: increment(1),
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
  return ref.id;
}

/**
 * Best logged set for an exercise from the most recent comparable session.
 * Comparable means the same role and, for core and accessory work, the same
 * scheme: a heavy-day 4 x 5 says nothing useful about a volume-day 3 x 12,
 * and the light 2 x 8 secondary squat shouldn't set the primary squat load.
 * Secondary work is always 2 x 8, so it matches across schemes.
 */
export function lastPerformance(
  sessions: WorkoutSession[],
  exerciseId: string,
  role: Role,
  scheme: Scheme
): LastPerformance | null {
  for (const s of sessions) {
    if (s.source === 'freeform') continue;
    if (role !== 'secondary' && s.scheme !== scheme) continue;
    const ex = s.exercises.find((e) => e.id === exerciseId && e.role === role);
    if (!ex) continue;
    const done = ex.sets.filter((set) => set.done && set.reps !== null);
    if (done.length === 0) continue;
    let bestWeight: number | null = null;
    let bestReps: number | null = null;
    for (const set of done) {
      const w = set.weight ?? 0;
      const bw = bestWeight ?? -1;
      if (w > bw || (w === bw && (set.reps ?? 0) > (bestReps ?? 0))) {
        bestWeight = set.weight ?? 0;
        bestReps = set.reps;
      }
    }
    const hitTopAllSets = done.length >= ex.targetSets && done.every((set) => (set.reps ?? 0) >= ex.repMax);
    return { date: s.date, bestWeight, bestReps, hitTopAllSets };
  }
  return null;
}

/** Turn a plan into editable exercises, prefilling weight from the last
 *  comparable session, or from the starting loads if there isn't one. */
export function toSessionExercises(planned: PlannedSession, history: WorkoutSession[]): SessionExercise[] {
  return planned.exercises.map((ex) => {
    const last = lastPerformance(history, ex.id, ex.role, planned.scheme);
    const weight = last?.bestWeight ?? startingLoad(ex.id, ex.role, planned.scheme);
    const sets: SetEntry[] = Array.from({ length: ex.targetSets }, () => ({
      weight,
      reps: null,
      done: false,
    }));
    return { ...ex, sets };
  });
}

export function todayLocal(): string {
  // en-CA formats as YYYY-MM-DD.
  return new Date().toLocaleDateString('en-CA');
}
