import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getAllResearchSlugs, getResearchBySlug, getRelatedPapers } from '@/lib/research';

export async function generateStaticParams() {
  const slugs = getAllResearchSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const paper = getResearchBySlug(params.slug);

  if (!paper) {
    return {
      title: 'Research Not Found',
    };
  }

  return {
    title: `${paper.title} | Research Highlights`,
    description: paper.excerpt || `Analysis of ${paper.title}`,
  };
}

export default function ResearchPaperPage({ params }: { params: { slug: string } }) {
  const paper = getResearchBySlug(params.slug);

  if (!paper) {
    notFound();
  }

  const relatedPapers = getRelatedPapers(params.slug);

  return (
    <main className="min-h-screen bg-gradient-to-b from-navy via-gray-dark to-navy">
      {/* Navigation */}
      <section className="section-container pt-12 pb-4">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-slate hover:text-gold-light transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Research
          </Link>
        </div>
      </section>

      {/* Header */}
      <section className="section-container py-12 border-b border-slate/20">
        <div className="max-w-4xl">
          <div className="mb-6">
            <span className="text-sm font-semibold text-orange-burnt uppercase tracking-wider">
              {paper.tier}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-beige mb-6">
            {paper.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-slate">
            {paper.impact && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {paper.impact}
              </div>
            )}
            {paper.published && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {paper.published}
              </div>
            )}
            {paper.arxiv && (
              <a
                href={paper.arxiv}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gold-light hover:text-orange-burnt transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                arXiv Paper
              </a>
            )}
          </div>

          {paper.authors && (
            <div className="mt-4 text-sm text-slate">
              <span className="font-semibold">Authors:</span> {paper.authors}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <article className="section-container py-16">
        <div className="max-w-4xl">
          <div className="research-prose">
            <ReactMarkdown>
              {paper.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Related Papers */}
      {relatedPapers.length > 0 && (
        <section className="section-container py-16 border-t border-slate/20">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-beige mb-8">Related Research</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPapers.map((relatedPaper) => (
                <Link
                  key={relatedPaper.slug}
                  href={`/research/${relatedPaper.slug}`}
                  className="group p-6 bg-navy/40 border border-slate/20 rounded-sm hover:border-gold-light/50 transition-all duration-300"
                >
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-orange-burnt uppercase tracking-wider">
                      {relatedPaper.impact}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-beige group-hover:text-gold-light transition-colors duration-300">
                    {relatedPaper.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back Navigation */}
      <section className="section-container py-12 border-t border-slate/20">
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-beige hover:text-gold-light transition-colors duration-300 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Research
        </Link>
      </section>
    </main>
  );
}
