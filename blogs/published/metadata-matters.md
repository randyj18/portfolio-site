---
title: Metadata is what makes knowledge findable
description: Most organizations already have the answers and can't find them. A small schema, AI-suggested tags and rules for AI-generated clutter fix most of it.
topic: data-and-knowledge
published: 2025-11
updated: 2026-09
---

Somewhere in your organization there's a document that solves the problem you're working on today. You won't find it, because its author called it "Project Phoenix Final v3" and you're searching for "customer onboarding automation". Nothing about the file says what it is, who it's for, whether it was approved or whether it's still current.

Give the same file a few fields (topic: customer onboarding; type: process automation; department: sales operations; status: implemented; last reviewed: March 2024; access: internal) and it becomes findable, filterable and safe to hand to an AI system. That's all metadata is. Most organizations know this, and most still don't do it well, because tagging is tedious and nobody enforces it.

The useful knowledge is scattered through old email threads, personal OneDrive folders, archived Slack channels, SharePoint sites nobody remembers, and the heads of people who have left. Finding it is the point of much of the AI work organizations are doing now, and failing to find it is one reason the same problems get [solved more than once](/blog/duplicated-solution-problem).

## Why AI makes it matter more

If you want to use your documents with AI, through retrieval, agents or search, metadata does four jobs.

It controls permission. Before a document goes into an AI system, you need to know whether it contains personal data, whether it's covered by an NDA and who is allowed to see it. Without fields that say so, you're guessing.

It controls relevance. A customer support assistant shouldn't be pulling from HR policies or financial forecasts. Retrieval that surfaces the wrong documents is a common source of confident wrong answers, and the simplest defence is to limit what the retriever can see. Search engines built for this assume you have the fields: Azure AI Search, for example, lets a query [combine a vector search with filters on text and numeric fields](https://learn.microsoft.com/en-us/azure/search/vector-search-overview), which only helps if those fields are filled in.

It controls recency. A best practice from 2018 may have been replaced twice since. "Last reviewed" and "status: deprecated" keep stale answers out.

And it connects silos. Knowledge lives in SharePoint, Google Drive, Confluence, email and chat, and consistent fields across them are what make a single search possible. Tools vary a lot in how much metadata they keep and let you export, which is one more thing to [check before you buy](/blog/siloed-information-saas-moat).

## Why it doesn't happen

The failure modes are predictable. Teams use different words for the same thing: categories, labels, tags, classifications. Manual tagging takes time nobody has, so it gets done for a week after launch and then stops. Older systems either don't support rich metadata or keep it in formats that are hard to extract. And where standards exist, nothing enforces them, so documents get saved with the fields blank. My guess is that most optional metadata fields in most organizations are empty, and I'd design on that assumption.

## A practical way in

Start with a small schema. Required: a descriptive title, created and last-reviewed dates, an owner or department, and an access level (public, internal, confidential, restricted). Recommended: a topic from a controlled list, a status (draft, approved, deprecated) and related projects. Optional: free keywords, a review-by date and a version. If you want a reference point, the [Dublin Core element set](https://www.dublincore.org/specifications/dublin-core/dces/) defines fifteen general-purpose elements and is an ISO standard. Don't let a perfect standard hold up a simple schema you can use next month.

Let the machine suggest and a person confirm. Language models are good at proposing a topic, pulling out names and projects, and classifying the type of document. The workflow is simple: someone uploads a file, the system suggests fields, and the person accepts or corrects them. This is now a product feature rather than a project. SharePoint's [autofill columns](https://learn.microsoft.com/en-us/microsoft-365/documentprocessing/autofill-overview) run a prompt against each uploaded file and save the answer to a library column, including choices from a managed term set. Machine tagging isn't new either. In 2019 NASA described a [concept tagger](https://strategy.data.gov/proof-points/2019/05/28/improving-data-access-and-data-management-artificial-intelligence-generated-metadata-tags-at-nasa/) trained on about 3.5 million manually tagged documents that suggests terms from a list of about 7,000 keywords, each with a confidence score. The scores are the useful part, because they tell the reviewer where to look.

Enforce at the point of creation. If a field is optional it won't get filled in, so make the essential ones required and keep them few. Templates can pre-fill fields by document type.

Back-tag selectively. You have thousands or millions of untagged documents, and you don't need to fix all of them. Start with what gets opened, what changed recently and what people flag as important, and let people tag the rest as they come across it. Bulk tagging is still a weak spot in the tools: Microsoft's documentation for autofill columns says bulk processing of existing files will come "in a future release".

Wire it in. Metadata that doesn't feed search filters, retrieval rules and recommendations is admin overhead. The value shows up when a search for customer onboarding can be limited to approved process documents updated since 2024, and returns a dozen results instead of thousands. For organizations that run on Microsoft, I've written a separate [roadmap for Purview, Fabric and search](/blog/cognitive-enterprise-microsoft-roadmap).

## Rules for AI-generated content

AI adds a new source of clutter. People can generate thirty variants of a document in ten minutes, and without some discipline you end up with fifteen versions of the same draft, experiments nobody used and summaries of summaries. Each one makes search and retrieval a little worse, because there's more that looks relevant and isn't.

I wouldn't ration AI use to deal with this. Lifecycle rules work better, and they depend on metadata. A starting point I'd suggest: brainstorming output expires after 30 days unless someone marks it to keep, intermediate drafts are archived after 90 days, and final deliverables follow your normal retention policy. Use version history instead of saving copies, move old material to cheaper storage automatically with a warning to the owner, and let deduplication catch near-identical files. Explain why, too. Deleting drafts you don't need and consolidating iterations are habits, and so is compressing the photos in the monthly newsletter.

Storage is where the cost shows up, though for text it's small. Cold tiers are much cheaper than hot ones: in Google Cloud's Iowa region, standard storage is [$0.02 per GiB a month, Coldline $0.004 and Archive $0.0012](https://cloud.google.com/storage/pricing), with retrieval fees and minimum storage periods of 90 and 365 days on those two tiers. Storage prices also aren't only going down anymore. Western Digital reported that its [average price per exabyte to cloud customers rose 8%](https://www.sec.gov/Archives/edgar/data/106040/000162828026057139/wdc-20260703.htm) in its 2026 fiscal year, citing an improved pricing environment, alongside strong demand for high-capacity drives.

Even so, I'd rather put a line for storage in the [AI budget](/blog/ai-budget-democratizing-innovation) than slow experimentation down to save on it. As an illustration: if extra storage cost $100,000 a year and AI use saved 10,000 hours at $100 an hour, the trade would be ten to one. The clutter is the bigger problem, and metadata is how you manage it.

## Where to start

Pick one collection that matters, such as proposals, policies or process documentation. Define five fields, turn on suggestions, make two of the fields required at upload, and measure how long it takes people to find things before and after. That gives you something concrete to show before you ask anyone to tag everything.

What I don't know yet is how far AI retrieval will get on content alone as models improve. I suspect permission, status and recency will keep needing explicit fields, because a model can't reliably infer who is allowed to see a document or whether it was replaced last month.
