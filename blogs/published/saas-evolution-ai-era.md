---
title: A playbook for SaaS vendors in the agent era
description: Lock-in is a weak moat once agents are the users. As a vendor I'd make leaving easy, build API-first, ship MCP servers that work and price on outcomes.
topic: vendors-and-platforms
published: 2025-11
updated: 2026-09
---

"SaaS is dead" has become a standard line in AI circles. I think it's wrong about the category and right about something narrower. Companies will keep paying specialists to run software they don't want to build. What's under pressure is the version of SaaS that depends on switching pain: proprietary formats, thin APIs, and integrations that look better on the pricing page than they work in practice. The [first post in this series](/blog/siloed-information-saas-moat) looked at that from the buyer's side. This one is about what vendors can do about it, and the third covers the EU Data Act.

Two things are driving the pressure. Agents are becoming users of software, and what matters to an agent is whether your API and data model let it do the job. And custom tools are cheaper to build than they were, so a customer who feels trapped has a more realistic alternative than before.

## The platform trap

The obvious response is to make your product available inside whichever AI assistant your customers use. That's sensible, but it has a catch I'd take seriously. If your product becomes one more set of actions inside someone else's assistant, the assistant owns the relationship with the user, and ten CRMs exposing the same actions through the same interface start to look interchangeable. You will have traded your customers' dependence on you for your dependence on a platform.

The shape of that risk has changed since late 2025. Then, the choice looked like picking between vendor-specific agent SDKs. That question has mostly been settled by the [Model Context Protocol](/blog/model-context-protocols). Anthropic released MCP in November 2024 and in December 2025 [donated it to the new Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation) under the Linux Foundation, co-founded with Block and OpenAI. By then there were more than 10,000 active public MCP servers, and ChatGPT, Gemini, Microsoft Copilot, VS Code and Cursor all supported it. OpenAI's developer documentation now describes [ChatGPT plugins as MCP servers plus skills and optional interface components](https://developers.openai.com/apps-sdk), submitted to a public directory.

So the dependency has moved from SDKs to directories: who reviews your listing, how you're ranked, and what data the assistant lets through. My advice hasn't changed. Keep your data model and business logic yours, make the MCP server a thin layer over your public API, and support several assistants rather than betting on one.

## What I'd do as a vendor

### Make leaving easy

Offer full exports in open formats such as JSON, CSV or Parquet, with custom fields and history included, and migration tooling that works. My belief, which I can't prove, is that making it easy to leave makes customers more likely to stay. They know they're choosing you, and they stop building workarounds to reduce their dependence on you. In the EU, a good part of this is no longer optional for cloud and SaaS providers, which the [third post](/blog/data-portability-eu-data-act) covers.

### Build API-first

Your own interface should use the same public API your customers use, with no internal-only endpoints that can do more. Treat API documentation and API performance as product features rather than infrastructure chores. If your own product runs on the API, the API gets good, and agents get the same access your interface has.

### Ship MCP servers that work

Plenty of vendors have wrapped a few endpoints, called the result an MCP server and moved on. I think that's worse than doing nothing, because customers try it once and conclude the whole idea doesn't work. A useful server exposes the functionality people need rather than a demo subset, respects the same permissions as the product, returns well-structured and documented results, and keeps up with the protocol, which is still moving: the [current revision](https://modelcontextprotocol.io/specification/2026-07-28/changelog), from July 2026, made it stateless.

Some vendors are doing this seriously. Gong announced MCP support in October 2025 [in both directions](https://www.gong.io/press/gong-introduces-model-context-protocol-mcp-support-to-unify-enterprise-ai-agents-from-hubspot-microsoft-salesforce-and-others): a gateway that brings partner data into its own features, and a server that lets agents in Salesforce, Microsoft 365 Copilot and HubSpot query Gong. HubSpot now runs [an MCP server and connectors for Claude, ChatGPT, Gemini and Copilot](https://www.hubspot.com/company-news/our-vision-for-building-an-open-ecosystem-for-the-agent-era). Slack went the other way first, restricting bulk access in 2025, then launched an [MCP server and a real-time search API](https://docs.slack.dev/changelog/2026/02/17/slack-mcp/) in February 2026 that let agents query without storing the data. Being early and useful in your category still looks like an advantage to me, though I wouldn't put a number on how long it lasts.

### Sell capabilities, and price them that way

The idea I've called endpoint as a service is to sell what your product can do through any interface: your own, one the customer builds, or an agent. Seat-based pricing fits that poorly, because an agent doesn't occupy a seat. Usage and outcome pricing fit better, and there are well-known examples. Stripe charges [a percentage plus a fixed fee per successful transaction](https://stripe.com/pricing). Snowflake bills compute [by the second, with a one-minute minimum](https://docs.snowflake.com/en/user-guide/cost-understanding-compute). Intercom charges for its Fin AI agent [per outcome, from $0.99](https://www.intercom.com/pricing), while still selling helpdesk seats. That hybrid is probably where most vendors will land for a while.

### Compete on what you do with the data

If customers can take their data elsewhere, the moat has to be what your product does with it: better domain models, better data quality, useful benchmarks across customers, logic that took years to get right. Those are defensible in a way that export friction never was.

## Who looks well placed

The vendors I'd bet on already work this way: an API-first product, exports customers actually use, an MCP server people rely on, pricing that follows usage, and a willingness to be used through someone else's interface. The ones I'd worry about still treat the API as a compliance item, count integrations instead of testing them, and price by the seat for work that agents increasingly do.

What I don't know is how open the assistant directories will stay. If a few assistants end up controlling which tools their users see, vendors may find that interoperability led them into a new kind of dependency, and the question of who owns the customer will come back in a different form. The one force pushing firmly the other way is regulation, which is the subject of the [last post in this series](/blog/data-portability-eu-data-act).
