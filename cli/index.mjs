#!/usr/bin/env node
import path from 'node:path'
import pc from 'picocolors'
import { intro, outro, select, multiselect, confirm, isCancel, cancel, log, spinner } from '@clack/prompts'
import { banner } from './lib/banner.mjs'
import { configureMode } from './lib/settings.mjs'
import {
  CORE,
  AGENTS,
  skillSourceDir,
  resolveTargets,
  detectAgents,
  detectConflicts,
  detectDuplicateReads,
  detectPluginDoors,
  installSkills,
  installedVersion,
  updateAll,
  updatePointers,
  VERSION,
} from './lib/install.mjs'

const EXTRA_SKILLS = [
  { value: 'antislop-ui', label: 'antislop-ui', hint: 'UI and visual design rules' },
  { value: 'antislop-copywriting', label: 'antislop-copywriting', hint: 'copywriting and text rules' },
  { value: 'antislop-human', label: 'antislop-human', hint: 'accessibility, with the contrast checker' },
  { value: 'antislop-layoutmobile', label: 'antislop-layoutmobile', hint: 'responsive layout rules' },
  { value: 'antislop-code', label: 'antislop-code', hint: 'code comment rules' },
]

function stop(message) {
  cancel(message)
  process.exit(0)
}

// Show the folder the chosen location actually writes. Agents with their own global
// folder (OpenCode, Antigravity) differ from the project one.
function displayDir(agent, location) {
  return location === 'global' ? `~/${agent.globalDir ?? agent.dir}` : agent.dir
}

// A plugin door keeps its own copy, so --update cannot reach it. Name the command for
// the ones found rather than send the reader back to a table in the guide.
function printPluginDoors(found) {
  if (found.length === 0) return
  console.log('\nInstalled as a plugin (these keep their own copy, so updating them is separate):')
  for (const p of found) {
    console.log(`  ${p.door.label}${p.version ? ` ${p.version}` : ''}`)
    console.log(`    ${p.door.update}`)
  }
}

