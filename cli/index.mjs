#!/usr/bin/env node
import path from 'node:path'
import pc from 'picocolors'
import { intro, outro, select, multiselect, confirm, isCancel, cancel, log, spinner } from '@clack/prompts'
import { banner } from './lib/banner.mjs'
import {
  CORE,
  AGENTS,
  skillSourceDir,
  resolveTargets,
  detectAgents,
  detectConflicts,
  installSkills,
  updatePointers,
} from './lib/install.mjs'

const EXTRA_SKILLS = [
  { value: 'antislop-ui', label: 'antislop-ui', hint: 'UI and visual design rules' },
  { value: 'antislop-copywriting', label: 'antislop-copywriting', hint: 'copywriting and text rules' },
  { value: 'antislop-human', label: 'antislop-human', hint: 'accessibility, with the contrast checker' },
  { value: 'antislop-layoutmobile', label: 'antislop-layoutmobile', hint: 'mobile layout rules' },
  { value: 'antislop-code', label: 'antislop-code', hint: 'code comment rules' },
]

function stop(message) {
  cancel(message)
  process.exit(0)
}

async function main() {
  if (process.argv.includes('--version') || process.argv.includes('-v')) {
    console.log('antislop 3.1.3')
    return
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
      hint: detected.includes(a.id) ? `found here (${a.dir})` : `will create ${a.dir}`,
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
    const answer = await select({
      message: `${conflicts.length} skill folder(s) already exist. What should I do?`,
      options: [
        { value: 'overwrite', label: 'Overwrite them', hint: 'replace existing files' },
        { value: 'keep', label: 'Keep what is there', hint: 'skip existing folders' },
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

  const agentCount = new Set(written.map((w) => w.agent.id)).size
  if (written.length > 0) {
    outro(`Installed ${written.length} skill(s) into ${agentCount} agent folder(s).`)
  } else {
    outro('Nothing new to install. Existing folders were kept.')
  }
  console.log(pc.dim('antislop is ready. The next agent session loads it.'))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
