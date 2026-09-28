---
title: Why teams rebuild what already exists
description: Organizations pay for the same solution again and again because nobody can find the first one. AI agents will do it faster unless reuse gets easier.
topic: experimentation
published: 2025-11
updated: 2026-09
---

When I moved from a national role to a global one, I expected to see different problems at a bigger scale. What I mostly saw was the same problems being solved again, by teams in different regions who didn't know about each other's work. I watched the same solution get built three times.

Nobody involved was careless. The person solving a problem in one office had no reasonable way to find out that someone in another office had solved it months earlier. That is the duplicated solution problem: the organization pays for the same thing several times, and what each team learned stays with that team.

The problem is old. Back in 2004, IDC's Susan Feldman estimated that knowledge workers spent [15 to 35% of their time searching for information](https://www.kmworld.com/Articles/Editorial/Features/The-high-cost-of-not-finding-information-9534.aspx), and put the cost of reworking information that already existed at about $12 million a year for every 1,000 knowledge workers. Those figures are more than 20 years old, and I haven't seen much sign that the underlying habit has changed. What has changed is how fast things now get built.

## Why it keeps happening

I see four causes, and none of them is about competence.

There's no single place to look. Solutions live in chat channels (on Slack's free plan, only the last [90 days of messages are searchable](https://slack.com/pricing/free)), email threads, a SharePoint site nobody can find, personal drives, and the heads of people who have since left.

There's no credit for reuse. People get recognized for building things. People rarely get promoted for saying "someone already solved this, let's use theirs", even though that's often the better outcome for the money.

Search doesn't work well for a problem you're still defining. You don't know the keywords yet, because you're looking for an approach to something you've only just noticed.

Reuse needs permission. By the time you've arranged access to another team's solution, it's often quicker to build your own, so people do.

## AI makes it faster

AI agents inherit all of this, at machine speed.

Give every team a capable coding agent and the dashboard that used to take three months takes three weeks. That sounds like progress until three teams in three regions each build it in three weeks. The waste gets cheaper per copy and more frequent.

The subtler problem is stale knowledge. An agent that retrieves from your document stores will confidently cite the old version of a policy, a deprecated API or an approach that was tried and abandoned two years ago, because nothing in the source marks it as superseded. People then spend their time checking the agent's answers.

Agents also create new silos. Most are pointed at one team's tools and data. Without a shared layer, they become automated versions of the disconnected teams they serve, and their discoveries stay local too.

## Make reuse easier than rebuilding

The fix is a light system that makes finding and reusing a solution easier than building a new one. It doesn't need to be a big knowledge management platform, which tends to become a bureaucracy of its own. I'd start with five pieces:

1. One place to submit: a short form asking what problem this solves, how it works and what it's worth.
2. Enough structure to find things: tags rather than an elaborate taxonomy, captured when the work is created. For code, I'd make a few fields mandatory at commit or deployment (what it solves, who owns it, what it replaces) and keep a short "why this exists" note in each repository. [Metadata](/blog/metadata-matters) is what makes the rest findable.
3. Search by description: let people describe their problem and get back related work, even when the keywords don't match.
4. Recognition when something gets reused. The builder should hear about it, and it should count for them. This is where [rewarding ideas regardless of rank](/blog/compensation-ai-era) comes in.
5. A feedback loop, so solutions improve as other teams use them.

Teams don't have to abandon their own tools for this. They can keep working in GitHub, Confluence, Notion or Jira, as long as the key metadata flows into one index across all of them. Think of it as connecting what already exists rather than moving it. For Microsoft-centric organizations, [this roadmap](/blog/cognitive-enterprise-microsoft-roadmap) shows one way to build that layer without a big migration.

## Point the agents at the register

Once that index exists, agents can help instead of adding to the problem. The [Model Context Protocol](/blog/model-context-protocols) gives agents a standard way to connect to tools and data sources, and it's now governed as an open standard: in December 2025, Anthropic [donated MCP to the Linux Foundation's new Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation), co-founded with Block and OpenAI.

An agent connected to the register can check whether a solution already exists before it builds one, pull context from the original team's code and documents, tag its own work as it goes, and tell the relevant teams when it builds something they might reuse. The order matters. I'd get the minimum metadata and the index working before giving agents broad access, because an agent pointed at a messy knowledge base mostly produces faster mess.

## Stages, votes and recognition

For ideas that go beyond a reusable component, a simple progression helps: submitted, reviewed by peers, trending, piloted, in production, adopted by other teams, and measured impact. Each stage should be a low hurdle, and each should bring some recognition.

Peers can vote, and ideas that pass a set threshold go to a small cross-functional group for a proper look, so an idea doesn't need an executive sponsor to get noticed. Ideas that don't attract votes stay findable for later. I'd judge submissions without the author's name at first, then reveal and credit the person once an idea advances.

Two design choices matter more than the rest. Reward people when their idea reaches the pilot stage rather than making them wait for full implementation, which can take long enough to kill their interest. And keep submission light: asking for a full business case up front discourages exactly the people you want to hear from. I'd also be careful with badges and leaderboards. They create a burst of activity, and I suspect it fades with the novelty; recognition that comes from someone actually using your work lasts longer.

## What to measure

The useful measures are simple: how many solutions get submitted, how often people find and reuse them, how many get adopted beyond the team that built them, how long ideas take to reach a pilot, and how many duplicates you catch as similar submissions get merged. Set targets after the first quarter, once you know your baseline.

If I were starting tomorrow, I'd use a form and a spreadsheet, seed them with ten or fifteen things people have already built, and run it with 50 to 100 people for a couple of months before expanding. The real test is whether the next person who starts building something checks first. What I don't yet know is how long recognition alone keeps people contributing, and at what point it needs real money behind it.
