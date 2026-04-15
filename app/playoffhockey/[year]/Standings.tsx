'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { getFirebase } from '../_lib/firebase';
import type {
  Season,
  Participant,
  NHLPlayer,
  DraftPick,
  PlayerStats,
  BonusPoints,
} from '../_lib/types';

const SCORING = {
  goal: 1,
  assist: 1,
  win: 2,
  shutout: 1,
} as const;

function scoreForPlayer(player: NHLPlayer | undefined, stats: PlayerStats | undefined): number {
  if (!player || !stats) return 0;
  if (player.position === 'G') {
    return stats.wins * SCORING.win + stats.shutouts * SCORING.shutout;
  }
  return stats.goals * SCORING.goal + stats.assists * SCORING.assist;
}

type TeamLine = {
  uid: string;
  teamName: string;
  total: number;
  activePicks: number;
  bonusTotal: number;
  breakdown: {
    pickId: string;
    player: NHLPlayer | undefined;
    stats: PlayerStats | undefined;
    gross: number;
    pointsBeforeAcquiring: number;
    net: number;
    bonus: number;
    eliminated: boolean;
  }[];
};

export default function Standings({
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
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

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
      (snap) =>
        setPicks(snap.docs.map((d) => ({ ...(d.data() as DraftPick), id: d.id }))),
      (e) => setError(e.message)
    );
  }, [yearStr]);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(
      collection(db, 'seasons', yearStr, 'playerStats'),
      (snap) => {
        const map = new Map<string, PlayerStats>();
        for (const d of snap.docs) {
          const s = d.data() as PlayerStats;
          map.set(s.nhlPlayerId, s);
        }
        setStats(map);
      },
      (e) => setError(e.message)
    );
  }, [yearStr]);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(
      collection(db, 'seasons', yearStr, 'bonusPoints'),
      (snap) => {
        const map = new Map<string, number>();
        for (const d of snap.docs) {
          const b = d.data() as BonusPoints;
          map.set(b.nhlPlayerId, (map.get(b.nhlPlayerId) ?? 0) + b.points);
        }
        setBonusByPlayer(map);
      },
      () => {}
    );
  }, [yearStr]);

  const playerMap = useMemo(() => new Map(players.map((p) => [p.id, p])), [players]);
  const nameByUid = useMemo(
    () => new Map(participants.map((p) => [p.uid, p.teamName || p.displayName])),
    [participants]
  );

  const eliminatedSet = useMemo(
    () => new Set(season.eliminatedTeams ?? []),
    [season.eliminatedTeams]
  );

  const lines: TeamLine[] = useMemo(() => {
    const byUid = new Map<string, TeamLine>();
    for (const p of participants) {
      byUid.set(p.uid, {
        uid: p.uid,
        teamName: p.teamName || p.displayName,
        total: 0,
        activePicks: 0,
        bonusTotal: 0,
        breakdown: [],
      });
    }
    for (const pick of picks) {
      if (pick.droppedAt) continue;
      const line = byUid.get(pick.participantUid);
      if (!line) continue;
      const player = playerMap.get(pick.nhlPlayerId);
      const s = stats.get(pick.nhlPlayerId);
      const gross = scoreForPlayer(player, s);
      const pba = pick.pointsBeforeAcquiring ?? 0;
      const bonus = bonusByPlayer.get(pick.nhlPlayerId) ?? 0;
      const net = Math.max(0, gross - pba) + bonus;
      const eliminated = !!player && eliminatedSet.has(player.nhlTeam);
      line.total += net;
      line.bonusTotal += bonus;
      if (!eliminated) line.activePicks += 1;
      line.breakdown.push({
        pickId: pick.id ?? String(pick.pickNumber),
        player,
        stats: s,
        gross,
        pointsBeforeAcquiring: pba,
        net,
        bonus,
        eliminated,
      });
    }
    return Array.from(byUid.values())
      .map((line) => ({
        ...line,
        breakdown: line.breakdown.sort((a, b) => b.net - a.net),
      }))
      .sort((a, b) => b.total - a.total || a.teamName.localeCompare(b.teamName));
  }, [participants, picks, playerMap, stats, bonusByPlayer, eliminatedSet]);

  function toggle(uid: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(uid)) next.delete(uid);
      else next.add(uid);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-navy">Standings</h2>
        <p className="text-xs text-slate">
          Scoring: 1 pt per goal & assist, 2 per goalie win, 1 per shutout. NHL round {season.currentNHLRound}.
        </p>
      </div>

      {lines.length === 0 ? (
        <p className="text-sm text-slate">No participants yet.</p>
      ) : (
        <ol className="space-y-2">
          {lines.map((line, rank) => {
            const isOpen = expanded.has(line.uid);
            return (
              <li
                key={line.uid}
                className="bg-white border border-slate/20 rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(line.uid)}
                  className="w-full flex items-center justify-between gap-3 p-3 text-left hover:bg-off-white"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 text-center text-slate font-mono text-sm">
                      {rank + 1}
                    </span>
                    <span className="font-semibold text-navy truncate">
                      {line.teamName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate">
                      {line.activePicks} active
                    </span>
                    <span className="text-lg font-bold text-navy tabular-nums">
                      {line.total}
                    </span>
                    <span className="text-slate text-sm">{isOpen ? '▾' : '▸'}</span>
                  </div>
                </button>
                {isOpen && <RosterBreakdown line={line} />}
              </li>
            );
          })}
        </ol>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}

function RosterBreakdown({ line }: { line: TeamLine }) {
  return (
    <div className="border-t border-slate/20 bg-off-white px-3 py-2">
      {line.breakdown.length === 0 ? (
        <p className="text-sm text-slate py-2">No active players.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate uppercase">
              <th className="text-left py-1">Player</th>
              <th className="text-left py-1">Pos</th>
              <th className="text-right py-1">Raw</th>
              <th className="text-right py-1">PBA</th>
              <th className="text-right py-1">Bonus</th>
              <th className="text-right py-1">Net</th>
            </tr>
          </thead>
          <tbody>
            {line.breakdown.map((row) => (
              <tr key={row.pickId} className="border-t border-slate/10">
                <td className={`py-1 ${row.eliminated ? 'text-slate line-through' : 'text-navy'}`}>
                  {row.player?.fullName ?? '?'}
                </td>
                <td className="py-1 text-slate text-xs">
                  {row.player?.position} · {row.player?.nhlTeam}
                  {row.eliminated && ' · OUT'}
                </td>
                <td className="py-1 text-right tabular-nums text-slate">
                  {row.gross}
                </td>
                <td className="py-1 text-right tabular-nums text-slate">
                  {row.pointsBeforeAcquiring || '–'}
                </td>
                <td className="py-1 text-right tabular-nums text-slate">
                  {row.bonus || '–'}
                </td>
                <td className="py-1 text-right tabular-nums text-navy font-semibold">
                  {row.net}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
