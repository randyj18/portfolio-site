---
title: Push AI decisions closer to the work
description: Routing every AI decision through a central team creates a queue. The centre should set guardrails and build platforms, and teams should decide.
topic: leadership
published: 2025-11
updated: 2026-09
---

Hiring a Chief AI Officer gives an organization someone accountable for AI. It can also create a queue. If every AI decision has to pass through one person or one central team, decisions wait, and they get made by people a long way from the problem.

The failure mode looks something like this. The CAIO spends their days in executive meetings, reviewing proposals from business units they don't know well and writing frameworks that don't match how the work gets done. Meanwhile an engineering team has quietly built AI workflows that solve real problems, customer success has automated its routing, and a finance analyst has built a forecasting model that beats the one the central team commissioned. The more AI decisions get centralized, the less of what people know actually shapes them.

## Where centralization breaks

The first problem is distance. By the time a frontline problem has travelled up the hierarchy, been turned into requirements, queued for a central team, built and sent back, the original problem has often changed, or the team has built a spreadsheet workaround. A support team that spots a pattern in its tickets can often test a fix in weeks. Routed through the centre, the same idea competes for roadmap space and gets specified by someone who has never read the tickets.

The second is the approval bottleneck. A central reviewer looking at ten proposals from ten business units can't know which customer model will actually improve retention, or which supply chain change accounts for real-world constraints. Proposals end up ranked by who asked first, who has a sponsor and whose project fits this quarter's story.

The third is what I think of as an innovation tax. Every experiment needs a business case, every business case needs a projected return, and every projection rests on assumptions about exactly what the experiment was meant to find out. The process ends up funding only large, defensible projects, which is the wrong portfolio for a technology this new.

The predictable result is [shadow AI](/blog/shadow-ai-organizational-intelligence). Teams stop submitting ideas and use whatever tools they can get. MIT's Project NANDA found that only 40% of the companies it studied had bought an official LLM subscription, while workers at more than 90% of them [used personal AI tools for work](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf). I read that less as a compliance failure than as a sign that the organization's design is out of step with how value gets created.

## What the evidence says so far

The same NANDA research, based on 52 organizational interviews and 153 survey responses, found that the organizations getting results "decentralize implementation authority but retain accountability", and that the most successful buyers "sourced AI initiatives from frontline managers, not central labs". Top-performing mid-sized companies took about 90 days to go from pilot to full implementation; large enterprises took nine months or more. The authors describe their figures as directionally accurate, based on interviews rather than company reporting, and I'd treat them that way. Still, the early evidence points the same way as the argument.

## What stays central and what moves out

The principle is local autonomy within boundaries the centre defines. What stays central:

- Risk thresholds: what counts as high-risk AI use, such as customer-facing decisions, automated actions above a set dollar amount, or processing sensitive data. High-risk cases get central review. Low-risk experiments don't.
- Architectural standards: approved platforms, API patterns, data access controls and security requirements. Teams can build within them without asking, and deviations get reviewed.
- Vendor evaluation, training and audit, so the organization stays coherent.

What moves out to the teams closest to the work:

- Choosing which problems to solve.
- Designing solutions on the approved platforms.
- Running low-risk experiments without approval, as long as they follow the standards.
- Building, deploying and improving within their own domain, and measuring results with shared methods.

The test I'd apply to the whole setup is whether the governed path is also the easiest one. If using approved tools is harder than shadow IT, governance fails. Practical, threshold-based rules of this kind are what I mean by [governance without theatre](/blog/ai-governance-without-theater).

## What the central team does instead

If the central team isn't building every solution or approving every decision, its job changes. It builds the platform that makes the governed path easy: approved model access with cost controls, frameworks for common patterns, deployment with security built in, data access that enforces permissions, and monitoring. It documents patterns and shares them, so that when three teams solve the same problem separately, the solution gets abstracted once and reused. It designs review that scales, with clear thresholds, a fast track for common patterns, self-service risk assessments for standard cases and audits that sample rather than inspect everything. And it builds capability through training and communities of practice.

The central team ends up as a platform team, a standards body, a risk function and a community organizer, rather than a development shop or an approval committee.

If ideas come from the edges, rewards have to reach the edges too. Organizations that keep innovation rewards for senior roles risk losing the junior people with the best ideas, which is why I think it's worth [rewarding ideas regardless of rank](/blog/compensation-ai-era).

## Moving from central to distributed

I'd do it in five steps. Map how AI decisions get made today: who approves projects, allocates budget, chooses tools, assesses risk and measures success, and where decisions wait or context gets lost. Define the risk thresholds explicitly. Build the enabling infrastructure before handing over decisions. Pilot with two or three business units for a quarter, giving them platforms, training, delegated low-risk decisions and an [AI budget](/blog/ai-budget-democratizing-innovation), and measure both what they build and how decisions flow. Then expand what worked.

This takes quarters rather than weeks, because you're changing who is trusted to decide.

A Chief AI Officer is still useful in this model. The job I'd give them is building the platform and the guardrails, and I'd judge them partly by how many decisions they no longer have to make.
