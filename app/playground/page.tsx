import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/site/SiteShell';

export const metadata: Metadata = {
  title: 'Playground | Randy Jones',
  description: 'Working demos and experiments: AI audio summaries, a voice relay and an agentic game card workflow.',
};

// Light restyle only (September 2026). The demos themselves, and their sign-in
// (components/PlaygroundAuth.tsx), are unchanged.
const demos = [
  {
    href: '/playground/audio-summary',
    title: 'Audio content summaries',
    body: 'Turns written content such as newsletters, blog posts and research papers into audio summaries and podcast-style narration.',
    tags: ['AI', 'Text to speech', 'Content'],
  },
  {
    href: '/playground/voice-relay',
    title: 'VOICE-Relay',
    body: 'A relay for voice conversations between AI agents and people, with end-to-end encryption.',
    tags: ['Encryption', 'Voice AI', 'Security'],
  },
  {
    href: '/playground/game-card-creator',
    title: 'Game card creator',
    body: 'An agentic workflow that turns rough card ideas into structured game assets, with generated art and template-based card layouts.',
    tags: ['AI agents', 'Game design', 'Automation'],
  },
];

export default function PlaygroundPage() {
  return (
    <SiteShell>
      <div className="container-site">
        <header className="max-w-3xl pt-10 sm:pt-16">
          <p className="eyebrow">Things I have built</p>
          <h1 className="mt-3 text-6xl font-extrabold uppercase leading-[0.9] text-ink sm:text-7xl">Playground</h1>
          <p className="mt-5 font-serif text-xl leading-relaxed text-muted text-pretty">
            Working demos and experiments. They need a sign-in, mostly to keep cloud costs in check. If you would like to try
            one, <Link href="/#contact" className="text-link">ask me for access</Link>.
          </p>
        </header>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo) => (
            <li
              key={demo.href}
              className="group relative flex flex-col rounded-xl border border-ink/10 bg-surface p-6 transition-colors hover:border-accent/60"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Sign-in required</p>
              <h2 className="mt-3 text-3xl font-extrabold uppercase leading-none text-ink">
                <Link href={demo.href} className="after:absolute after:inset-0 group-hover:text-accent-ink">
                  {demo.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{demo.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
                {demo.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-xs text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}
