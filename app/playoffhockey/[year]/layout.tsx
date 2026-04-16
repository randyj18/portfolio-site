import { AuthProvider } from '../_lib/auth';
import AuthGate from '../_lib/AuthGate';
import VersionBadge from '../_lib/VersionBadge';

export default function PlayoffHockeyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
      <VersionBadge />
    </AuthProvider>
  );
}
