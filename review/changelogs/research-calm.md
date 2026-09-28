# research/calm: change log

What happened: rewritten, shorter. New title: "CALM and predicting several tokens at once". Theme new-architectures, status early-research. Words: 590 before, 511 after.

Claims kept, with sources (all from the [paper](https://arxiv.org/abs/2510.27688)): K=4 chunking; >99.9% reconstruction; K-fold fewer steps; 371M to 1.82B models; 44% fewer training and 34% fewer inference FLOPs. The last is now stated as the paper's one comparison (371M CALM vs 281M Transformer, similar BrierLM). Code and checkpoints are MIT-licensed ([GitHub](https://github.com/shaochenze/calm)).

Claims corrected:
- Authors "Tsinghua University, WeChat AI/Tencent" -> WeChat AI (Tencent), with one co-author also at Tsinghua.
- "Energy-based or flow matching heads" -> energy-based head; diffusion and flow matching were tried and did worse.
- "Can't integrate with RLHF" -> the paper's own wording: RL raises log-probabilities, "a quantity that CALM cannot directly compute".

Cut: "30-40% cost reductions across the inference stack", "10x efficiency gains", "potential for much longer context", and the invented history ("attention wasn't supposed to scale past 512 tokens", "every architecture that works at small scale has failed").

Added: DeepSeek-V3's multi-token prediction for speculative decoding as the production analogue (85-90% acceptance, 1.8x speed, [V3 report](https://arxiv.org/abs/2412.19437)). Also added a status line: still one arXiv version, no venue, no larger-scale results found as of September 2026.

Links: /research/4bit-quantization, /research/llm-jepa, /research/nested-learning.

Questions for Randy: none.
