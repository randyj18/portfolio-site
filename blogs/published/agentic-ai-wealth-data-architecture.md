---
title: Data architecture for AI agents in wealth management
description: Wealth firms run on overnight batch files. Before agents can act on that data, it needs layers that are provable, reconciled and modelled for use.
topic: data-and-knowledge
published: 2025-11
updated: 2026-09
---

A client deposits $500,000 at ten in the morning and calls their adviser at two in the afternoon to talk about what to do with it. The adviser opens the firm's new AI-assisted portfolio tool, and it shows yesterday's balance. The deposit won't appear until the overnight files have been processed. The data is correct as of last night, and the adviser has no way to tell stale from wrong. After one or two moments like that, they go back to the custodian's portal.

That scenario is why I think many AI projects in private wealth management struggle once they reach production. The model is rarely the problem. The data underneath it was designed for overnight reporting, and agents need something else. This post sets out the architecture I'd use: layered data in a lakehouse, CRM data accessed where it lives, and a few agent patterns with a person signing off.

## Why the data arrives the way it does

The systems at the core of the business, custodians, clearing firms and transfer agents, work in end-of-day cycles. The authoritative position on an account isn't settled until the day's trades, corporate actions and reconciliations have run, and then the results go out as files, often fixed-width or delimited text sent over SFTP. That design favours throughput, reliability and legal finality, and it won't change because someone wants real-time AI.

Every feed has its own layout, timing and quirks. Some arrive in the small hours and some later; some are full snapshots and some contain only changes. A lot of engineering goes into handling that before any analysis starts, and the architecture has to be designed around it rather than wished away.

## Three layers

