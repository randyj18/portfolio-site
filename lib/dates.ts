// Content dates are stored as "YYYY-MM" or "YYYY-MM-DD" strings in front matter.
// Month precision is deliberate for the original November 2025 posts: we know the
// month they went up, not the exact day.

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DATE_RE = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/;

export function normalizeDate(value: unknown): string | undefined {
  if (value instanceof Date && !isNaN(value.getTime())) {
    // js-yaml turns unquoted YYYY-MM-DD into a Date; keep the calendar day.
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === 'string' && DATE_RE.test(value.trim())) return value.trim();
  if (typeof value === 'number') return undefined;
  return undefined;
}

/** "November 2025" -> "2025-11" (for legacy "**Published:** Month Year" lines). */
export function parseMonthYear(value?: string): string | undefined {
  if (!value) return undefined;
  const m = /^([A-Za-z]+)\s+(\d{4})$/.exec(value.trim());
  if (!m) return undefined;
  const i = MONTHS.findIndex((name) => name.toLowerCase() === m[1].toLowerCase());
  return i === -1 ? undefined : `${m[2]}-${String(i + 1).padStart(2, '0')}`;
}

/** "November 2025" (month precision on purpose, see above). */
export function formatMonth(value?: string): string {
  if (!value) return '';
  const m = DATE_RE.exec(value);
  if (!m) return value;
  return `${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}

/** ISO string usable in <time dateTime> and feeds. */
export function isoDate(value?: string): string | undefined {
  if (!value) return undefined;
  const m = DATE_RE.exec(value);
  if (!m) return undefined;
  return m[3] ? `${m[1]}-${m[2]}-${m[3]}` : `${m[1]}-${m[2]}`;
}

/** Sortable number, e.g. 20251100 for "2025-11". */
export function dateKey(value?: string): number {
  if (!value) return 0;
  const m = DATE_RE.exec(value);
  if (!m) return 0;
  return Number(m[1]) * 10000 + Number(m[2]) * 100 + Number(m[3] ?? 0);
}

/** RFC 822 date for RSS. Month-only dates resolve to the first of the month. */
export function rfc822(value?: string): string | undefined {
  if (!value) return undefined;
  const m = DATE_RE.exec(value);
  if (!m) return undefined;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3] ?? 1), 12));
  return d.toUTCString();
}
