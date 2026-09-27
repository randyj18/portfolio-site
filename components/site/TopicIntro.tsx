import Link from 'next/link';
import { Fragment } from 'react';

/**
 * Renders a short intro paragraph that may contain [text](/path) links.
 * Deliberately tiny: topic intros are plain sentences with the odd link.
 */
export default function TopicIntro({ text, className = '' }: { text: string; className?: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(<Fragment key={i++}>{text.slice(last, m.index)}</Fragment>);
    const href = m[2];
    parts.push(
      href.startsWith('/') ? (
        <Link key={i++} href={href} className="text-link">
          {m[1]}
        </Link>
      ) : (
        <a key={i++} href={href} className="text-link" rel="noopener noreferrer">
          {m[1]}
        </a>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<Fragment key={i++}>{text.slice(last)}</Fragment>);
  return <p className={className}>{parts}</p>;
}
