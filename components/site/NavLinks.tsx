'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav } from '@/lib/site';

/** Primary navigation. Client-side only to mark the current section. */
export default function NavLinks() {
  const pathname = usePathname() ?? '/';

  return (
    <ul className="flex items-center gap-4 text-[0.95rem] font-medium sm:gap-7">
      {nav.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? 'page' : undefined}
              className={`relative py-2 transition-colors hover:text-accent-ink ${
                current
                  ? 'text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-accent'
                  : 'text-muted'
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
