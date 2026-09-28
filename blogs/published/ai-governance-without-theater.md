---
title: AI governance without the theatre
description: Governance people route around protects nothing. Start with a sandbox, a few data tiers, risk-based review and logging, and write policy from what breaks.
topic: leadership
published: 2025-11
updated: 2026-09
---

The sequence is familiar. Legal asks for a comprehensive AI governance framework before anything ships. Consultants arrive with templates. Months later there's a long document, a set of principles nobody can object to, and an approval workflow with so many sign-offs that a simple request takes a quarter. Engineers learn to route around it, sometimes by not calling their work AI at all. The framework exists, and the governance doesn't.

My view is that useful AI governance comes from people who have built things and hit the problems, then written down what worked. Most of my working days go to AI strategy and governance, and more of them now go to building agentic systems. I also build small projects in my spare time, with AI agents writing the code; the [playground](/playground) has a few, including VOICE-Relay, an end-to-end encrypted relay for voice conversations between AI agents and people. Even at that scale, building changes what you think a policy needs to say.

## What building teaches you about policy

A few things become obvious once you've built something that handles real data.

Data protection is mostly architecture. Encrypting a relay end to end forces decisions about where data is processed, what gets logged and who holds the keys. A policy line saying "data must be encrypted" answers none of those.

Human oversight can't mean a person approving every step, or there's no point automating. Oversight has to scale with risk.

Bias questions get concrete: what happens when a model denies someone a service, how you would detect it, and how fast you could respond. Having answers to those matters more than choosing the ideal fairness metric.

Prompt injection, data ending up in places it shouldn't and the pressure to ship before accuracy is proven are all easier to govern once you've seen them happen than when you're imagining them.

## What I'd put in place first

Start small and write the policy from what you observe.

- A sandbox before the policy. Let a pilot group use a few approved tools with controlled data for a few weeks and watch what they actually do. I've made the longer case for [sandboxing](/blog/sandboxing-safe-early-access) separately.
- Three data tiers (public, internal, protected), enforced by the infrastructure through access controls, network isolation and automatic classification, rather than by asking people to be careful.
- Risk tiers for applications. Low risk (internal productivity, easily reversed) runs automatically. Medium risk (customer-facing with a person checking, moderate impact) gets review when it crosses set thresholds. High risk (employment, credit, housing, large financial exposure, regulated decisions) needs human approval.
- Logging of tools, data, prompts, outputs and user identity, with monitoring for protected data and unusual patterns. That record is what makes you defensible when a regulator asks.
- Escalation paths, a short written account of how you make AI decisions, and compliance checkpoints for regulated uses.

In my estimate, a first working version takes about two months. Classification, the sandbox and the risk tiers take the first two weeks. In weeks three and four, two or three low-risk tools go to 20 to 50 people with logging switched on. Weeks five and six compare what the policy assumed with what actually happened. In weeks seven and eight you write down what works and widen access to 100 or 200 people. Most of the cost is internal time.

Approval speed matters as much as approval rules. If a medium-risk review takes weeks, people find another way; if it takes a couple of days, most will wait. I've written more about that in the context of [shadow AI](/blog/shadow-ai-organizational-intelligence). Governance works when it's the team people bring ideas to early because it tells them how to ship safely. When it's the team that says no, people stop asking. That's much easier when a central team sets the guardrails and [leaves the decisions to the teams](/blog/distributed-ai-leadership) doing the work.

## Where the rules stand in September 2026

The regulation moved a lot in the past year. This is a dated snapshot, not legal advice.

