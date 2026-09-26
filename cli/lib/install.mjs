import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const CORE = 'antislop'

export const VERSION = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')).version

/** The release an existing install came from, or null when it predates the VERSION file.
 * Nothing else on disk names it, so without this an update cannot tell the user what
 * they already have.
 */
export function installedVersion(targetPath) {
  const file = path.join(targetPath, CORE, 'VERSION')
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8').trim() : null
}

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
  // Cline reads .claude/skills as well as its own folder, so the two collide in one
  // project. A global skill outranks a project one here, the reverse of every other row.
  { id: 'cline', label: 'Cline', dir: '.cline/skills', readsAlso: ['.claude/skills'], entry: 'AGENTS.md' },
  // Amp shares the project's .agents/skills but keeps a global folder of its own, and it
  // also loads .claude/skills. Its user path outranks the project one.
  { id: 'amp', label: 'Amp', dir: '.agents/skills', globalDir: '.config/agents/skills', readsAlso: ['.claude/skills'], entry: 'AGENTS.md' },
  { id: 'gemini', label: 'Gemini CLI', dir: '.gemini/skills', entry: 'GEMINI.md' },
  // Hermes reads a project's .hermes/skills and .agents/skills, project tier first.
  { id: 'hermes', label: 'Hermes', dir: '.hermes/skills', readsAlso: ['.agents/skills'], entry: 'AGENTS.md' },
  // Copilot reads the shared .agents/skills folder, so it shares Antigravity's target.
  { id: 'copilot', label: 'GitHub Copilot', dir: '.agents/skills', entry: 'AGENTS.md' },
  // Kimi Code reads the shared folder at both scopes. Its own .kimi-code/skills is never
  // written here, and $KIMI_CODE_HOME/skills moves with an env var the installer cannot see.
  { id: 'kimi', label: 'Kimi Code', dir: '.agents/skills', entry: 'AGENTS.md' },
  // Pi keeps a folder of its own at both scopes and also walks the shared .agents/skills,
  // so choosing it beside Antigravity, Copilot, Kimi, or Amp fills two folders it reads.
  { id: 'pi', label: 'Pi', dir: '.pi/skills', globalDir: '.pi/agent/skills', readsAlso: ['.agents/skills'], entry: 'AGENTS.md' },
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

// Six rows read more than one project folder, so installing into two of them puts the
// same names in both. Only Pi settles which copy wins, so name it either way.
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

// The plugin doors keep a copy of their own under a vendor path, and none of those paths
// is documented as a stable interface. These probes only read, and a miss stays silent.
function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

function listDirs(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)
  } catch {
    return []
  }
}

// A door that cloned the repo carries the VERSION file; one cloned before it shipped
// does not, and an unknown version is reported as unknown rather than guessed.
function cloneVersion(dir) {
  try {
    return fs.readFileSync(path.join(dir, 'skills', CORE, 'VERSION'), 'utf8').trim()
  } catch {
    return null
  }
}

function findClone(dir) {
  return fs.existsSync(dir) ? { path: dir, version: cloneVersion(dir) } : null
}

const claudePlugins = () => path.join(os.homedir(), '.claude', 'plugins', 'installed_plugins.json')

export const PLUGIN_DOORS = [
  {
    id: 'claude',
    label: 'Claude Code',
    update: 'claude plugin update antislop@anti-slop',
    find() {
      const entry = readJSON(claudePlugins())?.plugins?.['antislop@anti-slop']?.[0]
      return entry ? { path: entry.installPath ?? claudePlugins(), version: entry.version ?? null } : null
    },
  },
  {
    id: 'antigravity',
    label: 'Antigravity',
    update: 'agy plugin install https://github.com/miqdadbadjuber/anti-slop',
    find: () => findClone(path.join(os.homedir(), '.gemini', 'config', 'plugins', CORE)),
  },
  {
    id: 'codex',
    label: 'Codex',
    update: 'codex plugin marketplace upgrade anti-slop',
    find() {
      const cache = path.join(os.homedir(), '.codex', 'plugins', 'cache', 'anti-slop', CORE)
      const versions = listDirs(cache).sort()
      return versions.length ? { path: cache, version: versions[versions.length - 1] } : null
    },
  },
  {
    id: 'cursor',
    label: 'Cursor',
    update: 'agent plugin marketplace update https://github.com/miqdadbadjuber/anti-slop',
    find: () => findClone(path.join(os.homedir(), '.cursor', 'plugins', 'local', 'anti-slop')),
  },
]

