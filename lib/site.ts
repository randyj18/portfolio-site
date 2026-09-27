// Site-wide facts used in metadata, the header, the footer and contact blocks.
// Keep personal details here so they are easy to review and change in one place.

export const site = {
  name: 'Randy Jones',
  url: 'https://randyjones.ca',
  role: 'AI strategy and product leadership',
  description:
    'Randy Jones writes about how organizations actually adopt AI: budgets and guardrails, data and knowledge, vendors and lock-in, and the people doing the work.',
  email: 'randyjones87@gmail.com',
  linkedin: 'https://www.linkedin.com/in/randy-jones-73583229/',
  locale: 'en_CA',
} as const;

/** Default social preview image (public/og.png), used by every public page. */
export const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Randy Jones: AI strategy and product leadership. Writing on how organizations actually adopt AI.',
};

export const nav = [
  { href: '/blog', label: 'Writing' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
] as const;
