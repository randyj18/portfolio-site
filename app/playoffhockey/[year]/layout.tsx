import { AuthProvider } from '../_lib/auth';
import AuthGate from '../_lib/AuthGate';

export default function PlayoffHockeyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  );
}
