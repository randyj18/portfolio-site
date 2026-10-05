// Randy's home gym, as confirmed 2026-09-16. The generator filters the
// exercise library against AVAILABLE, so adding or removing gear here is
// the only change needed when the gym changes.

export type EquipmentId =
  | 'barbell'
  | 'squat-rack'
  | 'flat-bench'
  | 'incline-bench'
  | 'decline-bench'
  | 'hex-bar'
  | 'dumbbells'
  | 'pullup-bar'
  | 'dip-station'
  | 'tricep-bar'
  | 'cable'
  | 'bands'
  | 'air-bike'
  | 'back-extension'
  | 'ab-wheel'
  | 'bodyweight';

export interface EquipmentItem {
  id: EquipmentId;
  label: string;
  note?: string;
}

/** Dumbbell pairs on hand, in pounds. The jumps are large, so dumbbell
 *  progression is by reps first, load second. */
export const DUMBBELL_PAIRS_LB: readonly number[] = [20, 40, 50, 60, 70];

export const EQUIPMENT: EquipmentItem[] = [
  { id: 'barbell', label: 'Olympic bars (x2)', note: '8 x 35 lb bumpers plus iron plates' },
  { id: 'squat-rack', label: 'Squat setup' },
  { id: 'flat-bench', label: 'Flat bench' },
  { id: 'incline-bench', label: 'Incline bench position' },
  { id: 'decline-bench', label: 'Decline bench position' },
  { id: 'hex-bar', label: 'Hex / trap bar', note: 'Preferred deadlift' },
  { id: 'dumbbells', label: 'Dumbbells 20 / 40 / 50 / 60 / 70' },
  {
    id: 'pullup-bar',
    label: 'Pull-up bar',
    note: 'Forces a wide grip; low ceiling; bar in front. No muscle-ups.',
  },
  { id: 'dip-station', label: 'Dip station' },
  { id: 'tricep-bar', label: 'Tricep / hammer bar (rectangle)' },
  { id: 'cable', label: 'CENTR 1 cable machine' },
  { id: 'bands', label: 'Bands' },
  { id: 'air-bike', label: 'Air bike' },
  { id: 'back-extension', label: '45-degree back extension' },
  { id: 'ab-wheel', label: 'Ab wheel' },
  { id: 'bodyweight', label: 'Bodyweight' },
];

export const AVAILABLE: ReadonlySet<EquipmentId> = new Set(EQUIPMENT.map((e) => e.id));

/** Next dumbbell pair above the given load, or null if already at the top. */
export function nextDumbbellUp(lb: number): number | null {
  const next = DUMBBELL_PAIRS_LB.find((p) => p > lb);
  return next ?? null;
}
