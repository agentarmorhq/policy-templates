# AgentArmor policy templates

Free starter lists of approved AI tools for a team. Copy one, edit it, use it.

Each template is a short list of MCP servers (the add-ons that let an AI coding tool use other services). It comes with ready-made settings for Claude Code, GitHub Copilot, Cursor and Windsurf.

**These are starting points, not advice.** We picked well-known servers and checked that each one exists today. We did not review their code, and we do not know what your team needs. Read every entry, remove what you do not use, and test the result on one machine before you roll it out.

## The four templates

| Template | For | Approved servers | Also blocked |
| --- | --- | --- | --- |
| [startup-default](templates/startup-default) | A small team that wants to move fast | memory, sequential-thinking, fetch, git, time, Playwright, Notion, GitHub, Linear, Sentry, Context7 | 5 retired servers |
| [strict-security](templates/strict-security) | A team that wants a short list with exact versions | memory 2.0.0, sequential-thinking 2.0.0, git 2026.10.19, time 2026.10.19, GitHub | 5 retired servers |
| [frontend-team](templates/frontend-team) | Web teams that test in a browser and work from designs | Playwright, Chrome DevTools, Notion, memory, sequential-thinking, fetch, GitHub, Figma, Context7, Linear, Sentry | 5 retired servers |
| [data-team](templates/data-team) | Teams that work with databases and notes | memory, sequential-thinking, fetch, time, Notion, GitHub, Supabase, Context7 | 5 retired servers |

The five retired servers are `@modelcontextprotocol/server-github`, `-server-postgres`, `-server-puppeteer`, `-server-slack` and `mcp-server-sqlite`. See [SOURCES.md](SOURCES.md) for every tool and its official page.

In every template, a server that is not on the list is not approved.

## How to use one

1. Pick a template and open its folder.
2. Remove the servers you do not want and add the ones you do.
3. Put each file where its tool reads it. Each tool's own documentation is linked in [SOURCES.md](SOURCES.md).
4. Test on one machine first.

## Make it yours

Start from a ready list of approved AI tools, then make it yours inside [AgentArmor for Teams](https://agentarmorhq.com/teams). Teams is in development.

A grade is our opinion from public signals, not a review of the code.

## Contribute

Suggest a server or a fix with an issue or pull request. Please include a link to the project's own page and say how you checked that it exists. No personal data and no secrets in anything you send.

## Licence and contact

CC0 1.0: no rights reserved. Use it however you like. Published by AgentArmor by WalouTech, https://agentarmorhq.com. Questions: info@agentarmorhq.com.
