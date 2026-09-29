import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import assert from 'node:assert/strict'
import { configureMode, readSettings, resolveSettingsPath } from '../lib/settings.mjs'
import {
  AGENTS,
  CORE,
  PLUGIN_DOORS,
  skillSourceDir,
  resolveTargets,
  detectAgents,
  detectConflicts,
  detectDuplicateReads,
  installSkills,
  installedVersion,
  updateAll,
  updatePointers,
  VERSION,
} from '../lib/install.mjs'

const skills = ['antislop', 'antislop-ui']

assert.equal(
  resolveSettingsPath({ platform: 'linux', env: {}, home: '/home/ada' }),
  '/home/ada/.config/antislop/settings.json'
)
assert.equal(
  resolveSettingsPath({ platform: 'darwin', env: {}, home: '/Users/ada' }),
  '/Users/ada/.config/antislop/settings.json'
)
assert.equal(
  resolveSettingsPath({ platform: 'win32', env: { APPDATA: 'C:\\Users\\Ada\\AppData\\Roaming' }, home: 'C:\\Users\\Ada' }),
  'C:\\Users\\Ada\\AppData\\Roaming\\antislop\\settings.json'
)
assert.equal(
  resolveSettingsPath({ platform: 'win32', env: {}, home: 'C:\\Users\\Ada' }),
  'C:\\Users\\Ada\\.config\\antislop\\settings.json'
)

const settingsFile = path.join(process.cwd(), 'preferences', 'settings.json')
assert.match(configureMode([], settingsFile), /ask \(default\)/)
assert.equal(fs.existsSync(settingsFile), false)
for (const mode of ['during', 'after', 'ask']) {
  assert.match(configureMode([mode], settingsFile), new RegExp(`global mode: ${mode}`))
  assert.equal(readSettings(settingsFile).mode, mode)
  assert.match(configureMode([], settingsFile), new RegExp(`global mode: ${mode}`))
}
fs.writeFileSync(settingsFile, '{"other":true,"mode":"during"}')
configureMode(['after'], settingsFile)
assert.deepEqual(readSettings(settingsFile), { other: true, mode: 'after' })
assert.throws(() => configureMode(['invalid'], settingsFile), /Usage:/)
assert.throws(() => configureMode(['during', 'extra'], settingsFile), /Usage:/)
assert.equal(readSettings(settingsFile).mode, 'after')
for (const content of ['{broken', 'null', '[]', '"during"']) {
  fs.writeFileSync(settingsFile, content)
  assert.throws(() => configureMode(['during'], settingsFile))
  assert.equal(fs.readFileSync(settingsFile, 'utf8'), content)
}
for (const mode of ['invalid', null, 1]) {
  fs.writeFileSync(settingsFile, JSON.stringify({ mode }))
  assert.throws(() => configureMode([], settingsFile), /Invalid mode/)
  configureMode(['during'], settingsFile)
  assert.equal(readSettings(settingsFile).mode, 'during')
}
console.log('ok   global mode preferences: persistence, validation, and preservation')

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
console.log('A default targets:', defaultTargets.map((t) => `${t.agents.map((a) => a.id).join('+')}@${t.path} exists=${t.exists}`).join(' | '))
// Copilot, Kimi Code, and Amp share Antigravity's folder, so twelve resolve to nine.
check('A twelve agents over nine folders', [AGENTS.length, defaultTargets.length], [12, 9])
check('A copilot and kimi share the antigravity folder', resolveTargets('project', ['antigravity', 'copilot', 'kimi']).length, 1)

// Claude Code only, via explicit selection (old behavior preserved).
const targets = resolveTargets('project', ['claude'])
let written = installSkills({ skills, targets, overwrite: false })
let pointers = updatePointers({ targets, skills })
console.log('B targets:', targets.map((t) => `${t.agents.map((a) => a.id).join('+')}@${t.path} exists=${t.exists}`).join(' | '))
console.log('B written:', written.map((w) => `${w.agents.join('+')}:${w.skill}`).join(', '))
check('B pointers', pointers.map((p) => path.basename(p)), ['CLAUDE.md'])
const pointer = fs.readFileSync(pointers[0], 'utf8')
assert.match(pointer, /explicit session instruction first, then global preference, then ask/)
assert.match(pointer, /A session instruction always wins/)
assert.ok(pointer.includes('antislop active: <mode> (session override).'))
assert.ok(pointer.includes('antislop active: <mode> (global preference).'))
assert.ok(pointer.includes('ask during/after and end the response'))
assert.ok(pointer.includes('only at the start of the final answer, never in progress messages'))
assert.ok(pointer.includes('announce before the first edit and omit it from the final answer'))
assert.ok(pointer.includes('`.claude/skills/antislop/SKILL.md`'))
assert.ok(pointer.includes('`.claude/skills/antislop-ui/SKILL.md`'))

