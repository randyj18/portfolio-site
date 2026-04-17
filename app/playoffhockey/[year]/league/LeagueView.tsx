'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { getFirebase } from '../../_lib/firebase';
import type {
  Season,
  Participant,
  NHLPlayer,
  DraftPick,
  PlayerStats,
  BonusPoints,
} from '../../_lib/types';
import Standings from '../Standings';

type CupOdds = {
  teams: Record<string, { name: string; cup: number; r1: number; r2: number; r3: number }>;
};

export default function LeagueView({ year }: { year: number }) {
  const yearStr = String(year);
  const [season, setSeason] = useState<Season | null>(null);
  const [players, setPlayers] = useState<NHLPlayer[]>([]);
  const [picks, setPicks] = useState<DraftPick[]>([]);
  const [stats, setStats] = useState<Map<string, PlayerStats>>(new Map());
  const [bonusByPlayer, setBonusByPlayer] = useState<Map<string, number>>(new Map());
  const [cupOdds, setCupOdds] = useState<CupOdds | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(
      doc(db, 'seasons', yearStr),
      (snap) => setSeason(snap.exists() ? (snap.data() as Season) : null),
      (e) => setError(e.message)
    );
  }, [yearStr]);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(
      collection(db, 'nhlPlayers'),
      (snap) => setPlayers(snap.docs.map((d) => d.data() as NHLPlayer)),
      (e) => setError(e.message)
    );
  }, []);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(
      collection(db, 'seasons', yearStr, 'draftPicks'),
      (snap) => setPicks(snap.docs.map((d) => ({ ...(d.data() as DraftPick), id: d.id }))),
      (e) => setError(e.message)
    );
  }, [yearStr]);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(
      collection(db, 'seasons', yearStr, 'playerStats'),
      (snap) => {
        const m = new Map<string, PlayerStats>();
        for (const d of snap.docs) {
          const s = d.data() as PlayerStats;
          m.set(s.nhlPlayerId, s);
        }
        setStats(m);
      },
      () => {}
    );
  }, [yearStr]);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(
      collection(db, 'seasons', yearStr, 'bonusPoints'),
      (snap) => {
        const m = new Map<string, number>();
        for (const d of snap.docs) {
          const b = d.data() as BonusPoints;
          m.set(b.nhlPlayerId, (m.get(b.nhlPlayerId) ?? 0) + b.points);
        }
        setBonusByPlayer(m);
      },
      () => {}
    );
  }, [yearStr]);

  useEffect(() => {
    fetch('/playoff-pool/projections.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!j?.teams) return;
        setCupOdds({ teams: j.teams });
      })
      .catch(() => {});
  }, []);

  const participants: Participant[] = useMemo(() => {
    if (!season?.teamsPublic) return [];
    return Object.entries(season.teamsPublic).map(([uid, v]) => ({
      uid,
      displayName: v.displayName,
      email: '',
      teamName: v.teamName ?? undefined,
      joinedAt: 0,
    }));
  }, [season]);

  const playerMap = useMemo(() => new Map(players.map((p) => [p.id, p])), [players]);
  const nameByUid = useMemo(
    () => new Map(participants.map((p) => [p.uid, p.teamName || p.displayName])),
    [participants]
  );

  const sortedPicks = useMemo(
    () => [...picks].sort((a, b) => (a.pickNumber ?? 0) - (b.pickNumber ?? 0)),
    [picks]
  );

  const draftSize = season?.draftOrder?.length ?? 9;

  if (error) {
    return <p className="text-red-600 text-sm">{error}</p>;
  }

  if (!season) {
    return <p className="text-slate">Loading…</p>;
  }

  return (
    <div className="space-y-10">
      {cupOdds && <CupOddsStrip cupOdds={cupOdds} />}

      {participants.length > 0 && (
        <Standings year={year} season={season} participants={participants} />
      )}

      <section>
        <h2 className="text-xl font-semibold text-navy mb-3">Draft board</h2>
        <p className="text-xs text-slate mb-3">
          {sortedPicks.length} picks · snake order
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white border border-slate/20 rounded-sm">
            <thead className="bg-off-white">
              <tr className="text-xs uppercase text-slate">
                <th className="text-left px-3 py-2">#</th>
                <th className="text-left px-3 py-2">Rd</th>
                <th className="text-left px-3 py-2">Owner</th>
                <th className="text-left px-3 py-2">Player</th>
                <th className="text-left px-3 py-2">Pos</th>
                <th className="text-left px-3 py-2">Team</th>
              </tr>
            </thead>
            <tbody>
              {sortedPicks.map((p) => {
                const pl = playerMap.get(p.nhlPlayerId);
                const rd = Math.floor((p.pickNumber - 1) / draftSize) + 1;
                return (
                  <tr key={p.id ?? p.pickNumber} className="border-t border-slate/10">
                    <td className="px-3 py-1.5 text-slate tabular-nums">{p.pickNumber}</td>
                    <td className="px-3 py-1.5 text-slate tabular-nums">{rd}</td>
                    <td className="px-3 py-1.5 text-navy">
                      {nameByUid.get(p.participantUid) ?? '?'}
                    </td>
                    <td className="px-3 py-1.5 text-navy font-medium">
                      {pl?.fullName ?? p.nhlPlayerId}
                    </td>
                    <td className="px-3 py-1.5 text-slate">{pl?.position ?? '?'}</td>
                    <td className="px-3 py-1.5 text-slate">{pl?.nhlTeam ?? '?'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function CupOddsStrip({ cupOdds }: { cupOdds: CupOdds }) {
  const entries = Object.entries(cupOdds.teams)
    .map(([abbr, t]) => ({ abbr, ...t }))
    .sort((a, b) => b.cup - a.cup);
  const top = entries.slice(0, 8);
  return (
    <section>
      <h2 className="text-xl font-semibold text-navy mb-2">Cup odds</h2>
      <div className="flex flex-wrap gap-2">
        {top.map((t) => (
          <div
            key={t.abbr}
            className="bg-white border border-slate/20 rounded-sm px-3 py-2 text-sm flex items-baseline gap-2"
          >
            <span className="font-semibold text-navy">{t.abbr}</span>
            <span className="text-slate text-xs">{(t.cup * 100).toFixed(1)}%</span>
          </div>
        ))}
        <span className="text-xs text-slate self-center">
          (+{entries.length - top.length} more)
        </span>
      </div>
    </section>
  );
}
