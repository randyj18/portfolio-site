# agentic-ai-wealth-data-architecture: change log

**What happened:** rewritten as the domain case study and the site's canonical medallion (bronze/silver/gold) explainer. It now uses one definition of gold, matching the Databricks docs: dimensional models, features and a semantic layer, with any vector index a separate serving layer. New title: "Data architecture for AI agents in wealth management". Topic: data-and-knowledge.

**Word count:** 2,786 before, 1,466 after.

## Claims kept (with sources)
- Medallion is "a recommended best practice but not a requirement"; bronze "enables reprocessing and auditing"; no writing to silver directly from ingestion; gold is dimensional modelling and aggregation ([Azure Databricks docs](https://learn.microsoft.com/en-us/azure/databricks/lakehouse/medallion)).
- Delta time travel defaults to about 30 days, and cleanup removes old files ([Delta Lake docs](https://docs.delta.io/latest/delta-batch.html)).
- Salesforce Zero Copy Partner Network, Data 360 (formerly Data Cloud), partners ([Salesforce](https://www.salesforce.com/data/zero-copy-partner-network/)); 15 trillion records via Zero Copy in Q3 FY26 ([8-K](https://www.sec.gov/Archives/edgar/data/1108524/000110852425000234/crm-q3fy26xexhibit991.htm)).
- Salesforce and Anthropic's first industry solutions are for financial services (Oct 2025) ([Anthropic](https://www.anthropic.com/news/salesforce-anthropic-expanded-partnership)).

## Claims corrected
- "Industry-standard framework" → a recommended pattern.
- "Time travel: data as it existed at any historical point" → about 30 days by default; use snapshots/history tables plus the bronze archive.
- "Zero copy: no storage costs, real-time, instant joins" → real benefits, but compute cost, latency and source limits apply.
- "Salesforce Financial Services Cloud" → the product isn't named; Data 360 is used for the data platform.
- Jurisdiction mix (Canadian SIN with US IRA, CD ladder, "college") → neutral terms: tax identifier, beneficiary designation, liquidity needs.

## Claims cut
- "15-30 file feeds daily" (unsourced).
- "NIGO rejections take 5-7 business days" (unsourced).
- Logi/Dresner "65-84% higher engagement" (unsourced).
- "Headless BI" (misused term; the embed-in-CRM idea is kept).
- "Becoming a regulatory expectation" for hashing.
- Transaction code "47" / "CM" examples (made generic).
- The Spark explainer, GPS metaphor, "the technology exists" closer, TLDR, Quick Navigation, Related Posts.

**Update notes:** none (body updated).

**Internal links:** cognitive-enterprise-microsoft-roadmap, ai-governance-without-theater, build-vs-buy-agentic-ai.

## Questions for Randy
- The domain detail reads like practitioner knowledge, so there's no "in my experience" framing: the overnight custodial file cycle, fixed-width files over SFTP, "the authoritative position isn't settled until the day's trades, corporate actions and reconciliations have run", NIGO timelines, and the mix of Canadian (SIN) and US (IRA, CD) terms in the original. What is it based on, and which jurisdiction do you want? You can add a modest experience line if it's real.
- The "Where I'd start" step (one feed, hash it, reconcile it, put one trusted number in front of advisers) is new framing built from your ideas. Does it match how you'd advise?
- The SHA-256 hashing of bronze files is kept as your suggestion. OK?
