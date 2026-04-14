'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  updateDoc,
} from 'firebase/firestore';
import { getFirebase } from '../_lib/firebase';
import type {
  Season,
  Participant,
  NHLPlayer,
  DraftPick,
  PlayerStats,
} from '../_lib/types';
import {
  INITIAL_DRAFT_ROUNDS,
  canPickPosition,
  computeInitialDraftSchedule,
  countByPosition,
  nextOpenPickNumber,
} from '../_lib/draft';

type Tab = 'available' | 'roster' | 'board';

export default function DraftRoom({
  year,
  season,
  participants,
  currentUid,
  isCommissioner,
}: {
  year: number;
  season: Season;
  participants: Participant[];
  currentUid: string;
  isCommissioner: boolean;
}) {
  const yearStr = String(year);
  const statsSource = season.status === 'initial-draft' ? 'regularSeasonStats' : 'playerStats';
  const statsLabel = season.status === 'initial-draft' ? "'25-26 Reg" : 'Playoff';

  const [players, setPlayers] = useState<NHLPlayer[]>([]);
  const [picks, setPicks] = useState<DraftPick[]>([]);
  const [stats, setStats] = useState<Map<string, PlayerStats>>(new Map());
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState<'all' | 'F' | 'D' | 'G'>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [showDrafted, setShowDrafted] = useState(false);
  const [page, setPage] = useState(0);
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startingPlayoffs, setStartingPlayoffs] = useState(false);
  const [tab, setTab] = useState<Tab>('available');

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(
      collection(db, 'nhlPlayers'),
      (snap) => setPlayers(snap.docs.map((d) => d.data() as NHLPlayer)),
      (err) => setError(err.message)
    );
  }, []);

  useEffect(() => {
    const { db } = getFirebase();
    const q = query(
      collection(db, 'seasons', yearStr, 'draftPicks'),
      orderBy('pickNumber', 'asc')
    );
    return onSnapshot(
      q,
      (snap) => setPicks(snap.docs.map((d) => ({ ...(d.data() as DraftPick), id: d.id }))),
      (err) => setError(err.message)
    );
  }, [yearStr]);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(
      collection(db, 'seasons', yearStr, statsSource),
      (snap) => {
        const map = new Map<string, PlayerStats>();
        for (const d of snap.docs) {
          const s = d.data() as PlayerStats;
          map.set(s.nhlPlayerId, s);
        }
        setStats(map);
      },
      () => {}
    );
  }, [yearStr, statsSource]);

  const draftOrder = season.draftOrder ?? [];
  const schedule = useMemo(() => computeInitialDraftSchedule(draftOrder), [draftOrder]);
  const totalSlots = draftOrder.length * INITIAL_DRAFT_ROUNDS;
  const initialPicks = picks.filter((p) => p.draftedInRound === 0);
  const nextPickNum = nextOpenPickNumber(initialPicks, totalSlots);
  const draftComplete = nextPickNum === -1;
  const currentSlot = draftComplete ? null : schedule[nextPickNum - 1];
  const onTheClockUid = currentSlot?.participantUid;
  const isMyTurn = onTheClockUid === currentUid;

  const playerMap = useMemo(() => new Map(players.map((p) => [p.id, p])), [players]);
  const pickedPlayerIds = useMemo(
    () => new Set(initialPicks.map((p) => p.nhlPlayerId)),
    [initialPicks]
  );

  const myPicks = initialPicks.filter((p) => p.participantUid === currentUid);
  const myCounts = countByPosition(myPicks, playerMap);

  const nameByUid = useMemo(
    () => new Map(participants.map((p) => [p.uid, p.teamName || p.displayName])),
    [participants]
  );

  const teams = useMemo(() => {
    const set = new Set(players.map((p) => p.nhlTeam));
    return Array.from(set).sort();
  }, [players]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return players
      .filter((p) => {
        if (!showDrafted && pickedPlayerIds.has(p.id)) return false;
        if (positionFilter !== 'all' && p.position !== positionFilter) return false;
        if (teamFilter !== 'all' && p.nhlTeam !== teamFilter) return false;
        if (term) {
          if (
            !p.fullName.toLowerCase().includes(term) &&
            !p.nhlTeam.toLowerCase().includes(term)
          )
            return false;
        }
        return true;
      })
      .sort((a, b) => {
        const sa = stats.get(a.id);
        const sb = stats.get(b.id);
        const va = a.position === 'G' ? (sa?.wins ?? 0) : (sa?.goals ?? 0) + (sa?.assists ?? 0);
        const vb = b.position === 'G' ? (sb?.wins ?? 0) : (sb?.goals ?? 0) + (sb?.assists ?? 0);
        if (va !== vb) return vb - va;
        return a.fullName.localeCompare(b.fullName);
      });
  }, [players, pickedPlayerIds, positionFilter, teamFilter, search, showDrafted, stats]);

  useEffect(() => {
    setPage(0);
  }, [search, positionFilter, teamFilter, showDrafted]);

  async function makePick(player: NHLPlayer) {
    if (!isMyTurn || picking || draftComplete || !currentSlot) return;
    if (!canPickPosition(myCounts, player.position, myPicks.length)) {
      setError(
        `Can't pick ${player.position} — would prevent filling the minimum 3F/2D/1G roster.`
      );
      return;
    }
    setPicking(true);
    setError(null);
    try {
      const { db } = getFirebase();
      const pickRef = doc(
        db,
        'seasons',
        yearStr,
        'draftPicks',
        String(currentSlot.pickNumber)
      );
      await runTransaction(db, async (tx) => {
        const existing = await tx.get(pickRef);
        if (existing.exists()) {
          throw new Error('That pick was already made. Refresh and try again.');
        }
        tx.set(pickRef, {
          participantUid: currentUid,
          nhlPlayerId: player.id,
          draftedInRound: 0,
          pickNumber: currentSlot.pickNumber,
          acquiredAt: Date.now(),
          pointsBeforeAcquiring: 0,
        });
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Pick failed');
    } finally {
      setPicking(false);
    }
  }

  async function startPlayoffs() {
    if (!isCommissioner) return;
    if (!confirm('Mark initial draft complete and start playoffs?')) return;
    setStartingPlayoffs(true);
    try {
      const { db } = getFirebase();
      await updateDoc(doc(db, 'seasons', yearStr), { status: 'playoffs' });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to start playoffs');
    } finally {
      setStartingPlayoffs(false);
    }
  }

  if (draftOrder.length === 0) return null;

  const available = (
    <AvailablePlayers
      filtered={filtered}
      pickedPlayerIds={pickedPlayerIds}
      stats={stats}
      statsLabel={statsLabel}
      search={search}
      setSearch={setSearch}
      positionFilter={positionFilter}
      setPositionFilter={setPositionFilter}
      teamFilter={teamFilter}
      setTeamFilter={setTeamFilter}
      teams={teams}
      showDrafted={showDrafted}
      setShowDrafted={setShowDrafted}
      isMyTurn={isMyTurn}
      myCounts={myCounts}
      myPicksCount={myPicks.length}
      onPick={makePick}
      picking={picking}
      page={page}
      setPage={setPage}
    />
  );

  const roster = (
    <MyRoster
      picks={myPicks}
      playerMap={playerMap}
      stats={stats}
      statsLabel={statsLabel}
      counts={myCounts}
    />
  );

  const board = (
    <DraftBoard
      picks={initialPicks}
      playerMap={playerMap}
      draftOrder={draftOrder}
      nameByUid={nameByUid}
    />
  );

  // Desktop "side" tab = roster or board (not available, which is always visible on desktop)
  const sideTab: 'roster' | 'board' = tab === 'board' ? 'board' : 'roster';

  return (
    <div className="space-y-6">
      {draftComplete ? (
        <div className="bg-white border-l-4 border-green-600 p-4 rounded-sm">
          <p className="text-navy font-semibold">Initial draft complete.</p>
          {isCommissioner && (
            <button
              onClick={startPlayoffs}
              disabled={startingPlayoffs}
              className="mt-3 px-4 py-2 bg-orange-burnt text-off-white rounded-sm font-semibold disabled:opacity-50"
            >
              {startingPlayoffs ? 'Starting…' : 'Start playoffs'}
            </button>
          )}
        </div>
      ) : (
        <OnTheClock
          isMyTurn={isMyTurn}
          onClockName={nameByUid.get(onTheClockUid ?? '') ?? 'Unknown'}
          pickNumber={currentSlot?.pickNumber ?? 0}
          totalSlots={totalSlots}
          round={(currentSlot?.round ?? 0) + 1}
        />
      )}

      {!draftComplete && (
        <UpcomingPicks
          schedule={schedule}
          fromPickNumber={nextPickNum}
          nameByUid={nameByUid}
          currentUid={currentUid}
        />
      )}

      {/* Mobile: full tab bar switching one panel */}
      <div className="lg:hidden space-y-3">
        <TabBar<Tab>
          tabs={[
            { id: 'available', label: 'Available' },
            { id: 'roster', label: `My roster (${myPicks.length}/7)` },
            { id: 'board', label: 'Draft board' },
          ]}
          active={tab}
          onChange={setTab}
        />
        {tab === 'available' && !draftComplete && available}
        {tab === 'available' && draftComplete && (
          <p className="text-sm text-slate">Draft complete.</p>
        )}
        {tab === 'roster' && roster}
        {tab === 'board' && board}
      </div>

      {/* Desktop: two columns — available left, roster/board toggled right */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start">
        <div>{!draftComplete ? available : <p className="text-sm text-slate">Draft complete.</p>}</div>
        <div className="space-y-3">
          <TabBar<'roster' | 'board'>
            tabs={[
              { id: 'roster', label: `My roster (${myPicks.length}/7)` },
              { id: 'board', label: 'Draft board' },
            ]}
            active={sideTab}
            onChange={(t) => setTab(t)}
          />
          {sideTab === 'roster' ? roster : board}
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}

function TabBar<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="flex gap-1 border-b border-slate/20">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-3 py-2 text-sm font-semibold border-b-2 -mb-px transition-colors ${
            active === t.id
              ? 'border-orange-burnt text-navy'
              : 'border-transparent text-slate hover:text-navy'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function OnTheClock({
  isMyTurn,
  onClockName,
  pickNumber,
  totalSlots,
  round,
}: {
  isMyTurn: boolean;
  onClockName: string;
  pickNumber: number;
  totalSlots: number;
  round: number;
}) {
  return (
    <div
      className={`p-4 rounded-sm border-l-4 ${
        isMyTurn
          ? 'bg-orange-burnt/10 border-orange-burnt'
          : 'bg-white border-slate/40'
      }`}
    >
      <p className="text-xs uppercase tracking-wide text-slate">On the clock</p>
      <p className="text-xl font-bold text-navy">
        {onClockName}
        {isMyTurn && <span className="text-orange-burnt"> — you&apos;re up!</span>}
      </p>
      <p className="text-sm text-slate">
        Pick {pickNumber} of {totalSlots} · Round {round}
      </p>
    </div>
  );
}

function UpcomingPicks({
  schedule,
  fromPickNumber,
  nameByUid,
  currentUid,
}: {
  schedule: { pickNumber: number; participantUid: string }[];
  fromPickNumber: number;
  nameByUid: Map<string, string>;
  currentUid: string;
}) {
  const upcoming = schedule.slice(fromPickNumber, fromPickNumber + 4);
  if (upcoming.length === 0) return null;
  return (
    <div className="text-xs text-slate">
      <span className="font-semibold">Next:</span>{' '}
      {upcoming.map((s, i) => (
        <span key={s.pickNumber}>
          {i > 0 && ' · '}
          <span className={s.participantUid === currentUid ? 'text-orange-burnt font-semibold' : ''}>
            {nameByUid.get(s.participantUid) ?? '?'}
          </span>
        </span>
      ))}
    </div>
  );
}

function StatCell({
  player,
  stats,
}: {
  player: NHLPlayer | undefined;
  stats: PlayerStats | undefined;
}) {
  if (!player) return null;
  if (player.position === 'G') {
    return (
      <span className="text-xs text-slate tabular-nums">
        {stats?.wins ?? 0}W · {stats?.shutouts ?? 0}SO
      </span>
    );
  }
  const g = stats?.goals ?? 0;
  const a = stats?.assists ?? 0;
  return (
    <span className="text-xs text-slate tabular-nums">
      {g}G · {a}A · {g + a}P
    </span>
  );
}

function MyRoster({
  picks,
  playerMap,
  stats,
  statsLabel,
  counts,
}: {
  picks: DraftPick[];
  playerMap: Map<string, NHLPlayer>;
  stats: Map<string, PlayerStats>;
  statsLabel: string;
  counts: { F: number; D: number; G: number };
}) {
  return (
    <div className="bg-white border border-slate/20 p-4 rounded-sm">
      <h3 className="font-semibold text-navy mb-1">Your roster ({picks.length}/7)</h3>
      <p className="text-xs text-slate mb-2">
        F: {counts.F}/3-4 · D: {counts.D}/2-3 · G: {counts.G}/1 · stats: {statsLabel}
      </p>
      {picks.length === 0 ? (
        <p className="text-sm text-slate">No picks yet.</p>
      ) : (
        <ul className="space-y-1 text-sm">
          {picks.map((pick) => {
            const player = playerMap.get(pick.nhlPlayerId);
            return (
              <li key={pick.id ?? pick.pickNumber} className="flex items-center gap-2 flex-wrap">
                <span className="text-slate font-mono text-xs">#{pick.pickNumber}</span>
                <span className="text-navy font-medium">{player?.fullName ?? '...'}</span>
                <span className="text-xs text-slate">
                  {player?.position} · {player?.nhlTeam}
                </span>
                <StatCell player={player} stats={stats.get(pick.nhlPlayerId)} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const PAGE_SIZE = 20;

function AvailablePlayers({
  filtered,
  pickedPlayerIds,
  stats,
  statsLabel,
  search,
  setSearch,
  positionFilter,
  setPositionFilter,
  teamFilter,
  setTeamFilter,
  teams,
  showDrafted,
  setShowDrafted,
  isMyTurn,
  myCounts,
  myPicksCount,
  onPick,
  picking,
  page,
  setPage,
}: {
  filtered: NHLPlayer[];
  pickedPlayerIds: Set<string>;
  stats: Map<string, PlayerStats>;
  statsLabel: string;
  search: string;
  setSearch: (s: string) => void;
  positionFilter: 'all' | 'F' | 'D' | 'G';
  setPositionFilter: (f: 'all' | 'F' | 'D' | 'G') => void;
  teamFilter: string;
  setTeamFilter: (t: string) => void;
  teams: string[];
  showDrafted: boolean;
  setShowDrafted: (v: boolean) => void;
  isMyTurn: boolean;
  myCounts: { F: number; D: number; G: number };
  myPicksCount: number;
  onPick: (p: NHLPlayer) => void;
  picking: boolean;
  page: number;
  setPage: (n: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-lg font-semibold text-navy">Available players</h2>
        <span className="text-xs text-slate">stats: {statsLabel}</span>
      </div>
      <div className="flex gap-2 mb-2 flex-wrap">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or team"
          className="flex-1 min-w-[200px] px-3 py-2 border border-slate/30 rounded-sm focus:outline-none focus:border-navy"
        />
        {(['all', 'F', 'D', 'G'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setPositionFilter(f)}
            className={`px-3 py-2 rounded-sm text-sm font-semibold ${
              positionFilter === f
                ? 'bg-navy text-off-white'
                : 'bg-white border border-slate/30 text-slate'
            }`}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="px-3 py-2 rounded-sm text-sm font-semibold bg-white border border-slate/30 text-slate focus:outline-none focus:border-navy"
        >
          <option value="all">All teams</option>
          {teams.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <label className="flex items-center gap-2 text-sm text-slate mb-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={showDrafted}
          onChange={(e) => setShowDrafted(e.target.checked)}
        />
        Show drafted players
      </label>
      <ul className="space-y-1">
        {pageItems.map((p) => {
          const drafted = pickedPlayerIds.has(p.id);
          const canPick =
            !drafted && isMyTurn && canPickPosition(myCounts, p.position, myPicksCount);
          return (
            <li
              key={p.id}
              className={`bg-white border border-slate/20 p-3 rounded-sm flex items-center justify-between gap-2 ${
                drafted ? 'opacity-50' : ''
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-navy truncate">{p.fullName}</span>
                  <span className="text-xs text-slate">
                    {p.position} · {p.nhlTeam}
                  </span>
                  <StatCell player={p} stats={stats.get(p.id)} />
                </div>
              </div>
              <button
                onClick={() => onPick(p)}
                disabled={!canPick || picking}
                className="px-3 py-1 bg-navy text-off-white text-sm rounded-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                {drafted ? 'Taken' : 'Draft'}
              </button>
            </li>
          );
        })}
      </ul>
      {filtered.length === 0 ? (
        <p className="text-sm text-slate mt-3">No players match your filter.</p>
      ) : (
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => setPage(Math.max(0, safePage - 1))}
            disabled={safePage === 0}
            className="px-3 py-1 text-sm border border-slate/30 rounded-sm disabled:opacity-30"
          >
            ← Prev
          </button>
          <span className="text-xs text-slate">
            Page {safePage + 1} of {totalPages} · {filtered.length} players
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, safePage + 1))}
            disabled={safePage >= totalPages - 1}
            className="px-3 py-1 text-sm border border-slate/30 rounded-sm disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

function DraftBoard({
  picks,
  playerMap,
  draftOrder,
  nameByUid,
}: {
  picks: DraftPick[];
  playerMap: Map<string, NHLPlayer>;
  draftOrder: string[];
  nameByUid: Map<string, string>;
}) {
  const slots = draftOrder.length;
  if (slots === 0) return null;
  const grid: (DraftPick | null)[][] = Array.from(
    { length: INITIAL_DRAFT_ROUNDS },
    () => Array(slots).fill(null)
  );
  for (const pick of picks) {
    const round = Math.floor((pick.pickNumber - 1) / slots);
    const col = draftOrder.indexOf(pick.participantUid);
    if (col !== -1 && round < INITIAL_DRAFT_ROUNDS) grid[round][col] = pick;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-navy mb-2">Draft board</h2>
      <div className="overflow-x-auto border border-slate/20 rounded-sm">
        <table className="w-full text-sm">
          <thead className="bg-off-white">
            <tr>
              <th className="text-left p-2 text-slate border-b border-slate/20 sticky left-0 bg-off-white">
                R
              </th>
              {draftOrder.map((uid) => (
                <th
                  key={uid}
                  className="text-left p-2 text-slate font-medium border-b border-slate/20 min-w-[120px]"
                >
                  {nameByUid.get(uid) ?? '?'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((row, r) => (
              <tr key={r}>
                <td className="p-2 text-slate border-b border-slate/10 sticky left-0 bg-white">
                  {r + 1}
                </td>
                {row.map((pick, col) => {
                  const player = pick ? playerMap.get(pick.nhlPlayerId) : null;
                  return (
                    <td
                      key={col}
                      className="p-2 align-top border-b border-slate/10"
                    >
                      {player ? (
                        <div>
                          <div className="text-navy text-xs font-medium">
                            {player.fullName}
                          </div>
                          <div className="text-xs text-slate">
                            {player.position} · {player.nhlTeam}
                          </div>
                        </div>
                      ) : (
                        <div className="text-slate/40 text-xs">—</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
