import fs from 'fs';
import path from 'path';
import { dateKey, normalizeDate, parseMonthYear } from './dates';
import { countWords, firstParagraph, internalLinks, readingMinutes } from './markdown';
import { parseFrontMatter } from './frontmatter';
import { getTopic, topics, type Topic } from './topics';

/*
 * Blog posts live in blogs/published/<slug>.md with YAML front matter:
 *
 *   ---
 *   title: An AI budget for every employee
 *   description: One or two sentences. Used as the dek, card text and meta description.
 *   topic: experimentation            # a slug from lib/topics.ts
 *   published: 2025-11                # YYYY-MM or YYYY-MM-DD
 *   updated: 2026-09                  # optional, only when the substance changed
 *   related: [sandboxing-safe-early-access]   # optional, curated extras
 *   status: published                 # optional; "draft" hides the post
 *   ---
 *
 * The body is plain Markdown (GFM) with no H1: the title comes from front matter.
 * See CLAUDE.md for the writing conventions.
 */

const blogsDirectory = path.join(process.cwd(), 'blogs/published');

export interface BlogPost {
  slug: string;
  title: string;
  /** Same as description. Kept because /api/blog consumers used "subtitle". */
  subtitle?: string;
  description: string;
  /** Topic display name. Kept for /api/blog compatibility ("cluster"). */
  cluster: string;
  topic: string;
  status: string;
  /** Legacy field, no longer used. */
  targetLength?: string;
  published?: string;
  updated?: string;
  words: number;
  readingMinutes: number;
  /** Markdown body without front matter. */
  content: string;
  excerpt?: string;
  /** Slugs of other posts this post links to in its text. */
  links: string[];
  /** Slugs of research notes this post links to. */
  researchLinks: string[];
  /** Curated related slugs from front matter. */
  related: string[];
}

export interface BlogCluster {
  name: string;
  posts: BlogPost[];
}

const isProd = process.env.NODE_ENV === 'production';
let cache: BlogPost[] | null = null;

export function getAllBlogSlugs(): string[] {
  return getAllBlogPosts().map((p) => p.slug);
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string');
  if (typeof value === 'string') return value.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
}

/**
 * Posts written before September 2026 used bold "**Field:** value" lines in the body
 * instead of front matter. Parse them so an old-format file still renders.
 */
