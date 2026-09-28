---
title: What Microsoft is really selling with Copilot
description: Copilot is Microsoft's bid to be the layer between your people and every AI model. The gains are real; know what you give up and what to ask.
topic: vendors-and-platforms
published: 2025-11
updated: 2026-09
---

If you're deciding on Microsoft Copilot, it helps to be clear about what you're buying. On the surface it's AI inside Word, Outlook, Excel and Teams. The bigger thing Microsoft is building is the layer between your people and whichever AI models sit underneath. That's a sensible thing for Microsoft to want, and often a sensible thing to buy. I'd just rather you bought it knowingly.

The details below are as of September 2026. They change often, so check Microsoft's own pages before you sign anything.

## What you can buy

Microsoft has started calling Microsoft 365 Copilot simply [Microsoft Copilot](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy), though the price lists still use the old name. The main options, at list prices as of September 2026:

| Option | What you get | List price |
|---|---|---|
| Copilot Chat | Web-grounded chat with file uploads and IT controls, for work accounts on an eligible Microsoft 365 plan | [No additional cost](https://www.microsoft.com/en-us/microsoft-365-copilot/enterprise) |
| Microsoft 365 Copilot | Copilot grounded in your email, files, meetings and chats, inside the Office apps | [$30 per user per month](https://www.microsoft.com/en-us/microsoft-365-copilot/enterprise), paid yearly, on top of a qualifying plan |
| Microsoft 365 Copilot Business | The add-on sold with Microsoft 365 business plans | [$21 per user per month](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing), $18 on promotion until 31 December 2026 |
| Copilot Studio | Build agents and publish them, including to external websites and apps | [$200 a month per 25,000 Copilot Credits](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/copilot-studio) |
| Microsoft 365 E7 | E5, Copilot, Agent 365 and Entra Suite in one licence | [$99 per user per month](https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/) |

People with a Copilot licence can also build and use agents in Copilot Chat at no extra cost. Agent 365, sold on its own at $15 per user, is Microsoft's control plane for governing agents across a tenant.

Plenty of organizations have stopped waiting. Microsoft says Microsoft 365 Copilot passed [30 million paid seats](https://news.microsoft.com/source/2026/07/29/microsoft-cloud-and-ai-strength-fuels-fourth-quarter-results-4/) by the end of June 2026, and that [90 percent of the Fortune 500](https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/) use Copilot. Those are Microsoft's own figures.

## The strategy, in four layers

The first layer extends the Microsoft 365 moat. Email, documents and meetings already make Microsoft expensive to leave. Once people rely on AI-drafted replies, meeting summaries and document help inside those apps, moving to Google Workspace or anything else means giving those up too.

The second captures the workflow. Many people still copy work into ChatGPT or Claude and paste the answer back, which is clumsy and leaks data. Copilot's pitch is to bring the AI to where the work already happens.

The third is behavioural data. Microsoft [commits](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy) that prompts, responses and the data Copilot reads through Microsoft Graph aren't used to train foundation models. My assumption is that it still learns a great deal about which features get used and which workflows matter, and that knowledge shapes the product in ways a competitor without that view can't match.

The fourth is platform control. With AI built into Windows, Edge and the Office apps, Microsoft's assistant is native and everyone else arrives as an add-in or an extension. Microsoft used much the same playbook to make Windows dominant.

I don't think any of this is sinister. A platform company should want exactly this, and buyers should see it clearly.

## Microsoft as model broker

When I first wrote about Copilot, it ran mainly on OpenAI's models and customers had no say in which. That has changed more than anything else here.

On the OpenAI side, GPT-5.6 became Copilot's ["preferred model"](https://techcrunch.com/2026/07/09/openai-says-gpt-5-6-is-the-preferred-model-for-microsoft-copilot-amid-breakup-chatter/) in Word, Excel, PowerPoint and Cowork in July 2026. Microsoft now delivers OpenAI models two ways: ones it runs itself in Azure, and ones [OpenAI runs as a Microsoft subprocessor](https://learn.microsoft.com/en-us/microsoft-365/copilot/openai-subprocessor), switched on by default for eligible commercial customers from 24 July.

On the Anthropic side, Claude models are [on by default](https://learn.microsoft.com/en-us/microsoft-365/copilot/connect-to-ai-subprocessor) for most commercial customers outside the EU, EFTA and the UK, across Copilot, Researcher, Copilot Studio, Power Platform and Copilot in the Office apps. Claude is also in mainline Copilot chat through Microsoft's Frontier program, and Copilot Cowork, in research preview, was ["built in close collaboration with Anthropic"](https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/). Microsoft's privacy documentation adds that it may also deploy models it hosts and operates itself.

Admins decide which providers each user or group can use. Users can pick Claude in features such as Researcher, and Copilot Studio makers choose a model for each agent. Microsoft has loosened its own ties too: in April 2026 its [licence to OpenAI's technology became non-exclusive](https://blogs.microsoft.com/blog/2026/04/27/the-next-phase-of-the-microsoft-openai-partnership/).

The data terms differ by provider, and this is where I'd look hardest. Anthropic's models are [excluded from the EU Data Boundary](https://learn.microsoft.com/en-us/microsoft-365/copilot/connect-to-ai-subprocessor) and from in-country processing commitments, which is why they're off by default in Europe. OpenAI-operated models sit inside the EU Data Boundary but outside in-country processing commitments. Some advanced Anthropic models are offered only "with data retention" under Anthropic's own terms, with most inputs and outputs kept for up to 30 days, and stay off until an admin opts in.

So my original complaint, that you don't get to choose the model, is only half true now. You choose from a menu Microsoft sets, on terms Microsoft negotiates. That is the interface-layer strategy working as intended: Microsoft doesn't need to own the best model if it owns the place where your people use models.

## What you get and what you give up

For routine work, Copilot is useful: summarizing long threads, drafting standard documents, meeting notes and action items, and analysis in Excel if you know what to ask for. For a Microsoft-centric organization it's the shortest path to broad AI use, with no new tool to learn and no data to move.

How big the gains are is less clear. A [Forrester study commissioned by Microsoft](https://tei.forrester.com/go/microsoft/M365Copilot/) modelled a 116% three-year return for a composite enterprise. The UK government's [cross-government experiment](https://www.gov.uk/government/publications/microsoft-365-copilot-experiment-cross-government-findings-report), with 20,000 civil servants from September to December 2024, found self-reported time savings averaging 26 minutes a day. I'd plan around the second number.

What you give up, or take on:

- Your permissions become visible. Copilot [only surfaces](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy) what each user can already view, so loose SharePoint permissions become Copilot answers. Clean up oversharing before rollout; a [data-readiness roadmap](/blog/cognitive-enterprise-microsoft-roadmap) helps.
- Cost per head, on top of Microsoft 365. At $30 a month, 1,000 people cost $360,000 a year before any agent capacity, and once workflows depend on it you negotiate renewals from a weak position.
- Habits that don't travel. Your Copilot history stays in your tenant, where admins can search and manage it with Content search and Purview, including retention policies, and users can delete their own. The data isn't trapped. The habits, agents and workflows built around Copilot don't move to another assistant.
- Concentration. Your productivity suite and your AI layer come from one vendor, so one outage or policy change hits both. Whether that's worth hedging is a [separate calculation](/blog/cloud-provider-diversification).

## Other ways to do it

You don't have to choose between Copilot everywhere and nothing. A hybrid works for many organizations: Copilot for email, documents and meetings, and other tools where you need a different model or different data handling. You can also build on Microsoft 365's APIs with a model of your choice, which gives you control at the price of owning the build (I've written about [when building is worth it](/blog/build-vs-buy-agentic-ai)). Or pilot with a few teams before standardizing. Whatever you choose, give people something sanctioned; if you don't, they'll find their own tools.

## Questions I'd ask Microsoft

I'd want answers to these before signing:

- Which models power which features for our tenant, and what stops working if we switch a provider off?
- Which of those models sit outside the EU Data Boundary or in-country processing, and which keep data under a third party's terms?
- How are model changes announced, and can we test them before they reach users?
- How do agents consume Copilot Credits, and how do we cap that spend?
- Do we need Agent 365 to govern agents properly, or is that covered by what we already license?
- What is the full per-user cost including the base licences Copilot requires, and what price protection do we get at renewal?
- Can Copilot run in a private cloud or on premises, if our regulators require it?

Some of these have public answers in Microsoft's documentation. The contract-specific ones need Microsoft's sales and legal teams.

The thing I'd watch is how generous the menu stays. Right now Microsoft offers model choice because it keeps customers from looking elsewhere. Whether that choice stays as open once the switching costs are in place is something I can't answer yet.
