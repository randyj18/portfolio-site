// Full-body session generator.
//
// Design (agreed with Randy, 2026-09-16):
//  - Five fixed core slots every session: squat, hex-bar deadlift (or RDL as
//    the secondary hinge), pull-ups, flat barbell bench, decline DB press.
//  - Squat and hinge alternate as the primary lift session to session.
//    On hinge days the secondary squat is a light front squat, for
//    technique practice (Randy started front squats 2026-10-03).
//  - A forearm / elbow-care slot is never dropped: pulling, climbing and
//    muscle-ups all load the inner elbow (updated 2026-10-05).
//  - Rep scheme rotates A (heavy) -> B (moderate) -> C (volume).
//  - Accessory slots are filled one per muscle-group pool from a seeded
//    PRNG, filtered by available equipment. Only the accessories vary.
//
// Everything here is pure so it can be checked without a browser.

import { AVAILABLE, nextDumbbellUp, type EquipmentId } from './equipment';

export type Scheme = 'A' | 'B' | 'C';
export type PrimaryLift = 'squat' | 'hinge';
export type Role = 'core' | 'secondary' | 'accessory';
export type LoadType = 'barbell' | 'dumbbell' | 'bodyweight' | 'weighted-bodyweight' | 'cable' | 'band';
export type Pool =
  | 'core'
  | 'shoulders'
  | 'horizontal-pull'
  | 'rear-delts'
  | 'triceps'
  | 'biceps'
  | 'single-leg'
  | 'calves'
  | 'abs'
  | 'forearms';

export const ACCESSORY_POOLS: readonly Pool[] = [
  'shoulders',
  'horizontal-pull',
  'rear-delts',
  'triceps',
  'biceps',
  'single-leg',
  'calves',
  'abs',
  'forearms',
];

/** Pools that are never dropped, whatever the target count. */
export const PROTECTED_POOLS: readonly Pool[] = ['forearms'];

export const POOL_LABEL: Record<Pool, string> = {
  core: 'Core lift',
  shoulders: 'Shoulders',
  'horizontal-pull': 'Row',
  'rear-delts': 'Rear delts / upper back',
  triceps: 'Triceps',
  biceps: 'Biceps',
  'single-leg': 'Single-leg / glutes',
  calves: 'Calves',
  abs: 'Core / abs',
  forearms: 'Forearms / elbow care',
};

export interface ExerciseDef {
  id: string;
  name: string;
  pool: Pool;
  equipment: EquipmentId[];
  load: LoadType;
  note?: string;
  /** Sets/reps that ignore the day's scheme (elbow care, timed holds). */
  fixedSpec?: SetSpec;
  /** Reps are seconds held. */
  timed?: boolean;
}

/** [sets, minReps, maxReps] */
export type SetSpec = [number, number, number];

/** Elbow-care work stays light and high-rep whatever the scheme. */
export const PREHAB_SPEC: SetSpec = [2, 15, 20];

export const CORE_IDS = {
  squat: 'bb-back-squat',
  frontSquat: 'bb-front-squat',
  hexDeadlift: 'hex-deadlift',
  rdl: 'hex-rdl',
  pullup: 'pullup',
  bench: 'bb-bench',
  declineDb: 'db-decline-press',
} as const;

