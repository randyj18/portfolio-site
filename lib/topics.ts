// Topic hubs for the writing section. Each post's front matter names one topic.
// readingOrder is the suggested path through the hub; posts in the topic that
// aren't listed are appended after it, newest first.
// PROVISIONAL: finalized after the content review.

export interface Topic {
  slug: string;
  name: string;
  /** One line for cards and the blog index. */
  short: string;
  /** A few short paragraphs for the hub page. Markdown links allowed. */
  intro: string[];
  readingOrder: string[];
}

export const topics: Topic[] = [
  {
    slug: 'experimentation',
    name: 'Experimentation and adoption',
    short: 'Budgets, sandboxes and shared learning: how people actually start using AI at work.',
    intro: [],
    readingOrder: [],
  },
  {
    slug: 'people-and-leadership',
    name: 'People and leadership',
    short: 'Who decides, who gets rewarded, and how skills and roles change.',
    intro: [],
    readingOrder: [],
  },
  {
    slug: 'data-and-knowledge',
    name: 'Data and knowledge',
    short: 'Metadata, storage and the data plumbing agents depend on.',
    intro: [],
    readingOrder: [],
  },
  {
    slug: 'platforms-and-vendors',
    name: 'Platforms and vendors',
    short: 'SaaS lock-in, data portability, Microsoft, multi-cloud and build versus buy.',
    intro: [],
    readingOrder: [],
  },
  {
    slug: 'agents-and-tools',
    name: 'Agents and tools',
    short: 'MCP, orchestration, coding agents and where the technology is heading.',
    intro: [],
    readingOrder: [],
  },
];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

/** The site-wide "start here" path, in order. */
export const startHere: string[] = [];

/** Posts featured on the homepage. */
export const featured: string[] = [];
