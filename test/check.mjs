// Checks the repo: every JSON file parses, every template has the same files, entries match the client files, and the words are plain.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import assert from 'node:assert/strict';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return f === '.git' || f === 'node_modules' ? [] : statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(ROOT);
const rel = p => p.slice(ROOT.length + 1);

for (const f of files.filter(f => f.endsWith('.json'))) JSON.parse(readFileSync(f, 'utf8'));

const NAMES = ['startup-default', 'strict-security', 'frontend-team', 'data-team'];
assert.deepEqual(readdirSync(join(ROOT, 'templates')).sort(), [...NAMES].sort());
for (const n of NAMES) {
  const t = join(ROOT, 'templates', n);
  for (const f of ['.agentarmor.yml', 'entries.json', 'README.md', 'claude-code/managed-settings.d/agentarmor.json', 'claude-code/agentarmor.mobileconfig', 'claude-code/agentarmor.reg', 'copilot/managed-settings.json', 'cursor/allowlist.txt']) assert.ok(existsSync(join(t, f)), `${n}/${f} is missing`);
  const entries = JSON.parse(readFileSync(join(t, 'entries.json'), 'utf8'));
  const approved = entries.filter(e => e.decision === 'approved');
  const blocked = entries.filter(e => e.decision === 'blocked');
  assert.ok(approved.length > 0 && blocked.length > 0, `${n}: needs approved and blocked entries`);
  const claude = JSON.parse(readFileSync(join(t, 'claude-code/managed-settings.d/agentarmor.json'), 'utf8'));
  assert.equal(claude.allowManagedMcpServersOnly, true, `${n}: strict mode`);
  assert.equal(claude.allowedMcpServers.length, approved.length, `${n}: Claude Code allowlist has one entry per approved server`);
  assert.equal(claude.deniedMcpServers.length, blocked.length, `${n}: Claude Code denylist has one entry per blocked server`);
  for (const e of approved) {
    const want = e.kind === 'mcp_remote' ? { serverUrl: e.identity.url_pattern } : { serverCommand: e.identity.command };
    assert.ok(claude.allowedMcpServers.some(x => JSON.stringify(x) === JSON.stringify(want)), `${n}: ${e.id} is not in the Claude Code file`);
    const cursor = readFileSync(join(t, 'cursor/allowlist.txt'), 'utf8').split('\n');
    assert.ok(cursor.includes(e.kind === 'mcp_remote' ? e.identity.url_pattern : e.identity.command.join(' ')), `${n}: ${e.id} is not in the Cursor list`);
  }
  const yml = readFileSync(join(t, '.agentarmor.yml'), 'utf8');
  assert.match(yml, /^block_grades: \[[A-F, ]+\]$/m, `${n}: block_grades`);
  assert.match(yml, /^block:$/m); assert.match(yml, /^allow:$/m);
  assert.ok(!/^org:/m.test(yml), `${n}: no org line in a shared template`);
}

// plain words: the house copy rules, applied to every Markdown file
const banned = [/\baudit/i, /\bscan(s|ned|ning|ner)?\b/i, /guarantee/i, /generally safe|safest|\bis safe\b|\bare safe\b|\bstay safe\b|\bsafe\b/i];
for (const f of files.filter(f => f.endsWith('.md'))) {
  const text = readFileSync(f, 'utf8');
  for (const re of banned) assert.ok(!re.test(text), `${rel(f)}: banned word ${re}`);
  assert.ok(!/—/.test(text.replace(/```[\s\S]*?```/g, '')), `${rel(f)}: no em dashes in prose`);
}
// no personal names or accounts
for (const f of files.filter(f => !f.endsWith('check.mjs'))) assert.ok(!/abdenn75|nlaarh|laaroubi|alaaroubi|@gmail\./i.test(readFileSync(f, 'utf8')), `${rel(f)}: personal name or account`);
console.log('policy-templates ok');
