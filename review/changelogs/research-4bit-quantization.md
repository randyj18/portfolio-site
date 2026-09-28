# research/4bit-quantization: change log

What happened: rewritten. New title: "Running large models in 4 bits". Theme cheaper-models, status in-use. Words: 917 before, 759 after.

Claims kept, with sources: GPTQ (175B in ~4 GPU hours; 3.25x on A100, 4.5x on A6000; ICLR 2023). AWQ (1% salient weights, activation-aware scaling, >3x over HF FP16, MLSys 2024 best paper). QLoRA (NF4; 65B fine-tuned on one 48 GB GPU vs >780 GB). All from the arXiv papers listed in the front matter.

Claims corrected:
- "70B at 4-bit fits a single consumer GPU" -> it doesn't: 35 GB of weights vs 32 GB on the RTX 5090 ([NVIDIA](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/)). A 27B-class model on a 24 GB card is the realistic case ([Gemma 3 QAT](https://developers.googleblog.com/en/gemma-3-quantized-aware-trained-state-of-the-art-ai-to-consumer-gpus/)).
- "LMDeploy 3.16x" -> the README says 2.4x. Cut rather than corrected.
- "2-bit and below typically unacceptable" -> Apple ships a 2-bit QAT on-device model ([Apple](https://machinelearning.apple.com/research/apple-foundation-models-2025-updates)).
- "Keep training in FP16/BF16" -> FP8 and FP4 pretraining now exist ([NVFP4](https://arxiv.org/abs/2509.25149), [Nemotron 3 Super](https://arxiv.org/abs/2604.12374)).
- "AI primarily runs locally from 2026" -> not true. Apple pairs on-device with Private Cloud Compute.
- Added a caveat on reasoning models ([COLM 2025 study](https://arxiv.org/abs/2504.04823)).

Cut: the on-device market-size block (56.7%, $8.6B to $115.74B, CAGRs), A100 hardware prices and "50% savings", "10x cost reduction", "break-even within days", phone tokens/sec, "100-500ms latency", the automotive and manufacturing lists, the year-by-year "paradigm shift" ladder.

Added "Since then": gpt-oss MXFP4, Gemma 3 QAT, Apple 2-bit, Kimi K2 Thinking INT4, NVFP4 pretraining and Nemotron 3 Super.

Links: /blog/cloud-provider-diversification, /research/deepseek-r1.

Questions for Randy:
- The original predicted "edge-first by default" from 2026. The rewrite drops that and says local hasn't replaced the cloud. OK?
- Keep the enterprise framing (fixed hardware cost vs per-token bill; data stays in the building)? I kept it as my reading of your view.
