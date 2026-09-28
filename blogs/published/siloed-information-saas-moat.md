---
title: Why your SaaS data is so hard to move
description: SaaS vendors make your data hard to move, sometimes by design, and AI raises the cost of that. What it looks like and what to ask for before you sign.
topic: vendors-and-platforms
published: 2025-11
updated: 2026-09
---

Your customer records live in Salesforce, your projects in Asana, your documents in Google Drive, your conversations in Slack and your dashboards in Tableau. Every one of those products has an API and a page of integrations. The trouble starts when you try to build something that needs all of them at once, like an assistant that can answer a question about a client using their contract, their support history and the last three months of email. That's when you find out how much of your own data you can actually reach, how fast, and in what shape.

Some of that friction is ordinary technical debt. Some of it is the business model. For twenty years, switching cost has been one of the most reliable moats in software: once your workflows, history and integrations sit inside a vendor's product, leaving is expensive, so you stay even when something better comes along. I don't think most vendors set out to trap their customers, but very few have had a reason to make leaving easy.

## Why it matters more now

Two things changed with AI. The first is that your own data got more valuable. Retrieval, agents and analytics all work better when they can see across systems, and an organization that can assemble a full picture of a customer or a process has an advantage over one that only sees what each tool shows it.

The second is that building small tools got cheaper. With coding agents, a team can put together a working internal tool in days rather than months, which changes the [build versus buy](/blog/build-vs-buy-agentic-ai) conversation for workflows that are specific to you. Both changes make lock-in more costly than it used to be.

## What the friction looks like

The limits usually take the form of allowances, formats and terms that make large-scale access slow or awkward.

Salesforce is a useful example because its limits are well documented. An Enterprise Edition org gets a shared pool of [100,000 API requests a day plus 1,000 per Salesforce licence](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_app_limits_cheatsheet.pdf), and Professional Edition needs API access added before any of that applies. A determined team can move a lot of data within those limits, especially with the Bulk API. The built-in backup tells you more about priorities: the Data Export Service produces [a zip of CSV files, weekly at best, deleted 48 hours after the notification email](https://trailhead.salesforce.com/content/learn/modules/lex_implementation_data_management/lex_implementation_data_export). The relationships between records survive only as ID columns that you reassemble yourself.

Slack shows how quickly the terms can change. On 29 May 2025 it [cut the rate limits](https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps/) on reading message history for new installations of apps distributed outside its Marketplace, to one request a minute and 15 messages per request. Its updated API terms [prohibited bulk export and using Slack data to train language models](https://www.computerworld.com/article/4005509/salesforce-changes-slack-api-terms-to-block-bulk-data-access-for-llms.html), and Glean, which indexed Slack for enterprise search, emailed customers to explain what the change would mean for them. In February 2026 Slack [opened a different door](https://docs.slack.dev/changelog/2026/02/17/slack-mcp/): an MCP server and a real-time search API that let outside agents query Slack data without storing it. That's a reasonable design, and it may well be better for privacy. It also shows who decides the terms on which your own conversation history reaches the AI tools you choose.

Then there are the integrations. A product can advertise hundreds of them, and most will be one-way syncs, a few mapped fields, or a webhook that announces something happened without passing the data. I think of these as performative integrations. They look like openness on the pricing page and don't give you your data with its structure intact.

## What it costs

I don't trust the big numbers that usually appear at this point in articles like this one, and I haven't found a good source for any of them. The costs are easier to see up close. The same customer gets typed into the CRM, the finance system and the marketing platform, and the three records drift apart. Nobody is sure which one is right, so decisions depend on which screen someone happened to check. Questions that span systems, like which customers with open support issues are up for renewal this quarter, turn into an export-and-reconcile exercise. And any AI you deploy knows only what each silo shows it.

## What to do about it as a buyer

Ask before you sign. Most portability problems are cheaper to prevent than to fix, and these are the questions I'd put to any vendor:

- Can we export everything, including custom fields, attachments and history, in standard formats such as CSV, JSON or Parquet?
- What are the limits on bulk access, and what does more cost?
- Can the API both read and write, and does it expose what your own interface can do?
- Do you offer an MCP server, and what can it reach?
- If we leave, what help do you provide, how long does it take and what does it cost?

A vendor that answers these clearly is telling you something good about its product. A vague answer tells you something too.

Keep a copy of your canonical data somewhere you control. Sync the systems that matter into a warehouse or lakehouse, normalize it there and make that the source for analytics and AI. The SaaS tools remain the places where work gets done, but they stop being the only place your history lives. My post on [data architecture for wealth management](/blog/agentic-ai-wealth-data-architecture) walks through one way to structure that store.

Prefer open standards where your domain has them, such as FHIR in healthcare or SCIM for identity. And build lightweight tools for the workflows that are genuinely yours. You don't need to rebuild a CRM to stop depending on it for a process only your organization runs.

## Where regulation helps

Regulators have been pushing on portability for years, mostly on behalf of individuals. Article 20 of the GDPR gives people a right to their data in a "structured, commonly used and machine-readable format". Compliance has been patchy: when researchers requested exports from 182 online services, [only 69 of the 135 that sent anything used a compliant format](https://petsymposium.org/popets/2021/popets-2021-0051.php). Since March 2024 the Digital Markets Act has also required the largest platforms to let [business users access the data they generate](https://digital-markets-act.ec.europa.eu/about-dma_en) on them.

Industry efforts show that direct transfer works when the big players decide it should. Through the Data Transfer Initiative, Apple and Google now let people move [photo libraries from Google Photos to iCloud](https://dtinit.org/blog/2024/07/10/DTI-members-new-photo-video-tool) and [playlists between Apple Music and YouTube Music](https://dtinit.org/blog/2024/08/27/DTI-members-new-music-tool). Look at what those cover: things people own and would miss, not the relationship and behaviour data that makes a platform hard to leave.

For business software the bigger change is the EU Data Act, which since September 2025 has required cloud and SaaS providers to remove obstacles to switching. The [third post in this series](/blog/data-portability-eu-data-act) covers what it requires.

## One test worth running

Pick one system you depend on and try to get everything out of it: every record, every custom field and the history, in a form another tool could load. Time how long it takes and note what breaks. That's your real switching cost, and it's a better basis for your next renewal conversation than the vendor's integrations page.

This is the first of three posts on SaaS lock-in. The [second](/blog/saas-evolution-ai-era) is about what vendors should do instead, and the [third](/blog/data-portability-eu-data-act) about the EU Data Act.
