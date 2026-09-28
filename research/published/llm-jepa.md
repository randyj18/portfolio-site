---
title: LLM-JEPA and LeCun's bet on predicting meaning
description: LeCun argues models should predict meaning rather than words. LLM-JEPA was a first small test on language models, and he has since left Meta to pursue the idea.
theme: new-architectures
status: early-research
papers:
  - title: "LLM-JEPA: Large Language Models Meet Joint Embedding Predictive Architectures"
    url: https://arxiv.org/abs/2509.14252
    authors: Huang, LeCun and Balestriero (Atlassian, NYU, Brown University)
    date: 2025-09
    venue: ICLR 2026
published: 2025-11
updated: 2026-09
---

Yann LeCun has argued for years that training a model to reconstruct every next token, or every pixel, spends effort on details that can't be predicted and don't matter. His alternative is the joint embedding predictive architecture, or JEPA: turn the input into a representation, and predict the representation of something related instead of reconstructing it piece by piece. In computer vision this worked well. Meta's I-JEPA pretrained a large vision transformer in under 1,200 GPU hours, which the authors reported as over 10 times more efficient than a comparable model trained as a masked autoencoder ([I-JEPA](https://arxiv.org/abs/2301.08243)).

LLM-JEPA, by Hai Huang (Atlassian), LeCun (listed at NYU) and Randall Balestriero (Brown University), is a first attempt to bring that objective to language models. It keeps ordinary next-token training and adds a second loss. Many datasets come in pairs that describe the same thing two ways, such as a request in English and the same request written as a regular expression or an SQL query. The model learns to predict the embedding of one version from the other, with special [PRED] tokens appended so that the model itself does the predicting.

In fine-tuning experiments with Llama, Gemma, OpenELM and OLMo models of 1 to 8 billion parameters, on datasets for regular expressions (NL-RX), grade-school math (GSM8K), text-to-SQL (Spider) and movie-review sentiment, the combined objective beat standard fine-tuning, often by a wide margin, and was less prone to overfitting. Pretraining tests were limited to a 1B model on small datasets.

The costs are spelled out in the paper. The extra loss needs extra forward passes during training: three times the compute of standard fine-tuning in the first version, cut to about two times in the October 2025 revision. There is no extra cost at inference. The method also depends on having paired versions of the same content, which many datasets don't have, and the authors don't yet have a general way to create them, the way data augmentation does for images.

## Why I think it matters

I think LeCun is asking the right question: whether next-token prediction is the best training objective or simply the one that scaled first. Generative pretraining works and we know it scales, but that doesn't make it optimal. If an objective like this made training much more data-efficient at large scale, it would change who can afford to build strong models.

That is a large "if". Nothing in the paper goes beyond 8 billion parameters, and it makes no claim about cost savings at scale. I wouldn't wait for it. I'd use today's models and keep an eye on this line of work, which is part of a wider, open question: whether scaling today's training recipe is a [local optimum rather than the end point](/blog/synthetic-cognitive-capitalism).

## Since then

LeCun announced in November 2025 that he was leaving Meta after 12 years to start a company that would continue this research program, with Meta as a partner ([LinkedIn](https://www.linkedin.com/posts/yann-lecun_as-many-of-you-have-heard-through-rumors-activity-7397020300451749888-2lhA)). The company, AMI Labs, is headquartered in Paris, with LeCun as chairman and Alexandre LeBrun as CEO, and it raised $1.03 billion at a $3.5 billion pre-money valuation in March 2026 ([TechCrunch](https://techcrunch.com/2026/03/09/yann-lecuns-ami-labs-raises-1-03-billion-to-build-world-models/)). It describes its goal as world models that "make predictions in representation space" ([AMI Labs](https://amilabs.xyz/)). Its CEO told TechCrunch it could take years to get from theory to commercial applications.

LLM-JEPA itself was accepted at ICLR 2026 ([poster](https://iclr.cc/virtual/2026/poster/10010475)). The same three authors followed up in February 2026 with Semantic Tube Prediction, a JEPA-style method that doesn't need paired versions of the data and reports matching baseline accuracy with 16 times less training data, on one small dataset ([arXiv](https://arxiv.org/abs/2602.22617)).

Meta's own JEPA work continued with V-JEPA 2, a video model trained on over a million hours of internet video. With under 62 hours of robot footage added, it planned pick-and-place actions on robot arms in two labs without collecting any data there ([arXiv](https://arxiv.org/abs/2506.09985), June 2025). That's closer to what LeCun says he is ultimately after, systems that understand the physical world, and it connects to the note on [robot foundation models](/research/multimodal-world-models).

As of September 2026 I'm not aware of a JEPA-style objective in any production language model. For other attempts to change what models predict or remember, see [CALM](/research/calm) and [Nested Learning](/research/nested-learning).
