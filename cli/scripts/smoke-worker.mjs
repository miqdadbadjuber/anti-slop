import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {
  skillSourceDir,
  resolveTargets,
  detectAgents,
  detectConflicts,
  installSkills,
  updatePointers,
} from '../lib/install.mjs'

const skills = ['antislop', 'antislop-ui']

const failures = []

/** Prints the line this always printed and records whether it held, so one run
 * reports every break rather than stopping at the first.
 */
const check = (label, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  console.log(ok ? `ok   ${label}:` : `FAIL ${label}:`, actual, ok ? '' : `(expected ${JSON.stringify(expected)})`)
  if (!ok) failures.push(label)
}

// Fresh state: nothing detected, and the default selection is every agent.
const fresh = detectAgents('project')
check('A detected (fresh project)', fresh, [])
const defaultTargets = resolveTargets('project')
console.log('A default targets:', defaultTargets.map((t) => `${t.agent.id}@${t.path} exists=${t.exists}`).join(' | '), '(expect all seven, exists=false)')

// Claude Code only, via explicit selection (old behavior preserved).
const targets = resolveTargets('project', ['claude'])
let written = installSkills({ skills, targets, overwrite: false })
let pointers = updatePointers({ targets, skills })
console.log('B targets:', targets.map((t) => `${t.agent.id}@${t.path} exists=${t.exists}`).join(' | '))
console.log('B written:', written.map((w) => `${w.agent.id}:${w.skill}`).join(', '))
check('B pointers', pointers.map((p) => path.basename(p)), ['CLAUDE.md'])

const conflicts = detectConflicts({ skills, targets })
written = installSkills({ skills, targets, overwrite: false })
check('C conflicts', conflicts.length, 2)
check('C written without overwrite', written.length, 0)
written = installSkills({ skills, targets, overwrite: true })
check('C overwritten', written.length, 2)

// Antigravity on a fresh project: .agents/ does not exist yet, install creates it.
const agTargets = resolveTargets('project', ['antigravity'])
console.log('D antigravity targets:', agTargets.map((t) => `${t.agent.id}@${t.path} exists=${t.exists}`).join(' | '), '(exists=false before install)')
const agWritten = installSkills({ skills, targets: agTargets, overwrite: false })
check('D antigravity written', agWritten.length, 2)
const agPointers = updatePointers({ targets: agTargets, skills })
check('D antigravity pointers', agPointers.map((p) => path.basename(p)), ['AGENTS.md'])
check('D .agents/skills/antislop/SKILL.md exists', fs.existsSync(path.join(process.cwd(), '.agents', 'skills', 'antislop', 'SKILL.md')), true)

// OpenCode, Cursor, and Gemini each install and point to their own entry file.
for (const agent of ['opencode', 'cursor', 'gemini']) {
  const t = resolveTargets('project', [agent])
  const w = installSkills({ skills, targets: t, overwrite: false })
  const pointers = updatePointers({ targets: t, skills })
  check(`D2 ${agent} written`, w.length, 2)
  check(`D2 ${agent} pointer`, pointers.map((p) => path.basename(p)), [agent === 'gemini' ? 'GEMINI.md' : 'AGENTS.md'])
  check(`D2 ${agent} folder exists`, fs.existsSync(path.join(process.cwd(), agent === 'gemini' ? '.gemini' : agent === 'cursor' ? '.cursor' : '.opencode', 'skills', 'antislop', 'SKILL.md')), true)
}

// Hermes is global-only: a project install still resolves to the home dir.
const hermesProject = resolveTargets('project', ['hermes'])
const hermesGlobal = resolveTargets('global', ['hermes'])
check('D3 hermes project target', hermesProject[0].path, path.join(os.homedir(), '.hermes', 'skills'))
check('D3 hermes global target', hermesGlobal[0].path, path.join(os.homedir(), '.hermes', 'skills'))
check('D3 hermes detected in project', detectAgents('project').includes('hermes'), false)

// Detection now sees the agents that were installed.
const after = detectAgents('project')
check('E detected after installs', [...after].sort(), ['antigravity', 'claude', 'cursor', 'gemini', 'opencode'])

const globalTargets = resolveTargets('global', ['claude', 'codex'])
console.log('F global targets:', globalTargets.map((t) => `${t.agent.id}@${t.path}`).join(' | '))

// Copies are identical and the pointer block dedupes.
const src = fs.readFileSync(path.join(skillSourceDir(), 'antislop-ui', 'SKILL.md'), 'utf8')
const dst = fs.readFileSync(path.join(process.cwd(), '.claude', 'skills', 'antislop-ui', 'SKILL.md'), 'utf8')
check('G antislop-ui SKILL.md identical', src === dst, true)

updatePointers({ targets, skills })
const entry = fs.readFileSync(path.join(process.cwd(), 'CLAUDE.md'), 'utf8')
check('H blocks after a second run', (entry.match(/antislop:start/g) || []).length, 1)

if (failures.length > 0) {
  console.error(`\n${failures.length} check(s) failed: ${failures.join(', ')}`)
  process.exit(1)
}
console.log('\nall checks passed')
