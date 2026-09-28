# build-vs-buy-agentic-ai: change log

## What happened
Rewritten and merged. Absorbs custom-chat-interfaces (the lead handles the redirect).
- Old title: "The $1.5 Million Question: A Practitioner's Framework for Build vs Buy in the Agentic AI Era"
- New title: "When a custom AI agent is worth building"
- Topic: vendors-and-platforms.

What carried over from custom-chat-interfaces:
- the "solved problems" list
- the bad reasons for building (control, branding, distrust, integration)
- the "custom interface with approved models vs no AI at all" framing
- the point that a custom UI doesn't stop personal-account use
- the Samsung example and the build-to-learn reason

Word count: before 3,461 (build-vs-buy) + 2,679 (custom-chat), both measured with `wc -w` on the original files. After: 1,591 (checker count).

## Claims kept (with sources)
- Anthropic Enterprise plan features: audit logs, custom retention, customer-managed keys, US-only inference, HIPAA-ready option with BAA. [Claude help centre](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan)
- Samsung restricted gen-AI tools after staff leaked data to ChatGPT, and was building in-house tools (May 2023). [TechCrunch](https://techcrunch.com/2023/05/02/samsung-bans-use-of-generative-ai-tools-like-chatgpt-after-april-internal-data-leak/)
- Klarna's assistant is powered by OpenAI and handled two-thirds of customer-service chats in its first month, by Klarna's count (Feb 2024). [Klarna](https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/)
- Microsoft 365 Copilot costs $30/user/month on top of a qualifying licence. [Microsoft](https://www.microsoft.com/en-us/microsoft-365-copilot/enterprise)
- Randy's tests, kept as his opinion: 2 pages vs 20 pages; "can a vendor sign it"; "application that happens to use AI vs chat window with our logo"; the 2x/3x cost rule of thumb; the pilot-first playbook; the capability check; exit strategy.

## Claims corrected (old -> new)
- "Claude for Work $60/user/month" -> Enterprise is $20/seat/month plus usage at API rates. [claude.com/pricing](https://claude.com/pricing)
- "No vendor offers on-prem/air-gapped" -> Gemini has been generally available on air-gapped Google Distributed Cloud since Aug 2025. [Google Cloud](https://cloud.google.com/blog/topics/hybrid-cloud/gemini-is-now-available-anywhere)
- "GitHub Copilot" as the example of an assistant -> it now includes an autonomous cloud agent. [GitHub docs](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)
- "Klarna's shopping assistant" -> customer-service assistant (as above).

## Added (verified)
Managed-agent middle option, dated September 2026:
- Copilot Studio: $200 per 25,000 credits a month; agents in Copilot Chat included with a Copilot licence. [pricing](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/copilot-studio)
- Agent 365: $15/user, generally available May 2026. [Microsoft](https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/)
- Claude Managed Agents: tokens plus $0.08 per session-hour. [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing)
- Vertex AI is renamed Gemini Enterprise Agent Platform. [Google](https://cloud.google.com/products/gemini-enterprise-agent-platform)

## Cut or softened
- Everything in the "$1.5M" cost model, the "$600K-$1.5M", the "$200-$400 monthly" and the "100x":
  - The model charged full-year salaries for a 4-6 month build and its totals didn't reconcile.
  - Replaced with a method plus one labelled example: 3 engineers x 6 months at an assumed $180K loaded = $270K; 0.5-1 engineer after = $90K-$180K a year.
- ChatGPT Enterprise $60 and Perplexity prices: not needed, and OpenAI's pages couldn't be opened to confirm.
- "OpenAI raised prices 40% in 2023": no record found.
- Unsourced stats:
  - 15-25% turnover and $50K-$100K per departure
  - 30-50% tech debt
  - the 90/10 and 80-90% splits, "50-60% discover during POC", "90% of value at 30% of cost"
  - "47% / 23% / 5x" example claims
- From custom-chat:
  - frontend-survey stats (2.3x, 10.1% juniors, 75.8%)
  - Slack 97 minutes (Slack's own product claim)
  - Availity, 143K Archive.org chats, LayerX-style 50/77/67%
  - Wall Street bans, Air Canada (couldn't open the decision)
  - "SSO adoption zero", "500M tokens" break-even
  - the full pricing table, Rufus
- Jasper and "Microsoft built GitHub Copilot" examples: dropped.

## Update notes
None. The body is written for September 2026, and the managed-platform section is dated "As of September 2026".

## Internal links
- /blog/model-context-protocols
- /blog/sandboxing-safe-early-access
- /blog/agentic-ai-interoperability
- /blog/siloed-information-saas-moat
- /playground (not a post link)

## Checker
`node tools/check-content.mjs`: no errors or warnings for this file.

## Questions for Randy
1. VOICE-Relay and Game Card Creator. I kept them in one modest sentence, using only the playground descriptions: an end-to-end encrypted voice relay between AI agents and users, and an agent workflow that turns card ideas into structured game assets. The original said VOICE-Relay was "a custom agentic system for managing complex voice-based workflows", that an off-the-shelf chatbot "would have delivered 10% of the value", and that Game Card Creator had "visual card previews, iterative refinement controls, and direct export to game engines". Are those accurate? Do you want either story told at more length?
2. The original title called this "A Practitioner's Framework" and said "Based on building custom agentic systems...". Do you want a line on what you've built or evaluated?
3. The 2x/3x rule and the pilot sizes (10-20 people, 2-3 months) are kept as your rules of thumb. Still your view?
