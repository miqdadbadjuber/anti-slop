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

const version = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')).version

const coreBody = fs.readFileSync(path.join(repoRoot, 'antislop.md'), 'utf8')
  .replace(/\r\n/g, '\n')
  .trim()

// Snyk W012: a shipped skill must not tell the agent to download its own instructions.
if (/https?:\/\/raw\.githubusercontent\.com/.test(coreBody)) {
  throw new Error('antislop.md carries a runtime download URL; remove it before syncing (Snyk W012)')
}

fs.writeFileSync(path.join(repoSkills, 'antislop', 'SKILL.md'), CORE_FRONTMATTER + coreBody + '\n')

// An installed copy is a snapshot with nothing in it that names the release it came from,
// so an update could not say what was on disk. Every install route copies this folder.
fs.writeFileSync(path.join(repoSkills, 'antislop', 'VERSION'), version + '\n')

// Python leaves a __pycache__ beside the contrast checker; it must not reach the tarball.
fs.rmSync(cliSkills, { recursive: true, force: true })
fs.cpSync(repoSkills, cliSkills, {
  recursive: true,
  filter: (src) => path.basename(src) !== '__pycache__',
})
console.log(`Regenerated skills/antislop/SKILL.md and VERSION (${version}) and synced to cli/skills/`)
