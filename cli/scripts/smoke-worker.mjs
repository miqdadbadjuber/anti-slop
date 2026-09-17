import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {
  AGENTS,
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
console.log('A default targets:', defaultTargets.map((t) => `${t.agent.id}@${t.path} exists=${t.exists}`).join(' | '), '(expect all eight, exists=false)')

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

// Hermes reads a project's .hermes/skills, and ~/.hermes/skills for a global install.
const hermesProject = resolveTargets('project', ['hermes'])
const hermesGlobal = resolveTargets('global', ['hermes'])
check('D3 hermes project target', hermesProject[0].path, path.join(process.cwd(), '.hermes', 'skills'))
check('D3 hermes global target', hermesGlobal[0].path, path.join(os.homedir(), '.hermes', 'skills'))
const hermesWritten = installSkills({ skills, targets: hermesProject, overwrite: false })
check('D3 hermes written into the project', hermesWritten.length, 2)
check('D3 hermes detected in project', detectAgents('project').includes('hermes'), true)

// Pi splits its scopes: project .pi/skills, global ~/.pi/agent/skills.
const piProject = resolveTargets('project', ['pi'])
const piGlobal = resolveTargets('global', ['pi'])
check('D3b pi project target', piProject[0].path, path.join(process.cwd(), '.pi', 'skills'))
check('D3b pi global target', piGlobal[0].path, path.join(os.homedir(), '.pi', 'agent', 'skills'))
const piWritten = installSkills({ skills, targets: piProject, overwrite: false })
check('D3b pi written into the project', piWritten.length, 2)
check('D3b pi writes a project pointer', updatePointers({ targets: piProject, skills }).map((p) => path.basename(p)), ['AGENTS.md'])

// OpenCode splits its scopes: project folder for a project install, ~/.config for global.
const ocProject = resolveTargets('project', ['opencode'])
const ocGlobal = resolveTargets('global', ['opencode'])
check('D4 opencode project target', ocProject[0].path, path.join(process.cwd(), '.opencode', 'skills'))
check('D4 opencode global target', ocGlobal[0].path, path.join(os.homedir(), '.config', 'opencode', 'skills'))

// Antigravity reads a project's .agents/skills but not the one under the home dir.
const agGlobal = resolveTargets('global', ['antigravity'])
check('D5 antigravity project target', resolveTargets('project', ['antigravity'])[0].path, path.join(process.cwd(), '.agents', 'skills'))
check('D5 antigravity global target', agGlobal[0].path, path.join(os.homedir(), '.gemini', 'config', 'skills'))

// updatePointers has no other source for the entry file, so no row may omit it.
check('D6 every agent names an entry file', AGENTS.filter((a) => !a.entry).map((a) => a.id), [])

// Hermes reads a project's AGENTS.md, so a project install of it must write the pointer.
check('D6 hermes writes a project pointer', updatePointers({ targets: hermesProject, skills }).map((p) => path.basename(p)), ['AGENTS.md'])

// Detection now sees the agents that were installed.
const after = detectAgents('project')
check('E detected after installs', [...after].sort(), ['antigravity', 'claude', 'cursor', 'gemini', 'hermes', 'opencode', 'pi'])

const globalTargets = resolveTargets('global', ['claude', 'codex'])
console.log('F global targets:', globalTargets.map((t) => `${t.agent.id}@${t.path}`).join(' | '))

// Copies are identical and the pointer block dedupes.
const src = fs.readFileSync(path.join(skillSourceDir(), 'antislop-ui', 'SKILL.md'), 'utf8')
const dst = fs.readFileSync(path.join(process.cwd(), '.claude', 'skills', 'antislop-ui', 'SKILL.md'), 'utf8')
check('G antislop-ui SKILL.md identical', src === dst, true)

updatePointers({ targets, skills })
const entry = fs.readFileSync(path.join(process.cwd(), 'CLAUDE.md'), 'utf8')
check('H blocks after a second run', (entry.match(/antislop:start/g) || []).length, 1)

// The entry file belongs to the author. Each fixture below used to be damaged.
const entryPath = path.join(process.cwd(), 'CLAUDE.md')
const write = (text) => fs.writeFileSync(entryPath, text)
const read = () => fs.readFileSync(entryPath, 'utf8')

write('# Mine\r\n\r\nNotes.\r\n')
updatePointers({ targets, skills })
check('I CRLF kept', read().includes('\r\n<!-- antislop:start -->'), true)
check('I bare LF count', (read().match(/(?<!\r)\n/g) || []).length, 0)

write('# Mine\n\n```md\n<!-- antislop:start -->\n<!-- antislop:end -->\n```\n')
updatePointers({ targets, skills })
check('I fenced example untouched', read().includes('```md\n<!-- antislop:start -->\n<!-- antislop:end -->\n```'), true)
check('I real block added beside it', (read().match(/antislop:start/g) || []).length, 2)

write('# Mine\n<!-- antislop:end -->\n')
updatePointers({ targets, skills })
const stable = read()
updatePointers({ targets, skills })
check('I orphan marker does not grow', read() === stable, true)
check('I orphan marker is gone', (read().match(/antislop:end/g) || []).length, 1)

// A fence left open at EOF is a typo, not a boundary: the block lands inside it and has
// to be found again, or every run appends another copy.
write('# Mine\n\nNotes:\n\n```bash\nnpm i\n')
updatePointers({ targets, skills })
const fenced = read()
updatePointers({ targets, skills })
updatePointers({ targets, skills })
check('J unclosed fence stable', read() === fenced, true)
check('J unclosed fence keeps code', read().includes('npm i'), true)
check('J unclosed fence one block', (read().match(/antislop:start/g) || []).length, 1)

// A mistyped end marker is the author's text, so the block is appended, not swapped in.
write('# Mine\n\n<!-- antislop:start -->\nold\n<!-- antislop:End -->\n\n## Notes\nKeep this line.\n')
updatePointers({ targets, skills })
check('J mistyped end keeps the tail', read().includes('Keep this line.'), true)
check('J mistyped end one block', (read().match(/antislop:start/g) || []).length, 1)

// A longer fence run is not closed by a shorter one inside the example.
write('# Mine\n\n````md\n```md\n<!-- antislop:start -->\n<!-- antislop:end -->\n```\n````\n')
updatePointers({ targets, skills })
check('J four-backtick example untouched', read().includes('````md\n```md\n<!-- antislop:start -->'), true)

// A stray end marker below the block is ours too, and must not survive.
write('# Mine\n<!-- antislop:start -->\nold\n<!-- antislop:end -->\nTail text\n<!-- antislop:end -->\n')
updatePointers({ targets, skills })
check('J stray end below cleared', (read().match(/antislop:end/g) || []).length, 1)
check('J text below the block kept', read().includes('Tail text'), true)

// Dominant line ending wins, so two CRLF lines do not flip a mostly-LF file.
write('# Mine\n' + 'line\n'.repeat(10) + 'a\r\nb\r\n')
updatePointers({ targets, skills })
check('J mostly-LF stays LF', (read().match(/\r\n/g) || []).length, 0)

// A second marker pair leaves a stray start behind unless every marker line is cleared.
write('# Mine\n<!-- antislop:start -->\nX\n<!-- antislop:end -->\nKeep this too.\n<!-- antislop:start -->\nY\n<!-- antislop:end -->\n')
updatePointers({ targets, skills })
check('J duplicate pair settles to one', (read().match(/antislop:start/g) || []).length, 1)
check('J duplicate pair keeps text', read().includes('Keep this too.'), true)

if (failures.length > 0) {
  console.error(`\n${failures.length} check(s) failed: ${failures.join(', ')}`)
  process.exit(1)
}
console.log('\nall checks passed')
