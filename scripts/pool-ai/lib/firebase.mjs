import { readFileSync } from 'fs';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let cached = null;

export function getAdminDb() {
  if (cached) return cached;
  const raw = readFileSync(
    new URL('../../service-account.json', import.meta.url),
    'utf8'
  );
  const app =
    getApps()[0] ??
    initializeApp({ credential: cert(JSON.parse(raw)) });
  cached = getFirestore(app);
  return cached;
}
