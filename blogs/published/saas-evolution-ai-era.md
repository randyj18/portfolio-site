# The SAAS Reckoning: Evolution in the AI Era

**Subtitle:** How vendors can adapt—or why they'll become obsolete
**Target Length:** 1900-2300 words
**Cluster:** Systems & Architecture
**Status:** Complete

---

## The Draft

"SAAS is dead."

You've probably heard this. Maybe you've said it yourself.

But here's the more nuanced truth: SAAS isn't dead. The old SAAS business model is dying. And vendors have a choice: evolve or become obsolete.

[Siloed Information: How SAAS Companies Protect Their Moat](/blog/siloed-information-saas-moat) explained the problem. This post is about the solution—and the opportunity.

## Why the "SAAS Is Dead" Sentiment Exists

The sentiment isn't coming from nowhere. Here's what's driving it:

**1. AI Makes Custom Development Viable**

Organizations can now build lightweight custom tools faster and cheaper than ever. Why pay for bloated SAAS platforms when you can build exactly what you need?

**2. Data Lock-In Backfires**

The moat that worked for 20 years—trapping customer data behind proprietary systems—now actively hurts SAAS companies.

Customers need data freedom to leverage AI. Vendors that resist are getting left behind.

**3. The "Integration Tax" Is Too High**

Organizations are tired of paying for hundreds of micro-integrations that barely work. They want systems that actually interoperate, not performative APIs.

**4. Agent-First World Changes the UI Game**

If AI agents can interact with your service directly, who needs your carefully crafted UI?

This threatens the entire value proposition of SAAS: you're not selling a delightful interface anymore. You're selling access to functionality. And that changes everything.

**The Voice from the Top**

The most provocative statement came from Microsoft CEO Satya Nadella, who suggested that "business logic will be shifted to an AI layer, where AI agents will manage rules and processes across multiple databases, automating functions and eliminating the need for traditional backend systems."

His statement created a "mini firestorm" in the tech industry. And while he may be biased—Microsoft is heavily invested in AI—the underlying trends are real.

Gartner predicts that AI agents will make at least 15 percent of daily business decisions by 2028, up from essentially zero in 2024. They also forecast that 33 percent of enterprise software applications will include agentic AI by 2028, and that 85 percent of enterprises will implement AI agents by the end of 2025.

That's not a slow transition. That's a structural shift happening right now.

But here's the more nuanced perspective: "Those jumping on the 'SaaS is dead' narrative are missing the real story—SaaS is getting smarter, and it is here to stay."

SAAS isn't dying. It's transforming. The question is which vendors will transform with it.

## The Trap: Agent SDKs as the "Solution"

Here's what many SAAS companies are doing in response:

OpenAI and Microsoft have released agent SDKs. The pitch to SAAS vendors: "Make your platform accessible to AI agents! Just implement our SDK!"

Sounds like an adaptation strategy. It's actually a trap.

Here's why:

**You're Building on Someone Else's Platform**

By implementing OpenAI's or Microsoft's SDK, you're making your service dependent on their ecosystem.

What happens when they change the spec? When they introduce competing features? When they decide your category isn't strategic and deprioritize support?

You've traded one form of lock-in (your customers) for another (your dependency on model providers).

**You're Commoditizing Your Differentiation**

Once your service is just "another endpoint in the agent ecosystem," what makes you different from competitors?

If ten CRM vendors all implement the same agent SDK, they become interchangeable. Price becomes the only differentiator.

That's not a winning strategy.

**You're Not Solving the Real Problem**

The real problem isn't "can agents access my service." It's "do customers have freedom over their data and workflows."

Agent SDKs don't solve that. They just create a new intermediary layer.

## What SAAS Companies Should Actually Do

Let me be clear: I'm not saying SAAS as a concept is doomed. I'm saying the business model needs to evolve.

Here's what smart SAAS vendors are doing—or should be doing:

### Strategy 1: Embrace Real Data Portability

Stop treating data export as a grudging compliance requirement. Make it a feature.

**What this looks like:**
- Full-fidelity export in open formats (JSON, CSV, Parquet)
- Comprehensive two-way APIs with no artificial rate limits
- Migration tools that make it easy to leave
- Support for emerging standards (MCPs, GraphQL, FHIR, etc.)

