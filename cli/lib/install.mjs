import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const CORE = 'antislop'

export const AGENTS = [
  { id: 'claude', label: 'Claude Code', dir: '.claude/skills' },
  { id: 'antigravity', label: 'Antigravity', dir: '.agents/skills' },
  { id: 'codex', label: 'Codex', dir: '.codex/skills' },
  { id: 'opencode', label: 'OpenCode', dir: '.opencode/skills' },
  { id: 'cursor', label: 'Cursor', dir: '.cursor/skills' },
  { id: 'gemini', label: 'Gemini CLI', dir: '.gemini/skills' },
  // Hermes reads its skills from the home dir only, never from a project folder.
  { id: 'hermes', label: 'Hermes', dir: '.hermes/skills', globalOnly: true },
]

export function skillSourceDir() {
  const bundled = path.join(__dirname, '..', 'skills')
  if (fs.existsSync(bundled)) return bundled
  const repo = path.join(__dirname, '..', '..', 'skills')
  if (fs.existsSync(repo)) return repo
  return null
}

function resolveBase(location) {
  return location === 'global' ? os.homedir() : process.cwd()
}

export function resolveTargets(location, selected = AGENTS.map((a) => a.id)) {
  const base = resolveBase(location)
  return AGENTS.filter((a) => selected.includes(a.id)).map((agent) => {
    // A global-only agent (Hermes) always resolves to the home dir, even for a
    // project install, because it never reads skills from a project folder.
    const targetBase = agent.globalOnly ? os.homedir() : base
    return {
      agent,
      path: path.join(targetBase, agent.dir),
      exists: fs.existsSync(path.join(targetBase, agent.dir)),
    }
  })
}

// Which agents already have their folder present, used to pre-check the picker's
// agent question. Absence of a folder is not absence of the agent, so the picker
// still lets the user add an agent whose folder does not exist yet. Global-only
// agents (Hermes) are detected only for global installs: a project install must
// not pre-check a folder that lives in the home dir.
export function detectAgents(location) {
  const base = resolveBase(location)
  return AGENTS.filter((a) => {
    if (a.globalOnly && location !== 'global') return false
    return fs.existsSync(path.join(base, a.dir.split('/')[0]))
  }).map((a) => a.id)
}

export function detectConflicts({ skills, targets }) {
  const conflicts = []
  for (const t of targets) {
    for (const skill of skills) {
      if (fs.existsSync(path.join(t.path, skill))) {
        conflicts.push({ skill, agent: t.agent, path: path.join(t.path, skill) })
      }
    }
  }
  return conflicts
}

function copyDir(src, dest) {
  fs.rmSync(dest, { recursive: true, force: true })
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    // README.md is GitHub-facing only; never ship it into a user's agent setup.
    if (entry.name === 'README.md') continue
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(s, d)
    else fs.copyFileSync(s, d)
  }
}

export function installSkills({ skills, targets, overwrite = false }) {
  const source = skillSourceDir()
  const written = []
  for (const t of targets) {
    for (const skill of skills) {
      const src = path.join(source, skill)
      if (!fs.existsSync(src)) continue
      const dest = path.join(t.path, skill)
      if (fs.existsSync(dest) && !overwrite) continue
      copyDir(src, dest)
      written.push({ skill, agent: t.agent, path: dest })
    }
  }
  return written
}

const POINTER_START = '<!-- antislop:start -->'
const POINTER_END = '<!-- antislop:end -->'

// The entry file each agent reads at session start.
const ENTRY_FILE = {
  claude: 'CLAUDE.md',
  codex: 'AGENTS.md',
  antigravity: 'AGENTS.md',
  opencode: 'AGENTS.md',
  cursor: 'AGENTS.md',
  gemini: 'GEMINI.md',
  hermes: 'AGENTS.md',
}

const SKILL_LINES = {
  [CORE]: 'Core filter, always on: `antislop`',
  'antislop-ui': 'UI / visual: `antislop-ui`',
  'antislop-copywriting': 'Copy & text: `antislop-copywriting`',
  'antislop-human': 'People: `antislop-human`',
  'antislop-layoutmobile': 'Mobile / responsive: `antislop-layoutmobile`',
  'antislop-code': 'Code comments: `antislop-code`',
}

// Names the skills instead of importing the core. The skills sit in the agent's
// own folder, so the agent already finds them; an `@` import would also pull all
// 46 KB of the core into every session, including sessions that touch no UI.
function pointerBlock(skills) {
  return [
    POINTER_START,
    '## antislop',
    'For UI, copy, people, mobile layout, or code comments work, load the antislop skill for the task:',
    ...skills.filter((s) => SKILL_LINES[s]).map((s) => `- ${SKILL_LINES[s]}`),
    'Before starting, ask the user when antislop applies: during the work, or after it is done.',
    POINTER_END,
  ]
}

function writeBlock(entry, block) {
  const existing = fs.existsSync(entry) ? fs.readFileSync(entry, 'utf8') : ''
  const lines = existing.split(/\r?\n/)
  const start = lines.findIndex((l) => l.trim() === POINTER_START)
  const end = lines.findIndex((l) => l.trim() === POINTER_END)
  const replacing = start !== -1 && end !== -1 && start < end
  const head = replacing ? lines.slice(0, start) : lines
  const tail = replacing ? lines.slice(end + 1) : []

  const body = [...head, '', ...block, '', ...tail]
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+/, '')
    .trimEnd()

  fs.writeFileSync(entry, body + '\n')
}

export function updatePointers({ targets, skills }) {
  const entries = new Set()
  for (const t of targets) {
    if (fs.existsSync(path.join(t.path, CORE))) entries.add(ENTRY_FILE[t.agent.id])
  }

  const block = pointerBlock(skills)
  const written = []
  for (const name of entries) {
    const entry = path.join(process.cwd(), name)
    writeBlock(entry, block)
    written.push(entry)
  }
  return written
}
