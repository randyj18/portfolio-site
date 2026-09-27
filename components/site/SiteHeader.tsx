import Link from 'next/link';
import NavLinks from './NavLinks';

export default function SiteHeader() {
  return (
    <header className="border-b border-ink/10">
      <div className="container-site flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          className="font-heading text-[1.35rem] font-extrabold uppercase leading-none tracking-[0.02em] text-ink sm:text-2xl"
        >
          Randy Jones
        </Link>
        <nav aria-label="Main">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
