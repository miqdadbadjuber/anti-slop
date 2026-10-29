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

// The wizard installs the single-file route. Every route that ships this SKILL.md has already
// placed the folders, so the wizard would only cost context there; the update steps stay.
const WIZARD = /^## First-Run Install Wizard\n[\s\S]*?^### (Already installed, and the user asks how to update)$/m
if (!WIZARD.test(coreBody)) throw new Error('antislop.md: install wizard headings not found')
const skillBody = coreBody.replace(WIZARD, '## $1')
fs.writeFileSync(path.join(repoSkills, 'antislop', 'SKILL.md'), CORE_FRONTMATTER + skillBody + '\n')

// An installed copy is a snapshot with nothing in it that names the release it came from,
// so an update could not say what was on disk. Every install route copies this folder.
fs.writeFileSync(path.join(repoSkills, 'antislop', 'VERSION'), version + '\n')

// Python leaves a __pycache__ beside the contrast checker; it must not reach the tarball.
fs.rmSync(cliSkills, { recursive: true, force: true })
fs.cpSync(repoSkills, cliSkills, {
  recursive: true,
  filter: (src) => path.basename(src) !== '__pycache__',
})

// npm only ships a README and LICENSE found in cli/, so the package page and Socket saw none.
// Relative links point at files that are not in the tarball, so aim them at the repo.
const REPO = 'https://github.com/miqdadbadjuber/anti-slop'
const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8')
  .replace(/src="(?:\.\/)?(?!https?:|#)([^"]+)"/g, `src="${REPO}/raw/main/$1"`)
  .replace(/href="(?:\.\/)?(?!https?:|#|mailto:)([^"]+)"/g, `href="${REPO}/blob/main/$1"`)
  .replace(/\]\((?:\.\/)?(?!https?:|#|mailto:)([^)]+)\)/g, `](${REPO}/blob/main/$1)`)
fs.writeFileSync(path.join(__dirname, '..', 'README.md'), readme)
fs.copyFileSync(path.join(repoRoot, 'LICENSE'), path.join(__dirname, '..', 'LICENSE'))

// A Windows checkout hands back CRLF, and a shipped skill would then carry "name: x\r"
// into any registry that splits on \n alone. Ship LF whatever the checkout did.
const TEXT = new Set(['.md', '.py', '.json', '.txt', '.mjs'])
let normalised = 0
const normalise = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, e.name)
    if (e.isDirectory()) {
      normalise(file)
      continue
    }
    if (!TEXT.has(path.extname(e.name))) continue
    const buf = fs.readFileSync(file)
    if (!buf.includes(0x0d)) continue
    fs.writeFileSync(file, buf.toString('utf8').replace(/\r\n/g, '\n'), 'utf8')
    normalised++
  }
}
normalise(cliSkills)

console.log(
  `Regenerated skills/antislop/SKILL.md and VERSION (${version}) and synced to cli/skills/` +
    (normalised ? ` (${normalised} file(s) normalised to LF)` : '')
)
