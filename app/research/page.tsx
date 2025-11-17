import Link from 'next/link';
import { getResearchByTier } from '@/lib/research';

export const metadata = {
  title: 'Research Highlights | Randy Johnson',
  description: 'Concise analysis of transformative AI research and market implications',
};

export default function ResearchPage() {
  const tiers = getResearchByTier();
  const allPapers = tiers.flatMap(t => t.papers);

  return (
    <main className="min-h-screen bg-gradient-to-b from-navy via-gray-dark to-navy">
      {/* Back to Home - Top Navigation */}
      <section className="section-container pt-12 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate hover:text-gold-light transition-colors duration-300 group mb-8"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </section>

      {/* Hero Section */}
      <section className="section-container py-20 lg:py-32 border-b border-slate/20">
        <div className="max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-12 h-1 bg-gradient-to-r from-gold-light to-orange-burnt rounded-full" />
            <span className="text-sm font-semibold uppercase tracking-widest text-beige">Research Highlights</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-beige mb-6">
            Transformative
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-orange-burnt to-red-medium">
              AI Research
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-slate leading-relaxed max-w-2xl">
            Concise summaries of breakthrough papers that are reshaping AI markets. Each analysis distills complex research into clear implications for strategy and execution.
          </p>

          <div className="flex gap-4 mt-8 text-sm">
            <div>
              <span className="text-3xl font-bold text-gold-light">{tiers.length}</span>
              <span className="text-slate ml-2">Tiers</span>
            </div>
            <div className="border-l border-slate/20 pl-4">
              <span className="text-3xl font-bold text-orange-burnt">{allPapers.length}</span>
              <span className="text-slate ml-2">Papers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Research Papers by Tier */}
      <section className="section-container py-16">
        <div className="space-y-16">
          {tiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-beige mb-2">{tier.name}</h2>
                <div className="flex items-center gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-gold-light to-orange-burnt rounded-full" />
                  <span className="text-sm text-slate">
                    {tier.papers.length} {tier.papers.length === 1 ? 'paper' : 'papers'}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tier.papers.map((paper) => (
                  <Link
                    key={paper.slug}
                    href={`/research/${paper.slug}`}
                    className="group p-6 bg-navy/40 border border-slate/20 rounded-sm hover:border-gold-light/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-light/10"
                  >
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-orange-burnt uppercase tracking-wider">
                        {paper.impact}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-beige mb-3 group-hover:text-gold-light transition-colors duration-300">
                      {paper.title}
                    </h3>

                    {paper.excerpt && (
                      <p className="text-sm text-slate line-clamp-3 mb-4">
                        {paper.excerpt}
                      </p>
                    )}

                    {paper.arxiv && (
                      <div className="flex items-center gap-2 text-xs text-slate mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        arXiv Paper
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-gold-light/70 group-hover:text-gold-light transition-colors duration-300">
                      Read analysis
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Home */}
      <section className="section-container py-12 border-t border-slate/20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-beige hover:text-gold-light transition-colors duration-300 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </section>
    </main>
  );
}
