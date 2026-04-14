'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  getCountFromServer,
  writeBatch,
  doc,
} from 'firebase/firestore';
import { getFirebase } from '../_lib/firebase';
import type { NHLPlayer } from '../_lib/types';

const BATCH_SIZE = 400;

export default function PlayerSync() {
  const [count, setCount] = useState<number | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadCount() {
    try {
      const { db } = getFirebase();
      const snap = await getCountFromServer(collection(db, 'nhlPlayers'));
      setCount(snap.data().count);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load count');
    }
  }

  useEffect(() => {
    loadCount();
  }, []);

  async function sync() {
    setSyncing(true);
    setError(null);
    setStatus('Fetching rosters from NHL API…');
    try {
      const res = await fetch('/api/playoffhockey/sync-players');
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`);
      const players = body.players as NHLPlayer[];

      setStatus(`Writing ${players.length} players to Firestore…`);
      const { db } = getFirebase();
      for (let i = 0; i < players.length; i += BATCH_SIZE) {
        const batch = writeBatch(db);
        for (const p of players.slice(i, i + BATCH_SIZE)) {
          batch.set(doc(db, 'nhlPlayers', p.id), p, { merge: true });
        }
        await batch.commit();
      }
      setStatus(`Synced ${players.length} players.`);
      await loadCount();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sync failed');
      setStatus(null);
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="bg-white border border-slate/20 p-4 rounded-sm">
      <h3 className="font-semibold text-navy mb-2">NHL Player Roster</h3>
      <p className="text-sm text-slate mb-3">
        {count === null ? 'Loading…' : `${count} players in database`}
      </p>
      <button
        onClick={sync}
        disabled={syncing}
        className="px-4 py-2 bg-navy text-off-white rounded-sm font-semibold hover:bg-navy/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {syncing ? 'Syncing…' : 'Sync from NHL API'}
      </button>
      {status && <p className="text-sm text-slate mt-2">{status}</p>}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
