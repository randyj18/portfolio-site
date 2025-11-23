# Nested Learning: Teaching AI to Remember

**Tier:** Paradigm Shifter (3-5 year horizon)
**Published:** November 2025
**arXiv:** [NL.pdf](http://abehrouz.github.io/files/NL.pdf)
**Authors:** Ali Behrouz, Vahab Mirrokni - Google Research
**Impact:** Potentially transformative approach to continual learning and long-context processing

---

What if AI models could learn new information without forgetting what they already know? What if the architecture that processes information and the rules that train it were fundamentally the same thing?

Nested Learning from Google Research asks these questions and delivers a surprisingly elegant answer: treat the entire model as interconnected optimization problems, each operating at different timescales.

## The Core Problem

**Catastrophic forgetting**: When models learn new tasks, they overwrite knowledge from previous tasks. Today's LLMs are constrained to either the immediate context of their input window or static information from pre-training.

**The current workaround**: Freeze weights and hope the model learned enough. Fine-tuning helps for narrow domains but degrades general capability. In-context learning works but is limited by context windows.

**Nested Learning's bet**: What if we designed models that inherently manage multiple timescales of memory, from immediate context to permanent knowledge?

## The Key Insight

The paper's central thesis is profound: **architecture and training rules are fundamentally the same concept—just different levels of optimization.**

This isn't a minor reframing. It suggests that the distinction we draw between "model structure" and "learning algorithm" is artificial. Both are optimization processes operating at different frequencies.

## Three Core Contributions

### Deep Optimizers

Reconceptualize optimizers as associative memory modules that remember how previous examples behaved. This produces improved momentum-based formulations that account for relationships between data samples, making training more robust to imperfect data.

### Continuum Memory Systems (CMS)

Instead of discrete memory types (short-term vs. long-term), CMS introduces a spectrum of memory modules updating at different frequencies. Think of it like brain waves—some update nearly instantly, others very slowly.

This lets the model balance:
- **Short-term context** (sequence models)
- **Long-term knowledge storage** (feedforward networks)
- **Everything in between** (gradient updates at various rates)

### Hope Architecture

A self-modifying recurrent architecture that validates the theory. Key features:
- Unbounded in-context learning through self-referential optimization
- CMS blocks for extended context handling
- Dynamic memory optimization during inference

## Results Worth Noting

**At 1.3B parameters trained on 100B tokens:**
- Outperformed Transformer++ on language modeling
- Beat modern recurrent models (RetNet, DeltaNet) on common-sense reasoning
- Superior performance on Needle-in-Haystack tasks vs. TTT and Mamba2
- Lower perplexity across benchmarks

The results are genuinely impressive for this scale. But that's also the honest caveat: 1.3B parameters is far from frontier.

## Why This Might Matter

**If Nested Learning scales**, we get models that:
- Continuously learn without forgetting
- Process arbitrarily long contexts efficiently
- Adapt to new domains without degrading on old ones

For enterprise AI, that's transformative. No more choosing between "general capability" and "domain specialization." No more context window limitations driving architecture decisions.

**The theoretical elegance is compelling.** Unifying architecture and optimization into a single framework is the kind of simplification that often precedes major advances. Physics has shown that beautiful mathematics often reflects reality.

## Why This Might Not Change Anything

**Scale is everything, and we don't know if this scales.**

The paper demonstrates results at 1.3B parameters. The gap between "works at 1B" and "works at 100B+" has killed many promising architectures. State space models looked revolutionary at small scale too.

**Practical concerns:**
- Integration with RLHF and alignment methods is unaddressed
- Production deployment complexity is unknown
- Whether CMS's benefits compound or plateau at scale is untested
- Self-modifying architectures introduce verification challenges

**The honest take**: This is high-quality research with genuine theoretical depth. Whether it survives the scaling laws is genuinely uncertain.

## The Business Implication

**Don't restructure your ML infrastructure yet.** But if you're thinking about long-term AI architecture (2-3+ year horizons), track this closely.

The specific things to watch:
- Does Google scale Hope to 7B+? 70B+?
- Can CMS integrate with standard alignment pipelines?
- Do other labs replicate and extend the results?

If those boxes get checked, Nested Learning could fundamentally change how we think about model memory and continual learning. That's a significant "if," but the potential payoff is substantial.

In the meantime, proven approaches to context extension and efficient fine-tuning deliver real value today. Don't wait for paradigm shifts when incremental gains are available.

---

**Technical note**: Nested Learning frames models as multi-level optimization problems where each level (architecture components, optimizers, training dynamics) updates at different frequencies. The Hope architecture implements this through CMS blocks that create a spectrum from fast-updating attention to slow-updating parameters, enabling the model to optimize its own memory during inference.
