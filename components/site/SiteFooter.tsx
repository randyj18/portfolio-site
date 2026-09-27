import Link from 'next/link';
import { site } from '@/lib/site';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-night text-night-ink">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="font-heading text-2xl font-extrabold uppercase tracking-[0.02em]">Randy Jones</p>
          <p className="mt-3 text-sm leading-relaxed text-night-muted">
            Writing about how organizations actually adopt AI, and what gets in the way.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-night-accent">Site</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:text-night-accent" href="/blog">Writing</Link></li>
            <li><Link className="hover:text-night-accent" href="/blog/topics">Topics</Link></li>
            <li><Link className="hover:text-night-accent" href="/research">Research notes</Link></li>
            <li><Link className="hover:text-night-accent" href="/about">About</Link></li>
            <li><Link className="hover:text-night-accent" href="/playground">Playground</Link></li>
            <li><a className="hover:text-night-accent" href="/feed.xml">RSS feed</a></li>
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-night-accent">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="break-all hover:text-night-accent" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="hover:text-night-accent" href={site.linkedin} rel="me noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-night-ink/10">
        <p className="container-site py-6 text-xs text-night-muted">© {year} Randy Jones</p>
      </div>
    </footer>
  );
}
