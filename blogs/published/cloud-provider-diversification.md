---
title: When multi-provider AI is worth the premium
description: You can now hedge AI lock-in without juggling vendors. The real work is choosing which layer to abstract and deciding what the insurance is worth.
topic: vendors-and-platforms
published: 2025-11
updated: 2026-09
---

Any organization using AI at scale ends up facing the same choice: concentrate on one provider and accept some lock-in, or spread work across several and pay for the complexity. I think of the second option as insurance. Sometimes it's worth buying. Often it's a premium for protection you'll never claim on. Either way, it should be priced before it's bought.

The price changed this year. Until recently, adding a second model family usually meant adding a second cloud, a second contract and a second security review. For most of the big models that's no longer true, which makes a hedge cheaper and changes where the real lock-in sits.

## Lock-in lives in more places than the contract

Cloud lock-in is mostly infrastructure: networks, identity, storage, the cost of re-architecting. AI lock-in shows up in at least five places.

- Prompts. Prompts get tuned to one model's habits. Anthropic, for instance, [recommends XML tags to structure prompts for Claude](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices), and prompts written that way need rework elsewhere.
- Token economics. The same text can cost different amounts on different models. Anthropic says the tokenizer in its newer models [produces about 30% more tokens for the same text](https://platform.claude.com/docs/en/about-claude/pricing) than its older one. Per-token price lists don't tell you what your workload will cost; testing does.
- Data. Fine-tuned models, embeddings and retrieval pipelines built on one provider's stack.
- Features. Integrations and capabilities only one vendor offers.
- People. Staff who have used one assistant for a year know its strengths, its failure modes and its interface. I think this is the most underrated kind, and no abstraction layer removes it.

## Multi-model no longer means multi-cloud

As of September 2026, most frontier models are sold on more than one cloud:

- In April, Microsoft and OpenAI [amended their partnership](https://blogs.microsoft.com/blog/2026/04/27/the-next-phase-of-the-microsoft-openai-partnership/). Microsoft's licence became non-exclusive, and OpenAI "can now serve all its products to customers across any cloud provider", though its products still ship first on Azure.
- Amazon Bedrock's [model list](https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html) now includes OpenAI's GPT-6 and GPT-5.6 models alongside Anthropic's Claude, Meta's Llama, Mistral, DeepSeek, Qwen and xAI's Grok. GPT-6 Astra became [generally available there](https://aws.amazon.com/about-aws/whats-new/2026/09/openai-gpt-6-astra-on-amazon-bedrock/) on 8 September.
- Microsoft Foundry [sells OpenAI's models](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure) next to xAI's Grok, Microsoft's own MAI models, Llama and Mistral, and Claude became [generally available on Foundry](https://azure.microsoft.com/en-us/blog/claude-in-microsoft-foundry-is-now-generally-available/) in June.
- Google's platform, [formerly Vertex AI and now the Gemini Enterprise Agent Platform](https://cloud.google.com/products/gemini-enterprise-agent-platform), offers Gemini and [Claude](https://platform.claude.com/docs/en/about-claude/pricing), but from OpenAI only the [open-weight gpt-oss models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/maas/openai).
- Gemini is the exception. Bedrock lists Google's open Gemma models, not Gemini.

So for many organizations, a second model can now mean a second model on the cloud they already use, under the contract and security review they already have. That takes a lot of the cost out of hedging.

It doesn't make the models interchangeable, though. The same model can come with different terms on different platforms. Anthropic's pricing page notes that its [fast mode runs only on its own API](https://platform.claude.com/docs/en/about-claude/pricing), and that regional endpoints for its recent models cost 10% more than global ones on Bedrock and Google Cloud. OpenAI's releases still reach Azure first. I'd treat availability on your cloud as a hedge against outages and price changes, and test for parity separately.

## Decide which layer you're abstracting

People say "abstraction layer" as if there were one. There are three, and they need different tools.

The model API. A thin internal interface or gateway that your applications call, with one adapter per provider behind it. Switching providers then means changing an adapter and re-testing prompts instead of rewriting applications. I'd build it once you know your use cases, and not before.

The tools and data. This is where MCP belongs. [MCP](/blog/model-context-protocols) standardizes how AI applications connect to tools and data, so an integration built once as an MCP server works with any client that speaks the protocol. ChatGPT, Gemini, Microsoft Copilot and VS Code all do, and since December 2025 the protocol has been governed by the Linux Foundation's [Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation). MCP won't switch models for you. It keeps your integrations when you do.

The people. No software abstracts the habits, prompt libraries and judgment your staff have built around one assistant. Budget for retraining whenever you switch, even when the technical switch is easy.

## The case for going deep with one provider

One provider means one contract, one security review, one compliance assessment and one set of training. That overhead is real and it compounds with every vendor you add.

Depth also pays. An organization that commits to one provider builds its connectors, prompt libraries and training around it, and gets good at it. One that spreads across three tends to end up competent everywhere and expert nowhere, which shows when a hard use case arrives. Concentrated spend usually earns better commercial terms as well, though discounts are negotiated privately and I don't have figures I'd trust.

## The case for a second provider

Continuity. If AI sits in a customer-facing or revenue path, ask what happens during a two-day outage at your provider. A tested fallback, even to a weaker model, keeps you running.

Leverage. Vendors know when you're locked in. Leverage at renewal only exists if switching is real, and telling a vendor you might switch means little if switching would take six months.

Fit. Route work to a different model only when the difference is large. If one model is 10% better on your task, that rarely pays for the overhead. If it's twice as fast or clearly more accurate, it might.

Change. Leadership in this market moves quickly. By Menlo Ventures' [estimates](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/), OpenAI's share of enterprise LLM API spending fell from about half in 2023 to 27% in 2025, while Anthropic's rose to 40%. A setup that can take on a new provider without a rebuild is worth something for that reason alone.

Regulation is sometimes offered as a fifth reason. Some operational-resilience rules may expect provider-independent fallbacks, but check whether your framework actually says so before building for it.

## Price it like insurance

Two tests help decide whether the hedge is worth it.

The months-of-spend test. Estimate what it would cost to switch providers: re-integration, prompt rework, retraining, testing and a period of degraded service. If that's more than about six months of what you spend with the vendor, you're effectively locked in and a hedge is worth something. If it's under a month, lock-in is manageable and one provider is probably fine.

The exposure test. What would a 48-hour outage cost? What would a 40% price increase do to your budget? Would a week without AI put you behind competitors? If the answers are "not much", "we'd absorb it" and "no", skip the hedge.

Then compare those answers with the premium. As an illustration: if keeping a second provider warm takes 40 hours a month across engineering, security and finance (routing rules, key rotation, reviews, reconciling another invoice), at $150 an hour that's $72,000 a year. The hedge is worth it if your exposure is bigger than that.

If you do run two, someone has to decide which requests go where. Letting each person choose tends to produce inconsistent results and a training burden. Fixed rules, such as sending one workload to one model, are what most teams end up with. Having a small model route each request is elegant but adds another moving part to maintain.

## What I'd do

Start with one provider and learn what your use cases need. Once you know, put a thin layer in front of the model API and build your integrations as MCP servers. Add a second model when you find a real gap or a real risk, and look first at whether your current cloud already sells it. If you're [building custom agents](/blog/build-vs-buy-agentic-ai) anyway, the model layer is cheap to add; if you're buying finished tools, keep your own infrastructure simple. And if most of your AI use runs through Microsoft Copilot, remember that Microsoft [sets the model menu and the terms](/blog/copilot-microsoft-play) for you.

The worst position is the one you drift into: locked in without ever having decided to be.

What I can't tell yet is how durable this cross-cloud availability will be. Each vendor's newest features still tend to appear on its own platform first, and the deal that opened up OpenAI's models is only five months old.
