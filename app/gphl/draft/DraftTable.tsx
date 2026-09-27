'use client';

import { useMemo, useState } from 'react';

export type DraftPlayer = {
  name: string;
  nhl: string;
  pos: string;
  grp: 'F' | 'D' | 'G';
  mgr: string;
  team: string;
  salary: number;
  how: 'Keeper' | 'Auction' | 'Topper';
  round: number | null;
  pick: number | null;
  nom: string | null;
  passedBy: string | null;
  next: 'A' | 'B';
};

type SortKey = 'salary' | 'name' | 'pick' | 'team';

const POSITIONS = ['All', 'C', 'LW', 'RW', 'D', 'G'] as const;
const HOW = ['All', 'Auction', 'Topper', 'Keeper'] as const;

const HOW_STYLE: Record<DraftPlayer['how'], string> = {
  Auction: 'bg-navy/5 text-navy',
  Topper: 'bg-gold-light/20 text-bronze',
  Keeper: 'bg-green-bright/15 text-green-medium',
};

export default function DraftTable({ players }: { players: DraftPlayer[] }) {
  const [q, setQ] = useState('');
  const [mgr, setMgr] = useState('All');
  const [pos, setPos] = useState<(typeof POSITIONS)[number]>('All');
  const [how, setHow] = useState<(typeof HOW)[number]>('All');
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'salary', dir: -1 });

  const managers = useMemo(
    () => Array.from(new Map(players.map((p) => [p.mgr, p.team])).entries()).sort((a, b) => a[1].localeCompare(b[1])),
    [players]
  );

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = players.filter(
      (p) =>
        (!needle || p.name.toLowerCase().includes(needle) || p.nhl.toLowerCase() === needle) &&
        (mgr === 'All' || p.mgr === mgr) &&
        (pos === 'All' || p.pos.split('/').includes(pos)) &&
        (how === 'All' || p.how === how)
    );
    const val = (p: DraftPlayer) =>
      sort.key === 'salary' ? p.salary : sort.key === 'pick' ? p.pick ?? 0 : sort.key === 'team' ? p.team : p.name;
    return [...list].sort((a, b) => {
      const x = val(a), y = val(b);
      const c = typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y));
      return c * sort.dir || b.salary - a.salary;
    });
  }, [players, q, mgr, pos, how, sort]);

  const total = rows.reduce((s, p) => s + p.salary, 0);
  const setKey = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === 'salary' ? -1 : 1 }));
  const arrow = (key: SortKey) => (sort.key === key ? (sort.dir === 1 ? ' ↑' : ' ↓') : '');
  const chip = (active: boolean) =>
    `rounded-full px-3 py-1 text-sm font-semibold transition ${active ? 'bg-navy text-off-white' : 'bg-white text-slate ring-1 ring-navy/10 hover:text-navy'}`;

  return (
    <div>
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a player or NHL team (e.g. TOR)"
          className="w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy outline-none focus:border-bronze"
        />
        <select
          value={mgr}
          onChange={(e) => setMgr(e.target.value)}
          className="w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy outline-none focus:border-bronze"
        >
          <option value="All">All teams</option>
          {managers.map(([m, t]) => (
            <option key={m} value={m}>
              {t} ({m})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2 flex flex-wrap gap-2">
        {POSITIONS.map((p) => (
          <button key={p} type="button" onClick={() => setPos(p)} className={chip(pos === p)}>
            {p === 'All' ? 'All positions' : p}
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {HOW.map((h) => (
          <button key={h} type="button" onClick={() => setHow(h)} className={chip(how === h)}>
            {h === 'All' ? 'All contracts' : h === 'Topper' ? 'Topped' : h === 'Keeper' ? 'Kept' : 'Bought'}
          </button>
        ))}
      </div>

      <p className="mb-2 text-sm text-slate">
        Showing {rows.length} of {players.length} players · ${total.toLocaleString('en-US')} in salary
      </p>

      <div className="overflow-x-auto rounded-2xl border border-navy/10 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-off-white text-xs uppercase tracking-wide text-slate">
            <tr>
              <th className="px-4 py-3">
                <button type="button" onClick={() => setKey('name')} className="font-semibold uppercase">
                  Player{arrow('name')}
                </button>
              </th>
              <th className="px-3 py-3">Pos</th>
              <th className="px-3 py-3">
                <button type="button" onClick={() => setKey('team')} className="font-semibold uppercase">
                  Fantasy team{arrow('team')}
                </button>
              </th>
              <th className="px-3 py-3 text-right">
                <button type="button" onClick={() => setKey('salary')} className="font-semibold uppercase">
                  Salary{arrow('salary')}
                </button>
              </th>
              <th className="px-3 py-3">How</th>
              <th className="px-3 py-3">
                <button type="button" onClick={() => setKey('pick')} className="font-semibold uppercase">
                  Pick{arrow('pick')}
                </button>
              </th>
              <th className="px-3 py-3">Next year</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.name} className="border-t border-navy/5 align-top">
                <td className="px-4 py-2.5">
                  <span className="font-semibold text-navy">{p.name}</span>
                  <span className="ml-1.5 text-xs text-slate">{p.nhl}</span>
                </td>
                <td className="px-3 py-2.5 text-slate">{p.pos}</td>
                <td className="px-3 py-2.5">
                  <span className="text-navy">{p.team}</span>
                  <span className="block text-xs text-slate">{p.mgr}</span>
                </td>
                <td className="px-3 py-2.5 text-right font-semibold tabular-nums text-navy">${p.salary}</td>
                <td className="px-3 py-2.5">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${HOW_STYLE[p.how]}`}>
                    {p.how === 'Topper' ? 'Topped' : p.how === 'Keeper' ? 'Kept' : 'Bought'}
                  </span>
                  {p.passedBy && <span className="block pt-0.5 text-xs text-slate">{p.passedBy} passed on topping</span>}
                </td>
                <td className="px-3 py-2.5 text-slate">
                  {p.pick ? (
                    <>
                      #{p.pick}
                      <span className="block text-xs">nominated by {p.nom}</span>
                    </>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-3 py-2.5 text-slate">{p.next === 'A' ? `A at $${p.salary}` : 'B'}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate">
                  No players match those filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
