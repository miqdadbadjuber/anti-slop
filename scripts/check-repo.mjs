#!/usr/bin/env node
/**
 * The rules antislop applies to other people's repos, applied to this one.
 *
 * Every check here exists because the matching mistake already shipped: a gate
 * item that disagreed with its rule (#7), checklists whose polarity no item used
 * (#9), a contrast row that was wrong (#2), and the repo not passing its own
 * filter (#6). Run it before opening a PR:
 *
 *   node scripts/check-repo.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')
// Split on /\r?\n/, not '\n': on a Windows checkout the working-tree files carry
// \r\n, so a line kept its trailing \r and every ^...$ regex in the checks below
// (the em dash section tracker especially) silently stopped matching.
const lines = (p) => read(p).split(/\r?\n/)

const SKILLS = fs
  .readdirSync(path.join(root, 'skills'), { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => `skills/${e.name}/SKILL.md`)

const MANIFESTS = [
  '.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json',
  '.codex-plugin/plugin.json',
  '.cursor-plugin/plugin.json',
  '.cursor-plugin/marketplace.json',
  '.agents/plugins/marketplace.json',
  'plugin.json',
  'cli/package.json',
]

/**
 * R-02 bans the em dash, and R-02's own carve-out exempts the places that have
 * to name the character to ban it. Encode that carve-out rather than skipping
 * the check, so a new em dash in ordinary prose still fails.
 */
