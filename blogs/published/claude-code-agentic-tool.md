---
title: Claude Code does more than write code
description: Claude Code takes a task, works through files and tools, and checks its own results. That loop is useful well beyond programming. Where it stands in September 2026.
topic: agents-and-tools
published: 2025-11
updated: 2026-09
---

The useful distinction in AI coding tools is between suggesting and doing. An autocomplete tool suggests the next line and waits for you. An agent takes a task, plans an approach, reads the files it needs, makes edits across several of them, runs the tests, reads the errors, fixes them and runs the tests again until the job is done. You set the destination and it drives. Claude Code, Anthropic's agent, works this way, and that loop is the point.

When I first wrote about it in November 2025, I called it the agentic tool everyone was sleeping on. Nobody is sleeping on it now. Anthropic says Claude Code [reached $1 billion in run-rate revenue](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone) about six months after it became publicly available, and [passed $2.5 billion by February 2026](https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation), with enterprises accounting for more than half of that. The competition has moved as well, and every major coding tool now works as an agent.

## What it is now

As of September 2026, Anthropic describes Claude Code as ["an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools"](https://code.claude.com/docs/en/overview). It started as a terminal program. It now also runs in VS Code and JetBrains (the JetBrains plugin is still labelled beta), in a desktop app, and in the browser at claude.ai/code, including the Claude mobile apps. You can hand it a bug report in Slack, run it in GitHub Actions or GitLab CI, schedule it to run in the cloud, and build your own agents on the same engine with Anthropic's Agent SDK.

It reaches other systems through the [Model Context Protocol](/blog/model-context-protocols), which is how it can read a design document in Google Drive or update a ticket in Jira.

It comes with Anthropic's paid plans: Pro at $20 a month ($17 billed annually), Max at $100 or $200 a month for five or twenty times Pro's usage, both kinds of Team seat, and Enterprise, which charges $20 a seat plus usage at API rates ([pricing](https://claude.com/pricing), [Max plan](https://support.claude.com/en/articles/11049741-what-is-the-max-plan)). Usage isn't unlimited on any plan. Limits reset on a rolling five-hour window, paid plans add weekly limits, and chat and Claude Code draw on the same allowance. On paid plans you can keep going past the limit at API rates.

## Useful beyond code

The same loop suits any task that involves gathering information from several places, working something out, acting on it and checking the result. A lot of knowledge work looks like that: summarizing a competitor's public pricing pages into a structured comparison with sources, documenting an API and checking that the examples actually run, cleaning a messy dataset and validating the output, or setting up a build pipeline and iterating until it passes.

Anthropic's own write-up of [how its teams use Claude Code](https://claude.com/blog/how-anthropic-teams-use-claude-code) has good examples of people outside engineering doing technical work. The legal team built prototype "phone tree" systems to route colleagues to the right lawyer. Data scientists who knew, [in their words](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf), "very little JavaScript and Typescript" built a 5,000-line TypeScript app to visualize model training results. The growth marketing team generates "hundreds of new ads in minutes" from spreadsheets of past ad performance. These are a vendor's own teams, so read them as best cases. A customer example points the same way: a staff engineer at Ramp says that having Claude Code turn notebook analysis into a production Metaflow pipeline [saves one to two days of routine work per model](https://claude.com/product/claude-code).

None of this replaces developers. It widens who can do technical work, mostly on tasks where a mistake is cheap.

## How it compares, as of September 2026

In November 2025 I contrasted Claude Code with GitHub Copilot as agent versus autocomplete. That was already out of date: [Copilot's autonomous coding agent](https://github.blog/changelog/2025-09-25-copilot-coding-agent-is-now-generally-available/) had become generally available two months earlier. All the main tools are agents now, and the differences are about where the agent runs, which models it uses and how you pay.

| Tool | Where the agent works | What stands out | Entry price |
|---|---|---|---|
| Claude Code | Terminal, VS Code, JetBrains, desktop app, web, Slack, CI | Scriptable; the same engine is available as an SDK | Pro, $20 a month |
| [GitHub Copilot](https://github.com/features/copilot/plans) | Editors, a CLI and GitHub itself | A cloud agent that opens pull requests; Pro+ and Max plans can hand tasks to third-party agents, including Claude | Free tier; Pro $10 a month |
| [Cursor](https://cursor.com/pricing) | Its own editor, plus cloud agents and a CLI | [Many models](https://cursor.com/docs/models), including OpenAI's, Anthropic's, Google's, xAI's and Cursor's own | Free tier; paid from $20 a month |
| [OpenAI Codex](https://learn.chatgpt.com/docs/pricing) | CLI, IDE extension, desktop app, web, GitHub code review | Comes with ChatGPT and shares its usage limits | Included in every ChatGPT plan, from Free |

The difference I'd still point to is fit. Claude Code grew up in the terminal and was built to be composable: you can pipe logs into it or run it in CI without changing how you work. Cursor wants to be your editor. Copilot lives where your code review already happens, and can now run Claude as one of its agents. Codex is already paid for if your company has ChatGPT.

## Where it falls short

It's much better at implementation than invention. Ask it to design a system for a million requests a second and you'll get sensible, familiar patterns rather than a breakthrough, so strategic technical decisions still need experienced people. It works best on clear tasks: "fix the 500 error on checkout" is clear, "make the app feel more responsive" isn't. Deep domain work, like financial models, physics simulations or medical algorithms, still needs domain experts, because it can implement a specification but won't supply the insight behind it. And it can't read organizational politics or unwritten rules.

It has had bad weeks. Anthropic's [postmortem of three infrastructure bugs](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues) in August and September 2025 found that about 30% of Claude Code users who made requests during that period had at least one message routed to the wrong server type, with degraded answers as a result.

I'd also be careful with productivity multipliers, including the ones I used to quote. A careful study points the other way. In [METR's randomized trial](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) in early 2025, experienced open-source developers took 19% longer on real tasks when they used AI tools (mostly Cursor with Claude 3.5 and 3.7 Sonnet), while believing they had been 20% faster. The tools have improved a lot since, so I wouldn't treat that as the last word, but it's a good reason to measure rather than assume.

When a change goes wrong, [rewind](https://code.claude.com/docs/en/checkpointing) (press Esc twice or type /rewind) restores the code, the conversation or both. It doesn't track files changed by shell commands, so it doesn't replace git.

## How I'd roll it out

Start with low-risk work: documentation, tests for code you already understand, simple bug fixes, cleanup. Build trust before you point it at the payment system.

Write specific tasks. "Improve the API" gets you something vague. "Add input validation to all POST endpoints in the user service, including email format checks, password strength rules and protection against SQL injection, with unit tests for each validator" gets you something you can review.

Review what it produces. Check that the tests test the right things, look for security problems, and hold it to your standards. Let it write and let people approve, through the same code review and CI you already use.

Give people a safe place to try it and a little money to do it with: a [sandbox](/blog/sandboxing-safe-early-access) with approved tools and data rules, and a small [AI budget](/blog/ai-budget-democratizing-innovation) for each person.

One side effect worth watching: when tests are part of the task description instead of a separate chore, coverage may well go up. I only have anecdotes for that, not data, so it's something to measure in your own rollout.

The part I'm least sure about is the one this post originally made the most of: how far the loop reaches outside software. The examples so far are real but small, like phone trees, dashboards and ad variations. Whether it holds up for something like a finance team's month-end close is a question I'd want to test before claiming it.
