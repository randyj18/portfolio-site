# Site refresh notes (September 2026)

Everything is on the branch `site-refresh-2026`. Nothing has been pushed, merged or deployed.

## At a glance

- **Design:** a new design for the public pages: home, writing, topic hubs, posts, research notes, about, the playground index and the 404 page. It keeps the navy, warm off-white and burnt-orange identity and the condensed capital headings. The long-form reading layout is new, and it works on phones and in dark mode.
- **Link map:** the circuit-board "link map" is gone. In its place:
  - five topic hubs, each with an intro and a suggested reading order;
  - a five-post "Start here" path;
  - related posts worked out from the actual links between posts;
  - "Linked from" backlinks;
  - previous and next links within each topic;
  - an "On this page" list for long posts.
- **Writing:** all 32 posts were rewritten in a plainer first-person voice.
  - Seven near-duplicates were merged into the post that covers the same idea, which leaves 24 posts.
  - The unfinished "model rankings" template, which was publicly reachable, was retired.
  - The 11 research notes became 10, because the two DeepSeek notes were merged.
  - Total length went from about 90,000 words to about 36,000.
  - Every statistic that survived was checked against a primary source and linked. Anything unverifiable was cut or turned into a clearly labelled opinion.
  - The em dashes are all gone.
- **URLs:** every old URL still works. Merged and retired URLs are permanent redirects in `next.config.js`.
- **Conventions:** posts now use YAML front matter. `npm run check:content` enforces the conventions, which are written up in `CLAUDE.md` for future posts.

**To preview locally,** from the worktree `C:\VSCode\portfolio-site\.claude\worktrees\agent-acfec54a0a1ce3e7c`, or from any checkout of the branch:

```
npm ci
npm run dev          # http://localhost:3000
npm run check:content
```

## Design decisions

Screenshots are in `review/before/` (the old site) and `review/after/` (this branch). The committed copies are compressed JPEGs. Full-size PNGs of the same shots sit next to them in the worktree but are git-ignored.

| Page | Before | After |
|---|---|---|
| Home | `review/before/home-desktop.jpg`, `home-mobile.jpg` | `review/after/home-desktop.jpg`, `home-mobile.jpg`, `home-dark-desktop.jpg` |
| Writing index | `review/before/blog-index-desktop.jpg`, `blog-index-mobile.jpg` | `review/after/blog-index-desktop.jpg`, `blog-index-mobile.jpg` |
| Topic hub | (none existed) | `review/after/topic-hub-desktop.jpg` |
| Post | `review/before/post-desktop.jpg`, `post-mobile.jpg` | `review/after/post-long-desktop.jpg` (sidebar contents), `post-table-desktop.jpg`, `post-mobile.jpg`, `post-dark-desktop.jpg` |
| Research | `review/before/research-index-desktop.jpg`, `research-post-desktop.jpg` | `review/after/research-index-desktop.jpg`, `research-index-mobile.jpg`, `research-note-desktop.jpg` |
| About | (was homepage sections) | `review/after/about-desktop.jpg` |
| Playground index | `review/before/playground-desktop.jpg` (blank until JavaScript ran) | `review/after/playground-desktop.jpg` |
| 404 | (Next.js default) | `review/after/not-found-desktop.jpg` |
| Retired template | `review/before/model-rankings-shell-desktop.jpg` | redirects to /blog |
| Out-of-scope routes, unchanged | `review/before/gphl-desktop.jpg`, `playoffhockey-league-desktop.jpg`, `workouts-desktop.jpg`, `playground-audio-desktop.jpg` | same names in `review/after/`. The gphl and workouts renders are byte-identical; the other two differ only in a build timestamp. |

