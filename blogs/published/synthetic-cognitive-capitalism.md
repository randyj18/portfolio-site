---
title: Synthetic cognitive capitalism
description: A speculative argument that the bigger AI shift is economic. Know-how becomes capital, compute works like currency, and owning the context matters most.
topic: agents-and-tools
published: 2025-11
updated: 2026-09
---

This is the most speculative post on this site: a view about where things are heading, and I expect parts of it to be wrong.

Two things are happening at once. Companies are scaling large language models about as far as money allows, while some of the people who built this era suspect that path is a local optimum: a peak, but maybe not the highest one. Underneath the argument about architectures, I think the economics are shifting in a way that will matter more than which approach wins. Intelligence, human and synthetic, is starting to behave like capital. I call that synthetic cognitive capitalism.

## Doubts from inside the field

For about five years the recipe was more data plus more compute. The doubts about it come from people who know the recipe best, though they aren't all the same doubt.

Ilya Sutskever, a co-founder of Safe Superintelligence, described it as a change of era in a [November 2025 interview](https://www.dwarkesh.com/p/ilya-sutskever-2): "From 2012 to 2020, it was the age of research. From 2020 to 2025, it was the age of scaling," and now it's "back to the age of research again, just with big computers." He also said that what labs are doing now "will go some distance and then peter out," and that today's models "generalize dramatically worse than people."

Yann LeCun's objection is narrower than it's often reported. His target is the way language models learn, by reconstructing their input one token at a time, and the transformer itself isn't the issue: V-JEPA 2, a world model he co-authored, [uses transformers](https://arxiv.org/html/2506.09985) for both its encoder and its predictor. In a 2025 paper, he and two co-authors took the finding from vision research that training in embedding space is ["far superior"](https://arxiv.org/abs/2509.14252) to reconstructing the input and tried it on language models (my [research note on LLM-JEPA](/research/llm-jepa) covers it). He has since started [AMI Labs](https://amilabs.xyz), a company building systems that understand the real world, keep a persistent memory, and can reason and plan. One of its four offices is in Montreal.

Richard Sutton's doubt is about goals. On a [September 2025 episode of the same podcast](https://www.dwarkesh.com/p/richard-sutton), he argued that predicting the next token is "not a substantive goal," and that language models "have the ability to predict what a person would say. They don't have the ability to predict what will happen." His alternative is learning from experience: act, see what happens, adjust. Meta's work on [early experience](/research/early-experience) is a small step in that direction.

Llion Jones, one of the authors of the original transformer paper, co-founded Sakana AI in Tokyo, which works on nature-inspired approaches such as [evolving new models by merging existing ones](https://sakana.ai/evolutionary-model-merge/) and [Continuous Thought Machines](https://sakana.ai/ctm/), which use the timing of neuron activity, loosely modelled on the brain. And Noam Brown, who co-created the poker AIs Libratus and Pluribus and worked on Cicero at Meta, has been working on another exit at OpenAI: letting models think longer when they answer. He describes himself as a [foundational contributor](https://noambrown.com/) to OpenAI's reasoning models, starting with o1. My note on [test-time scaling](/research/s1-test-time-scaling) covers a cheap open version of that idea.

These five aren't making the same argument, and a handful of researchers isn't a consensus, though that's what I originally called it. What they share, as I read them, is a doubt that scaling pre-training alone gets to where the most ambitious people want to go. Plenty of other work sits off the main road too, from [predicting meaning in chunks instead of single tokens](/research/calm) to [models that keep learning without forgetting](/research/nested-learning).

Whether we're actually on a plateau is an open question. METR found that the length of tasks frontier AI agents can complete, measured by how long they take a skilled person, [doubled roughly every seven months for six years](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/). In its [September 2026 review of Claude Opus 5.5](https://metr.org/blog/2026-09-22-claude-opus-5-5/), METR called the model "an incremental improvement" and said its data "is insufficient for distinguishing consistent, accelerating, or decelerating rates of improvement." Anyone who tells you confidently which one we're on is guessing, me included.

## Why the money stays on the known curve

Most of the money still goes to scaling, and I think the reason is that scaling is measurable. "Double the cluster and the loss drops by this much" fits in a spreadsheet and justifies a budget. "We need a new approach to world models" has no guaranteed return and is hard to defend to a board that can see what everyone else is doing. So institutional capital flows to the local optimum, which is safe, measurable and profitable for now, while a lot of intellectual capital drifts toward the alternatives.

Some of the data centres being built today may end up running architectures nobody has designed yet. That's a reasonable bet, as long as the people making it know it's a bet. Organizations do the same thing on a smaller scale when they fund only what's already proven, which is why I argue for a portfolio of small bets, like an [AI budget for every employee](/blog/ai-budget-democratizing-innovation).

The shift also changes what governance has to cover. Rules written around what a model says, such as hallucination and bias in training data, will have gaps once systems plan and act on their own. The risk moves from content to behaviour, which is part of why I think [governance should come from people who build things](/blog/ai-governance-without-theater).

## Intelligence as capital

Industrial capitalism combined labour and machinery. The information economy aggregated and distributed data, which is where the SaaS moat came from. My argument is that intelligence itself, human and synthetic, is becoming a form of capital: something a firm accumulates, and that compounds.

A company that captures how its best people solve problems, such as how an engineering failure was diagnosed or how a hard contract was negotiated, is building an asset it can reuse at close to zero marginal cost. That changes the shape of the firm. The old model was to hire people, train them and hope they stay. The new one is to hire people, use their work to train synthetic systems, and compound what they know.

Put that bluntly and it sounds dystopian, and parts of it could be. It raises questions I can't answer yet: whose know-how it is, what people get for it, and what happens to a craft once a system can do the routine version. I'd rather organizations used the capacity it frees up to [redesign roles and compete at a higher level](/blog/human-ai-collaboration-design) than to cut, but I don't think that outcome is automatic.

If the argument holds, knowledge capture becomes a large part of what a company is worth, and the everyday record of how a business thinks (tickets, decision notes, code reviews, the reasoning behind a call) becomes raw material worth keeping.

## Compute as currency

Sam Altman has said that ["compute is going to be the currency of the future"](https://lexfridman.com/sam-altman-2-transcript/). The market is starting to act that way. SF Compute runs a [marketplace where buyers reserve GPU time and resell what they don't use](https://sfcompute.com/), and Silicon Data publishes [daily GPU rental price indices](https://www.silicondata.com/) on Bloomberg and Refinitiv, which it pitches as benchmarks for swaps and futures.

My twist is that compute on its own is turning into a commodity, and commodities rarely hold their margins. What stays scarce is coherence: getting agents to work together, checking what they produce, and deciding what they should work on in the first place. The people and companies who own the context, a deep understanding of a particular business problem, will have leverage over those who only own the compute.

As I read them, the rival research camps disagree about architecture but converge on planning: a system's ability to simulate what might happen before it acts. An AI that can try a thousand versions of a marketing campaign in simulation and run the best one is, in economic terms, richer than a person who can run one. An organization that can simulate a supply-chain disruption and reroute ahead of it holds something like resilience capital. The same logic is why I expect more software to be sold on outcomes than on workflows, so that you pay for the customer acquired rather than the CRM seat.

## What individuals can do

This is the hopeful part. If intelligence is capital, individuals can own some of it in a way that wasn't possible before. You couldn't run a factory line from your garage. You can run a small fleet of agents from a laptop.

That opens room for one-person companies that work across borders, small specialist firms that compete with large consultancies, and people using tools like [Claude Code](/blog/claude-code-agentic-tool) to build software for niche problems that big vendors ignore. I expect we'll see very small teams doing work that used to take hundreds of people. How common that becomes, and how long the advantage lasts once everyone has the same tools, I don't know. Creating things has never been cheaper. Distribution is still hard, though AI helps there too.

If I had to act on this today, I'd do three things regardless of which architecture wins: keep the data and the record of how decisions get made, get good at orchestrating and checking agents rather than just prompting them, and fund small experiments with the next approaches alongside the current ones.

The question I can't answer is who ends up owning the compounding: the firms that capture the know-how, the people it came from, or the model providers everyone rents from.
