import { Barlow_Condensed, Source_Serif_4 } from 'next/font/google';

// Headings: a condensed grotesque set in capitals, close to the site's original look
// (the original Winner Sans Soft files are a 70-glyph trial cut; see SITE-REFRESH-NOTES.md).
export const headingFont = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

// Long-form body text.
export const serifFont = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const siteFontVariables = `${headingFont.variable} ${serifFont.variable}`;
