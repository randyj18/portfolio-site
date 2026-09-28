import type { Metadata } from 'next';
import Link from 'next/link';
import results from './results-2026-27.json';
import DraftTable, { type DraftPlayer } from './DraftTable';

export const metadata: Metadata = {
  title: 'GPHL 2026-27 | Draft Results',
  description: 'Every player from the 2026-27 GPHL keeper auction: who has him, what he cost, and how he got there.',
  robots: { index: false, follow: false },
};

// Regenerate results-2026-27.json from the final draft workbook after each auction.
const YAHOO_URL = 'https://hockey.fantasysports.yahoo.com/hockey/45937';
const DRAFT_DATE = 'September 26, 2026';

type Team = {
  mgr: string;
  team: string;
  budget: number;
  spent: number;
  left: number;
  players: number;
  keepers: number;
  keeperSpend: number;
  bought: number;
  boughtSpend: number;
  dollarBuys: number;
  top: string;
  F: number;
  D: number;
  G: number;
};

const players = results.players as DraftPlayer[];
const teams = results.teams as Team[];

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-bronze">{label}</p>
      <p className="mt-1 text-2xl font-bold text-navy">{value}</p>
      {sub && <p className="text-sm text-slate">{sub}</p>}
    </div>
  );
}

export default function DraftResultsPage() {
  const spent = teams.reduce((s, t) => s + t.spent, 0);
  const budget = teams.reduce((s, t) => s + t.budget, 0);
  const bought = players.filter((p) => p.how !== 'Keeper');
  const topKeeper = players.filter((p) => p.how === 'Keeper').sort((a, b) => b.salary - a.salary)[0];
  const topBuy = [...bought].sort((a, b) => b.salary - a.salary)[0];
  const dollar = bought.filter((p) => p.salary === 1).length;
  const toppers = players
    .filter((p) => p.how === 'Topper' || p.passedBy)
    .sort((a, b) => b.salary - a.salary);
  const byCash = [...teams].sort((a, b) => b.left - a.left);

  return (
    <main className="min-h-screen bg-off-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <Link href="/gphl" className="text-sm font-semibold text-bronze hover:text-navy">
            ← League guide
          </Link>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-bronze">{results.season} season</p>
          <h1 className="mt-1 text-4xl font-black leading-tight text-navy sm:text-5xl">Draft results</h1>
          <p className="mt-2 max-w-2xl text-slate">
            The keeper auction on {DRAFT_DATE}: every player on a roster coming out of the draft, what he cost, and how he got
            there. Rosters change from here, so Yahoo has the current ones.
          </p>
          <a
            href={YAHOO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-off-white transition hover:bg-navy/85"
          >
            Open the league on Yahoo <span aria-hidden>↗</span>
          </a>
        </header>

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat label="Spent" value={money(spent)} sub={`of ${money(budget)} in budgets`} />
          <Stat label="Biggest buy" value={money(topBuy.salary)} sub={`${topBuy.name} to ${topBuy.team}`} />
          <Stat label="Priciest keeper" value={money(topKeeper.salary)} sub={`${topKeeper.name}, ${topKeeper.team}`} />
          <Stat label="$1 players" value={String(dollar)} sub={`of ${bought.length} bought at the auction`} />
        </div>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-bold tracking-wide text-navy">Teams</h2>
          <div className="overflow-x-auto rounded-2xl border border-navy/10 bg-white shadow-sm">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-off-white text-xs uppercase tracking-wide text-slate">
                <tr>
                  <th className="px-4 py-3">Team</th>
                  <th className="px-3 py-3 text-right">Budget</th>
                  <th className="px-3 py-3 text-right">Spent</th>
                  <th className="px-3 py-3 text-right">Left</th>
                  <th className="px-3 py-3 text-right">Kept</th>
                  <th className="px-3 py-3 text-right">Bought</th>
                  <th className="px-3 py-3">F / D / G</th>
                  <th className="px-3 py-3">Most expensive</th>
                </tr>
              </thead>
              <tbody>
                {byCash.map((t) => (
                  <tr key={t.mgr} className="border-t border-navy/5">
                    <td className="px-4 py-2.5">
                      <span className="font-semibold text-navy">{t.team}</span>
                      <span className="block text-xs text-slate">{t.mgr}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-slate">{money(t.budget)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-navy">{money(t.spent)}</td>
                    <td className="px-3 py-2.5 text-right font-semibold tabular-nums text-navy">{money(t.left)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-slate">
                      {t.keepers} <span className="text-xs">({money(t.keeperSpend)})</span>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-slate">
                      {t.bought} <span className="text-xs">({money(t.boughtSpend)})</span>
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-slate">
                      {t.F} / {t.D} / {t.G}
                    </td>
                    <td className="px-3 py-2.5 text-slate">{t.top}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-slate">Sorted by cash left.</p>
        </section>

        <section className="mb-10">
          <h2 className="mb-1 text-2xl font-bold tracking-wide text-navy">Toppers</h2>
          <p className="mb-3 text-sm text-slate">
            B keepers went to auction, and the owner could take them back for $1 over the high bid.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {toppers.map((p) => (
              <li key={p.name} className="rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm shadow-sm">
                <p className="font-semibold text-navy">
                  {p.name} <span className="font-normal text-slate">· {money(p.salary)}</span>
                </p>
                <p className="text-slate">
                  {p.passedBy ? `${p.passedBy} let him go to ${p.mgr}` : `${p.mgr} kept him`}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold tracking-wide text-navy">Every player</h2>
          <DraftTable players={players} />
          <div className="mt-4 space-y-1 text-sm text-slate">
            <p>
              <span className="font-semibold text-navy">Bought</span> means won at the auction.{' '}
              <span className="font-semibold text-navy">Topped</span> means the owner matched the high bid on his own B keeper.{' '}
              <span className="font-semibold text-navy">Kept</span> means an A keeper at last year’s salary.
            </p>
            <p>
              Next year: anyone bought or topped at this auction is an A contract at his price, and this year’s A keepers become B.
              Positions are Yahoo’s 2026-27 eligibility.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
