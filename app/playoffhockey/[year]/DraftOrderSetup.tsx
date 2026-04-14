'use client';

import { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { getFirebase } from '../_lib/firebase';
import type { Participant } from '../_lib/types';

export default function DraftOrderSetup({
  year,
  participants,
}: {
  year: number;
  participants: Participant[];
}) {
  const [order, setOrder] = useState<string[]>(() => participants.map((p) => p.uid));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setOrder((prev) => {
      const current = new Set(prev);
      const fresh = participants.map((p) => p.uid);
      if (fresh.length === prev.length && fresh.every((u) => current.has(u))) return prev;
      return fresh;
    });
  }, [participants]);

  function randomize() {
    const shuffled = [...order];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setOrder(shuffled);
  }

  function move(uid: string, delta: number) {
    const idx = order.indexOf(uid);
    const newIdx = idx + delta;
    if (newIdx < 0 || newIdx >= order.length) return;
    const next = [...order];
    [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
    setOrder(next);
  }

  async function save() {
    if (!confirm('Save draft order and start the draft? This cannot be undone.')) return;
    setSaving(true);
    setError(null);
    try {
      const { db } = getFirebase();
      await updateDoc(doc(db, 'seasons', String(year)), { draftOrder: order });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  const nameByUid = new Map(
    participants.map((p) => [p.uid, p.teamName || p.displayName])
  );

  return (
    <div className="bg-white border border-slate/20 p-4 rounded-sm space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-navy mb-1">Set initial draft order</h2>
        <p className="text-sm text-slate">
          Snake draft, 7 rounds. Row 1 picks first in round 1 and last in round 2, etc.
        </p>
      </div>
      <ol className="space-y-1">
        {order.map((uid, idx) => (
          <li
            key={uid}
            className="flex items-center justify-between bg-off-white border border-slate/20 p-2 rounded-sm"
          >
            <span className="text-navy">
              <span className="text-slate mr-2 font-mono text-sm">{idx + 1}.</span>
              {nameByUid.get(uid) ?? uid}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => move(uid, -1)}
                disabled={idx === 0}
                className="w-8 h-8 text-sm border border-slate/30 rounded-sm disabled:opacity-30 hover:bg-off-white"
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                onClick={() => move(uid, 1)}
                disabled={idx === order.length - 1}
                className="w-8 h-8 text-sm border border-slate/30 rounded-sm disabled:opacity-30 hover:bg-off-white"
                aria-label="Move down"
              >
                ↓
              </button>
            </div>
          </li>
        ))}
      </ol>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={randomize}
          disabled={saving}
          className="px-4 py-2 border border-navy text-navy rounded-sm font-semibold hover:bg-navy/5 disabled:opacity-50"
        >
          Randomize
        </button>
        <button
          onClick={save}
          disabled={saving}
          className="px-4 py-2 bg-orange-burnt text-off-white rounded-sm font-semibold hover:bg-orange-burnt/90 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save & start draft'}
        </button>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
