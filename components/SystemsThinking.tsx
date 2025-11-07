'use client';

import Link from 'next/link';

export default function SystemsThinking() {
  return (
    <section className="section-container py-20 lg:py-32 border-b border-slate/20">
      <div className="max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-1 bg-gradient-to-r from-gold-light to-orange-burnt rounded-full" />
          <span className="text-sm font-semibold uppercase tracking-widest text-beige">Insights & Analysis</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-beige mb-6">
          Systems Thinking
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-orange-burnt to-red-medium">
            In Practice
          </span>
        </h2>

        <p className="text-lg lg:text-xl text-slate leading-relaxed max-w-2xl mb-8">
          Exploring AI strategy through interconnected systems. 14 deep-dive articles on governance, architecture, and implementation that go beyond surface-level hype.
        </p>

        <Link
          href="/blog"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold-light to-orange-burnt text-navy font-bold rounded-sm hover:shadow-lg hover:shadow-gold-light/20 transition-all duration-300 group"
        >
          <span>Explore Insights</span>
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