export const EXERCISES: ExerciseDef[] = [
  // Core
  { id: 'bb-back-squat', name: 'Barbell back squat', pool: 'core', equipment: ['barbell', 'squat-rack'], load: 'barbell' },
  {
    id: 'bb-front-squat',
    name: 'Barbell front squat',
    pool: 'core',
    equipment: ['barbell', 'squat-rack'],
    load: 'barbell',
    note: 'Technique practice: elbows high, chest up. End the set when form slips, not when you run out.',
  },
  { id: 'hex-deadlift', name: 'Hex-bar deadlift', pool: 'core', equipment: ['hex-bar'], load: 'barbell' },
  {
    id: 'hex-rdl',
    name: 'Romanian deadlift (hex bar)',
    pool: 'core',
    equipment: ['hex-bar'],
    load: 'barbell',
    note: 'Secondary hinge today: lighter, slow eccentric, hamstrings.',
  },
  {
    id: 'pullup',
    name: 'Weighted pull-ups',
    pool: 'core',
    equipment: ['pullup-bar'],
    load: 'weighted-bodyweight',
    note: 'Log the ADDED load (0 = bodyweight). Dip belt or a dumbbell between the feet. Wide grip is the bar, not the plan.',
  },
  { id: 'bb-bench', name: 'Flat barbell bench press', pool: 'core', equipment: ['barbell', 'flat-bench'], load: 'barbell' },
  { id: 'db-decline-press', name: 'Decline dumbbell press', pool: 'core', equipment: ['dumbbells', 'decline-bench'], load: 'dumbbell' },

  // Shoulders
  { id: 'db-ohp', name: 'Standing DB overhead press', pool: 'shoulders', equipment: ['dumbbells'], load: 'dumbbell' },
  { id: 'db-seated-press', name: 'Seated DB shoulder press', pool: 'shoulders', equipment: ['dumbbells', 'incline-bench'], load: 'dumbbell' },
  { id: 'cable-lateral', name: 'Cable lateral raise', pool: 'shoulders', equipment: ['cable'], load: 'cable' },
  {
    id: 'db-lateral',
    name: 'DB lateral raise',
    pool: 'shoulders',
    equipment: ['dumbbells'],
    load: 'dumbbell',
    note: 'The 20s. Slow, high reps, no swing.',
  },

  // Horizontal pull
  { id: 'db-chest-supported-row', name: 'Chest-supported DB row', pool: 'horizontal-pull', equipment: ['dumbbells', 'incline-bench'], load: 'dumbbell' },
  { id: 'cable-row', name: 'Seated cable row', pool: 'horizontal-pull', equipment: ['cable'], load: 'cable' },
  { id: 'db-single-row', name: 'Single-arm DB row', pool: 'horizontal-pull', equipment: ['dumbbells', 'flat-bench'], load: 'dumbbell' },

  // Rear delts / upper back
  { id: 'cable-face-pull', name: 'Cable face pull', pool: 'rear-delts', equipment: ['cable'], load: 'cable' },
  { id: 'band-pull-apart', name: 'Band pull-apart', pool: 'rear-delts', equipment: ['bands'], load: 'band' },
  { id: 'db-rear-delt', name: 'Bent-over rear-delt raise', pool: 'rear-delts', equipment: ['dumbbells'], load: 'dumbbell' },
  {
    id: 'cable-external-rotation',
    name: 'Cable external rotation',
    pool: 'rear-delts',
    equipment: ['cable'],
    load: 'cable',
    note: 'Light. Elbow pinned to your side. Rotator cuff care.',
  },

  // Triceps
  { id: 'dips', name: 'Dips', pool: 'triceps', equipment: ['dip-station'], load: 'bodyweight' },
  { id: 'tb-skullcrusher', name: 'Tricep-bar skull crusher', pool: 'triceps', equipment: ['tricep-bar', 'flat-bench'], load: 'barbell', note: 'Controlled. Elbows.' },
  { id: 'cable-pushdown', name: 'Cable pushdown', pool: 'triceps', equipment: ['cable'], load: 'cable' },
  { id: 'cable-overhead-ext', name: 'Cable overhead triceps extension', pool: 'triceps', equipment: ['cable'], load: 'cable' },
  { id: 'tb-close-grip-press', name: 'Close-grip press (tricep bar)', pool: 'triceps', equipment: ['tricep-bar', 'flat-bench'], load: 'barbell' },

  // Biceps
  { id: 'db-curl', name: 'DB curl', pool: 'biceps', equipment: ['dumbbells'], load: 'dumbbell' },
  { id: 'tb-hammer-curl', name: 'Hammer curl (tricep bar)', pool: 'biceps', equipment: ['tricep-bar'], load: 'barbell' },
  { id: 'cable-curl', name: 'Cable curl', pool: 'biceps', equipment: ['cable'], load: 'cable' },
  { id: 'db-incline-curl', name: 'Incline DB curl', pool: 'biceps', equipment: ['dumbbells', 'incline-bench'], load: 'dumbbell' },

  // Single-leg / glutes
  { id: 'db-split-squat', name: 'DB split squat', pool: 'single-leg', equipment: ['dumbbells'], load: 'dumbbell', note: 'Reps are per leg.' },
  { id: 'db-walking-lunge', name: 'DB walking lunge', pool: 'single-leg', equipment: ['dumbbells'], load: 'dumbbell', note: 'Reps are per leg.' },
  { id: 'back-extension', name: '45-degree back extension', pool: 'single-leg', equipment: ['back-extension'], load: 'bodyweight' },
  { id: 'db-step-up', name: 'DB step-up', pool: 'single-leg', equipment: ['dumbbells', 'flat-bench'], load: 'dumbbell', note: 'Reps are per leg.' },

  // Calves
  { id: 'db-calf-raise', name: 'Standing DB calf raise', pool: 'calves', equipment: ['dumbbells'], load: 'dumbbell' },
  { id: 'single-leg-calf-raise', name: 'Single-leg calf raise', pool: 'calves', equipment: ['bodyweight'], load: 'bodyweight' },

  // Abs
  { id: 'ab-wheel', name: 'Ab wheel (kneeling)', pool: 'abs', equipment: ['ab-wheel'], load: 'bodyweight' },
  { id: 'cable-crunch', name: 'Cable crunch', pool: 'abs', equipment: ['cable'], load: 'cable' },
  { id: 'hanging-knee-raise', name: 'Hanging knee raise', pool: 'abs', equipment: ['pullup-bar'], load: 'bodyweight' },
  // Forearms / elbow care
  {
    id: 'db-wrist-curl',
    name: 'DB wrist curl (slow lowering)',
    pool: 'forearms',
    equipment: ['dumbbells', 'flat-bench'],
    load: 'dumbbell',
    note: 'Forearm on the bench, palm up. Three seconds down. Protects the inner elbow.',
    fixedSpec: PREHAB_SPEC,
  },
  {
    id: 'db-reverse-wrist-curl',
    name: 'DB reverse wrist curl',
    pool: 'forearms',
    equipment: ['dumbbells', 'flat-bench'],
    load: 'dumbbell',
    note: 'Palm down, slow. One dumbbell, one hand at a time.',
    fixedSpec: PREHAB_SPEC,
  },

  {
    id: 'plank',
    name: 'Plank (timed hold)',
    pool: 'abs',
    equipment: ['bodyweight'],
    load: 'bodyweight',
    note: 'Forearms down, elbows under shoulders, straight line head to heels. Squeeze glutes, brace abs, no sagging hips. Log seconds held.',
    fixedSpec: [3, 30, 60],
    timed: true,
  },
];

