# model-context-protocols: change log

**What happened:** Rewritten from scratch as the site's canonical, dated MCP explainer. New title "The Model Context Protocol in plain English". Front matter added (topic agents-and-tools, published 2025-11, updated 2026-09). Removed Quick Navigation, Back to top links, the Bottom Line, TLDR, Related Posts list and footer. Dropped the Python pseudocode (the prose walkthrough of one call does the job for this audience). Premise changes (governance, spec, adoption) are handled in the body, so no update note.

**Word count:** 3,284 before (wc, incl. code and nav); 1,657 after (wc incl. front matter), 1,614 by the checker.

## Claims kept (with sources)
- Anthropic released MCP in November 2024: https://www.anthropic.com/news/model-context-protocol
- Two standard transports, stdio and Streamable HTTP: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports
- OAuth-based authorization first added in the 2025-03-26 revision: https://modelcontextprotocol.io/specification/2025-03-26/changelog
- Microsoft's Build 2025 support list and steering-committee membership: https://blogs.microsoft.com/blog/2025/05/19/microsoft-build-2025-the-age-of-ai-agents-and-building-the-open-agentic-web/
- Randy's ideas: the integration tax, "does it have an MCP server?" as the procurement question, function calling vs a standalone server, the order-delay example (fake dates removed), paginate rather than flood context (folded into the design notes), the rollout steps, metadata matters.

## Claims corrected (old -> new, source)
- "Over 16,000 MCP servers deployed" -> "more than 10,000 active public MCP servers" (Dec 2025): https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation
- "8M+ downloads by April 2025" -> 97 million SDK downloads a month (Dec 2025) and "close to half-a-billion" a month (Jul 2026): same Anthropic post; https://blog.modelcontextprotocol.io/posts/2026-07-28/
- "OpenAI (March 2025): MCP in GPT-4 and ChatGPT Enterprise", Google and Microsoft Q1-Q2 claims -> Microsoft's actual Build list, plus Anthropic's December 2025 list of clients (ChatGPT, Gemini, Microsoft Copilot, Cursor, VS Code). OpenAI's March 2025 post on X couldn't be fetched (HTTP 402), so the OpenAI date is left out.
- "JSON-RPC 2.0 over stdio, HTTP, or WebSocket" -> stdio and Streamable HTTP only.
- "Twilio... 25-30% overhead vs direct API calls" -> ~20.5% faster, ~19% fewer API calls, 100% vs ~92% success, ~27.5% higher cost: https://www.twilio.com/en-us/blog/developers/twilio-alpha-mcp-server-real-world-performance
- Block "50-75% time savings... thousands of engineers daily" -> most employees *reported* saving 50 to 75% of their time on common tasks with goose; labelled self-reported: https://goose-docs.ai/blog/2025/04/21/mcp-in-enterprise/
- "Schema evolution is unsolved" -> list-changed notifications and cacheable lists exist, but tools carry no version number: https://modelcontextprotocol.io/specification/2026-07-28/server/tools
- Claude Desktop's "official servers" list (filesystem, GitHub, Drive, Slack, Postgres, SQLite) -> dropped; most were archived.

## Claims cut or softened (why)
- 85% / 14% / 1% scenario probabilities: invented precision (lead's instruction too).
- "2-3 year advantage", "12-18 month window", "left behind" urgency: opinion stated as fact, and the window has passed.
- "10,000 characters you can fit in a prompt": wrong (current models take up to 1M tokens).
- "GitHub MCP topic shows 400+ repositories", unnamed fintech/healthcare adopters, "MCP integration specialist" job-title prediction: unverified or trivial.
- Result-size tiers (<10KB, 10KB to 1MB, >1MB): not in the spec.
- Step 3, "Build Internal AI Interfaces That Use MCP" / "don't rely on third-party chat UIs": removed on the lead's instruction (it contradicted build-vs-buy-agentic-ai). Replaced with "connect servers to the assistants your people already use; buy first".

## Added (new, verified)
- Governance: donation to the Agentic AI Foundation under the Linux Foundation, Dec 2025: https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation
- The 2026-07-28 spec (no protocol sessions, header routing, explicit handles, Tasks extension): https://blog.modelcontextprotocol.io/posts/2026-07-28/
- Google's 50+ managed MCP servers (Apr 2026): https://cloud.google.com/blog/products/ai-machine-learning/google-managed-mcp-servers-are-available-for-everyone
- Registry still a preview: https://modelcontextprotocol.io/registry/about
- Security section: Invariant Labs tool poisoning (Apr 1, 2025) https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks ; CVE-2025-6514 in mcp-remote, CVSS 9.6, fixed in 0.1.16 (Jul 9, 2025) https://jfrog.com/blog/2025-6514-critical-mcp-remote-rce-vulnerability/ ; fake postmark-mcp package (Sept 25, 2025) https://postmarkapp.com/blog/information-regarding-malicious-postmark-mcp-package ; OWASP MCP Top 10 (beta) https://owasp.org/www-project-mcp-top-10/

## Update notes added
None; the changes are in the body.

## Internal links added
/blog/siloed-information-saas-moat, /blog/agentic-ai-interoperability, /blog/metadata-matters, /blog/build-vs-buy-agentic-ai. (Resolved the three `[LINK: ...]` placeholders by dropping them; the broken "The Future (3-5 Year Outlook)" anchor went with the Quick Navigation block.)

## Questions for Randy
- The post says "When I first wrote about MCP in November 2025, I guessed it would take three to five years to become standard infrastructure." That's from the original text ("In 3-5 years, MCP... will likely be standard infrastructure"); OK to keep in first person?
- Have you built or used MCP servers yourself? A first-hand example would strengthen the "Where I'd start" section.
- "I'd make MCP support a line item in every software evaluation" and "I think that trade is usually worth making for internal work" are phrased as your views, based on the original's positions. Agree?

## Checker
tools/check-content.mjs (current version): no errors or warnings for this file.
