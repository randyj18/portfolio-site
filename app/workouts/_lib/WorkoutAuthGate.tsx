'use client';

// Gates the /workouts route to the owner's Google account only.
// Reuses the same Firebase auth as the playoff-hockey section.
import { useAuth } from '../../playoffhockey/_lib/auth';
import { COMMISSIONER_EMAIL } from '../../playoffhockey/_lib/constants';

export default function WorkoutAuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, signIn, logOut } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate">Loading…</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-off-white rounded-lg border border-slate/20 p-8 shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-display font-bold text-navy mb-2">Training Log</h1>
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

  if ((user.email ?? '').toLowerCase() !== COMMISSIONER_EMAIL.toLowerCase()) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-off-white rounded-lg border border-slate/20 p-8 shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-display font-bold text-navy mb-2">Not authorized</h1>
          <p className="text-slate text-sm mb-6">
            This page is private. You&rsquo;re signed in as {user.email}.
          </p>
          <button
            onClick={logOut}
            className="w-full px-8 py-4 border border-slate/30 text-navy font-semibold rounded-sm hover:bg-slate/5 transition-all duration-300"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
