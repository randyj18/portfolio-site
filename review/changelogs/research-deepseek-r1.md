# research/deepseek-r1: change log

What happened: rewritten, and merged with deepseek-v3 (the lead removes that file and adds the redirect). New title: "What DeepSeek V3 and R1 actually showed". Theme cheaper-models, status in-use. Words: 379 (R1) + 407 (V3) before; 773 after.

Claims kept, with sources:
- V3: 671B total/37B active per token, FP8 training, 2,048 H800s, $5.576M final-run cost with DeepSeek's own caveat ([V3 report](https://arxiv.org/abs/2412.19437), Table 1).
- R1: rule-based rewards, R1-Zero pure RL, results against o1-1217, six distilled models, MIT licence ([arXiv](https://arxiv.org/abs/2501.12948)).
- R1 launch price $2.19/M output vs o1 $60/M, now dated ([DeepSeek](https://api-docs.deepseek.com/news/news250120), [OpenAI](https://developers.openai.com/api/docs/models/o1)).

Claims corrected:
- "$5M model" / "R1 cost $5.5M" -> $5.576M was V3's final run; R1's own training was $294K (147K H800 GPU-hours) ([Nature](https://www.nature.com/articles/s41586-025-09422-z), arXiv v2 appendix B.4.4).
- "Pure RL" -> only R1-Zero; R1 used cold-start data, SFT on ~800K samples and two RL stages.
- "Meta spent $500M on Llama 3.1" / "90% cost reduction" -> compute comparison: 30.84M H100 GPU-hours vs 2.788M ([Llama 3.1 model card](https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/MODEL_CARD.md)).
- "$1 trillion in tech stock losses" -> Nvidia lost close to $600B in a day ([CNBC](https://www.cnbc.com/2025/01/27/nvidia-sheds-almost-600-billion-in-market-cap-biggest-drop-ever.html)).
- MLA credited to DeepSeek-V2, not V3 ([V2](https://arxiv.org/abs/2405.04434)).

Cut: OpenAI "$6B+" and "1000x cheaper", "2-4x faster than o1", GRPO "4.5x speedup", "Baidu, Alibaba and Tencent slashed prices", "your phone could soon run...", V3's "$500K-1M to train your own", "smaller variants run on laptops", "cost curve drops 90% every 18 months", "compute oligopoly just got disrupted". None had a primary source. Karpathy's quote dropped because X blocked every fetch.

Added "Since then": V3.1, V3.2-Exp, V4 Preview, V4.1-Flash, no R2 (DeepSeek news pages); current prices; o1 shutdown on Oct 23 2026; Italy's Garante block; NIST CAISI evaluation. All are linked in the note.

Links: /blog/cloud-provider-diversification, /research/s1-test-time-scaling, /research/4bit-quantization.

Questions for Randy:
- I kept "the moat isn't compute anymore, it's application and execution" in softened form ("I think the durable advantage for most organizations now sits in application and execution"). Does that still hold for you?
- I added a paragraph doubting the original's "algorithmic innovation beats brute force" ("efficiency and scale both kept moving"). OK to reverse it?
