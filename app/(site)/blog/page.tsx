import type { Metadata } from 'next';
import Link from 'next/link';
import PostList from '@/components/site/PostList';
import { getAllBlogPosts, getBlogBySlug, getPostsForTopic, getUncategorizedPosts, type BlogPost } from '@/lib/blog';
import { startHere, topics } from '@/lib/topics';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Essays on how organizations adopt AI: experimentation and guardrails, people and leadership, data and knowledge, vendors and lock-in, agents and tools.',
  alternates: { canonical: '/blog' },
};

export default function WritingIndexPage() {
  const all = getAllBlogPosts();
  const path = startHere.map((s) => getBlogBySlug(s)).filter((p): p is BlogPost => Boolean(p));
  const other = getUncategorizedPosts();

  return (
    <div className="container-site">
      <header className="max-w-3xl pt-10 sm:pt-16">
        <p className="eyebrow">{all.length} posts</p>
        <h1 className="mt-3 text-6xl font-extrabold uppercase leading-[0.9] text-ink sm:text-7xl">Writing</h1>
        <p className="mt-5 font-serif text-xl leading-relaxed text-muted text-pretty">
          Most of this is about the unglamorous middle of AI adoption: how people get to try things safely, how what they
          learn gets shared, and how the data, vendors and incentives around them help or get in the way.
        </p>
      </header>

      {path.length > 0 && (
        <section aria-labelledby="start-here" className="mt-14 max-w-3xl">
          <h2 id="start-here" className="text-3xl font-extrabold uppercase leading-none text-ink">
            Start here
          </h2>
          <p className="mt-3 text-muted">If you read nothing else, these make the core argument, in this order.</p>
          <div className="mt-5">
            <PostList posts={path} numbered withTopic headingLevel="h3" />
          </div>
        </section>
      )}

      <section aria-labelledby="by-topic" className="mt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="by-topic" className="text-3xl font-extrabold uppercase leading-none text-ink">
            By topic
          </h2>
          <Link href="/blog/topics" className="text-sm font-semibold text-accent-ink hover:underline">
            All topics <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-x-12 gap-y-14 lg:grid-cols-2">
          {topics.map((topic) => {
            const posts = getPostsForTopic(topic);
            if (!posts.length) return null;
            return (
              <section key={topic.slug} aria-labelledby={`topic-${topic.slug}`}>
                <h3 id={`topic-${topic.slug}`} className="text-2xl font-extrabold uppercase leading-none text-ink">
                  <Link href={`/blog/topics/${topic.slug}`} className="hover:text-accent-ink">
                    {topic.name}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-muted">{topic.short}</p>
                <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                  {posts.map((post) => (
                    <li key={post.slug} className="py-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-semibold leading-snug text-ink decoration-accent-ink/50 decoration-2 underline-offset-4 hover:underline"
                      >
                        {post.title}
                      </Link>
                      <span className="ml-2 whitespace-nowrap text-sm text-muted">{post.readingMinutes} min</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm">
                  <Link href={`/blog/topics/${topic.slug}`} className="font-semibold text-accent-ink hover:underline">
                    How these fit together <span aria-hidden>→</span>
                  </Link>
                </p>
              </section>
            );
          })}
        </div>
      </section>

      {other.length > 0 && (
        <section aria-labelledby="other-writing" className="mt-20 max-w-3xl">
          <h2 id="other-writing" className="text-3xl font-extrabold uppercase leading-none text-ink">
            Other writing
          </h2>
          <div className="mt-5">
            <PostList posts={other} headingLevel="h3" />
          </div>
        </section>
      )}

      <aside className="mt-20 max-w-3xl rounded-xl border border-ink/10 bg-surface p-6 sm:p-8">
        <h2 className="text-2xl font-extrabold uppercase leading-none text-ink">Research notes</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Shorter notes on AI papers I found worth understanding, with what I think they mean in practice and what has
          happened since.
        </p>
        <p className="mt-4">
          <Link href="/research" className="font-semibold text-accent-ink hover:underline">
            Read the research notes <span aria-hidden>→</span>
          </Link>
        </p>
      </aside>
    </div>
  );
}
