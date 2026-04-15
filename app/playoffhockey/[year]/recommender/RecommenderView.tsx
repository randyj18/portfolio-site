'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { getFirebase } from '../../_lib/firebase';
import { useAuth } from '../../_lib/auth';
import { COMMISSIONER_EMAIL } from '../../_lib/constants';
import type { DraftPick, Participant, Season } from '../../_lib/types';

type ProjectionRow = {
  id: string;
  fullName: string;
  position: 'F' | 'D' | 'G';
  team: string;
  projected: number | null;
  ppgAdj: number | null;
  eGp: number;
  eTeamWins: number;
  detail: Record<string, unknown>;
};

type TeamMeta = {
  abbr: string;
  name: string;
  conf: string;
  div: string;
  r1: number;
  r2: number;
  r3: number;
  cup: number;
  eGamesPlayed: number;
  eWins: number;
};

type Projections = {
  generatedAt: string;
  year: number;
  snapshot: string;
  teams: Record<string, TeamMeta>;
  projections: ProjectionRow[];
};

type PosFilter = 'ALL' | 'F' | 'D' | 'G';

export default function RecommenderView({ year }: { year: number }) {
  const { user } = useAuth();
  const yearStr = String(year);
  const [season, setSeason] = useState<Season | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [picks, setPicks] = useState<DraftPick[]>([]);
  const [proj, setProj] = useState<Projections | null>(null);
  const [posFilter, setPosFilter] = useState<PosFilter>('ALL');
  const [teamFilter, setTeamFilter] = useState<string>('ALL');
  const [hideDrafted, setHideDrafted] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(doc(db, 'seasons', yearStr), (snap) =>
      setSeason(snap.exists() ? (snap.data() as Season) : null)
    );
  }, [yearStr]);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(
      collection(db, 'seasons', yearStr, 'participants'),
      (snap) => setParticipants(snap.docs.map((d) => d.data() as Participant))
    );
  }, [yearStr]);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(collection(db, 'seasons', yearStr, 'draftPicks'), (snap) =>
      setPicks(
        snap.docs
          .map((d) => ({ ...(d.data() as DraftPick), id: d.id }))
          .sort((a, b) => (a.pickNumber ?? 0) - (b.pickNumber ?? 0))
      )
    );
  }, [yearStr]);

  useEffect(() => {
    fetch('/playoff-pool/projections.json', { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => setProj(data as Projections))
      .catch((e) => setError(`projections: ${e.message}`));
  }, []);

  const isCommissioner = user?.email === COMMISSIONER_EMAIL;

  const draftedIds = useMemo(() => {
    const s = new Set<string>();
    for (const p of picks) if (!p.droppedAt) s.add(p.nhlPlayerId);
    return s;
  }, [picks]);

  const draftedMap = useMemo(() => {
    const m = new Map<string, DraftPick>();
    for (const p of picks) if (!p.droppedAt) m.set(p.nhlPlayerId, p);
    return m;
  }, [picks]);

  const nameByUid = useMemo(
    () => new Map(participants.map((p) => [p.uid, p.teamName || p.displayName])),
    [participants]
  );

  const myPicks = useMemo(() => {
    if (!user) return [];
    return picks.filter((p) => p.participantUid === user.uid && !p.droppedAt);
  }, [picks, user]);

  const myRosterByPos = useMemo(() => {
    const by: Record<'F' | 'D' | 'G', ProjectionRow[]> = { F: [], D: [], G: [] };
    if (!proj) return by;
    const byId = new Map(proj.projections.map((p) => [p.id, p]));
    for (const pk of myPicks) {
      const row = byId.get(pk.nhlPlayerId);
      if (row) by[row.position].push(row);
    }
    return by;
  }, [myPicks, proj]);

  const nextPick = useMemo(() => {
    if (!season || !Array.isArray(season.draftOrder)) return null;
    const n = season.draftOrder.length;
    if (n === 0) return null;
    const made = picks.filter((p) => p.draftedInRound === 0).length;
    const round = Math.floor(made / n);
    if (round >= 7) return null;
    const idxInRound = made % n;
    const row = round % 2 === 0 ? season.draftOrder : [...season.draftOrder].reverse();
    const uid = row[idxInRound];
    return { pickNumber: made + 1, round: round + 1, participantUid: uid };
  }, [season, picks]);

  const allTeams = useMemo(() => {
    if (!proj) return [];
    return Object.keys(proj.teams).sort();
  }, [proj]);

  const filtered = useMemo(() => {
    if (!proj) return [];
    const q = search.trim().toLowerCase();
    return proj.projections.filter((p) => {
      if (posFilter !== 'ALL' && p.position !== posFilter) return false;
      if (teamFilter !== 'ALL' && p.team !== teamFilter) return false;
      if (hideDrafted && draftedIds.has(p.id)) return false;
      if (q && !p.fullName.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [proj, posFilter, teamFilter, hideDrafted, search, draftedIds]);

  if (!user) {
    return <p className="text-slate">Sign in to view.</p>;
  }
  if (!isCommissioner) {
    return <p className="text-slate">Restricted to commissioner.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href={`/playoffhockey/${year}`} className="text-sm text-slate underline hover:text-navy">
          ← Back to season
        </Link>
        {proj && (
          <p className="text-xs text-slate">
            Snapshot: {proj.snapshot} · {new Date(proj.generatedAt).toLocaleString()}
          </p>
        )}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StatusCard season={season} nextPick={nextPick} nameByUid={nameByUid} />
        <MyRosterCard byPos={myRosterByPos} />
        <TeamGridCard teams={proj?.teams ?? {}} />
      </div>

      <section className="bg-white border border-slate/20 rounded-sm p-4">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h2 className="text-lg font-semibold text-navy">Projections</h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search player…"
            className="flex-1 min-w-[160px] px-3 py-1 border border-slate/30 rounded-sm text-sm"
          />
          <select
            value={posFilter}
            onChange={(e) => setPosFilter(e.target.value as PosFilter)}
            className="px-2 py-1 border border-slate/30 rounded-sm text-sm"
          >
            <option value="ALL">All pos</option>
            <option value="F">F</option>
            <option value="D">D</option>
            <option value="G">G</option>
          </select>
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="px-2 py-1 border border-slate/30 rounded-sm text-sm"
          >
            <option value="ALL">All teams</option>
            {allTeams.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <label className="text-sm text-slate flex items-center gap-1">
            <input
              type="checkbox"
              checked={hideDrafted}
              onChange={(e) => setHideDrafted(e.target.checked)}
            />
            Hide drafted
          </label>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate uppercase border-b border-slate/20">
                <th className="text-left py-1 px-2">Rank</th>
                <th className="text-left py-1 px-2">Player</th>
                <th className="text-left py-1 px-2">Pos</th>
                <th className="text-left py-1 px-2">Team</th>
                <th className="text-right py-1 px-2">Proj</th>
                <th className="text-right py-1 px-2">PPG×</th>
                <th className="text-right py-1 px-2">E[GP]</th>
                <th className="text-right py-1 px-2">E[W]</th>
                <th className="text-right py-1 px-2">R1</th>
                <th className="text-right py-1 px-2">R2</th>
                <th className="text-right py-1 px-2">R3</th>
                <th className="text-right py-1 px-2">Cup</th>
                <th className="text-left py-1 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 200).map((p, i) => {
                const team = proj?.teams[p.team];
                const pick = draftedMap.get(p.id);
                return (
                  <tr
                    key={p.id}
                    className={`border-t border-slate/10 ${pick ? 'opacity-60' : ''}`}
                  >
                    <td className="py-1 px-2 text-slate tabular-nums">{i + 1}</td>
                    <td className="py-1 px-2 text-navy">{p.fullName}</td>
                    <td className="py-1 px-2 text-slate">{p.position}</td>
                    <td className="py-1 px-2 font-mono text-xs">{p.team}</td>
                    <td className="py-1 px-2 text-right tabular-nums font-semibold text-navy">
                      {p.projected != null ? p.projected.toFixed(1) : '–'}
                    </td>
                    <td className="py-1 px-2 text-right tabular-nums text-slate">
                      {p.ppgAdj != null ? p.ppgAdj.toFixed(2) : '–'}
                    </td>
                    <td className="py-1 px-2 text-right tabular-nums text-slate">
                      {p.eGp.toFixed(1)}
                    </td>
                    <td className="py-1 px-2 text-right tabular-nums text-slate">
                      {p.eTeamWins.toFixed(1)}
                    </td>
                    <td className="py-1 px-2 text-right text-xs text-slate">
                      {team ? pct(team.r1) : '–'}
                    </td>
                    <td className="py-1 px-2 text-right text-xs text-slate">
                      {team ? pct(team.r2) : '–'}
                    </td>
                    <td className="py-1 px-2 text-right text-xs text-slate">
                      {team ? pct(team.r3) : '–'}
                    </td>
                    <td className="py-1 px-2 text-right text-xs text-slate">
                      {team ? pct(team.cup) : '–'}
                    </td>
                    <td className="py-1 px-2 text-xs">
                      {pick ? (
                        <span className="text-slate">
                          {nameByUid.get(pick.participantUid) ?? 'taken'}
                        </span>
                      ) : (
                        <span className="text-green-700">available</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-sm text-slate py-4">No matches.</p>
          )}
          {filtered.length > 200 && (
            <p className="text-xs text-slate py-2">Showing top 200 of {filtered.length}.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function StatusCard({
  season,
  nextPick,
  nameByUid,
}: {
  season: Season | null;
  nextPick: { pickNumber: number; round: number; participantUid: string } | null;
  nameByUid: Map<string, string>;
}) {
  return (
    <div className="bg-white border border-slate/20 rounded-sm p-4">
      <h3 className="text-sm font-semibold text-navy mb-2">Draft status</h3>
      {!season ? (
        <p className="text-sm text-slate">Loading…</p>
      ) : (
        <>
          <p className="text-sm text-slate">
            Phase: <b>{season.status}</b> · NHL round {season.currentNHLRound}
          </p>
          {nextPick && (
            <p className="text-sm text-navy mt-2">
              On the clock: round {nextPick.round} pick {nextPick.pickNumber} —{' '}
              <b>{nameByUid.get(nextPick.participantUid) ?? 'unknown'}</b>
            </p>
          )}
        </>
      )}
    </div>
  );
}

function MyRosterCard({
  byPos,
}: {
  byPos: Record<'F' | 'D' | 'G', ProjectionRow[]>;
}) {
  const total =
    byPos.F.reduce((s, p) => s + (p.projected ?? 0), 0) +
    byPos.D.reduce((s, p) => s + (p.projected ?? 0), 0) +
    byPos.G.reduce((s, p) => s + (p.projected ?? 0), 0);
  return (
    <div className="bg-white border border-slate/20 rounded-sm p-4">
      <h3 className="text-sm font-semibold text-navy mb-2">
        My roster · {total.toFixed(1)} projected
      </h3>
      {(['F', 'D', 'G'] as const).map((pos) => (
        <div key={pos} className="mb-1">
          <div className="text-xs text-slate">
            {pos} ({byPos[pos].length})
          </div>
          {byPos[pos].length === 0 ? (
            <div className="text-xs text-slate italic">none</div>
          ) : (
            <ul className="text-sm">
              {byPos[pos].map((p) => (
                <li key={p.id} className="flex justify-between gap-2">
                  <span className="text-navy truncate">{p.fullName}</span>
                  <span className="tabular-nums text-slate">
                    {p.team} · {p.projected != null ? p.projected.toFixed(1) : '–'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function TeamGridCard({ teams }: { teams: Record<string, TeamMeta> }) {
  const rows = Object.values(teams).sort((a, b) => b.cup - a.cup);
  return (
    <div className="bg-white border border-slate/20 rounded-sm p-4">
      <h3 className="text-sm font-semibold text-navy mb-2">Teams</h3>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-slate uppercase">
            <th className="text-left">Team</th>
            <th className="text-right">Cup</th>
            <th className="text-right">E[GP]</th>
            <th className="text-right">E[W]</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.abbr} className="border-t border-slate/10">
              <td className="py-1 font-mono text-navy">{t.abbr}</td>
              <td className="py-1 text-right tabular-nums">{pct(t.cup)}</td>
              <td className="py-1 text-right tabular-nums">{t.eGamesPlayed.toFixed(1)}</td>
              <td className="py-1 text-right tabular-nums">{t.eWins.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function pct(v: number): string {
  return `${(v * 100).toFixed(0)}%`;
}
