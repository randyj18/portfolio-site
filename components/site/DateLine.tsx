import { Fragment } from 'react';
import { formatMonth, isoDate } from '@/lib/dates';

interface DateLineProps {
  published?: string;
  updated?: string;
  minutes: number;
  publishedLabel?: string;
}

/** "Published November 2025 · Updated September 2026 · 5 min read" */
export default function DateLine({ published, updated, minutes, publishedLabel = 'Published' }: DateLineProps) {
  const items: React.ReactNode[] = [];
  if (published) {
    items.push(
      <>
        {publishedLabel} <time dateTime={isoDate(published)}>{formatMonth(published)}</time>
      </>,
    );
  }
  if (updated) {
    items.push(
      <>
        Updated <time dateTime={isoDate(updated)}>{formatMonth(updated)}</time>
      </>,
    );
  }
  items.push(<>{minutes} min read</>);

  return (
    <p className="mt-6 text-sm text-muted">
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && <span aria-hidden> · </span>}
          <span className="whitespace-nowrap">{item}</span>
        </Fragment>
      ))}
    </p>
  );
}
