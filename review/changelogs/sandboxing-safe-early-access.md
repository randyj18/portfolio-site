# sandboxing-safe-early-access: change log

## What happened
Rewritten.
- Old title: "Sandboxing: Safe Early Access to AI Tools".
- New title: "Safe early access to new AI tools".
- Kept: the reframe ("how do we let people test it safely"), the five sandbox components, the kids'-account analogy, the specialization argument, the cross-functional team with a one-month mandate, the 8-week plan and the Kosmos test.

## Claims kept, with sources
- Samsung: three incidents in which semiconductor staff put source code and a meeting transcript into ChatGPT, followed by an upload cap. https://www.ciodive.com/news/Samsung-Electronics-ChatGPT-leak-data-privacy/647137/
- Prompt injection definition. https://genai.owasp.org/llmrisk/llm01-prompt-injection/
- IBM 2026 Cost of a Data Breach: 1 in 4 malicious breaches AI-enabled; >20% of organizations reported a breach targeting AI models or apps. https://newsroom.ibm.com/2026-07-29-ibm-study-one-in-four-malicious-breaches-are-ai-enabled,-costing-companies-6-million-on-average
- NANDA: 40% of companies had an official LLM subscription vs workers at 90%+ using personal tools; ~90 days pilot-to-implementation for top mid-market firms vs 9+ months for enterprises. https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf
- Microsoft Foundry private endpoint documentation (updated Aug 2026). https://learn.microsoft.com/en-us/azure/foundry/how-to/configure-private-link
- Kosmos (Nov 2025, up to 12 hours, $200/run at launch): https://edisonscientific.com/news/announcing-kosmos
- Kosmos 79.4% of report statements judged accurate: https://arxiv.org/abs/2511.02824

## Claims corrected
- "Prompt injection" was described as employees pasting data into chat. That was data leakage; the post now uses the OWASP definition.
- Samsung "April 2023, three incidents in 20 days" -> "in 2023, three separate incidents". The 20-day detail came only from search snippets and was left out.
- Kosmos "79.4% accuracy on complex scientific tasks" -> 79.4% of statements in its reports judged accurate. "Just launched" is now dated November 2025.
- "AWS Bedrock Studio" and "Azure Private Link" -> one current example, Microsoft Foundry private endpoints. Bedrock Studio was renamed in Dec 2024.
- Timeline inconsistency (7-14 vs 12-14 months) -> "by my rough estimate... seven months to a year".

## Claims cut or softened
- "AI security breaches increased 49%": no primary source.
- "87% of AI projects never reach production": traced to a 2019 VentureBeat partner piece.
- "95% fail to deliver ROI": misread NANDA.
- "procurement takes 3-18 months": unverified.
- gVisor/Firecracker: accurate but unnecessary.
- The TLDR's "100 employees in 2 months".
- "existential risk" framing, Quick Navigation, Bottom Line, TLDR, Related Posts.

## Update notes added
None; current facts are in the body.

## Internal links added
- /blog/shadow-ai-organizational-intelligence
- /blog/build-vs-buy-agentic-ai (replaces the old custom-chat-interfaces link)
- /blog/ai-budget-democratizing-innovation
- /blog/duplicated-solution-problem

## Questions for Randy
- Original: "I've watched this play out dozens of times." Kept as "I've watched this play out many times." In what roles? Has he built or sponsored a sandbox, and what happened?
- Original: "But here's what I've learned: the cost of being too slow is starting to outweigh the cost of these risks." Kept as an opinion ("I think the bigger risk is the year spent deciding").
- Is the Kosmos example still the one he'd use, or does he have a more recent tool he'd test his process against?

## Word count
~2,200 before, 973 after.
