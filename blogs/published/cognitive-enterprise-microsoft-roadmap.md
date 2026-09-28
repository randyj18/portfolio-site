---
title: AI readiness on the Microsoft stack, without a migration
description: If you run on Microsoft 365 and Azure, you can make scattered knowledge usable by AI agents without moving it all. How I'd sequence Purview, Fabric and search.
topic: data-and-knowledge
published: 2025-11
updated: 2026-09
---

Most of what an organization knows sits in SharePoint sites, file shares, mailboxes and Teams chats, and much of it can't be found by the people who need it. The change AI promises is from employees as retrievers, who spend their time finding information, to employees as reviewers, who check and apply what an AI system has pulled together from across the organization. That depends on the AI reaching the right material and staying away from the wrong material.

The usual assumption is that this requires a large migration into a new data platform. For organizations that already run on Microsoft, I don't think it does. You can get most of the way by classifying what you have, connecting to data where it lives, and building a proper retrieval layer on top. This post sets out how I'd sequence that on the Microsoft stack. The general case for metadata is in [Metadata is what makes knowledge findable](/blog/metadata-matters).

One cost note first. A Microsoft 365 subscription on its own doesn't give you Fabric workloads such as lakehouses and notebooks. For those you need a [Fabric capacity bought through Azure](https://learn.microsoft.com/en-us/fabric/enterprise/licenses), or an older Power BI Premium capacity, which Microsoft is retiring in favour of Fabric SKUs. So "use what you already pay for" holds for Microsoft 365 and Purview in many organizations, and for Fabric only if someone has bought capacity.

## Step 1: classify what you have

Start with Microsoft Purview. Its Data Map scans your sources and classifies what it finds, with [more than 200 built-in classifications](https://learn.microsoft.com/en-us/purview/concept-classification) for things like passport and credit card numbers, and room for your own. Sensitivity labels are a separate mechanism from classifications, as Microsoft's documentation is careful to point out, and you'll probably want both.

The decision here is your minimum viable metadata: the few fields every document has to carry. For a multinational I'd start with region, document type, sensitivity and a review or expiry date. Region is the one people underestimate. An employee in France who follows the UK expense policy because the keywords matched is a compliance problem, and an AI system that does the same thing at scale is a bigger one. If documents carry a region, a system that knows the user is in France can ignore the UK policy and, if there's no French policy, say so instead of guessing.

Automated classification does most of the work, but someone has to handle the edge cases and own the vocabulary. The general approach to a schema, AI-suggested tags and enforcement at creation is in the [metadata post](/blog/metadata-matters).

## Step 2: connect instead of copying

OneLake shortcuts in Fabric let you reference data where it lives. Microsoft says they [behave like symbolic links](https://learn.microsoft.com/en-us/fabric/onelake/onelake-shortcuts): they appear as folders, any Fabric engine can read through them, and deleting a shortcut leaves the source alone. As of September 2026 they can point to other OneLake items, Azure Data Lake Storage, Azure Blob Storage, Amazon S3 and S3-compatible storage, Google Cloud Storage, Dataverse, Iceberg tables, and folders in SharePoint and OneDrive for Business.

Two limits are worth knowing before you plan around them. Traditional Windows file shares aren't on that list: on-premises shortcuts go through a data gateway and work only for [S3, S3-compatible and Google Cloud Storage endpoints](https://learn.microsoft.com/en-us/fabric/onelake/create-on-premises-shortcut), so file-server content has to be moved or copied. And [SharePoint and OneDrive shortcuts](https://learn.microsoft.com/en-us/fabric/onelake/shortcuts/create-onedrive-sharepoint-shortcut) work at folder level, for enterprise sites and OneDrive for Business only, and not for subsites.

Security follows the source. For shortcuts to other OneLake items, OneLake checks the calling user's own permissions on the target. External shortcuts use a stored connection's credentials, so access depends on how that connection is set up and who is allowed to use it. Caching can keep copies of files from S3, Google Cloud Storage and gateway sources for up to 28 days, which cuts egress costs.

The economics favour connecting over copying for most sources: there's no second copy to store and govern, and no sync lag. I'd still test query performance on the sources that matter, because reading remote data isn't always as fast as reading local tables.

## Step 3: refine, then index

Connected data still needs cleaning. The bronze, silver and gold layering I describe in the [wealth management architecture post](/blog/agentic-ai-wealth-data-architecture) applies here too, including the rule of landing data in bronze before transforming it. For documents, silver is where Purview classifications and your metadata fields get attached and checked, and gold is the curated, approved set.

Search is a separate layer built from that curated content. Azure AI Search runs keyword and vector search together, which Microsoft says [often provides better results than either alone](https://learn.microsoft.com/en-us/azure/search/vector-search-overview), and it can filter on metadata fields such as region, type and status. Its semantic ranker then reorders the top 50 results using [multilingual models adapted from Bing](https://learn.microsoft.com/en-us/azure/search/semantic-search-overview), scoring each result from 0 to 4. Together, those are what let a request about "implementation methodology" find an old proposal that talked about its "deployment approach".

## Step 4: agents, with a person in the loop

Agents come last, grounded in the curated layer. Microsoft's platform for building them has been renamed twice: Azure AI Studio became Azure AI Foundry and is now [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry), where agents are built in Foundry Agent Service and knowledge bases (Foundry IQ) run on Azure AI Search. The principle doesn't change with the name. Agents identify situations, weigh options against what the organization knows and act, with a person approving anything high-risk and a record of what they used.

Two examples. A bid manager who spends three days searching old proposals could instead start from a draft built from the last five winning proposals for similar clients in the same region, each cited with its author, date and approval status. If three days of searching becomes three hours of reviewing, that's roughly an eightfold saving, counting eight-hour days. And the regional policy case from step 1: an employee asks about expense reimbursement and gets the French policy or a clear statement that there isn't one.

## Collaboration data, handled carefully

The least-used piece of the Microsoft stack is probably Graph Data Connect, which gives analytics tools bulk access to [Microsoft 365 datasets in Fabric, Synapse or Data Factory](https://learn.microsoft.com/en-us/graph/data-connect-concept-overview), billed through your Azure subscription. One use is finding expertise from how people work rather than from who wrote a document years ago: who answers questions about transfer pricing in Teams, and who gets pulled into those meetings.

That needs care. Graph Data Connect goes well beyond activity metadata: its [datasets include email messages, Teams chat messages and meeting transcripts](https://learn.microsoft.com/en-us/graph/data-connect-datasets). Privacy depends on which datasets you ask for and who approves them. I'd start with activity data only, get explicit sign-off from privacy and HR, and tell employees what's being analyzed and why.

## Decisions that need an owner

Three decisions tend to stall this kind of work.

The first is speed versus hygiene. My answer is to do both: land data in bronze quickly, and let AI read only silver and gold. Access controls enforce that, so nobody has to wait for perfect data to start.

The second is the metadata mandate. Required fields at creation change how people work, and that needs a senior sponsor. The case for it is simple: a few seconds of tagging saves every later reader from searching.

The third is whether Fabric becomes the platform. If it's where analytics and AI run, budget moves from copies, point-to-point integrations and file-server upkeep toward capacity, governance and search. That's a reallocation more than new money, but only if the old spending actually stops.

For the wider question of what Microsoft is selling with Copilot, and what to ask before committing to it, see [my post on Copilot](/blog/copilot-microsoft-play). What I don't know yet is how much of this Microsoft will fold into Copilot itself, and whether the pieces you build now will end up as configuration rather than projects. I'd build the metadata and the curated layer regardless. They're useful whatever the interface turns out to be.
