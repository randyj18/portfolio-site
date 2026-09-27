import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AuthorBox from '@/components/site/AuthorBox';
import DateLine from '@/components/site/DateLine';
import Prose from '@/components/site/Prose';
import { getAllBlogPosts } from '@/lib/blog';
import { formatMonth, isoDate } from '@/lib/dates';
import { getAllResearchSlugs, getRelatedPapers, getResearchBySlug } from '@/lib/research';
import { ogImage, site } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllResearchSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const note = getResearchBySlug(params.slug);
  if (!note) return { title: 'Research note not found' };
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: `/research/${note.slug}` },
    openGraph: {
      type: 'article',
      title: note.title,
      description: note.description,
      url: `/research/${note.slug}`,
      publishedTime: isoDate(note.published),
      modifiedTime: isoDate(note.updated ?? note.published),
      authors: [site.name],
      images: [ogImage],
    },
    twitter: { card: 'summary_large_image', title: note.title, description: note.description, images: [ogImage.url] },
  };
}

export default function ResearchNotePage({ params }: { params: { slug: string } }) {
  const note = getResearchBySlug(params.slug);
  if (!note) notFound();
  const related = getRelatedPapers(note.slug, 3);
  const citedBy = getAllBlogPosts().filter((p) => p.researchLinks.includes(note.slug));

  return (
    <article className="container-site">
      <header className="max-w-4xl pt-10 sm:pt-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
            <li>
              <Link href="/research" className="hover:text-accent-ink hover:underline">
                Research notes
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>{note.themeName}</li>
            {note.status && (
              <>
                <li aria-hidden>·</li>
                <li>{note.status}</li>
              </>
            )}
          </ol>
        </nav>
        <h1 className="mt-4 text-[2.4rem] font-extrabold uppercase leading-[0.95] text-ink text-balance sm:text-5xl lg:text-6xl">
          {note.title}
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-xl leading-snug text-muted text-pretty sm:text-[1.4rem]">
          {note.description}
        </p>
        <DateLine published={note.published} updated={note.updated} minutes={note.readingMinutes} publishedLabel="Written" />
      </header>

      {note.papers.length > 0 && (
        <section aria-label="Papers discussed" className="mt-8 max-w-2xl rounded-lg border border-ink/10 bg-surface p-5">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {note.papers.length === 1 ? 'The paper' : 'The papers'}
          </h2>
          <ul className="mt-3 space-y-3">
            {note.papers.map((paper) => (
              <li key={paper.title} className="text-[0.95rem] leading-snug">
                {paper.url ? (
                  <a href={paper.url} className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-accent-ink" rel="noopener noreferrer">
                    {paper.title}
                  </a>
                ) : (
                  <span className="font-semibold text-ink">{paper.title}</span>
                )}
                <span className="mt-0.5 block text-sm text-muted">
                  {[paper.authors, paper.venue, paper.date ? formatMonth(paper.date) : undefined].filter(Boolean).join(' · ')}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10 max-w-2xl">
        <Prose markdown={note.content} />
      </div>

      <footer className="mt-16 max-w-2xl space-y-14">
        {citedBy.length > 0 && (
          <section aria-labelledby="cited-heading">
            <h2 id="cited-heading" className="text-2xl font-bold uppercase text-ink">
              Where I use this
            </h2>
            <ul className="mt-4 space-y-2">
              {citedBy.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="text-link">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section aria-labelledby="related-notes">
            <h2 id="related-notes" className="text-2xl font-bold uppercase text-ink">
              Related notes
            </h2>
            <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              {related.map((p) => (
                <li key={p.slug} className="py-4">
                  <Link href={`/research/${p.slug}`} className="font-semibold text-ink hover:text-accent-ink hover:underline">
                    {p.title}
                  </Link>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <AuthorBox />
      </footer>
    </article>
  );
}