The pattern I'd use is what Databricks calls the medallion architecture: raw data lands in a bronze layer, gets cleaned and validated in silver, and is modelled for use in gold. Databricks' own documentation calls it [a recommended best practice but not a requirement](https://learn.microsoft.com/en-us/azure/databricks/lakehouse/medallion), which is the right way to think about it: a discipline you can apply with more than one product.

### Bronze: what arrived, and proof of it

Every file lands in its original format, timestamped and archived in storage that can't be altered. I'd also record a SHA-256 hash of each file as it arrives. The point is to be able to answer, months later, exactly what data the firm had when it made a decision, and to show the file hasn't changed since. Bronze is also what makes recovery possible: when a transformation goes wrong, you reprocess from the original. Databricks describes the bronze layer as one that [enables reprocessing and auditing by retaining all historical data](https://learn.microsoft.com/en-us/azure/databricks/lakehouse/medallion), and recommends against writing to silver directly from ingestion.

### Silver: cleaned, reconciled and explained

Silver is where raw files become usable records, stored in a table format such as Delta Lake. For wealth data the work looks like this:

- Parsing fixed-width files against explicit byte-position schemas, because a single off-by-one error corrupts everything downstream.
- Validation gates before anything loads: expected record counts, control totals, the right file date. Reject early rather than repair later.
- Deduplication, null handling and code translation, turning a custodian's numeric transaction codes and abbreviated security types into readable values that people and models can use.
- Survivorship rules. The custodian, the CRM and the planning tool may each hold a different address for the same client. The rules for which source wins have to be explicit, versioned and auditable. For example, the custodian wins for legal and tax purposes and the CRM wins for communication preferences.
- Provisional data. Where intraday information exists, silver can show pending transactions, clearly marked as unconfirmed until the batch arrives. That's the fix for the deposit problem.

One caution about history. Table formats like Delta Lake support time travel, which means querying a table as it was at an earlier version. But by default [Delta keeps about 30 days of history](https://docs.delta.io/latest/delta-batch.html), and cleanup removes older files. That's useful for debugging and not enough to answer a regulator's question about last year. For long-horizon, point-in-time questions, keep dated snapshots or history tables in silver and rely on the bronze archive.

### Gold: modelled for use

Gold is where data is shaped for the people and systems that consume it. That means dimensional models for reporting, with transactions and holdings as facts and clients, accounts and securities as dimensions; pre-computed features such as rolling returns and volatility for models; and a semantic layer with business definitions that agents can query without touching raw tables. Databricks describes gold as the layer for [dimensional modelling and aggregation](https://learn.microsoft.com/en-us/azure/databricks/lakehouse/medallion). If you also build a vector index for document search, treat it as a separate serving layer built from curated content rather than as part of gold.

A good test of gold is speed. An analyst should be able to build a new report in hours, and an agent should be able to answer a portfolio question without reading raw tables.

## CRM data without copying it

The CRM is a different case. Instead of extracting it every night, you can query it where it lives. Salesforce's [Zero Copy Partner Network](https://www.salesforce.com/data/zero-copy-partner-network/) connects Data 360 (formerly Data Cloud) with platforms including AWS, Databricks, Google, Snowflake, IBM and Microsoft, and Salesforce reported [15 trillion records ingested through Zero Copy](https://www.sec.gov/Archives/edgar/data/1108524/000110852425000234/crm-q3fy26xexhibit991.htm) in a single quarter in 2025. Microsoft's equivalent inside Fabric is the OneLake shortcut, which I cover in my [Microsoft roadmap](/blog/cognitive-enterprise-microsoft-roadmap).

The benefits are real: one system of record for relationship data, fewer stale copies, and fewer copies of sensitive client data to govern. So are the limits. Queries against a live source cost compute, can be slower than local tables and are subject to the source's own limits, so I'd test the joins you care about, such as CRM relationship notes against custodial positions, before relying on them.

The same thinking applies to where people see the results. Advisers live in the CRM, so put curated numbers and agent output there rather than asking them to open another tool.

## What agents can do on top

By agent I mean a system that works toward a goal through a series of steps, using a defined set of tools, rather than a chat window that answers questions. Agents need the layers above: gold for clean data, silver history for context, and bronze for proof of what they saw.

They also need governance before anything else: an inventory of agents with the data each can read and the actions each can take; a rule that anything involving money movement, trade execution or client communication needs a person's approval; and, with every recommendation, an explanation of the data and rules it used. I've written about [keeping that kind of governance practical](/blog/ai-governance-without-theater).

Three examples show the pattern. A rebalancing agent watches for drift beyond policy, for example equities at 68% against a 60% target. It pulls positions, tax lots and client constraints from gold, runs an optimizer to restore the target while limiting the tax cost, and sends the proposal to the adviser. Only after approval does it produce a trade file for the order management system.

A not-in-good-order check runs when a new account application is uploaded. It reads the document, validates the fields against business rules (a correctly formatted tax identifier, required signatures, beneficiary percentages that add up to 100), cross-checks existing client data and flags problems to the adviser within minutes, so errors are caught before the custodian rejects the paperwork.

A meeting-preparation agent runs two days before a client meeting. It assembles recent activity, performance against benchmark, cash and upcoming liquidity needs from the financial plan, relevant news about holdings, and life events noted in the CRM. It checks for planning gaps such as an out-of-date beneficiary designation. The output is a short, prioritized brief with the supporting data attached.

The specific agents matter less than the pattern: trustworthy data, a narrow set of actions and a person who decides. Whether to build them or buy them is a separate question, which I cover in [build versus buy for agentic AI](/blog/build-vs-buy-agentic-ai).

## Where I'd start

Start with one feed. Land it in bronze with a hash, reconcile it in silver against the custodian's own totals, model it in gold, and put one number in front of advisers that they trust more than the portal. If that works, the second feed is much easier, and you'll have learned where your data is weak before an agent finds out for you.

Vendors are heading the same way. In October 2025 Salesforce and Anthropic said their first [industry solutions would be for financial services](https://www.anthropic.com/news/salesforce-anthropic-expanded-partnership), starting with adviser tasks such as portfolio summaries and compliance tracking. Those tools will be only as good as the data they're pointed at.
