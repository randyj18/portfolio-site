#!/usr/bin/env node
// Content checks for blog posts and research notes.
// Run: npm run check:content        (exit code 1 on errors, warnings don't fail)
//
// Errors: missing front matter fields, unknown topic/theme, broken internal links,
//         em or en dashes, legacy boilerplate (Quick Navigation, Back to top, TLDR, H1 in body).
// Warnings: phrases that read as AI filler, US spellings, link counts outside 2-4, long posts.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const listMd = (dir) =>
  fs.existsSync(path.join(root, dir))
    ? fs.readdirSync(path.join(root, dir)).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
    : [];

const topicSlugs = [...read('lib/topics.ts').matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const themeSlugs = [...read('lib/research.ts').matchAll(/\{\s*slug:\s*'([^']+)'/g)].map((m) => m[1]);
const blogSlugs = new Set(listMd('blogs/published'));
const researchSlugs = new Set(listMd('research/published'));

const BANNED = [
  'delve', 'landscape', 'tapestry', 'navigate the complexit', "in today's rapidly", 'rapidly evolving',
  'game-changer', 'game changer', 'game-changing', 'unlock', 'robust', 'seamless', 'harness', 'empower',
  'cutting-edge', 'revolutioniz', 'transformative', 'paradigm', 'synergy', 'holistic', 'pivotal', 'crucial',
  'foster', 'elevate', 'streamline', 'supercharge', 'realm', 'embark', 'at the end of the day',
  "it's worth noting", 'it is worth noting', 'moreover', 'furthermore', 'in essence', 'the real question',
  "here's the thing", "here's the reality", "here's what", 'the truth is', 'uncomfortable truth',
  'contrarian truth', "let's dive", "let's get concrete", 'in conclusion', 'the bottom line', 'tl;dr', 'tldr',
  'leverage ai', 'leverage the', 'leverage your', 'leverage their', 'leveraging', 'leverages',
];
const US_SPELLINGS = [
  'color', 'colors', 'center', 'centers', 'centered', 'behavior', 'behaviors', 'behavioral', 'defense',
  'favor', 'favorite', 'favorable', 'labor', 'honor', 'catalog', 'traveled', 'traveling', 'modeling',
  'modeled', 'labeled', 'labeling', 'canceled', 'fulfill', 'analog', 'neighbor', 'endeavor', 'rumor',
  'savior', 'odor', 'vapor', 'rigor', 'harbor', 'tumor', 'armor', 'parlor', 'flavor', 'humor',
];
const NOT_X_ITS_Y = /\b(?:is|isn't|is not|are|aren't|are not)\b[^.?!\n]{0,60}[.,;:]\s*(?:it's|it is|they're|they are|this is)\b/gi;

let errors = 0;
let warnings = 0;
const report = [];

function checkBody(file, body, { section }) {
  const msgs = [];
  const err = (m) => { msgs.push(`  ERROR  ${m}`); errors++; };
  const warn = (m) => { msgs.push(`  warn   ${m}`); warnings++; };

  // Ignore fenced code for most checks
  const prose = body.replace(/```[\s\S]*?```/g, '');
  const lower = prose.toLowerCase();

  if (/—/.test(prose)) err(`em dash (—) x${(prose.match(/—/g) || []).length}`);
  if (/–/.test(prose)) err(`en dash (–) x${(prose.match(/–/g) || []).length}`);
  if (/^#\s/m.test(prose)) err('H1 in body (the title comes from front matter)');
  if (/quick navigation/i.test(prose)) err('"Quick Navigation" block');
  if (/back to top/i.test(prose)) err('"Back to top" link');
  if (/\*\*TL;?DR/i.test(prose) || /^#+\s*TL;?DR/im.test(prose)) err('TLDR section');
  if (/\[LINK:/.test(prose)) err('unresolved [LINK: ...] placeholder');
  if (/^\*\*(Published|Word Count|Cluster|Subtitle|Status|Target Length):\*\*/m.test(prose)) err('legacy metadata line in body');

  for (const m of prose.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    const url = m[1].split('#')[0].replace(/\/$/, '');
    let ok = true;
    let mm;
    if ((mm = /^\/blog\/topics\/([^/]+)$/.exec(url))) ok = topicSlugs.includes(mm[1]);
    else if ((mm = /^\/blog\/([^/]+)$/.exec(url))) ok = blogSlugs.has(mm[1]) || mm[1] === 'topics';
    else if ((mm = /^\/research\/([^/]+)$/.exec(url))) ok = researchSlugs.has(mm[1]);
    else ok = ['', '/blog', '/research', '/about', '/playground', '/blog/topics'].includes(url);
    if (!ok) err(`broken internal link ${m[1]}`);
  }

  for (const phrase of BANNED) {
    const count = lower.split(phrase).length - 1;
    if (count) warn(`phrase "${phrase}" x${count}`);
  }
  for (const word of US_SPELLINGS) {
    const re = new RegExp(`\\b${word}\\b`, 'gi');
    const hits = prose.match(re);
    if (hits) warn(`US spelling "${word}" x${hits.length}`);
  }
  const notXY = prose.match(NOT_X_ITS_Y);
  if (notXY) warn(`possible "it's not X, it's Y" x${notXY.length}: "${notXY[0].slice(0, 70)}..."`);
  const boldInPara = prose.split('\n').filter((l) => !/^\s*([-*]|\d+\.|\|)/.test(l) && /\*\*[^*]+\*\*/.test(l)).length;
  if (boldInPara > 2) warn(`bold used in ${boldInPara} paragraphs`);
  const questionsOpeningSections = [...prose.matchAll(/^##+ .+\n+([^\n]+\?)\s*$/gm)].length;
  if (questionsOpeningSections) warn(`${questionsOpeningSections} section(s) open with a question`);

  if (section === 'blog') {
    const links = new Set([...prose.matchAll(/\]\(\/blog\/([a-z0-9-]+)/g)].map((m) => m[1]).filter((s) => s !== 'topics'));
    if (links.size < 2) warn(`only ${links.size} internal post link(s); aim for 2 to 4`);
    if (links.size > 5) warn(`${links.size} internal post links; more than 4 is usually forced`);
  }
  const words = prose.split(/\s+/).filter(Boolean).length;
  if (words > 2000) warn(`${words} words; most posts should be 600 to 1,400`);
  return { msgs, words };
}

function checkFrontMatter(file, data, required, extra) {
  const msgs = [];
  for (const key of required) {
    if (data[key] === undefined || data[key] === '') {
      msgs.push(`  ERROR  missing front matter "${key}"`);
      errors++;
    }
  }
  if (typeof data.description === 'string' && data.description.length > 200) {
    msgs.push(`  warn   description is ${data.description.length} chars (aim for under ~160)`);
    warnings++;
  }
  if (typeof data.title === 'string' && data.title.length > 70) {
    msgs.push(`  warn   title is ${data.title.length} chars (aim for under ~60)`);
    warnings++;
  }
  for (const [key, value] of Object.entries(data)) {
    const s = typeof value === 'string' ? value : JSON.stringify(value);
    if (/[–—]/.test(s ?? '')) {
      msgs.push(`  ERROR  dash in front matter "${key}"`);
      errors++;
    }
  }
  msgs.push(...extra);
  return msgs;
}

for (const slug of [...blogSlugs].sort()) {
  const file = `blogs/published/${slug}.md`;
  const { data, content } = matter(read(file));
  const extra = [];
  if (data.topic && !topicSlugs.includes(data.topic)) {
    extra.push(`  ERROR  unknown topic "${data.topic}" (not in lib/topics.ts, so the post is on no hub)`);
    errors++;
  }
  for (const r of Array.isArray(data.related) ? data.related : []) {
    if (!blogSlugs.has(r)) {
      extra.push(`  ERROR  related slug "${r}" does not exist`);
      errors++;
    }
  }
  const fm = checkFrontMatter(file, data, ['title', 'description', 'topic', 'published'], extra);
  const { msgs, words } = checkBody(file, content, { section: 'blog' });
  report.push({ file, words, msgs: [...fm, ...msgs] });
}

for (const slug of [...researchSlugs].sort()) {
  const file = `research/published/${slug}.md`;
  const { data, content } = matter(read(file));
  const extra = [];
  if (data.theme && !themeSlugs.includes(data.theme)) {
    extra.push(`  ERROR  unknown theme "${data.theme}"`);
    errors++;
  }
  const fm = checkFrontMatter(file, data, ['title', 'description', 'theme', 'published'], extra);
  const { msgs, words } = checkBody(file, content, { section: 'research' });
  report.push({ file, words, msgs: [...fm, ...msgs] });
}

// Topic reading orders must point at real posts in that topic
const topicsSrc = read('lib/topics.ts');
for (const t of topicSlugs) {
  const block = topicsSrc.split(`slug: '${t}'`)[1]?.split(/slug:\s*'/)[0] ?? '';
  const order = [...(block.match(/readingOrder:\s*\[([\s\S]*?)\]/)?.[1] ?? '').matchAll(/'([^']+)'/g)].map((m) => m[1]);
  for (const s of order) {
    if (!blogSlugs.has(s)) {
      report.push({ file: 'lib/topics.ts', words: 0, msgs: [`  ERROR  topic "${t}" lists missing post "${s}"`] });
      errors++;
      continue;
    }
    // A slug from another topic in a reading order is a deliberate cross-listing:
    // it shows on this hub too, but the post's own topic stays its home.
  }
}

const verbose = process.argv.includes('--verbose');
let totalWords = 0;
for (const r of report) {
  totalWords += r.words;
  if (r.msgs.length || verbose) {
    console.log(`${r.file}${r.words ? ` (${r.words} words)` : ''}`);
    for (const m of r.msgs) console.log(m);
  }
}
console.log(`\n${blogSlugs.size} posts, ${researchSlugs.size} research notes, ${totalWords} words. ${errors} error(s), ${warnings} warning(s).`);
process.exit(errors ? 1 : 0);
