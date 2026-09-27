import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GPHL 2026-27 | League Guide',
  description:
    'Great Group Power Hockey League: key dates, money, scoring, keepers and trade rules for the 2026-27 season.',
  robots: { index: false, follow: false },
};

// Everything that changes year to year lives in this block.
// `tbc: true` shows a "to confirm" tag; clear it once a rule or date is settled.
const SEASON = '2026-27';
const YAHOO_URL = 'https://hockey.fantasysports.yahoo.com/hockey/45937';
const UPDATED = 'September 27, 2026';

type Row = { label: string; detail?: string; tbc?: boolean };

const DATES: (Row & { date: string })[] = [
  { date: 'Tue Sep 29, 2026', label: 'Season starts', detail: 'Week 1. Lineups are daily.' },
  { date: 'Wed Feb 17, 2027', label: 'Trade deadline', detail: 'Week 20, about two weeks before the playoffs.' },
  { date: 'Sun Feb 28, 2027', label: 'Regular season ends', detail: 'End of week 21. The top 6 make the playoffs.' },
  { date: 'Mar 1 – Mar 21, 2027', label: 'Playoffs', detail: 'Weeks 22 to 24. The top 2 seeds get a first-round bye.' },
  { date: 'September 2027', label: 'Keepers due, then the auction', detail: 'Dues need to be in before the draft.' },
];

const MONEY: Row[] = [
  { label: '$50 dues per team', detail: 'e-Transfer to Randy. Eight teams make a $400 pot.' },
  {
    label: '$10 to the top score each week',
    detail: 'Regular season only, 21 weeks. If a goalie in your lineup scores a goal, that week’s $10 goes to you instead.',
  },
  { label: '$190 to the champion', detail: 'The rest of the pot.' },
];

const SKATER_SCORING: [string, string][] = [
  ['Goal', '6'],
  ['Assist', '4'],
  ['Plus/minus', '1.5'],
  ['Shot on goal', '0.5'],
  ['Hit', '0.25'],
  ['Blocked shot', '0.75'],
  ['Penalty minute', '0.125'],
  ['Shorthanded goal', '+2 bonus'],
  ['Shorthanded assist', '+1 bonus'],
  ['Game-winning goal', '+1 bonus'],
];

const GOALIE_SCORING: [string, string][] = [
  ['Win', '8'],
  ['Save', '0.4'],
  ['Goal against', '−2'],
  ['Shutout', '3'],
];

const ROSTER: [string, string][] = [
  ['C', '2'],
  ['LW', '2'],
  ['RW', '2'],
  ['F (any forward)', '2'],
  ['D', '5'],
  ['G', '2'],
  ['Bench', '4'],
  ['IR+', '2'],
];

const KEEPER_COUNTS: [string, number][] = [
  ['1st', 4],
  ['2nd–3rd', 7],
  ['4th–5th', 6],
  ['6th–7th', 5],
  ['8th', 4],
];

const CONTRACTS: Row[] = [
  {
    label: 'A contract',
    detail:
      'Bought at the auction. You can keep him once at the same salary, which comes off your budget before the draft. After that he becomes a B.',
  },
  {
    label: 'B contract',
    detail:
      'Already kept once, or picked up as a free agent (shown as B2). A kept B player still goes up for auction. When bidding stops you can take him for $1 over the high bid, or let him go. He uses a keeper slot but costs nothing up front.',
  },
  { label: 'Dropped A contracts stay A', detail: 'Whoever picks him up keeps the same salary.' },
];

const DRAFT: Row[] = [
  { label: '$1,000 auction budget', detail: 'Plus or minus any salary traded during the season.' },
  { label: '19 roster spots to fill', detail: '$1 minimum bid. Your max bid is your cash minus $1 for every other open spot.' },
];

const TRADES: Row[] = [
  {
    label: 'Salary can be traded',
    detail: 'Trades can include a percentage of next year’s auction budget. Every team’s budget has to stay within 12% of $1,000 ($880 to $1,120).',
  },
  { label: 'Trade deadline Feb 17, 2027' },
  { label: 'Every trade sits for 2 days', detail: 'Four veto votes in that window block it.' },
  {
    label: 'A veto needs a reason',
    detail: 'Post it in the trade chat. Vetoes are for unfair trades or collusion, not for a deal that makes someone’s team too good.',
  },
  { label: 'Trade talk has its own chat', detail: 'Offers and trade chatter go in the separate GPHL trade chat.' },
];

