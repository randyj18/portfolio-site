# research/multimodal-world-models: change log

What happened: rewritten. New title: "Robot foundation models and where they stand" (was "Bridging Vision and Physics: The Missing Piece for Robots"). Theme physical-world, status published-result. Papers are now RT-2, Open X-Embodiment and π0.5. The VLA survey (arXiv 2405.14093) was dropped from the list because the note no longer draws on it. Words: 807 before, 568 after.

Claims kept or corrected, with sources:
- RT-2 "63% improvement" -> unseen-scenario success from 32% to 62% over 6,000+ trials; rock-as-hammer example ([Google DeepMind](https://deepmind.google/discover/blog/rt-2-new-model-translates-vision-and-language-into-action/)).
- Open X-Embodiment: 22 robots and 1M+ episodes kept; date fixed to Oct 2023, not 2024 ([arXiv](https://arxiv.org/abs/2310.08864), [Google DeepMind](https://deepmind.google/discover/blog/scaling-up-learning-across-many-different-robot-types/)).
- π0.5: 2024 -> April 2025. "Deployed in 3 San Francisco rental homes" -> evaluated in three homes not in the training data; 10 to 15 minute tasks ([arXiv](https://arxiv.org/abs/2504.16054)).
- Prices: "$50k-650k" and "$15k-20k projected 2026-27" -> Unitree G1 from US$13.5K, R1 from US$4,900; 1X NEO US$20,000 or $499/month ([Unitree](https://www.unitree.com/g1), [1X](https://www.1x.tech/order)).
- "The fundamental problem is solved" -> reversed, citing Gemini Robotics 2's 45.7-76.3% whole-body success ([Google DeepMind](https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/)).

Cut:
- "Expert consensus: at least 10 years" (quote not found).
- "physical interpretability" advance (no source).
- 1X EVE "thousands of hours in homes" (1X only says industrial deployments).
- π0 "1-20 hours of data" (the paper says 5 to 100+).
- The DIAMOND/UniSim technical note.
- "Start pilot programs now" and the FOMO close.

Added "Since then": price drops, NEO delivery status (first units to 1X staff, Apr 2026), openpi, Gemini Robotics 2 availability, V-JEPA 2.

Links: /research/llm-jepa, /research/dreamgym.

Questions for Randy:
- "Hardware got cheaper faster than I expected" refers to your Nov 2025 projection. OK to say in your voice?
- The care sector: you called it "the largest potential market". I softened this to "may be the largest opportunity".
- I kept your order of adoption (structured settings first, homes later).
