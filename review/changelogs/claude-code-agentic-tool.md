# claude-code-agentic-tool: change log

**What happened:** Rewritten for September 2026 under a new title, "Claude Code does more than write code" (slug unchanged; nine posts link to it). Kept Randy's view: it's an agent that works on files and tools, useful beyond coding. Replaced the 2025 comparisons with a dated, verified table of Claude Code, GitHub Copilot, Cursor and OpenAI Codex. Removed Quick Navigation, Back to top links, Bottom Line, TLDR, Related Posts and footer.

**Word count:** 3,251 before (wc); 1,427 after (wc incl. front matter), 1,382 by the checker.

## Claims kept (with sources)
- Anthropic legal team's "phone tree" prototypes; growth marketing's "hundreds of new ads in minutes": https://claude.com/blog/how-anthropic-teams-use-claude-code
- Data scientists with "very little JavaScript and Typescript" built a 5,000-line TypeScript app: https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf
- Weekly limits and 5-hour windows (now described from the current pricing page): https://claude.com/pricing
- Sept 2025 postmortem, ~30% of Claude Code users hit a misrouted message: https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues
- Rewind with Esc twice or /rewind: https://code.claude.com/docs/en/checkpointing
- Randy's ideas: the assist-vs-act distinction and iteration loop, beyond-coding tasks, "expands who can do technical work for non-critical tasks", the limitations list, the rollout steps and the bad/good task-description example, composable/Unix-style use.

## Claims corrected (old -> new, source)
- "Everyone is sleeping on it" -> $1B run-rate ~6 months after public availability (Dec 2025) and >$2.5B by Feb 2026, enterprise over half: https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone , https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation
- Copilot as autocomplete with "no autonomous execution", $10/month -> Copilot's coding agent was GA on Sept 25, 2025; current plans include agent mode and CLI on every tier, a cloud agent from Pro, third-party agents including Claude on Pro+ and Max: https://github.blog/changelog/2025-09-25-copilot-coding-agent-is-now-generally-available/ , https://github.com/features/copilot/plans
- "$20/month for unlimited daily use" -> not unlimited; Pro $20 ($17 annual), Max $100/$200, Team seats, Enterprise $20/seat + API-rate usage: https://claude.com/pricing , https://support.claude.com/en/articles/11049741-what-is-the-max-plan
- Cursor "$60 in usage", "quietly downgrades", model list incl. DeepSeek -> current plans and model providers: https://cursor.com/pricing , https://cursor.com/docs/models
- Codex (not in the original): included in every ChatGPT plan, shares usage with ChatGPT: https://learn.chatgpt.com/docs/pricing
- "Anthropic's data science team... Metaflow, 1-2 days per model" -> a Ramp staff engineer's testimonial: https://claude.com/product/claude-code
- "Ad variations in seconds" -> "hundreds of new ads in minutes".
- Closing "as one developer put it" quote -> cut (it's Anthropic's own blog line).
- "Beta" IDE extensions -> only the JetBrains plugin is still labelled beta; other surfaces listed from https://code.claude.com/docs/en/overview

## Claims cut or softened (why)
- 20-40% and 5-10x productivity, "10-person team like 12-15", Python 2 to 3 "hours to a day": unsourced; replaced by METR's RCT (19% slower, believed 20% faster) with the caveat that tools have improved: https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- "115,000 developers / 195 million lines" and "$130M annualized July 2025": an investor's estimate, not Anthropic.
- Financial-services Java modernization (40% debt reduction, 25% performance), the "learned more about advanced Python" testimonial, "senior developers at Fortune 500 companies", "developers rarely go back", the two unattributed Copilot/Cursor quotes, Cursor's "5 days" tester: unverified.
- Sonnet 4.5's 77.2% SWE-bench and the "200,000 token context (larger than competitors)" point: outdated and no longer a differentiator.
- "Search code (treesitter and ripgrep)", Zapier "8,000+ apps", "automatic diagnostic sharing": dropped rather than corrected (detail the rewrite doesn't need).
- Usage-limit prompt counts (10-40, 50-200, 200-800): no longer published by Anthropic.
- "Users canceled subscriptions en masse": unsupported.

## Update notes added
None; the post is rewritten around the current state, with "as of September 2026" on the product facts and comparison table.

## Internal links added
/blog/model-context-protocols, /blog/sandboxing-safe-early-access, /blog/ai-budget-democratizing-innovation.

## Questions for Randy
- The test-coverage point is now phrased as something to measure ("I only have anecdotes for that, not data"). Whose anecdotes are they: your own teams'?
- The original said "This is from senior developers at Fortune 500 companies using Claude Code for actual onboarding." Cut. Is there a real source you can name?
- Do you use Claude Code yourself, and on which surfaces? A line of first-hand use would help, but I didn't add any.
- "The difference I'd still point to is fit... Cursor wants to be your editor" keeps your original characterization. Still your view?
- The new title drops "Everyone Is Sleeping On". OK with "Claude Code does more than write code"?

## Checker
tools/check-content.mjs (current version): no errors or warnings for this file.
