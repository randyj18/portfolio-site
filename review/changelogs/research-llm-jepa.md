# research/llm-jepa: change log

What happened: rewritten. New title: "LLM-JEPA and LeCun's bet on predicting meaning". Theme new-architectures, status early-research. Words: 722 before, 699 after.

Claims kept, with sources (all from the [paper](https://arxiv.org/abs/2509.14252) unless noted):
- Hybrid objective: next-token plus embedding prediction, with [PRED] tokens.
- Needs paired views.
- 1B to 8B models.
- Extra training compute: 3x in v1, about 2x in v2 (Oct 2025).
- ICLR 2026 acceptance ([poster](https://iclr.cc/virtual/2026/poster/10010475)).

Claims corrected:
- Authors -> Huang (Atlassian), LeCun (NYU), Balestriero (Brown). The paper has no Meta affiliation.
- Vision evidence "10x / 2.5x / 5x" -> kept only I-JEPA's "over 10x more efficient than MAE", attributed to that one comparison ([I-JEPA](https://arxiv.org/abs/2301.08243)).
- "Meta is betting billions on this vision" -> LeCun left Meta. He announced it on Nov 19 2025 ([LinkedIn](https://www.linkedin.com/posts/yann-lecun_as-many-of-you-have-heard-through-rumors-activity-7397020300451749888-2lhA)), and AMI Labs raised $1.03B in March 2026 ([TechCrunch](https://techcrunch.com/2026/03/09/yann-lecuns-ami-labs-raises-1-03-billion-to-build-world-models/)).

Cut:
- "10-100x training cost reduction" and "$100M to $1-10M": not in the paper.
- "GPT-4 estimated at $100M+": we couldn't fetch the Wired source.
- "Offset by faster convergence".
- LeCun's "three to five years" Davos quote. The TechCrunch URL contains "paradigm", which trips the checker, and the WEF page was blocked.

Added "Since then": AMI Labs; Semantic Tube Prediction ([arXiv 2602.22617](https://arxiv.org/abs/2602.22617)); V-JEPA 2 robot planning ([arXiv 2506.09985](https://arxiv.org/abs/2506.09985)); no JEPA objective in a production LLM that I know of.

Links: /blog/synthetic-cognitive-capitalism (anchor "plateau rather than the end point"), /research/multimodal-world-models, /research/calm, /research/nested-learning.

Questions for Randy:
- Kept your "'works' doesn't mean 'optimal'" and "don't wait for it" positions. The link to synthetic-cognitive-capitalism assumes that post (being rewritten) still argues the transformer-plateau point. Worth checking once it's final.
