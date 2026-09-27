import GithubSlugger from 'github-slugger';

export interface Heading {
  depth: number;
  text: string;
  id: string;
}

const FENCE_RE = /^(```|~~~)/;

/** Markdown lines outside fenced code blocks. */
function proseLines(markdown: string): string[] {
  const out: string[] = [];
  let inFence = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (FENCE_RE.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) out.push(line);
  }
  return out;
}

/** Strip inline markdown so heading text matches what rehype-slug sees. */
export function inlineToText(md: string): string {
  return md
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(\*|_)(.+?)\1/g, '$2')
    .replace(/<[^>]+>/g, '')
    .trim();
}

/**
 * Headings in document order with the same ids rehype-slug generates
 * (both use github-slugger over the heading's text content).
 */
export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  for (const line of proseLines(markdown)) {
    const m = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = inlineToText(m[2]);
    headings.push({ depth: m[1].length, text, id: slugger.slug(text) });
  }
  return headings;
}

export function countWords(markdown: string): number {
  const text = proseLines(markdown)
    .join(' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]/g, ' ');
  return text.split(/\s+/).filter(Boolean).length;
}

/** Minutes at ~230 words per minute, never less than 1. */
export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 230));
}

/** Internal links like ](/blog/some-slug) or ](/research/x#anchor). */
export function internalLinks(markdown: string, section: 'blog' | 'research'): string[] {
  const re = new RegExp(`\\]\\(/${section}/([a-z0-9-]+)(?:#[^)]*)?\\)`, 'g');
  const found = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(markdown))) found.add(m[1]);
  return Array.from(found);
}

/** First paragraph of body text, as plain text, for cards and fallbacks. */
export function firstParagraph(markdown: string, max = 220): string {
  const blocks = markdown.split(/\n\s*\n/);
  for (const block of blocks) {
    const b = block.trim();
    if (!b || /^(#|>|\||-|\*|\d+\.|```|~~~|<)/.test(b)) continue;
    const text = inlineToText(b.replace(/\s+/g, ' '));
    if (text.length < 40) continue;
    return text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, '')}…` : text;
  }
  return '';
}