const conflicts = detectConflicts({ skills, targets })
written = installSkills({ skills, targets, overwrite: false })
check('C conflicts', conflicts.length, 2)
check('C written without overwrite', written.length, 0)
written = installSkills({ skills, targets, overwrite: true })
check('C overwritten', written.length, 2)

// Antigravity on a fresh project: .agents/ does not exist yet, install creates it.
const agTargets = resolveTargets('project', ['antigravity'])
console.log('D antigravity targets:', agTargets.map((t) => `${t.agents.map((a) => a.id).join('+')}@${t.path} exists=${t.exists}`).join(' | '), '(exists=false before install)')
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

// Cline keeps a folder of its own and reads .claude/skills beside it, so both fill up.
const clineProject = resolveTargets('project', ['cline'])
check('D8 cline project target', clineProject[0].path, path.join(process.cwd(), '.cline', 'skills'))
check('D8 cline global target', resolveTargets('global', ['cline'])[0].path, path.join(os.homedir(), '.cline', 'skills'))
check('D8 cline written', installSkills({ skills, targets: clineProject, overwrite: false }).length, 2)
check('D8 cline pointer', updatePointers({ targets: clineProject, skills }).map((p) => path.basename(p)), ['AGENTS.md'])
check('D8 cline folder exists', fs.existsSync(path.join(process.cwd(), '.cline', 'skills', 'antislop', 'SKILL.md')), true)

// Amp shares the project's .agents/skills, which the Antigravity block already filled,
// but its global folder is a different path.
const ampProject = resolveTargets('project', ['amp'])
check('D9 amp shares the agents folder', ampProject[0].path, path.join(process.cwd(), '.agents', 'skills'))
check('D9 amp global target', resolveTargets('global', ['amp'])[0].path, path.join(os.homedir(), '.config', 'agents', 'skills'))
check('D9 amp writes nothing twice', installSkills({ skills, targets: ampProject, overwrite: false }).length, 0)
check('D9 amp pointer', updatePointers({ targets: ampProject, skills }).map((p) => path.basename(p)), ['AGENTS.md'])

// Pi keeps a folder of its own at both scopes, and walks the shared .agents/skills
// beside it, which the Antigravity block already filled.
const piProject = resolveTargets('project', ['pi'])
check('D10 pi project target', piProject[0].path, path.join(process.cwd(), '.pi', 'skills'))
check('D10 pi global target', resolveTargets('global', ['pi'])[0].path, path.join(os.homedir(), '.pi', 'agent', 'skills'))
check('D10 pi written', installSkills({ skills, targets: piProject, overwrite: false }).length, 2)
check('D10 pi pointer', updatePointers({ targets: piProject, skills }).map((p) => path.basename(p)), ['AGENTS.md'])
check('D10 pi folder exists', fs.existsSync(path.join(process.cwd(), '.pi', 'skills', 'antislop', 'SKILL.md')), true)
// Pi loads the shared folder too, so Pi plus Antigravity holds the same names twice.
check('D10 pi duplicate read named', detectDuplicateReads({ targets: resolveTargets('project', ['antigravity', 'pi']), location: 'project' }).map((d) => [d.agent.id, d.paths.length]), [['pi', 2]])

// Hermes reads a project's .hermes/skills, and ~/.hermes/skills for a global install.
const hermesProject = resolveTargets('project', ['hermes'])
const hermesGlobal = resolveTargets('global', ['hermes'])
check('D3 hermes project target', hermesProject[0].path, path.join(process.cwd(), '.hermes', 'skills'))
check('D3 hermes global target', hermesGlobal[0].path, path.join(os.homedir(), '.hermes', 'skills'))
const hermesWritten = installSkills({ skills, targets: hermesProject, overwrite: false })
check('D3 hermes written into the project', hermesWritten.length, 2)
check('D3 hermes detected in project', detectAgents('project').includes('hermes'), true)

