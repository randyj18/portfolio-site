---
title: The orchestration gap that MCP doesn't close
description: MCP gives agents access to your systems. Multi-step work across them needs state, recovery and coordination, and most of that is still yours to build.
topic: agents-and-tools
published: 2025-11
updated: 2026-09
---

Most of the agent integration story in 2025 was about access. The [Model Context Protocol](/blog/model-context-protocols) made it much easier for an AI agent to reach your CRM, your order system and your documentation, and that was real progress. But access is the easy half. The hard half is getting an agent to finish a multi-step job across those systems: keep track of where it is, recover when step five times out, undo step three when step six fails, and hand a person a clean summary when it gets stuck. That's orchestration, and I think it's where a lot of agentic pilots stall.

The surveys are consistent with this, though none of them measured it directly. In [UiPath's 2025 report](https://www.uipath.com/newsroom/agentic-ai-report-findings), a survey of 252 US IT executives, 87% said interoperability between different AI technologies was essential or significant, and lack of integration with other business applications was the top limitation of the AI tools they already had. In a separate [Deloitte pulse check](https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/blogs/pulse-check-series-latest-ai-developments/ai-adoption-challenges-ai-trends.html), nearly 60% of AI leaders named integrating with legacy systems, along with risk and compliance, as their main challenges in adopting agentic AI. [MIT's NANDA group](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf), looking at why generative AI pilots stall, found custom tools failing on "integration complexity and lack of fit with existing workflows", although it named the deeper problem as learning: systems that don't retain feedback or adapt. Reading all of that as an orchestration problem is my interpretation, and I've written separately about [why pilots stall](/blog/pilot-purgatory-ai-projects) more generally.

## What MCP covers and what it leaves to you

MCP handles discovery, authentication and the tool call itself. The [current spec](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) is explicit about what it doesn't hold. The protocol has no session, so a server that needs to remember something between calls hands back a handle, and errors come back in a form the model can use to correct itself and retry. Everything above a single call belongs to whatever runs the workflow.

Take a support escalation: look up the customer in the CRM, check the order database, search the documentation, apply a fix, escalate anything unusual, log the interaction and send a confirmation. MCP can give an agent access to every one of those systems. It says nothing about the order of the steps, what to record after each one, how long to wait on a slow API, when to retry, how to reverse the fix when the confirmation fails, or what happens when two agents pick up the same case.

## What the missing layer needs

The pieces orchestration has to supply are familiar from ordinary software, which is part of why the gap is easy to miss:

- State: which step a run is on, what it has gathered and what is pending, kept outside the model's context window.
- Recovery: detecting failures, deciding whether a retry makes sense, backing off, and keeping partial progress.
- Transactions: when step four of seven fails, something has to decide whether to undo the earlier steps, retry or pause for a person. Traditional systems use transaction managers and compensating actions (the saga pattern) for this.
- Coordination: locks and conflict rules for when several agents touch the same records.
- Context: what to keep and what to summarize as a long run piles up data.
- Observability: what every run is doing now, where runs get stuck, and how often each kind of workflow succeeds.

Calling MCP the solution to AI integration is a bit like calling HTTP the solution to web applications. HTTP was necessary, but nobody shipped a web application on HTTP alone. They also needed application servers, databases, caches and load balancers.

## Patterns I'd use

Give the workflow explicit states and deterministic rules for moving between them. The model does the work inside a state; code decides the transitions. VOICE-Relay, one of the demos on my [playground](/playground), uses states like `INITIATED`, `DATA_GATHERING`, `VALIDATION`, `EXECUTION`, `CONFIRMATION` and `COMPLETED` this way. Predictable transitions stop one confused step from cascading into the next.

Make each step safe to run twice, and save a checkpoint after each one. If step four fails, resume from checkpoint three instead of paying to redo the first three steps.

Put a circuit breaker in front of each external system. Track its failures, and when it's failing often (say, more than three of the last ten calls), stop calling it for a while: return cached data or escalate, then try again later. One flaky dependency then degrades a few runs instead of all of them.

When the agent hits ambiguity or an error it can't handle, escalate with context: the current state, the steps so far, the relevant data and the options. The person can decide quickly and the run can resume where it stopped.

Between agents, prefer events to direct calls. When one agent finishes, it publishes an event and the next picks it up. That keeps them loosely coupled and asynchronous, and it scales more gracefully than agents calling each other.

Start with bounded workflows of three to five steps, with clear success criteria and failure modes you understand. Pull shared pieces (state storage, retry logic, circuit breakers, escalation routing) into common code once you've built the same thing twice, and not before. Put observability in from the first workflow, because without it debugging is guesswork. If you expect to run several agents later, design for events and locking now, since retrofitting them is harder.

Good coding agents already work this way internally. [Claude Code](/blog/claude-code-agentic-tool), for example, plans, edits, runs the tests, reads the failures and tries again, which is a small orchestration loop with state and recovery built in.

## What has changed since November 2025

When I first wrote this, I guessed orchestration frameworks would emerge within 12 to 18 months and shared standards within 24 to 36. The first half arrived roughly on schedule:

- [LangGraph 1.0](https://www.langchain.com/blog/langchain-langgraph-1dot0), released in October 2025, saves a run's state so it picks up where it left off after a restart, supports checkpoints, and can pause for human approval.
- [AutoGen is now in maintenance mode](https://github.com/microsoft/autogen), and Microsoft points new users to [Microsoft Agent Framework](https://github.com/microsoft/agent-framework), which has graph-based workflows, checkpointing and human-in-the-loop steps.
- For agents talking to other agents, A2A, the protocol Google started and [handed to the Linux Foundation](https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents) in June 2025, [reached version 1.0](https://github.com/a2aproject/A2A/releases) in March 2026.
- MCP itself added a [Tasks extension](https://blog.modelcontextprotocol.io/posts/2026-07-28/) for long-running work.

Integration still sits near the top of the survey lists. UiPath, which sells orchestration software and so has a stake in the answer, found in [a mid-2026 survey of 590 executives and IT practitioners](https://ir.uipath.com/news/detail/463/stuck-in-agentic-ai-pilot-purgatory-uipath-survey-points-to-orchestration-as-key-to-scaling-enterprise-deployments) that integration with existing workflows and systems was the second most cited obstacle to deploying agents (37%), just behind data quality (38%).

As far as I can see, there's still no shared way to define a workflow, its state and its recovery rules across vendors. A workflow built in LangGraph lives in LangGraph. So the gap has changed shape. You no longer have to build orchestration from scratch, but you do have to choose a framework, and that choice is its own kind of lock-in. The reasoning in [build versus buy](/blog/build-vs-buy-agentic-ai) applies here too.

I don't know whether a cross-vendor workflow standard will emerge, or whether orchestration will stay inside frameworks and platforms for good. Until that's clearer, I'd keep workflows small, make every state transition visible, and choose the framework I'd be least unhappy to be stuck with.
