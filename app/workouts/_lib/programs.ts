// Workout program data for the personal training tracker.
// Rendered as interactive checklists at /workouts.

export interface Exercise {
  id: string;
  name: string;
  detail?: string; // e.g. "3-4 x 6-10"
  note?: string;
}

export type BlockStyle = 'warmup' | 'main' | 'superset' | 'finisher';

export interface Block {
  id: string;
  label: string; // e.g. "Straight sets", "Tri-set", "Finisher"
  style: BlockStyle;
  exercises: Exercise[];
}

export interface Day {
  id: string;
  title: string; // e.g. "Thursday — Push"
  focus: string; // e.g. "Chest / Shoulders / Triceps"
  blocks: Block[];
}

export interface Program {
  id: string;
  title: string;
  blurb: string;
  days: Day[];
}

export const PROGRAMS: Program[] = [
  {
    id: 'return-block',
    title: 'This Week — Return Block',
    blurb:
      'Thu / Fri / Sat, then rest Sunday. Push–Pull–Legs across the three days so back-to-back sessions are safe. Everything submaximal — leave 2–3 reps in the tank, controlled tempo, baby the elbow.',
    days: [
      {
        id: 'rb-thu',
        title: 'Thursday — Push',
        focus: 'Chest / Shoulders / Triceps',
        blocks: [
          {
            id: 'rb-thu-warmup',
            label: 'Warm-up',
            style: 'warmup',
            exercises: [
              { id: 'rb-thu-bike', name: 'Air bike — easy', detail: '3 min', note: 'First ride, just feel it out' },
              { id: 'rb-thu-band', name: 'Band pull-aparts / shoulder circles', detail: '2 min' },
            ],
          },
          {
            id: 'rb-thu-main',
            label: 'Straight sets (full rest ~2–3 min)',
            style: 'main',
            exercises: [
              { id: 'rb-thu-bench', name: 'Bench press', detail: '3–4 x 6–10', note: '~2 reps in reserve' },
              { id: 'rb-thu-ohp', name: 'DB shoulder press', detail: '3 x 8–10' },
            ],
          },
          {
            id: 'rb-thu-triset',
            label: 'Tri-set x3 (rotate, ~60–90s after each round)',
            style: 'superset',
            exercises: [
              { id: 'rb-thu-dips', name: 'Dips', detail: '3 x 8–12', note: 'Bodyweight for now' },
              { id: 'rb-thu-lat', name: 'DB lateral raises', detail: '3 x 12–15' },
              { id: 'rb-thu-skull', name: 'EZ-bar skullcrushers', detail: '3 x 10–15', note: 'Controlled — elbow' },
            ],
          },
          {
            id: 'rb-thu-finish',
            label: 'Finisher',
            style: 'finisher',
            exercises: [
              { id: 'rb-thu-decline', name: 'Decline DB press', detail: '1 hard set', note: 'Stop 1–2 shy of failure' },
              { id: 'rb-thu-bikefin', name: 'Air bike — easy/moderate', detail: '5 min' },
            ],
          },
        ],
      },
      {
        id: 'rb-fri',
        title: 'Friday — Pull',
        focus: 'Back / Biceps / Rear delts',
        blocks: [
          {
            id: 'rb-fri-warmup',
            label: 'Warm-up',
            style: 'warmup',
            exercises: [
              { id: 'rb-fri-bike', name: 'Air bike — easy', detail: '3 min' },
              { id: 'rb-fri-band', name: 'Band pull-aparts', detail: '2 min' },
            ],
          },
          {
            id: 'rb-fri-main',
            label: 'Straight sets (full rest)',
            style: 'main',
            exercises: [
              { id: 'rb-fri-pullups', name: 'Pull-ups', detail: '3–4 x 6–8', note: 'Bodyweight' },
              {
                id: 'rb-fri-dl',
                name: 'Hex-bar deadlift',
                detail: '3 x 5–8',
                note: 'Auto-regulate: lighten or swap to RDL if abs still sore',
              },
            ],
          },
          {
            id: 'rb-fri-triset',
            label: 'Tri-set x3',
            style: 'superset',
            exercises: [
              { id: 'rb-fri-row', name: 'Chest-supported DB row', detail: '3 x 8–12', note: 'Chest-down on incline bench' },
              { id: 'rb-fri-reardelt', name: 'Bent-over rear-delt raises', detail: '3 x 15', note: 'Face-pull stand-in for now' },
              { id: 'rb-fri-curl', name: 'Curls (arm-blaster / EZ)', detail: '3 x 10–12', note: 'Controlled — elbow' },
            ],
          },
          {
            id: 'rb-fri-finish',
            label: 'Finisher (optional)',
            style: 'finisher',
            exercises: [{ id: 'rb-fri-bikefin', name: 'Air bike — short', detail: '5 min easy' }],
          },
        ],
      },
      {
        id: 'rb-sat',
        title: 'Saturday — Legs',
        focus: 'Quads / Hams / Glutes / Calves',
        blocks: [
          {
            id: 'rb-sat-warmup',
            label: 'Warm-up',
            style: 'warmup',
            exercises: [
              { id: 'rb-sat-bike', name: 'Air bike — easy', detail: '3 min' },
              { id: 'rb-sat-hips', name: 'Hip mobility', detail: '2 min' },
            ],
          },
          {
            id: 'rb-sat-main',
            label: 'Straight sets (full rest)',
            style: 'main',
            exercises: [
              { id: 'rb-sat-squat', name: 'Squat', detail: '3–4 x 6–10', note: 'Well short of your 237 while re-adapting' },
              { id: 'rb-sat-rdl', name: 'Romanian deadlift', detail: '3 x 8–10' },
            ],
          },
          {
            id: 'rb-sat-superset',
            label: 'Superset x2–3',
            style: 'superset',
            exercises: [
              { id: 'rb-sat-lunge', name: 'DB split squats / lunges', detail: '2–3 x 8–10/leg' },
              { id: 'rb-sat-calf', name: 'Calf raises', detail: '3 x 12–20' },
            ],
          },
          {
            id: 'rb-sat-finish',
            label: 'Finisher',
            style: 'finisher',
            exercises: [
              { id: 'rb-sat-bikefin', name: 'Air bike — short/easy', detail: '5 min', note: 'Legs cooked — no intervals today' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'lunch-ppl',
    title: 'Lunchtime PPL (6-day)',
    blurb:
      'The ongoing routine — ~30 min each, twice through Push/Pull/Legs per week. Cable moves (face pulls, pushdowns, cable laterals) unlock when the CENTR 1 arrives; until then use bands/DBs. Add a short air-bike Tabata (20s/10s x8) as a finisher 2–3x/week on fresh days.',
    days: [
      {
        id: 'ppl-push-a',
        title: 'Push A — Heavy',
        focus: 'Chest / Shoulders / Triceps · lower reps',
        blocks: [
          {
            id: 'ppl-push-a-main',
            label: 'Straight sets',
            style: 'main',
            exercises: [
              { id: 'ppl-pa-bench', name: 'Bench press', detail: '3–4 x 5–6' },
              { id: 'ppl-pa-ohp', name: 'DB shoulder press', detail: '3 x 6–8' },
            ],
          },
          {
            id: 'ppl-push-a-super',
            label: 'Superset',
            style: 'superset',
            exercises: [
              { id: 'ppl-pa-lat', name: 'Lateral raises', detail: '3 x 12–20' },
              { id: 'ppl-pa-tri', name: 'Triceps — dips or close-grip', detail: '3 x 8–12' },
            ],
          },
        ],
      },
      {
        id: 'ppl-pull-a',
        title: 'Pull A — Heavy',
        focus: 'Back / Biceps / Rear delts · lower reps',
        blocks: [
          {
            id: 'ppl-pull-a-main',
            label: 'Straight sets',
            style: 'main',
            exercises: [
              { id: 'ppl-la-pullup', name: 'Weighted pull-ups', detail: '3–4 x 5–6' },
              { id: 'ppl-la-dl', name: 'Hex-bar deadlift', detail: '3 x 5', note: 'Once per week only' },
            ],
          },
          {
            id: 'ppl-pull-a-super',
            label: 'Superset',
            style: 'superset',
            exercises: [
              { id: 'ppl-la-row', name: 'Chest-supported row', detail: '3 x 8–12' },
              { id: 'ppl-la-curl', name: 'Curls (arm-blaster / EZ)', detail: '3 x 10–12' },
            ],
          },
        ],
      },
      {
        id: 'ppl-legs-a',
        title: 'Legs A — Heavy',
        focus: 'Quads / Hams / Glutes / Calves · lower reps',
        blocks: [
          {
            id: 'ppl-legs-a-main',
            label: 'Straight sets',
            style: 'main',
            exercises: [
              { id: 'ppl-lga-squat', name: 'Squat', detail: '3–4 x 5–6' },
              { id: 'ppl-lga-rdl', name: 'Romanian deadlift', detail: '3 x 8' },
            ],
          },
          {
            id: 'ppl-legs-a-super',
            label: 'Accessory',
            style: 'superset',
            exercises: [{ id: 'ppl-lga-calf', name: 'Calf raises', detail: '3 x 12–20' }],
          },
        ],
      },
      {
        id: 'ppl-push-b',
        title: 'Push B — Pump',
        focus: 'Chest / Shoulders / Triceps · higher reps',
        blocks: [
          {
            id: 'ppl-push-b-main',
            label: 'Straight sets',
            style: 'main',
            exercises: [
              { id: 'ppl-pb-incline', name: 'Incline DB press', detail: '3 x 10–12' },
              { id: 'ppl-pb-ohp', name: 'Overhead press', detail: '3 x 8–10' },
            ],
          },
          {
            id: 'ppl-push-b-super',
            label: 'Superset',
            style: 'superset',
            exercises: [
              { id: 'ppl-pb-lat', name: 'Lateral raises', detail: '3 x 12–20' },
              { id: 'ppl-pb-tri', name: 'Overhead / cable triceps ext.', detail: '3 x 12–15' },
            ],
          },
        ],
      },
      {
        id: 'ppl-pull-b',
        title: 'Pull B — Pump',
        focus: 'Back / Biceps / Rear delts · higher reps',
        blocks: [
          {
            id: 'ppl-pull-b-main',
            label: 'Straight sets',
            style: 'main',
            exercises: [
              { id: 'ppl-lb-pullup', name: 'Pull-ups', detail: '3 x 8–12' },
              { id: 'ppl-lb-row', name: 'Chest-supported row', detail: '3 x 10–12' },
            ],
          },
          {
            id: 'ppl-pull-b-super',
            label: 'Superset',
            style: 'superset',
            exercises: [
              { id: 'ppl-lb-face', name: 'Face pulls', detail: '3 x 15–20', note: 'Bands until CENTR arrives' },
              { id: 'ppl-lb-hammer', name: 'Hammer curls', detail: '3 x 10–15' },
            ],
          },
        ],
      },
      {
        id: 'ppl-legs-b',
        title: 'Legs B — Pump',
        focus: 'Quads / Hams / Glutes / Calves / Core · higher reps',
        blocks: [
          {
            id: 'ppl-legs-b-main',
            label: 'Straight sets',
            style: 'main',
            exercises: [
              { id: 'ppl-lgb-squat', name: 'Squat', detail: '3 x 8–10' },
              { id: 'ppl-lgb-lunge', name: 'Split squats / lunges', detail: '3 x 8–10/leg' },
            ],
          },
          {
            id: 'ppl-legs-b-super',
            label: 'Accessory',
            style: 'superset',
            exercises: [
              { id: 'ppl-lgb-calf', name: 'Calf raises', detail: '3 x 15–20' },
              { id: 'ppl-lgb-ab', name: 'Ab wheel — kneeling', detail: '3 x 8–10', note: 'Rebuild gradually before standing rollouts' },
            ],
          },
        ],
      },
    ],
  },
];
