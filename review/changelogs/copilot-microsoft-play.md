# copilot-microsoft-play: change log

## What happened
Rewritten with a substantial update.
- Old title: "Understanding Copilot: Microsoft's Play and What It Means"
- New title: "What Microsoft is really selling with Copilot"
- Topic: vendors-and-platforms.
- An "as of September 2026" line sits near the top.

Kept:
- the four-layer strategy (moat, workflow capture, behavioural data, platform control)
- the interface-layer thesis, now the centre of a "Microsoft as model broker" section
- the upside and the trade-offs
- the alternatives
- the questions for Microsoft, updated for models, EU Data Boundary, credits and Agent 365

Word count: before 2,110 (`wc -w` on the original file). After: 1,436 (checker count).

## Claims kept, corrected or added (with sources)
Product and pricing:
- Rename to "Microsoft Copilot". [Microsoft Learn](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy)
- Tier table, as of Sept 2026, all Microsoft pages:
  - Copilot Chat at no additional cost [enterprise](https://www.microsoft.com/en-us/microsoft-365-copilot/enterprise)
  - M365 Copilot $30/user/month paid yearly [enterprise](https://www.microsoft.com/en-us/microsoft-365-copilot/enterprise)
  - Copilot Business $21, $18 promotional to 31 Dec 2026 [pricing](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing)
  - Copilot Studio $200 per 25,000 credits a month [Copilot Studio](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/copilot-studio)
  - E7 $99 and Agent 365 $15 [blog](https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/)

Adoption, labelled as Microsoft's own figures:
- "100M MAU / over 60% of Fortune 500" -> 30M+ paid M365 Copilot seats by June 2026 [Microsoft](https://news.microsoft.com/source/2026/07/29/microsoft-cloud-and-ai-strength-fuels-fourth-quarter-results-4/) and 90% of the Fortune 500 [Microsoft](https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/)

Models, "GPT-4/GPT-5 plus some Claude; no model choice" -> Microsoft as broker:
- GPT-5.6 "preferred model", July 2026 [TechCrunch](https://techcrunch.com/2026/07/09/openai-says-gpt-5-6-is-the-preferred-model-for-microsoft-copilot-amid-breakup-chatter/)
- OpenAI-operated models as a subprocessor, on by default from 24 Jul 2026 [Learn](https://learn.microsoft.com/en-us/microsoft-365/copilot/openai-subprocessor)
- Anthropic models on by default outside EU/EFTA/UK [Learn](https://learn.microsoft.com/en-us/microsoft-365/copilot/connect-to-ai-subprocessor)
- Claude in mainline chat (Frontier) and Copilot Cowork built with Anthropic [Microsoft](https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/)
- Admin and user choice [Learn](https://learn.microsoft.com/en-us/microsoft-365/copilot/connect-to-ai-subprocessor)
- Microsoft may deploy its own hosted models [Learn](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy)

Data and privacy:
- EU Data Boundary carve-outs: Anthropic models excluded from the EU Data Boundary and in-country processing; OpenAI-operated models are inside the boundary but excluded from in-country; "with data retention" models keep data up to 30 days and are off by default. [Learn](https://learn.microsoft.com/en-us/microsoft-365/copilot/connect-to-ai-subprocessor), [Learn](https://learn.microsoft.com/en-us/microsoft-365/copilot/openai-subprocessor)
- "Largest investor in OpenAI": dropped. Replaced with the April 2026 non-exclusive licence. [Microsoft](https://blogs.microsoft.com/blog/2026/04/27/the-next-phase-of-the-microsoft-openai-partnership/)
- No training on prompts, responses or Graph data; Copilot only surfaces what users can view. [Learn](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy)
- "Interaction history is non-portable" -> history is stored in the tenant, admins can search and manage it (Content search, Purview, retention), and users can delete it. Same Learn page.

ROI and time saved:
- "ROI 116% to 353%" -> 116% from a Forrester study commissioned by Microsoft (composite enterprise, 3 years), labelled as commissioned. [Forrester](https://tei.forrester.com/go/microsoft/M365Copilot/) The 353% (a separate SMB projection) is cut: I couldn't open it.
- "10-15 hours per week" -> the UK cross-government experiment: 20,000 civil servants, Sep-Dec 2024, 26 minutes/day self-reported. [GOV.UK](https://www.gov.uk/government/publications/microsoft-365-copilot-experiment-cross-government-findings-report)

## Cut or softened
- The "meta-learning" point (Microsoft learns which features and workflows matter) is now marked as my assumption.
- "Copilot is early / wait 1-2 years" becomes "pilot with a few teams".
- "On-premise: No" becomes a question to ask Microsoft (not re-verified).
- "EU Data Boundary compliance" is now stated with the carve-outs.
- The TLDR, Quick Navigation and "This isn't a critique... It's education" framing are gone.
- Price-rise claim: I did not cite the reported July 2026 M365 suite price rise (reseller sources only). The post says renewals are negotiated from a weak position once workflows depend on it.

## Update notes
No blockquote. There's a plain "The details below are as of September 2026" line after the opening paragraph, as the lead suggested.

## Internal links
- /blog/cognitive-enterprise-microsoft-roadmap
- /blog/cloud-provider-diversification
- /blog/build-vs-buy-agentic-ai

## Checker
One warning ("section opens with a question") on the questions list. Fixed with a lead-in sentence. Now clean.

## Questions for Randy
1. Have you evaluated or rolled out Copilot yourself (at work or for clients)? A line from real use would anchor the post; none was added.
2. The ending asks whether Microsoft's model menu stays generous once switching costs are high. Is that the open question you'd pose?
3. Should the tier table stay? It dates the post. The alternative is dropping it and linking Microsoft's pricing page.
