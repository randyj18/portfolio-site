'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  runTransaction,
} from 'firebase/firestore';
import { getFirebase } from '../_lib/firebase';
import type {
  Season,
  Participant,
  NHLPlayer,
  DraftPick,
  BankedPick,
  PlayerStats,
} from '../_lib/types';
import {
  ROSTER_MAX,
  ROSTER_SIZE,
  activePickCount,
  activeRosterCounts,
  computeMidDraftSchedule,
  fantasyPointsFor,
  nextOpenMidDraftSlot,
} from '../_lib/draft';

export default function MidDraftRoom({
  year,
  season,
  participants,
  currentUid,
}: {
  year: number;
  season: Season;
  participants: Participant[];
  currentUid: string;
}) {
  const yearStr = String(year);
  const round = season.currentNHLRound as 2 | 3 | 4;
  const [players, setPlayers] = useState<NHLPlayer[]>([]);
  const [picks, setPicks] = useState<DraftPick[]>([]);
  const [bankedPicks, setBankedPicks] = useState<BankedPick[]>([]);
  const [stats, setStats] = useState<Map<string, PlayerStats>>(new Map());
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState<'all' | 'F' | 'D' | 'G'>('all');
  const [dropId, setDropId] = useState<string | null>(null);
  const [working, setWorking] = useState(false);
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
      collection(db, 'seasons', yearStr, 'bankedPicks'),
      (snap) =>
        setBankedPicks(
          snap.docs.map((d) => ({ ...(d.data() as BankedPick), id: d.id }))
        ),
      () => {}
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

  const playerMap = useMemo(() => new Map(players.map((p) => [p.id, p])), [players]);
  const eliminated = useMemo(
    () => new Set(season.eliminatedTeams ?? []),
    [season.eliminatedTeams]
  );
  const nameByUid = useMemo(
    () => new Map(participants.map((p) => [p.uid, p.teamName || p.displayName])),
    [participants]
  );

  const midDraftOrder = season.midDraftOrder ?? [];
  const schedule = useMemo(
    () => computeMidDraftSchedule(round, bankedPicks, midDraftOrder),
    [round, bankedPicks, midDraftOrder]
  );

  const thisRoundPicks = useMemo(
    () => picks.filter((p) => p.draftedInRound === round),
    [picks, round]
  );
  const usedBankedIds = useMemo(() => {
    const s = new Set<string>();
    for (const bp of bankedPicks) {
      if (bp.usedInRound === round) s.add(bp.id);
    }
    return s;
  }, [bankedPicks, round]);

  const currentSlot = nextOpenMidDraftSlot(schedule, thisRoundPicks, usedBankedIds);
  const draftComplete = currentSlot === null;
  const isMyTurn = currentSlot?.participantUid === currentUid;

  const myPicks = useMemo(
    () =>
      picks.filter((p) => p.participantUid === currentUid && !p.droppedAt),
    [picks, currentUid]
  );
  const myCounts = activeRosterCounts(myPicks, playerMap, eliminated);
  const myActive = activePickCount(myCounts);

  const pickedPlayerIds = useMemo(() => {
    const set = new Set<string>();
    for (const p of picks) if (!p.droppedAt) set.add(p.nhlPlayerId);
    return set;
  }, [picks]);

  const available = useMemo(() => {
    const term = search.trim().toLowerCase();
    return players
      .filter((p) => {
        if (pickedPlayerIds.has(p.id)) return false;
        if (eliminated.has(p.nhlTeam)) return false;
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
      .sort((a, b) => {
        const sa = stats.get(a.id);
        const sb = stats.get(b.id);
        const va = fantasyPointsFor(a, sa);
        const vb = fantasyPointsFor(b, sb);
        if (va !== vb) return vb - va;
        return a.fullName.localeCompare(b.fullName);
      });
  }, [players, pickedPlayerIds, eliminated, positionFilter, search, stats]);

  function resultingCountsAfter(
    drop: DraftPick | null,
    incoming: NHLPlayer
  ): { F: number; D: number; G: number; total: number } {
    const next = { ...myCounts };
    if (drop) {
      const dropPlayer = playerMap.get(drop.nhlPlayerId);
      if (dropPlayer && !eliminated.has(dropPlayer.nhlTeam)) {
        next[dropPlayer.position]--;
      }
    }
    next[incoming.position]++;
    return { ...next, total: next.F + next.D + next.G };
  }

  function validatePick(
    drop: DraftPick | null,
    incoming: NHLPlayer
  ): string | null {
    const result = resultingCountsAfter(drop, incoming);
    if (result.F > ROSTER_MAX.F) return `Too many forwards (max ${ROSTER_MAX.F}).`;
    if (result.D > ROSTER_MAX.D) return `Too many defense (max ${ROSTER_MAX.D}).`;
    if (result.G > ROSTER_MAX.G) return `Already have a goalie.`;
    if (result.total > ROSTER_SIZE)
      return `Active roster would exceed ${ROSTER_SIZE}. Drop a player first.`;
    return null;
  }

  async function makePick(player: NHLPlayer) {
    if (!isMyTurn || working || !currentSlot) return;
    const dropPick = dropId ? myPicks.find((p) => p.id === dropId) ?? null : null;
    const err = validatePick(dropPick, player);
    if (err) {
      setError(err);
      return;
    }
    setWorking(true);
    setError(null);
    try {
      const { db } = getFirebase();
      const pba = fantasyPointsFor(player, stats.get(player.id));
      await runTransaction(db, async (tx) => {
        // Drop existing pick if chosen
        if (dropPick?.id) {
          const dropRef = doc(db, 'seasons', yearStr, 'draftPicks', dropPick.id);
          tx.update(dropRef, { droppedAt: Date.now() });
        }
        // Create new pick — doc ID keyed by slot and uid to prevent double-picks
        const newPickId = `${round}-${currentSlot.slotNumber}-${currentSlot.participantUid}`;
        const newPickRef = doc(db, 'seasons', yearStr, 'draftPicks', newPickId);
        const existing = await tx.get(newPickRef);
        if (existing.exists()) {
          throw new Error('That slot was already taken. Refresh and try again.');
        }
        const pickData: Partial<DraftPick> & Record<string, unknown> = {
          participantUid: currentUid,
          nhlPlayerId: player.id,
          draftedInRound: round,
          pickNumber: currentSlot.slotNumber,
          acquiredAt: Date.now(),
          pointsBeforeAcquiring: pba,
        };
        if (currentSlot.type === 'banked' && currentSlot.bankedFromRound) {
          pickData.usedBankedPickFromRound = currentSlot.bankedFromRound;
        }
        if (dropPick?.id) {
          pickData.replacedByPickId = newPickId;
        }
        tx.set(newPickRef, pickData);
        // Mark banked pick used if applicable
        if (currentSlot.type === 'banked' && currentSlot.bankedPickId) {
          const bpRef = doc(
            db,
            'seasons',
            yearStr,
            'bankedPicks',
            currentSlot.bankedPickId
          );
          tx.update(bpRef, { usedInRound: round });
        }
      });
      setDropId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Pick failed');
    } finally {
      setWorking(false);
    }
  }

  async function bankPick() {
    if (!isMyTurn || working || !currentSlot) return;
    if (currentSlot.type === 'banked') {
      setError('Cannot re-bank an already-banked slot — must use it this mid-draft.');
      return;
    }
    if (round >= 4) {
      setError('Cannot bank during the final mid-draft.');
      return;
    }
    if (!confirm('Bank this pick for a future mid-draft?')) return;
    setWorking(true);
    setError(null);
    try {
      const { db } = getFirebase();
      await addDoc(collection(db, 'seasons', yearStr, 'bankedPicks'), {
        participantUid: currentUid,
        bankedInRound: round,
        bankedAt: Date.now(),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Bank failed');
    } finally {
      setWorking(false);
    }
  }

  if (!season.midDraftOrder || season.midDraftOrder.length === 0) {
    return (
      <div className="bg-white border-l-4 border-orange-burnt p-4 rounded-sm">
        <p className="text-navy">
          Waiting for commissioner to start the round {round} mid-draft…
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className={`p-4 rounded-sm border-l-4 ${
          draftComplete
            ? 'bg-white border-green-600'
            : isMyTurn
            ? 'bg-orange-burnt/10 border-orange-burnt'
            : 'bg-white border-slate/40'
        }`}
      >
        <p className="text-xs uppercase tracking-wide text-slate">
          Mid-draft · before NHL round {round}
        </p>
        {draftComplete ? (
          <p className="text-xl font-bold text-navy">All picks complete.</p>
        ) : (
          <>
            <p className="text-xl font-bold text-navy">
              On the clock: {nameByUid.get(currentSlot!.participantUid) ?? '?'}
              {isMyTurn && <span className="text-orange-burnt"> — you&apos;re up!</span>}
            </p>
            <p className="text-sm text-slate">
              Slot {currentSlot!.slotNumber} of {schedule.length} ·{' '}
              {currentSlot!.type === 'banked'
                ? `Banked from round ${currentSlot!.bankedFromRound}`
                : 'Regular round pick'}
            </p>
          </>
        )}
      </div>

      {!draftComplete && isMyTurn && (
        <div className="bg-white border border-slate/20 p-4 rounded-sm space-y-3">
          <p className="text-sm text-slate">
            Active roster: {myActive}/{ROSTER_SIZE} · F {myCounts.F} · D {myCounts.D} · G{' '}
            {myCounts.G}
            {myActive === ROSTER_SIZE && ' — you must drop a player before picking.'}
          </p>
          <DropSelect
            myPicks={myPicks}
            playerMap={playerMap}
            eliminated={eliminated}
            dropId={dropId}
            setDropId={setDropId}
          />
          <div className="flex gap-2">
            {currentSlot?.type !== 'banked' && round < 4 && (
              <button
                onClick={bankPick}
                disabled={working}
                className="px-4 py-2 border border-navy text-navy rounded-sm font-semibold disabled:opacity-50"
              >
                Bank this pick
              </button>
            )}
          </div>
        </div>
      )}

      {!draftComplete && isMyTurn && (
        <div>
          <h3 className="font-semibold text-navy mb-2">Pick a player</h3>
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
          </div>
          <ul className="space-y-1">
            {available.slice(0, 50).map((p) => {
              const validationErr = validatePick(
                dropId ? myPicks.find((m) => m.id === dropId) ?? null : null,
                p
              );
              const s = stats.get(p.id);
              return (
                <li
                  key={p.id}
                  className="bg-white border border-slate/20 p-3 rounded-sm flex items-center justify-between gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-medium text-navy">{p.fullName}</span>
                    <span className="text-xs text-slate ml-2">
                      {p.position} · {p.nhlTeam} ·{' '}
                      {p.position === 'G'
                        ? `${s?.wins ?? 0}W ${s?.shutouts ?? 0}SO`
                        : `${s?.goals ?? 0}G ${s?.assists ?? 0}A`}
                    </span>
                  </div>
                  <button
                    onClick={() => makePick(p)}
                    disabled={working || !!validationErr}
                    title={validationErr ?? ''}
                    className="px-3 py-1 bg-navy text-off-white text-sm rounded-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                  >
                    Draft
                  </button>
                </li>
              );
            })}
          </ul>
          {available.length > 50 && (
            <p className="text-xs text-slate mt-2">
              Showing 50 of {available.length} — refine search.
            </p>
          )}
        </div>
      )}

      <MidDraftLog
        schedule={schedule}
        thisRoundPicks={thisRoundPicks}
        bankedPicks={bankedPicks}
        playerMap={playerMap}
        nameByUid={nameByUid}
        round={round}
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}

function DropSelect({
  myPicks,
  playerMap,
  eliminated,
  dropId,
  setDropId,
}: {
  myPicks: DraftPick[];
  playerMap: Map<string, NHLPlayer>;
  eliminated: Set<string>;
  dropId: string | null;
  setDropId: (id: string | null) => void;
}) {
  const droppable = myPicks.filter((p) => {
    const player = playerMap.get(p.nhlPlayerId);
    return player && !eliminated.has(player.nhlTeam);
  });
  return (
    <label className="block text-sm text-slate">
      Drop a player (optional):
      <select
        value={dropId ?? ''}
        onChange={(e) => setDropId(e.target.value || null)}
        className="ml-2 px-2 py-1 border border-slate/30 rounded-sm"
      >
        <option value="">— none —</option>
        {droppable.map((p) => {
          const player = playerMap.get(p.nhlPlayerId);
          return (
            <option key={p.id} value={p.id}>
              {player?.fullName} ({player?.position} · {player?.nhlTeam})
            </option>
          );
        })}
      </select>
    </label>
  );
}

function MidDraftLog({
  schedule,
  thisRoundPicks,
  bankedPicks,
  playerMap,
  nameByUid,
  round,
}: {
  schedule: { slotNumber: number; type: 'banked' | 'regular'; participantUid: string; bankedPickId?: string }[];
  thisRoundPicks: DraftPick[];
  bankedPicks: BankedPick[];
  playerMap: Map<string, NHLPlayer>;
  nameByUid: Map<string, string>;
  round: 2 | 3 | 4;
}) {
  const pickBySlotNumber = new Map<number, DraftPick>();
  for (const p of thisRoundPicks) pickBySlotNumber.set(p.pickNumber, p);
  return (
    <div>
      <h3 className="font-semibold text-navy mb-2">Mid-draft order</h3>
      <ol className="space-y-1">
        {schedule.map((slot) => {
          const pick = pickBySlotNumber.get(slot.slotNumber);
          const player = pick ? playerMap.get(pick.nhlPlayerId) : null;
          return (
            <li
              key={slot.slotNumber}
              className={`bg-white border border-slate/20 p-2 rounded-sm flex items-center gap-2 flex-wrap text-sm ${
                pick ? '' : 'opacity-70'
              }`}
            >
              <span className="font-mono text-xs text-slate shrink-0">
                #{slot.slotNumber}
              </span>
              <span className="text-xs text-slate shrink-0">
                {slot.type === 'banked' ? 'banked' : 'regular'}
              </span>
              <span className="text-navy font-semibold">
                {nameByUid.get(slot.participantUid) ?? '?'}
              </span>
              <span className="text-slate">→</span>
              {player ? (
                <>
                  <span className="text-navy font-medium">{player.fullName}</span>
                  <span className="text-xs text-slate">
                    {player.position} · {player.nhlTeam}
                  </span>
                </>
              ) : (
                <span className="text-slate text-xs">pending</span>
              )}
            </li>
          );
        })}
      </ol>
      {bankedPicks.filter((bp) => bp.bankedInRound === round).length > 0 && (
        <p className="text-xs text-slate mt-2">
          Banked this mid-draft:{' '}
          {bankedPicks
            .filter((bp) => bp.bankedInRound === round)
            .map((bp) => nameByUid.get(bp.participantUid) ?? '?')
            .join(', ')}
        </p>
      )}
    </div>
  );
}
