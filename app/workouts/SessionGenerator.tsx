'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../playoffhockey/_lib/auth';
import {
  EMPTY_META,
  POOL_LABEL,
  SCHEMES,
  pickSession,
  repLabel,
  suggestion,
  swapExercise,
  type PlannedSession,
  type SessionMeta,
} from './_lib/generator';
import {
  FINISHER_PLAN,
  lastFinisher,
  lastPerformance,
  listSessions,
  loadMeta,
  saveSession,
  todayLocal,
  toSessionExercises,
  type SessionExercise,
  type WorkoutSession,
} from './_lib/sessions';
import { startingLoad } from './_lib/startingLoads';

const TARGET_COUNT = 13;

type Phase = 'idle' | 'loading' | 'ready' | 'active' | 'saving' | 'saved' | 'error';

function parseNum(v: string): number | null {
  if (v.trim() === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function SessionGenerator() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;
  const email = user?.email ?? '';

  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<SessionMeta>(EMPTY_META);
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [reroll, setReroll] = useState(0);
  const [plan, setPlan] = useState<PlannedSession | null>(null);
  const [exercises, setExercises] = useState<SessionExercise[]>([]);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [finisherRounds, setFinisherRounds] = useState('');
  const [savedId, setSavedId] = useState<string | null>(null);

  // Load meta + recent history once we know who is signed in.
  useEffect(() => {
    if (!uid) return;
    let cancelled = false;
    setPhase('loading');
    Promise.all([loadMeta(uid), listSessions(uid, 40)])
      .then(([m, h]) => {
        if (cancelled) return;
        setMeta(m);
        setHistory(h);
        setPhase('ready');
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
        setPhase('error');
      });
    return () => {
      cancelled = true;
    };
  }, [uid]);

  const applyPlan = useCallback(
    (p: PlannedSession) => {
      setPlan(p);
      setExercises(toSessionExercises(p, history));
    },
    [history]
  );

  const generate = () => {
    const p = pickSession(meta, todayLocal(), reroll, TARGET_COUNT);
    applyPlan(p);
    setStartedAt(new Date().toISOString());
    setSavedId(null);
    setNotes('');
    setFinisherRounds('');
    setPhase('active');
  };

  // Reroll only changes accessories. Keep whatever is already logged for
  // exercises that survive the reroll (the five core slots always do).
  const doReroll = () => {
    const next = reroll + 1;
    setReroll(next);
    const p = pickSession(meta, todayLocal(), next, TARGET_COUNT);
    setPlan(p);
    setExercises((prev) => {
      const fresh = toSessionExercises(p, history);
      return fresh.map((ex) => prev.find((old) => old.id === ex.id) ?? ex);
    });
  };

  const doSwap = (index: number) => {
    if (!plan) return;
    const next = swapExercise(plan, index);
    if (next === plan) return;
    setPlan(next);
    setExercises((prev) => {
      const fresh = toSessionExercises(next, history);
      return prev.map((ex, i) => (i === index ? fresh[i] : ex));
    });
  };

  const updateSet = (exIdx: number, setIdx: number, patch: Partial<SessionExercise['sets'][number]>) => {
    setExercises((prev) =>
      prev.map((ex, i) =>
        i !== exIdx
          ? ex
          : { ...ex, sets: ex.sets.map((s, j) => (j !== setIdx ? s : { ...s, ...patch })) }
      )
    );
  };

  const addSet = (exIdx: number) => {
    setExercises((prev) =>
      prev.map((ex, i) => {
        if (i !== exIdx) return ex;
        const last = ex.sets[ex.sets.length - 1];
        return { ...ex, sets: [...ex.sets, { weight: last?.weight ?? null, reps: null, done: false }] };
      })
    );
  };

  const doneCount = useMemo(
    () => exercises.reduce((n, ex) => n + (ex.sets.some((s) => s.done) ? 1 : 0), 0),
    [exercises]
  );

  const save = async () => {
    if (!uid || !plan || !startedAt) return;
    setPhase('saving');
    setError(null);
    const completedAt = new Date().toISOString();
    const rounds = parseNum(finisherRounds);
    const finisher =
      rounds !== null && rounds > 0
        ? {
            kind: 'air-bike-intervals' as const,
            workSec: FINISHER_PLAN.workSec,
            restSec: FINISHER_PLAN.restSec,
            rounds: Math.round(rounds),
          }
        : null;
    const durationMin = Math.max(1, Math.round((Date.parse(completedAt) - Date.parse(startedAt)) / 60000));
    const session: WorkoutSession = {
      uid,
      email,
      date: plan.date,
      startedAt,
      completedAt,
      scheme: plan.scheme,
      primaryLift: plan.primaryLift,
      seed: plan.seed,
      reroll: plan.reroll,
      droppedPools: plan.droppedPools,
      exercises,
      notes,
      durationMin,
      finisher,
      createdAt: completedAt,
    };
    try {
      const id = await saveSession(session);
      setSavedId(id);
      setHistory((h) => [{ ...session, id }, ...h]);
      setMeta({
        lastScheme: session.scheme,
        lastPrimaryLift: session.primaryLift,
        lastDroppedPool: session.droppedPools[0] ?? null,
        sessionCount: meta.sessionCount + 1,
      });
      setPhase('saved');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
      setPhase('error');
    }
  };

  const nextScheme = SCHEMES[plan?.scheme ?? 'A'];
  const lastFin = lastFinisher(history);

  if (phase === 'loading' || phase === 'idle') {
    return <p className="text-slate text-sm">Loading your history…</p>;
  }

  if (phase === 'ready' || phase === 'saved') {
    const upcoming = pickSession(meta, todayLocal(), reroll, TARGET_COUNT);
    const spec = SCHEMES[upcoming.scheme];
    return (
      <div className="bg-off-white rounded-lg border border-slate/15 shadow-sm p-5 sm:p-6">
        {phase === 'saved' && (
          <p className="text-green-medium text-sm font-semibold mb-4">
            Saved. {history.length ? `${history.length} sessions on record.` : ''}
          </p>
        )}
        <h2 className="text-xl font-display font-bold text-navy">Next up: {spec.label} day</h2>
        <p className="text-slate text-sm mt-1">
          {upcoming.primaryLift === 'squat' ? 'Squat' : 'Hex-bar deadlift'} is the primary lift.{' '}
          {spec.blurb}
        </p>
        <p className="text-slate/70 text-xs mt-2">
          Core lifts {repLabel({ targetSets: spec.core[0], repMin: spec.core[1], repMax: spec.core[2] })}, accessories{' '}
          {repLabel({ targetSets: spec.accessory[0], repMin: spec.accessory[1], repMax: spec.accessory[2] })}. Rest{' '}
          {spec.restCore} on core, {spec.restAccessory} on accessories.
        </p>
        <button
          onClick={generate}
          className="mt-5 w-full px-6 py-4 bg-gradient-to-r from-gold-light to-orange-burnt text-navy font-semibold rounded-sm hover:shadow-lg hover:shadow-orange-burnt/50 transition-all duration-300 text-base"
        >
          Generate today&rsquo;s session
        </button>
        {error && <p className="text-red-medium text-sm mt-3">{error}</p>}
      </div>
    );
  }

  if (phase === 'error' && !plan) {
    return (
      <div className="bg-off-white rounded-lg border border-red-medium/30 p-5">
        <p className="text-red-medium text-sm">Could not load: {error}</p>
      </div>
    );
  }

  // active / saving / error-with-plan
  return (
    <div className="space-y-5">
      <div className="bg-off-white rounded-lg border border-slate/15 shadow-sm p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-display font-bold text-navy">
              {nextScheme.label} day · {plan?.date}
            </h2>
            <p className="text-slate text-sm mt-1">
              {plan?.primaryLift === 'squat' ? 'Squat' : 'Hex-bar deadlift'} primary. Rest {nextScheme.restCore} on
              core, {nextScheme.restAccessory} on accessories.
            </p>
          </div>
          <button
            onClick={doReroll}
            className="text-xs text-slate hover:text-orange-burnt transition-colors whitespace-nowrap mt-1 px-3 py-2 border border-slate/20 rounded-md"
          >
            Reroll accessories
          </button>
        </div>
        <p className="text-slate/70 text-xs mt-3">
          {doneCount} / {exercises.length} exercises logged
        </p>
      </div>

      {exercises.map((ex, exIdx) => {
        const last = plan ? lastPerformance(history, ex.id, ex.role, plan.scheme) : null;
        const tip = suggestion(ex, last, plan ? startingLoad(ex.id, ex.role, plan.scheme) : null);
        const roleTag = ex.role === 'core' ? 'Core' : ex.role === 'secondary' ? 'Secondary' : POOL_LABEL[ex.pool];
        return (
          <div key={`${ex.id}-${exIdx}`} className="bg-off-white rounded-lg border border-slate/15 shadow-sm p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-dark">{roleTag}</p>
                <h3 className="text-lg font-display font-bold text-navy leading-tight">{ex.name}</h3>
                <p className="text-slate text-sm">{repLabel(ex)}</p>
                {ex.note && <p className="text-xs italic text-slate/70 mt-1">{ex.note}</p>}
              </div>
              {ex.role === 'accessory' && (
                <button
                  onClick={() => doSwap(exIdx)}
                  className="text-xs text-slate hover:text-orange-burnt transition-colors whitespace-nowrap px-3 py-2 border border-slate/20 rounded-md"
                >
                  Swap
                </button>
              )}
            </div>

            <p className="text-xs text-slate mt-3">
              {last ? (
                <>
                  Last time ({last.date}): {last.bestWeight ? `${last.bestWeight} lb` : 'bodyweight'} x {last.bestReps}
                  .{' '}
                </>
              ) : null}
              <span className="text-navy">{tip}</span>
            </p>

            <div className="mt-3 space-y-2">
              {ex.sets.map((set, setIdx) => (
                <div key={setIdx} className="flex items-center gap-2">
                  <span className="w-6 text-xs text-slate/70">{setIdx + 1}</span>
                  <input
                    type="number"
                    step="any"
                    min="0"
                    inputMode="decimal"
                    placeholder="lb"
                    value={set.weight ?? ''}
                    onChange={(e) => updateSet(exIdx, setIdx, { weight: parseNum(e.target.value) })}
                    className="w-20 px-3 py-3 rounded-md border border-slate/30 bg-white text-navy text-base"
                    aria-label={`Set ${setIdx + 1} weight`}
                  />
                  <input
                    type="number"
                    step="1"
                    min="0"
                    inputMode="numeric"
                    placeholder={ex.timed ? 'sec' : 'reps'}
                    value={set.reps ?? ''}
                    onChange={(e) => updateSet(exIdx, setIdx, { reps: parseNum(e.target.value) })}
                    className="w-20 px-3 py-3 rounded-md border border-slate/30 bg-white text-navy text-base"
                    aria-label={`Set ${setIdx + 1} ${ex.timed ? 'seconds' : 'reps'}`}
                  />
                  <button
                    onClick={() => updateSet(exIdx, setIdx, { done: !set.done })}
                    className={
                      'flex-1 py-3 rounded-md text-sm font-semibold transition-colors ' +
                      (set.done
                        ? 'bg-green-bright text-white'
                        : 'bg-white border border-slate/30 text-slate hover:border-slate/60')
                    }
                    aria-pressed={set.done}
                  >
                    {set.done ? 'Done' : 'Mark done'}
                  </button>
                </div>
              ))}
              <button onClick={() => addSet(exIdx)} className="text-xs text-slate hover:text-orange-burnt transition-colors">
                + add a set
              </button>
            </div>
          </div>
        );
      })}

      <div className="bg-off-white rounded-lg border border-dashed border-slate/30 p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-dark">Optional finisher</p>
        <h3 className="text-lg font-display font-bold text-navy leading-tight">Air bike intervals</h3>
        <p className="text-slate text-sm">
          {FINISHER_PLAN.workSec} s all-out, {FINISHER_PLAN.restSec} s easy spin. Start at {FINISHER_PLAN.startRounds}{' '}
          rounds and build toward {FINISHER_PLAN.maxRounds}. Hockey conditioning: hard shifts, short recoveries.
        </p>
        <p className="text-xs text-slate mt-2">
          {lastFin ? `Last time (${lastFin.date}): ${lastFin.rounds} rounds.` : 'Not logged yet.'} Skip it if the
          session already wrecked you.
        </p>
        <div className="flex items-center gap-2 mt-3">
          <input
            type="number"
            step="1"
            min="0"
            inputMode="numeric"
            placeholder="rounds"
            value={finisherRounds}
            onChange={(e) => setFinisherRounds(e.target.value)}
            className="w-28 px-3 py-3 rounded-md border border-slate/30 bg-white text-navy text-base"
            aria-label="Finisher rounds completed"
          />
          <span className="text-xs text-slate/70">Leave blank if skipped.</span>
        </div>
      </div>

      <div className="bg-off-white rounded-lg border border-slate/15 shadow-sm p-5 sm:p-6">
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate mb-2" htmlFor="session-notes">
          Notes
        </label>
        <textarea
          id="session-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="How it felt, what hurt, what to change."
          className="w-full px-3 py-3 rounded-md border border-slate/30 bg-white text-navy text-base"
        />
        <button
          onClick={save}
          disabled={phase === 'saving'}
          className="mt-4 w-full px-6 py-4 bg-gradient-to-r from-gold-light to-orange-burnt text-navy font-semibold rounded-sm hover:shadow-lg hover:shadow-orange-burnt/50 transition-all duration-300 text-base disabled:opacity-60"
        >
          {phase === 'saving' ? 'Saving…' : 'Save session'}
        </button>
        {error && <p className="text-red-medium text-sm mt-3">{error}</p>}
        {savedId && <p className="text-green-medium text-sm mt-3">Saved.</p>}
      </div>
    </div>
  );
}
