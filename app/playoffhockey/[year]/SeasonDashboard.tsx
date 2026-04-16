'use client';

import { useEffect, useState } from 'react';
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
} from 'firebase/firestore';
import { getFirebase } from '../_lib/firebase';
import { useAuth } from '../_lib/auth';
import { COMMISSIONER_EMAIL } from '../_lib/constants';
import type { Season, Participant } from '../_lib/types';
import PlayerSync from './PlayerSync';
import StatsSync from './StatsSync';
import DraftOrderSetup from './DraftOrderSetup';
import DraftRoom from './DraftRoom';
import Standings from './Standings';
import MidDraftRoom from './MidDraftRoom';
import AdminTools from './AdminTools';
import DelegatesEditor from './DelegatesEditor';

export default function SeasonDashboard({ year }: { year: number }) {
  const { user, logOut } = useAuth();
  const [season, setSeason] = useState<Season | null>(null);
  const [seasonLoading, setSeasonLoading] = useState(true);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isCommissioner = user?.email === COMMISSIONER_EMAIL;
  const yearStr = String(year);

  useEffect(() => {
    const { db } = getFirebase();
    return onSnapshot(
      doc(db, 'seasons', yearStr),
      (snap) => {
        setSeason(snap.exists() ? (snap.data() as Season) : null);
        setSeasonLoading(false);
      },
      (err) => {
        setError(err.message);
        setSeasonLoading(false);
      }
    );
  }, [yearStr]);

  useEffect(() => {
    const { db } = getFirebase();
    const q = query(
      collection(db, 'seasons', yearStr, 'participants'),
      orderBy('joinedAt', 'asc')
    );
    return onSnapshot(
      q,
      (snap) => setParticipants(snap.docs.map((d) => d.data() as Participant)),
      (err) => setError(err.message)
    );
  }, [yearStr]);

  // Auto-join on first sign-in, only if season exists and not locked
  useEffect(() => {
    if (!user || !season || season.lockedAt) return;
    if (participants.some((p) => p.uid === user.uid)) return;

    const { db } = getFirebase();
    const participant: Participant = {
      uid: user.uid,
      displayName: user.displayName ?? user.email ?? 'Anonymous',
      email: user.email ?? '',
      joinedAt: Date.now(),
    };
    setDoc(doc(db, 'seasons', yearStr, 'participants', user.uid), participant).catch((e) =>
      setError(e.message)
    );
  }, [user, season, participants, yearStr]);

  async function createSeason() {
    if (!user || !isCommissioner) return;
    const { db } = getFirebase();
    const newSeason: Season = {
      year,
      status: 'setup',
      currentNHLRound: 1,
      commissionerUid: user.uid,
      createdAt: Date.now(),
    };
    try {
      await setDoc(doc(db, 'seasons', yearStr), newSeason);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create season');
    }
  }

  async function lockLeague() {
    if (!isCommissioner || !season || season.lockedAt) return;
    if (!confirm(`Lock the league with ${participants.length} participants? No one else can join after this.`)) return;
    const { db } = getFirebase();
    try {
      await updateDoc(doc(db, 'seasons', yearStr), {
        lockedAt: Date.now(),
        status: 'initial-draft',
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to lock league');
    }
  }

  async function saveTeamName(name: string) {
    if (!user) return;
    const { db } = getFirebase();
    await updateDoc(doc(db, 'seasons', yearStr, 'participants', user.uid), {
      teamName: name,
    });
  }

  if (seasonLoading) {
    return <p className="text-slate">Loading season…</p>;
  }

  if (!season) {
    return (
      <section className="space-y-4">
        <Header email={user?.email ?? ''} isCommissioner={isCommissioner} onSignOut={logOut} />
        {isCommissioner ? (
          <div className="bg-white border border-slate/20 p-6 rounded-sm">
            <p className="text-slate mb-4">No {year} season exists yet.</p>
            <button
              onClick={createSeason}
              className="px-6 py-3 bg-navy text-off-white rounded-sm font-semibold hover:bg-navy/90"
            >
              Create {year} Season
            </button>
          </div>
        ) : (
          <p className="text-slate">The {year} season hasn&apos;t started yet. Check back soon.</p>
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </section>
    );
  }

  const me = participants.find((p) => p.uid === user?.uid);
  const locked = !!season.lockedAt;
  const inSetup = season.status === 'setup';
  const inDraft = season.status === 'initial-draft';
  const hasDraftOrder = !!(season.draftOrder && season.draftOrder.length > 0);

  return (
    <section className="space-y-6">
      <Header email={user?.email ?? ''} isCommissioner={isCommissioner} onSignOut={logOut} />

      {inSetup && (me ? (
        <TeamNameEditor current={me.teamName ?? ''} onSave={saveTeamName} />
      ) : (
        <p className="text-slate">Joining…</p>
      ))}

      {locked && !inDraft && (season.status === 'playoffs' || season.status === 'mid-draft' || season.status === 'complete') && (
        <Standings year={year} season={season} participants={participants} />
      )}

      {season.status === 'mid-draft' && user && me && (
        <MidDraftRoom
          year={year}
          season={season}
          participants={participants}
          currentUid={user.uid}
        />
      )}

      {!me && locked && (
        <StatusBanner>League is locked. You didn&apos;t join in time.</StatusBanner>
      )}

      {inSetup && (
        <div>
          <h2 className="text-xl font-semibold text-navy mb-3">
            Participants ({participants.length})
          </h2>
          {participants.length === 0 ? (
            <p className="text-slate text-sm">No one has joined yet.</p>
          ) : (
            <ul className="space-y-2">
              {participants.map((p) => (
                <li
                  key={p.uid}
                  className="bg-white border border-slate/20 p-3 rounded-sm flex items-center justify-between"
                >
                  <span className="font-medium text-navy">
                    {p.teamName || p.displayName}
                  </span>
                  <span className="text-sm text-slate">{p.displayName}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {inDraft && !hasDraftOrder && (
        isCommissioner ? (
          <DraftOrderSetup year={year} participants={participants} />
        ) : (
          <StatusBanner>Waiting for commissioner to set the draft order…</StatusBanner>
        )
      )}

      {inDraft && hasDraftOrder && user && (
        <DraftRoom
          year={year}
          season={season}
          participants={participants}
          currentUid={user.uid}
          isCommissioner={isCommissioner}
        />
      )}

      {isCommissioner && (
        <div className="border-t border-slate/20 pt-6 space-y-4">
          <h2 className="text-lg font-semibold text-navy">Commissioner tools</h2>
          <PlayerSync />
          <StatsSync year={year} />
          {locked && (
            <DelegatesEditor year={year} season={season} participants={participants} />
          )}
          {locked && !inDraft && (
            <AdminTools year={year} season={season} participants={participants} />
          )}
          {inSetup && (
            <div>
              <button
                onClick={lockLeague}
                disabled={participants.length < 2}
                className="px-6 py-3 bg-orange-burnt text-off-white rounded-sm font-semibold hover:bg-orange-burnt/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Lock league &amp; start draft
              </button>
              <p className="text-xs text-slate mt-2">
                After locking, no one else can join. Need at least 2 participants.
              </p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </section>
  );
}

function Header({
  email,
  isCommissioner,
  onSignOut,
}: {
  email: string;
  isCommissioner: boolean;
  onSignOut: () => void;
}) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-slate/20">
      <div>
        <p className="text-sm text-slate">{email}</p>
        {isCommissioner && (
          <span className="text-xs text-orange-burnt font-semibold uppercase tracking-wide">
            Commissioner
          </span>
        )}
      </div>
      <button onClick={onSignOut} className="text-sm text-slate hover:text-navy underline">
        Sign out
      </button>
    </div>
  );
}

function StatusBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border-l-4 border-orange-burnt p-4 rounded-sm">
      <p className="text-navy">{children}</p>
    </div>
  );
}

function TeamNameEditor({
  current,
  onSave,
}: {
  current: string;
  onSave: (name: string) => Promise<void>;
}) {
  const [name, setName] = useState(current);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(current);
  }, [current]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await onSave(name.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } finally {
      setSaving(false);
    }
  }

  const dirty = name.trim() !== current.trim();

  return (
    <div className="bg-white border border-slate/20 p-4 rounded-sm">
      <label className="block text-sm text-slate mb-2">Your team name</label>
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. The Ice Kings"
          maxLength={40}
          className="flex-1 px-3 py-2 border border-slate/30 rounded-sm focus:outline-none focus:border-navy"
        />
        <button
          onClick={handleSave}
          disabled={saving || !dirty || name.trim().length === 0}
          className="px-4 py-2 bg-navy text-off-white rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving…' : saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}