async function main() {
  if (process.argv[2] === '--mode') {
    console.log(configureMode(process.argv.slice(3)))
    return
  }
  if (process.argv.includes('--version') || process.argv.includes('-v')) {
    console.log(`antislop ${VERSION}`)
    return
  }

  // --update is the non-interactive path, so it runs before the terminal guard and prints
  // plain lines: an update is something a script or a user in a hurry can run unattended.
  if (process.argv.includes('--update')) {
    const { results, pointers } = updateAll()
    if (results.length === 0) {
      console.log(`antislop ${VERSION}: no installed folders found. Nothing to update.`)
    } else {
      for (const r of results) {
        const from = r.from ? `antislop ${r.from}` : 'an older release that records no version'
        console.log(`${r.path}`)
        console.log(`  ${from} -> antislop ${VERSION}  (${r.skills.length} skill(s) for ${r.agents.join(', ')})`)
      }
      console.log(`\nUpdated ${results.length} folder(s) to antislop ${VERSION}.`)
      if (pointers.length > 0) {
        console.log(`Pointer refreshed in ${pointers.map((p) => path.basename(p)).join(', ')}.`)
      }
      console.log('Start a new agent session for the new rules to load.')
    }
    printPluginDoors(detectPluginDoors())
    return
  }

  // Without a terminal the prompts read EOF at once: the run printed the banner, installed
  // nothing, and still exited 0, so a script around it saw success. Fail loudly instead.
  if (!process.stdin.isTTY) {
    console.error('antislop: this installer needs a terminal. Run `npx antislop-ai` in an interactive shell.')
    process.exit(1)
  }

  console.log(banner())
  intro('Install antislop into your agent setup')

  if (!skillSourceDir()) {
    stop('Could not find the antislop skills. Reinstall the antislop package.')
  }

  log.step('Choose your skills')
  console.log(`  ${pc.green('●')} ${pc.bold(CORE)}  ${pc.dim('core rules, always on')}`)

  const extra = await multiselect({
    message: 'Extra skills to install',
    options: EXTRA_SKILLS,
    required: false,
  })
  if (isCancel(extra)) stop('Install cancelled.')
  const skills = [CORE, ...(extra ?? [])]

  log.step('Choose where antislop goes')
  const location = await select({
    message: 'Install location',
    options: [
      { value: 'project', label: 'This project', hint: 'only this folder' },
      { value: 'global', label: 'Everywhere', hint: 'all your projects' },
    ],
  })
  if (isCancel(location)) stop('Install cancelled.')

  log.step('Choose which agents get antislop')
  const detected = detectAgents(location)
  const chosen = await multiselect({
    message: 'Which agent(s) should antislop install into?',
    options: AGENTS.map((a) => ({
      value: a.id,
      label: a.label,
      hint: detected.includes(a.id) ? `found here (${displayDir(a, location)})` : `will create ${displayDir(a, location)}`,
    })),
    required: 'Pick at least one agent.',
    initialValues: detected,
  })
  if (isCancel(chosen)) stop('Install cancelled.')

  const targets = resolveTargets(location, chosen)
  await log.message(
    'Installing into:\n' + targets.map((t) => '  ' + t.path).join('\n'),
    { symbol: pc.cyan('│') }
  )

  const conflicts = detectConflicts({ skills, targets })
  let overwrite = false
  if (conflicts.length > 0) {
    // Overwriting is how an update happens, and the version on disk is the one fact
    // the user cannot look up anywhere. Name both sides so the choice is obvious.
    const found = [...new Set(targets.map((t) => installedVersion(t.path)).filter(Boolean))]
    const have = found.length > 0 ? `antislop ${found.join(' and ')}` : 'an antislop old enough that it records no version'
    log.warn(`Already here: ${have}. This installer carries ${VERSION}.`)

    const answer = await select({
      message: `${conflicts.length} skill folder(s) already exist. What should I do?`,
      options: [
        { value: 'overwrite', label: 'Overwrite them', hint: `update to ${VERSION}` },
        { value: 'keep', label: 'Keep what is there', hint: 'stay on what is installed' },
      ],
    })
    if (isCancel(answer)) stop('Install cancelled.')
    overwrite = answer === 'overwrite'
  }

  const proceed = await confirm({
    message: `Install ${skills.length} skill(s) now?`,
    initialValue: true,
  })
  if (isCancel(proceed) || proceed === false) stop('Install cancelled.')

  const spin = spinner()
  spin.start('Installing skills...')
  const written = installSkills({ skills, targets, overwrite })
  const pointers = location === 'project' ? updatePointers({ targets, skills }) : []
  spin.stop('Done.')

  if (pointers.length > 0) {
    log.step('Pointer written to ' + pointers.map((p) => path.basename(p)).join(', '))
  }

  const folderCount = new Set(written.map((w) => path.dirname(w.path))).size
  if (written.length > 0) {
    outro(`Installed ${written.length} skill(s) into ${folderCount} agent folder(s).`)
    console.log(pc.dim('antislop is ready. The next agent session loads it.'))
  } else {
    // "Existing folders were kept" used to read as success. The copies are the
    // old release, so say that plainly and name the choice that fixes it.
    outro('Nothing new to install. Existing folders were kept.')
    console.log(pc.dim('They may be older than this release. To update, run it again and pick "Overwrite them".'))
  }

  // Hermes gates project skills behind a one-time, per-repo trust step, so name it here
  // rather than let the user meet it as a banner after the install looked finished.
  if (location === 'project' && targets.some((t) => t.agents.some((a) => a.id === 'hermes'))) {
    log.warn('Hermes needs one more step: run `hermes skills trust` in this project.')
  }

  // Pi gates its project folders too, but has no command for it: it asks on the first
  // run and `/trust` saves the answer, so a command here would be the wrong instruction.
  if (location === 'project' && targets.some((t) => t.agents.some((a) => a.id === 'pi'))) {
    log.warn('Pi will ask you to trust this project before it loads the skills. `/trust` saves that answer.')
  }

  // Two folders holding the same skill names is how a skill goes missing in OpenCode,
  // which reads both and does not document which copy it keeps.
  for (const dup of detectDuplicateReads({ targets, location })) {
    log.warn(
      `${dup.agent.label} reads both ${dup.paths.join(' and ')}, and antislop is now in both. ` +
        'It may load either copy. Remove one of them to be safe.'
    )
  }

  // Installing through the installer does not update a plugin door the user also has,
  // and nothing else would tell them that copy exists.
  printPluginDoors(detectPluginDoors())
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
