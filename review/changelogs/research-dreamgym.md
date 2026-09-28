# research/dreamgym: change log

What happened: rewritten from the paper. New title: "Training agents in an imagined environment" (was "DreamGym: When Robots Learn to Dream"). Theme learning-from-experience, status early-research. Words: 699 before, 579 after.

Claims kept or corrected, with sources (all from the [paper](https://arxiv.org/abs/2511.03773)):
- Robots, autonomous vehicles and industrial automation -> the paper tests LLM agents on WebShop, ALFWorld and WebArena-Lite only. All robotics framing was removed.
- WebArena ">300%" -> "over 30%"; absolute success stays at about 9-15% in Table 1.
- "Matched 80,000 real interactions with zero" -> on par with GRPO/PPO trained on 80K real transitions using only synthetic rollouts. The experience model is still seeded with offline real data.
- "Sim-to-real +40-64%" -> "over 40%" with 5K real transitions (<10% of the data). The 64% had no source.
- Minecraft diamonds -> Dreamer 4, a separate paper ([arXiv 2509.24527](https://arxiv.org/abs/2509.24527)). Credited correctly in "Since then".
- Authors: Meta Superintelligence Labs, FAIR, UChicago, UNC, UC Berkeley.

Cut: the Jason Weston quote (not found in the paper or anywhere we could reach; replaced with the paper's own "key bottleneck" sentence), "90% reduction in real-world data", "millions to tens of thousands", the robotics timeline, "multiple major labs reached similar conclusions".

Update note added: a "> Updated September 2026" correction callout at the end. It says the earlier version called this a robotics result, overstated the WebArena gain and credited it with the Minecraft result.

Links: /research/early-experience, /research/multimodal-world-models.

Questions for Randy:
- Are you happy with a visible correction callout? It is the only note where I added one, because the whole premise changed. Similar callouts could go on deepseek-r1 ($5M) and 4bit-quantization (70B on a consumer GPU) if you want consistency.
