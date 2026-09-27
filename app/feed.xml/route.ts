import { getAllBlogPosts } from '@/lib/blog';
import { rfc822 } from '@/lib/dates';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** RSS 2.0 feed of the writing, most recently published or updated first. */
export function GET() {
  const posts = getAllBlogPosts();
  const items = posts
    .map((p) => {
      const url = `${site.url}/blog/${p.slug}`;
      const date = rfc822(p.updated ?? p.published);
      return [
        '    <item>',
        `      <title>${escapeXml(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(p.description)}</description>`,
        `      <category>${escapeXml(p.cluster)}</category>`,
        date ? `      <pubDate>${date}</pubDate>` : '',
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}: writing</title>
    <link>${site.url}/blog</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(site.description)}</description>
    <language>en-ca</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
