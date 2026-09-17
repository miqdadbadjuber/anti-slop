#!/usr/bin/env node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const worker = path.join(__dirname, 'smoke-worker.mjs')

function tree(dir, prefix = '') {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(prefix + entry.name + '/')
      out.push(...tree(p, prefix + '  '))
    } else {
      out.push(prefix + entry.name)
    }
  }
  return out
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'antislop-smoke-'))
const result = spawnSync(process.execPath, [worker], { cwd: tmp, encoding: 'utf8' })
console.log('--- worker output ---')
console.log(result.stdout.trim())
if (result.status !== 0) console.error('worker stderr:', result.stderr)

console.log('\n--- files written to temp project ---')
console.log(tree(tmp).join('\n'))

for (const name of ['CLAUDE.md', 'AGENTS.md', 'GEMINI.md']) {
  const entry = path.join(tmp, name)
  if (!fs.existsSync(entry)) continue
  console.log(`\n--- ${name} ---`)
  console.log(fs.readFileSync(entry, 'utf8'))
}

const coreSkill = path.join(tmp, '.claude', 'skills', 'antislop', 'SKILL.md')
const coreInstalled = fs.existsSync(coreSkill)
console.log('\ncore SKILL.md exists:', coreInstalled)

// Every failure is collected here and decided before cleanup, so a failing run
// still leaves a tidy temp dir behind.
const reasons = []
if (result.status !== 0) reasons.push(`worker exited ${result.status}`)
if (!coreInstalled) reasons.push('core SKILL.md was not installed')

// The wizard needs a terminal. With stdin closed it used to print its prompts, install
// nothing, and still exit 0, so callers saw success. It has to refuse and say why.
// Loading it needs the cli's dependencies, so a bare checkout reports a skip instead.
const cliDeps = fs.existsSync(path.join(__dirname, '..', 'node_modules', '@clack'))
if (cliDeps) {
  const invalidMode = spawnSync(process.execPath, [path.join(__dirname, '..', 'index.mjs'), '--mode', 'invalid'], {
    cwd: tmp,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  if (invalidMode.status !== 1 || !/Usage: antislop-ai --mode/.test(invalidMode.stderr)) {
    reasons.push('mode command did not validate its argument before the terminal guard')
  }
  const noTty = spawnSync(process.execPath, [path.join(__dirname, '..', 'index.mjs')], {
    cwd: tmp,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  const refused = noTty.status === 1 && /needs a terminal/.test(noTty.stderr)
  console.log('no-terminal run: exit', noTty.status, '| refused:', refused)
  if (!refused) reasons.push(`a no-terminal run should exit 1 and say why, got exit ${noTty.status}`)
} else {
  console.log('no-terminal run: skipped, cli dependencies are not installed')
}

fs.rmSync(tmp, { recursive: true, force: true })
console.log('\ncleaned up temp project.')

if (reasons.length > 0) {
  console.error('\nsmoke test failed: ' + reasons.join('; '))
  process.exit(1)
}
console.log('smoke test passed.')
