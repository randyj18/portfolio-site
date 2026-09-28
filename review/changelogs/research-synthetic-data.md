# research/synthetic-data: change log

What happened: rewritten. New title: "Training models on synthetic data". Theme learning-from-experience, status in-use. Words: 516 before, 713 after (grew to add the privacy and "since then" material).

Claims kept or corrected, with sources:
- phi-1: 6B filtered web tokens + ~1B GPT-3.5 tokens; HumanEval 50.6% vs StarCoder 33.6% ([arXiv](https://arxiv.org/abs/2306.11644)). The original called it "trained on synthetic data" and "already deployed"; corrected.
- Phi-2: 1.4T tokens from a synthetic + web mix; "matches or outperforms models up to 25x larger" ([Microsoft Research](https://www.microsoft.com/en-us/research/blog/phi-2-the-surprising-power-of-small-language-models/)). The original said "250B synthetic tokens"; corrected.
- Self-Instruct: 175 seed tasks, ~52K instructions, +33 points absolute ([arXiv](https://arxiv.org/abs/2212.10560)). The original's recipe ("start with a small model") was wrong: both papers used large generators.
- The "EDPB warns" footnote was really an EDPS page we couldn't open. Replaced with [EDPB Opinion 28/2024](https://www.edpb.europa.eu/news/news/2024/edpb-opinion-ai-models-gdpr-principles-support-responsible-ai_en) and the July 2026 [anonymisation guidelines](https://www.edpb.europa.eu/news/edpb-sheds-light-on-anonymisation-and-web-scraping-for-generative-ai-and-adopts-final-version_en).
- Quality degradation is now backed by the model-collapse paper ([Nature 2024](https://www.nature.com/articles/s41586-024-07566-y)).

Cut: "synthetic data is truly anonymous", "zero risk of breaches or compliance violations", Gartner "60% of training data synthetic by 2024", the enterprise LLM market CAGR, "$0.10-$5 per label", "GPT-4 class from a 7B model at 1/100th the cost", "prompt engineering problem".

Added "Since then": Phi-4 ([arXiv](https://arxiv.org/abs/2412.08905)); generated reasoning data in R1 and s1; DeepSeek's note that the web now contains OpenAI-generated answers; Microsoft's 2026 "augmentation, not replacement" framing.

Links: /research/deepseek-r1, /research/s1-test-time-scaling, /research/early-experience.

Questions for Randy:
- Kept: "the advantage shifts from who has the most data to who can generate the right data... favours domain expertise over data hoarding". Still your view?
- New, in your voice: "I'd expect a synthetic dataset built from personal data to be judged against the same tests." Comfortable with that?
