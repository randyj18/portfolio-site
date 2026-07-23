import { AuthProvider } from '../playoffhockey/_lib/auth';
import WorkoutAuthGate from './_lib/WorkoutAuthGate';

export const metadata = {
  title: 'Training Log',
  robots: { index: false, follow: false },
};

export default function WorkoutsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WorkoutAuthGate>{children}</WorkoutAuthGate>
    </AuthProvider>
  );
}
