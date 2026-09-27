import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// Private pages (/workouts, /gphl) carry their own noindex meta tags. They are not
// disallowed here, because a crawler has to fetch a page to see its noindex tag.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