const TEAMS: [string, string][] = [
  ['Hockey Tonk', 'Randy'],
  ['8 Ball Corner Pocket', 'Daryl'],
  ['Andodangles', 'Kris'],
  ['Cole Harbour Heroes', 'Ryan (Biggie)'],
  ['Formerly Daryl’s Admirer', 'James'],
  ['Letterkenny Irish', 'Sunny'],
  ['Whoomp There It Is', 'Drew (Andrew)'],
  ['Mac Jack', 'Mike'],
];

function Tbc({ show }: { show?: boolean }) {
  if (!show) return null;
  return (
    <span className="ml-2 inline-block rounded-full bg-gold-light/20 px-2 py-0.5 align-middle text-[11px] font-semibold uppercase tracking-wide text-bronze">
      to confirm
    </span>
  );
}

function Card({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-navy/10 bg-white p-6 shadow-sm ${className}`}>
      <h2 className="mb-4 text-2xl font-bold tracking-wide text-navy">{title}</h2>
      {children}
    </section>
  );
}

function RowList({ rows }: { rows: Row[] }) {
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.label}>
          <p className="font-semibold text-navy">
            {r.label}
            <Tbc show={r.tbc} />
          </p>
          {r.detail && <p className="text-sm leading-relaxed text-slate">{r.detail}</p>}
        </li>
      ))}
    </ul>
  );
}

function Pairs({ rows, cols = 1 }: { rows: [string, string | number][]; cols?: 1 | 2 }) {
  return (
    <dl className={`grid gap-x-8 ${cols === 2 ? 'sm:grid-cols-2' : ''}`}>
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between border-b border-navy/5 py-1.5 text-sm">
          <dt className="text-slate">{k}</dt>
          <dd className="font-semibold tabular-nums text-navy">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function GphlPage() {
  return (
    <div className="min-h-screen bg-off-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-bronze">{SEASON} season</p>
          <h1 className="mt-1 text-4xl font-black leading-tight text-navy sm:text-5xl">Great Group Power Hockey League</h1>
          <p className="mt-2 max-w-2xl text-slate">
            The stuff you need all year, in one place. Eight teams, head-to-head points on Yahoo, daily lineups, and a keeper
            auction every fall.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={YAHOO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-off-white transition hover:bg-navy/85"
            >
              Open the league on Yahoo <span aria-hidden>↗</span>
            </a>
            <Link
              href="/gphl/draft"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy ring-1 ring-navy/15 transition hover:ring-navy/40"
            >
              {SEASON} draft results <span aria-hidden>→</span>
            </Link>
          </div>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          <Card title="Key dates" className="md:col-span-2">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {DATES.map((d) => (
                <li key={d.label} className="rounded-xl bg-off-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-bronze">{d.date}</p>
                  <p className="mt-0.5 font-semibold text-navy">
                    {d.label}
                    <Tbc show={d.tbc} />
                  </p>
                  {d.detail && <p className="text-sm text-slate">{d.detail}</p>}
                </li>
              ))}
            </ol>
          </Card>

          <Card title="Money">
            <RowList rows={MONEY} />
          </Card>

          <Card title="Roster">
            <Pairs rows={ROSTER} />
            <p className="mt-3 text-sm text-slate">
              Lineups are daily. Positions follow Yahoo’s eligibility. Up to 4 pickups a week, and dropped players sit on waivers for
              a day with a rolling priority list.
            </p>
          </Card>

          <Card title="Scoring" className="md:col-span-2">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-bronze">Skaters</h3>
                <Pairs rows={SKATER_SCORING} cols={2} />
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-bronze">Goalies</h3>
                <Pairs rows={GOALIE_SCORING} />
              </div>
            </div>
          </Card>

          <Card title="Keepers">
            <p className="mb-2 text-sm text-slate">How many you keep depends on last season’s final finish.</p>
            <Pairs rows={KEEPER_COUNTS} />
            <div className="mt-5">
              <RowList rows={CONTRACTS} />
            </div>
          </Card>

          <div className="grid content-start gap-5">
            <Card title="The auction">
              <RowList rows={DRAFT} />
            </Card>
            <Card title="Trades">
              <RowList rows={TRADES} />
            </Card>
          </div>

          <Card title="Teams" className="md:col-span-2">
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {TEAMS.map(([team, mgr]) => (
                <li key={team} className="flex items-baseline justify-between border-b border-navy/5 py-1.5 text-sm">
                  <span className="font-semibold text-navy">{team}</span>
                  <span className="text-slate">{mgr}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <footer className="mt-8 text-center text-sm text-slate">
          Questions go to Randy in the group chat. Last updated {UPDATED}.
        </footer>
      </div>
    </div>
  );
}
