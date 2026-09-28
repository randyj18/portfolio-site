---
title: Shadow AI and the approved tools nobody uses
description: Banning unapproved AI pushes it out of sight. Read it as a map of unmet needs, give people choice and a safe place to practise, and measure depth of use.
topic: experimentation
published: 2025-11
updated: 2026-09
---

Many organizations have two AI problems at once. The tools they bought sit half used, and the tools they never approved spread anyway. The first gets called resistance and the second gets called shadow AI, and they usually land with different people: change management for one, security for the other. I think they are the same problem. People use tools that fit their work and avoid tools that were chosen for them.

The unapproved side is large. In Microsoft and LinkedIn's 2024 survey of 31,000 knowledge workers, [75% used AI at work, and 78% of those users brought their own tools](https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part). A 2025 University of Melbourne and KPMG study of more than 32,000 employees in 47 countries found that [44% had used AI at work in ways that go against their organization's policies](https://theconversation.com/major-survey-finds-most-people-use-ai-regularly-at-work-but-almost-half-admit-to-doing-so-inappropriately-255405), 48% had uploaded sensitive company or customer information into public AI tools, and 61% had avoided revealing when they used AI. Only 34% said their organization had a policy on generative AI at all.

The risk is real. IBM's 2025 breach study found that [a high level of shadow AI added about US$670,000 to the average cost of a breach](https://www.ibm.com/think/x-force/2025-cost-of-a-data-breach-navigating-ai), and 63% of the 600 organizations studied had no AI governance policy. But the usual response, a ban, mostly moves the behaviour somewhere you can't see it.

## Why people skip the approved tools

The resistance side looks different when you ask people. Gallup found that in organizations that had started rolling out AI, the barrier employees named most often was [an unclear use case or value (16%), followed by legal or privacy worries (15%)](https://www.gallup.com/workplace/694682/manager-support-drives-employee-adoption.aspx). Among employees who didn't use AI in their role, the most common reason, given by 44%, was that they didn't think it could help with their work. Only 11% pointed to reluctance to change how they do their job.

That reads to me less like resistance and more like a missing answer to "what is this for, in my job?" A mandate doesn't answer that. A course on how the technology works mostly doesn't either. People answer it themselves when they can try the tools on their own work.

Managers matter a great deal here. In the same Gallup data, employees who strongly agreed that their manager actively supports AI use were 2.1 times as likely to use it a few times a week or more, yet only 28% said their manager did. Microsoft's 2026 survey of 20,000 AI users points the same way: [culture, manager support and talent practices accounted for about twice as much of AI's reported impact as individual effort](https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization).

## What bans and mandates do to motivation

Self-determination theory, developed by Edward Deci and Richard Ryan, is a useful lens. It holds that people engage deeply when three needs are met: autonomy (acting by choice), competence (getting better at something and seeing it work) and relatedness (being connected to the people around them). A [2026 meta-analysis of 192 workplace studies](https://doi.org/10.1002/smi.70151) found the pattern the theory predicts. When leaders support these needs, people are more likely to have them met and to own their motivation, and that goes with more engagement and satisfaction and less burnout and turnover.

A ban or a mandate frustrates all three needs at once. You can't choose your tools, you aren't trusted to use them well, and AI becomes something done to you. AI makes this worse than an ERP rollout would, because its value depends on judgment. You can require people to attend training. You can't require the curiosity that finds a good use.

So I'd design for the three needs directly. Give people bounded choice with an [AI budget](/blog/ai-budget-democratizing-innovation) they can spend on approved tools. Give them a safe place to practise: a [sandbox](/blog/sandboxing-safe-early-access) where the data rules are enforced by the infrastructure rather than by memos, which also tells people you think they can learn this safely. And give peer learning somewhere to happen, because people trust a colleague's discovery more than a corporate announcement.

## Samsung went from a ban to a sanctioned route

Samsung is the best-known ban. In May 2023, a month after internal data leaked into ChatGPT, it [temporarily restricted generative AI on company devices and internal networks](https://techcrunch.com/2023/05/02/samsung-bans-use-of-generative-ai-tools-like-chatgpt-after-april-internal-data-leak/). The company said the restriction would last until it had built a secure environment for using these tools, and it was reported to be developing its own. That was a reasonable response to a real incident, and the statement already pointed at the lasting fix.

Three years later it got there. In May 2026 Samsung said its DX division, which makes phones and home appliances, would [open ChatGPT, Gemini and Claude to employees on the work network from June](https://en.sedaily.com/finance/2026/05/26/samsung-opens-doors-to-chatgpt-gemini-plans-phased-humanoid), alongside its in-house model, Samsung Gauss. It first ran a two-month trial with 2,500 employees across different jobs, and access requires internal security training.

Ban, then a substitute, then governed access: I think that sequence generalizes. A prohibition buys time. It holds only until you have built something people would rather use.

## Treat shadow use as a map of demand

When people bring their own AI, they are telling you which problems your official tools don't solve. I'd start by asking them, anonymously: which tools, for which tasks, with what kind of data. I'd expect the answers to cluster by function (drafting in marketing, first-pass review in legal, code help in engineering), and each cluster is a candidate for an approved route.

Then make the approved route faster than the workaround. I'd sort requests into three tiers:

- Public data and low-risk tools: approved for the sandbox by default.
- Internal data or medium-risk tools: a quick review, with a turnaround of about two days.
- Sensitive data or high-risk uses: a full security review, for specific cases.

The turnaround matters more than the tier design. If a tier-two approval takes three weeks, people will work around it. If it takes 48 hours, most will wait. And when a use proves itself, record it somewhere others can find it, so you don't end up with the same workaround [built separately in five departments](/blog/duplicated-solution-problem).

## What I'd measure

The usual adoption metrics (training completion, licence activation, logins) measure compliance. Some shadow-AI metrics are worse than useless: a count of blocked access attempts mostly tells you how much use you've pushed out of sight, and high "compliance" with a ban may just mean people hide their use well.

I'd track these instead:

- Depth: how many people use AI regularly on real work, rather than how many logged in once.
- Peer teaching: use cases shared, internal how-tos written, colleagues helping colleagues.
- How budget spending spreads across tools. If everyone ends up on the same default, the choice may not be real.
- How many sandbox experiments reach production, and how long that takes.
- Whether unsanctioned use falls once approved routes exist.
- Uses nobody planned for, which show that people have room to explore.
- A short pulse survey on the three needs: can I choose my tools, am I getting better at this, am I learning it with colleagues?

Expect the early numbers to look worse than a mandate's. Not everyone spends their budget or tries the sandbox in the first few months, and leadership tends to get nervous. The curve I'd care about comes after that, when the people who found something useful start showing their colleagues.

The first step costs almost nothing: ask people what they already use and why. What I don't know is how good the approved route has to be before shadow use stops being the easier option. My guess is that it has to be at least as convenient as the workaround, and being safer isn't enough on its own.