const EXERCISE_BY_ID: Map<string, ExerciseDef> = new Map(EXERCISES.map((e) => [e.id, e]));

export function exerciseById(id: string): ExerciseDef | undefined {
  return EXERCISE_BY_ID.get(id);
}

export interface SchemeSpec {
  id: Scheme;
  label: string;
  blurb: string;
  core: SetSpec;
  accessory: SetSpec;
  restCore: string;
  restAccessory: string;
}

export const SCHEMES: Record<Scheme, SchemeSpec> = {
  A: {
    id: 'A',
    label: 'Heavy',
    blurb: 'Low reps, full rest. Leave one clean rep in the tank on the core lifts.',
    core: [4, 4, 6],
    accessory: [3, 6, 8],
    restCore: '2-3 min',
    restAccessory: '90 s',
  },
  B: {
    id: 'B',
    label: 'Moderate',
    blurb: 'Straight sets of 8. Same weight every set; add reps before load.',
    core: [4, 8, 8],
    accessory: [3, 10, 12],
    restCore: '90 s',
    restAccessory: '60-90 s',
  },
  C: {
    id: 'C',
    label: 'Volume',
    blurb: 'Higher reps, shorter rest. Lighter on the bar, harder on the lungs.',
    core: [3, 12, 12],
    accessory: [3, 15, 20],
    restCore: '60 s',
    restAccessory: '45-60 s',
  },
};

/** The non-primary of squat/hinge always gets two lighter sets of 8. */
export const SECONDARY_SPEC: SetSpec = [2, 8, 8];

function accessorySpec(def: ExerciseDef, scheme: SchemeSpec): SetSpec {
  return def.fixedSpec ?? scheme.accessory;
}

