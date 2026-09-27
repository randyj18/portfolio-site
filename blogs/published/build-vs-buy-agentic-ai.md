---
title: When a custom AI agent is worth building
description: Most teams should pilot enterprise AI they can buy, wired to their systems with MCP, before building anything. Building pays in a few narrow cases.
topic: vendors-and-platforms
published: 2025-11
updated: 2026-09
---

Sooner or later someone proposes building your own AI: an internal chat tool with the company's name on it, or a custom agent that runs a workflow end to end. My default answer is not yet. Pilot what you can buy, connect it to your own systems, and build only for the gaps the pilot proves are real. There are good reasons to build, but they are narrower than most proposals suggest.

## Most of a chat tool is already built

A custom chat interface means building a text box, conversation history, file uploads, sign-in and user management, markdown rendering and a mobile layout. Vendors with far more engineers than your team have solved all of that, and none of it makes your organization better at anything a competitor couldn't match by buying the same product.

The usual reasons for building anyway don't survive much questioning:

- Control. The models still belong to someone else. A thin wrapper around OpenAI's or Anthropic's API gives you control of a user interface, and you still depend on their API.
- Our own branding. A logo on a chat window is vanity.
- We don't trust third parties. Fair, but check what the enterprise plans actually commit to. Anthropic's Enterprise plan, for example, [lists audit logs, custom data retention, customer-managed encryption keys, US-only inference and a HIPAA-ready option with a BAA](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan). A lot of trust concerns can be settled in a contract, and a home-built tool usually sends your data to the same model providers anyway.
- Integration with internal systems. This is the closest to a real reason, and it's what [MCP servers](/blog/model-context-protocols) are for. You need a connector, not a new interface.

