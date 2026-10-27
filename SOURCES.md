# Sources

Everything here was checked on 2026-10-27. "Exists" means the package or repository was found on the registry or on GitHub on that day. It does not mean we reviewed the code.

## npm packages (checked with `npm view`)

| Package | Version found | Licence | Project page |
| --- | --- | --- | --- |
| `@modelcontextprotocol/server-memory` | 2.0.0 | see its LICENSE file | https://github.com/modelcontextprotocol/servers/tree/main/src/memory |
| `@modelcontextprotocol/server-sequential-thinking` | 2.0.0 | see its LICENSE file | https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking |
| `@playwright/mcp` | 0.0.83 | Apache-2.0 | https://github.com/microsoft/playwright-mcp |
| `chrome-devtools-mcp` | 1.12.0 | Apache-2.0 | https://github.com/ChromeDevTools/chrome-devtools-mcp |
| `@notionhq/notion-mcp-server` | 2.5.2 | MIT | https://github.com/makenotion/notion-mcp-server |

Commands are the ones in each project's own README: `npx -y @modelcontextprotocol/server-memory`, `npx -y @modelcontextprotocol/server-sequential-thinking`, `npx @playwright/mcp@latest`, `npx -y chrome-devtools-mcp@latest`, `npx -y @notionhq/notion-mcp-server`.

## Python packages (checked on pypi.org)

| Package | Version found | Licence | Project page |
| --- | --- | --- | --- |
| `mcp-server-fetch` | 2026.10.24 | MIT | https://github.com/modelcontextprotocol/servers/tree/main/src/fetch |
| `mcp-server-git` | 2026.10.19 | MIT | https://github.com/modelcontextprotocol/servers/tree/main/src/git |
| `mcp-server-time` | 2026.10.19 | MIT | https://github.com/modelcontextprotocol/servers/tree/main/src/time |

Commands are `uvx mcp-server-fetch`, `uvx mcp-server-git` and `uvx mcp-server-time`, as in the READMEs for fetch and time (the git README documents the same `uvx` form). strict-security pins git and time with `uvx mcp-server-git==2026.10.19` and `uvx mcp-server-time==2026.10.19`.

## Remote servers (checked: the URL answers, and a project page names it)

| URL | Answer to an empty, unauthenticated POST | Named on |
| --- | --- | --- |
| `https://api.githubcopilot.com/mcp/` | 401 | https://github.com/github/github-mcp-server (README) |
| `https://mcp.linear.app/mcp` | 401 | https://linear.app/docs/mcp |
| `https://mcp.sentry.dev/mcp` | 401 | https://github.com/getsentry/sentry-mcp (README; the repository now redirects to getsentry/toolkit) |
| `https://mcp.context7.com/mcp` | 400 | https://github.com/upstash/context7 (README) |
| `https://mcp.supabase.com/mcp` | 401 | https://github.com/supabase/mcp (README) |
| `https://mcp.figma.com/mcp` | 400 | https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/ |

A 401 means the server wants a sign-in. A 400 means it answered but did not accept our empty test request. Neither tells you the server is trustworthy.

## Retired servers we block

| Package | Why | Where we looked |
| --- | --- | --- |
| `@modelcontextprotocol/server-github` | `npm view` shows it deprecated: "Package no longer supported." | https://www.npmjs.com/package/@modelcontextprotocol/server-github |
| `@modelcontextprotocol/server-postgres` | same | https://www.npmjs.com/package/@modelcontextprotocol/server-postgres |
| `@modelcontextprotocol/server-puppeteer` | same | https://www.npmjs.com/package/@modelcontextprotocol/server-puppeteer |
| `@modelcontextprotocol/server-slack` | same | https://www.npmjs.com/package/@modelcontextprotocol/server-slack |
| `mcp-server-sqlite` (PyPI) | Its source (`src/sqlite`, same name and description) sits in the archived repository https://github.com/modelcontextprotocol/servers-archived | https://pypi.org/project/mcp-server-sqlite/ |

## How each tool reads its policy

- Claude Code: https://code.claude.com/docs/en/managed-settings.md (folders and `managed-settings.d/`), https://code.claude.com/docs/en/managed-mcp.md (`allowedMcpServers`, `allowManagedMcpServersOnly`, `serverCommand`, `serverUrl`).
- GitHub Copilot: https://github.blog/changelog/2026-08-06-mcp-allowlists-in-enterprise-managed-settings (`.github-private` repository, `copilot/managed-settings.json`).
- Cursor: https://cursor.com/docs/enterprise/model-and-integration-management ("MCP Configuration", Enterprise only).
- Windsurf: https://docs.devin.ai/windsurf/plugins/cascade/mcp (allowlist; "once you allowlist even a single MCP server, all non-allowlisted servers will be blocked for your team").

## How the files were made

`entries.json` in each folder is the source. The client files and `.agentarmor.yml` were generated from it by AgentArmor's policy compiler (commit `ea71c9b` of the private AgentArmor repository, branch `feat/teams-v1`) in strict mode. The `.agentarmor.yml` header lines (`block_grades`) were added by hand. The `.agentarmor.yml` files were also read by the PR gate's own parser without errors.

## What we did not check

We did not read or run the code of any server on this page. We did not test the files in each vendor's admin console. Vendors change their formats; check the pages above before you roll anything out.
