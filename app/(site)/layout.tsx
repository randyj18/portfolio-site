import type { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    default: `${site.name} | AI Strategy & Product Leader`,
    template: `%s | ${site.name}`,
  },
  alternates: {
    types: { 'application/rss+xml': [{ url: '/feed.xml', title: `${site.name}: writing` }] },
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
