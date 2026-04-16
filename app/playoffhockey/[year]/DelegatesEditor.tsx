'use client';

import { useMemo, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { getFirebase } from '../_lib/firebase';
import type { Participant, Season } from '../_lib/types';

export default function DelegatesEditor({
  year,
  season,
  participants,
}: {
  year: number;
  season: Season;
  participants: Participant[];
}) {
  const yearStr = String(year);
  const delegates = season.draftDelegates ?? {};
  const [selectedUid, setSelectedUid] = useState<string>('');
  const [proxyUid, setProxyUid] = useState<string>('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameByUid = useMemo(
    () => new Map(participants.map((p) => [p.uid, p.teamName || p.displayName])),
    [participants]
  );

  async function addDelegate() {
    if (!selectedUid || !proxyUid || selectedUid === proxyUid) return;
    setBusy(true);
    setError(null);
    try {
      const next = { ...delegates };
      const current = Array.isArray(next[selectedUid]) ? [...next[selectedUid]] : [];
      if (!current.includes(proxyUid)) current.push(proxyUid);
      next[selectedUid] = current;
      const { db } = getFirebase();
      await updateDoc(doc(db, 'seasons', yearStr), { draftDelegates: next });
      setProxyUid('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setBusy(false);
    }
  }

  async function removeDelegate(participantUid: string, uidToRemove: string) {
    setBusy(true);
    setError(null);
    try {
      const next = { ...delegates };
      const remaining = (next[participantUid] ?? []).filter((u) => u !== uidToRemove);
      if (remaining.length === 0) delete next[participantUid];
      else next[participantUid] = remaining;
      const { db } = getFirebase();
      await updateDoc(doc(db, 'seasons', yearStr), { draftDelegates: next });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setBusy(false);
    }
  }

  const entries = Object.entries(delegates);

  return (
    <div className="bg-white border border-slate/20 p-4 rounded-sm">
      <h3 className="font-semibold text-navy mb-1">Draft delegates</h3>
      <p className="text-xs text-slate mb-3">
        Participants listed here can be drafted for by the listed proxies. Proxies
        see an &ldquo;on the clock&rdquo; prompt when the participant they represent is up.
      </p>

      {entries.length === 0 ? (
        <p className="text-xs text-slate italic mb-3">No delegates configured.</p>
      ) : (
        <ul className="space-y-2 mb-3">
          {entries.map(([pUid, proxies]) => (
            <li key={pUid} className="text-sm">
              <span className="font-semibold text-navy">
                {nameByUid.get(pUid) ?? pUid}
              </span>
              <span className="text-slate"> → </span>
              {proxies.map((px, i) => (
                <span key={px} className="inline-flex items-center gap-1 mr-2">
                  {i > 0 && <span className="text-slate/40">,</span>}
                  <span className="text-navy">{nameByUid.get(px) ?? px}</span>
                  <button
                    onClick={() => removeDelegate(pUid, px)}
                    disabled={busy}
                    className="text-xs text-red-600 hover:underline disabled:opacity-50"
                    title="Remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2 items-end">
        <label className="text-xs text-slate">
          Delegate
          <select
            value={selectedUid}
            onChange={(e) => setSelectedUid(e.target.value)}
            className="block mt-1 px-2 py-1 border border-slate/30 rounded-sm text-sm"
          >
            <option value="">— pick participant —</option>
            {participants.map((p) => (
              <option key={p.uid} value={p.uid}>
                {p.teamName || p.displayName}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-slate">
          Proxy (can draft on their behalf)
          <select
            value={proxyUid}
            onChange={(e) => setProxyUid(e.target.value)}
            className="block mt-1 px-2 py-1 border border-slate/30 rounded-sm text-sm"
          >
            <option value="">— pick proxy —</option>
            {participants
              .filter((p) => p.uid !== selectedUid)
              .map((p) => (
                <option key={p.uid} value={p.uid}>
                  {p.teamName || p.displayName}
                </option>
              ))}
          </select>
        </label>
        <button
          onClick={addDelegate}
          disabled={!selectedUid || !proxyUid || busy}
          className="px-3 py-1 bg-navy text-off-white text-sm rounded-sm font-semibold disabled:opacity-30"
        >
          {busy ? 'Saving…' : 'Add'}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
