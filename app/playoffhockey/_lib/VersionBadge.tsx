'use client';

export default function VersionBadge() {
  const sha = process.env.NEXT_PUBLIC_COMMIT_SHA || 'dev';
  const built = process.env.NEXT_PUBLIC_BUILD_TIME || '';
  const short = sha.slice(0, 7);
  const builtLocal = built ? new Date(built).toLocaleString() : '';
  return (
    <div className="fixed bottom-2 right-2 z-50 px-2 py-1 rounded-sm bg-black/70 text-white/80 font-mono text-[10px] leading-tight pointer-events-none select-none">
      <div>v {short}</div>
      {builtLocal && <div className="text-white/50">{builtLocal}</div>}
    </div>
  );
}
