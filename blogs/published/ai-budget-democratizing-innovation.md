---
title: An AI budget for every employee
description: Give people a small monthly AI budget, no approval per experiment, inside a sandbox. The people closest to the work will find the use cases.
topic: experimentation
published: 2025-11
updated: 2026-09
---

I think most organizations should give every employee a small monthly budget to spend on AI tools: somewhere between $50 and $150 a person, with no approval needed for each experiment, spent inside guardrails the organization controls.

The usual objection is that people will waste the money, break something or leak data. Some of that risk is real, and the guardrails below exist for it. But I've come to think the assumption behind the objection costs more than the budget would. The people doing the work know where their time goes. A central team choosing which use cases to fund will never see most of them, and when a $30 experiment needs an approval, almost nobody bothers to run one.

## What the budget covers

The money is for usage as well as licences: API credits for model access, compute for heavier jobs, storage for the outputs and logs that experiments produce, and access to approved tools. For scale, a premium chat subscription such as [Claude Pro costs $20 a month](https://claude.com/pricing) as of September 2026, so $100 covers a seat and a fair amount of API use on top.

What it doesn't cover matters as much. Spending happens inside a [sandbox](/blog/sandboxing-safe-early-access): only approved tools, data classification enforced by the infrastructure rather than by asking people to be careful, an audit trail for everything, and a clear route to production when an experiment shows real value. People get the freedom to choose. The organization keeps control of the boundaries.

As an example of the cost, at $100 a person a month a 1,000-person company would spend $1.2 million a year, and the full range of $50 to $150 works out to $600,000 to $1.8 million. That's real money, which is why I'd pilot it before committing.

## A small precedent

Buffer, the social media software company, did a modest version of this. In February 2025 it gave each of its 71 teammates [$250 a year to spend on AI tools](https://buffer.com/resources/ai-tools-stipend/), a maximum of $17,750 a year across the company. Its reasons were that different roles benefit from different tools, that cost shouldn't stop people trying something that might help, and that people should learn together, which they do in a #culture-ai Slack channel.

That works out to about $21 a month per person, a much smaller bet than the one I'm suggesting, and Buffer hasn't published results, so I'd call it a precedent rather than proof. Buffer's earlier experience carries a useful warning too. It once offered a $240 learning stipend that saw little use, and in 2019 expanded it into an [$800 a year Growth Mindset Fund](https://buffer.com/resources/growth-mindset-fund/). A budget nobody spends teaches nobody anything, so utilization is the first number I'd watch.

## Failed experiments are part of the return

In 1968 a 3M scientist, Spencer Silver, was trying to make a strong adhesive and produced a weak one that peeled off cleanly. By the standard of what he set out to do, it was a failure. Years later a colleague, Art Fry, wanted bookmarks that wouldn't fall out of his church hymnal, thought of Silver's adhesive, and Post-it Notes reached US stores in 1980 ([MNopedia](https://www.mnhs.org/mnopedia/search/index/thing/post-it-notes), [National Inventors Hall of Fame](https://www.invent.org/blog/inventors/art-fry-post-it-notes)). The failed adhesive only became valuable because it wasn't thrown away and someone else heard about it.

That second condition is the one organizations tend to miss. When someone spends their budget on an approach that doesn't work, they've learned something that could save a colleague the same month, but only if they say so. Amy Edmondson's early research on hospital units is a good caution here. The better-led units [recorded more medication errors](https://psnet.ahrq.gov/issue/learning-mistakes-easier-said-done-group-and-organizational-influences-detection-and), and she argued that the difference was partly in what people felt able to report. If admitting a failed experiment feels risky, the budget will buy a lot of private lessons. A shared record of what's been tried, which I describe in [the duplicated solution problem](/blog/duplicated-solution-problem), is what turns them into organizational ones.

## Start with a pilot

If a company-wide budget is too big a first step, start smaller. Pick 50 to 100 people across different functions, give them $50 to $100 a month for six months, and track what happens. That costs between $15,000 and $60,000.

I'd watch four things: how much of the budget gets used, how many different tools and approaches people try, how much gets shared across teams, and how long it takes an experiment that works to become something other people use. At the end, bring leadership concrete examples of what people built, what they abandoned and why. The approach in [measuring AI when ROI doesn't fit](/blog/beyond-roi-measuring-ai-value) applies here: you're measuring how fast the organization learns, and a return on each experiment would miss most of that.

## Objections I'd expect

"People will waste it." Some will. Even wasted money usually teaches someone what doesn't work, and a pilot caps the cost.

"We need more governance first." Governance matters, which is why the sandbox, the data rules and the logs come first. Waiting for perfect governance usually means not starting, while employees keep using [personal tools anyway](/blog/shadow-ai-organizational-intelligence).

"Some people will use it for personal projects." Some will. If someone builds a tool for themselves and brings the skill back to their job, the budget did what it was meant to do.

What I don't know is the right amount. Fifty dollars a month may be too little to try anything serious, and $150 may be more than most people will spend. The pilot is how you find out.
