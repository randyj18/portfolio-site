import type { Metadata } from 'next';
import Link from 'next/link';
import { formatMonth } from '@/lib/dates';
import { getAllResearchPapers, getResearchByTheme } from '@/lib/research';

export const metadata: Metadata = {
  title: 'Research notes',
  description: 'Short notes on AI research papers: what each one showed, why it might matter in practice, and what has happened since.',
  alternates: { canonical: '/research' },
};

export default function ResearchIndexPage() {
  const groups = getResearchByTheme();
  const count = getAllResearchPapers().length;

  return (
    <div className="container-site">
      <header className="max-w-3xl pt-10 sm:pt-16">
        <p className="eyebrow">{count} notes</p>
        <h1 className="mt-3 text-6xl font-extrabold uppercase leading-[0.9] text-ink sm:text-7xl">Research notes</h1>
        <p className="mt-5 font-serif text-xl leading-relaxed text-muted text-pretty">
          Notes on papers I wanted to understand properly. Each one says what the paper showed, why I think it might matter
          outside the lab, and what is still uncertain. Most were written in November 2025 and have short updates where
          things have moved.
        </p>
      </header>

      <div className="mt-14 space-y-16">
        {groups.map(({ theme, papers }) => (
          <section key={theme.slug} aria-labelledby={`theme-${theme.slug}`} className="max-w-4xl">
            <h2 id={`theme-${theme.slug}`} className="text-3xl font-extrabold uppercase leading-none text-ink">
              {theme.name}
            </h2>
            {theme.short && <p className="mt-2 text-muted">{theme.short}</p>}
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {papers.map((note) => (
                <li key={note.slug} className="group relative rounded-lg border border-ink/10 bg-surface p-5 transition-colors hover:border-accent/60">
                  <h3 className="font-sans text-lg font-semibold leading-snug text-ink">
                    <Link href={`/research/${note.slug}`} className="after:absolute after:inset-0 group-hover:text-accent-ink">
                      {note.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{note.description}</p>
                  {note.papers[0]?.date && (
                    <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted">
                      Paper: {formatMonth(note.papers[0].date)}
                      {note.papers.length > 1 ? ` and ${note.papers.length - 1} more` : ''}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
