import type { Metadata } from 'next';
import { site } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | AI Strategy & Product Leader`,
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    title: `${site.name} | AI Strategy & Product Leader`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `${site.name} | AI Strategy & Product Leader`,
    description: site.description,
  },
};

// The public site (home, writing, research, about) adds its own header, footer and
// <main> in app/(site)/layout.tsx. Other routes (/gphl, /playoffhockey, /workouts,
// /playground demos) render their own page structure inside <body>.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body className="font-sans">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