**Why this works:**

Counterintuitively, making it easy to leave makes customers more likely to stay.

Why? Because they know they're not trapped. They're choosing your product because it's the best option, not because switching is too painful.

That's a much stronger position.

### Strategy 2: Shift to EAAS (Endpoint as a Service)

Instead of selling "software you access through our interface," sell "capabilities you access through any interface."

**Example:**

Traditional SAAS CRM: "Log into our web app to manage your customer data."

EAAS CRM: "Access customer management capabilities through our API. Use our UI, build your own, or let AI agents interact with it directly. We don't care. We charge based on usage."

**Why this works:**

You're no longer competing on UI (which AI is commoditizing). You're competing on:
- Quality of your data models
- Reliability of your infrastructure
- Sophistication of your business logic
- Speed and efficiency of your APIs

These are defensible advantages that aren't threatened by AI agents.

**The Numbers Back This Up**

The shift is already happening. According to recent industry data, 67 percent of SAAS companies now use usage or consumption-based pricing—up significantly from just 52 percent in 2022. Even more striking: 45 percent have fully switched to usage-based pricing, and 61 percent are testing or actively planning usage-based models.

Meanwhile, traditional seat-based pricing has dropped from 21 percent to 15 percent in just 12 months, while hybrid pricing models surged from 27 percent to 41 percent.

The market is telling us something: pricing based on capabilities and outcomes works better than pricing based on seats.

Companies that maintain seat-based pricing for AI products see 40 percent lower gross margins and 2.3 times higher churn than those adopting usage or outcome-based models. That's not subtle. That's a clear signal.

**Who's Doing This Well**

Look at companies like Stripe, which charges a percentage plus fixed amount per successful payment API call. Revenue scales directly with customer usage. When customers succeed, Stripe succeeds.

Or Twilio, which offers three usage-based options: pay-as-you-go, volume discounts, and committed-use discounts. They've built their entire business model around API access to communications capabilities.

Snowflake charges for processing power by seconds of query usage and average compressed data storage. Cost aligns with actual usage patterns.

OpenAI charges per token processed. Transparent, granular, directly tied to value delivered.

These aren't exceptions. They're increasingly the norm for companies that understand where the market is going.

### Strategy 3: Implement MCPs (For Real)

[Model Context Protocols: The Connectors That Enable Everything](/blog/model-context-protocols) explores MCPs in depth.

Here's the strategic insight: being first in your category to implement useful, high-quality MCPs is a massive opportunity.

**The Current State:**

Right now, there's a trend of SAAS vendors slapping together a barely-functional API, calling it an MCP, and checking the box.

This is worse than doing nothing. It makes MCPs look like a failure and frustrates customers who try to use them.

**The Opportunity:**

Be the first in your category to build an MCP that actually works.

What does "actually works" mean?
- Exposes full functionality, not a limited subset
- Handles authentication and permissions correctly
- Returns data in well-structured, documented formats
- Performs reliably at scale
- Evolves as the MCP standard evolves

**Why this works:**

In a dwindling market (as custom solutions eat into SAAS market share), you can increase your share by being the vendor that "gets it."

In a growing opportunity (as MCPs become standard infrastructure), you can create an entirely new revenue stream. This could become your primary revenue source.

The vendors who nail MCPs early will have a 2-3 year advantage over competitors.

**Who's Getting This Right**

HubSpot was the first major CRM to ship a production-grade MCP integration in June 2025. Their "deep research" connector allows ChatGPT to perform natural language queries with live HubSpot data. Critically, they built for open interoperability with a wide range of language models—not just one vendor's ecosystem.

Gong announced MCP support in October 2025 at their Celebrate conference. Their approach is particularly smart: they implemented two-way MCP integration. The MCP Gateway integrates external data into Gong features, while their MCP Server enables external AI agents (like Salesforce and Microsoft Copilot) to query Gong. They're both consuming and exposing capabilities.

By early 2025, community contributions blew past 1,000 MCP servers, covering popular services from Git and GitHub to Slack, Google Drive, Jira, and databases. The ecosystem is growing fast.

