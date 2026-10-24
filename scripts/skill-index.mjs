#!/usr/bin/env node
/**
 * Builds the per-skill catalogue that GUIDE.md carries, from the skills themselves.
 *
 *   node scripts/skill-index.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

export const START = '<!-- antislop:skills:start -->'
export const END = '<!-- antislop:skills:end -->'

// One plain-English line per skill, and the order the guide lists them in. The frontmatter
// description is written for an agent to match on, not for a person to read.
const NOTES = {
  antislop:
    'The core, and it is always loaded. All 40 rules and the Delivery Gate live here, so every task gets them whether or not you pick anything else. The five skills below add depth to it.',
  'antislop-ui':
    'Load it when the AI builds or restyles anything you can see: color, layout, cards, buttons, motion. Sized media and load priority are built in.',
  'antislop-copywriting':
    'Load it when the AI writes or edits text: headlines, buttons, emails, or a page of prose. It removes the excited, empty voice and the made-up numbers.',
  'antislop-human':
    'Load it when real people have to use the result. Readable colors, keyboard use, visible focus, button states, the pointer cursor and other interaction affordances, WCAG 2.2 references, and the contrast checker.',
  'antislop-layoutmobile':
    'Load it when the same page has to work on a phone and on a desktop. Reflow, breakpoints, overflow, tap targets, mobile navigation.',
  'antislop-code':
    'Load it when the AI writes or reviews code comments. It removes the ones an AI adds out of habit and keeps the ones that carry information.',
}

// A pattern entry opens with one of these labels; every other heading under a skill is prose.
const ENTRY = /^\s*-\s*\*\*(?:Tell|The pattern):\*\*/m
// A fenced example can hold a '### ' line of its own, so read with the fences taken out.
const unfenced = (text) => text.replace(/^[ \t]*(?:```|~~~)[\s\S]*?^[ \t]*(?:```|~~~)[ \t]*$/gm, '')

const blocksOf = (body, level) => body.split(new RegExp(`^${level} `, 'm')).slice(1)

const HEAD = '| What it covers | The patterns it names |\n|----------------|-----------------------|'

export function buildIndex() {
  const names = fs
    .readdirSync(path.join(root, 'skills'), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)

  const unlisted = names.filter((n) => !NOTES[n])
  if (unlisted.length) throw new Error(`scripts/skill-index.mjs has no intro for: ${unlisted.join(', ')}`)
  const gone = Object.keys(NOTES).filter((n) => !names.includes(n))
  if (gone.length) throw new Error(`scripts/skill-index.mjs describes a skill that is gone: ${gone.join(', ')}`)

  const out = []
  for (const name of Object.keys(NOTES)) {
    const raw = fs.readFileSync(path.join(root, 'skills', name, 'SKILL.md'), 'utf8').replace(/\r\n/g, '\n')
    const rows = []
    for (const section of blocksOf(unfenced(raw), '##')) {
      const title = section.split('\n')[0].trim()
      const found = blocksOf(section, '###')
        .filter((block) => ENTRY.test(block))
        .map((block) => block.split('\n')[0].trim())
      if (found.length) rows.push(`| ${title} | ${found.join(', ')} |`)
    }
    out.push(`### ${name}`, '', NOTES[name], '')
    if (rows.length) out.push(HEAD, ...rows, '')
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n'
}

// Run directly to write it into the guide; imported by check-repo to prove the guide is current.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const file = path.join(root, 'GUIDE.md')
  const guide = fs.readFileSync(file, 'utf8')
  const from = guide.indexOf(START)
  const to = guide.indexOf(END)
  if (from === -1 || to === -1) throw new Error(`GUIDE.md has no ${START} ... ${END} pair`)
  const eol = guide.includes('\r\n') ? '\r\n' : '\n'
  const block = buildIndex().replace(/\n/g, eol)
  fs.writeFileSync(file, guide.slice(0, from + START.length) + eol + block + guide.slice(to))
  console.log('Regenerated the skill catalogue in GUIDE.md')
}
