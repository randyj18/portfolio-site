import type { Metadata } from 'next';
import Link from 'next/link';
import { getPostsForTopic } from '@/lib/blog';
import { topics } from '@/lib/topics';

export const metadata: Metadata = {
  title: 'Topics',
  description: 'The writing on randyjones.ca, grouped by topic.',
  alternates: { canonical: '/blog/topics' },
};

export default function TopicsIndexPage() {
  return (
    <div className="container-site">
      <header className="max-w-3xl pt-10 sm:pt-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/blog" className="hover:text-accent-ink hover:underline">
            Writing
          </Link>
        </nav>
        <h1 className="mt-4 text-5xl font-extrabold uppercase leading-[0.95] text-ink sm:text-6xl">Topics</h1>
        <p className="mt-5 font-serif text-xl leading-relaxed text-muted">
          Each topic page puts its posts in a sensible reading order and explains how they fit together.
        </p>
      </header>

      <ul className="mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
        {topics.map((topic) => {
          const posts = getPostsForTopic(topic, { crossListed: true });
          return (
            <li key={topic.slug} className="rounded-xl border border-ink/10 bg-surface p-6">
              <h2 className="text-3xl font-extrabold uppercase leading-none text-ink">
                <Link href={`/blog/topics/${topic.slug}`} className="hover:text-accent-ink">
                  {topic.name}
                </Link>
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{topic.short}</p>
              <p className="mt-4 text-sm font-semibold text-accent-ink">
                <Link href={`/blog/topics/${topic.slug}`} className="hover:underline">
                  {posts.length} {posts.length === 1 ? 'post' : 'posts'} <span aria-hidden>→</span>
                </Link>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