European Union. The AI Act entered into force in August 2024. Its bans on prohibited practices and its AI literacy duty have applied since February 2025, the obligations for general-purpose AI models since August 2025, and most of the rest since August 2, 2026. The high-risk rules come later than first planned. The "AI Omnibus", proposed in November 2025, agreed in May 2026 and in force since July 27, 2026, [moved them to December 2, 2027](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) for uses such as employment, education, biometrics and critical infrastructure, and to August 2, 2028 for AI built into regulated products. It also added a ninth prohibited practice, AI that generates non-consensual intimate images or child sexual abuse material, from December 2026. Fines for prohibited practices reach [€35 million or 7% of worldwide turnover](https://artificialintelligenceact.eu/article/99/), whichever is higher, and €15 million or 3% for most other breaches; for SMEs and start-ups, whichever is lower. The Act reaches companies outside the EU when they put AI systems on the EU market or when [their system's output is used in the EU](https://artificialintelligenceact.eu/article/2/). Processing EU residents' data is what triggers the GDPR; on its own it doesn't bring you under the AI Act.

United States, federal. There is still no comprehensive federal AI law. In January 2025 the new administration [revoked](https://www.federalregister.gov/documents/2025/01/28/2025-01901/initial-rescissions-of-harmful-executive-orders-and-actions) the 2023 AI executive order. A December 2025 [executive order on a national AI framework](https://www.federalregister.gov/documents/2025/12/16/2025-23092/ensuring-a-national-policy-framework-for-artificial-intelligence) set up a Justice Department task force to challenge state AI laws, told the Commerce Department to identify "onerous" ones, tied some federal broadband funding to that list, and called for legislation that would pre-empt conflicting state laws, with exceptions such as child safety. In July 2026 the FTC [proposed a policy statement](https://www.federalregister.gov/documents/2026/07/07/2026-13628/policy-statement-concerning-the-suppression-of-accuracy-in-artificial-intelligence-systems) saying that altering an AI system's truthful outputs, even to comply with a state law, may be deceptive, and it names Colorado's law. Existing law still does much of the work. The Justice Department's [corporate compliance guidance](https://www.justice.gov/criminal/criminal-fraud/page/file/937501/dl?inline), updated in September 2024, asks how companies assess and manage the risks of AI.

States. State legislatures are busy: in the 2025 session, [38 states adopted or enacted around 100 AI measures](https://www.ncsl.org/technology-and-communication/artificial-intelligence-2025-legislation). Colorado's AI Act, first due in February 2026 and then delayed to June 30, 2026, was [repealed and replaced in May 2026](https://leg.colorado.gov/bills/sb26-189) by a law on automated decision-making technology. From January 1, 2027, developers of tools that materially influence consequential decisions (education, employment, housing, lending, insurance, health care, government services) must give deployers documentation, and deployers must tell people when such a tool is in use, explain adverse decisions within 30 days, and offer correction and human review. The attorney general enforces it, and it creates no new private right of action. In California, [civil rights regulations in force since October 2025](https://calcivilrights.ca.gov/2025/06/30/civil-rights-council-secures-approval-for-regulations-to-protect-against-employment-discrimination-related-to-artificial-intelligence/) make clear that automated employment decisions fall under anti-discrimination law and require four years of records, and the privacy regulator's rules add [risk assessments from 2026 and automated decision-making obligations from January 1, 2027](https://cppa.ca.gov/announcements/2025/20250923.html). New York City has required bias audits of hiring tools since 2023, but the state comptroller found in December 2025 that [the city's complaint-driven enforcement was ineffective](https://www.osc.ny.gov/state-agencies/audits/2025/12/02/enforcement-local-law-144-automated-employment-decision-tools).

Canada. The proposed federal Artificial Intelligence and Data Act never passed. It was [still in committee as part of Bill C-27](https://www.parl.ca/legisinfo/en/bill/44-1/c-27) when Parliament was prorogued in January 2025, and it died there. As far as I know, no federal replacement has passed since. For a Canadian organization that leaves existing privacy law at home, plus the rules above for anything that reaches the EU or US markets.

Across all of these, the same few duties keep coming back: tell people when AI is involved in decisions about them, make someone accountable for outcomes, and show that you watch for discrimination. The rest depends on where you operate and which decisions your AI touches. For most companies that's a handful of jurisdictions, not every AI law on the books, and a consultant who sells you coverage of every conceivable risk is selling you the theatre.

If I had one quarter, I'd build the sandbox, the data tiers and the logging, and write the rest of the policy from what they show. What I can't predict is how the US fight over state laws ends. For now I'd design for the strictest rules you're actually subject to and keep the records that let you prove it.
