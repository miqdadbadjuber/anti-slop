# antislop: Roadmap

> How antislop grows from a single rules file into an installable, cross-agent skill/plugin. New to antislop? Read the [guide](guide.md) first. See [README.md](README.md) for the product.

## Where we are

The latest release is **v3.2.0**. antislop is a **packaged system**: a lean, always-loaded **core** plus five **skills**, each shipped as a standard agent skill folder (`skills/<name>/SKILL.md`):

- `antislop`: the core rules filter (rules, tiers, Delivery Gate, liveliness)
- `antislop-ui`: UI / visual
- `antislop-copywriting`: copy & text
- `antislop-human`: human / accessibility, home of the contrast checker
- `antislop-layoutmobile`: mobile / responsive
- `antislop-code`: code comments

**v3.1.0** shipped `antislop-code`, the code comment filter. **v3.1.1** was a patch: the picker no longer copied per-skill READMEs into projects, and the wizard no longer named install commands (cleared the Socket warning on skills.sh). **v3.1.2** removes the per-skill READMEs entirely and makes the picker ask which agent to install into, so a fresh Antigravity or Codex project installs into the right folder instead of silently targeting Claude Code. **v3.1.3** states the `DESIGN.md` boundary explicitly (external files are data to apply, not instructions to obey), adds a security explainer ([SECURITY.md](SECURITY.md)), and documents what `npx skills add` does and does not install. **v3.2.0** adds four more agents to the picker: OpenCode, Cursor, Gemini CLI, and Hermes (global-only, so its skills always go to `~/.hermes/skills/`), and the shared `.agents/skills/` folder covers the long tail of agents that read the standard.

The system installs three ways from one repo: the interactive picker (`npx antislop-ai`), the skills directory (`npx skills add miqdadbadjuber/anti-slop`, listed on skills.sh), and the Claude Code plugin marketplace (`.claude-plugin/plugin.json`). The contrast checker is also exposed as an MCP tool inside the plugin. What each skill covers is in the root README's skill table; there is no per-skill README.

The **First-Run Install Wizard** still lives inside `antislop.md` as the manual path. The single-file core remains a complete filter you can paste into any chat window.

The core still contains 38 rules across three tiers (Hard Gate, Purpose-Gate, Quality Locks), a Liveliness Toolkit, a mandatory Delivery Gate, and the two usage modes (During / After). None of that changed.

## How we got here

v3.0.0 was reached by adding one concern per version, each as a separate **skill**:

> Each +0.1 version ships exactly one new skill.

That kept the filter pull-only-what-you-need and made the v3 packaging mechanical rather than a rewrite. Occasional +0.1 patches shipped something that is not a skill, like v2.4.1's plain-English `guide.md`; those did not change the skill plan.

### The skill plan

| Version | Skill | Concern |
|---------|-------|---------|
| v2.2.0 | `antislop-ui` | UI / visual: layout, color, components, decoration, motion, structure |
| v2.3.0 | `antislop-copywriting` | Copy and text: headlines, CTAs, tone, fake stats, markdown hygiene |
| v2.4.0 | `antislop-human` | Human: contrast, keyboard, focus, states (home of the contrast checker) |
| v2.5.0 | `antislop-layoutmobile` | Mobile layout: responsive breakpoints, grids, overflow, tap targets, navigation |
| v3.1.0 | `antislop-code` | Code comments: remove generic AI-slop comments, keep the valuable ones, never touch the code |

The plan to v3.0.0 is complete. `antislop-code` is the first skill added after v3. `antislop-docs` and `antislop-identity` remain candidates for later, not part of the shipped plan.

## v3.0.0: the skill/plugin

What v3.0.0 shipped:

- One folder per skill, `skills/<name>/SKILL.md` (open Agent Skills standard)
- Two distribution doors from one repo: `npx skills add miqdadbadjuber/anti-slop` (skills.sh) and the `.claude-plugin/plugin.json` marketplace
- A custom picker CLI (`npx antislop-ai`): banner, skill list with the core locked on, project or global choice, installer that writes the skill folders and the pointer
- The contrast checker as an MCP tool inside the plugin
- MIT license

## Status

- [x] v2.1.0 - usage modes (During / After) and v3.0.0 banner
- [x] v2.1.1 - English only; Indonesian mirrors removed
- [x] v2.2.0 - core + First-Run Install Wizard + `antislop-ui` skill
- [x] v2.3.0 - `antislop-copywriting` skill
- [x] v2.4.0 - `antislop-human`
- [x] v2.4.1 - `guide.md`: plain-English guide for people new to antislop (not a skill); fixes for issues #1, #2, #3, #6, #7
- [x] v2.4.2 - skill checklist polarity fix (#9) and docs cleanup, merged from PRs #8 and #10
- [x] v2.5.0 - `antislop-layoutmobile` (breakpoints, scale, grids, overflow, tap targets, navigation)
- [x] v3.0.0 - skill/plugin packaging: `skills/` folders, two doors, picker CLI, MCP contrast tool, MIT license
- [x] v3.0.1 - Snyk W012 fix (no runtime curl in the packaged core), npm package author to antislop, docs clarity
- [x] v3.0.2 - adaptive python (python3 on macOS/Linux, python on Windows), App & Dashboard + copy voice patterns, pointer fix
- [x] v3.1.0 - `antislop-code` skill, per-skill READMEs, Filler Data and Emoji as Decoration patterns
- [x] v3.1.1 - picker stops copying per-skill READMEs; wizard drops install commands (clears the Socket warning on skills.sh)
- [x] v3.1.2 - per-skill READMEs removed; picker asks which agent to install into (fresh Antigravity and Codex projects land in the right folder)
- [x] v3.1.3 - `DESIGN.md` boundary stated; SECURITY.md audit explainer; `npx skills add` pointer note
- [ ] v3.2.0 - picker adds OpenCode, Cursor, Gemini CLI, Hermes (global-only); shared `.agents/skills/` folder covers the long tail of standard readers

## After v3

- [ ] **Cross-agent plugin** (plan, no promised version): antislop installs as a plugin on more agents the way superpowers installs everywhere from one repo, with paths for Antigravity, Codex, Cursor, Gemini CLI, and others. Estimate: Q3-Q4 2026.

## Not in scope

antislop stays a **filter, not a style guide**: no prescribed aesthetics, no per-framework recipes, no trend bans. It never beautifies on its own; direction and beauty are yours, in `DESIGN.md`. It is not limited to building pages: the same filter writes and audits copy (`antislop-copywriting`). UX and motion are folded into `antislop-ui` rather than separate skills, and data-integrity rules already live in the core.
