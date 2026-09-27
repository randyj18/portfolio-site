import { siteFontVariables } from '@/app/fonts';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

/**
 * Header, <main> and footer for public pages. Used by app/(site)/layout.tsx, the
 * playground index and the 404 page. The other routes (/gphl, /playoffhockey,
 * /workouts, playground demos) keep their own page structure.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`site ${siteFontVariables}`}>
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
