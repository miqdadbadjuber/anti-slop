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

// 1. Fresh state: nothing detected, and the default selection is every agent.
const fresh = detectAgents('project')
console.log('A detected (fresh project):', fresh.length === 0 ? 'none' : fresh.join(', '), '(expect none)')
const defaultTargets = resolveTargets('project')
console.log('A default targets:', defaultTargets.map((t) => `${t.agent.id}@${t.path} exists=${t.exists}`).join(' | '), '(expect all seven, exists=false)')

// 2. Claude Code only, via explicit selection (old behavior preserved).
const targets = resolveTargets('project', ['claude'])
let written = installSkills({ skills, targets, overwrite: false })
let pointers = updatePointers({ targets, skills })
console.log('B targets:', targets.map((t) => `${t.agent.id}@${t.path} exists=${t.exists}`).join(' | '))
console.log('B written:', written.map((w) => `${w.agent.id}:${w.skill}`).join(', '))
console.log('B pointers:', pointers.map((p) => path.basename(p)).join(', '), '(expect CLAUDE.md)')

const conflicts = detectConflicts({ skills, targets })
written = installSkills({ skills, targets, overwrite: false })
console.log('C conflicts:', conflicts.length, '(expect 2)')
console.log('C written:', written.length, '(expect 0)')
written = installSkills({ skills, targets, overwrite: true })
console.log('C overwritten:', written.length, '(expect 2)')

// 3. Antigravity on the fresh project: the reported bug. The target is included
//    even though .agents/ did not exist, install creates it, pointer goes to AGENTS.md.
const agTargets = resolveTargets('project', ['antigravity'])
console.log('D antigravity targets:', agTargets.map((t) => `${t.agent.id}@${t.path} exists=${t.exists}`).join(' | '), '(exists=false before install)')
const agWritten = installSkills({ skills, targets: agTargets, overwrite: false })
console.log('D antigravity written:', agWritten.map((w) => `${w.agent.id}:${w.skill}`).join(', '), '(expect 2)')
const agPointers = updatePointers({ targets: agTargets, skills })
console.log('D antigravity pointers:', agPointers.map((p) => path.basename(p)).join(', '), '(expect AGENTS.md)')
console.log('D .agents/skills/antislop/SKILL.md exists:', fs.existsSync(path.join(process.cwd(), '.agents', 'skills', 'antislop', 'SKILL.md')))

// 4. New providers on the fresh project: OpenCode, Cursor, Gemini install and
//    point to their own entry files.
for (const agent of ['opencode', 'cursor', 'gemini']) {
  const t = resolveTargets('project', [agent])
  const w = installSkills({ skills, targets: t, overwrite: false })
  const pointers = updatePointers({ targets: t, skills })
  console.log(`D2 ${agent} written:`, w.map((x) => `${x.agent.id}:${x.skill}`).join(', '), '(expect 2)')
  console.log(`D2 ${agent} pointer:`, pointers.map((p) => path.basename(p)).join(', '), `(expect ${agent === 'gemini' ? 'GEMINI.md' : 'AGENTS.md'})`)
  console.log(`D2 ${agent} folder exists:`, fs.existsSync(path.join(process.cwd(), agent === 'gemini' ? '.gemini' : agent === 'cursor' ? '.cursor' : '.opencode', 'skills', 'antislop', 'SKILL.md')))
}

// 5. Hermes is global-only: even a project install resolves to the home dir, and
//    it is never detected as a project agent. resolveTargets only, no install.
const hermesProject = resolveTargets('project', ['hermes'])
const hermesGlobal = resolveTargets('global', ['hermes'])
console.log('D3 hermes project target:', hermesProject[0].path, '(expect ' + path.join(os.homedir(), '.hermes', 'skills') + ')')
console.log('D3 hermes global target:', hermesGlobal[0].path, '(expect ' + path.join(os.homedir(), '.hermes', 'skills') + ')')
console.log('D3 hermes detected in project:', detectAgents('project').includes('hermes'), '(expect false)')

// 6. Detection now sees the agents that were installed.
const after = detectAgents('project')
console.log('E detected after installs:', after.join(', '), '(expect claude, antigravity, opencode, cursor, gemini)')

// 7. Global with a selection.
const globalTargets = resolveTargets('global', ['claude', 'codex'])
console.log('F global targets:', globalTargets.map((t) => `${t.agent.id}@${t.path}`).join(' | '))

// 8. Copies are identical and the pointer block dedupes.
const src = fs.readFileSync(path.join(skillSourceDir(), 'antislop-ui', 'SKILL.md'), 'utf8')
const dst = fs.readFileSync(path.join(process.cwd(), '.claude', 'skills', 'antislop-ui', 'SKILL.md'), 'utf8')
console.log('G antislop-ui SKILL.md identical:', src === dst)

updatePointers({ targets, skills })
const entry = fs.readFileSync(path.join(process.cwd(), 'CLAUDE.md'), 'utf8')
console.log('H blocks after a second run:', (entry.match(/antislop:start/g) || []).length, '(expect 1)')
