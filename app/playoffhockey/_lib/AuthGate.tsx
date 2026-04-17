'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from './auth';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, signIn } = useAuth();
  const pathname = usePathname() ?? '';

  // Public routes under /playoffhockey that bypass auth.
  if (pathname.endsWith('/league') || pathname.includes('/league/')) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-sm border border-slate/20 p-8 shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-navy mb-2">Playoff Hockey Pool</h1>
          <p className="text-slate text-sm mb-6">Sign in with Google to continue.</p>
          <button
            onClick={signIn}
            className="w-full px-8 py-4 bg-gradient-to-r from-gold-light to-orange-burnt text-navy font-semibold rounded-sm hover:shadow-lg hover:shadow-orange-burnt/50 transition-all duration-300"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
