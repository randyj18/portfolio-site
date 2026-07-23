'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../playoffhockey/_lib/auth';
import { PROGRAMS, type Day, type BlockStyle } from './_lib/programs';

const STORAGE_KEY = 'rj-workout-checks-v1';

const BLOCK_ACCENT: Record<BlockStyle, string> = {
  warmup: 'text-slate',
  main: 'text-orange-burnt',
  superset: 'text-gold-dark',
  finisher: 'text-green-medium',
};

function dayExerciseIds(day: Day): string[] {
  return day.blocks.flatMap((b) => b.exercises.map((e) => e.id));
}

export default function WorkoutTracker() {
  const { user, logOut } = useAuth();
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [activeProgram, setActiveProgram] = useState(PROGRAMS[0].id);

  // Load saved state once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecks(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  // Persist on change (after initial load so we don't clobber saved state).
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checks));
    } catch {
      /* ignore */
    }
  }, [checks, loaded]);

  const toggle = (id: string) => setChecks((c) => ({ ...c, [id]: !c[id] }));
  const resetDay = (day: Day) =>
    setChecks((c) => {
      const next = { ...c };
      dayExerciseIds(day).forEach((id) => delete next[id]);
      return next;
    });

  const program = useMemo(
    () => PROGRAMS.find((p) => p.id === activeProgram) ?? PROGRAMS[0],
    [activeProgram]
  );

  return (
    <div className="section-container py-12 sm:py-16 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-navy">Training Log</h1>
        <button
          onClick={logOut}
          className="text-xs text-slate hover:text-orange-burnt transition-colors mt-2 whitespace-nowrap"
        >
          Sign out
        </button>
      </div>
      <p className="text-slate text-sm mb-8">
        Signed in as {user?.email}. Check-offs save to this device.
      </p>

      {/* Program tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {PROGRAMS.map((p) => {
          const active = p.id === activeProgram;
          return (
            <button
              key={p.id}
              onClick={() => setActiveProgram(p.id)}
              className={
                'px-4 py-2 rounded-full text-sm font-semibold transition-all ' +
                (active
                  ? 'bg-navy text-off-white shadow-md'
                  : 'bg-off-white text-slate border border-slate/20 hover:border-slate/40')
              }
            >
              {p.title}
            </button>
          );
        })}
      </div>

      <p className="text-slate text-sm mb-8 leading-relaxed">{program.blurb}</p>

      {/* Days */}
      <div className="space-y-6">
        {program.days.map((day) => {
          const ids = dayExerciseIds(day);
          const done = ids.filter((id) => checks[id]).length;
          const total = ids.length;
          const pct = total ? Math.round((done / total) * 100) : 0;
          const complete = done === total && total > 0;

          return (
            <div
              key={day.id}
              className="bg-off-white rounded-lg border border-slate/15 shadow-sm p-5 sm:p-6"
            >
              {/* Day header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-navy flex items-center gap-2">
                    {day.title}
                    {complete && <span className="text-green-bright text-base">✓</span>}
                  </h2>
                  <p className="text-slate text-sm">{day.focus}</p>
                </div>
                <button
                  onClick={() => resetDay(day)}
                  className="text-xs text-slate hover:text-orange-burnt transition-colors whitespace-nowrap mt-1"
                >
                  Reset
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-3 mb-5">
                <div className="flex justify-between text-xs text-slate mb-1">
                  <span>
                    {done} / {total}
                  </span>
                  <span>{pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate/15 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-light to-orange-burnt transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Blocks */}
              <div className="space-y-5">
                {day.blocks.map((block) => (
                  <div key={block.id}>
                    <p
                      className={
                        'text-xs font-semibold uppercase tracking-wide mb-2 ' +
                        BLOCK_ACCENT[block.style]
                      }
                    >
                      {block.label}
                    </p>
                    <ul className="space-y-1">
                      {block.exercises.map((ex) => {
                        const on = !!checks[ex.id];
                        return (
                          <li key={ex.id}>
                            <button
                              onClick={() => toggle(ex.id)}
                              className="w-full flex items-start gap-3 py-2 px-2 -mx-2 rounded-md text-left hover:bg-beige/60 transition-colors"
                            >
                              <span
                                className={
                                  'mt-0.5 flex-shrink-0 h-5 w-5 rounded border flex items-center justify-center text-xs font-bold transition-colors ' +
                                  (on
                                    ? 'bg-green-bright border-green-bright text-white'
                                    : 'border-slate/40 text-transparent')
                                }
                                aria-hidden
                              >
                                ✓
                              </span>
                              <span className="min-w-0">
                                <span
                                  className={
                                    'font-medium ' +
                                    (on ? 'text-slate/50 line-through' : 'text-navy')
                                  }
                                >
                                  {ex.name}
                                </span>
                                {ex.detail && (
                                  <span
                                    className={
                                      'ml-2 text-sm ' + (on ? 'text-slate/40' : 'text-slate')
                                    }
                                  >
                                    {ex.detail}
                                  </span>
                                )}
                                {ex.note && (
                                  <span className="block text-xs italic text-slate/70 mt-0.5">
                                    {ex.note}
                                  </span>
                                )}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
