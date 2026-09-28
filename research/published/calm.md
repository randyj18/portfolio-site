---
title: CALM and predicting several tokens at once
description: Tencent's CALM predicts one vector that stands for four tokens, matching a baseline with about a third less compute at small scale. Nobody has shown yet that it scales.
theme: new-architectures
status: early-research
papers:
  - title: "Continuous Autoregressive Language Models"
    url: https://arxiv.org/abs/2510.27688
    authors: Shao et al. (WeChat AI, Tencent; Tsinghua University)
    date: 2025-10
published: 2025-11
updated: 2026-09
---

Language models write one token at a time, and every token costs a full pass through the model. CALM (Continuous Autoregressive Language Models), from Tencent's WeChat AI with a co-author at Tsinghua University, tries to put more into each step.

It works in two stages. First, an autoencoder learns to compress a chunk of K tokens into a single continuous vector, and to rebuild the tokens from that vector with over 99.9% accuracy. Then a language model learns to predict the next vector instead of the next token, so generating text takes K times fewer steps. The main experiments use K = 4.

Predicting a continuous vector means there is no probability for each possible next token, and much of the usual toolkit depends on those probabilities. The authors built replacements: an energy-based output head that produces the next vector in a single step (they also tried diffusion and flow-matching heads, which need several sampling steps and did worse), an evaluation metric called BrierLM because perplexity can't be computed, and a way to control sampling without likelihoods.

The experiments are small. The models range from 371 million to 1.82 billion parameters, trained on about 230 billion tokens from the Pile. The headline comparison is that the 371M CALM model matched the BrierLM score of a 281M standard Transformer with 44% fewer training FLOPs and 34% fewer inference FLOPs. The code and checkpoints are [on GitHub](https://github.com/shaochenze/calm) under an MIT licence.

## Why I think it matters

CALM asks a good question: whether each generation step should carry a single token or a bigger unit of meaning. If the answer holds at scale, text could be generated in fewer, richer steps, and inference would get cheaper.

I wouldn't plan around it yet. What I'd watch for is a result at tens of billions of parameters with quality intact, and a way to do reinforcement learning without token probabilities. The paper is candid about the second problem: reinforcement learning methods usually work by "increasing the log-probability of rewarded samples, a quantity that CALM cannot directly compute." The same gap makes distillation from a larger teacher model harder. Until those are solved, the proven savings come from [quantization](/research/4bit-quantization), mixture-of-experts models and speculative decoding.

A related idea has reached production in a simpler form. DeepSeek-V3 trains with a multi-token prediction objective and reuses that part of the model for speculative decoding. Its guess at the second token is accepted 85 to 90% of the time, which gives 1.8 times the generation speed ([technical report](https://arxiv.org/abs/2412.19437)). That approach keeps discrete tokens and a normal probability for each one, so it fits more easily into existing training and serving pipelines.

## Since then

As of September 2026, CALM is still a single [arXiv version](https://arxiv.org/abs/2510.27688) with no venue listed, and I haven't found results at a larger scale from the authors or anyone else. It sits alongside other attempts to change what a model predicts or remembers, such as [LLM-JEPA](/research/llm-jepa) and [Nested Learning](/research/nested-learning). None of them has yet been shown at the scale of the models people use every day.
