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
import type { Season, Participant, NHLPlayer, DraftPick } from '../_lib/types';
import {
  INITIAL_DRAFT_ROUNDS,
  canPickPosition,
  computeInitialDraftSchedule,
  countByPosition,
  nextOpenPickNumber,
} from '../_lib/draft';

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
  const [players, setPlayers] = useState<NHLPlayer[]>([]);
  const [picks, setPicks] = useState<DraftPick[]>([]);
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState<'all' | 'F' | 'D' | 'G'>('all');
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startingPlayoffs, setStartingPlayoffs] = useState(false);

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

  const available = useMemo(() => {
    const term = search.trim().toLowerCase();
    return players
      .filter((p) => {
        if (pickedPlayerIds.has(p.id)) return false;
        if (positionFilter !== 'all' && p.position !== positionFilter) return false;
        if (term) {
          if (
            !p.fullName.toLowerCase().includes(term) &&
            !p.nhlTeam.toLowerCase().includes(term)
          )
            return false;
        }
        return true;
      })
      .sort((a, b) => a.fullName.localeCompare(b.fullName));
  }, [players, pickedPlayerIds, positionFilter, search]);

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

      <MyRoster picks={myPicks} playerMap={playerMap} counts={myCounts} />

      {!draftComplete && (
        <AvailablePlayers
          available={available}
          search={search}
          setSearch={setSearch}
          positionFilter={positionFilter}
          setPositionFilter={setPositionFilter}
          isMyTurn={isMyTurn}
          myCounts={myCounts}
          myPicksCount={myPicks.length}
          onPick={makePick}
          picking={picking}
        />
      )}

      <DraftBoard
        picks={initialPicks}
        playerMap={playerMap}
        draftOrder={draftOrder}
        nameByUid={nameByUid}
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}
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

function MyRoster({
  picks,
  playerMap,
  counts,
}: {
  picks: DraftPick[];
  playerMap: Map<string, NHLPlayer>;
  counts: { F: number; D: number; G: number };
}) {
  return (
    <div className="bg-white border border-slate/20 p-4 rounded-sm">
      <h3 className="font-semibold text-navy mb-1">Your roster ({picks.length}/7)</h3>
      <p className="text-xs text-slate mb-2">
        F: {counts.F}/3-4 · D: {counts.D}/2-3 · G: {counts.G}/1
      </p>
      {picks.length === 0 ? (
        <p className="text-sm text-slate">No picks yet.</p>
      ) : (
        <ul className="space-y-1 text-sm">
          {picks.map((pick) => {
            const player = playerMap.get(pick.nhlPlayerId);
            return (
              <li key={pick.id ?? pick.pickNumber}>
                <span className="text-slate font-mono text-xs">#{pick.pickNumber}</span>{' '}
                <span className="text-navy font-medium">
                  {player?.fullName ?? '...'}
                </span>{' '}
                <span className="text-xs text-slate">
                  {player?.position} · {player?.nhlTeam}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function AvailablePlayers({
  available,
  search,
  setSearch,
  positionFilter,
  setPositionFilter,
  isMyTurn,
  myCounts,
  myPicksCount,
  onPick,
  picking,
}: {
  available: NHLPlayer[];
  search: string;
  setSearch: (s: string) => void;
  positionFilter: 'all' | 'F' | 'D' | 'G';
  setPositionFilter: (f: 'all' | 'F' | 'D' | 'G') => void;
  isMyTurn: boolean;
  myCounts: { F: number; D: number; G: number };
  myPicksCount: number;
  onPick: (p: NHLPlayer) => void;
  picking: boolean;
}) {
  const SHOW_LIMIT = 200;
  return (
    <div>
      <h2 className="text-lg font-semibold text-navy mb-2">Available players</h2>
      <div className="flex gap-2 mb-3 flex-wrap">
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
      </div>
      <ul className="space-y-1">
        {available.slice(0, SHOW_LIMIT).map((p) => {
          const canPick =
            isMyTurn && canPickPosition(myCounts, p.position, myPicksCount);
          return (
            <li
              key={p.id}
              className="bg-white border border-slate/20 p-3 rounded-sm flex items-center justify-between gap-2"
            >
              <div className="min-w-0 flex-1">
                <span className="font-medium text-navy truncate">{p.fullName}</span>
                <span className="text-xs text-slate ml-2">
                  {p.position} · {p.nhlTeam}
                </span>
              </div>
              <button
                onClick={() => onPick(p)}
                disabled={!canPick || picking}
                className="px-3 py-1 bg-navy text-off-white text-sm rounded-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                Draft
              </button>
            </li>
          );
        })}
      </ul>
      {available.length > SHOW_LIMIT && (
        <p className="text-xs text-slate mt-2">
          Showing {SHOW_LIMIT} of {available.length} — refine your search.
        </p>
      )}
      {available.length === 0 && (
        <p className="text-sm text-slate">No players match your filter.</p>
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
