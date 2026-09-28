# cloud-provider-diversification: change log

## What happened
Rewritten and merged. Absorbs multi-cloud-ai-strategy-2025 (the lead handles the redirect).
- Old title: "Multi-Cloud in the AI Era: Strategic Hedging or Complexity Trap?"
- New title: "When multi-provider AI is worth the premium"
- Topic: vendors-and-platforms.

Rebuilt around the September 2026 reality: multi-model no longer requires multi-cloud, and there are three separate layers to abstract (model API, tools/data via MCP, people).

Kept from this post:
- the lock-in taxonomy, especially human dependency
- depth vs breadth
- leverage only if switching is real
- the months-of-spend test
- "The worst strategy is accidentally locking yourself in"

Kept from multi-cloud-2025:
- the insurance framing
- the exposure questions (48-hour outage, 40% price rise, a week without AI)
- the "10% better isn't enough, 2x might be" test
- the routing options
- "if you're buying, keep infrastructure simple"

Word count: before 2,872 (this post) + 4,102 (multi-cloud-2025), both measured with `wc -w` on the original files. After: 1,415 (checker count).

## Claims kept or added (with sources)
Lock-in examples:
- Anthropic recommends XML tags. [prompting guide](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- Anthropic's newer tokenizer produces about 30% more tokens for the same text. [pricing](https://platform.claude.com/docs/en/about-claude/pricing)

Cross-cloud availability:
- Microsoft-OpenAI amendment, 27 Apr 2026: Microsoft's licence became non-exclusive; OpenAI can sell on any cloud; ships first on Azure. [Microsoft](https://blogs.microsoft.com/blog/2026/04/27/the-next-phase-of-the-microsoft-openai-partnership/)
- Bedrock lists GPT-6/5.6, Claude, Llama, Mistral, DeepSeek, Qwen, Grok; Gemma but not Gemini. [AWS model list](https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html)
- GPT-6 Astra generally available on Bedrock, 8 Sep 2026. [AWS](https://aws.amazon.com/about-aws/whats-new/2026/09/openai-gpt-6-astra-on-amazon-bedrock/)
- Foundry sells OpenAI, Grok, MAI, Llama, Mistral. [Microsoft Learn](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure)
- Claude generally available on Foundry, June 2026. [Azure](https://azure.microsoft.com/en-us/blog/claude-in-microsoft-foundry-is-now-generally-available/)
- Google's platform (formerly Vertex AI) has Gemini and Claude; from OpenAI only gpt-oss. [Google](https://cloud.google.com/products/gemini-enterprise-agent-platform), [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing), [Google docs](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/maas/openai)
- Same model, different terms: Claude fast mode is first-party only; regional endpoints cost 10% more on Bedrock and Google Cloud. [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing)

Other:
- MCP adoption (ChatGPT, Gemini, Microsoft Copilot, VS Code); governed by the Agentic AI Foundation since Dec 2025. [Anthropic](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
- Menlo Ventures: OpenAI's share of enterprise LLM API spend fell from ~50% (2023) to 27% (2025); Anthropic's rose to 40%. [Menlo](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/)

## Claims corrected
- MCP is no longer described as a provider-switching layer. It is the tool/data layer and keeps integrations portable when you switch models; the model API needs its own thin layer.
- "Claude 72.5% SWE-bench vs GPT-4 54.6%" (and "Sonnet 4.5: 72.5%" in multi-cloud-2025): cut. They were misattributed (Opus 4 and GPT-4.1 scores), and benchmarks aren't needed for the argument.

## Cut or softened
- Removed the whole price table. GPT-4o was wrong at $3 (it's $2.50), the Gemini Flash price was wrong, and the Opus 4.1 and Llama 2 entries are outdated.
- "92% multi-cloud": no source found.
- "$8.4B" opener: not needed.
- "37% spend >$250K": unsourced.
- The GPT/Claude latency figures (0.56s vs 1.23s): unsourced.
- The "three companies... $40K" migration story (and the $25K-$40K variant): unsourced.
- The "$100K/month switcher", the "$800K software company" anecdote and the "one CFO's quote": unsourced.
- The 20-30% vs 10-15% discount figures, now "concentrated spend usually earns better terms; I don't have figures I'd trust".
- The 10-30% premium and the 70/15/15 path split: unsourced.
- EU AI Act "took full effect Aug 2024": wrong, and dropped. Regulation is now a generic "check your framework".
- The "OpenAI 36-hour outage, March 2024": no record found.
- The "5,000-10,000 hours / $750K-1.5M per provider" estimate: implausible.
- Synechron, BKW, LangChain "1000s of integrations", ONNX: dropped.
- The multi-cloud-2025 TCO model ($484K vs $629K), replaced with one labelled example: 40 hours a month x $150 = $72K a year. Its leverage example is dropped; its own inputs netted -5% to 0%, not +5-10%.

## Update notes
None. The body is rewritten for September 2026 ("As of September 2026" on the availability list).

## Internal links
- /blog/model-context-protocols
- /blog/build-vs-buy-agentic-ai
- /blog/copilot-microsoft-play

## Checker
No errors or warnings for this file.

## Questions for Randy
1. Have you lived through a provider switch yourself? A real story would replace the unsourced migration anecdotes.
2. Is the "six months of spend = locked in, under a month = fine" test still your view? It's kept as yours.
3. I framed the cross-cloud availability as a hedge that still needs parity testing, and ended on whether it will last. OK with that position?