**Who's Moving More Cautiously**

Not everyone is moving at the same pace. Some major platforms are taking a more measured approach—implementing MCP in pilot or controlled access only, restricting it to their own ecosystems, testing the waters before full commitment.

This caution is understandable when you have a large installed base to protect. But caution can easily turn into paralysis. And in a fast-moving market, moving slowly is often indistinguishable from not moving at all.

### Strategy 4: API-First Architecture

Stop building your product as "web app with an API bolted on." Build it as "API with a reference UI."

**What this means:**
- Your own web interface uses the exact same API that customers use
- No "internal APIs" that have more capabilities than public ones
- API documentation is first-class, not an afterthought
- API performance is treated as a product metric, not infrastructure concern

**Why this works:**

This forces you to build better APIs because you rely on them yourself.

And it makes your product naturally fit into the AI era, where APIs are the primary interface.

### Strategy 5: Compete on Intelligence, Not Lock-In

Your moat should be that your product is smarter, not that switching is painful.

**What this looks like:**
- Invest in AI-powered features that genuinely add value
- Use your unique dataset to provide insights competitors can't
- Build domain expertise into your product logic
- Make your product indispensable through quality, not friction

**Why this works:**

Customers want to work with vendors who make them better, not vendors who trap them.

The SAAS companies that thrive in the next decade will be the ones customers choose to stay with, not the ones customers are stuck with.

## The Timeline: Act Yesterday, Decide by 2030

Here's the urgency:

**If you haven't started building toward data portability and API-first architecture, you're already behind.**

The next 5 years will determine the fate of most SAAS companies.

Organizations are making decisions right now about:
- Build vs. buy for core workflows
- Which vendors to consolidate around
- Whether to invest in internal data platforms
- How to structure their AI strategy

If you're a SAAS vendor still optimizing for lock-in, you won't even be considered in these conversations.

**The Key Moments**

November 2024 marked the beginning with Anthropic's introduction of the Model Context Protocol. The initial response was tepid—many dismissed it as another standard that wouldn't gain traction.

Then came March 2025, the defining moment: OpenAI adopted MCP, integrating it across ChatGPT, their Agents SDK, and Responses API. When Anthropic's main competitor validated the standard, everything changed.

Also in March 2025, ServiceNow acquired Moveworks for $2.85 billion—the largest acquisition in ServiceNow's history and a dramatic departure from their traditional organic growth strategy. This signaled just how urgent the agentic AI space had become.

April 2025: Google confirmed MCP support. Now all major model providers were on board: Anthropic, OpenAI, Google, Microsoft, Meta, and Amazon.

June 2025: HubSpot shipped the first production-grade MCP integration from a major CRM. This demonstrated that MCPs weren't just theoretical—they were commercially viable.

October 2025: A wave of enterprise announcements. Salesforce launched Agentforce 360 on October 13. They expanded their strategic partnership with Anthropic on October 14. Gong announced MCP support on October 21.

By November 2025, the ecosystem had matured: over 1,000 community MCP servers, production deployments scaling, and a clear signal that this is the direction of travel.

**Who's Adapting, Who's Not**

Some vendors started adapting 2-3 years ago, before MCP even existed. They already had API-first architectures, treated data portability as a feature rather than a threat, and competed on quality rather than friction. When MCP arrived, they were ready to implement it quickly.

Developer tools like Zed, Replit, Codeium, and Sourcegraph adopted MCPs immediately, gaining competitive advantage through better AI coding assistance.

Zapier launched a beta of "Zapier MCP" to connect AI agents with thousands of SaaS apps via their automation platform—turning their existing strength into an AI-era advantage.

Then there are the vendors taking different approaches: some are doubling down on vertical SaaS, building deeper industry-specific features to create higher switching costs. Others are selectively open-sourcing schemas where they already lead, gaining control over industry standards while appearing open. Some are building walled garden ecosystems with proprietary agent platforms.

These lock-in strategies might work in the short term. But they're fundamentally at odds with where customers want to go. And in a market where AI makes custom development increasingly viable, fighting against customer preferences is a losing strategy.

