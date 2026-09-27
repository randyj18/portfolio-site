import type { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import { ogImage, site } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    default: `${site.name} | AI Strategy & Product Leader`,
    template: `%s | ${site.name}`,
  },
  alternates: {
    types: { 'application/rss+xml': [{ url: '/feed.xml', title: `${site.name}: writing` }] },
  },
  openGraph: {
    title: `${site.name} | AI Strategy & Product Leader`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: 'website',
    images: [ogImage],
  },
  twitter: { card: 'summary_large_image', images: [ogImage.url] },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
