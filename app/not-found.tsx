import Link from 'next/link';
import SiteShell from '@/components/site/SiteShell';

export default function NotFound() {
  return (
    <SiteShell>
      <div className="container-site">
        <div className="max-w-3xl py-16 sm:py-24">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-6xl font-extrabold uppercase leading-[0.9] text-ink sm:text-7xl">Page not found</h1>
        <p className="mt-5 font-serif text-xl leading-relaxed text-muted">
          That page doesn&apos;t exist, or it moved when the site was reorganized in September 2026.
        </p>
        <ul className="mt-8 space-y-2 text-lg">
          <li>
            <Link href="/blog" className="text-link">
              Browse the writing by topic
            </Link>
          </li>
          <li>
            <Link href="/research" className="text-link">
              Read the research notes
            </Link>
          </li>
          <li>
            <Link href="/" className="text-link">
              Go to the home page
            </Link>
          </li>
        </ul>
        </div>
      </div>
    </SiteShell>
  );
}
