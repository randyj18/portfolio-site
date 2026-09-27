import Image from 'next/image';
import Link from 'next/link';
import PostList from '@/components/site/PostList';
import { getAllBlogPosts, getBlogBySlug, getPostsForTopic, type BlogPost } from '@/lib/blog';
import { getAllResearchPapers } from '@/lib/research';
import { site } from '@/lib/site';
import { featured, topics } from '@/lib/topics';

export default function HomePage() {
  const picks = featured.map((s) => getBlogBySlug(s)).filter((p): p is BlogPost => Boolean(p));
  const postCount = getAllBlogPosts().length;
  const noteCount = getAllResearchPapers().length;

  return (
    <>
      {/* Intro */}
      <section aria-labelledby="intro-heading" className="bg-night text-night-ink">
        <div className="container-site grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_auto] lg:gap-16 lg:py-24">
          <div className="max-w-2xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-night-accent">
              AI strategy &amp; product leadership
            </p>
            <h1
              id="intro-heading"
              className="mt-4 text-5xl font-extrabold uppercase leading-[0.9] tracking-[0.005em] text-night-ink sm:text-7xl"
            >
              AI leadership for the real world
            </h1>
            <div className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-night-ink/90 sm:text-xl">
              <p>
                I&apos;m Randy Jones. I work on AI strategy and product leadership, and I still write code, which keeps the
                strategy honest.
              </p>
              <p>
                I write about the unglamorous part of AI adoption: giving people room to experiment safely, and making sure
                what they learn doesn&apos;t stay stuck in one team.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-night-accent px-5 py-2.5 text-sm font-semibold text-night transition hover:bg-night-ink"
              >
                Read the writing <span aria-hidden>→</span>
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-night-ink ring-1 ring-night-ink/30 transition hover:ring-night-ink"
              >
                Email me
              </a>
            </div>
          </div>
          <Image
            src="/randy-jones.jpg"
            alt="Black-and-white portrait of Randy Jones"
            width={320}
            height={320}
            priority
            className="order-first h-24 w-24 rounded-full object-cover ring-1 ring-night-ink/20 sm:h-28 sm:w-28 lg:order-none lg:h-80 lg:w-80 lg:rounded-2xl"
          />
        </div>
      </section>

      {/* Start here */}
      {picks.length > 0 && (
        <section aria-labelledby="start-heading" className="container-site mt-16 sm:mt-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <h2 id="start-heading" className="text-4xl font-extrabold uppercase leading-none text-ink sm:text-5xl">
                Start here
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-muted">
                The posts that best explain how I think about adopting AI inside an organization.
              </p>
              <p className="mt-4">
                <Link href="/blog" className="text-sm font-semibold text-accent-ink hover:underline">
                  All {postCount} posts <span aria-hidden>→</span>
                </Link>
              </p>
            </div>
            <PostList posts={picks} withTopic headingLevel="h3" />
          </div>
        </section>
      )}

      {/* Topics */}
      <section aria-labelledby="topics-heading" className="container-site mt-20 sm:mt-24">
        <h2 id="topics-heading" className="text-4xl font-extrabold uppercase leading-none text-ink sm:text-5xl">
          What I write about
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const count = getPostsForTopic(topic).length;
            return (
              <li key={topic.slug} className="group relative flex flex-col rounded-xl border border-ink/10 bg-surface p-6 transition-colors hover:border-accent/60">
                <h3 className="text-2xl font-extrabold uppercase leading-none text-ink">
                  <Link href={`/blog/topics/${topic.slug}`} className="after:absolute after:inset-0 group-hover:text-accent-ink">
                    {topic.name}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{topic.short}</p>
                <p className="mt-4 text-sm font-semibold text-accent-ink">
                  {count} {count === 1 ? 'post' : 'posts'} <span aria-hidden>→</span>
                </p>
              </li>
            );
          })}
          <li className="group relative flex flex-col rounded-xl border border-dashed border-ink/20 p-6 transition-colors hover:border-accent/60">
            <h3 className="text-2xl font-extrabold uppercase leading-none text-ink">
              <Link href="/research" className="after:absolute after:inset-0 group-hover:text-accent-ink">
                Research notes
              </Link>
            </h3>
            <p className="mt-3 flex-1 leading-relaxed text-muted">
              Plain-language notes on AI papers: what they showed, what they might change, and what happened next.
            </p>
            <p className="mt-4 text-sm font-semibold text-accent-ink">
              {noteCount} notes <span aria-hidden>→</span>
            </p>
          </li>
        </ul>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-heading" className="container-site mt-20 sm:mt-24">
        <div className="grid gap-8 rounded-2xl border border-ink/10 bg-surface p-6 sm:p-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h2 id="contact-heading" className="text-4xl font-extrabold uppercase leading-none text-ink sm:text-5xl">
              Get in touch
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              I&apos;m happy to talk about AI strategy, adoption, governance, or a problem you&apos;re working through. Email is
              best. My full resume is available on request; tell me a little about what you&apos;re working on.
            </p>
          </div>
          <ul className="space-y-4">
            <li>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted">Email</span>
              <a href={`mailto:${site.email}`} className="text-lg font-semibold text-ink break-all hover:text-accent-ink hover:underline sm:text-xl">
                {site.email}
              </a>
            </li>
            <li>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted">LinkedIn</span>
              <a href={site.linkedin} rel="me noopener noreferrer" className="text-lg font-semibold text-ink hover:text-accent-ink hover:underline sm:text-xl">
                Randy Jones on LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
