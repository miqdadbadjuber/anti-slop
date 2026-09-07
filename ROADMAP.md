# antislop: Roadmap

> How antislop grows from a single rules file into an installable, cross-agent skill/plugin. New to antislop? Read the [guide](GUIDE.md) first. See [README.md](README.md) for the product.

## Where we are

The latest release is **v3.2.6**. antislop is a **packaged system**: a lean, always-loaded core plus five additive skills, each shipped as a standard agent skill folder (`skills/<name>/SKILL.md`). There are no per-skill READMEs.

- **Core, unchanged since v2.2:** 38 rules across three tiers (Hard Gate, Purpose-Gate, Quality Locks), a Liveliness Toolkit, a mandatory Delivery Gate, and two usage modes (During / After). The single-file `antislop.md` is still a complete filter you can paste into any chat window; its First-Run Install Wizard is the manual install path.
- **The six skills:** `antislop` (the core), plus `antislop-ui`, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, and `antislop-code`. Each skill only loads when the task needs it.
- **Distribution:** six install paths from one repo, and the contrast checker is also exposed as an MCP tool inside the plugin. The paths are the interactive picker (`npx antislop-ai`), the skills.sh directory, and native plugin doors for Claude Code, Antigravity, Codex, and Cursor. Install commands live in the README.
- **The doors:** each native plugin loads antislop straight from this repository, so there are no copies to keep in sync.

## Release history

Versioning up to v3.0.0 followed one rule, so each new concern arrived on its own:

> Each +0.1 version ships exactly one new skill.

That kept the filter pull-only-what-you-need and made the v3 packaging mechanical rather than a rewrite. Occasional +0.1 patches shipped something that is not a skill, like v2.4.1's plain-English `guide.md`; those did not change the skill plan. Since v3.0.0 releases package and ship antislop rather than add skills, so the cadence follows the packaging and the plugin doors.

| Version | What shipped |
|---------|--------------|
| v2.1.0 | Usage modes (During / After) and the v3.0.0 banner. |
| v2.1.1 | English only; the Indonesian mirrors were removed. |
| v2.2.0 | First additive skill: `antislop-ui` (UI / visual). The core plus the First-Run Install Wizard. |
| v2.3.0 | `antislop-copywriting` (copy and text). |
| v2.4.0 | `antislop-human` (people), home of the contrast checker. |
| v2.4.1 | `guide.md`: a plain-English guide for people new to antislop (not a skill). Fixes for issues #1, #2, #3, #6, #7. |
| v2.4.2 | Skill checklist polarity fix (#9) and docs cleanup, merged from PRs #8 and #10. |
| v2.5.0 | `antislop-layoutmobile` (mobile / responsive). |
| v3.0.0 | Skill/plugin packaging: `skills/` folders, two distribution doors, the picker CLI (`npx antislop-ai`), the contrast checker as an MCP tool, MIT license. |
| v3.0.1 | Snyk W012 fix (no runtime curl in the packaged core), npm package author to antislop, docs clarity. |
| v3.0.2 | Adaptive python (python3 on macOS/Linux, python on Windows); App and Dashboard plus copy voice patterns; pointer fix. |
| v3.1.0 | `antislop-code` (code comments); per-skill READMEs; Filler Data and Emoji as Decoration patterns. |
| v3.1.1 | The picker stops copying per-skill READMEs into projects; the wizard drops install commands (clears the Socket warning on skills.sh). |
| v3.1.2 | Per-skill READMEs removed; the picker asks which agent to install into, so a fresh Antigravity or Codex project lands in the right folder. |
| v3.1.3 | `DESIGN.md` boundary stated (external files are data to apply, not instructions to obey); SECURITY.md audit explainer; what `npx skills add` does and does not install. |
| v3.2.0 | The picker grows to seven agents (adds OpenCode, Cursor, Gemini CLI, Hermes global-only); the shared `.agents/skills/` folder covers the long tail. |
| v3.2.1 | UI slop gaps closed: bento grids, Lucide-style icon sets, colored left stripes, fake terminal windows, demos without a product; rules extended for palette families, dot grids, typefaces, and 3-pricing-column layouts. |
| v3.2.2 | Antigravity plugin door: the repo root is the plugin (root `plugin.json` plus a `rules/antislop.md` pointer that loads antislop every session). |
| v3.2.3 | Codex plugin door: `.codex-plugin/plugin.json` manifest plus a `.agents/plugins/marketplace.json` index, both pointing at the shared `skills/` folder. |
| v3.2.4 | R-35 sharpened into a click-through smoke test: every interactive element must be run and exercised one at a time, and its result recorded as evidence in the Delivery Gate report. |
| v3.2.5 | Cursor plugin door: `.cursor-plugin/plugin.json` manifest plus a `.cursor-plugin/marketplace.json` index, with the six skills and a `.mdc` rule pointer. The Codex plugin also gains its app identity (plugin icon, brand color, banner screenshot). |
| v3.2.6 | Five-PR community round (PRs #22 to #26): a runtime Python launcher for the contrast MCP tool (fixes it on macOS), pointer writes that leave the user's entry file untouched, a smoke test that can actually fail, repo guardrails plus a CI workflow, and a contributors section. |

## What's next

The plan is one item per version. The plugin doors follow the style of the Claude Code, Antigravity, Codex, and Cursor doors already shipped. v3.2.7 prepares the OpenAI listing.

| Version | Item | What it means |
|---------|------|---------------|
| v3.2.7 | OpenAI directory | Listing prep for the public plugin directory shared by ChatGPT and Codex: a versioned skill bundle, a submission document, and public privacy and terms pages. The submission itself happens on the OpenAI Platform after identity verification, outside this repo. |
| v3.2.8 | Gemini CLI | Gemini CLI was sunset in June 2026 and superseded by Antigravity CLI, which already has a door (v3.2.2). The door closes the folder anyway: manifest plus pointer. |
| v3.2.9 | OpenCode | OpenCode has no native plugin marketplace, so the door is the skills folder plus an `AGENTS.md` pointer (the picker already writes `.opencode/skills/`). |
| v3.2.10 | The rest | Hermes, GitHub Copilot, and the `.agents/skills` long tail (Cline, Roo, Amp). The existing `.agents/plugins/marketplace.json` already points at the repo root, so any agent that reads the .agents standard can add the same marketplace. Mostly verification plus documentation per agent. |

Beyond the numbered plan, with no promised version:

- **More plugin doors** as other agents grow plugin systems that antislop can ride from the same repo.
- **antislop-compact**, a lightweight, standalone family of the five skills, each a self-contained cheat-sheet version that runs without the core alongside. Deferred: a parallel set of files would have to track every change to the full ones, and a compact skill is only sound if it keeps the one-line why per rule and the Delivery Gate.
- **Skill candidates** still open: `antislop-docs` and `antislop-identity`.

## Not in scope

antislop stays a **filter, not a style guide**:

- No prescribed aesthetics, per-framework recipes, or trend bans.
- It never beautifies on its own; direction and beauty are yours, in `DESIGN.md`.
- It is not limited to building pages: the same filter writes and audits copy (`antislop-copywriting`).
- UX and motion are folded into `antislop-ui` rather than separate skills, and data-integrity rules already live in the core.
