---
title: The Model Context Protocol in plain English
description: MCP is a shared standard for connecting AI assistants to your systems. What it does, who governs it now, where it's risky, and where I'd start.
topic: agents-and-tools
published: 2025-11
updated: 2026-09
---

An AI assistant is only as useful as what it can reach. If you wanted one to answer questions from your calendar, your CRM, your wiki and your ticketing system, each of those used to need its own integration, built separately for each AI product, each with its own authentication and quirks. Switch assistants and you rebuilt the lot.

The Model Context Protocol (MCP) is the attempt to turn that into a shared plug. You wrap a system once in an MCP server, and any AI application that speaks MCP can use it. [Anthropic released it in November 2024](https://www.anthropic.com/news/model-context-protocol). As of September 2026 it's the closest thing the industry has to a standard for connecting assistants and agents to tools and data, which is why I think it's worth understanding even if you never write a line of it. I use MCP servers every day, at work and on my own projects, and they're a large part of why an agent can do real work instead of just talking about it.

## How a call works

An MCP server sits in front of a system, such as a database, GitHub or a document store, and describes what it offers: tools (actions the model can take), resources (data it can read) and prompts. The AI application runs an MCP client that talks to the server using JSON-RPC over one of [two standard transports](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports): stdio for a server running on your own machine, or Streamable HTTP for a remote one.

Say someone asks their assistant what's on tomorrow's calendar. The client asks the calendar server for its list of tools. Each tool comes back with a name, a plain-language description and a schema for its inputs, for example `list_events` with a date. The model decides to call `list_events` for tomorrow, the server queries the real calendar and returns the events, and the model writes the answer. The person sees one reply. Underneath, it took a couple of round trips.

The difference from ordinary function calling is where the connector lives. With function calling, a developer defines functions inside each request to one model, for one application. An MCP server exists on its own, and any client can ask it what it can do. That independence is what makes MCP a standard rather than a feature of one product.

The protocol has changed a lot since launch. The [current version, dated 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28/), is the largest revision so far. It drops protocol-level sessions: every request carries its own protocol version and client details, and new HTTP headers let gateways route requests without parsing the message body. A server that needs to remember something between calls, like a shopping basket or an open database transaction, now hands back an explicit handle for the model to pass along, and long-running jobs go through a separate Tasks extension. Authorization is built on OAuth, [first added in March 2025](https://modelcontextprotocol.io/specification/2025-03-26/changelog) and tightened in each revision since.

## Who runs it now

The other big vendors adopted MCP within months. At its Build conference in May 2025, [Microsoft announced support](https://blogs.microsoft.com/blog/2025/05/19/microsoft-build-2025-the-age-of-ai-agents-and-building-the-open-agentic-web/) across GitHub, Copilot Studio, Dynamics 365, Azure AI Foundry, Semantic Kernel and Windows 11, and joined the protocol's steering committee. By December, [Anthropic was counting](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation) ChatGPT, Gemini, Microsoft Copilot, Cursor and VS Code among the clients, along with "more than 10,000 active public MCP servers" and 97 million SDK downloads a month.

That same December, Anthropic gave MCP to the [Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation), a new fund under the Linux Foundation that it co-founded with Block and OpenAI, with AWS, Google, Microsoft, Cloudflare and Bloomberg among the other top-tier members. To me that matters more than any download count. The obvious objection to building on MCP was that a single model vendor controlled it, and that objection has gone.

Adoption kept climbing. By July 2026 the maintainers [put downloads across the main SDKs](https://blog.modelcontextprotocol.io/posts/2026-07-28/) at "close to half-a-billion" a month, and Google now offers [more than 50 managed MCP servers](https://cloud.google.com/blog/products/ai-machine-learning/google-managed-mcp-servers-are-available-for-everyone) for its own cloud services, generally available or in preview. An [official registry](https://modelcontextprotocol.io/registry/about) of public servers exists but is still labelled a preview. When I first wrote about MCP in November 2025, I guessed it would take three to five years to become standard infrastructure. By most measures it got there faster than that.

## What it's good for

For most organizations the value shows up in two places: buying software and wiring it together. The question used to be whether a new tool integrated with your other tools, which depended on whether two particular vendors had bothered to build a connector. Now the question is whether it has a good MCP server. If it does, it works with every assistant you use today and with ones you haven't picked yet. SaaS vendors have had [little reason to make your data easy to move](/blog/siloed-information-saas-moat), and a standard connector weakens that moat, so I'd make MCP support a line item in every software evaluation.

A concrete case: a support agent asks why a customer's order is late. Without connectors, the assistant can only ask them to paste in the details. With MCP servers for the order system, the shipping provider and the customer history, it can look up all three and answer with context: the item went out of stock, when it's due back, and the fact that this customer has had delays before and might deserve faster shipping this time.

It isn't free. When Twilio tested an agent with and without its own MCP server, the MCP version [finished tasks about 20.5% faster, made about 19% fewer API calls and succeeded on every run](https://www.twilio.com/en-us/blog/developers/twilio-alpha-mcp-server-real-world-performance), against about 92% without it. It also cost about 27.5% more, mostly in extra tokens. I think that trade is usually worth making for internal work, but budget for it.

The early enterprise evidence is mostly self-reported. Block, one of the foundation's co-founders, said in April 2025 that most employees using goose, its MCP-based agent, [reported saving 50 to 75% of their time on common tasks](https://goose-docs.ai/blog/2025/04/21/mcp-in-enterprise/). I read that as a sign of enthusiasm more than a measurement.

## What it doesn't do

MCP gets an agent to your systems. It doesn't decide what to do across them. A job that spans eight steps and four systems still needs something to track where it is, retry what failed and undo what shouldn't stand. The spec says plainly that the protocol keeps no session, so that logic lives in whatever runs the workflow. I've written about that [orchestration gap](/blog/agentic-ai-interoperability) separately.

It can't make bad data useful either. A server returns whatever the underlying system holds, and an answer built on untagged, out-of-date documents is still a bad answer. [Metadata](/blog/metadata-matters) matters more once machines are doing the reading.

And it only partly handles change. Servers can tell clients when their list of tools changes, and clients can cache those lists for a stated time, but [individual tools carry no version number](https://modelcontextprotocol.io/specification/2026-07-28/server/tools). A renamed parameter can still quietly break an agent that depended on it.

## Where it's risky

An MCP server is code with access to your data, and the model reads what the server says about its own tools as guidance. Both have been exploited.

In April 2025, Invariant Labs demonstrated [tool poisoning](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks): instructions hidden in a tool's description, invisible to the user but read by the model, that got Cursor's agent to send out SSH keys and MCP credentials. In July, JFrog disclosed [CVE-2025-6514](https://jfrog.com/blog/2025-6514-critical-mcp-remote-rce-vulnerability/), a critical flaw (CVSS 9.6) in mcp-remote, an adapter for connecting to remote servers, that let a malicious server run commands on the user's machine through a crafted login URL. It was fixed in version 0.1.16. In September, Postmark warned that a [fake postmark-mcp package](https://postmarkapp.com/blog/information-regarding-malicious-postmark-mcp-package), which it had never published, built trust over 15 versions and then added a backdoor that quietly copied every email to an outside address. OWASP now maintains an [MCP Top 10](https://owasp.org/www-project-mcp-top-10/), still in beta, covering these and more, from exposed tokens and creeping permissions to shadow MCP servers nobody approved.

I'd treat MCP servers the way you treat any third-party code with access to production data. Install them from the vendor's own documentation, pin versions, grant the narrowest permissions that work, log every call, and keep a person in the loop for anything that writes or sends. The spec says much the same: clients should give people the ability to deny tool calls, and must treat a server's own labels for its tools, such as "read-only", as untrusted unless the server itself is trusted. The registry verifies who published a server. It leaves checking what the code does to package registries and marketplaces.

## Where I'd start

Pick one or two systems where access would change the most, judged by how often people need the information and how painful it is to get at today. The CRM, the internal wiki and a key database are all reasonable candidates.

Use the vendor's official server where one exists, and build your own only for systems nobody else will, such as a proprietary platform. Connect those servers to the assistants your people already use before you think about building anything custom; for most teams, [buying the agent and connecting it through MCP](/blog/build-vs-buy-agentic-ai) is the right first step. Put permissions and logging in place on day one.

Then expand. Each new connector is easier than the last because the pattern repeats, and the most useful work, such as a quarterly report that pulls from the CRM, the documentation, release notes and sales data, needs several of them at once. That's also where you'll run into the orchestration problems.

What I don't know yet is how trust will work at scale. Today you can check who published a server. You can't easily check what it will do with the access you give it, and I haven't seen a good answer to that for the thousands of servers already out there.
