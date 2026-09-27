# Claude Assistant Instructions

## Project Overview
Personal site for Randy Jones, built with Next.js 14 (app router), Tailwind CSS and TypeScript. The writing lives in Markdown files; topic hubs, related posts, backlinks, the RSS feed and the sitemap are generated from them.

## Common Commands

- **Start Development Server:** `npm run dev`
- **Build Project:** `npm run build`
- **Lint Code:** `npm run lint`
- **Type Check:** `npx tsc --noEmit`
- **Check content:** `npm run check:content` (front matter, broken internal links, dashes, filler phrases, US spellings)

## Where things live

- Public pages are in the `app/(site)/` route group: home, `/blog` (writing index), `/blog/topics/[topic]` (topic hubs), `/blog/[slug]`, `/research`, `/research/[slug]`, `/about`. They share `components/site/SiteShell.tsx`.
- Posts: `blogs/published/<slug>.md`. Unfinished drafts: `blogs/drafts/` (never rendered).
- Research notes: `research/published/<slug>.md`.
- Topic hubs, their reading order, the "Start here" path and homepage picks: `lib/topics.ts`.
- Research themes: `researchThemes` in `lib/research.ts`.
- Old URLs that moved are permanent redirects in `next.config.js`.
- Leave these alone unless asked: `app/playoffhockey`, `app/workouts`, `app/gphl`, `app/api`, `firestore.rules`, the crons in `vercel.json`, `scripts/`, and the playground demos under `app/playground/*` with `components/PlaygroundAuth.tsx`.

## Writing a blog post

### 1. The file

Create `blogs/published/<slug>.md`. The slug is the URL (`/blog/<slug>`): lowercase, hyphenated, short, and never changed once published (if you must, add a redirect in `next.config.js`).

```markdown
---
title: An AI budget for every employee
description: One or two sentences, under about 160 characters, that state the argument plainly.
topic: experimentation
published: 2026-10
related: [sandboxing-safe-early-access]
---

The first paragraph. No H1 in the body: the title comes from front matter.

## A section heading in sentence case

More text, with [links to other posts](/blog/some-slug) in context.

> Updated November 2026: A dated correction or development goes in a blockquote that starts with "Updated". The site renders it as an update note.
```

- `title`: short, plain and specific, ideally under 60 characters. It renders in capitals in a condensed face, so shorter reads better. Avoid clickbait shapes ("X: Why Y (And What Z)") and numbers used as hooks.
- `description`: the dek under the title, card text and meta description. Say what the post argues.
- `topic`: a slug from `lib/topics.ts`. Add the post to that topic's `readingOrder` where it belongs, or it is appended at the end of the hub.
- `published` / `updated`: `YYYY-MM` (or `YYYY-MM-DD`). Add `updated` only when the substance changes, and keep the original `published`.
- `related`: optional, at most two slugs, for an important relationship that isn't already a link in the text. Related posts are otherwise worked out from links and topics.
- Don't add a table of contents, "Back to top" links, a TLDR, a "Related posts" list or a Published/Word count footer. The site adds navigation (an "On this page" list appears automatically on posts over about 1,500 words), related posts, backlinks and dates.

### 2. Voice and style

The ideas are Randy's. Write the way a thoughtful practitioner talks to a peer.

- First person where it's his view. Plain, direct and specific. Vary sentence length. Shorter is usually better: most posts land between 600 and 1,400 words.
- Size claims to the evidence. Leave open questions open instead of forcing a conclusion. No hype.
- Concrete examples over abstractions. Never invent examples, anecdotes, client stories, quotes or statistics, and don't add or embellish anything about Randy himself.
- Canadian spelling: colour, centre, behaviour, defence, labour, licence (noun), travelled, modelling. Use -ize (organize, prioritize).
- **No em dashes, anywhere.** Avoid en dashes too; write ranges as "50 to 150" or "2025-26".
- Avoid the patterns that make text read as machine-written: "delve", "landscape", "tapestry", "navigate the complexities", "in today's rapidly evolving", "game-changer", "unlock", "robust", "seamless", "leverage" as a verb, "harness", "empower", "crucial", "moreover"; "it's not X, it's Y" and "the question isn't X, it's Y" constructions; reflexive lists of three; rhetorical questions opening sections; strings of dramatic fragments; bold scattered through paragraphs; emoji; "Let's dive in"; "In conclusion"; "The bottom line".
- Headings only when a post is long enough to need them, written as plain labels or short claims ("What the budget covers"), not formula ("The Bigger Picture", "Getting Started", "Key Takeaways").
- End on substance: the last useful point, a first step, or an honest open question.

### 3. Facts and sources

- Check every statistic, named study, product fact and company example against a primary source (the report, paper, official docs or announcement) and link it inline in the sentence that makes the claim. If it can't be verified, cut it or state it as an opinion.
- Date fast-moving specifics (model names, prices, rankings): "as of September 2026".
- When something in an older post goes out of date, fix the text or add an `> Updated <Month Year>: ...` note, and set `updated` in front matter.

### 4. Linking

- Link 2 to 4 related posts in context, with descriptive anchor text. Don't force links.
- Research notes can be linked as `/research/<slug>`.
- `npm run check:content` fails on broken internal links, unknown topics, dashes and legacy boilerplate, and warns about filler phrases, US spellings and link counts.

### 5. Verify

- `npm run check:content`, then `npm run dev` and read the post at `http://localhost:3000/blog/<slug>`, on a phone-width window as well.
- `npx tsc --noEmit`, `npm run lint` and `npm run build` before committing.

## Research notes

Same conventions, in `research/published/<slug>.md`, with `theme` (a slug from `researchThemes` in `lib/research.ts`) instead of `topic`, and a `papers` list:

```yaml
papers:
  - title: "Paper title as published"
    url: https://arxiv.org/abs/xxxx.xxxxx
    authors: First Author et al. (Lab)
    date: 2025-01
```

Each note says what the paper showed (numbers from the paper itself), why it might matter outside the lab, and what is still uncertain. Add dated updates when follow-up work changes the picture.

## Git Workflow
- **Commit Messages:** Concise, focused on "why" and "what".
- **Push:** Only push when explicitly asked. Pushing `main` deploys the live site through Vercel.
