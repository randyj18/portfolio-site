'use client';

import { useState } from 'react';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { getFirebase } from '../_lib/firebase';
import type { NHLPlayer, PlayerStats } from '../_lib/types';

const WRITE_BATCH_SIZE = 400;
const CHUNK_SIZE = 30;

type StatRow = Omit<PlayerStats, 'lastUpdated'>;
type Mode = 'regular' | 'playoff';

const MODES: Record<Mode, { gameType: 2 | 3; subcollection: string; label: string }> = {
  regular: {
    gameType: 2,
    subcollection: 'regularSeasonStats',
    label: 'regular-season',
  },
  playoff: {
    gameType: 3,
    subcollection: 'playerStats',
    label: 'playoff',
  },
};

export default function StatsSync({ year }: { year: number }) {
  const [busyMode, setBusyMode] = useState<Mode | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastRuns, setLastRuns] = useState<Record<Mode, number | null>>({
    regular: null,
    playoff: null,
  });

  async function sync(mode: Mode) {
    const cfg = MODES[mode];
    setBusyMode(mode);
    setError(null);
    setStatus('Loading player list…');
    try {
      const { db } = getFirebase();
      const playersSnap = await getDocs(collection(db, 'nhlPlayers'));
      const players = playersSnap.docs.map((d) => d.data() as NHLPlayer);
      if (players.length === 0) {
        throw new Error('No players in database. Sync roster first.');
      }

      const input = players.map((p) => ({ id: p.id, position: p.position }));
      const chunks: typeof input[] = [];
      for (let i = 0; i < input.length; i += CHUNK_SIZE) {
        chunks.push(input.slice(i, i + CHUNK_SIZE));
      }

      const allRows: StatRow[] = [];
      const allFailed: { id: string; error: string }[] = [];
      for (let ci = 0; ci < chunks.length; ci++) {
        setStatus(
          `Fetching ${cfg.label} stats (chunk ${ci + 1}/${chunks.length}, ${allRows.length}/${players.length} done)…`
        );
        const res = await fetch('/api/playoffhockey/sync-stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            year,
            gameType: cfg.gameType,
            players: chunks[ci],
          }),
        });
        const text = await res.text();
        let body: {
          stats?: StatRow[];
          failed?: { id: string; error: string }[];
          error?: string;
        };
        try {
          body = JSON.parse(text);
        } catch {
          throw new Error(
            `Chunk ${ci + 1} returned non-JSON (HTTP ${res.status}): ${text.slice(0, 120)}`
          );
        }
        if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`);
        allRows.push(...(body.stats ?? []));
        allFailed.push(...(body.failed ?? []));
        // Pause between chunks to avoid rate-limiting
        if (ci < chunks.length - 1) {
          await new Promise((r) => setTimeout(r, 1000));
        }
      }

      setStatus(`Writing ${allRows.length} ${cfg.label} stat rows…`);
      const now = Date.now();
      for (let i = 0; i < allRows.length; i += WRITE_BATCH_SIZE) {
        const batch = writeBatch(db);
        for (const r of allRows.slice(i, i + WRITE_BATCH_SIZE)) {
          batch.set(
            doc(db, 'seasons', String(year), cfg.subcollection, r.nhlPlayerId),
            { ...r, lastUpdated: now }
          );
        }
        await batch.commit();
      }
      if (allFailed.length > 0) {
        const sample = allFailed
          .slice(0, 5)
          .map((f) => `${f.id} (${f.error})`)
          .join(', ');
        setStatus(
          `Synced ${allRows.length} ${cfg.label} rows. ${allFailed.length} failed — click again to retry. Sample: ${sample}`
        );
      } else {
        setStatus(`Synced ${cfg.label} stats for ${allRows.length} players.`);
      }
      setLastRuns((prev) => ({ ...prev, [mode]: now }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sync failed');
      setStatus(null);
    } finally {
      setBusyMode(null);
    }
  }

  const fmt = (ts: number | null) =>
    ts ? new Date(ts).toLocaleTimeString() : 'never';

  return (
    <div className="bg-white border border-slate/20 p-4 rounded-sm">
      <h3 className="font-semibold text-navy mb-2">Player Stats</h3>
      <p className="text-xs text-slate mb-3">
        Regular-season stats inform the initial draft; playoff stats inform
        mid-drafts and standings.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => sync('regular')}
          disabled={busyMode !== null}
          className="px-4 py-2 bg-navy text-off-white rounded-sm font-semibold hover:bg-navy/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busyMode === 'regular' ? 'Syncing…' : 'Sync regular-season'}
        </button>
        <button
          onClick={() => sync('playoff')}
          disabled={busyMode !== null}
          className="px-4 py-2 bg-navy text-off-white rounded-sm font-semibold hover:bg-navy/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busyMode === 'playoff' ? 'Syncing…' : 'Sync playoff'}
        </button>
      </div>
      <p className="text-xs text-slate mt-2">
        Last regular-season: {fmt(lastRuns.regular)} · Last playoff:{' '}
        {fmt(lastRuns.playoff)}
      </p>
      {status && <p className="text-sm text-slate mt-2">{status}</p>}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
