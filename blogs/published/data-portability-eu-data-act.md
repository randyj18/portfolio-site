---
title: What the EU Data Act means for SaaS and cloud contracts
description: Since September 2025, EU law makes cloud and SaaS providers help customers leave. What the switching rules require, the dates that matter and what to ask for.
topic: vendors-and-platforms
published: 2025-11
updated: 2026-09
---

Since 12 September 2025, the EU Data Act has applied across the European Union. Most of the coverage has been about connected devices, and much of the regulation is about who gets the data that a car or a factory machine generates. The part that matters most for software buyers is quieter: providers of cloud and SaaS services now have a legal duty to help customers leave. What follows is my reading as a practitioner, not legal advice. The [official text](https://eur-lex.europa.eu/eli/reg/2023/2854/oj) (Regulation (EU) 2023/2854) and the Commission's [Data Act explainer](https://digital-strategy.ec.europa.eu/en/factpages/data-act-explained) and FAQ are the places to check the detail.

This post is the third of three on SaaS lock-in. The [first](/blog/siloed-information-saas-moat) looks at the problem from the buyer's side and the [second](/blog/saas-evolution-ai-era) at what vendors should do about it.

## What the switching rules require

The rules sit in Chapter VI of the Act (Articles 23 to 31) and apply to "data processing services". The Commission's explainer makes clear that this covers infrastructure, platform and software services. Providers have to remove the obstacles customers face when they want to switch to another provider, bring a service back on premises, or use several providers at the same time ([Article 23](https://www.eu-data-act.com/Data_Act_Article_23.html)).

The contract has to spell out how switching works. Under [Article 25](https://www.eu-data-act.com/Data_Act_Article_25.html), the notice period for starting a switch can't be longer than two months, and the provider then has a maximum transitional period of 30 calendar days to complete it. The customer can extend that once. Where 30 days is technically unfeasible, the provider can propose a longer period of up to seven months. Exportable data and digital assets have to come out in a commonly used, machine-readable format, and the Commission's explainer says platform and software providers must make open interfaces available.

Then there are charges. Until 12 January 2027, providers may charge for switching and for data egress, but only [reduced charges that don't exceed their own costs](https://www.eu-data-act.com/Data_Act_Article_29.html) directly linked to the switch. From that date they can't charge for switching at all, egress included. Before a contract is signed, providers also have to disclose their standard fees, any early termination penalties and the reduced switching charges, and flag services where switching is especially complex.

## The dates that matter

- 11 January 2024: the Act entered into force.
- 12 September 2025: most of it applies, including the switching rules.
- 12 September 2026: design obligations start for connected products placed on the market after that date.
- 12 January 2027: switching and egress charges end.
- 12 September 2027: the rules on unfair contract terms extend to older long-term contracts ([Article 50](https://www.eu-data-act.com/Data_Act_Article_50.html)).

## Who enforces it

Enforcement is national. Each Member State designates its own authorities and sets its own penalties, which have to be "effective, proportionate and dissuasive" ([Article 40](https://www.eu-data-act.com/Data_Act_Article_40.html)). Data protection authorities can fine at GDPR levels only where personal data is involved in certain chapters, and the switching chapter isn't one of them. So I'd expect enforcement to vary from country to country and to start slowly. I wouldn't count on anyone making a quick example of a SaaS vendor.

## What's still moving

In November 2025 the Commission proposed a Digital Omnibus package that would amend the Act. Among other changes, it would exempt some custom-built services and smaller providers from the switching rules for contracts signed before 12 September 2025. As of August 2026 the proposal was still at committee stage in the European Parliament, with [more than 1,750 amendments tabled and no Council position yet](https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package). It isn't law. If you're renegotiating a pre-September 2025 contract with a small or highly customized provider, keep an eye on it.

The market has moved faster than the enforcers. In September 2025 Google Cloud launched [Data Transfer Essentials](https://cloud.google.com/blog/products/networking/new-for-the-uk-and-eu-no-cost-multicloud-data-transfer-essentials), free transfers between Google Cloud and other clouds for workloads that run across both, in the EU and the UK, and said it built the service in response to the Act. The Commission is also looking at the largest cloud providers from another direction: in June 2026 it [reached a preliminary view](https://digital-markets-act.ec.europa.eu/commission-reaches-preliminary-position-amazons-and-microsofts-market-leading-cloud-services-should-2026-06-25_en) that AWS and Azure should be designated as gatekeepers under the Digital Markets Act.

## What the Act doesn't do

It doesn't give you everything a data holder works out from your data. The access rights for connected products cover the data those products and their related services generate, and the Commission's explainer says inferred or derived data are out of scope. The Act doesn't prescribe a specific export format or protocol. And it doesn't make switching painless: a vendor can meet the letter of the rules and still give you a complete export that takes months of work to use.

## What buyers can ask for now

This is where I think the Act is most useful. It gives you a basis for questions that vendors used to deflect.

- Ask for the switching terms in writing: notice period, transitional period, what counts as exportable data and digital assets, and what you'll be charged until January 2027.
- Score your main vendors on portability. High risk looks like proprietary formats, limited APIs and "migration not supported". Low risk looks like open formats, full APIs, an MCP server and practical help with leaving.
- Test one migration. Pick a non-critical system, move it to a competitor or into your own data store, and write down what broke and how long it took.
- Use renewals. Put export formats, API access and exit assistance into the contract, and mention competitors that do this better.

If you're on the vendor side, my view hasn't changed. Vendors that make leaving easy may earn more trust than they lose to churn, because customers who stay by choice behave differently from customers who stay because leaving hurts. The Act makes that bet cheaper to take. The moat that's left is what you do with the data. Watch what vendors do rather than what they announce: a compliance statement is easy to publish, and an export that loads cleanly into a competitor's product is much harder to fake.

For cloud infrastructure, where egress fees have long been the lock-in, my post on [cloud provider diversification](/blog/cloud-provider-diversification) goes further. What I don't know yet is whether national regulators will pursue SaaS vendors at all, or concentrate on the hyperscalers, where the money and the egress fees are. Until that's clearer, I'd treat the Act as leverage in negotiation rather than something a regulator will enforce on your behalf.
