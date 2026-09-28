---
title: Training agents on their own early experience
description: Let an agent try alternatives to the expert's actions and learn from what happens, with no reward signal. It beat plain imitation in eight environments.
theme: learning-from-experience
status: published-result
papers:
  - title: "Agent Learning via Early Experience"
    url: https://arxiv.org/abs/2510.08558
    authors: Zhang et al. (Meta Superintelligence Labs, FAIR at Meta, Ohio State University)
    date: 2025-10
    venue: ICML 2026
published: 2025-11
updated: 2026-09
---

Most language agents are trained by imitation: collect examples of an expert completing tasks and fine-tune the model to copy them. That works, but expert demonstrations are expensive, cover a narrow slice of situations and teach the agent nothing about what happens when it goes off script. Reinforcement learning would let the agent learn from its own attempts, but many environments, websites for example, don't give a reliable reward signal, and others need long, slow episodes before anything can be scored.

This paper, from Meta Superintelligence Labs, FAIR at Meta and Ohio State University, proposes a middle path it calls early experience. At states taken from the expert data, the agent tries alternative actions of its own and records what happens next. No reward is needed, because the resulting states are the training signal. The authors use that data in two ways. Implicit world modelling trains the agent to predict what its actions lead to. Self-reflection has it compare its own alternatives with the expert's choice and write out why the expert's was better. Both are ordinary next-token training, so they fit into existing fine-tuning pipelines.

The evaluation covers eight environments: online shopping (WebShop), household tasks described in text (ALFWorld), science experiments in a text simulator (ScienceWorld), travel planning, multi-turn tool use (BFCLv3 and Tau-Bench), search-based question answering and web navigation (WebArena-Lite). Across them, both methods beat imitation learning, by an average of 9.6 points in success rate and 9.4 points on out-of-domain tasks. On WebShop, early experience with one-eighth of the demonstrations beat imitation learning with all of them; on ALFWorld the same took half. Where a reward was available, starting reinforcement learning from an early-experience checkpoint improved final success rates by up to 6.4 points. Most experiments used Llama and Qwen models of 3 to 8 billion parameters, and the gains held up in a test with a 70B model.

## Why I think it matters

The development path the paper implies is practical: start with a modest set of demonstrations, let the agent generate its own experience around them, then add reinforcement learning where results can be checked. That changes the question for a team building an agent from "do we have enough data to train it?" to "do we have enough to get it started?" For most organizations the question before that one is whether to build an agent at all, which I've written about in [when a custom AI agent is worth building](/blog/build-vs-buy-agentic-ai).

It helps to be precise about what early experience is. The agent's exploration happens while the training data is being built, before deployment. The paper doesn't show agents that keep learning on the job, and it doesn't test domains like customer support or code review. Those are plausible directions rather than results. The method also still depends on a capable base model and on some expert data to branch from.

## Since then

The paper was accepted at ICML 2026, and Ohio State's NLP group has published the [code and data](https://github.com/OSU-NLP-Group/EarlyExperience). Much of the same team followed up with DreamGym, which replaces the real environment with a language model that imagines the results of the agent's actions and adds reinforcement learning on top ([DreamGym](/research/dreamgym)).

I haven't seen evidence of the method in a shipped product yet. The broader idea, models generating their own training signal instead of relying on human-labelled data, is the one behind [synthetic training data](/research/synthetic-data), where it is already standard practice.
