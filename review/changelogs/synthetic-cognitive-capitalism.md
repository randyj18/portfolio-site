# synthetic-cognitive-capitalism: change log

**What happened:** Rewritten. Title shortened to "Synthetic cognitive capitalism" (the old subtitle "The transformer plateau..." was the misreading, so it's gone). Kept Randy's big-picture argument: the local optimum, parallel exploration, why money stays on the measurable curve, content-to-behaviour safety, intelligence as capital, compute as currency, context as leverage, what individuals can do. The post now says up front that it's the most speculative on the site, flags speculation where it occurs, and ends on an open question. Removed Quick Navigation, Back to top links, Bottom Line, TLDR, Related Posts and footer.

**Word count:** 1,995 before (wc); 1,623 after (wc incl. front matter), 1,587 by the checker.

## Claims kept (with sources)
- Sutskever's "age of scaling" to "age of research" framing, now quoted exactly with two more lines ("will go some distance and then peter out"; models "generalize dramatically worse than people"): https://www.dwarkesh.com/p/ilya-sutskever-2
- Sutton on goals and experience, quoted exactly: https://www.dwarkesh.com/p/richard-sutton
- Llion Jones and Sakana's nature-inspired work, linked to Sakana's own pages: https://sakana.ai/evolutionary-model-merge/ , https://sakana.ai/ctm/
- Noam Brown and test-time reasoning, from his own homepage: https://noambrown.com/
- "Compute arbitrage / GPU hours traded like commodities", now with evidence: https://sfcompute.com/ , https://www.silicondata.com/

## Claims corrected (old -> new, source)
- The "transformer plateau" framing of LeCun -> his target is language models that learn by reconstructing their input token by token; his own V-JEPA 2 world model uses transformers for encoder and predictor: https://arxiv.org/html/2506.09985 ; the LLM-JEPA abstract he co-authored: https://arxiv.org/abs/2509.14252
- LeCun "set to launch his own company in late 2025" -> he has started AMI Labs (offices in Paris, New York, Montreal and Singapore): https://amilabs.xyz . I did not use the reported $1.03B raise (only secondary sources) or the FT "dead end" quote (paywalled; seen only via Wikipedia).
- "The consensus among the people who built the current era is striking: the transformer is a productive plateau" -> "a handful of researchers isn't a consensus, though that's what I originally called it"; plateau presented as an open question with METR's data: https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ , https://metr.org/blog/2026-09-22-claude-opus-5-5/
- Noam Brown "creator of Libratus and Cicero" -> co-created Libratus and Pluribus, worked on Cicero at Meta.
- "Compute as currency" as Randy's own phrase -> credited to Sam Altman: https://lexfridman.com/sam-altman-2-transcript/

## Claims cut or softened (why)
- "Trillion-dollar wave of investment": not verified; cut.
- "Data centres... obsolete by the time the concrete dries": softened to "may end up running architectures nobody has designed yet".
- "LeCun and Brown agree on the currency: planning": no source; now "As I read them, the rival research camps... converge on planning".
- "10-person companies with the output of 1,000-person firms": softened to "very small teams doing work that used to take hundreds of people", with "I don't know" on how common or durable.
- "Knowledge capture becomes the primary driver of enterprise value": softened to "a large part of what a company is worth", conditional on the argument holding.
- "Hire humans, use their work to train synthetic systems": kept, but the post now names the consent and ownership questions instead of calling the concern "zero-sum".
- The MLST interview with Llion Jones ("weird ideas") and Sakana's "mandate to move beyond the transformer": not verified; cut.
- Model names "GPT-4, Claude, and Gemini": dropped.

## Update notes added
None; the LeCun update and the plateau evidence are in the body.

## Internal links added
Posts: /blog/ai-budget-democratizing-innovation, /blog/ai-governance-without-theater (fixes the stale "Adaptable Governance" anchor text), /blog/human-ai-collaboration-design, /blog/claude-code-agentic-tool.
Research notes: /research/llm-jepa, /research/early-experience, /research/s1-test-time-scaling, /research/calm, /research/nested-learning.

## Questions for Randy
- Is "synthetic cognitive capitalism" your own coinage? The post says "I call that synthetic cognitive capitalism".
- "When I first wrote..." style admissions: the post says the consensus claim is "what I originally called it". OK to own the correction in first person?
- The firm-model line ("hire people, use their work to train synthetic systems, and compound what they know") is yours; I added that it raises consent and ownership questions and pointed to your role-redesign post. Is that the right stance for you?
- "The same logic is why I expect more software to be sold on outcomes" and the "three things I'd do today" close are built from your original bottom line. Anything you'd change?
- Sutskever is described as "a co-founder of Safe Superintelligence" (from context on the podcast page), and Llion Jones as having co-founded Sakana AI (well documented, but I only confirmed it via Wikipedia). Fine to keep without links?

## Checker
Fixed an unquoted ": " in the description that broke YAML parsing (rephrased without the colon). tools/check-content.mjs (current version): no errors or warnings for this file.
