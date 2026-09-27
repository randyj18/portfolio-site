import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';

export default function AuthorBox() {
  return (
    <aside aria-label="About the author" className="flex items-start gap-4 rounded-lg border border-ink/10 bg-surface p-5 sm:p-6">
      <Image
        src="/randy-jones.jpg"
        alt=""
        width={64}
        height={64}
        className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-16 sm:w-16"
      />
      <div className="text-[0.95rem] leading-relaxed">
        <p className="font-semibold text-ink">Randy Jones</p>
        <p className="mt-1 text-muted">
          I work on AI strategy and product leadership, and I write about how organizations actually adopt AI.{' '}
          <Link href="/about" className="text-link">
            More about me
          </Link>{' '}
          or{' '}
          <a href={`mailto:${site.email}`} className="text-link">
            send me a note
          </a>
          .
        </p>
      </div>
    </aside>
  );
}