// OpenCode splits its scopes: project folder for a project install, ~/.config for global.
const ocProject = resolveTargets('project', ['opencode'])
const ocGlobal = resolveTargets('global', ['opencode'])
check('D4 opencode project target', ocProject[0].path, path.join(process.cwd(), '.opencode', 'skills'))
check('D4 opencode global target', ocGlobal[0].path, path.join(os.homedir(), '.config', 'opencode', 'skills'))

// Antigravity reads a project's .agents/skills but not the one under the home dir.
const agGlobal = resolveTargets('global', ['antigravity'])
check('D5 antigravity project target', resolveTargets('project', ['antigravity'])[0].path, path.join(process.cwd(), '.agents', 'skills'))
check('D5 antigravity global target', agGlobal[0].path, path.join(os.homedir(), '.gemini', 'config', 'skills'))

// Kimi Code has no folder of its own here: both scopes are the shared .agents/skills.
check('D7 kimi project target', resolveTargets('project', ['kimi'])[0].path, path.join(process.cwd(), '.agents', 'skills'))

// updatePointers has no other source for the entry file, so no row may omit it.
check('D6 every agent names an entry file', AGENTS.filter((a) => !a.entry).map((a) => a.id), [])

// Hermes reads a project's AGENTS.md, so a project install of it must write the pointer.
check('D6 hermes writes a project pointer', updatePointers({ targets: hermesProject, skills }).map((p) => path.basename(p)), ['AGENTS.md'])

// Detection now sees the agents that were installed.
const after = detectAgents('project')
check('E detected after installs', [...after].sort(), ['amp', 'antigravity', 'claude', 'cline', 'copilot', 'cursor', 'gemini', 'hermes', 'kimi', 'opencode', 'pi'])

// OpenCode reads .claude/skills and .agents/skills too, so a project that installs into
// two of them holds the same names twice and OpenCode picks between them unpredictably.
const dupReads = detectDuplicateReads({ targets: resolveTargets('project', ['claude', 'opencode']), location: 'project' })
check('E duplicate read named', dupReads.map((d) => [d.agent.id, d.paths.length]), [['opencode', 2]])
check('E one folder alone is not a duplicate', detectDuplicateReads({ targets: resolveTargets('project', ['opencode']), location: 'project' }), [])
// Cline reads .claude/skills beside its own folder, so Claude Code plus Cline collides.
check('E cline duplicate read named', detectDuplicateReads({ targets: resolveTargets('project', ['claude', 'cline']), location: 'project' }).map((d) => [d.agent.id, d.paths.length]), [['cline', 2]])
// Amp loads .claude/skills beside the shared folder, so Claude Code plus Amp collides too.
check('E amp duplicate read named', detectDuplicateReads({ targets: resolveTargets('project', ['claude', 'amp']), location: 'project' }).map((d) => [d.agent.id, d.paths.length]), [['amp', 2]])
check('E global scope is not checked', detectDuplicateReads({ targets: resolveTargets('global', ['claude', 'opencode']), location: 'global' }), [])

// Codex's global scope is the shared folder, not ~/.codex/skills, which Codex calls deprecated.
// Kimi Code lands there too, so the grouping has to hold at global scope as well.
const globalTargets = resolveTargets('global', ['claude', 'codex', 'kimi'])
check('F global targets', globalTargets.map((t) => `${t.agents.map((a) => a.id).join('+')}@${t.path}`), [
  `claude@${path.join(os.homedir(), '.claude', 'skills')}`,
  `codex+kimi@${path.join(os.homedir(), '.agents', 'skills')}`,
])

// Copies are identical and the pointer block dedupes.
// A shared entry file must point to an installed copy, even with several agents.
const sharedTargets = resolveTargets('project', ['codex', 'opencode'])
installSkills({ skills, targets: sharedTargets, overwrite: false })
updatePointers({ targets: sharedTargets, skills })
const sharedPointer = fs.readFileSync('AGENTS.md', 'utf8')
for (const skill of skills) {
  const installedPath = `.codex/skills/${skill}/SKILL.md`
  assert.ok(sharedPointer.includes(`\`${installedPath}\``))
  assert.equal(fs.readFileSync(installedPath, 'utf8'), fs.readFileSync(path.join(skillSourceDir(), skill, 'SKILL.md'), 'utf8'))
}

const src = fs.readFileSync(path.join(skillSourceDir(), 'antislop-ui', 'SKILL.md'), 'utf8')
const dst = fs.readFileSync(path.join(process.cwd(), '.claude', 'skills', 'antislop-ui', 'SKILL.md'), 'utf8')
check('G antislop-ui SKILL.md identical', src === dst, true)

