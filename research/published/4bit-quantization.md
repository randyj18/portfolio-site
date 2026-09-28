---
title: Running large models in 4 bits
description: Storing weights in 4 bits instead of 16 cuts memory about fourfold with little loss. It decides what runs where, and it's now part of how models ship.
theme: cheaper-models
status: in-use
papers:
  - title: "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers"
    url: https://arxiv.org/abs/2210.17323
    authors: Frantar et al. (IST Austria, ETH Zurich)
    date: 2022-10
    venue: ICLR 2023
  - title: "QLoRA: Efficient Finetuning of Quantized LLMs"
    url: https://arxiv.org/abs/2305.14314
    authors: Dettmers et al. (University of Washington)
    date: 2023-05
  - title: "AWQ: Activation-aware Weight Quantization for On-Device LLM Compression and Acceleration"
    url: https://arxiv.org/abs/2306.00978
    authors: Lin et al. (MIT, with SJTU, NVIDIA and others)
    date: 2023-06
    venue: MLSys 2024 (Best Paper)
published: 2025-11
updated: 2026-09
---

Most of a language model's size is its weights, and most models are trained with each weight stored in 16 bits. Quantization stores them in fewer. At 4 bits, the weights of a 70-billion-parameter model shrink from about 140 GB to about 35 GB, and a 7-billion-parameter model fits in about 3.5 GB. Those are weight-only figures: a running model also needs memory for its working state (the KV cache), which grows with the length of the conversation.

The hard part is doing this without wrecking quality. Three papers from 2022 and 2023 made 4 bits a practical default.

GPTQ, from IST Austria and ETH Zurich, quantizes a trained model one layer at a time and uses second-order information about each layer to compensate for the rounding errors it introduces. It could quantize a 175-billion-parameter model "in approximately four GPU hours" with little loss of accuracy, and it reported generation speedups of about 3.25 times on an Nvidia A100 and 4.5 times on an A6000.

AWQ, from Song Han's lab at MIT and collaborators, starts from the observation that about 1% of the weights matter far more than the rest, and that you find them by looking at the activations flowing through the model rather than at the weights themselves. Instead of keeping those weights at higher precision, it scales the important channels so everything can stay at 4 bits, which keeps the hardware path simple. Its inference engine ran more than three times faster than the standard Hugging Face 16-bit implementation, and it won the best paper award at MLSys 2024.

QLoRA, from the University of Washington, is a fine-tuning method rather than a way to serve models. It freezes a 4-bit copy of the model and trains small adapter layers on top, using a 4-bit "NormalFloat" data type shaped for weights that follow a bell curve. That made it possible to fine-tune a 65-billion-parameter model on a single 48 GB GPU, where ordinary 16-bit fine-tuning needed more than 780 GB.

## Why I think it matters

Quantization decides where a model can run, and that affects privacy, latency and the shape of the bill. A model on your own hardware is a fixed cost instead of a per-token charge, and your data stays in the building. If you'd rather not own hardware, open-weight models are also offered by several clouds, which changes the lock-in picture ([when multi-provider AI is worth the premium](/blog/cloud-provider-diversification)).

I'd still test any quantized model on your own tasks before relying on it. A 2025 study of reasoning models found 4-bit weight-only quantization close to lossless, while "lower bit-widths introduce significant accuracy risks", with the damage depending on model size and task difficulty ([Liu et al., COLM 2025](https://arxiv.org/abs/2504.04823)).

Two limits are worth stating plainly. A 70B model at 4 bits still doesn't fit on a single consumer graphics card: Nvidia's largest, the RTX 5090, has [32 GB](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/). It fits on 48 GB workstation cards and on machines with large unified memory. And running models locally hasn't replaced the cloud. Even Apple pairs its on-device model with a [server model built for its Private Cloud Compute](https://machinelearning.apple.com/research/apple-foundation-models-2025-updates).

## Since then

The main change since these papers is that low precision moved from a compression step applied after training into how models are trained and shipped.

- OpenAI's open-weight gpt-oss models (August 2025) were post-trained with their mixture-of-experts weights in the 4-bit MXFP4 format, so the 120B model runs on a single 80 GB GPU and the 20B model within 16 GB ([gpt-oss](https://github.com/openai/gpt-oss)).
- Google's quantization-aware Gemma 3 releases (April 2025) cut the 27B model from 54 GB to 14.1 GB, small enough for a 24 GB RTX 3090 ([Google](https://developers.googleblog.com/en/gemma-3-quantized-aware-trained-state-of-the-art-ai-to-consumer-gpus/)). For a single gaming card, that's the realistic size class.
- Apple compressed its roughly 3-billion-parameter on-device model to 2 bits per weight by training with quantization in mind (June 2025, same Apple link above).
- Moonshot used quantization-aware training on Kimi K2 Thinking (November 2025) so that it runs natively in INT4 ([model card](https://huggingface.co/moonshotai/Kimi-K2-Thinking)).
- Nvidia pretrained a 12B model in its 4-bit NVFP4 format on 10 trillion tokens with results comparable to an 8-bit baseline ([paper](https://arxiv.org/abs/2509.25149)), and its Nemotron 3 Super, with 120 billion parameters in total, was pretrained in NVFP4 ([report](https://arxiv.org/abs/2604.12374), April 2026).

What I don't know is how far below 4 bits general-purpose models can go before the savings stop being worth the quality loss. Apple's 2-bit model is small, and so far the large open models have stopped at about 4. DeepSeek's 8-bit training of V3 is covered in [the DeepSeek note](/research/deepseek-r1).
