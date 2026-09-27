---
title: Why AI pilots stall, and what to build instead
description: Most AI pilots stall for organizational reasons. A budget, a sandbox and a shared record of what works do more than another round of pilots.
topic: experimentation
published: 2025-11
updated: 2026-09
---

"Pilot purgatory" is the name for a familiar pattern: the proof of concept works, the demo goes well, and then nothing happens. The numbers vary with who is counting and what they count, but they point the same way. When IDC tracked AI proofs of concept with Lenovo, it found that [for every 33 a company launched, only four reached production](https://www.cio.com/article/3850763/88-of-ai-pilots-fail-to-reach-production-but-thats-not-all-on-it.html). In S&P Global Market Intelligence's 2025 survey, the share of companies that had [abandoned most of their AI initiatives](https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/) rose to 42%, from 17% a year earlier. MIT's Project NANDA, working from 52 interviews, 153 survey responses and a review of 300 public initiatives, reported that [only 5% of custom enterprise AI tools reached production](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf), and its authors describe the figures as directionally accurate, based on interviews rather than company reporting.

In most of these cases I think the technology works. The pilots stall because of how organizations run them.

## Four ways pilots stall

The first is speed. A typical enterprise path runs through security review, procurement, pilot planning, the pilot itself, an evaluation and a rollout plan. Each step is reasonable. Stacked together they can take the better part of a year, and by then the tool has changed, the team has moved on or the problem looks different. A [sandbox](/blog/sandboxing-safe-early-access) is how I'd shorten that.

The second is knowledge that stays where it was made. When a pilot succeeds in one department, the lesson rarely travels. Sales solves a problem marketing also has, operations automates something finance wanted, and a year later someone runs the same pilot again from scratch. That is the [duplicated solution problem](/blog/duplicated-solution-problem), and it gets worse as AI makes building cheaper.

The third is missing participation. Pilots designed by a central team or outside consultants can succeed technically and still fail organizationally, because the people expected to use the tool had no say in it, don't trust it and can't see how it fits their day.

The fourth is incentives. Departments get credit for launching pilots. Scaling a tool from one team to fifty takes cross-functional work that usually belongs to nobody, and work that belongs to nobody doesn't get done. That's one reason I think organizations should [reward good ideas wherever they come from](/blog/compensation-ai-era), including the unglamorous work of spreading them.

## Projects end, systems compound

Most pilots are projects: a start date, an end date, a scope and a team. When the project ends, the team disbands and what it learned goes into a final report. The next pilot starts from zero. I think of this as organizational amnesia, and I doubt better project management fixes it.

The alternative is closer to how a venture investor thinks. Instead of trying to predict which few pilots will succeed and funding only those, you fund many small experiments cheaply, watch what works and scale it. Most experiments will fail, and that's expected. What matters is that the ones that work get found, and the failures leave behind something the next person can use. Run an experiment once and scale it five times, rather than running the same pilot five times.

## Three systems that work together

That takes three pieces of infrastructure, each of which I've written about separately.

An [AI budget](/blog/ai-budget-democratizing-innovation) gives every employee a small monthly amount to spend on AI tools, without approval for each experiment. It moves experimentation to the people who know where the time goes.

A sandbox makes that spending safe: approved tools, data classification enforced by the infrastructure rather than by good intentions, a log of what was used, and a fast path to production when something works.

A shared register captures the results: a lightweight place to submit what worked, find what others have built and see what's being reused. Without it, the budget and the sandbox produce a lot of private learning and very little organizational learning.

The pieces depend on each other. A budget without a sandbox is a security risk. A sandbox without a budget sits unused. Both without a register produce the same pilot five times.

There is some outside support for this direction. The NANDA report found that organizations getting results "decentralize implementation authority but retain accountability" and source AI initiatives "from frontline managers, not central labs". BCG's 2024 research found that companies getting value from AI put about [10% of their resources into algorithms, 20% into technology and data, and 70% into people and processes](https://www.bcg.com/press/24october2024-ai-adoption-in-2024-74-of-companies-struggle-to-achieve-and-scale-value). Neither study tested the combination I'm describing, so that part is my argument rather than their finding.

The picture may also be improving on its own. In Deloitte's State of AI in the Enterprise 2026 survey, the number of companies with at least 40% of their AI projects in production was [expected to double within six months](https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-generative-ai-in-enterprise.html). If that holds, pilot purgatory will look less like a permanent condition and more like a stage that organizations pass through at different speeds.

If you have pilots running now, ask two things of each one: who will own scaling it if it works, and where will what it taught you be written down? If neither has an answer, I'd fix that before starting the next pilot.
