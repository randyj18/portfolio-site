import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostList from '@/components/site/PostList';
import TopicIntro from '@/components/site/TopicIntro';
import { getPostsForTopic } from '@/lib/blog';
import { getTopic, topics } from '@/lib/topics';

export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.slug }));
}

export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const topic = getTopic(params.topic);
  if (!topic) return { title: 'Topic not found' };
  return {
    title: topic.name,
    description: topic.short,
    alternates: { canonical: `/blog/topics/${topic.slug}` },
  };
}

export default function TopicPage({ params }: { params: { topic: string } }) {
  const topic = getTopic(params.topic);
  if (!topic) notFound();
  const posts = getPostsForTopic(topic);
  const others = topics.filter((t) => t.slug !== topic.slug);

  return (
    <div className="container-site">
      <header className="max-w-3xl pt-10 sm:pt-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
            <li>
              <Link href="/blog" className="hover:text-accent-ink hover:underline">
                Writing
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/blog/topics" className="hover:text-accent-ink hover:underline">
                Topics
              </Link>
            </li>
          </ol>
        </nav>
        <h1 className="mt-4 text-5xl font-extrabold uppercase leading-[0.95] text-ink text-balance sm:text-6xl">{topic.name}</h1>
        <div className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-ink sm:text-xl">
          {topic.intro.map((para, i) => (
            <TopicIntro key={i} text={para} className="text-pretty" />
          ))}
        </div>
      </header>

      <section aria-labelledby="path-heading" className="mt-12 max-w-3xl">
        <h2 id="path-heading" className="eyebrow">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}, in suggested reading order
        </h2>
        <div className="mt-4">
          <PostList posts={posts} numbered headingLevel="h3" />
        </div>
      </section>

      <nav aria-labelledby="other-topics" className="mt-16 max-w-3xl">
        <h2 id="other-topics" className="text-2xl font-bold uppercase text-ink">
          Other topics
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {others.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/blog/topics/${t.slug}`}
                className="block h-full rounded-lg border border-ink/10 bg-surface p-4 transition-colors hover:border-accent/60"
              >
                <span className="font-semibold text-ink">{t.name}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{t.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