**The Winning Vendors:**
- Started adapting 2-3 years ago
- Have functional MCPs or equivalent interoperability
- Treat data portability as a feature, not a threat
- Compete on quality and intelligence, not friction
- Use usage-based or hybrid pricing models
- View openness as competitive advantage

**The Losing Vendors:**
- Still building moats through data silos
- Implementing performative "integrations"
- Treating APIs as compliance requirements
- Maintaining seat-based pricing
- Resting on existing customer base without innovating
- Not part of AI agent ecosystem

## Connecting to the Bigger Picture

This isn't just about SAAS vendors. It's about how organizations build intelligent systems.

**Siloed Information Prevents Intelligence** ([Siloed Information](/blog/siloed-information-saas-moat))
When data is trapped, organizations can't become intelligent. Vendors that enable data freedom become strategic partners.

**MCPs Are the Technical Solution** ([Model Context Protocols](/blog/model-context-protocols))
This is the infrastructure that makes real interoperability possible.

**Organizations Are Diversifying** ([Multi-Cloud in the AI Era: Strategic Hedging or Complexity Trap?](/blog/cloud-provider-diversification))
Putting all your eggs in one vendor's basket is risky. Vendors that play well with others win.

**Custom Solutions Are Rising** ([Claude Code: The Agentic Tool Everyone is Sleeping On](/blog/claude-code-agentic-tool))
As AI makes custom development easier, SAAS vendors face new competition from in-house tools.

The smart vendors recognize these trends and adapt. The rest double down on lock-in and wonder why growth is slowing.

## The Optimistic Take

Here's what gives me hope:

Some SAAS companies are getting this right. They're embracing data portability, building real APIs, implementing MCPs thoughtfully, and competing on value.

These companies will thrive.

The SAAS model isn't dead. But the version of SAAS built on data lock-in and proprietary formats is dying.

The new version—built on openness, interoperability, and genuine value—is just getting started.

When Intercom launched Fin AI in 2023, they made a counterintuitive move: abandoning their traditional per-seat pricing for a per-resolution model. Instead of charging $39 per support agent, they charged $0.99 per AI-resolved conversation.

It seemed risky. But it aligned perfectly with customer value. Customers care about resolved issues, not how many seats they're paying for.

That's the mindset shift that wins in the AI era: align your business model with customer outcomes, not your internal metrics.

## The Bottom Line

SAAS vendors have a choice:

**Option 1: Double Down on Lock-In**
Keep building moats through data silos, proprietary formats, and performative integrations. Watch as customers increasingly choose build-over-buy or switch to vendors that offer freedom.

**Option 2: Evolve Toward Openness**
Embrace data portability, implement real APIs, support emerging standards like MCPs, and compete on quality rather than friction.

Option 1 is a slow death. Option 2 is the path to thriving in the AI era.

The vendors who evolve will look back on this period as the moment they transformed from "software vendors" to "capability providers."

The ones who don't will be case studies in "how not to respond to platform shifts."

The choice is clear. The question is whether vendors will make it in time.

---

**Related Posts:**
- [Siloed Information: How SAAS Companies Protect Their Moat](/blog/siloed-information-saas-moat)
- [Model Context Protocols: The Connectors That Enable Everything](/blog/model-context-protocols)
- [Multi-Cloud in the AI Era: Strategic Hedging or Complexity Trap?](/blog/cloud-provider-diversification)
- [Claude Code: The Agentic Tool Everyone is Sleeping On](/blog/claude-code-agentic-tool)

---

**TLDR:** "SaaS is dead" is wrong—the SaaS *business model* is transforming. Vendors built lock-in through data silos, proprietary APIs, and limited integrations. The AI era makes silos strategically disadvantageous. Organizations need data freedom, agents that can access any system, and true interoperability. Smart vendors: embrace data portability, build MCP servers instead of proprietary APIs, shift from "software vendor" to "capability provider," and compete on utility not lock-in. Vendors using agent SDKs without solving real data freedom problems are trading one form of lock-in (customer) for another (model provider dependency). Gartner predicts 33% of enterprise apps will include agentic AI by 2028—vendors who don't evolve will become case studies in "how not to respond to platform shifts."

---

**Published:** [Date]
**Word Count:** ~2200 words
**Status:** Complete and production-ready
