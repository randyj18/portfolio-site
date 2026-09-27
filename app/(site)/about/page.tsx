import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Randy Jones works on AI strategy and product leadership. How he works, what he helps with, and how to reach him.',
  alternates: { canonical: '/about' },
};

// Everything on this page restates what the site already said about Randy before the
// September 2026 refresh (hero, philosophy, capabilities and contact sections).
// Open questions about it are listed in SITE-REFRESH-NOTES.md.

const principles = [
  {
    title: 'Strategy from people who have shipped',
    body: 'A lot of AI roadmaps are written by people who have never built the thing, and they run into walls nobody predicted. I spend my days on governance and strategy and my evenings writing code, and each keeps the other grounded.',
  },
  {
    title: 'Guardrails that make it easier to start',
    body: 'Good governance lets teams move quickly inside clear limits. If the only safe option is to wait, people will go around the process, and you lose sight of what they are doing.',
  },
  {
    title: 'Plan in years, ship in weeks',
    body: 'The direction can be long term. The progress should be visible every quarter, in small pieces you can measure.',
  },
  {
    title: 'Test frameworks in real work',
    body: 'A framework that only works on slides doesn’t work. I would rather try an idea with one team, see where it breaks, and fix it before scaling it.',
  },
];

const help = [
  {
    area: 'AI strategy and governance',
    detail: 'Roadmaps, governance frameworks, responsible AI practices, centres of excellence, and AI risk and compliance.',
  },
  {
    area: 'Product leadership',
    detail: 'Product strategy and vision, go-to-market planning, and leading cross-functional teams with lean, user-centred practices.',
  },
  {
    area: 'Enterprise transformation',
    detail: 'Digital workplace modernization, process automation, knowledge management, and change management at scale.',
  },
  {
    area: 'Hands-on technical work',
    detail: 'Full-stack development, AI integration, voice interfaces, cloud architecture and systems integration.',
  },
  {
    area: 'Data and analytics',
    detail: 'Dashboards and business intelligence, data governance and classification, and metrics people actually use.',
  },
  {
    area: 'Teaching and mentoring',
    detail: 'Curriculum design for new technology, technical training, coaching, and speaking.',
  },
];

export default function AboutPage() {
  return (
    <div className="container-site">
      <header className="grid gap-8 pt-10 sm:pt-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <div className="max-w-2xl">
          <p className="eyebrow">About</p>
          <h1 className="mt-3 text-6xl font-extrabold uppercase leading-[0.9] text-ink sm:text-7xl">Randy Jones</h1>
          <div className="mt-6 space-y-4 font-serif text-xl leading-relaxed text-ink text-pretty">
            <p>
              I work on AI strategy and product leadership. I have spent more than a decade across strategy, product,
              technology and organizational change, and I still build things myself: the{' '}
              <Link href="/playground" className="text-link">
                playground
              </Link>{' '}
              has a few of them.
            </p>
            <p>
              My <Link href="/blog" className="text-link">writing</Link> is mostly about what happens after an organization
              decides to &ldquo;do AI&rdquo;: who gets to experiment, how the lessons get shared, what the data and vendors
              allow, and how people are led and rewarded through it.
            </p>
          </div>
        </div>
        <Image
          src="/randy-jones.jpg"
          alt="Black-and-white portrait of Randy Jones"
          width={288}
          height={288}
          className="h-40 w-40 rounded-2xl object-cover sm:h-56 sm:w-56 lg:h-72 lg:w-72"
        />
      </header>

      <section aria-labelledby="how-heading" className="mt-20 max-w-4xl">
        <h2 id="how-heading" className="text-4xl font-extrabold uppercase leading-none text-ink">
          How I work
        </h2>
        <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="border-t-2 border-accent pt-4">
              <dt className="font-sans text-lg font-semibold text-ink">{p.title}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{p.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="help-heading" className="mt-20 max-w-4xl">
        <h2 id="help-heading" className="text-4xl font-extrabold uppercase leading-none text-ink">
          What I help with
        </h2>
        <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {help.map((h) => (
            <div key={h.area} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <dt className="font-semibold text-ink">{h.area}</dt>
              <dd className="leading-relaxed text-muted">{h.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="mt-20 max-w-4xl">
        <h2 id="contact-heading" className="text-4xl font-extrabold uppercase leading-none text-ink">
          Get in touch
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Email is the best way to reach me. My full resume, with specific projects, companies and dates, is available on
          request; tell me a little about what you&apos;re working on.
        </p>
        <ul className="mt-6 flex flex-wrap gap-3">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent-ink"
            >
              {site.email}
            </a>
          </li>
          <li>
            <a
              href={site.linkedin}
              rel="me noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/20 transition hover:ring-ink"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