export interface SessionMeta {
  lastScheme: Scheme | null;
  lastPrimaryLift: PrimaryLift | null;
  lastDroppedPool: Pool | null;
  sessionCount: number;
}

export const EMPTY_META: SessionMeta = {
  lastScheme: null,
  lastPrimaryLift: null,
  lastDroppedPool: null,
  sessionCount: 0,
};

export function nextScheme(last: Scheme | null): Scheme {
  if (last === 'A') return 'B';
  if (last === 'B') return 'C';
  return 'A';
}

export function nextPrimary(last: PrimaryLift | null): PrimaryLift {
  return last === 'squat' ? 'hinge' : 'squat';
}

/** Small, fast, deterministic PRNG. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** FNV-1a hash of "date:reroll" so the same day + reroll count reproduces. */
export function seedFor(date: string, reroll: number): number {
  const s = `${date}:${reroll}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function shuffle<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export interface PlannedExercise {
  id: string;
  name: string;
  pool: Pool;
  equipment: EquipmentId[];
  load: LoadType;
  role: Role;
  targetSets: number;
  repMin: number;
  repMax: number;
  note?: string;
  timed?: boolean;
}

export interface PlannedSession {
  date: string;
  scheme: Scheme;
  primaryLift: PrimaryLift;
  seed: number;
  reroll: number;
  droppedPools: Pool[];
  exercises: PlannedExercise[];
}

export function repLabel(
  ex: Pick<PlannedExercise, 'targetSets' | 'repMin' | 'repMax'> & { timed?: boolean }
): string {
  const reps = ex.repMin === ex.repMax ? `${ex.repMin}` : `${ex.repMin}-${ex.repMax}`;
  return `${ex.targetSets} x ${reps}${ex.timed ? ' s' : ''}`;
}

function plan(def: ExerciseDef, role: Role, spec: SetSpec): PlannedExercise {
  const planned: PlannedExercise = {
    id: def.id,
    name: def.name,
    pool: def.pool,
    equipment: def.equipment,
    load: def.load,
    role,
    targetSets: spec[0],
    repMin: spec[1],
    repMax: spec[2],
  };
  if (def.note) planned.note = def.note;
  if (def.timed) planned.timed = true;
  return planned;
}

export function optionsFor(pool: Pool, available: ReadonlySet<EquipmentId> = AVAILABLE): ExerciseDef[] {
  return EXERCISES.filter((e) => e.pool === pool && e.equipment.every((q) => available.has(q)));
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

/**
 * Build today's session. Deterministic for a given (meta, date, reroll).
 * targetCount counts every exercise including the five core slots.
 */
export function pickSession(
  meta: SessionMeta,
  date: string,
  reroll = 0,
  targetCount = 13,
  available: ReadonlySet<EquipmentId> = AVAILABLE
): PlannedSession {
  const scheme = nextScheme(meta.lastScheme);
  const primaryLift = nextPrimary(meta.lastPrimaryLift);
  const seed = seedFor(date, reroll);
  const rng = mulberry32(seed);
  const spec = SCHEMES[scheme];
  const byId = (id: string): ExerciseDef => {
    const def = exerciseById(id);
    if (!def) throw new Error(`Unknown core exercise ${id}`);
    return def;
  };

  const core: PlannedExercise[] = [];
  if (primaryLift === 'squat') {
    core.push(plan(byId(CORE_IDS.squat), 'core', spec.core));
  } else {
    core.push(plan(byId(CORE_IDS.hexDeadlift), 'core', spec.core));
  }
  core.push(plan(byId(CORE_IDS.bench), 'core', spec.core));
  core.push(plan(byId(CORE_IDS.pullup), 'core', spec.core));
  core.push(plan(byId(CORE_IDS.declineDb), 'core', spec.accessory));
  core.push(
    primaryLift === 'squat'
      ? plan(byId(CORE_IDS.rdl), 'secondary', SECONDARY_SPEC)
      : plan(byId(CORE_IDS.frontSquat), 'secondary', SECONDARY_SPEC)
  );

  const accessoryCount = clamp(targetCount - core.length, 0, ACCESSORY_POOLS.length);
  const dropCount = ACCESSORY_POOLS.length - accessoryCount;
  const droppable = ACCESSORY_POOLS.filter((p) => p !== meta.lastDroppedPool && !PROTECTED_POOLS.includes(p));
  const droppedPools = shuffle(droppable, rng).slice(0, dropCount);
  const pools = ACCESSORY_POOLS.filter((p) => !droppedPools.includes(p));

  const accessories: PlannedExercise[] = [];
  for (const pool of pools) {
    const opts = optionsFor(pool, available);
    if (opts.length === 0) continue;
    const def = opts[Math.floor(rng() * opts.length)];
    accessories.push(plan(def, 'accessory', accessorySpec(def, spec)));
  }

  return {
    date,
    scheme,
    primaryLift,
    seed,
    reroll,
    droppedPools,
    exercises: [...core, ...accessories],
  };
}

/** Replace one accessory with the next unused option from the same pool. */
export function swapExercise(
  session: PlannedSession,
  index: number,
  available: ReadonlySet<EquipmentId> = AVAILABLE
): PlannedSession {
  const current = session.exercises[index];
  if (!current || current.role !== 'accessory') return session;
  const opts = optionsFor(current.pool, available);
  if (opts.length < 2) return session;
  const used = new Set(session.exercises.map((e) => e.id));
  const at = opts.findIndex((o) => o.id === current.id);
  for (let k = 1; k <= opts.length; k++) {
    const cand = opts[(at + k) % opts.length];
    if (used.has(cand.id)) continue;
    const next = [...session.exercises];
    next[index] = plan(cand, 'accessory', accessorySpec(cand, SCHEMES[session.scheme]));
    return { ...session, exercises: next };
  }
  return session;
}

export interface LastPerformance {
  date: string;
  bestWeight: number | null;
  bestReps: number | null;
  hitTopAllSets: boolean;
}

function fmtLb(w: number | null): string {
  return w === null || w === 0 ? 'bodyweight' : `${w} lb`;
}

/** One honest line about what to do this time. */
export function suggestion(ex: PlannedExercise, last: LastPerformance | null, start: number | null = null): string {
  if (ex.timed) {
    if (!last) return `Start with ${ex.repMin} s holds. Stop when your hips sag, not when it burns.`;
    if (!last.hitTopAllSets) return `Last best was ${last.bestReps ?? 0} s. Add 5 to 10 s per hold.`;
    return `Every hold reached ${ex.repMax} s. Keep it at ${ex.repMax} and lift one foot, or move to the ab wheel.`;
  }
  if (!last) {
    if (start !== null) {
      const what =
        ex.load !== 'weighted-bodyweight' ? fmtLb(start) : start === 0 ? 'bodyweight only' : `${fmtLb(start)} added`;
      return `Starting estimate: ${what}. If set one is easy or a grind, change it for the rest.`;
    }
    return `First time logged. Pick a load you can hit ${ex.repMax} with two reps in the tank.`;
  }
  const w = last.bestWeight;
  const r = last.bestReps ?? 0;
  if (!last.hitTopAllSets) {
    return `Beat ${fmtLb(w)} x ${r}: same load, one more rep on each set.`;
  }
  switch (ex.load) {
    case 'barbell':
      return `Every set hit ${ex.repMax} at ${fmtLb(w)}. Add 5 lb.`;
    case 'dumbbell': {
      const up = w === null ? null : nextDumbbellUp(w);
      if (up === null) return `Every set hit ${ex.repMax} at ${fmtLb(w)}. Top pair; slow the eccentric.`;
      return `Every set hit ${ex.repMax} at ${fmtLb(w)}. Next pair is ${up}: a big jump, so try it on set one only.`;
    }
    case 'bodyweight':
      return `Every set hit ${ex.repMax}. Add load (a dumbbell) or two more reps.`;
    case 'weighted-bodyweight':
      return `Every set hit ${ex.repMax} with ${fmtLb(w)} added. Add 5 lb.`;
    case 'cable':
      return `Every set hit ${ex.repMax} at ${fmtLb(w)}. One pin heavier.`;
    case 'band':
      return `Every set hit ${ex.repMax}. Heavier band or two more reps.`;
    default:
      return `Every set hit ${ex.repMax}. Make it harder next time.`;
  }
}
