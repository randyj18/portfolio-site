'use client';

import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getFirebase } from '../_lib/firebase';
import type {
  Season,
  Participant,
  NHLPlayer,
  DraftPick,
  PlayerStats,
  BonusPoints,
} from '../_lib/types';
import { fantasyPointsFor } from '../_lib/draft';

const PLAYOFF_TEAMS = [
  'BUF', 'TBL', 'MTL', 'CAR', 'PIT', 'PHI', 'BOS', 'OTT',
  'COL', 'DAL', 'MIN', 'VGK', 'EDM', 'ANA', 'UTA', 'LAK',
];

export default function AdminTools({
  year,
  season,
  participants,
}: {
  year: number;
  season: Season;
  participants: Participant[];
}) {
  const yearStr = String(year);
  const [players, setPlayers] = useState<NHLPlayer[]>([]);
  const [picks, setPicks] = useState<DraftPick[]>([]);
  const [stats, setStats] = useState<Map<string, PlayerStats>>(new Map());
  const [bonusByPlayer, setBonusByPlayer] = useState<Map<string, number>>(new Map());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(collection(db, 'nhlPlayers'), (snap) =>
      setPlayers(snap.docs.map((d) => d.data() as NHLPlayer))
    );
  }, []);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(
      collection(db, 'seasons', yearStr, 'draftPicks'),
      (snap) =>
        setPicks(snap.docs.map((d) => ({ ...(d.data() as DraftPick), id: d.id })))
    );
  }, [yearStr]);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(collection(db, 'seasons', yearStr, 'playerStats'), (snap) => {
      const map = new Map<string, PlayerStats>();
      for (const d of snap.docs) {
        const s = d.data() as PlayerStats;
        map.set(s.nhlPlayerId, s);
      }
      setStats(map);
    });
  }, [yearStr]);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(collection(db, 'seasons', yearStr, 'bonusPoints'), (snap) => {
      const map = new Map<string, number>();
      for (const d of snap.docs) {
        const b = d.data() as BonusPoints;
        map.set(b.nhlPlayerId, (map.get(b.nhlPlayerId) ?? 0) + b.points);
      }
      setBonusByPlayer(map);
    });
  }, [yearStr]);

  const playerMap = useMemo(() => new Map(players.map((p) => [p.id, p])), [players]);
  const eliminatedSet = useMemo(
    () => new Set(season.eliminatedTeams ?? []),
    [season.eliminatedTeams]
  );

  async function toggleTeamEliminated(team: string) {
    setError(null);
    const current = new Set(season.eliminatedTeams ?? []);
    if (current.has(team)) current.delete(team);
    else current.add(team);
    const next = Array.from(current).sort();
    try {
      const { db } = getFirebase();
      await updateDoc(doc(db, 'seasons', yearStr), { eliminatedTeams: next });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update');
    }
  }

  function computeReverseStandings(): string[] {
    const scores = new Map<string, number>();
    for (const p of participants) scores.set(p.uid, 0);
    for (const pick of picks) {
      if (pick.droppedAt) continue;
      const player = playerMap.get(pick.nhlPlayerId);
      const s = stats.get(pick.nhlPlayerId);
      const gross = fantasyPointsFor(player, s);
      const net =
        Math.max(0, gross - (pick.pointsBeforeAcquiring ?? 0)) +
        (bonusByPlayer.get(pick.nhlPlayerId) ?? 0);
      scores.set(pick.participantUid, (scores.get(pick.participantUid) ?? 0) + net);
    }
    return participants
      .slice()
      .sort((a, b) => {
        const sa = scores.get(a.uid) ?? 0;
        const sb = scores.get(b.uid) ?? 0;
        if (sa !== sb) return sa - sb; // worst first
        return a.uid.localeCompare(b.uid);
      })
      .map((p) => p.uid);
  }

  async function startMidDraft() {
    if (season.status !== 'playoffs') return;
    const round = season.currentNHLRound;
    if (round >= 4) {
      setError('No mid-draft after NHL round 3.');
      return;
    }
    const nextRound = (round + 1) as 2 | 3 | 4;
    if (
      !confirm(
        `Start mid-draft before NHL round ${nextRound}? Reverse-standings order will be snapshotted now.`
      )
    )
      return;
    setBusy(true);
    setError(null);
    try {
      const order = computeReverseStandings();
      const { db } = getFirebase();
      await updateDoc(doc(db, 'seasons', yearStr), {
        status: 'mid-draft',
        currentNHLRound: nextRound,
        midDraftOrder: order,
      });
      setStatus(`Mid-draft started for round ${nextRound}.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to start mid-draft');
    } finally {
      setBusy(false);
    }
  }

  async function finishMidDraft() {
    if (season.status !== 'mid-draft') return;
    if (!confirm(`Finish mid-draft and start NHL round ${season.currentNHLRound} play?`))
      return;
    setBusy(true);
    setError(null);
    try {
      const { db } = getFirebase();
      await updateDoc(doc(db, 'seasons', yearStr), { status: 'playoffs' });
      setStatus(`NHL round ${season.currentNHLRound} in progress.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to finish mid-draft');
    } finally {
      setBusy(false);
    }
  }

  async function completeSeason() {
    if (!confirm('Mark season complete? This is final.')) return;
    setBusy(true);
    try {
      const { db } = getFirebase();
      await updateDoc(doc(db, 'seasons', yearStr), { status: 'complete' });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white border border-slate/20 p-4 rounded-sm space-y-4">
      <h3 className="font-semibold text-navy">Admin tools</h3>

      <section>
        <p className="text-xs text-slate mb-2">
          Current phase: <b>{season.status}</b> · NHL round {season.currentNHLRound}
        </p>
        <div className="flex flex-wrap gap-2">
          {season.status === 'playoffs' && season.currentNHLRound < 4 && (
            <button
              onClick={startMidDraft}
              disabled={busy}
              className="px-4 py-2 bg-orange-burnt text-off-white rounded-sm font-semibold disabled:opacity-50"
            >
              Start mid-draft before round {season.currentNHLRound + 1}
            </button>
          )}
          {season.status === 'mid-draft' && (
            <button
              onClick={finishMidDraft}
              disabled={busy}
              className="px-4 py-2 bg-orange-burnt text-off-white rounded-sm font-semibold disabled:opacity-50"
            >
              Finish mid-draft · start NHL round {season.currentNHLRound}
            </button>
          )}
          {season.status === 'playoffs' && season.currentNHLRound === 4 && (
            <button
              onClick={completeSeason}
              disabled={busy}
              className="px-4 py-2 bg-slate text-off-white rounded-sm font-semibold disabled:opacity-50"
            >
              Mark season complete
            </button>
          )}
        </div>
      </section>

      <section>
        <p className="text-xs text-slate mb-2">
          Eliminated teams ({eliminatedSet.size}/16) — click to toggle. Players
          on eliminated teams stop counting toward active roster size.
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1">
          {PLAYOFF_TEAMS.map((t) => {
            const out = eliminatedSet.has(t);
            return (
              <button
                key={t}
                onClick={() => toggleTeamEliminated(t)}
                className={`px-2 py-1 text-xs font-mono rounded-sm border ${
                  out
                    ? 'bg-slate/20 border-slate/40 text-slate line-through'
                    : 'bg-white border-slate/30 text-navy hover:bg-off-white'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </section>

      {status && <p className="text-sm text-slate">{status}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
