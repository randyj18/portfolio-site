# research/early-experience: change log

What happened: rewritten. New title: "Training agents on their own early experience". Theme learning-from-experience, status published-result. Words: 557 before, 572 after.

Claims kept, with sources (all from the [paper](https://arxiv.org/abs/2510.08558)): reward-free early experience; implicit world modelling and self-reflection; +9.6 points success and +9.4 out-of-domain on average across eight environments; WebShop with 1/8 of the demonstrations beats full imitation learning; up to +6.4 after RL.

Claims corrected:
- "Meta AI (Weston, Li, Liu)" / "Meta just solved..." -> Meta Superintelligence Labs, FAIR and Ohio State; first author Kai Zhang.
- "as few as 125 examples" -> that was one environment's dataset size, not a minimum. Cut.
- "+9.6% improvement" -> 9.6 points on average.
- "1/8 of demonstrations" in general -> WebShop only; ALFWorld needed half.
- "+6.4%" -> up to 6.4 points.

Softened: "agents that learn on the job" and the customer support, DevOps and code review examples. The paper collects experience during training and tests none of those domains. They are now described as possibilities.

Cut: "100,000+ examples", "collect millions of examples", "the difference between impossible and let's try it".

Added "Since then": ICML 2026 acceptance; OSU [code](https://github.com/OSU-NLP-Group/EarlyExperience); the DreamGym follow-up.

Links: /blog/build-vs-buy-agentic-ai, /research/dreamgym, /research/synthetic-data.

Questions for Randy: none beyond whether you want to keep the "customer support / DevOps" angle as an explicit (labelled) speculation. I left it out.
