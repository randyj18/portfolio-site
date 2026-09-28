---
title: Reskilling for AI happens on the job
description: Courses and central prompt teams can't build AI skills at scale. People learn by using AI on their own work, with a sandbox, peers and a few hours of foundations.
topic: leadership
published: 2025-11
updated: 2026-09
---

Most large AI training efforts follow the same plan. Commission a curriculum, schedule a few dozen hours on how models work, test people and count completions. Some organizations add a small team of prompt engineers to write the prompts everyone else will use. A year later the completion numbers look good and not much about the work has changed.

The need is real. In BCG's January 2024 survey of more than 1,400 executives, leaders expected [almost half their workforce to need reskilling in generative AI within three years, while only 6% of companies had trained more than a quarter of their people](https://www.bcg.com/publications/2024/from-potential-to-profit-with-genai). In the World Economic Forum's [Future of Jobs Report 2025](https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf), 63% of employers named skills gaps as the biggest barrier to transforming their business, and 85% said they planned to prioritize upskilling. I don't doubt the need. What I doubt is the usual method.

## Why classroom-first training struggles

I see four problems with putting the course first.

Transfer is hard. Knowing what a prompt is doesn't mean knowing how to use AI on your own messy task, with your own data, under a real deadline.

One curriculum fits nobody. Marketing, finance, legal and engineering need different things. A shared 40-hour course bores the engineers and loses the marketers.

Skills fade without practice. A program that ends with a test and no application afterwards decays quickly.

Curricula lag. An enterprise course takes months to build, and by the time people finish it the tools have changed.

I call the result training theatre. It looks like action, it's easy to count and easy to budget, which is why it persists.

## Prompting is a literacy

The other common move is to centralize. In the 1990s many organizations had a webmaster, one person or team who owned the website. That made sense for a while. Once every department needed a web presence, the webmaster became a queue, and eventually the role faded because the skill had to be everywhere. Typing and searching went the same way: tasks that once belonged to specialists and became things everyone does.

"Prompt engineer" is on the same path, faster. My expectation is that a central prompt team becomes a queue within months: requests pile up from marketing, finance and legal, waits grow, and people go back to doing it themselves with whatever tools they can find. The hiring picture has moved too. When Microsoft asked leaders in 2025 which AI roles they were considering, the [top ten](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born) included AI trainers, data specialists, security specialists and agent specialists. Prompt engineer wasn't among them.

The underlying reason is that domain knowledge matters more than prompt technique. A finance analyst who knows financial modelling can learn to prompt for financial analysis in hours. A prompt specialist will never know finance, legal and marketing as well as the people doing that work, and the hard part of a good prompt is knowing what you need and noticing when the answer is wrong. Anthropic now describes [context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), deciding everything the model sees rather than only how the instruction is worded, as the natural progression of prompt engineering. That's a design skill, and it sits close to the work.

In my view basic prompt literacy covers four things: knowing what models do well and badly, including how to spot a confident wrong answer; refining through iteration; knowing which data can go into which tool; and choosing the right tool for the job.

## The bigger gap is workflow design

What separates people who use AI as a smarter autocomplete from people who change how their work gets done is workflow design. That means splitting a job into the parts AI can do and the parts that need a person's judgment, adding checks so the output improves over time, and letting AI act on its own within limits you set. That last part is what people usually mean by "agentic".

Take a monthly financial report as an illustration. Done by hand, an analyst pulls the data, builds charts, writes the narrative and formats the deck: say four to six hours. With basic prompting, the analyst pastes data into a chat tool and gets a draft narrative, but still pulls the data and builds the charts: maybe three to four hours. With the workflow redesigned, AI pulls data from defined sources on a schedule, builds charts from templates and drafts the narrative with anomalies flagged, and the analyst spends perhaps half an hour reviewing and correcting. Better prompts get you the middle version. Redesigning the work gets you the last one, and only someone who understands the report can do that redesign.

## Learning inside the work

So I'd reverse the usual order: give people access first, inside guardrails, and let the learning follow. That takes a few pieces, most of which I've written about separately. An [AI budget](/blog/ai-budget-democratizing-innovation) lets people try tools on their own problems without asking permission for each experiment. A [sandbox](/blog/sandboxing-safe-early-access) with the data rules enforced by the infrastructure makes mistakes cheap, the way a driving school starts in a parking lot. A searchable record of experiments and a few informal channels let people share what worked and what didn't. And recognition, sometimes money, goes to people whose ideas others adopt, [regardless of rank](/blog/compensation-ai-era).

A rough sequence: access and guidelines in the first week; people working on real problems and sharing early wins over the next two months; the best uses moving into production by month three to six; and by the end of the first year, repeated questions turning into documentation and common workflows into templates.

Formal training still has a place. BMW runs Digital Boost, which it calls [the biggest training program in its history](https://www.press.bmwgroup.com/global/article/detail/T0443793EN/learning-for-the-future-%E2%80%93-with-artificial-intelligence-and-virtual-reality?language=en), preparing some 80,000 employees for digital work, with AI as one of its focal points. It also gives staff a [GenAI self-service platform and an AI Assistant](https://www.bmwgroup.com/en/innovation/artificial-intelligence.html) that let people without a technical background build their own AI solutions into their work. Courses at scale, paired with tools people can build with, is a reasonable model. What I'd avoid is the course on its own.

> Updated September 2026: The first version of this post described a BMW program called "AI Innovation Spaces". I couldn't find any record of it, so this section now describes what BMW has published about its own approach.

## A small foundation still helps

Some structured learning is worth it if it's short and tied to practice. I'd plan about 18 hours over three or four weeks, alongside hands-on use:

- Governance and safety, 2 hours: which data can go into which tool, using examples from your own data classification; where the boundaries are; when to escalate; and what happens if someone makes a mistake. The answer to that last one should be reassuring.
- Prompting basics, 4 hours: practice on tasks from people's own roles, so everyone leaves with prompts they'll use the next day.
- Workflow design, 8 hours over two weeks: map a workflow you own, pick a repetitive step, design an experiment, build it with your budget and share the result.
- Choosing tools, 4 hours: the same tasks tried in several tools, when an agent makes sense and when a chat window is enough, and what each costs.

Be honest about cost. A distributed approach costs more than a small central team. As an example, at $150 a person a month for budgets, sandbox infrastructure, knowledge sharing and support, a 5,000-person organization would spend $9 million a year, against my rough estimate of $1.5 to 2 million for five specialists and a lead. The difference buys 5,000 people applying AI to their own work, where the central team would have given you five people and a queue.

In the curriculum design and technical training I've done, the basics of adult learning hold up. People learn what's relevant to their own work, they learn more when they have some say in what and when, and they keep what they use straight away. Learning inside the work gives you all three. Classroom-first training tends to lose the third, because the gap between learning something and using it is where skills fade.

What I'm still unsure about is how to measure capability without falling back on certificates. The best test I have is simple: can someone show you a piece of their work that AI made better, and explain how they checked it?
