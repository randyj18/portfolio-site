# metadata-matters: change log

**What happened:** rewritten, and merged with data-storage-reality, which is absorbed as the ~300-word section "Rules for AI-generated content". New title: "Metadata is what makes knowledge findable". Topic: data-and-knowledge. data-storage-reality.md was not touched; the lead handles its redirect.

**Word count:** 2,117 (metadata-matters) + 2,043 (data-storage-reality) before; 1,284 after.

## Claims kept (with sources)
- Azure AI Search combines vector queries with filters on text and numeric fields ([Microsoft Learn](https://learn.microsoft.com/en-us/azure/search/vector-search-overview)).
- Dublin Core has 15 elements and is an ISO standard ([DCMI](https://www.dublincore.org/specifications/dublin-core/dces/)).
- SharePoint autofill columns, including managed-metadata support and "bulk processing... in a future release" ([Microsoft Learn](https://learn.microsoft.com/en-us/microsoft-365/documentprocessing/autofill-overview)).
- NASA concept tagger (2019): about 3.5M manually tagged documents, about 7,000 keywords, confidence scores ([Federal Data Strategy](https://strategy.data.gov/proof-points/2019/05/28/improving-data-access-and-data-management-artificial-intelligence-generated-metadata-tags-at-nasa/)).
- From the storage post: GCS Iowa prices (Standard $0.02, Coldline $0.004, Archive $0.0012 per GiB-month) and minimum durations of 90 and 365 days ([Google Cloud](https://cloud.google.com/storage/pricing)); Western Digital FY2026 average price per exabyte to cloud customers +8% ([10-K](https://www.sec.gov/Archives/edgar/data/106040/000162828026057139/wdc-20260703.htm)).

## Claims corrected
- NASA "84% accuracy on volcanology" → it was a single prediction's confidence score. The post now says the scores tell reviewers where to look.
- Storage "keeps getting cheaper" premise → prices per exabyte rose in 2026 (Western Digital).

## Claims cut or softened
- "Retrieval errors are the number one cause of hallucinations" → "a common source of confident wrong answers".
- "40% faster response times" (unsourced).
- "<30% completion" → "My guess is that most optional metadata fields in most organizations are empty".
- Collibra 10.1% / Alation 5.9% (unsourced).
- "85-95% accuracy, 50% faster tagging" (unsourced).
- "SaaS gives you minimal metadata to protect lock-in" → "tools vary a lot in how much metadata they keep and export".
- From data-storage-reality, cut:
  - the 25-125x storage model and the $0.10 → $0.01 per GB claim;
  - "50% of employees" and "52% of pastes";
  - $133B/$255B data-centre figures and the AI storage market figure;
  - rack-power ranges;
  - the data-centre section and "bill up 3x".
- Kept from storage (as suggestion or illustration): the 30/90-day/keep retention tiers, "AI slop" hygiene, tiering, dedup, the $100K vs $1M illustration (labelled), and storage in the AI budget.

**Update notes:** none (body updated).

**Internal links:** duplicated-solution-problem, siloed-information-saas-moat, cognitive-enterprise-microsoft-roadmap, ai-budget-democratizing-innovation.

## Questions for Randy
- The newsletter aside is now light and non-specific ("so is compressing the photos in the monthly newsletter"). The original was "executives who love sending out 8MB newsletters... Yes, I'm calling you out." Keep the light version, restore yours, or drop it?
- The retention tiers (brainstorming 30 days, drafts archived at 90, finals under normal policy) are presented as "a starting point I'd suggest". Still your view?
- New closing question (whether permission, status and recency will always need explicit fields). OK?