function parseLegacy(content: string) {
  const field = (name: string) => content.match(new RegExp(`^\\*\\*${name}:\\*\\*\\s+(.+)$`, 'm'))?.[1]?.trim();
  const title = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const body = content
    .replace(/^#\s+.+$/m, '')
    .replace(/^\*\*(Subtitle|Target Length|Cluster|Status|Word Count|Published):\*\*.+$/gm, '')
    .replace(/^\s*---\s*$/m, '')
    .trim();
  return {
    title,
    description: field('Subtitle'),
    status: field('Status'),
    published: field('Published'),
    body,
  };
}

function readPost(slug: string): BlogPost | null {
  const fullPath = path.join(blogsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = parseFrontMatter(raw, fullPath);

  let title = typeof data.title === 'string' ? data.title : undefined;
  let description = typeof data.description === 'string' ? data.description : undefined;
  let status = typeof data.status === 'string' ? data.status : 'published';
  let body = content.trim();
  let published = normalizeDate(data.published);

  if (!title) {
    const legacy = parseLegacy(content);
    title = legacy.title;
    description = description ?? legacy.description;
    status = legacy.status && /shell|draft/i.test(legacy.status) ? 'draft' : status;
    body = legacy.body;
    published = published ?? parseMonthYear(legacy.published);
  }

  const topicSlug = typeof data.topic === 'string' ? data.topic : 'other';
  const topic = getTopic(topicSlug);
  const words = countWords(body);
  const excerpt = firstParagraph(body);

  return {
    slug,
    title: title ?? slug,
    subtitle: description,
    description: description ?? excerpt,
    cluster: topic?.name ?? 'Other writing',
    topic: topic ? topic.slug : 'other',
    status,
    published,
    updated: normalizeDate(data.updated),
    words,
    readingMinutes: readingMinutes(words),
    content: body,
    excerpt,
    links: internalLinks(body, 'blog').filter((s) => s !== slug),
    researchLinks: internalLinks(body, 'research'),
    related: asStringArray(data.related),
  };
}

export function getAllBlogPosts(): BlogPost[] {
  if (cache) return cache;
  const posts = fs
    .readdirSync(blogsDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readPost(f.replace(/\.md$/, '')))
    .filter((p): p is BlogPost => p !== null && p.status !== 'draft')
    .sort((a, b) => dateKey(b.updated ?? b.published) - dateKey(a.updated ?? a.published) || a.title.localeCompare(b.title));
  if (isProd) cache = posts;
  return posts;
}

export function getBlogBySlug(slug: string): BlogPost | null {
  return getAllBlogPosts().find((p) => p.slug === slug) ?? null;
}

/**
 * Posts in a topic, in the topic's reading order, then anything else in that topic
 * by date. A topic's readingOrder may also list a post whose own topic is different
 * (a cross-listing); those are included only when `crossListed` is true, so the
 * writing index still shows every post once, under its own topic.
 */
export function getPostsForTopic(topic: Topic, { crossListed = false }: { crossListed?: boolean } = {}): BlogPost[] {
  const all = getAllBlogPosts();
  const own = all.filter((p) => p.topic === topic.slug);
  const ordered = topic.readingOrder
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => Boolean(p) && (crossListed || p!.topic === topic.slug));
  const rest = own.filter((p) => !topic.readingOrder.includes(p.slug));
  return [...ordered, ...rest];
}

/** Posts whose topic slug doesn't match a defined topic. Shown as "Other writing". */
export function getUncategorizedPosts(): BlogPost[] {
  return getAllBlogPosts().filter((p) => !getTopic(p.topic));
}

/** Kept for /api/blog: topics expressed as { name, posts } clusters, in site order. */
export function getBlogsByCluster(): BlogCluster[] {
  const clusters = topics.map((t) => ({ name: t.name, posts: getPostsForTopic(t) })).filter((c) => c.posts.length > 0);
  const other = getUncategorizedPosts();
  if (other.length) clusters.push({ name: 'Other writing', posts: other });
  return clusters;
}

/** Posts that link to this one in their text. */
export function getBacklinks(slug: string): BlogPost[] {
  return getAllBlogPosts().filter((p) => p.slug !== slug && p.links.includes(slug));
}

/** Previous and next post in the same topic's reading order. */
export function getTopicNeighbours(post: BlogPost): { prev?: BlogPost; next?: BlogPost } {
  const topic = getTopic(post.topic);
  if (!topic) return {};
  const list = getPostsForTopic(topic);
  const i = list.findIndex((p) => p.slug === post.slug);
  if (i === -1) return {};
  return { prev: list[i - 1], next: list[i + 1] };
}

/**
 * Related posts, scored on real overlap:
 * curated in front matter (+4), linked from this post (+3), links to this post (+2),
 * same topic (+1). Ties keep the topic reading order.
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const current = getBlogBySlug(currentSlug);
  if (!current) return [];
  const all = getAllBlogPosts();
  const topicOrder = new Map<string, number>();
  topics.forEach((t, ti) => t.readingOrder.forEach((s, si) => topicOrder.set(s, ti * 100 + si)));

  return all
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      let score = 0;
      if (current.related.includes(p.slug)) score += 4;
      if (current.links.includes(p.slug)) score += 3;
      if (p.links.includes(currentSlug)) score += 2;
      if (p.topic === current.topic) score += 1;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (topicOrder.get(a.p.slug) ?? 9999) - (topicOrder.get(b.p.slug) ?? 9999))
    .slice(0, limit)
    .map((x) => x.p);
}
