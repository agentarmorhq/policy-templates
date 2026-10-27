# AgentArmor: Copilot managed settings

Save this file as `copilot/managed-settings.json` in the `.github-private` repository of your enterprise's source organization and commit it to the default branch.
GitHub's changelog of 2026-08-06 ("MCP allowlists in enterprise managed settings") gives that path. The reference page for enterprise managed
settings names the file but not the repository, so check it again before you roll this out.

How it behaves:
- If `allowedMcpServers` is in the file, every server that does not match an entry is blocked. If it is missing, everything is allowed except what `deniedMcpServers` lists.
- A match on `deniedMcpServers` always wins.
- `serverCommand` must match the whole command and every argument exactly. There are no wildcards.
- GitHub's own Copilot servers cannot be blocked by deny rules.
- Several allowlists (for example enterprise and organisation) are intersected: a server must pass all of them.