Security worries deserve a better answer than a custom interface. When Samsung employees pasted sensitive data into ChatGPT in 2023, the company [restricted generative AI tools and started on in-house ones](https://techcrunch.com/2023/05/02/samsung-bans-use-of-generative-ai-tools-like-chatgpt-after-april-internal-data-leak/). That closes one route, but a custom tool won't stop someone using a personal account on their phone. What lasts is a sanctioned tool good enough that people don't go around it, inside a [sandbox](/blog/sandboxing-safe-early-access) with sensible data rules.

## Agents raise the stakes both ways

The same logic applies to agents, with more riding on it. An assistant suggests and you decide. An agent plans and carries out multi-step work on its own. The line between the two keeps moving: GitHub Copilot, once the standard example of an assistant, now includes a [cloud agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) that researches a repository, plans a change and makes it on a branch for someone to review.

A badly built chatbot gets ignored. A badly built agent makes mistakes at scale, with your systems' permissions. A well-built one can take over a whole workflow, which is exactly why teams want their own. Both the cost of failure and the payoff go up, so the case for building has to be stronger.

## When building pays

I'd consider building when at least one of these is true.

A compliance requirement no vendor will sign. Some work can't leave a controlled environment, or needs residency or controls nobody sells. The test is whether a vendor will sign a contract that meets your requirements. If one will, don't build. That list keeps shrinking: Google made Gemini [generally available on air-gapped Google Distributed Cloud](https://cloud.google.com/blog/topics/hybrid-cloud/gemini-is-now-available-anywhere) in August 2025. If the answer is still no, you're choosing between a custom interface with approved models and no AI at all, which is a different calculation.

Orchestration that's genuinely yours. If an agent has to query a dozen internal systems, apply business rules built up over years and trigger actions across them, off-the-shelf connectors won't get you all the way. My test: if you can describe the integration needs in two pages, use MCP servers and a bought tool. If it takes twenty pages to describe the orchestration logic, building may make sense. MCP handles the connections. It doesn't handle [orchestration, state and monitoring](/blog/agentic-ai-interoperability) across a long workflow.

A domain application where AI is one component. Think of a radiology tool that shows the images next to the AI's reading and writes structured results into the health record, or a legal research tool whose output lands in the firm's citation format with conflicts already checked. The test I'd apply to any proposal: is this an application that happens to use AI, or a chat window that happens to carry our logo? Two small projects of mine on the [playground](/playground) are the first kind: VOICE-Relay, an end-to-end encrypted relay for voice conversations between AI agents and users, and Game Card Creator, an agent workflow that turns rough card ideas into structured game assets.

AI is the product. If AI is what you sell, building is the business. If it's a productivity tool for your own people, buy it. Klarna is a useful in-between case: its customer-service assistant, [powered by OpenAI](https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/), handled two-thirds of its customer-service chats in its first month, by Klarna's own count in February 2024. Klarna built the assistant; OpenAI supplied the model.

There's also a weaker fifth reason: building to learn. If you want engineers to understand how these systems work, a small internal tool is a good exercise. Call it education, and decide separately whether it should ever become production infrastructure.

## A middle option: managed agent platforms

The choice used to look binary: buy chat seats or build an agent. The vendors have since filled in the middle with platforms for building agents on their infrastructure, inside their governance. As of September 2026:

- Microsoft's [Copilot Studio](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/copilot-studio) sells agent capacity at $200 a month for 25,000 Copilot Credits, and Microsoft 365 Copilot users can build and use agents in Copilot Chat at no extra cost. [Agent 365](https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/), generally available since May 2026 at $15 per user, is Microsoft's control plane for observing and governing agents.
- Anthropic's [Claude Managed Agents](https://platform.claude.com/docs/en/about-claude/pricing) bills model tokens plus $0.08 per session-hour of runtime.
- Google has renamed Vertex AI, its AI development platform, the [Gemini Enterprise Agent Platform](https://cloud.google.com/products/gemini-enterprise-agent-platform).

These let you build a custom workflow without owning the runtime, the model integration and the security patching. So the build question becomes which layer you actually need to own. For most teams I suspect the answer is the workflow logic and the connectors, and not the chat interface or the agent runtime.

## Cost both sides the same way

Custom builds get underestimated because people count the build and forget the years after it. I'd cost both options over three years:

- Build: people, times months, times fully loaded cost, plus infrastructure, model usage and security review, plus a standing owner for as long as it runs. As an example, three engineers for six months at a fully loaded $180,000 a year each comes to $270,000 before any infrastructure or model costs. Keeping half to one engineer on it afterwards adds $90,000 to $180,000 a year at the same rate.
- Buy: seats, usage, integration work and change management. Seat prices are only part of it now. Microsoft 365 Copilot is [$30 per user per month](https://www.microsoft.com/en-us/microsoft-365-copilot/enterprise) on top of a qualifying Microsoft 365 licence, so 100 users cost $36,000 a year. Anthropic's Enterprise plan is [$20 per seat per month plus usage billed at API rates](https://claude.com/pricing), so you need a usage estimate as well.

Then ask whether the custom version is really worth the multiple. My rough rule: if building costs less than twice as much over three years and you genuinely need what it gives you, build it. At three times or more, it needs an exceptional reason.

Some costs don't show up in either column. The engineers who built it will move on, and whoever inherits it didn't design it. The model provider will still retire versions and change rate limits and prices, so building to avoid lock-in mostly moves the dependency. And every month your team spends maintaining an internal agent is a month not spent on what your customers pay you for.

## Pilot before you build

Before committing to a build, run the cheaper experiment. Give 10 to 20 people a commercial tool for two or three months, build MCP servers for the few systems that matter most, and measure time saved, satisfaction and the gaps people hit. Then sort the gaps into genuine needs and preferences. If you do build, build for the genuine gaps rather than a replacement for the whole tool.

Be honest about whether you can build and run it. You need people who have shipped production AI systems, security expertise for something that acts on its own, product people who understand agent workflows, and the capacity to maintain it for three years or more. If any of those is missing, what you build will probably be worse than what you can buy.

Design the exit before you start. Keep data in portable formats and integrations modular, ideally as MCP servers you could point at a commercial tool later. If you can't move off your own system in a few months, you've built yourself a new [silo](/blog/siloed-information-saas-moat). And judge the result by adoption: if most of the people it was built for don't use it, the money is gone, whatever the demo looked like.

The line keeps moving in the buyer's favour. Each vendor release absorbs another reason to build, and the managed agent platforms absorb more. What I don't know yet is whether that leaves custom agents as a niche for the genuinely unusual, or just moves the build decision up a layer, from the model and the interface to the workflow itself.
