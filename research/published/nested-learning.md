---
title: Nested Learning and models that keep learning
description: Google's Nested Learning gives models memories that update at different speeds, so they might keep learning. Promising at 1.3B parameters, unproven beyond.
theme: new-architectures
status: early-research
papers:
  - title: "Nested Learning: The Illusion of Deep Learning Architectures"
    url: https://arxiv.org/abs/2512.24695
    authors: Behrouz et al. (Google Research)
    date: 2025-12
    venue: NeurIPS 2025
published: 2025-11
updated: 2026-09
---

Language models learn in two separate phases. Training sets the weights. After that, the model can only work with what fits in its context window, and anything it picks up during a conversation is gone afterwards. Fine-tuning new knowledge in tends to erode what the model already knew, a problem known as catastrophic forgetting. Nested Learning, from Ali Behrouz, Meisam Razaviyayn, Peilin Zhong and Vahab Mirrokni at Google Research, is an attempt to blur the line between learning and using.

Its central claim is that a model's architecture and the optimizer that trains it are the same kind of thing: nested optimization problems, each with its own flow of information and its own update rate. Seen that way, an optimizer such as Adam is itself a kind of memory: it compresses information about past gradients. The paper builds three things on this idea ([arXiv](https://arxiv.org/abs/2512.24695)):

- More expressive optimizers, with deeper memory of past gradients or more powerful learning rules.
- A continuum memory system: instead of a split between short-term and long-term memory, a spectrum of memory modules that update at different frequencies, loosely inspired by the different speeds of brain waves.
- Hope, a self-modifying sequence model that learns its own update rule, combined with the continuum memory. It builds on Google's earlier Titans architecture.

The experiments are at 760 million parameters (trained on 30 billion tokens) and 1.3 billion parameters (100 billion tokens). At both sizes Hope had the lowest perplexity in the paper's language-modelling comparison, ahead of a standard Transformer and recurrent models such as RetNet, RWKV-7 and Titans. At 1.3B, its perplexity on Wikitext was 14.39 against 17.92 for the Transformer. The paper also reports results on long-context retrieval, continual learning and few-shot tasks.

## Why I think it matters

Continual learning is one of the real gaps in today's systems. A model that could take in new information without forgetting what it knew would remove the trade-off between a general model and a specialized one, and it would make context-window limits much less central to how systems are designed. The idea that architecture and training are one kind of process is elegant, and if it holds up it could simplify how people think about model memory.

The evidence is at 1.3 billion parameters, far below the models people use, and the paper has no experiments on the post-training steps, such as instruction tuning and reinforcement learning, that turn a base model into a usable assistant. Self-modifying models may also be harder to test and verify. What I'd watch: whether Google or anyone else shows Hope at tens of billions of parameters, whether it survives standard post-training, and whether other labs replicate the results.

## Since then

A version of the paper was published at NeurIPS 2025, and the full paper was posted to arXiv at the end of December 2025. I haven't found released code. Google has continued the line of work on memory: in December 2025 it published a post on Titans and MIRAS, about helping models keep a long-term memory ([Google Research](https://research.google/blog/titans-miras-helping-ai-have-long-term-memory/)).

As of September 2026 I haven't seen a scaled-up Hope model, or evidence that the approach is in Gemini. A related idea has reached production in another form: models that mix attention with recurrent layers now ship at scale, such as NVIDIA's Nemotron 3 Super, a hybrid of Mamba and Transformer layers with 120 billion parameters in total ([report](https://arxiv.org/abs/2604.12374)). That doesn't tell us whether Nested Learning will scale, but it does show that alternatives to the plain Transformer can.

For other attempts to change what a model predicts or remembers, see [CALM](/research/calm) and [LLM-JEPA](/research/llm-jepa).
