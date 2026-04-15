'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { getFirebase } from '../_lib/firebase';
import { useAuth } from '../_lib/auth';
import { logAudit } from '../_lib/audit';
import type {
  Season,
  Participant,
  NHLPlayer,
  DraftPick,
  PlayerStats,
  BonusPoints,
  AuditEntry,
  AuditAction,
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
  const { user } = useAuth();
  const [players, setPlayers] = useState<NHLPlayer[]>([]);
  const [picks, setPicks] = useState<DraftPick[]>([]);
  const [stats, setStats] = useState<Map<string, PlayerStats>>(new Map());
  const [bonusByPlayer, setBonusByPlayer] = useState<Map<string, number>>(new Map());
  const [bonuses, setBonuses] = useState<BonusPoints[]>([]);
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);
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
      const list: BonusPoints[] = [];
      for (const d of snap.docs) {
        const b = { ...(d.data() as BonusPoints), id: d.id };
        list.push(b);
        map.set(b.nhlPlayerId, (map.get(b.nhlPlayerId) ?? 0) + b.points);
      }
      list.sort((a, b) => b.addedAt - a.addedAt);
      setBonusByPlayer(map);
      setBonuses(list);
    });
  }, [yearStr]);

  useEffect(() => {
    const { db } = getFirebase();
    const q = query(
      collection(db, 'seasons', yearStr, 'auditLog'),
      orderBy('createdAt', 'desc'),
      limit(30)
    );
    return onSnapshot(q, (snap) =>
      setAuditEntries(snap.docs.map((d) => ({ ...(d.data() as AuditEntry), id: d.id })))
    );
  }, [yearStr]);

  const playerMap = useMemo(() => new Map(players.map((p) => [p.id, p])), [players]);
  const eliminatedSet = useMemo(
    () => new Set(season.eliminatedTeams ?? []),
    [season.eliminatedTeams]
  );

  function actor() {
    return { uid: user?.uid ?? 'unknown', email: user?.email ?? null };
  }

  async function toggleTeamEliminated(team: string) {
    setError(null);
    const current = new Set(season.eliminatedTeams ?? []);
    const eliminating = !current.has(team);
    if (eliminating) current.add(team);
    else current.delete(team);
    const next = Array.from(current).sort();
    try {
      const { db } = getFirebase();
      await updateDoc(doc(db, 'seasons', yearStr), { eliminatedTeams: next });
      await logAudit(
        db,
        year,
        eliminating ? 'team-eliminated' : 'team-reinstated',
        actor(),
        { team }
      );
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
      await logAudit(db, year, 'mid-draft-started', actor(), {
        round: nextRound,
        participants: order.length,
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
      await logAudit(db, year, 'mid-draft-finished', actor(), {
        round: season.currentNHLRound,
      });
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
      await logAudit(db, year, 'season-completed', actor(), {});
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white border border-slate/20 p-4 rounded-sm space-y-6">
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

      <BonusPointsForm
        year={year}
        players={players}
        actor={actor()}
        onSaved={(msg) => setStatus(msg)}
        onError={(msg) => setError(msg)}
      />

      <RecentBonuses bonuses={bonuses} playerMap={playerMap} />

      <AuditLogView entries={auditEntries} />

      {status && <p className="text-sm text-slate">{status}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}

function BonusPointsForm({
  year,
  players,
  actor,
  onSaved,
  onError,
}: {
  year: number;
  players: NHLPlayer[];
  actor: { uid: string; email: string | null };
  onSaved: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<NHLPlayer | null>(null);
  const [points, setPoints] = useState('');
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);

  const matches = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return players
      .filter((p) => p.fullName.toLowerCase().includes(q))
      .slice(0, 8);
  }, [players, search]);

  async function save() {
    onError('');
    const pts = Number(points);
    if (!selected) {
      onError('Pick a player first.');
      return;
    }
    if (!Number.isFinite(pts) || pts === 0) {
      onError('Enter a non-zero point value.');
      return;
    }
    if (!reason.trim()) {
      onError('Add a short reason.');
      return;
    }
    setSaving(true);
    try {
      const { db } = getFirebase();
      await addDoc(collection(db, 'seasons', String(year), 'bonusPoints'), {
        nhlPlayerId: selected.id,
        points: pts,
        reason: reason.trim(),
        addedByUid: actor.uid,
        addedAt: Date.now(),
      });
      await logAudit(db, year, 'bonus-added', actor, {
        player: selected.fullName,
        nhlPlayerId: selected.id,
        points: pts,
        reason: reason.trim(),
      });
      onSaved(`Awarded ${pts} bonus to ${selected.fullName}.`);
      setSelected(null);
      setSearch('');
      setPoints('');
      setReason('');
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Failed to save bonus');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section>
      <h4 className="font-semibold text-navy text-sm mb-2">Bonus points</h4>
      <p className="text-xs text-slate mb-2">
        Award one-off points (hat tricks, playoff records, etc). Use a negative
        number to correct a mistaken grant.
      </p>
      <div className="space-y-2">
        {selected ? (
          <div className="flex items-center justify-between bg-off-white border border-slate/30 rounded-sm px-3 py-2">
            <span className="text-sm text-navy">
              {selected.fullName}{' '}
              <span className="text-xs text-slate">
                · {selected.position} · {selected.nhlTeam}
              </span>
            </span>
            <button
              onClick={() => {
                setSelected(null);
                setSearch('');
              }}
              className="text-xs text-slate underline"
            >
              change
            </button>
          </div>
        ) : (
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search player…"
              className="w-full px-3 py-2 border border-slate/30 rounded-sm focus:outline-none focus:border-navy text-sm"
            />
            {matches.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full bg-white border border-slate/30 rounded-sm shadow max-h-48 overflow-auto">
                {matches.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => {
                        setSelected(p);
                        setSearch('');
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-off-white"
                    >
                      <span className="text-navy">{p.fullName}</span>{' '}
                      <span className="text-xs text-slate">
                        · {p.position} · {p.nhlTeam}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="Points"
            type="number"
            className="w-24 px-3 py-2 border border-slate/30 rounded-sm focus:outline-none focus:border-navy text-sm"
          />
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason (e.g. hat trick)"
            maxLength={80}
            className="flex-1 px-3 py-2 border border-slate/30 rounded-sm focus:outline-none focus:border-navy text-sm"
          />
          <button
            onClick={save}
            disabled={saving || !selected}
            className="px-4 py-2 bg-navy text-off-white rounded-sm text-sm font-semibold disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Award'}
          </button>
        </div>
      </div>
    </section>
  );
}

function RecentBonuses({
  bonuses,
  playerMap,
}: {
  bonuses: BonusPoints[];
  playerMap: Map<string, NHLPlayer>;
}) {
  if (bonuses.length === 0) return null;
  const recent = bonuses.slice(0, 8);
  return (
    <section>
      <h4 className="font-semibold text-navy text-sm mb-2">Recent bonuses</h4>
      <ul className="space-y-1 text-sm">
        {recent.map((b) => {
          const p = playerMap.get(b.nhlPlayerId);
          return (
            <li key={b.id} className="flex justify-between gap-2 text-slate">
              <span className="truncate">
                <span className="font-mono text-navy">
                  {b.points > 0 ? `+${b.points}` : b.points}
                </span>{' '}
                <span className="text-navy">{p?.fullName ?? b.nhlPlayerId}</span>{' '}
                — {b.reason}
              </span>
              <span className="text-xs shrink-0">
                {new Date(b.addedAt).toLocaleDateString()}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function AuditLogView({ entries }: { entries: AuditEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <section>
      <h4 className="font-semibold text-navy text-sm mb-2">Audit log</h4>
      <ul className="space-y-1 text-xs font-mono">
        {entries.map((e) => (
          <li key={e.id} className="flex gap-2 text-slate">
            <span className="shrink-0 tabular-nums">
              {new Date(e.createdAt).toLocaleString()}
            </span>
            <span className="text-navy">{labelFor(e.action)}</span>
            <span className="truncate">
              {summarize(e.action, e.details)} · {e.actorEmail}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function labelFor(a: AuditAction): string {
  switch (a) {
    case 'team-eliminated': return 'TEAM_OUT';
    case 'team-reinstated': return 'TEAM_BACK';
    case 'mid-draft-started': return 'MIDDRAFT_START';
    case 'mid-draft-finished': return 'MIDDRAFT_END';
    case 'season-completed': return 'SEASON_END';
    case 'bonus-added': return 'BONUS';
    case 'stats-synced': return 'STATS_SYNC';
  }
}

function summarize(
  a: AuditAction,
  d: Record<string, string | number | boolean | null>
): string {
  switch (a) {
    case 'team-eliminated':
    case 'team-reinstated':
      return String(d.team ?? '');
    case 'mid-draft-started':
      return `round ${d.round}`;
    case 'mid-draft-finished':
      return `round ${d.round}`;
    case 'bonus-added':
      return `${d.points} to ${d.player} (${d.reason})`;
    case 'stats-synced':
      return `${d.gameType === 3 ? 'playoff' : 'regular'} · ${d.count} ok, ${d.failed ?? 0} failed`;
    case 'season-completed':
      return '';
  }
}
