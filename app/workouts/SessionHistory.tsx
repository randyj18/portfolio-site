'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../playoffhockey/_lib/auth';
import { SCHEMES, repLabel } from './_lib/generator';
import { listSessions, type WorkoutSession } from './_lib/sessions';

function bestSetLabel(ex: WorkoutSession['exercises'][number]): string {
  const done = ex.sets.filter((s) => s.done && s.reps !== null);
  if (done.length === 0) return 'skipped';
  const top = done.reduce((a, b) => ((b.weight ?? 0) > (a.weight ?? 0) ? b : a));
  const w = top.weight ? `${top.weight} lb` : 'bw';
  return `${w} x ${top.reps}${ex.timed ? ' s' : ''} (${done.length} sets)`;
}

export default function SessionHistory() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;
  const [sessions, setSessions] = useState<WorkoutSession[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;
    let cancelled = false;
    listSessions(uid, 50)
      .then((s) => {
        if (!cancelled) setSessions(s);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [uid]);

  if (error) return <p className="text-red-medium text-sm">Could not load history: {error}</p>;
  if (!sessions) return <p className="text-slate text-sm">Loading…</p>;
  if (sessions.length === 0) return <p className="text-slate text-sm">No sessions saved yet.</p>;

  return (
    <div className="space-y-3">
      {sessions.map((s) => {
        const id = s.id ?? s.createdAt;
        const isOpen = open === id;
        const logged = s.exercises.filter((ex) => ex.sets.some((set) => set.done)).length;
        return (
          <div key={id} className="bg-off-white rounded-lg border border-slate/15 shadow-sm">
            <button
              onClick={() => setOpen(isOpen ? null : id)}
              className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3"
            >
              <div>
                <p className="text-lg font-display font-bold text-navy">
                  {s.date} · {s.source === 'freeform' ? (s.location ?? 'Logged') : SCHEMES[s.scheme]?.label ?? s.scheme}
                </p>
                <p className="text-slate text-sm">
                  {s.source === 'freeform'
                    ? 'Freeform entry'
                    : `${s.primaryLift === 'squat' ? 'Squat' : 'Hex-bar deadlift'} primary`}{' '}
                  {s.source === 'freeform' ? '' : ` · ${logged}/${s.exercises.length} exercises`}
                  {s.finisher ? ` · bike ${s.finisher.rounds} rounds` : ''}
                  {s.durationMin ? ` · ${s.durationMin} min` : ''}
                </p>
              </div>
              <span className="text-slate text-sm mt-1">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                <ul className="divide-y divide-slate/10">
                  {s.exercises.map((ex, i) => (
                    <li key={`${ex.id}-${i}`} className="py-2 flex items-baseline justify-between gap-3 text-sm">
                      <span className="text-navy">
                        {ex.name} <span className="text-slate/60 text-xs">{repLabel(ex)}</span>
                      </span>
                      <span className="text-slate whitespace-nowrap">{bestSetLabel(ex)}</span>
                    </li>
                  ))}
                </ul>
                {s.notes && <p className="text-xs italic text-slate/80 mt-3 whitespace-pre-wrap">{s.notes}</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
