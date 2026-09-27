import matter from 'gray-matter';

/**
 * Parse YAML front matter. If the YAML is invalid (the usual cause is an unquoted
 * value containing ": "), fall back to reading simple `key: value` lines so one
 * malformed file can't take the whole site down. `npm run check:content` reports
 * the YAML error so it gets fixed properly.
 */
export function parseFrontMatter(raw: string, file: string): { data: Record<string, unknown>; content: string } {
  try {
    const { data, content } = matter(raw);
    return { data, content };
  } catch (error) {
    const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
    if (!m) throw error;
    console.warn(`Invalid front matter in ${file}; using a simple key: value fallback.`);
    const data: Record<string, unknown> = {};
    for (const line of m[1].split(/\r?\n/)) {
      const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
      if (!kv || kv[2] === '') continue;
      const value = kv[2].trim().replace(/^(["'])([\s\S]*)\1$/, '$2');
      data[kv[1]] = /^\[.*\]$/.test(value)
        ? value.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean)
        : value;
    }
    return { data, content: m[2] };
  }
}
