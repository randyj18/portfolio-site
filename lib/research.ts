import fs from 'fs';
import path from 'path';
import { dateKey, normalizeDate } from './dates';
import { parseFrontMatter } from './frontmatter';
import { countWords, firstParagraph, internalLinks, readingMinutes } from './markdown';

/*
 * Research notes live in research/published/<slug>.md with YAML front matter:
 *
 *   ---
 *   title: DeepSeek-R1 and reasoning from reinforcement learning
 *   description: One or two sentences for cards and meta description.
 *   theme: cheaper-models              # a slug from researchThemes below
 *   status: published-result           # in-use | published-result | early-research
 *   papers:
 *     - title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via RL"
 *       url: https://arxiv.org/abs/2501.12948
 *       authors: DeepSeek-AI
 *       date: 2025-01
 *   published: 2025-11                 # when the note was written
 *   updated: 2026-09                   # optional
 *   ---
 */

const researchDirectory = path.join(process.cwd(), 'research/published');

export interface ResearchTheme {
  slug: string;
  name: string;
  short: string;
}

export const researchThemes: ResearchTheme[] = [
  {
    slug: 'cheaper-models',
    name: 'Cheaper, smaller models',
    short: 'Why the cost of a capable model keeps falling, and what that does to the economics.',
  },
  {
    slug: 'learning-from-experience',
    name: 'Learning from generated data and experience',
    short: 'Training models and agents on text other models wrote, or on what happened when they tried things.',
  },
  {
    slug: 'new-architectures',
    name: 'New architectures to watch',
    short: 'Ideas that change how models predict or remember. Promising at small scale, unproven at large scale.',
  },
  {
    slug: 'physical-world',
    name: 'Robots and the physical world',
    short: 'Connecting language models to perception and action, and how far that has really come.',
  },
];

/** Plain-language maturity label shown on each note. */
export const researchStatuses: Record<string, string> = {
  'in-use': 'In wide use',
  'published-result': 'Published result',
  'early-research': 'Early research',
};

export interface PaperRef {
  title: string;
  url?: string;
  authors?: string;
  date?: string;
  venue?: string;
}

export interface ResearchPaper {
  slug: string;
  title: string;
  description: string;
  theme: string;
  themeName: string;
  /** Display label from researchStatuses, if set. */
  status?: string;
  papers: PaperRef[];
  published?: string;
  updated?: string;
  words: number;
  readingMinutes: number;
  content: string;
  excerpt?: string;
  blogLinks: string[];
  researchLinks: string[];
}

const isProd = process.env.NODE_ENV === 'production';
let cache: ResearchPaper[] | null = null;

function toPaperRefs(value: unknown): PaperRef[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === 'object' && v !== null)
    .map((v) => ({
      title: String(v.title ?? ''),
      url: typeof v.url === 'string' ? v.url : undefined,
      authors: typeof v.authors === 'string' ? v.authors : undefined,
      date: normalizeDate(v.date) ?? (typeof v.date === 'string' ? v.date : undefined),
      venue: typeof v.venue === 'string' ? v.venue : undefined,
    }))
    .filter((p) => p.title);
}

function readNote(slug: string): ResearchPaper | null {
  const fullPath = path.join(researchDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const { data, content } = parseFrontMatter(fs.readFileSync(fullPath, 'utf8'), fullPath);
  const body = content.trim();
  const title = typeof data.title === 'string' ? data.title : body.match(/^#\s+(.+)$/m)?.[1] ?? slug;
  const theme = typeof data.theme === 'string' ? data.theme : 'other';
  const themeName = researchThemes.find((t) => t.slug === theme)?.name ?? 'Other notes';
  const words = countWords(body);
  const excerpt = firstParagraph(body);
  return {
    slug,
    title,
    description: typeof data.description === 'string' ? data.description : excerpt,
    theme,
    themeName,
    status: typeof data.status === 'string' ? researchStatuses[data.status] : undefined,
    papers: toPaperRefs(data.papers),
    published: normalizeDate(data.published),
    updated: normalizeDate(data.updated),
    words,
    readingMinutes: readingMinutes(words),
    content: body,
    excerpt,
    blogLinks: internalLinks(body, 'blog'),
    researchLinks: internalLinks(body, 'research').filter((s) => s !== slug),
  };
}

export function getAllResearchPapers(): ResearchPaper[] {
  if (cache) return cache;
  const notes = fs
    .readdirSync(researchDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readNote(f.replace(/\.md$/, '')))
    .filter((n): n is ResearchPaper => n !== null)
    .sort((a, b) => dateKey(b.papers[0]?.date) - dateKey(a.papers[0]?.date) || a.title.localeCompare(b.title));
  if (isProd) cache = notes;
  return notes;
}

export function getAllResearchSlugs(): string[] {
  return getAllResearchPapers().map((n) => n.slug);
}

export function getResearchBySlug(slug: string): ResearchPaper | null {
  return getAllResearchPapers().find((n) => n.slug === slug) ?? null;
}

export function getResearchByTheme(): { theme: ResearchTheme; papers: ResearchPaper[] }[] {
  const all = getAllResearchPapers();
  const groups = researchThemes
    .map((theme) => ({ theme, papers: all.filter((p) => p.theme === theme.slug) }))
    .filter((g) => g.papers.length > 0);
  const other = all.filter((p) => !researchThemes.some((t) => t.slug === p.theme));
  if (other.length) groups.push({ theme: { slug: 'other', name: 'Other notes', short: '' }, papers: other });
  return groups;
}

/** Notes in the same theme first, then notes this one links to. */
export function getRelatedPapers(currentSlug: string, limit: number = 3): ResearchPaper[] {
  const current = getResearchBySlug(currentSlug);
  if (!current) return [];
  return getAllResearchPapers()
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      p,
      score:
        (p.theme === current.theme ? 2 : 0) +
        (current.researchLinks.includes(p.slug) ? 3 : 0) +
        (p.researchLinks.includes(currentSlug) ? 2 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

/** Blog posts that cite this research note are computed in the page via lib/blog. */
