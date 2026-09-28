---
title: Robot foundation models and where they stand
description: Vision-language-action models let robots borrow knowledge from the web. The progress since RT-2 is real, but home robots are still mostly pre-orders and pilots.
theme: physical-world
status: published-result
papers:
  - title: "RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control"
    url: https://arxiv.org/abs/2307.15818
    authors: Brohan et al. (Google DeepMind)
    date: 2023-07
  - title: "Open X-Embodiment: Robotic Learning Datasets and RT-X Models"
    url: https://arxiv.org/abs/2310.08864
    authors: Open X-Embodiment Collaboration (21 institutions)
    date: 2023-10
  - title: "π0.5: a Vision-Language-Action Model with Open-World Generalization"
    url: https://arxiv.org/abs/2504.16054
    authors: Physical Intelligence
    date: 2025-04
published: 2025-11
updated: 2026-09
---

A language model knows what a hammer is and what "fragile" means. A robot also needs to know what happens when it grips an object here rather than there, or pushes on something that doesn't move. The work in this note is about joining the two: models that take in camera images and an instruction and put out robot actions, usually called vision-language-action models.

Google DeepMind's RT-2 (July 2023) made the key move simple. Represent robot actions as tokens, like words, and fine-tune a vision-language model trained on web data to output them, so that knowledge from the web carries over to control. Across more than 6,000 trials, RT-2 raised success on unseen scenarios from RT-1's 32% to 62%, and it could handle requests like choosing an object to use as an improvised hammer (it picked a rock) ([Google DeepMind](https://deepmind.google/discover/blog/rt-2-new-model-translates-vision-and-language-into-action/)).

Two later efforts made these models broader. Open X-Embodiment (October 2023) pooled data from 22 different robots, collected by 21 institutions, so one model could learn from many robot bodies ([paper](https://arxiv.org/abs/2310.08864)); Google DeepMind described it as more than a million episodes ([Google DeepMind](https://deepmind.google/discover/blog/scaling-up-learning-across-many-different-robot-types/)). Physical Intelligence's π0.5 (April 2025), trained partly on about 400 hours of data from around 100 homes, cleaned kitchens and bedrooms in three homes that were not in its training data, carrying out multi-stage tasks 10 to 15 minutes long ([paper](https://arxiv.org/abs/2504.16054)).

## Why I think it matters

I find it useful to think of these robots as getting their common sense from the same web-trained models as chatbots, with the hard remaining work being reliability in the physical world. That suggests an order of adoption. Structured settings such as warehouses and factories come first, because the tasks repeat and the return can be measured. Homes are much harder: far more variety, stricter safety expectations, and tasks that have to work every time rather than in a demo. Care for older people and people with disabilities may be the largest opportunity, and it needs the highest safety bar.

I wouldn't call the fundamental problem solved. Google DeepMind's newest system, Gemini Robotics 2 (July 2026), reports success rates between 45.7% and 76.3% on general whole-body pick-up tasks ([Google DeepMind](https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/)). That is real progress, and still some way from a robot you'd leave alone in your kitchen.

## Since then

Hardware got cheaper faster than I expected. Unitree lists its G1 humanoid from US$13,500 and its R1 from US$4,900 ([G1](https://www.unitree.com/g1), [R1](https://www.unitree.com/R1)). 1X takes pre-orders for its NEO home robot at US$20,000 or US$499 a month, with US deliveries promised for 2026 ([1X](https://www.1x.tech/order)). In April 2026, 1X said the first units off its line were going to its own staff ([1X](https://www.1x.tech/discover/neo-factory)), and I haven't found confirmed deliveries of a humanoid to customers' homes.

The models spread too. Physical Intelligence open-sourced π0 and π0.5 in its [openpi repository](https://github.com/Physical-Intelligence/openpi). Gemini Robotics 2's reasoning model is available in Google AI Studio, while its action model is limited to early-access partners (same Google DeepMind link above).

World models, which let a robot predict the result of an action before taking it, moved forward as well. Meta's V-JEPA 2, trained on internet video plus under 62 hours of robot footage, planned pick-and-place actions on robot arms in two labs without any data collected there ([paper](https://arxiv.org/abs/2506.09985), June 2025). It comes out of the research line described in the [LLM-JEPA note](/research/llm-jepa). For agents that practise in an imagined environment rather than a physical one, see [DreamGym](/research/dreamgym).
