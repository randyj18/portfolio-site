import { notFound } from 'next/navigation';

const SUPPORTED_YEARS = [2026];

export default function SeasonPage({ params }: { params: { year: string } }) {
  const yearNum = parseInt(params.year, 10);
  if (!SUPPORTED_YEARS.includes(yearNum)) notFound();

  return (
    <main className="min-h-screen bg-off-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-navy mb-2">
          {params.year} Playoff Hockey Pool
        </h1>
        <p className="text-slate">
          Scaffold ready. Draft UI, standings, and admin tools land next.
        </p>
      </div>
    </main>
  );
}
