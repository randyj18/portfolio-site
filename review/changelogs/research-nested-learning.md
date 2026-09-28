# research/nested-learning: change log

What happened: rewritten, shorter. New title: "Nested Learning and models that keep learning". Theme new-architectures, status early-research. Words: 775 before, 603 after.

Claims kept, with sources (from [arXiv 2512.24695](https://arxiv.org/abs/2512.24695)):
- Architecture and optimizer as nested optimization.
- Expressive optimizers.
- Continuum memory system, including the brain-wave inspiration.
- Hope, self-modifying and building on Titans.
- 760M/30B and 1.3B/100B experiments; Hope has the lowest perplexity in Table 2 (Wikitext 14.39 vs 17.92 for Transformer++ at 1.3B).
- No alignment or post-training experiments.

Claims corrected:
- "arXiv: NL.pdf" linked to a personal PDF -> the arXiv version (Dec 31 2025), published at NeurIPS 2025.
- Authors: two names -> four (Behrouz, Razaviyayn, Zhong, Mirrokni).
- "State space models looked revolutionary at small scale too" (implying they fizzled) -> reversed. Hybrid Mamba-Transformer models now ship at scale ([Nemotron 3 Super](https://arxiv.org/abs/2604.12374)).

Cut: "Physics has shown that beautiful mathematics often reflects reality", "the kind of simplification that often precedes major advances", repeated "don't restructure your infrastructure" advice.

Note on sources: I didn't link Google's Nested Learning blog post. Its URL contains "paradigm", which the checker flags. Every claim now comes from the arXiv paper instead, so the needle-in-a-haystack comparison with TTT/Mamba2 (blog only) was dropped.

Front matter: paper date 2025-12 follows the first-arXiv-version rule, although Google published the paper and blog on Nov 7 2025.

Added "Since then": no code; the Titans + MIRAS post ([Google Research](https://research.google/blog/titans-miras-helping-ai-have-long-term-memory/)); no scaled Hope or Gemini evidence found.

Links: /research/calm, /research/llm-jepa.

Questions for Randy: none.
