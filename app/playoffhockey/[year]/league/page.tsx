import { notFound } from 'next/navigation';
import LeagueView from './LeagueView';

const SUPPORTED_YEARS = [2026];

export default function LeaguePage({ params }: { params: { year: string } }) {
  const yearNum = parseInt(params.year, 10);
  if (!SUPPORTED_YEARS.includes(yearNum)) notFound();

  return (
    <main className="min-h-screen bg-off-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-navy mb-1">
          {params.year} NHL Playoff Pool
        </h1>
        <p className="text-slate text-sm mb-6">Public league view — standings, rosters, and draft board.</p>
        <LeagueView year={yearNum} />
      </div>
    </main>
  );
}