// A door that moves its files breaks its own probe and nothing else: the installer stops
// naming that door instead of failing, which is the whole reason a miss has to be silent.
export function detectPluginDoors() {
  return PLUGIN_DOORS.flatMap((door) => {
    let found = null
    try {
      found = door.find()
    } catch {
      found = null
    }
    return found ? [{ door, ...found }] : []
  })
}

export function detectConflicts({ skills, targets }) {
  const conflicts = []
  for (const t of targets) {
    for (const skill of skills) {
      if (fs.existsSync(path.join(t.path, skill))) {
        conflicts.push({ skill, agents: t.agents.map((a) => a.id), path: path.join(t.path, skill) })
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

export const SKILL_NAMES = Object.keys(SKILL_LINES)

// Explicit paths avoid resolving a same-named, older user-level skill. No `@`
// import: the core should only be read when the task needs it.
function pointerBlock(skills, skillPaths) {
  return [
    POINTER_START,
    '## antislop',
    'For UI, copy, people, mobile layout, or code comments work, read these installed skill files directly (use these paths even if a same-named global skill exists):',
    ...skills.filter((s) => SKILL_LINES[s] && skillPaths.has(s)).map((s) => `- ${SKILL_LINES[s]}: \`${skillPaths.get(s)}\``),
    'Before starting, follow the core\'s "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user\'s request without naming the source does not replace this notice.',
    'Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill\'s mode does not select antislop\'s mode.',
    'If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.',
    'To update antislop later: `npx antislop-ai --update`, or run `npx antislop-ai` and pick Overwrite them.',
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
  const entries = new Map()
  for (const t of targets) {
    if (fs.existsSync(path.join(t.path, CORE))) {
      for (const a of t.agents) {
        if (!entries.has(a.entry)) entries.set(a.entry, new Map())
        const skillPaths = entries.get(a.entry)
        for (const skill of skills) {
          const file = path.join(t.path, skill, 'SKILL.md')
          if (!skillPaths.has(skill) && fs.existsSync(file)) {
            skillPaths.set(skill, path.relative(process.cwd(), file).split(path.sep).join('/'))
          }
        }
      }
    }
  }

  const written = []
  for (const [name, skillPaths] of entries) {
    const entry = path.join(process.cwd(), name)
    writeBlock(entry, pointerBlock(skills, skillPaths))
    written.push(entry)
  }
  return written
}

// `--update` replaces every antislop folder already on this machine, at both scopes and
// with no prompts. Each folder keeps the skill selection it was installed with. The scope
// list is a parameter so a test never writes into the home directory it runs under.
export function updateAll({ locations = ['project', 'global'] } = {}) {
  const results = []
  const projectTargets = []
  const projectSkills = new Set()

  for (const location of locations) {
    for (const target of resolveTargets(location)) {
      if (!fs.existsSync(path.join(target.path, CORE))) continue
      const skills = SKILL_NAMES.filter((s) => fs.existsSync(path.join(target.path, s)))
      if (skills.length === 0) continue
      const from = installedVersion(target.path)
      installSkills({ skills, targets: [target], overwrite: true })
      results.push({ location, path: target.path, agents: target.agents.map((a) => a.id), skills, from, to: VERSION })
      if (location === 'project') {
        projectTargets.push(target)
        for (const s of skills) projectSkills.add(s)
      }
    }
  }

  // One block per entry file, so the union of every project folder's skills is the list.
  const pointers = projectTargets.length > 0
    ? updatePointers({ targets: projectTargets, skills: [...projectSkills] })
    : []
  return { results, pointers }
}
