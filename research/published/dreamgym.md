---
title: Training agents in an imagined environment
description: DreamGym has a language model imagine how a website would respond, so an agent can practise with reinforcement learning. Real gains on web benchmarks, nothing physical yet.
theme: learning-from-experience
status: early-research
papers:
  - title: "Scaling Agent Learning via Experience Synthesis"
    url: https://arxiv.org/abs/2511.03773
    authors: Chen et al. (Meta Superintelligence Labs, FAIR at Meta, University of Chicago, UNC, UC Berkeley)
    date: 2025-11
published: 2025-11
updated: 2026-09
---

Reinforcement learning lets an agent improve by trying things and keeping what works, but for language agents the trying is the expensive part. Real environments are slow, hard to reset, and often don't report whether an attempt succeeded. The DreamGym paper's own conclusion is that "the key bottleneck in RL for LLM agents lies in the quality and structure of interaction data."

DreamGym, from Meta Superintelligence Labs and FAIR with the University of Chicago, UNC and UC Berkeley, replaces much of that interaction with an experience model: a language model that reasons step by step about how the environment would respond to each action, and what reward the agent should get. Three design choices keep the imagined experience useful. A replay buffer seeded with real offline data grounds the imagined transitions and keeps growing during training. The experience model and the agent are updated together, so the imagined environment keeps pace with what the agent actually does. And the experience model generates new tasks aimed at whatever the agent currently finds hard, a built-in curriculum.

The results come from three text-based benchmarks: WebShop (online shopping), ALFWorld (household tasks described in text) and WebArena-Lite (web navigation), using Llama and Qwen models of 3 to 8 billion parameters.

- On WebArena, where running reinforcement learning against the real environment is impractical, DreamGym-trained agents beat all baselines by more than 30%. Absolute success rates stayed low, between about 9% and 15% in the paper's main table.
- On WebShop and ALFWorld, agents trained only on synthetic experience performed on par with agents trained by standard reinforcement learning (GRPO and PPO) on 80,000 real interactions.
- Training first in DreamGym and then with 5,000 real interactions gave more than a 40% improvement over training from scratch in the real environment, while using less than 10% of the real data.

## Why I think it matters

If a language model can stand in for an environment that wasn't built for training, teams can use reinforcement learning on software tasks where it used to be impractical. The pattern I find most usable is the warm start: most of the practice in an imagined environment, then a small amount of real interaction to finish. It is the same bet as [early experience](/research/early-experience), from much of the same team, pushed one step further.

The scope is narrower than the name suggests. The paper tests agents working in text and on websites. Physical robots are a different problem, with different evidence (see [robot foundation models](/research/multimodal-world-models)). Imagined experience can also drift from reality over long sequences, and the experience model needs real data to stay grounded, which the authors build in.

## Since then

As of September 2026 the paper is still an arXiv preprint, last revised in November 2025, with no listed venue, and I haven't found public code. Its sibling paper, [early experience](/research/early-experience), was accepted at ICML 2026.

The idea of practising inside a learned model of the world has a longer history in games and robotics. A separate paper from the same autumn, Dreamer 4 by Danijar Hafner and colleagues, trained an agent inside a learned world model of Minecraft and reported "the first agent to obtain diamonds in Minecraft purely from offline data, without environment interaction" ([paper](https://arxiv.org/abs/2509.24527), September 2025).

> Updated September 2026: an earlier version of this note described DreamGym as a robotics result, overstated its WebArena gain and credited it with Dreamer 4's Minecraft result. The note has been rewritten from the paper.
