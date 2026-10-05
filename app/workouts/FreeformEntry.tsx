'use client';

import { useState } from 'react';
import { useAuth } from '../playoffhockey/_lib/auth';
import { saveSession, todayLocal, type WorkoutSession } from './_lib/sessions';

// Freeform logging: raw notes only. Nothing is parsed on the site; the
// owner's local assistant pulls sessions through the export route and
// structures them there.

type Phase = 'edit' | 'saving' | 'saved';

function parseInt0(v: string): number | null {
  if (v.trim() === '') return null;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}

export default function FreeformEntry() {
  const { user } = useAuth();
  const [phase, setPhase] = useState<Phase>('edit');
  const [text, setText] = useState('');
  const [date, setDate] = useState(todayLocal());
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    if (!user) return;
    setPhase('saving');
    setError(null);
    const now = new Date().toISOString();
    const session: WorkoutSession = {
      uid: user.uid,
      email: user.email ?? '',
      date,
      startedAt: now,
      completedAt: now,
      scheme: 'A',
      primaryLift: 'squat',
      seed: 0,
      reroll: 0,
      droppedPools: [],
      exercises: [],
      notes: text.trim(),
      durationMin: parseInt0(duration),
      createdAt: now,
      source: 'freeform',
      location: location.trim() || null,
      rawText: text.trim(),
    };
    try {
      await saveSession(session);
      setPhase('saved');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
      setPhase('edit');
    }
  };

  const reset = () => {
    setText('');
    setLocation('');
    setDuration('');
    setDate(todayLocal());
    setPhase('edit');
    setError(null);
  };

  if (phase === 'saved') {
    return (
      <div className="bg-off-white rounded-lg border border-slate/15 shadow-sm p-5 sm:p-6">
        <p className="text-green-medium font-semibold">Saved.</p>
        <p className="text-slate text-sm mt-1">The notes are stored as written. They get structured on the next pull.</p>
        <button onClick={reset} className="mt-4 text-sm text-slate hover:text-orange-burnt transition-colors">
          Log another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-off-white rounded-lg border border-slate/15 shadow-sm p-5 sm:p-6">
      <h2 className="text-xl font-display font-bold text-navy">Log a session</h2>
      <p className="text-slate text-sm mt-1">
        Dump everything you remember. Loads, reps, what felt off, what you tried for the first time. Kilograms, guesses
        and half-sentences are all fine.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate mb-1" htmlFor="ff-date">
            Date
          </label>
          <input
            id="ff-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-3 rounded-md border border-slate/30 bg-white text-navy text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate mb-1" htmlFor="ff-loc">
            Where
          </label>
          <input
            id="ff-loc"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Home, YMCA Guelph, hotel…"
            className="w-full px-3 py-3 rounded-md border border-slate/30 bg-white text-navy text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate mb-1" htmlFor="ff-dur">
            Minutes
          </label>
          <input
            id="ff-dur"
            type="text"
            inputMode="numeric"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="90"
            className="w-full px-3 py-3 rounded-md border border-slate/30 bg-white text-navy text-base"
          />
        </div>
      </div>

      <label className="block text-xs font-semibold uppercase tracking-wide text-slate mt-4 mb-1" htmlFor="ff-text">
        Notes
      </label>
      <textarea
        id="ff-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        placeholder="Full body, about 2.5 hours. Two strict ring muscle-ups, first time trying. Weighted pull-up with a 28 kg kettlebell near the end..."
        className="w-full px-3 py-3 rounded-md border border-slate/30 bg-white text-navy text-base"
      />
      <button
        onClick={save}
        disabled={phase === 'saving' || text.trim().length < 5}
        className="mt-4 w-full px-6 py-4 bg-gradient-to-r from-gold-light to-orange-burnt text-navy font-semibold rounded-sm hover:shadow-lg hover:shadow-orange-burnt/50 transition-all duration-300 text-base disabled:opacity-60"
      >
        {phase === 'saving' ? 'Saving…' : 'Save notes'}
      </button>
      {error && <p className="text-red-medium text-sm mt-3">{error}</p>}
    </div>
  );
}
