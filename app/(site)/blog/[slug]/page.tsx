import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AuthorBox from '@/components/site/AuthorBox';
import DateLine from '@/components/site/DateLine';
import PostList from '@/components/site/PostList';
import Prose from '@/components/site/Prose';
import Toc from '@/components/site/Toc';
import {
  getAllBlogSlugs,
  getBacklinks,
  getBlogBySlug,
  getRelatedPosts,
  getTopicNeighbours,
} from '@/lib/blog';
import { isoDate } from '@/lib/dates';
import { extractHeadings } from '@/lib/markdown';
import { getResearchBySlug } from '@/lib/research';
import { ogImage, site } from '@/lib/site';
import { getTopic } from '@/lib/topics';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogBySlug(params.slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: isoDate(post.published),
      modifiedTime: isoDate(post.updated ?? post.published),
      authors: [site.name],
      images: [ogImage],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [ogImage.url] },
  };
}

/** Long pieces get an "On this page" list; short ones don't need it. */
const TOC_MIN_WORDS = 1500;

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);
  if (!post) notFound();

  const topic = getTopic(post.topic);
  const related = getRelatedPosts(post.slug, 3);
  const relatedSlugs = new Set(related.map((p) => p.slug));
  const backlinks = getBacklinks(post.slug).filter((p) => !relatedSlugs.has(p.slug));
  const { prev, next } = getTopicNeighbours(post);
  const headings = extractHeadings(post.content).filter((h) => h.depth === 2);
  const showToc = post.words >= TOC_MIN_WORDS && headings.length >= 4;
  const citedNotes = post.researchLinks.map((s) => getResearchBySlug(s)).filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: isoDate(post.published),
    dateModified: isoDate(post.updated ?? post.published),
    author: { '@type': 'Person', name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <article className="container-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="max-w-4xl pt-10 sm:pt-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
            <li>
              <Link href="/blog" className="hover:text-accent-ink hover:underline">
                Writing
              </Link>
            </li>
            {topic && (
              <>
                <li aria-hidden>/</li>
                <li>
                  <Link href={`/blog/topics/${topic.slug}`} className="hover:text-accent-ink hover:underline">
                    {topic.name}
                  </Link>
                </li>
              </>
            )}
          </ol>
        </nav>
        <h1 className="mt-4 text-[2.4rem] font-extrabold uppercase leading-[0.95] tracking-[0.005em] text-ink text-balance sm:text-5xl lg:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-xl leading-snug text-muted text-pretty sm:text-[1.4rem]">
          {post.description}
        </p>
        <DateLine published={post.published} updated={post.updated} minutes={post.readingMinutes} />
      </header>

      <div className="mt-10 xl:grid xl:grid-cols-[minmax(0,42rem)_1fr] xl:gap-16">
        <div className="max-w-2xl">
          {showToc && (
            <div className="mb-10 xl:hidden">
              <Toc headings={headings} />
            </div>
          )}
          <Prose markdown={post.content} />
        </div>
        {showToc && (
          <aside aria-label="On this page" className="hidden xl:block">
            <div className="sticky top-8 border-l border-ink/10 pl-6 text-sm">
              <p className="font-semibold text-ink">On this page</p>
              <ol className="mt-3 space-y-2 text-muted">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="leading-snug hover:text-accent-ink hover:underline">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        )}
      </div>

      <footer className="mt-16 max-w-2xl space-y-14">
        {topic && (prev || next) && (
          <nav aria-label={`More in ${topic.name}`} className="border-t border-ink/10 pt-8">
            <p className="eyebrow">
              <Link href={`/blog/topics/${topic.slug}`} className="hover:underline">
                {topic.name}
              </Link>
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group rounded-lg border border-ink/10 p-4 transition-colors hover:border-accent/60"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">Previous</span>
                  <span className="mt-1 block font-semibold leading-snug text-ink group-hover:text-accent-ink">{prev.title}</span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group rounded-lg border border-ink/10 p-4 text-left transition-colors hover:border-accent/60 sm:text-right"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">Next</span>
                  <span className="mt-1 block font-semibold leading-snug text-ink group-hover:text-accent-ink">{next.title}</span>
                </Link>
              )}
            </div>
          </nav>
        )}

        {related.length > 0 && (
          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-bold uppercase tracking-[0.01em] text-ink">
              Related reading
            </h2>
            <div className="mt-4">
              <PostList posts={related} withTopic headingLevel="h3" />
            </div>
          </section>
        )}

        {backlinks.length > 0 && (
          <section aria-labelledby="backlinks-heading">
            <h2 id="backlinks-heading" className="text-2xl font-bold uppercase tracking-[0.01em] text-ink">
              Linked from
            </h2>
            <ul className="mt-4 space-y-2">
              {backlinks.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="text-link">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {citedNotes.length > 0 && (
          <section aria-labelledby="notes-heading">
            <h2 id="notes-heading" className="text-2xl font-bold uppercase tracking-[0.01em] text-ink">
              Research notes cited
            </h2>
            <ul className="mt-4 space-y-2">
              {citedNotes.map((n) => (
                <li key={n!.slug}>
                  <Link href={`/research/${n!.slug}`} className="text-link">
                    {n!.title}
                  </Link>
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
