// Topic hubs for the writing section. Each post's front matter names one topic,
// its home. readingOrder is the suggested path through the hub: it lists the
// topic's own posts and may also cross-list a post from another topic (shown on
// this hub with a "From <topic>" label). Posts in the topic that aren't listed are
// appended after the reading order, newest first.

export interface Topic {
  slug: string;
  name: string;
  /** One line for cards and the blog index. */
  short: string;
  /** A few short paragraphs for the hub page. [text](/path) links allowed. */
  intro: string[];
  readingOrder: string[];
}

export const topics: Topic[] = [
  {
    slug: 'experimentation',
    name: 'Experimentation and adoption',
    short: 'Budgets, sandboxes and shared learning: how people actually start using AI at work.',
    intro: [
      'When AI pilots stall, the reason is usually organizational rather than technical. People can’t get access to tools, trying something new takes months of approvals, and when a team does find something useful, nobody else hears about it.',
      'These posts describe the system I’d put in place instead. Give everyone a small [AI budget](/blog/ai-budget-democratizing-innovation) and a [sandbox](/blog/sandboxing-safe-early-access) where trying new tools is safe and fast. Treat [unapproved AI use](/blog/shadow-ai-organizational-intelligence) as a sign of demand rather than something to stamp out. Keep a shared record so good solutions get [reused instead of rebuilt](/blog/duplicated-solution-problem). The [post on why pilots stall](/blog/pilot-purgatory-ai-projects) is the short version of the whole argument.',
    ],
    readingOrder: [
      'pilot-purgatory-ai-projects',
      'ai-budget-democratizing-innovation',
      'sandboxing-safe-early-access',
      'shadow-ai-organizational-intelligence',
      'duplicated-solution-problem',
    ],
  },
  {
    slug: 'leadership',
    name: 'Leadership and governance',
    short: 'Where decisions sit, how ideas get rewarded, how skills and roles change, and how to tell if it’s working.',
    intro: [
      'Once people are experimenting, the leadership questions start. Who decides what gets scaled? How do good ideas get rewarded when they come from the edges of the organization? How do people build the skills, and what happens to their jobs when the work gets faster? Eventually someone asks whether any of it is paying off.',
      'My bias throughout is to push decisions and learning closer to the work, with a small central team that sets guardrails and builds shared platforms instead of approving everything. Start with [where decisions should sit](/blog/distributed-ai-leadership), then [governance written by people who build things](/blog/ai-governance-without-theater).',
    ],
    readingOrder: [
      'distributed-ai-leadership',
      'ai-governance-without-theater',
      'compensation-ai-era',
      'reskilling-at-scale-ai-era',
      'human-ai-collaboration-design',
      'beyond-roi-measuring-ai-value',
    ],
  },
  {
    slug: 'data-and-knowledge',
    name: 'Data and knowledge',
    short: 'Metadata, content lifecycle and the data plumbing that agents depend on.',
    intro: [
      'AI tools and agents are only as useful as what they can find and trust. In most organizations that means years of documents with no consistent metadata, AI-generated drafts piling up next to the real thing, and data spread across systems that were never meant to talk to each other.',
      'These posts cover the foundations: [metadata and content lifecycle](/blog/metadata-matters), a [data architecture for agents](/blog/agentic-ai-wealth-data-architecture) worked through for wealth management, and the same ideas applied to [a Microsoft-centred organization](/blog/cognitive-enterprise-microsoft-roadmap). The post on [duplicated solutions](/blog/duplicated-solution-problem) is listed here too, because reuse depends on being able to find what already exists.',
    ],
    readingOrder: [
      'metadata-matters',
      'duplicated-solution-problem',
      'agentic-ai-wealth-data-architecture',
      'cognitive-enterprise-microsoft-roadmap',
    ],
  },
  {
    slug: 'vendors-and-platforms',
    name: 'Vendors and platforms',
    short: 'SaaS lock-in, data portability, Microsoft Copilot, multi-cloud and build versus buy.',
    intro: [
      'A lot of AI strategy turns out to be vendor strategy. Your data sits in SaaS products that make it hard to move, the big platforms want to be the layer between your people and every AI model, and every team is tempted to build its own.',
      'The first three posts are a series on SaaS lock-in: [how the moat works](/blog/siloed-information-saas-moat), [what vendors could do instead](/blog/saas-evolution-ai-era) and [what the EU Data Act changes](/blog/data-portability-eu-data-act). The rest are practical calls: what Microsoft is really selling with [Copilot](/blog/copilot-microsoft-play), whether to use [one AI provider or several](/blog/cloud-provider-diversification), and when to [build rather than buy](/blog/build-vs-buy-agentic-ai).',
    ],
    readingOrder: [
      'siloed-information-saas-moat',
      'saas-evolution-ai-era',
      'data-portability-eu-data-act',
      'copilot-microsoft-play',
      'cloud-provider-diversification',
      'build-vs-buy-agentic-ai',
    ],
  },
  {
    slug: 'agents-and-tools',
    name: 'Agents and tools',
    short: 'MCP, orchestration, coding agents, and a longer view of where this is heading.',
    intro: [
      'The more technical posts. [MCP](/blog/model-context-protocols) is the standard that lets AI tools connect to your systems. What it doesn’t cover is [orchestration](/blog/agentic-ai-interoperability): keeping multi-step work coordinated, recoverable and observable once several agents and tools are involved.',
      '[Claude Code](/blog/claude-code-agentic-tool) is my example of an agent that works directly with files and tools, and it’s useful well beyond programming. The last post is the most speculative on the site: a longer view of [how the economics of intelligence might change](/blog/synthetic-cognitive-capitalism).',
    ],
    readingOrder: [
      'model-context-protocols',
      'agentic-ai-interoperability',
      'claude-code-agentic-tool',
      'synthetic-cognitive-capitalism',
    ],
  },
];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

/** The site-wide "start here" path, in order: the core argument in five posts. */
export const startHere: string[] = [
  'pilot-purgatory-ai-projects',
  'ai-budget-democratizing-innovation',
  'sandboxing-safe-early-access',
  'duplicated-solution-problem',
  'beyond-roi-measuring-ai-value',
];

/** Posts featured on the homepage: a spread across topics. */
export const featured: string[] = [
  'pilot-purgatory-ai-projects',
  'ai-budget-democratizing-innovation',
  'compensation-ai-era',
  'build-vs-buy-agentic-ai',
];
