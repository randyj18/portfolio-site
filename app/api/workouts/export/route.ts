import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getAdmin } from '@/app/playoffhockey/_lib/firebaseAdmin';
import { COMMISSIONER_EMAIL } from '@/app/playoffhockey/_lib/constants';

// Read-only export of saved workout sessions for the owner's local
// assistant. Protected by a shared secret in the x-export-token header.
//   GET /api/workouts/export?days=60&limit=100

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function clampInt(raw: string | null, fallback: number, lo: number, hi: number): number {
  const n = raw === null ? NaN : Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(lo, Math.min(hi, n));
}

export async function GET(req: Request) {
  const expected = process.env.WORKOUT_EXPORT_TOKEN;
  if (!expected) {
    return NextResponse.json({ error: 'WORKOUT_EXPORT_TOKEN is not configured' }, { status: 500 });
  }
  const provided = Buffer.from(req.headers.get('x-export-token') ?? '');
  const wanted = Buffer.from(expected);
  if (provided.length === 0 || provided.length !== wanted.length || !timingSafeEqual(provided, wanted)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const days = clampInt(url.searchParams.get('days'), 60, 1, 3650);
  const limit = clampInt(url.searchParams.get('limit'), 100, 1, 1000);
  const since = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);

  const sessions: Record<string, unknown>[] = [];
  try {
    const { db } = getAdmin();
    const users = await db.collection('workoutUsers').where('email', '==', COMMISSIONER_EMAIL).get();
    for (const user of users.docs) {
      const snap = await user.ref
        .collection('sessions')
        .where('date', '>=', since)
        .orderBy('date', 'desc')
        .limit(limit)
        .get();
      for (const d of snap.docs) sessions.push({ id: d.id, ...d.data() });
    }
  } catch (e: unknown) {
    console.error('[workouts/export]', e);
    return NextResponse.json({ error: 'export failed; check server logs' }, { status: 500 });
  }
  sessions.sort((a, b) => String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? '')));

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    since,
    count: sessions.length,
    sessions: sessions.slice(0, limit),
  });
}
