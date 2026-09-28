# agentic-ai-interoperability: change log

**What happened:** Rewritten. New title "The orchestration gap that MCP doesn't close" (about the idea, not a statistic). Kept Randy's argument (MCP solves connectivity, not orchestration), his list of missing pieces, the HTTP analogy and all five patterns. Cut the MCP recap to two sentences plus a link to model-context-protocols. Added a dated section scoring his November 2025 prediction against what happened. Removed Quick Navigation, Back to top links, the Bottom Line, TLDR, Related Posts list and footer.

**Word count:** 2,168 before (wc); 1,277 after (wc incl. front matter), 1,235 by the checker.

## Claims kept (with sources)
- MCP has no protocol-level session; state goes in explicit handles; errors come back so the model can self-correct: https://modelcontextprotocol.io/specification/2026-07-28/server/tools
- Randy's patterns: explicit state machines, idempotent steps with checkpoints, circuit breakers, escalation with context, event-driven coordination; bounded 3-to-5-step workflows; abstract after repetition; observability from day one; design for multi-agent early.
- The support-escalation example (steps as listed in the original; I dropped the "8-step" count because the original listed seven).

## Claims corrected (old -> new, source)
- Title and opening "87% of organizations rate interoperability as crucial" -> UiPath 2025 report, 252 US IT executives: 87% said interoperability between different AI technologies is "essential or significant"; top limitation was lack of integration with other business applications: https://www.uipath.com/newsroom/agentic-ai-report-findings
- "yet 60% cite integration with legacy systems as their primary obstacle" -> presented separately as a different survey: Deloitte pulse check, nearly 60% named legacy integration *and* risk/compliance as main challenges: https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/blogs/pulse-check-series-latest-ai-developments/ai-adoption-challenges-ai-trends.html
- "88-95% of agentic AI pilots stall" in the orchestration gap -> MIT NANDA's finding that custom tools stall on "integration complexity and lack of fit with existing workflows", with learning as the deeper cause; the orchestration reading is labelled as Randy's interpretation: https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf
- "Basic workflow tools (LangChain, AutoGen, CrewAI) but no standards" and "multi-agent coordination standards don't exist" -> LangGraph 1.0 (Oct 2025, durable execution, checkpoints, human approval) https://www.langchain.com/blog/langchain-langgraph-1dot0 ; AutoGen in maintenance mode, Microsoft Agent Framework https://github.com/microsoft/autogen , https://github.com/microsoft/agent-framework ; A2A to the Linux Foundation (Jun 2025) and v1.0 (Mar 2026) https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents , https://github.com/a2aproject/A2A/releases ; MCP Tasks extension https://blog.modelcontextprotocol.io/posts/2026-07-28/
- (The brief mentioned Twilio numbers for this post; the original interop post didn't use Twilio. The Twilio correction is in model-context-protocols.)

## Claims cut or softened (why)
- "16,000+ servers, 8M+ downloads" (4x): unverified; left to the MCP post.
- "within 3-6 months", "for 80% of use cases": invented precision.
- ">30% over 10 requests" circuit-breaker threshold: kept as a labelled example ("say, more than three of the last ten calls").
- "That's the current state... in late 2025": replaced by the dated update section.

## Added (new, verified)
- UiPath's own 2026 survey (590 respondents; integration with existing workflows and systems 37%, data quality 38%), flagged as coming from a vendor that sells orchestration: https://ir.uipath.com/news/detail/463/stuck-in-agentic-ai-pilot-purgatory-uipath-survey-points-to-orchestration-as-key-to-scaling-enterprise-deployments
- Coding agents (Claude Code) as an example of orchestration handled inside one product.

## Update notes added
None as blockquotes; the section "What has changed since November 2025" carries the update in the body.

## Internal links added
/blog/model-context-protocols, /blog/pilot-purgatory-ai-projects, /blog/claude-code-agentic-tool, /blog/build-vs-buy-agentic-ai. Also /playground (VOICE-Relay lives there; /playground/voice-relay isn't an allowed link target for the checker).

## Questions for Randy
- VOICE-Relay: the post keeps the original claim that it uses explicit states (INITIATED, DATA_GATHERING, VALIDATION, EXECUTION, CONFIRMATION, COMPLETED), now phrased "VOICE-Relay, one of the demos on my playground, uses states like...". Is that accurate? The playground describes VOICE-Relay as an end-to-end encrypted voice relay and says the demo "is being prepared for deployment". The original also cited Game Card Creator; I dropped it (no detail to support it). Add it back if you want.
- "The patterns I'd use": the original said "Building production agentic systems reveals several effective orchestration patterns". I kept them as your recommendations, not as production experience. Which of them have you used in production?
- "When I first wrote this, I guessed orchestration frameworks would emerge within 12 to 18 months and shared standards within 24 to 36" is from the original. OK in first person?
- The closing advice ("choose the framework I'd be least unhappy to be stuck with") is my phrasing of your build-vs-buy stance. Agree?

## Checker
tools/check-content.mjs (current version): no errors or warnings for this file.
