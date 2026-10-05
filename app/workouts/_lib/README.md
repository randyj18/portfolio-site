# /workouts

Private training log for the site owner. Four tabs:

- **Today** — generates a full-body session and logs it (`SessionGenerator.tsx`).
- **Log** — freeform notes, stored as typed (`FreeformEntry.tsx`).
- **History** — past sessions from Firestore (`SessionHistory.tsx`).
- **Programs** — the original static checklists (`programs.ts`), check-offs in localStorage.

## Generator rules (`_lib/generator.ts`)

- Five fixed core slots every session: squat, hex-bar deadlift (or Romanian deadlift as the secondary hinge), pull-ups, flat barbell bench, decline DB press.
- Squat and hinge alternate as the primary lift. The other gets 2 x 8 lighter: Romanian deadlift on squat days, front squat on hinge days (technique practice).
- Rep scheme rotates A (heavy, 4 x 4-6) → B (moderate, 4 x 8) → C (volume, 3 x 12), based on the last saved session.
- Accessories: one per pool (shoulders, row, rear delts, triceps, biceps, single-leg, calves, abs, forearms), picked by a PRNG seeded from the date and a reroll counter, filtered by `_lib/equipment.ts`. With the default target of 13 exercises, one pool is dropped per session and never the same pool twice in a row. Forearms is never dropped and always runs 2 x 15-20 for elbow care.
- Plank is a timed hold (3 x 30-60 s, the reps field holds seconds) and forearm work is 2 x 15-20 on every scheme. Both come from `fixedSpec` on the exercise definition, which also holds through a swap.
- Optional finisher: air bike intervals (20 s hard, 70 s easy, 6 rounds building to 10). Saved as `finisher: { kind, workSec, restSec, rounds }` on the session, or null when skipped. It is not one of the counted exercises.
- Each exercise shows the best set from the last comparable session (same role, and same scheme unless it is the 2 x 8 secondary), plus a one-line progression suggestion. Weights prefill from that session.
- With no comparable session yet, weights prefill from `_lib/startingLoads.ts`, which is derived from the owner's October 2026 baselines. Edit that file to change the defaults.

## Data (`_lib/sessions.ts`)

```
workoutUsers/{uid}                 meta: email, lastScheme, lastPrimaryLift, lastDroppedPool, sessionCount
workoutUsers/{uid}/sessions/{id}   uid, email, date, startedAt, completedAt, scheme, primaryLift, seed,
                                   reroll, droppedPools, exercises[{...plan, sets[{weight, reps, done}]}],
                                   notes, durationMin, finisher, createdAt
```

No composite indexes are needed (single-field ordering only).

## Export (`app/api/workouts/export/route.ts`)

`GET /api/workouts/export?days=60&limit=100` with header `x-export-token: <WORKOUT_EXPORT_TOKEN>`.
Returns the owner's sessions as JSON using the Firebase Admin SDK. Consumed by
`C:\Carl\scripts\pull-workouts.ps1`, which writes `C:\Carl\projects\training\sessions.{json,md}`.

## Freeform log (`FreeformEntry.tsx`)

The Log tab stores raw notes (date, where, minutes, text) as a session with
`source: 'freeform'`, `exercises: []`, and the text in both `notes` and
`rawText`. No AI runs on the site by design. The owner's local assistant
pulls sessions via the export route and structures them locally. Freeform
sessions do not advance the A/B/C rotation.

## Manual steps after deploying

0. `npx tsc --noEmit` and `npx next lint --dir app/workouts --dir app/api/workouts`.

1. Paste `firestore.rules` into Firebase Console → Firestore → Rules → Publish (the `workoutUsers` block is new).
2. Set `WORKOUT_EXPORT_TOKEN` (any long random string) in the Vercel project environment, redeploy, and put the same value in `C:\Carl\private\workout-export-token.txt`.
3. Optional for local testing: add `WORKOUT_EXPORT_TOKEN` and the `FIREBASE_ADMIN_*` values to `.env.local`.
