import { notFound } from 'next/navigation';
import RecommenderView from './RecommenderView';

const SUPPORTED_YEARS = [2026];

export default function RecommenderPage({ params }: { params: { year: string } }) {
  const yearNum = parseInt(params.year, 10);
  if (!SUPPORTED_YEARS.includes(yearNum)) notFound();

  return (
    <main className="min-h-screen bg-off-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-navy mb-6">
          {params.year} Draft Recommender
        </h1>
        <RecommenderView year={yearNum} />
      </div>
    </main>
  );
}
