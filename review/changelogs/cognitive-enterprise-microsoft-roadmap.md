# cognitive-enterprise-microsoft-roadmap: change log

**What happened:** rewritten as Randy's Microsoft-specific guidance rather than an internal decision memo. New title: "AI readiness on the Microsoft stack, without a migration". Topic: data-and-knowledge.
- Medallion detail now links to agentic-ai-wealth-data-architecture instead of being restated; the schema links to metadata-matters.
- Product names updated to the current names verified on Microsoft Learn (Jun-Sep 2026).
- Vendor-blog links (kanerika, refoundry, dataspotcg, sharepointeurope, pondhouse, Medium) replaced with Microsoft Learn.

**Word count:** 3,305 before, 1,339 after.

## Claims kept (with sources)
- A Fabric capacity (F SKU via Azure, or a retiring P SKU) is needed for Fabric workloads ([Fabric licences](https://learn.microsoft.com/en-us/fabric/enterprise/licenses)).
- Purview Data Map has more than 200 built-in classifications, and sensitivity labels are separate ([Microsoft Learn](https://learn.microsoft.com/en-us/purview/concept-classification)).
- OneLake shortcuts behave like symbolic links; supported sources; identity model; caching of 1-28 days ([shortcuts](https://learn.microsoft.com/en-us/fabric/onelake/onelake-shortcuts)); on-premises only for S3, S3-compatible and GCS ([on-prem](https://learn.microsoft.com/en-us/fabric/onelake/create-on-premises-shortcut)); SharePoint/OneDrive folder-level limits ([SharePoint](https://learn.microsoft.com/en-us/fabric/onelake/shortcuts/create-onedrive-sharepoint-shortcut)).
- Azure AI Search hybrid "often provides better results"; filters ([vector overview](https://learn.microsoft.com/en-us/azure/search/vector-search-overview)); semantic ranker reranks the top 50 with Bing-adapted multilingual models and scores 0 to 4 ([semantic ranking](https://learn.microsoft.com/en-us/azure/search/semantic-search-overview)).
- Microsoft Foundry (formerly Azure AI Studio / Azure AI Foundry), Foundry Agent Service, Foundry IQ ([Microsoft Learn](https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry)).
- Graph Data Connect: datasets in Fabric, Synapse and ADF, billed via Azure ([overview](https://learn.microsoft.com/en-us/graph/data-connect-concept-overview)); includes mail, Teams chat and transcript datasets ([datasets](https://learn.microsoft.com/en-us/graph/data-connect-datasets)).

## Claims corrected
- "Most enterprises already have... Fabric licences" → Fabric needs capacity.
- Shortcuts to "a regional file server" and "critical file shares" → not supported; move or copy.
- "Inherits workspace identity... metadata cached" → caller identity for internal shortcuts, connection credentials for external ones; files are cached.
- "Same performance as native tables" → removed; test performance.
- "Copilot for Microsoft Purview" → removed (it's now Security Copilot in Purview, focused on alerts; not needed).
- "Azure Purview" → Microsoft Purview.
- "Azure AI Studio" → Microsoft Foundry.
- "Azure AD" → removed.
- GDC "uses metadata, not content" → includes content datasets; privacy depends on the datasets requested.
- "Graph Data Connect licensing" → Azure consumption billing.
- Gold = "vectorized" → gold is curated; search is a separate layer.
- RFP "20x" → roughly eightfold with eight-hour days.
- "Data Mesh" misuse → removed.

## Claims cut
- 12 h/week and $21.6M (the cited page doesn't contain them).
- Purview "50% reduction in exposure risk" and "40% faster compliance reporting" (vendor blog).
- "<30%" completion.
- "GPT-4 is commoditized".
- "12-18 month head start".
- The step-change table, the memo framing ("leadership must authorize", "executive team must align"), the "Why This Matters" blocks and the TLDR.

**Update notes:** none (current names in the body).

**Internal links:** metadata-matters, agentic-ai-wealth-data-architecture, copilot-microsoft-play.

## Questions for Randy
- The original read like an internal strategy memo ("The organization stands at a critical juncture", "leadership must authorize a four-phase execution plan"). Was it adapted from client or employer work? Check confidentiality before publishing, and don't imply an engagement.
- Graph Data Connect advice is now cautious (start with activity data, involve privacy and HR, tell employees). The original presented expert-finding as privacy-safe. OK with the more cautious stance?
- The closing question (whether Microsoft will fold this into Copilot so the work becomes configuration) is new framing. Does it match your view?
