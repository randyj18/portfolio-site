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
    <main className="min-h-screen bg-off-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-40 right-10 w-64 h-64 bg-orange-burnt/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-green-bright/10 rounded-full blur-3xl" />
        <div className="absolute top-96 left-1/3 w-64 h-64 bg-gold-dark/8 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <header className="border-b border-orange-burnt/20 bg-navy backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-orange-burnt hover:text-gold-light transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Research
          </Link>
        </div>
      </header>

      {/* Header - Dark Section */}
      <section className="bg-navy py-16 relative overflow-hidden border-b border-orange-burnt/20">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-burnt/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-dark/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full bg-gold-dark/20 text-gold-light border border-gold-dark/40">
              {paper.tier}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-beige mb-6">
            {paper.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-beige/80">
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
            <div className="mt-4 text-sm text-beige/70">
              <span className="font-semibold">Authors:</span> {paper.authors}
            </div>
          )}
        </div>
      </section>

      {/* Content - Light Background */}
      <article className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <div className="blog-prose">
          <ReactMarkdown>
            {paper.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Related Papers */}
      {relatedPapers.length > 0 && (
        <section className="bg-navy py-16 border-t border-orange-burnt/20 relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-orange-burnt mb-8">Related Research</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPapers.map((relatedPaper) => (
                <Link
                  key={relatedPaper.slug}
                  href={`/research/${relatedPaper.slug}`}
                  className="group p-6 bg-slate/10 border border-orange-burnt/20 rounded-lg hover:border-orange-burnt/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-burnt/10"
                >
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-gold-light uppercase tracking-wider">
                      {relatedPaper.impact}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-beige group-hover:text-orange-burnt transition-colors duration-300">
                    {relatedPaper.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-navy py-20 relative overflow-hidden border-t border-orange-burnt/20">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-burnt/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-dark/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-orange-burnt mb-6">
              Continue Exploring
            </h3>
            <p className="text-beige text-xl leading-relaxed mb-10">
              Explore more research highlights on AI market transformations and emerging technologies.
            </p>
            <Link
              href="/research"
              className="inline-flex items-center gap-3 px-8 py-4 bg-orange-burnt hover:bg-gold-dark text-beige font-bold rounded-lg transition-all duration-300 hover:gap-4 text-lg shadow-lg hover:shadow-orange-burnt/20"
            >
              View All Research
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="flex justify-between items-center text-beige text-sm border-t border-orange-burnt/30 pt-8">
            <span className="font-medium">Research Highlights</span>
            <Link
              href="/"
              className="hover:text-orange-burnt transition-colors duration-300 font-medium"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
