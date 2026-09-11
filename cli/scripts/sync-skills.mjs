import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.join(__dirname, '..', '..')
const repoSkills = path.join(repoRoot, 'skills')
const cliSkills = path.join(__dirname, '..', 'skills')

const CORE_FRONTMATTER = [
  '---',
  'name: antislop',
  'description: "Anti Slop: Rules for AI Coding Agents. The core filter. Load always to stop generic AI slop."',
  'allowed-tools: Read Write Edit Glob Grep',
  '---',
  '',
].join('\n')

const coreBody = fs.readFileSync(path.join(repoRoot, 'antislop.md'), 'utf8')
  .replace(/\r\n/g, '\n')
  .trim()

// Snyk W012: a shipped skill must not tell the agent to download its own instructions.
if (/https?:\/\/raw\.githubusercontent\.com/.test(coreBody)) {
  throw new Error('antislop.md carries a runtime download URL; remove it before syncing (Snyk W012)')
}

fs.writeFileSync(path.join(repoSkills, 'antislop', 'SKILL.md'), CORE_FRONTMATTER + coreBody + '\n')

// Python leaves a __pycache__ beside the contrast checker; it must not reach the tarball.
fs.rmSync(cliSkills, { recursive: true, force: true })
fs.cpSync(repoSkills, cliSkills, {
  recursive: true,
  filter: (src) => path.basename(src) !== '__pycache__',
})
console.log('Regenerated skills/antislop/SKILL.md from antislop.md and synced to cli/skills/')
