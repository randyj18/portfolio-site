// Starting loads in pounds, used only until an exercise has a logged session
// of the same kind (same scheme, same role). After that, the last logged
// weight wins and these are ignored.
//
// Derived from Randy's baselines (YMCA, 2026-10-03, bodyweight ~160 lb):
//   bench 1RM 240 · hex-bar deadlift 3 x 5 at 300 with plenty left
//   back squat ~8 x 230 · 8 strict muscle-ups · first front squats 3 x 185
// Pull-ups are kept light on purpose: the inner elbow was sore after the
// muscle-ups, and climbing loads the same area.
// Core lifts sit around 80% / 70% / 60% of estimated max for A / B / C,
// rounded to 5 lb and kept on the conservative side. Dumbbell loads snap
// to the pairs on hand (20 / 40 / 50 / 60 / 70). Weighted pull-ups are the
// ADDED load. Tricep-bar numbers include the bar. Bodyweight, cable and
// band exercises have no default: there is no baseline to work from.
//
// These are guesses meant to be adjusted after the first set.

import type { Role, Scheme } from './generator';

type ByScheme = Record<Scheme, number>;

const BY_SCHEME: Record<string, ByScheme> = {
  // Core
  'bb-back-squat': { A: 245, B: 215, C: 185 },
  'hex-deadlift': { A: 305, B: 265, C: 225 },
  'bb-bench': { A: 195, B: 170, C: 145 },
  pullup: { A: 25, B: 10, C: 0 },
  'db-decline-press': { A: 70, B: 60, C: 50 },

  // Shoulders
  'db-ohp': { A: 50, B: 40, C: 40 },
  'db-seated-press': { A: 60, B: 50, C: 40 },
  'db-lateral': { A: 20, B: 20, C: 20 },

  // Rows
  'db-chest-supported-row': { A: 60, B: 50, C: 40 },
  'db-single-row': { A: 70, B: 70, C: 60 },

  // Rear delts
  'db-rear-delt': { A: 20, B: 20, C: 20 },

  // Triceps (tricep bar, bar included)
  'tb-skullcrusher': { A: 80, B: 70, C: 60 },
  'tb-close-grip-press': { A: 135, B: 115, C: 95 },

  // Biceps
  'db-curl': { A: 40, B: 40, C: 20 },
  'db-incline-curl': { A: 40, B: 20, C: 20 },
  'tb-hammer-curl': { A: 70, B: 60, C: 50 },

  // Single-leg (per hand)
  'db-split-squat': { A: 50, B: 40, C: 40 },
  'db-walking-lunge': { A: 50, B: 40, C: 40 },
  'db-step-up': { A: 50, B: 40, C: 40 },

  // Forearms (one dumbbell, the lightest pair)
  'db-wrist-curl': { A: 20, B: 20, C: 20 },
  'db-reverse-wrist-curl': { A: 20, B: 20, C: 20 },

  // Calves (per hand)
  'db-calf-raise': { A: 70, B: 70, C: 60 },
};

/** The secondary squat / hinge is always 2 x 8, so one number each. */
const SECONDARY: Record<string, number> = {
  'bb-front-squat': 135,
  'hex-rdl': 185,
};

export function startingLoad(exerciseId: string, role: Role, scheme: Scheme): number | null {
  if (role === 'secondary') return SECONDARY[exerciseId] ?? null;
  return BY_SCHEME[exerciseId]?.[scheme] ?? null;
}
