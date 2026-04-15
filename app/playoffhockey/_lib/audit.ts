import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import type { AuditAction } from './types';

export async function logAudit(
  db: Firestore,
  year: number,
  action: AuditAction,
  actor: { uid: string; email: string | null },
  details: Record<string, string | number | boolean | null> = {}
): Promise<void> {
  try {
    await addDoc(collection(db, 'seasons', String(year), 'auditLog'), {
      action,
      actorUid: actor.uid,
      actorEmail: actor.email ?? '',
      details,
      createdAt: Date.now(),
      serverCreatedAt: serverTimestamp(),
    });
  } catch {
    // Audit is best-effort; don't block admin actions on log failures.
  }
}
