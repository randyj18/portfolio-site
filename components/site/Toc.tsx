import type { Heading } from '@/lib/markdown';

/** Collapsible "On this page" list. Only rendered for long pieces. */
export default function Toc({ headings }: { headings: Heading[] }) {
  if (headings.length < 4) return null;
  return (
    <details className="group rounded-lg border border-ink/10 bg-surface px-5 py-4 text-[0.95rem]">
      <summary className="cursor-pointer list-none font-semibold text-ink [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-2">
          <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4 text-muted transition-transform group-open:rotate-90">
            <path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          On this page
          <span className="font-normal text-muted">({headings.length} sections)</span>
        </span>
      </summary>
      <ol className="mt-3 space-y-1.5 pl-6 text-muted">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="hover:text-accent-ink hover:underline">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
