import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const CORE = 'antislop'

// Every row carries the entry file it writes, so a new agent cannot be added
// without one: `entry` is what `updatePointers` needs and nothing else supplies it.
// `readsAlso` lists the other project folders the agent loads skills from besides its
// own, so a duplicate can be named instead of discovered later as a missing skill.
export const AGENTS = [
  { id: 'claude', label: 'Claude Code', dir: '.claude/skills', entry: 'CLAUDE.md' },
  // Antigravity reads a project's .agents/skills, but not the one under the home dir.
  { id: 'antigravity', label: 'Antigravity', dir: '.agents/skills', globalDir: '.gemini/config/skills', entry: 'AGENTS.md' },
  // Codex reads $HOME/.agents/skills at user scope and calls its own $CODEX_HOME/skills
  // the deprecated user location, so a global install belongs in the shared folder. In a
  // project it reads .codex/skills and walks .agents/skills up from the working directory.
  { id: 'codex', label: 'Codex', dir: '.codex/skills', globalDir: '.agents/skills', readsAlso: ['.agents/skills'], entry: 'AGENTS.md' },
  // OpenCode documents ~/.config/opencode for global skills; ~/.opencode is undocumented.
  { id: 'opencode', label: 'OpenCode', dir: '.opencode/skills', globalDir: '.config/opencode/skills', readsAlso: ['.claude/skills', '.agents/skills'], entry: 'AGENTS.md' },
  { id: 'cursor', label: 'Cursor', dir: '.cursor/skills', entry: 'AGENTS.md' },
  { id: 'gemini', label: 'Gemini CLI', dir: '.gemini/skills', entry: 'GEMINI.md' },
  // Hermes reads a project's .hermes/skills and .agents/skills, project tier first.
  { id: 'hermes', label: 'Hermes', dir: '.hermes/skills', readsAlso: ['.agents/skills'], entry: 'AGENTS.md' },
  // Copilot reads the shared .agents/skills folder, so it shares Antigravity's target.
  { id: 'copilot', label: 'GitHub Copilot', dir: '.agents/skills', entry: 'AGENTS.md' },
  // Kimi Code reads the shared folder at both scopes. Its own .kimi-code/skills is never
  // written here, and $KIMI_CODE_HOME/skills moves with an env var the installer cannot see.
  { id: 'kimi', label: 'Kimi Code', dir: '.agents/skills', entry: 'AGENTS.md' },
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

// Some agents keep global skills outside ~/<dir>, like OpenCode's ~/.config.
function skillPath(agent, location) {
  const dir = location === 'global' ? (agent.globalDir ?? agent.dir) : agent.dir
  return path.join(resolveBase(location), dir)
}

// Agents that share a folder share a target, so the skills are copied once and the
// conflict count matches the folders on disk rather than the agents selected.
export function resolveTargets(location, selected = AGENTS.map((a) => a.id)) {
  const byPath = new Map()
  for (const agent of AGENTS.filter((a) => selected.includes(a.id))) {
    const target = skillPath(agent, location)
    const found = byPath.get(target)
    if (found) found.agents.push(agent)
    else byPath.set(target, { agents: [agent], path: target, exists: fs.existsSync(target) })
  }
  return [...byPath.values()]
}

// OpenCode and Hermes read more than one project folder, so installing into two of them
// puts the same skill names in both. Neither documents which copy wins, so name it.
export function detectDuplicateReads({ targets, location }) {
  if (location !== 'project') return []
  const paths = new Set(targets.map((t) => t.path))
  const found = []
  for (const t of targets) {
    for (const agent of t.agents) {
      const others = (agent.readsAlso ?? [])
        .map((d) => path.join(resolveBase(location), d))
        .filter((p) => paths.has(p))
      if (others.length > 0) found.push({ agent, paths: [t.path, ...others] })
    }
  }
  return found
}

// Agents whose folder already exists, used to pre-check the picker. A missing
// folder does not mean a missing agent, so the user can still add one.
export function detectAgents(location) {
  return AGENTS.filter((a) => fs.existsSync(path.dirname(skillPath(a, location)))).map((a) => a.id)
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
  // Fail with the real reason instead of a TypeError from path.join(null, skill).
  if (!source) throw new Error('Could not find the antislop skills. Reinstall the antislop package.')
  const written = []
  for (const t of targets) {
    for (const skill of skills) {
      const src = path.join(source, skill)
      if (!fs.existsSync(src)) continue
      const dest = path.join(t.path, skill)
      if (fs.existsSync(dest) && !overwrite) continue
      copyDir(src, dest)
      written.push({ skill, agents: t.agents.map((a) => a.id), path: dest })
    }
  }
  return written
}

const POINTER_START = '<!-- antislop:start -->'
const POINTER_END = '<!-- antislop:end -->'

const SKILL_LINES = {
  [CORE]: 'Core filter, always on: `antislop`',
  'antislop-ui': 'UI / visual: `antislop-ui`',
  'antislop-copywriting': 'Copy & text: `antislop-copywriting`',
  'antislop-human': 'People: `antislop-human`',
  'antislop-layoutmobile': 'Mobile / responsive: `antislop-layoutmobile`',
  'antislop-code': 'Code comments: `antislop-code`',
}

// Names the skills rather than importing the core: an `@` import pulls all 46 KB
// of it into every session, including ones that touch no UI.
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

// A marker inside a code fence is someone's example, not our block. Fence runs are matched
// by length, and a fence left open at EOF is a typo rather than a boundary.
function scanMarkers(lines) {
  const fenced = new Array(lines.length).fill(false)
  let mark = null
  let len = 0
  let from = -1
  lines.forEach((line, i) => {
    const m = /^\s*(`{3,}|~{3,})/.exec(line)
    if (m) {
      if (!mark) {
        mark = m[1][0]
        len = m[1].length
        from = i
      } else if (m[1][0] === mark && m[1].length >= len && /^[ \t]*$/.test(line.slice(m[0].length))) {
        mark = null
        from = -1
      }
      fenced[i] = true
      return
    }
    fenced[i] = Boolean(mark)
  })
  if (mark) for (let i = from; i < lines.length; i++) fenced[i] = false

  const starts = []
  const ends = []
  lines.forEach((line, i) => {
    if (fenced[i]) return
    const t = line.trim()
    if (t === POINTER_START) starts.push(i)
    else if (t === POINTER_END) ends.push(i)
  })
  return { starts, ends }
}

function writeBlock(entry, block) {
  const existing = fs.existsSync(entry) ? fs.readFileSync(entry, 'utf8') : ''
  // Follow the file's dominant ending. Keying on "contains any CRLF" would flip a
  // mostly-LF file, which is the damage this is here to avoid.
  const crlf = (existing.match(/\r\n/g) || []).length
  const eol = crlf > (existing.match(/\n/g) || []).length - crlf ? '\r\n' : '\n'
  const lines = existing.split(/\r?\n/)
  const { starts, ends } = scanMarkers(lines)
  const start = starts.length ? starts[0] : -1
  const end = start === -1 ? -1 : ends.find((i) => i > start) ?? -1
  const paired = start !== -1 && end !== -1

  // Only marker lines are ever removed. Reading a lone start as "the block runs to EOF"
  // would delete everything the author wrote after a marker they mistyped.
  const removed = new Set([...starts, ...ends])
  if (paired) for (let i = start; i <= end; i++) removed.add(i)

  const insertAt = paired ? start : lines.length
  const head = lines.slice(0, insertAt).filter((_, i) => !removed.has(i))
  const tail = lines.slice(insertAt).filter((_, i) => !removed.has(insertAt + i))

  // Tidy the two seams only: a /\n{3,}/g sweep over the whole document would also
  // collapse blank lines the author wrote inside their code fences.
  while (head.length && head[head.length - 1].trim() === '') head.pop()
  while (tail.length && tail[0].trim() === '') tail.shift()

  const body = [...head, '', ...block, ...(tail.length ? ['', ...tail] : [])]
    .join(eol)
    .replace(/^\r?\n+/, '')
    .trimEnd()

  fs.writeFileSync(entry, body + eol)
}

export function updatePointers({ targets, skills }) {
  const entries = new Set()
  for (const t of targets) {
    if (fs.existsSync(path.join(t.path, CORE))) for (const a of t.agents) entries.add(a.entry)
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