// The conflict prompt reports the release on disk from this file alone.
check('G installed version is stamped', installedVersion(targets[0].path), VERSION)
check('G no install means no version', installedVersion(path.join(process.cwd(), 'nowhere')), null)

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

// A fence-like line with trailing text is code, not a closing fence.
for (const fence of ['```', '~~~']) {
  const example = `${fence}md\n${fence}js\n<!-- antislop:start -->\nKeep this example.\n<!-- antislop:end -->\n${fence}`
  write(`# Mine\n\n${example}\n`)
  updatePointers({ targets, skills })
  check(`J ${fence} with info string keeps the example`, read().includes(example), true)
  check(`J ${fence} real block added outside the example`, (read().match(/antislop:start/g) || []).length, 2)
  const first = read()
  updatePointers({ targets, skills })
  check(`J ${fence} example stays intact on reinstall`, read() === first, true)
}

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

// --update replaces what is already on disk, keeps each folder's skill selection, and
// names the release it replaced. The scope list keeps a test out of the home directory.
const present = resolveTargets('project').filter((t) => fs.existsSync(path.join(t.path, CORE)))
check('K update finds the installed folders', present.length > 0, true)
const upd = updateAll({ locations: ['project'] })
check('K update reports every folder it found', upd.results.length, present.length)
check('K update lands on this release', upd.results.every((r) => r.to === VERSION), true)
check('K update keeps the skill selection', upd.results.every((r) => r.skills.includes(CORE)), true)
check('K update writes a pointer', upd.pointers.length > 0, true)
check('K pointer carries the update line', fs.readFileSync(path.join(process.cwd(), 'AGENTS.md'), 'utf8').includes('antislop-ai --update'), true)
const again = updateAll({ locations: ['project'] })
check('K update is repeatable', again.results.map((r) => r.from), upd.results.map((r) => r.to))

// A clean directory has nothing to replace, and saying so is the whole answer.
const clean = fs.mkdtempSync(path.join(os.tmpdir(), 'antislop-clean-'))
const here = process.cwd()
process.chdir(clean)
check('K update says nothing when nothing is installed', updateAll({ locations: ['project'] }).results.length, 0)
check('K update writes no pointer when nothing is installed', updateAll({ locations: ['project'] }).pointers.length, 0)
process.chdir(here)
fs.rmSync(clean, { recursive: true, force: true })

// --update can combine folders with different extras. Every pointer must resolve,
// and a separate entry file must not list another agent's unavailable extras.
const mixed = fs.mkdtempSync(path.join(os.tmpdir(), 'antislop-mixed-'))
try {
  process.chdir(mixed)
  installSkills({ skills: [CORE], targets: resolveTargets('project', ['codex']), overwrite: false })
  installSkills({ skills: [CORE, 'antislop-ui'], targets: resolveTargets('project', ['opencode']), overwrite: false })
  installSkills({ skills: [CORE, 'antislop-copywriting'], targets: resolveTargets('project', ['claude']), overwrite: false })
  updateAll({ locations: ['project'] })
  const shared = fs.readFileSync('AGENTS.md', 'utf8')
  const separate = fs.readFileSync('CLAUDE.md', 'utf8')
  assert.ok(shared.includes('`.codex/skills/antislop/SKILL.md`'))
  assert.ok(shared.includes('`.opencode/skills/antislop-ui/SKILL.md`'))
  assert.equal(shared.includes('antislop-copywriting'), false)
  assert.ok(separate.includes('`.claude/skills/antislop-copywriting/SKILL.md`'))
  assert.equal(separate.includes('antislop-ui'), false)
  for (const pointer of [shared, separate]) {
    for (const match of pointer.matchAll(/`([^`]+\/SKILL\.md)`/g)) assert.ok(fs.existsSync(match[1]))
  }
  console.log('ok   K mixed selections retain valid per-skill paths and separate entry files')
} finally {
  process.chdir(here)
  fs.rmSync(mixed, { recursive: true, force: true })
}

// A door row without a command would print a blank line where the answer belongs.
check('K every plugin door names itself and its command', PLUGIN_DOORS.filter((d) => !d.id || !d.label || !d.update).map((d) => d.id), [])

if (failures.length > 0) {
  console.error(`\n${failures.length} check(s) failed: ${failures.join(', ')}`)
  process.exit(1)
}
console.log('\nall checks passed')
