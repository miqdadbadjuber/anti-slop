import { readFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const SKILLS_DIR = fileURLToPath(new URL('../skills/', import.meta.url))
const PROVIDER = 'antislop'
// Bundled rank, so a folder install of the same skill still wins.
const RANK = 600
const INVOCATION = { modelInvocable: true, userInvocable: true }
const unquote = (value) => value.trim().replace(/^["']|["']$/g, '')

async function list() {
  const entries = await readdir(SKILLS_DIR, { withFileTypes: true })
  const skills = []
  for (const entry of entries.filter((e) => e.isDirectory())) {
    const file = path.join(SKILLS_DIR, entry.name, 'SKILL.md')
    let text
    try {
      text = await readFile(file, 'utf8')
    } catch {
      continue
    }
    const head = text.split('---')[1] ?? ''
    const name = head.match(/^name:[ \t]*(\S.*)$/m)?.[1]
    const description = head.match(/^description:[ \t]*(\S.*)$/m)?.[1]
    if (!name || !description) continue
    skills.push({
      name: unquote(name),
      description: unquote(description),
      invocation: INVOCATION,
      provider: PROVIDER,
      source: 'bundled',
      resourceBase: { kind: 'directory', path: path.join(SKILLS_DIR, entry.name) },
      rank: RANK,
      locator: file,
    })
  }
  return skills
}

const provider = {
  name: PROVIDER,
  list,
  async get(candidate) {
    return {
      name: candidate.name,
      description: candidate.description,
      invocation: candidate.invocation,
      provider: candidate.provider,
      source: candidate.source,
      resourceBase: candidate.resourceBase,
      content: await readFile(candidate.locator, 'utf8'),
    }
  },
}

export const name = 'antislop'
export const inject = ['skills']

export function apply(ctx) {
  ctx.skills.registerProvider(() => provider)
}
