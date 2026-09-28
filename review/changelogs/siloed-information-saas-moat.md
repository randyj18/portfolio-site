# siloed-information-saas-moat: change log

**What happened:** rewritten as part 1 of a three-post SaaS lock-in series (the buyer's view). New title: "Why your SaaS data is so hard to move". Topic: vendors-and-platforms.
- The vendor-side prescriptions ("What SAAS Companies Should Do", EAAS) moved to saas-evolution-ai-era.
- The "test one migration" idea moved here from data-portability-eu-data-act.
- Closing line points to parts 2 and 3.

**Word count:** 2,843 before, 1,238 after (checker body count).

## Claims kept (with sources)
- Salesforce Enterprise API allowance: 100,000 a day plus 1,000 per licence; Professional needs API access ([Salesforce limits PDF, updated 11 Sep 2026](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_app_limits_cheatsheet.pdf)).
- Data Export Service: zip of CSVs, weekly at most, deleted after 48 hours ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/lex_implementation_data_management/lex_implementation_data_export)).
- Slack rate limits of 29 May 2025 ([changelog](https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps/)); the new terms ban bulk export and LLM training; Glean emailed customers ([Computerworld](https://www.computerworld.com/article/4005509/salesforce-changes-slack-api-terms-to-block-bulk-data-access-for-llms.html)).
- Slack MCP server and Real-time Search API, Feb 2026 ([changelog](https://docs.slack.dev/changelog/2026/02/17/slack-mcp/)).
- GDPR portability study: 182 services, 69 of 135 exports format-compliant ([PoPETs 2021](https://petsymposium.org/popets/2021/popets-2021-0051.php)).
- DMA business-user data access ([DMA](https://digital-markets-act.ec.europa.eu/about-dma_en)); obligations since March 2024 (gatekeepers page).
- DTI transfers: Google Photos to iCloud ([DTI](https://dtinit.org/blog/2024/07/10/DTI-members-new-photo-video-tool)); playlists ([DTI](https://dtinit.org/blog/2024/08/27/DTI-members-new-music-tool)).

## Claims corrected
- "1,000 API calls per user per 24 hours; weeks to analyze" → an org-wide pool, and the Bulk API exists.
- "Slack's 2024 API changes" → May 2025.
- "182 providers, 51% compliant" → 69 of the 135 that exported.
- "DMA effective September 2025" → obligations since March 2024 (stated without a date claim beyond "since March 2024").

## Claims cut
- Facebook "18 months" (unverified).
- Twitter "most important thing" quote (unsourced).
- Twitter 1.5M exports (it's a developer redistribution rule, not relevant).
- $3.1T (misattributed IBM US bad-data figure).
- 12 h/week, 624,000 h, $21.6M (unsourced).
- IDC 30% of revenue (unsourced).
- DATAVERSITY 68% (unsourced).
- ByteDance/Feishu, Alibaba and Tencent section (unverified).
- Google €50M "portability" fine (wrong).
- Seven US states (IAPP doesn't mention portability).
- Korea MyData (not needed).
- The duplicated costs list.
- Quick Navigation, TLDR, Bottom Line, Related Posts, footer.

**Update notes:** none; the 2025-26 facts (Slack) are in the body.

**Internal links:** build-vs-buy-agentic-ai, agentic-ai-wealth-data-architecture, saas-evolution-ai-era, data-portability-eu-data-act. The `[LINK: The SAAS Reckoning]` placeholder is gone.

## Questions for Randy
- The China section (ByteDance built Feishu in-house; Alibaba Cloud "won't do SaaS") was cut because none of it could be verified. Want it back if you have sources?
- The costs section now says "I don't trust the big numbers... and I haven't found a good source". Is that a stance you're happy to take in first person?
- "Performative integrations" is kept as your term. OK?