function emDashes() {
  const bad = []
  const files = ['antislop.md', 'README.md', 'GUIDE.md', 'ROADMAP.md', 'SECURITY.md', ...SKILLS]

  for (const file of files) {
    let section = ''
    lines(file).forEach((line, i) => {
      const heading = line.match(/^#{2,4}\s+(.*)$/)
      if (heading) section = heading[1]
      if (!/[—–]/.test(line)) return

      const exempt =
        // "#### R-02 — Copywriting" and "### C-1 — Intentionality"
        /^#{2,4}\s+(R-\d{2}|C-\d)\s+—\s/.test(line) ||
        // The rule that defines the ban, and the skill section that teaches it.
        /^(R-02|Em Dashes)\b/.test(section) ||
        // The Part 1 table row that shows the pattern.
        /^\|\s*\*\*Em Dash/.test(line) ||
        // The Delivery Gate item that quotes the character it checks for.
        (/^\s*- \[ \]/.test(line) && /\*\(R-02\)\*/.test(line))

      if (!exempt) bad.push(`${file}:${i + 1}: ${line.trim().slice(0, 90)}`)
    })
  }
  return bad
}

/** Every rule the core defines must have a Delivery Gate item citing it, and vice versa. */
function gateCoverage() {
  const core = read('antislop.md')
  const defined = new Set([...core.matchAll(/^#### (R-\d{2}) —/gm)].map((m) => m[1]))
  const gate = core.split('## Delivery Gate (Mandatory)')[1] ?? ''
  const cited = new Set([...gate.matchAll(/\((R-\d{2})\)/g)].map((m) => m[1]))

  const bad = []
  for (const r of [...defined].sort()) {
    if (!cited.has(r)) bad.push(`${r} is defined in Part 2 but no Delivery Gate item cites it`)
  }
  for (const r of [...cited].sort()) {
    if (!defined.has(r)) bad.push(`${r} is cited in the Delivery Gate but Part 2 does not define it`)
  }
  return bad
}

/** A skill may reference core rules by number. It may not invent one. */
function skillReferences() {
  const defined = new Set([...read('antislop.md').matchAll(/^#### (R-\d{2}) —/gm)].map((m) => m[1]))
  const bad = []
  for (const file of SKILLS) {
    for (const r of new Set([...read(file).matchAll(/\bR-\d{2}\b/g)].map((m) => m[0]))) {
      if (!defined.has(r)) bad.push(`${file} cites ${r}, which antislop.md does not define`)
    }
  }
  return bad
}

/** The version is hand-written in eight places. They have to agree. */
function versions() {
  // A file that does not parse is already reported by the manifest check, so
  // read it leniently here rather than crashing the whole run on it.
  const json = (p) => {
    try {
      return JSON.parse(read(p))
    } catch {
      return null
    }
  }
  const want = json('cli/package.json')?.version
  if (!want) return ['cli/package.json has no readable version']

  const found = [
    ['.claude-plugin/plugin.json', json('.claude-plugin/plugin.json')?.version],
    ['.claude-plugin/marketplace.json', json('.claude-plugin/marketplace.json')?.plugins?.[0]?.version],
    ['.codex-plugin/plugin.json', json('.codex-plugin/plugin.json')?.version],
    ['.cursor-plugin/plugin.json', json('.cursor-plugin/plugin.json')?.version],
    ['cli/index.mjs', read('cli/index.mjs').match(/antislop (\d+\.\d+\.\d+)/)?.[1]],
    ['cli/lib/banner.mjs', read('cli/lib/banner.mjs').match(/installer v(\d+\.\d+\.\d+)/)?.[1]],
    ['skills/antislop-human/contrast-mcp.py', read('skills/antislop-human/contrast-mcp.py').match(/SERVER_VERSION = "(\d+\.\d+\.\d+)"/)?.[1]],
  ]

  return found
    .filter(([, got]) => got !== want)
    .map(([file, got]) => `${file} says ${got ?? 'nothing'}, cli/package.json says ${want}`)
}

/** A manifest that does not parse takes its whole install path down. */
function manifests() {
  const bad = []
  for (const file of MANIFESTS) {
    try {
      JSON.parse(read(file))
    } catch (err) {
      bad.push(`${file} is not valid JSON: ${err.message}`)
    }
  }
  return bad
}

/** An agent finds a skill by its frontmatter. Without it the folder is inert. */
function frontmatter() {
  const bad = []
  for (const file of SKILLS) {
    const head = read(file).split('---')[1] ?? ''
    // [ \t] not \s: \s spans the newline, so an empty value matches the first
    // character of the next key and every skill passes.
    if (!/^name:[ \t]*\S/m.test(head)) bad.push(`${file} has no name in its frontmatter`)
    if (!/^description:[ \t]*\S/m.test(head)) bad.push(`${file} has no description in its frontmatter`)
  }
  return bad
}

/**
 * A new skill folder has to be registered in four other places before anyone can
 * install it: both rule pointers, the picker's menu, and the pointer block the
 * picker writes. v3.1.0 had to touch all four to ship antislop-code.
 */
function registration() {
  const names = SKILLS.map((f) => f.split('/')[1])
  const core = 'antislop'
  const places = [
    ['rules/antislop.md', read('rules/antislop.md')],
    ['rules/antislop.mdc', read('rules/antislop.mdc')],
    ["cli/index.mjs (EXTRA_SKILLS)", read('cli/index.mjs')],
    ['cli/lib/install.mjs (SKILL_LINES)', read('cli/lib/install.mjs')],
  ]

  const bad = []
  for (const name of names) {
    for (const [label, text] of places) {
      // The core is always on, so the picker's optional-extras menu never lists it.
      if (name === core && label.startsWith('cli/index.mjs')) continue
      if (!text.includes(name)) bad.push(`${name} is not registered in ${label}`)
    }
  }
  return bad
}

/**
 * A rule's tier decides which Delivery Gate block it belongs in: Hard Gate to
 * Block 1, Purpose-Gate to Block 2, Quality Locks to Block 4. A rule cited from
 * the wrong block is what #7 was, three gate items disagreeing with their rule.
 */
function tiers() {
  const core = read('antislop.md')
  const part2 = core.split('## Part 2:')[1]?.split('## Part 3:')[0] ?? ''

  const group = {}
  let current = null
  for (const line of part2.split('\n')) {
    const g = line.match(/^### Group \d: ([^(]+)/)
    if (g) current = g[1].trim()
    const r = line.match(/^#### (R-\d{2}) —/)
    if (r && current) group[r[1]] = current
  }

  const block = {}
  let currentBlock = null
  for (const line of (core.split('## Delivery Gate (Mandatory)')[1] ?? '').split('\n')) {
    const b = line.match(/^### (Block \d):/)
    if (b) currentBlock = b[1]
    for (const m of line.matchAll(/\((R-\d{2})\)/g)) {
      if (!block[m[1]]) block[m[1]] = currentBlock
    }
  }

  const wants = { 'Hard Gate': 'Block 1', 'Purpose-Gate': 'Block 2', 'Quality Locks': 'Block 4' }
  const bad = []
  for (const [rule, grp] of Object.entries(group).sort()) {
    const want = wants[grp]
    const got = block[rule]
    if (want && got && want !== got) bad.push(`${rule} is a ${grp} rule but the gate cites it from ${got}`)
  }
  return bad
}

/** A manifest that points at a file that is gone breaks its install path quietly. */
function manifestPaths() {
  const bad = []
  for (const file of MANIFESTS) {
    let text
    try {
      text = read(file)
    } catch {
      continue
    }
    for (const m of text.matchAll(/"(\.\/[^"]+)"/g)) {
      const target = m[1].replace(/^\.\//, '')
      if (!existsExactly(target)) bad.push(`${file} points at ${m[1]}, which does not exist`)
    }
  }
  return bad
}

/**
 * A rename like guide.md to GUIDE.md in v3.2.4 is exactly when a doc link goes
 * stale, and existsSync cannot see it: macOS is case-insensitive, so the old
 * link keeps passing locally and only breaks for readers on github.com. Compare
 * against the real directory entry instead.
 */
const existsExactly = (target) => {
  const full = path.join(root, target)
  const dir = path.dirname(full)
  if (!fs.existsSync(dir)) return false
  return fs.readdirSync(dir).includes(path.basename(full))
}

function docLinks() {
  const bad = []
  for (const file of ['README.md', 'GUIDE.md', 'ROADMAP.md', 'SECURITY.md']) {
    for (const m of read(file).matchAll(/\]\(([^)\s]+)\)/g)) {
      const target = m[1].split('#')[0]
      if (!target || /^(https?:|mailto:)/.test(target)) continue
      if (!existsExactly(target)) bad.push(`${file} links to ${target}, which does not exist`)
    }
  }
  return bad
}

/**
 * contrast-check.py and contrast-mcp.py each carry their own copy of the WCAG
 * formula, and only the first has a selftest. The plugin exposes the second, so
 * a drift between them would ship as a wrong answer with nothing to catch it.
 */
function contrastTwins() {
  const check = read('skills/antislop-human/contrast-check.py')
  const mcp = read('skills/antislop-human/contrast-mcp.py')
  const constants = ['0.03928', '12.92', '1.055', '0.2126', '0.7152', '0.0722', '0.05']

  const bad = []
  for (const c of constants) {
    if (check.includes(c) !== mcp.includes(c)) {
      bad.push(`the WCAG constant ${c} appears in only one of contrast-check.py and contrast-mcp.py`)
    }
  }
  return bad
}

const CHECKS = [
  // Manifests first: the later checks read them as data.
  ['every manifest is valid JSON', manifests],
  ['no em dash outside the R-02 carve-out', emDashes],
  ['every rule has a Delivery Gate item', gateCoverage],
  ['skills cite only rules that exist', skillReferences],
  ['the version agrees everywhere', versions],
  ['every skill has usable frontmatter', frontmatter],
  ['every skill is registered everywhere', registration],
  ['each rule sits in the gate block its tier implies', tiers],
  ['every manifest path resolves', manifestPaths],
  ['every doc link resolves', docLinks],
  ['both contrast implementations use the same formula', contrastTwins],
]

let failed = 0
for (const [label, run] of CHECKS) {
  const problems = run()
  if (problems.length === 0) {
    console.log(`ok   ${label}`)
    continue
  }
  failed += 1
  console.log(`FAIL ${label}`)
  for (const p of problems) console.log(`       ${p}`)
}

if (failed > 0) {
  console.error(`\n${failed} of ${CHECKS.length} checks failed`)
  process.exit(1)
}
console.log(`\nall ${CHECKS.length} checks passed`)
