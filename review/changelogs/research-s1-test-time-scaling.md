# research/s1-test-time-scaling: change log

What happened: rewritten. New title: "The s1 recipe for making models think longer". Theme cheaper-models, status published-result. Words: 755 before, 673 after.

Claims kept (all from the [paper](https://arxiv.org/abs/2501.19393)): 1,000 curated examples; 26 minutes on 16 H100s; budget forcing with "Wait"; beats o1-preview by up to 27% on MATH/AIME24; 50% to 57% on AIME24; plateau after about six forced continuations; r1-32B stronger with 800x more data.

Claims corrected:
- "Frontier AI for $50" / "replicated o1 for $20-50" -> it reproduced o1's test-time scaling curve on top of Qwen2.5-32B, with traces from Gemini 2.0 Flash Thinking (about 7 GPU-hours).
- "'Wait' semantically signals doubt / triggers verification" -> 53.3% vs 50.0% on AIME24 is one question out of 30, and "Wait" ties "Hmm" on MATH500 and GPQA (Table 4).
- "DeepSeek-R1: $5.5M in training" -> that was V3's final run. The DeepSeek detail now lives in /research/deepseek-r1.
- Venue: EMNLP 2025. The award is phrased as the first author lists it ([homepage](https://muennighoff.com/)).

Cut: o1 "millions in development", "cost curve collapsing 2-3 orders of magnitude... within months", the test-time vs training-time bullet lists, "What this means for organizations".

Added "Since then": s1.1 ([GitHub](https://github.com/simplescaling/s1)); thinking budgets in Claude 3.7, Gemini 2.5 Flash and Qwen3; the 2026 shift to effort levels ([Claude release notes](https://platform.claude.com/docs/en/release-notes/overview), [Gemini docs](https://ai.google.dev/gemini-api/docs/gemini-3)); Gemini Deep Think IMO gold; inverse-scaling finding ([arXiv 2507.14417](https://arxiv.org/abs/2507.14417)).

Links: /research/deepseek-r1, /research/synthetic-data.

Questions for Randy:
- I kept your first-person bet ("domain expertise, data quality and application design matter more than model access") and added "then, and still". Is that right?
