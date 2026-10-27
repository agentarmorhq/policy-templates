# AgentArmor policy templates

Free starter lists of approved AI tools for a team. Copy one, edit it, use it.

Each template is a short list of MCP servers (the add-ons that let an AI coding tool use other services). It comes as:

- a `.agentarmor.yml` file for the [AgentArmor PR gate](https://github.com/agentarmorhq/pr-gate), and
- ready-made settings for Claude Code, GitHub Copilot, Cursor and Windsurf.

**These are starting points, not advice.** We picked well-known servers and checked that each one exists today. We did not review their code, and we do not know what your team needs. Read every entry, remove what you do not use, and test the result on one machine before you roll it out.

## The four templates

| Template | For | Approved servers | Also blocked |
| --- | --- | --- | --- |
| [startup-default](templates/startup-default) | A small team that wants to move fast | memory, sequential-thinking, fetch, git, time, Playwright, Notion, GitHub, Linear, Sentry, Context7 | 5 retired servers |
| [strict-security](templates/strict-security) | A team that wants a short list with exact versions | memory 2.0.0, sequential-thinking 2.0.0, git 2026.10.19, time 2026.10.19, GitHub | 5 retired servers |
| [frontend-team](templates/frontend-team) | Web teams that test in a browser and work from designs | Playwright, Chrome DevTools, Notion, memory, sequential-thinking, fetch, GitHub, Figma, Context7, Linear, Sentry | 5 retired servers |
| [data-team](templates/data-team) | Teams that work with databases and notes | memory, sequential-thinking, fetch, time, Notion, GitHub, Supabase, Context7 | 5 retired servers |

The five retired servers are `@modelcontextprotocol/server-github`, `-server-postgres`, `-server-puppeteer`, `-server-slack` and `mcp-server-sqlite`. The four npm ones are marked "no longer supported" on npm. The SQLite one lives in an archived repository. See [SOURCES.md](SOURCES.md).

Every template is in "strict" mode: a server that is not on the list is not approved. Each folder has:

```
.agentarmor.yml                              for the PR gate
entries.json                                 the list in one place; every other file comes from it
claude-code/managed-settings.d/agentarmor.json   (plus .mobileconfig for macOS and .reg for Windows)
copilot/managed-settings.json
cursor/allowlist.txt
windsurf/<server>.json                       one file per server
```

## How to use one

1. Pick a template and open its folder.
2. Remove servers you do not want. Add the ones you do. Edit `entries.json` and the matching client file, or edit the client file directly.
3. Put each file where its tool reads it:

| Tool | Where the file goes |
| --- | --- |
| Claude Code | `managed-settings.d/agentarmor.json` goes in the `managed-settings.d` folder next to `managed-settings.json`: `/Library/Application Support/ClaudeCode/` on macOS, `/etc/claude-code/` on Linux, `C:\Program Files\ClaudeCode\` on Windows. |
| GitHub Copilot | `copilot/managed-settings.json` goes in the `.github-private` repository of your enterprise's source organization, on the default branch. |
| Cursor | Paste `cursor/allowlist.txt` into the team dashboard under "MCP Configuration", one entry per line. |
| Windsurf | Add each `windsurf/*.json` in your team's MCP settings: the file name is the Server ID and the contents are the Server Config. |
| PR gate | Copy `.agentarmor.yml` to the root of your repository. |

## Things to know before you roll one out

- **Commands must match exactly.** `npx -y @modelcontextprotocol/server-memory` and `npx @modelcontextprotocol/server-memory` are different to Claude Code and Copilot. The commands here are the ones each project documents. If your team starts a server another way, change the entry to match.
- **Servers that need extra arguments are left out.** A file server needs a folder, a database server needs an address. Those arguments would have to match too, so add your own entry with your real command.
- **Servers marked `@latest` follow new releases.** Only `strict-security` pins exact versions. When you pin, update the pin on purpose.
- **Cursor** lets an admin control the MCP list on its Enterprise plan only. Cursor has no block list, so the retired servers are blocked only because everything not on the list is.
- **Windsurf**: once one server is on the allowlist, every other server is blocked for the team. Windsurf's documentation does not say how it matches remote servers, so remote ones (such as GitHub and Linear) are not in the Windsurf files. Add them by hand after you check with Windsurf.
- **GitHub Copilot** built-in servers cannot be blocked by a deny rule.
- **The PR gate file** can only name packages, so remote servers are not in `.agentarmor.yml`. It also sets `block_grades`, which fails a pull request on those AgentArmor grades.
- A grade is our opinion from public signals, not a review of the code.

## Contribute

Suggest a server or a fix with an issue or pull request. Please include a link to the project's own page and say how you checked that it exists. No personal data and no secrets in anything you send.

## Licence and contact

CC0 1.0: no rights reserved. Use it however you like. Published by AgentArmor by WalouTech, https://agentarmorhq.com. Questions: info@agentarmorhq.com.
