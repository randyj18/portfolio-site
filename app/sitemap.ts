import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import { isoDate } from '@/lib/dates';
import { getAllResearchPapers } from '@/lib/research';
import { site } from '@/lib/site';
import { topics } from '@/lib/topics';

// Public pages only. /gphl, /workouts and /playoffhockey are deliberately left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified?: string) => ({
    url: `${site.url}${path}`,
    ...(lastModified ? { lastModified } : {}),
  });

  return [
    page('/'),
    page('/blog'),
    page('/blog/topics'),
    ...topics.map((t) => page(`/blog/topics/${t.slug}`)),
    ...getAllBlogPosts().map((p) => page(`/blog/${p.slug}`, isoDate(p.updated ?? p.published))),
    page('/research'),
    ...getAllResearchPapers().map((n) => page(`/research/${n.slug}`, isoDate(n.updated ?? n.published))),
    page('/about'),
    page('/playground'),
  ];
}
