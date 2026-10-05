// Add-on programs for the personal training tracker, rendered as checklists
// on the Programs tab at /workouts. The Today tab generates the main
// full-body sessions; these cover the goals around them.
//
// Rewritten 2026-10-05 from Randy's current picture: training once or twice
// a week; bench 1RM 240, hex-bar deadlift 3 x 5 at 300 with room left,
// 8 strict muscle-ups; one-arm chin-up as the long-term goal (self-assisted
// at the bicep grab point now, shoulder grab point in the past); inner
// elbow and shoulder flare up after hard pulling and climbing; hockey
// season starts late Oct / early Nov; climbing at the Grotto.

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
  title: string;
  focus: string;
  blocks: Block[];
}

export interface Program {
  id: string;
  title: string;
  blurb: string;
  days: Day[];
}

export const PROGRAMS: Program[] = [
  // ---------------------------------------------------------------------
  {
    id: 'prep',
    title: 'Warm-up & joint prep',
    blurb:
      'Ten minutes before every lifting session and every climbing session. The point is the elbows and shoulders: they are the parts most likely to slow you down, so they get attention first.',
    days: [
      {
        id: 'prep-lift',
        title: 'Before lifting',
        focus: 'About 10 minutes, then straight into the Today session',
        blocks: [
          {
            id: 'prep-lift-general',
            label: 'Get warm',
            style: 'warmup',
            exercises: [
              { id: 'prep-lift-bike', name: 'Air bike, easy', detail: '3 min', note: 'Conversation pace. Just get sweating.' },
              { id: 'prep-lift-circles', name: 'Arm circles and band dislocates', detail: '1 min', note: 'Wide grip on the band, slow, no forcing it.' },
            ],
          },
          {
            id: 'prep-lift-shoulder',
            label: 'Shoulders',
            style: 'main',
            exercises: [
              { id: 'prep-lift-pullapart', name: 'Band pull-aparts', detail: '2 x 15' },
              { id: 'prep-lift-er', name: 'Band or cable external rotation', detail: '1 x 15 each side', note: 'Light. Elbow pinned to your side.' },
              { id: 'prep-lift-scap', name: 'Scap pull-ups', detail: '1 x 8', note: 'Dead hang, then pull the shoulder blades down without bending the elbows.' },
            ],
          },
          {
            id: 'prep-lift-elbow',
            label: 'Elbows and forearms',
            style: 'main',
            exercises: [
              { id: 'prep-lift-wrist', name: 'Wrist circles, then forearm stretches', detail: '1 min', note: 'Palm-up and palm-down stretches, 15 s each.' },
              { id: 'prep-lift-curl', name: 'Light wrist curls', detail: '1 x 20', note: 'The 20 lb dumbbell. Blood flow, not training.' },
            ],
          },
          {
            id: 'prep-lift-ramp',
            label: 'Ramp up the first lift',
            style: 'finisher',
            exercises: [
              { id: 'prep-lift-ramp-sets', name: 'Ramp-up sets', detail: 'bar x 10, 50% x 5, 70% x 3, 85% x 1', note: 'Percent of the first working weight. Then start the working sets.' },
            ],
          },
        ],
      },
      {
        id: 'prep-climb',
        title: 'Before climbing',
        focus: 'Fingers need a slower warm-up than muscles',
        blocks: [
          {
            id: 'prep-climb-general',
            label: 'Get warm',
            style: 'warmup',
            exercises: [
              { id: 'prep-climb-move', name: 'Easy movement', detail: '5 min', note: 'Jog, skip or bike if the gym has one.' },
              { id: 'prep-climb-shoulder', name: 'Band pull-aparts and external rotation', detail: '1 x 15 each' },
              { id: 'prep-climb-wrist', name: 'Wrist circles and forearm stretches', detail: '1 min' },
            ],
          },
          {
            id: 'prep-climb-fingers',
            label: 'Fingers, gradually',
            style: 'main',
            exercises: [
              { id: 'prep-climb-easy', name: 'Two or three routes well below your max', detail: 'big holds', note: 'Climb on jugs only. Smooth, relaxed grip.' },
              { id: 'prep-climb-mid', name: 'One or two at a moderate grade', detail: 'open hand', note: 'Hang off straight arms and drape the fingers. No hard crimping yet.' },
            ],
          },
          {
            id: 'prep-climb-rules',
            label: 'During the session',
            style: 'finisher',
            exercises: [
              { id: 'prep-climb-crimp', name: 'Save hard crimps for after 20 minutes', note: 'Pulley strains come from crimping hard on cold fingers.' },
              { id: 'prep-climb-stop', name: 'Stop when grip fades, not when arms fade', note: 'Your pulling strength is ahead of your fingers. Let the fingers set the limit.' },
              { id: 'prep-climb-pinky', name: 'Tape or protect any sore finger', note: 'Anything that still hurts gets open-hand holds only.' },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  {
    id: 'oac',
    title: 'One-arm chin-up',
    blurb:
      'Once a week, after the main session or as its own short session. Not the day after climbing. Elbow rule: if the inner elbow still throbs the next morning, the next week is a phase-one week. Track progress by the self-assisted grab point: wrist, forearm, elbow, bicep, shoulder, then free. Use a bar you can hang from at full stretch (YMCA or the climbing gym): the home bar forces a wide grip under a low ceiling.',
    days: [
      {
        id: 'oac-1',
        title: 'Phase 1: Foundation',
        focus: 'First 4 to 6 weeks, and any week the elbow complains',
        blocks: [
          {
            id: 'oac-1-warm',
            label: 'Warm-up',
            style: 'warmup',
            exercises: [
              { id: 'oac-1-prep', name: 'Warm-up & joint prep: before lifting', detail: '10 min' },
              { id: 'oac-1-easy', name: 'Easy chin-ups', detail: '2 x 5', note: 'Palms facing you, nowhere near failure.' },
            ],
          },
          {
            id: 'oac-1-main',
            label: 'Strength',
            style: 'main',
            exercises: [
              { id: 'oac-1-weighted', name: 'Weighted chin-ups', detail: '4 x 3-5', note: 'Palms facing you. Add 5 lb when all four sets hit 5.' },
              { id: 'oac-1-uneven', name: 'Towel chin-ups', detail: '3 x 3 each arm', note: 'One hand on the bar, the other on a towel over it. Lower the towel hand to make it harder.' },
            ],
          },
          {
            id: 'oac-1-holds',
            label: 'Control',
            style: 'superset',
            exercises: [
              { id: 'oac-1-top', name: 'One-arm hold at the top', detail: '3 x 5-10 s each arm', note: 'Jump or pull up with two hands, then let go with one. Fight the rotation.' },
              { id: 'oac-1-hang', name: 'One-arm active hang', detail: '2 x 10-15 s each arm', note: 'Shoulder pulled down, elbow slightly bent. Builds the start position.' },
            ],
          },
          {
            id: 'oac-1-forearm',
            label: 'Elbow care',
            style: 'finisher',
            exercises: [
              { id: 'oac-1-wristcurl', name: 'Slow wrist curls', detail: '2 x 15-20', note: 'Three seconds down.' },
              { id: 'oac-1-reverse', name: 'Reverse wrist curls', detail: '2 x 15-20' },
            ],
          },
        ],
      },
      {
        id: 'oac-2',
        title: 'Phase 2: Self-assisted ladder',
        focus: 'Once Phase 1 feels solid and the elbow stays quiet',
        blocks: [
          {
            id: 'oac-2-warm',
            label: 'Warm-up',
            style: 'warmup',
            exercises: [
              { id: 'oac-2-prep', name: 'Warm-up & joint prep: before lifting', detail: '10 min' },
              { id: 'oac-2-easy', name: 'Easy chin-ups', detail: '2 x 5' },
              { id: 'oac-2-towel', name: 'Towel chin-ups', detail: '1 x 2 each arm', note: 'Warm-up only.' },
            ],
          },
          {
            id: 'oac-2-main',
            label: 'One-arm work',
            style: 'main',
            exercises: [
              { id: 'oac-2-assisted', name: 'Self-assisted one-arm chin-ups', detail: '4 x 1-2 each arm', note: 'Free hand grabs the working arm at your current point (bicep for now). Full rest, 2-3 min. Clean reps only.' },
              { id: 'oac-2-neg', name: 'One-arm negatives', detail: '3 x 1 each arm', note: 'Start at the top, lower over 5 s. Stop if it turns into a drop.' },
              { id: 'oac-2-lock', name: 'One-arm lock-off at 90 degrees', detail: '3 x 5 s each arm' },
            ],
          },
          {
            id: 'oac-2-forearm',
            label: 'Elbow care',
            style: 'finisher',
            exercises: [
              { id: 'oac-2-wristcurl', name: 'Slow wrist curls', detail: '2 x 15-20' },
              { id: 'oac-2-reverse', name: 'Reverse wrist curls', detail: '2 x 15-20' },
              { id: 'oac-2-move', name: 'Move up the ladder?', note: 'Yes when you get 2 clean reps each arm at this grab point and the elbow is quiet the next day.' },
            ],
          },
        ],
      },
      {
        id: 'oac-test',
        title: 'Test day',
        focus: 'Every 4 to 6 weeks, fresh, never after climbing',
        blocks: [
          {
            id: 'oac-test-warm',
            label: 'Warm-up',
            style: 'warmup',
            exercises: [
              { id: 'oac-test-prep', name: 'Warm-up & joint prep: before lifting', detail: '10 min' },
              { id: 'oac-test-build', name: 'Easy chin-ups, then towel chin-ups', detail: '2 x 3, then 1 x 1 each arm' },
            ],
          },
          {
            id: 'oac-test-main',
            label: 'Test',
            style: 'main',
            exercises: [
              { id: 'oac-test-ladder', name: 'Best self-assisted grab point', detail: 'up to 3 attempts each arm', note: 'Log the highest point with a clean rep in the Log tab.' },
              { id: 'oac-test-free', name: 'Free one-arm attempt', detail: '1-2 attempts each arm', note: 'Only once the shoulder grab point is clean. Full rest between tries.' },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  {
    id: 'hockey',
    title: 'Hockey season prep',
    blurb:
      'October into the season. Hockey needs repeated hard bursts, strong groins and hips, and side-to-side power, none of which a 5 km run trains well. Add the short block to a lifting day, or do the longer one on its own day. Drop to the short block once games start.',
    days: [
      {
        id: 'hockey-addon',
        title: 'Add-on after lifting',
        focus: 'About 12 minutes, in place of the optional bike finisher',
        blocks: [
          {
            id: 'hockey-addon-power',
            label: 'Lateral power',
            style: 'main',
            exercises: [
              { id: 'hockey-addon-skater', name: 'Skater bounds', detail: '3 x 5 each side', note: 'Stick each landing for a second. Quality over speed.' },
            ],
          },
          {
            id: 'hockey-addon-groin',
            label: 'Groin and hips',
            style: 'superset',
            exercises: [
              { id: 'hockey-addon-copen', name: 'Copenhagen plank', detail: '2 x 15-20 s each side', note: 'Top leg on the flat bench. Start with the knee on the bench, not the foot.' },
              { id: 'hockey-addon-lunge', name: 'Lateral lunge', detail: '2 x 8 each side', note: 'Bodyweight or the 20s.' },
            ],
          },
          {
            id: 'hockey-addon-bike',
            label: 'Shifts',
            style: 'finisher',
            exercises: [
              { id: 'hockey-addon-intervals', name: 'Air bike intervals', detail: '6 x 20 s hard / 70 s easy', note: 'Log the rounds in the finisher box on the Today tab.' },
            ],
          },
        ],
      },
      {
        id: 'hockey-day',
        title: 'Conditioning day',
        focus: 'About 30 minutes, on a non-lifting day',
        blocks: [
          {
            id: 'hockey-day-warm',
            label: 'Warm-up',
            style: 'warmup',
            exercises: [
              { id: 'hockey-day-bike', name: 'Air bike, easy', detail: '5 min' },
              { id: 'hockey-day-hips', name: 'Leg swings and hip openers', detail: '2 min', note: 'Front-to-back and side-to-side, 10 each leg.' },
            ],
          },
          {
            id: 'hockey-day-shifts',
            label: 'Shifts',
            style: 'main',
            exercises: [
              { id: 'hockey-day-intervals', name: 'Air bike shifts', detail: '8 x 40 s hard / 80 s easy', note: 'About a hockey shift. Hold the same pace on the last round as the first.' },
            ],
          },
          {
            id: 'hockey-day-legs',
            label: 'Legs and groin',
            style: 'superset',
            exercises: [
              { id: 'hockey-day-skater', name: 'Skater bounds', detail: '3 x 6 each side' },
              { id: 'hockey-day-copen', name: 'Copenhagen plank', detail: '3 x 20 s each side' },
              { id: 'hockey-day-split', name: 'DB split squat', detail: '2 x 10 each leg', note: 'The 40s.' },
            ],
          },
          {
            id: 'hockey-day-cool',
            label: 'Cool-down',
            style: 'finisher',
            exercises: [
              { id: 'hockey-day-spin', name: 'Air bike, easy', detail: '3 min' },
              { id: 'hockey-day-stretch', name: 'Hip flexor and groin stretch', detail: '1 min each side' },
            ],
          },
        ],
      },
    ],
  },
];