**What I kept, because it's the site's identity:**
- the navy (#192332) and warm off-white palette, with a burnt-orange accent;
- big condensed headings set in capitals;
- the navy band behind the homepage intro, with an orange call to action;
- the navy footer;
- the same portrait.

**What I dropped:**
- gradient text, blurred colour blobs and five competing call-to-action buttons;
- the stat counters ("10 research highlights", "8 topic clusters");
- the fluffy homepage sections (Philosophy, Systems Thinking, Capabilities, More Coming);
- the circuit-board link map and its 6.4 MB background image;
- the framer-motion reveal animations. They start content at opacity 0, which is why the playground page screenshotted blank.

**Why the heading font changed.** The Winner Sans Soft files in `public/fonts` are a trial cut, and there are three problems with them:
- their internal name reads "ckTrial Winner Sans Soft Cond" with the note "Try this. Buy this if you like this.", and trial licences usually don't cover a published site;
- they contain only 70 glyphs, with no apostrophe, colon, ampersand, dollar sign, quotes or parentheses, so titles like "LeCun's" or "$21.6M" switched fonts mid-word;
- they only draw capitals.

The public pages now use Barlow Condensed, an SIL Open Font License face with the same condensed, soft-cornered look, set in capitals. Long-form text is Source Serif 4, and interface text stays in the system sans stack. Both web fonts load through `next/font`, so they're self-hosted with no layout shift. `/gphl`, `/playoffhockey`, `/workouts` and the playground demos still use Winner Sans: I didn't touch them, but they have the same licence question.

**Homepage.** Four sections replace six:
- a short intro saying who Randy is and what he writes about, with the photo, "Read the writing" and "Email me";
- "Selected writing": four posts across topics;
- "What I write about": the five topic hubs plus research notes;
- "Get in touch": email, LinkedIn, and the resume on request.

The positioning ("AI strategy and product leadership") and every personal detail come from what the site already said. The longer material moved to a new `/about` page:
- the six philosophy principles, condensed to four ("How I work");
- the capabilities list, condensed to six lines ("What I help with");
- contact.

**Reading layout:**
- one column of about 68 characters, in an 18 to 19px serif at 1.7 line height;
- condensed-caps H2s, sentence-case H3s, and tables that scroll inside their own box on phones;
- posts over 1,500 words with four or more sections get an "On this page" list: a sticky sidebar on wide screens, a collapsible box on smaller ones;
- a blockquote starting "Updated ..." renders as a dated update note;
- each post footer has previous/next within its topic, three related posts, "Linked from" backlinks, cited research notes and a short author box.

**Accessibility:**
- skip link and proper landmarks (header, nav, main, footer);
- visible focus outlines and `aria-current` on the active nav item;
- `lang="en-CA"`, alt text on the portrait, reduced-motion support;
- no content hidden behind JavaScript.

Contrast is at least 4.5:1 for text. Body text is about 14:1 and muted text about 7:1; links are about 5.9:1 in light mode and about 7.9:1 in dark mode.

**Dark mode:** the public pages follow the system setting through CSS variables (`paper`, `ink`, `muted`, `accent`, `night` in `tailwind.config.ts` and `app/globals.css`). The out-of-scope routes don't use these tokens and look exactly as before.

**Performance and sharing:**
- public pages are static and ship about 100 kB of first-load JavaScript, with no framer-motion;
- canonical URLs, `sitemap.xml` (public pages only), `robots.txt` and an RSS feed at `/feed.xml`;
- `BlogPosting` structured data on posts;
- one social card, `public/og.png`, rendered from HTML with the site's fonts.

I tried per-post cards with `next/og`, but its Node build fails on Windows, which would have broken `npm run build` on Randy's machine.

## Information architecture, navigation and link map

**Navigation:**
- the header has Writing, Research and About;
- the footer adds Topics, Playground, RSS, email and LinkedIn;
- `/gphl`, `/playoffhockey` and `/workouts` aren't linked from the public navigation, on purpose: two of them are noindex and one is private. They're easy to add if Randy wants them.

**URLs:**

| URL | What it is |
|---|---|
| `/` | Home |
| `/blog` | Writing index: a "Start here" path of five posts, then every post grouped by topic, then a pointer to research notes |
| `/blog/topics` | The five topic hubs |
| `/blog/topics/<topic>` | A hub: an intro that explains how the posts fit together (with links in context), the posts in reading order, and the other topics |
| `/blog/<slug>` | Posts (unchanged URLs) |
| `/research`, `/research/<slug>` | Research notes, grouped by plain-language theme with a maturity label (In wide use, Published result, Early research), and the papers listed from front matter |
| `/about` | Bio, how I work, what I help with, contact |
| `/playground` | Restyled index. The demos and their sign-in are untouched |
| `/feed.xml`, `/sitemap.xml`, `/robots.txt` | Generated from the content |

**Topic hubs and reading order** (defined in `lib/topics.ts`):

1. **Experimentation and adoption:** why AI pilots stall → an AI budget for every employee → safe early access (sandboxing) → shadow AI → why teams rebuild what already exists.
2. **Leadership and governance:** push decisions closer to the work → governance without the theatre → reward the idea, not the rank → reskilling happens on the job → when AI frees up time, redesign the job → measuring AI when ROI doesn't fit.
3. **Data and knowledge:** metadata → (cross-listed) duplicated solutions → data architecture for agents in wealth management → AI readiness on the Microsoft stack.
4. **Vendors and platforms:** a SaaS lock-in series in three parts (why your data is hard to move → a playbook for vendors → the EU Data Act) → Copilot → multi-provider AI → build versus buy.
5. **Agents and tools:** MCP in plain English → the orchestration gap → Claude Code → synthetic cognitive capitalism.

**"Start here" path** (on `/blog`), which is the core argument in order: pilots stall → AI budget → sandbox → shared record of solutions → measuring value.

**How the link map works now:**
- **In-text links:** every post has two to four links to related posts, placed where they help. Research notes link to each other and to posts where it fits.
- **Hubs:** the hub intros give a narrative map of each topic. Every post is on at least one hub, and `npm run check:content` fails if a post's topic doesn't exist.
- **Related posts** are scored from real connections: posts this post links to (+3), posts that link to it (+2), curated `related` entries in front matter (+4), and posts in the same topic (+1). A post shows those that score, in topic order.
- **Backlinks** ("Linked from") list the posts that link to this one and aren't already shown as related.
- **Within a topic,** previous and next follow the reading order.

## Every post, and what happened to it

All 24 remaining posts keep `published: 2025-11` and now carry `updated: 2026-09`, because every one was revised. Per-post details are in `review/changelogs/<slug>.md` (research notes: `research-<slug>.md`). Each change log lists:
- claims kept, with their sources;
- claims corrected, from what to what;
- claims cut or softened;
- update notes;
- links added;
- questions for Randy.

### Blog posts

| Slug | Original title | Words before | New title | Words after | Outcome | Topic |
|---|---|---|---|---|---|---|
| agentic-ai-interoperability | Agentic AI Interoperability: Why 87% Say Integration Is Crucial But Nobody's Solving It | 2,168 | The orchestration gap that MCP doesn't close | 1,235 | Rewritten, facts updated | agents-and-tools |
| agentic-ai-wealth-data-architecture | Architecting Data for Agentic AI in Private Wealth Management | 2,786 | Data architecture for AI agents in wealth management | 1,466 | Rewritten, facts corrected | data-and-knowledge |
| ai-budget-democratizing-innovation | The AI Budget: Democratizing Innovation Through Trust | 2,978 | An AI budget for every employee | 919 | Rewritten, facts corrected | experimentation |
| ai-governance-without-theater | AI Governance Without Theater: How to Ship Code at Night and Write Policy by Day | 2,377 | AI governance without the theatre | 1,374 | Rewritten, regulation updated to Sept 2026 | leadership |
| beyond-roi-measuring-ai-value | Beyond ROI: Why 49% Can't Measure AI Value (And What Metric to Use Instead) | 3,200 | Measuring AI when ROI doesn't fit | 989 | Rewritten, absorbs finance-tech-divide | leadership |
| build-vs-buy-agentic-ai | The $1.5 Million Question: A Practitioner's Framework for Build vs Buy in the Agentic AI Era | 3,461 | When a custom AI agent is worth building | 1,591 | Rewritten, absorbs custom-chat-interfaces, facts updated | vendors-and-platforms |
| claude-code-agentic-tool | Claude Code: The Agentic Tool Everyone Is Sleeping On | 3,251 | Claude Code does more than write code | 1,383 | Rewritten, facts updated | agents-and-tools |
| cloud-provider-diversification | Multi-Cloud in the AI Era: Strategic Hedging or Complexity Trap? | 2,872 | When multi-provider AI is worth the premium | 1,392 | Rewritten, absorbs multi-cloud-ai-strategy-2025, premise updated | vendors-and-platforms |
| cognitive-enterprise-microsoft-roadmap | The Cognitive Enterprise: A Strategic Roadmap for AI Readiness in the Microsoft Ecosystem | 3,305 | AI readiness on the Microsoft stack, without a migration | 1,339 | Rewritten, product facts corrected | data-and-knowledge |
| compensation-ai-era | Compensation in the AI Era: Rewarding Innovation at Every Level | 2,162 | Reward the idea, not the rank | 951 | Rewritten | leadership |
| copilot-microsoft-play | Understanding Copilot: Microsoft's Play and What It Means | 2,110 | What Microsoft is really selling with Copilot | 1,436 | Rewritten, substantially updated | vendors-and-platforms |
| data-portability-eu-data-act | The Data Portability Gambit: How the EU Data Act Rewrites SaaS Vendor Strategy (And What It Means for Your Tech Stack) | 3,440 | What the EU Data Act means for SaaS and cloud contracts | 1,076 | Rewritten, legal facts corrected | vendors-and-platforms |
| distributed-ai-leadership | Distributed AI Leadership: Why Top-Down Strategies Fail and How to Scale Decision-Making | 2,086 | Push AI decisions closer to the work | 1,010 | Rewritten | leadership |
| duplicated-solution-problem | The Duplicated Solution Problem: Centralizing Decentralized Innovation | 3,100 | Why teams rebuild what already exists | 1,187 | Rewritten, absorbs knowledge-tax | experimentation |
| human-ai-collaboration-design | Human-AI Collaboration Design: Redesigning Roles for 20% Workforce Overcapacity | 2,236 | When AI frees up time, redesign the job | 1,078 | Rewritten | leadership |
| metadata-matters | Metadata Matters: The Overlooked Foundation of Knowledge Systems | 2,117 | Metadata is what makes knowledge findable | 1,284 | Rewritten, absorbs data-storage-reality | data-and-knowledge |
| model-context-protocols | Model Context Protocols: The Connectors That Enable Everything | 3,183 | The Model Context Protocol in plain English | 1,614 | Rewritten, substantially updated | agents-and-tools |
| pilot-purgatory-ai-projects | Pilot Purgatory: Why 90% of AI Projects Never Scale (And the 3 Systems That Break the Cycle) | 2,380 | Why AI pilots stall, and what to build instead | 861 | Rewritten as the short overview | experimentation |
| reskilling-at-scale-ai-era | Reskilling at Scale: How to Prepare 40% of Your Workforce for AI Without Burning $50M on Training Theater | 2,769 | Reskilling for AI happens on the job | 1,400 | Rewritten, absorbs prompt-engineering-skills-gap | leadership |
| saas-evolution-ai-era | The SAAS Reckoning: Evolution in the AI Era | 2,963 | A playbook for SaaS vendors in the agent era | 1,042 | Rewritten, facts updated | vendors-and-platforms |
| sandboxing-safe-early-access | Sandboxing: Safe Early Access to AI Tools | 2,232 | Safe early access to new AI tools | 973 | Rewritten | experimentation |
| shadow-ai-organizational-intelligence | Shadow AI to Organizational Intelligence: How to Turn Your Biggest Risk Into Your Competitive Advantage | 2,483 | Shadow AI and the approved tools nobody uses | 1,289 | Rewritten, absorbs resistance-to-adoption | experimentation |
| siloed-information-saas-moat | Siloed Information: How SAAS Companies Protect Their Moat | 2,843 | Why your SaaS data is so hard to move | 1,238 | Rewritten, facts corrected | vendors-and-platforms |
| synthetic-cognitive-capitalism | From Local Optima to Synthetic Cognitive Capitalism: How AI Is Quietly Rewriting Economic Power | 1,995 | Synthetic cognitive capitalism | 1,587 | Rewritten, labelled speculative | agents-and-tools |
| custom-chat-interfaces | Custom Chat Interfaces: A Terrible Decision? | 2,679 | (merged) | | Merged into build-vs-buy-agentic-ai | |
| data-storage-reality | The Data Storage Reality: Adapt or Become Uncompetitive | 2,043 | (merged) | | Merged into metadata-matters | |
| finance-tech-divide-ai-investment | Bridging the Finance-Tech Divide: Why CFOs (56%) and CIOs (70%) Can't Agree on AI, And What It Costs You | 2,067 | (merged) | | Merged into beyond-roi-measuring-ai-value | |
| knowledge-tax-ai-amplification | The Knowledge Tax: Why Fortune 500s Waste $21.6M Per 1,000 Employees (And How AI Makes It Worse Before Better) | 2,078 | (merged) | | Merged into duplicated-solution-problem | |
| multi-cloud-ai-strategy-2025 | Multi-Cloud AI Strategy 2025: The Optionality You're Paying For vs The Complexity You're Getting | 4,056 | (merged) | | Merged into cloud-provider-diversification | |
| prompt-engineering-skills-gap | The Prompt Engineering Skills Gap: Building Agentic Workflow Design Capabilities In-House | 2,398 | (merged) | | Merged into reskilling-at-scale-ai-era | |
| resistance-to-adoption-ai-change | From Resistance to Adoption: The Self-Determination Theory Playbook for AI Change Management | 2,297 | (merged) | | Merged into shadow-ai-organizational-intelligence | |
| model-rankings | Model Rankings: A Subjective Journey Through AI Capabilities | 1,134 | (retired) | | An unfinished template that was publicly reachable. Moved to `blogs/drafts/` so Randy can still fill it in | |

Why merge rather than keep:
- Each merged pair repeated the same framework or argument, often word for word.
- Examples:
  - custom-chat-interfaces and build-vs-buy shared the same four reasons to build and the same decision steps.
  - The two multi-cloud posts shared their statistics and recommendations.
  - finance-tech-divide repeated beyond-roi's metric examples almost verbatim.
- The merged posts kept each original's unique ideas. The change logs list what was carried over.

### Research notes

| Slug | Original title | New title | Theme / status | Outcome |
|---|---|---|---|---|
| 4bit-quantization | 4-Bit Quantization: Frontier AI Fits in Your Pocket | Running large models in 4 bits | cheaper-models / in wide use | Rewritten; "70B fits a consumer GPU" corrected; native low-precision training added |
| calm | CALM: A Different Way to Think | CALM and predicting several tokens at once | new-architectures / early research | Rewritten |
| deepseek-r1 | DeepSeek-R1: The $5M Model That Broke OpenAI's Moat | What DeepSeek V3 and R1 actually showed | cheaper-models / in wide use | Rewritten, absorbs deepseek-v3; cost story corrected |
| deepseek-v3 | DeepSeek-V3: Breaking the Compute Oligopoly | (merged) | | Merged into deepseek-r1 |
| dreamgym | DreamGym: When Robots Learn to Dream | Training agents in an imagined environment | learning-from-experience / early research | Rewritten from the paper (it isn't about robots), with an update note |
| early-experience | Agent Learning via Early Experience: Bootstrapping Intelligence | Training agents on their own early experience | learning-from-experience / published result | Rewritten |
| llm-jepa | LLM-JEPA: Yann LeCun's Bet on Efficiency | LLM-JEPA and LeCun's bet on predicting meaning | new-architectures / early research | Rewritten; affiliations and claims corrected; AMI Labs added |
| multimodal-world-models | Bridging Vision and Physics: The Missing Piece for Robots | Robot foundation models and where they stand | physical-world / published result | Rewritten from scratch |
| nested-learning | Nested Learning: Teaching AI to Remember | Nested Learning and models that keep learning | new-architectures / early research | Rewritten; authors, link and venue corrected |
| s1-test-time-scaling | s1: Frontier AI for $50 | The s1 recipe for making models think longer | cheaper-models / published result | Rewritten |
| synthetic-data | Synthetic Data: AI That Trains Itself | Training models on synthetic data | learning-from-experience / in wide use | Rewritten; "synthetic data is anonymous" corrected |

### Redirects (permanent, in `next.config.js`)

| Old URL | New URL |
|---|---|
| /blog/finance-tech-divide-ai-investment | /blog/beyond-roi-measuring-ai-value |
| /blog/custom-chat-interfaces | /blog/build-vs-buy-agentic-ai |
| /blog/multi-cloud-ai-strategy-2025 | /blog/cloud-provider-diversification |
| /blog/knowledge-tax-ai-amplification | /blog/duplicated-solution-problem |
| /blog/resistance-to-adoption-ai-change | /blog/shadow-ai-organizational-intelligence |
| /blog/prompt-engineering-skills-gap | /blog/reskilling-at-scale-ai-era |
| /blog/data-storage-reality | /blog/metadata-matters |
| /blog/model-rankings | /blog |
| /research/deepseek-v3 | /research/deepseek-r1 |

All nine were checked against the production build (`next start`): each returns 308 to the right place. All 24 posts, the hubs, the research notes, `/api/blog`, `/gphl`, `/workouts` and `/playoffhockey/2026/league` return 200.

### The biggest fact changes

These are the corrections most likely to matter to a reader. Sources are in each change log.
- **Garbled statistics.**
  - "49% can't measure AI value" was Gartner's 49% who named estimating and demonstrating value as the top barrier.
  - The "$3.7 / $10.3 ROI" came from a Microsoft-sponsored IDC study of generative AI, not agentic early adopters.
  - "87% cite internal resistance" and "72% vs 39% engagement" have no source anywhere and are gone. The second appeared in four posts with three different attributions.
  - "44% of organizations can't control shadow AI" was 44% of employees (Melbourne/KPMG).
- **Invented or misattributed examples.**
  - BMW's "AI Innovation Spaces" doesn't exist; the post now describes BMW's actual Digital Boost program, with an update note.
  - 3M's "Failure Value" metric doesn't exist; the Post-it story is corrected.
  - DreamGym isn't a robotics paper.
  - NASA's "84% accuracy" was one prediction's confidence score.
- **Law.** The EU Data Act post had wrong article numbers, an invented "4% of turnover" penalty regime and a claim that derived data is covered. The governance post said Colorado's AI Act has a private right of action; it never did, and the law was repealed and replaced in May 2026. EU AI Act dates now reflect the July 2026 AI Omnibus.
- **Things that moved on since November 2025:**
  - MCP moved to the Linux Foundation's Agentic AI Foundation, and there's a new stateless spec.
  - Copilot became multi-model (OpenAI plus Anthropic), with new packaging.
  - Microsoft and OpenAI amended their deal in April 2026, so frontier models now run on several clouds. That undercut the premise of both multi-cloud posts.
  - Claude Code grew from a sleeper into a $2.5B run-rate business.
  - Samsung reversed its 2023 ChatGPT ban in 2026.
  - LeCun left Meta for AMI Labs, which has a Montreal office.
  - DeepSeek's R1 training cost was disclosed in Nature as $294,000 on top of V3.
- **Arithmetic.** The "$1.5M" custom-agent cost charged a full year of salaries for a six-month build. The reskilling post's $10.2M should have been $8.7M. The multi-cloud leverage example netted -5% to 0%, not +5 to 10%, on its own inputs.

## Open questions for Randy

These are the ones only you can answer, most important first. Each change log has more detail.

**About you and the site:**
1. Is "AI Strategy & Product Leader" still how you want to be described? The site title, homepage and About page use it.
2. The About page says "more than a decade across strategy, product, technology and organizational change". The old site said "12+ years". Which is right, and do you want a number?
3. "Governance by day, shipping code at night" appears as "I still write code, which keeps the strategy honest" (home) and "Most of my working days go to AI strategy and governance, and I still write code at night" (governance post). Still true?
4. The "What I help with" list on the About page condenses the old capabilities: AI strategy and governance, product leadership, enterprise transformation, hands-on technical work (including voice interfaces), data and analytics, teaching and mentoring. Anything to drop or add?
5. The site still offers a "full resume on request" and lists randyjones87@gmail.com and LinkedIn. Still right?
6. Do you want a current role or employer on the site? I didn't add one.

**Personal experience in the posts:** these are kept in their simplest form, with no embellishment.
7. The duplicated-solution post opens with "When I moved from Canadian Division knowledge enablement to a global role... I watched the same solution get built three times." The two old posts told conflicting versions of this story (what was built, which regions, $15M), so the specifics were dropped. Is the line OK to publish, and do you want to add the real details? Did you run an idea system with vote thresholds? The old post's "participation dropped 70%" was cut.
8. The sandbox post says "I've watched this play out many times" (it was "dozens"), and the reskilling post says "In the curriculum design and technical training I've done". In what roles? Should either be more specific?
9. VOICE-Relay and Game Card Creator. Two points to check:
   - The orchestration post says VOICE-Relay uses explicit states (INITIATED through COMPLETED), which comes from the old post.
   - The build-vs-buy post describes both demos only as the playground page does.

   Are these accurate, and do you want to say more about what you've built?
10. Anecdotes cut as possibly invented by the original AI draft:
    - "one organization I worked with... 4x" and "one organization I analyzed" (ROI post);
    - the anonymous case studies in the old resistance post;
    - the "three company migrations" (multi-cloud).

    Were any real? They can come back, described anonymously.
11. Have you used Copilot, Claude Code or MCP servers yourself, or evaluated a provider switch? A first-hand line would strengthen those posts. I didn't invent any.
12. The Microsoft roadmap post originally read like an internal client memo. Was it adapted from client or employer work? Check confidentiality.
13. What is the wealth-management post's domain detail based on, and which jurisdiction do you want it to use? The original mixed the Canadian SIN with US IRAs; the rewrite uses neutral terms.

**Positions I softened or reframed:**

14. The compensation post keeps your "partner gets $50,000, junior analyst gets $1,000" framing. Comfortable with it, given it reads like professional services?
15. Your numbers kept as rules of thumb:
    - $50 to $150 per person per month for the AI budget;
    - 70 to 85% budget use;
    - a 2 to 5% share of verified savings;
    - "more than six months of spend means locked in";
    - build if it costs less than two to three times the bought option.

    Still your numbers?
16. Is "synthetic cognitive capitalism" your coinage? The post now opens by saying it's the most speculative post on the site, owns the correction on "consensus", and raises consent and ownership questions about training systems on employees' work. OK?
17. "Endpoint as a service" and "performative integrations" are kept as your terms. OK?
18. Things you might miss:
    - the China/ByteDance section (unverifiable);
    - the Gartner predictions about agentic AI by 2028 (probably accurate, but Gartner blocks automated checking, so they could be re-added with a link after a manual check);
    - the pricing tables;
    - most of the quoted percentages.

**Which posts matter most?**

19. The homepage features four posts: the pilot overview, the AI budget, "Reward the idea, not the rank" and build versus buy. `/blog` has a five-post "Start here" path. Are those the right picks? Both lists are in `lib/topics.ts`.
20. The Copilot post has a dated pricing table, which will age. Keep it, or replace it with a link to Microsoft's pricing page?
21. The model-rankings template is in `blogs/drafts/`. Do you want to write it, or delete it?

## Known issues and things I chose not to do

- **`npm run lint` fails in this worktree only.**
  - The cause: the worktree sits inside `C:\VSCode\portfolio-site`, so ESLint also loads the main checkout's `.eslintrc.json` and reports a plugin conflict.
  - The equivalent command, `npx eslint --no-eslintrc -c .eslintrc.json --ext .js,.jsx,.ts,.tsx app components lib`, passes with 0 errors. The only warnings are two pre-existing ones in `app/playoffhockey`.
  - In a normal checkout `npm run lint` should behave as before. I didn't add `root: true` to `.eslintrc.json` to work around it.
- **`npm run build` passes** (58 static pages). It prints the same ESLint conflict line (non-fatal here) and pre-existing browserslist/baseline-browser-mapping staleness warnings.
- **Landmarks on out-of-scope pages.** The root layout used to wrap every page in `<main>`. That wrapper moved into the public site's layout, so the header and footer sit outside `main`, and the demos' own `<main>` is no longer nested. As a side effect:
  - `/gphl`, `/gphl/draft`, `/workouts` and the demo sign-in screen no longer have a `main` landmark. They look exactly the same.
  - Wrapping each page's outer `<div>` in `<main>` would fix it. I left those files alone because they're out of scope.
- **Out-of-scope routes share the root metadata description,** which is now the new site description. Titles are unchanged.
- **Social cards.** There's one static card for all public pages, because `next/og` fails to build on Windows (an invalid font URL inside `@vercel/og`). If builds only ever run on Vercel, per-post cards are a small follow-up.
- **Verification limits.**
  - The session's web-search budget ran out partway through fact-checking. After that, claims were checked by fetching primary pages directly. Anything that couldn't be confirmed was cut or softened.
  - A few primary sources block automated fetching: Gartner, EUR-Lex (the Data Act articles are linked through a text mirror plus the official EUR-Lex link), and some vendor pages. Where a post relies on one of them, the change log says so.
  - Two claims rest on well-known facts confirmed only through secondary pages: Sutskever's and Llion Jones's company affiliations.
- **Pre-existing, out of scope and not changed:** the playground demos check a hard-coded demo username and password in client-side code (`app/playground/*/page.tsx`). That's a gate, not real authentication.
- **Dates are month precision** (`2025-11`). The original posts only recorded the month.
- **Not done, deliberately:**
  - no new dependencies beyond declaring `github-slugger`, which was already installed through `rehype-slug`;
  - no analytics or newsletter;
  - no invented bio, role or anecdotes;
  - I didn't write your model rankings.

## Files worth knowing about

| Path | What it holds |
|---|---|
| `lib/topics.ts` | Topics, reading orders, hub intros, "Start here" and homepage picks |
| `lib/blog.ts`, `lib/research.ts` | Front matter parsing (with a fallback for the old format), related posts, backlinks, themes |
| `lib/frontmatter.ts` | Lenient YAML parsing, so one malformed file can't take the site down (the checker still flags it) |
| `tools/check-content.mjs` (`npm run check:content`) | The content checks |
| `components/site/` | The shell, post list, prose renderer, contents list and author box |
| `app/(site)/` | Public pages |
| `app/playground/page.tsx` | Restyled playground index |
| `app/not-found.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/feed.xml/route.ts` | 404, sitemap, robots and feed |
| `next.config.js` | Redirects |
| `review/` | Screenshots and per-post change logs |
