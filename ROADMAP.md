# antislop: Roadmap

> How antislop grows from a single rules file into an installable, cross-agent skill set. New to antislop? Read the [guide](GUIDE.md) first. [README.md](README.md) covers the product.

## Table of Contents

- [Where we are](#where-we-are)
- [Release history](#release-history)
- [What's next](#whats-next)
- [Not in scope](#not-in-scope)

## Where we are

The latest release is **v3.2.20**. antislop is a packaged system: a lean, always-loaded core plus five additive skills, each a standard agent skill folder at `skills/<name>/SKILL.md`.

- **The core.** 38 rules in three tiers (Hard Gate, Purpose-Gate, Quality Locks), a Liveliness Toolkit, a mandatory Delivery Gate, and two usage modes (During / After). The single-file `antislop.md` is the same filter, pasteable into any chat window.
- **Usage-mode preferences.** Saving a global mode is opt-in. Without a settings file, every session still asks during or after. Saved modes announce their source, explicit session choices take precedence, and `--mode ask` restores the question.
- **The skills.** `antislop` (the core), plus `antislop-ui`, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, and `antislop-code`. Each loads only when a task needs it.
- **Distribution.** Eleven install paths from one repository: the interactive installer (`npx antislop-ai`), the skills.sh directory, native plugin doors for Claude Code, Antigravity, Codex, Cursor, Kimi Code, Cline, and Oh My Pi, the Pi package read from the root `package.json`, and the single file you paste into any chat. The README lists the commands; the guide walks each route from zero.
- **Agent support.** Twelve agents, each read from its own documented skills folder, so no door depends on another vendor's convention holding.

## Release history

Up to v3.0.0 each +0.1 shipped exactly one new skill, which kept the filter pull-only-what-you-need. Since v3.0.0 a release packages and ships antislop instead, so the cadence follows the packaging and the plugin doors. Each version is tagged with notes on [GitHub](https://github.com/miqdadbadjuber/anti-slop/releases).

| Version | What shipped |
|---------|--------------|
| v2.1.0 | Usage modes (During / After), so the rules can guide new work or audit work that already exists. |
| v2.1.1 | English only. The Indonesian mirrors were removed. |
| v2.2.0 | `antislop-ui`, the first additive skill: layout, color, components, decoration, motion, structure. |
| v2.3.0 | `antislop-copywriting`: headlines, CTAs, tone, fake stats, anti-AI writing. |
| v2.4.0 | `antislop-human`: contrast, keyboard, focus, states. Home of the contrast checker. |
| v2.4.1 | `guide.md`, now GUIDE.md: a plain-English walkthrough for people new to antislop. Not a skill. |
| v2.4.2 | Skill checklist polarity fix and a docs cleanup, merged from two community PRs. |
| v2.5.0 | `antislop-layoutmobile`: reflow across screen widths, breakpoints, grids, overflow, tap targets. |
| v3.0.0 | The packaging release: `skills/` folders, two distribution doors, the installer CLI (`npx antislop-ai`), the contrast checker as an MCP tool, and the MIT license. |
| v3.0.1 | Snyk W012 fix (no runtime curl in the packaged core), npm package author set to antislop, docs clarity. |
| v3.0.2 | Adaptive python launcher, so the contrast checker runs on macOS, Linux, and Windows. App and Dashboard patterns, plus a copy voice pattern. |
| v3.1.0 | `antislop-code`, which covers AI-slop comments. Per-skill READMEs ship for the first time. |
| v3.1.1 | The installer stops copying per-skill READMEs into projects, and the wizard drops install commands, which clears the Socket warning on skills.sh. |
| v3.1.2 | Per-skill READMEs are removed. The installer asks which agent to install into, so a fresh Antigravity or Codex project lands in the right folder. |
| v3.1.3 | The `DESIGN.md` boundary is stated: an external file is data to apply, not instructions to obey. SECURITY.md is added. |
| v3.2.0 | The installer grows to seven agents (OpenCode, Cursor, Gemini CLI, and Hermes global-only), on the bet that a shared `.agents/skills/` folder can carry the long tail. |
| v3.2.1 | UI slop gaps closed: bento grids, Lucide-style icon sets, colored left stripes, fake terminal windows, and demos without a product. |
| v3.2.2 | Antigravity plugin door. The repository root is the plugin: a root `plugin.json` plus a `rules/antislop.md` pointer that loads antislop every session. |
| v3.2.3 | Codex plugin door: a `.codex-plugin/plugin.json` manifest pointing at the shared `skills/` folder, plus a `.agents/plugins/marketplace.json` index. |
| v3.2.4 | R-35 becomes a click-through smoke test: every interactive element is exercised one at a time and recorded as evidence in the Delivery Gate report. |
| v3.2.5 | Cursor plugin door, with a `.mdc` rule pointer. The Codex plugin gains its app identity: a plugin icon, a brand color, and a banner screenshot. |
| v3.2.6 | Community round of five PRs: a runtime python launcher for the contrast tool, pointer writes that leave the user's entry file untouched, a smoke test that can fail, repo guardrails with a CI workflow, and a contributors section. |
| v3.2.7 | Three slop patterns earn names, Two-State Layout, Over-Explained Comment, and Decorative Status Dot. R-37 gains the `DESIGN.md` conflict protocol, and OpenCode is verified as an installer target. |
| v3.2.8 | Repair round from a full re-validation of every shipped door. Antigravity's global install moves to `~/.gemini/config/skills/`, the entry-file writer stops losing content, and the installer refuses to run without a terminal. |
| v3.2.9 | Hermes gets its project scope, so a project's skills outrank the global ones. The install documentation is rewritten around what the reader is doing rather than which tool they picked. |
| v3.2.10 | GitHub Copilot joins as an installer target, which costs one row because it reads a folder five agents already share. The installer groups agents by resolved path, so eight agents resolving to seven folders no longer copy the same skills twice. |
| v3.2.11 | Community repair round. Codex gains its global folder, the shared-folder claim is corrected to three agents, and the README gains a star history chart. |
| v3.2.12 | Kimi Code door, read out of the vendor's documentation rather than assumed: the shared `.agents/skills/` folder at both scopes, plus a `.kimi-plugin/plugin.json` manifest. |
| v3.2.13 | The installed release is named on disk, so an update compares two versions instead of guessing. A fence scanner bug that replaced a documented example on reinstall is fixed. |
| v3.2.14 | Cline installer target and plugin door. The vendor's documentation broke the shared-folder premise, so Cline takes a folder of its own, and its plugin reads a `cline` key from the root `package.json`. |
| v3.2.15 | Amp installer target, the fourth agent to read the shared `.agents/skills/` folder. Amp gets no plugin door, deliberately: the cost does not match the benefit. |
| v3.2.16 | `--update` replaces every antislop folder at project and global scope, keeps each folder's skill selection, and names the release it replaced. The installer also probes four plugin stores and prints the right update command for each door it finds. |
| v3.2.17 | Pi installer target and package door, verified on a real install rather than on documentation. The package is read from a `pi` key in the root `package.json`. |
| v3.2.18 | Oh My Pi plugin door, also verified on a real install. The catalog is documented and the manifest was not, so `.omp-plugin/` ships only the catalog. |
| v3.2.19 | The community files (CONTRIBUTING.md, CODE_OF_CONDUCT.md, the issue templates, and a pull request template), a README and a guide read end to end for the first time since v3.0.0, and a skill catalogue generated into the guide. |

## What's next

Two rules keep the queue honest:

> **One new agent per version.** A version opens at most one new agent's door, so a door that breaks is only ever one agent's problem. Repairs ride along: a break in a door already shipped is fixed when it is found, never queued behind a slot.

> **A maintenance round ships no new agent.** It pays down what an earlier door left behind, chosen at the time from re-validating each door against its vendor's current documentation and from what the community reports. The slot is fixed; its contents are not.

Every door is verified against the vendor's current documentation before its version ships, and the installer and the guide are updated in the same release.

| Version | Item | What it means |
|---------|------|---------------|
| v3.2.20 | Maintenance | A macOS probe, because none of the door probes above ran on it, so a report from that platform can be split into what the installer got wrong and what the agent's own configuration explains. No new agent: a `windows-latest` CI job, because CI runs on Linux alone while this repository is developed on Windows, plus a re-check of the plugin-door probes against real installs and probes for the three doors the installer still cannot see (Kimi Code, Cline, and Oh My Pi), so the notice that follows an install names all seven rather than four. |

Beyond the numbered plan, with no promised version:

- **OpenAI public directory listing** (deferred). A versioned skill bundle, a submission document, and public privacy and terms pages. Parked until identity verification on the OpenAI Platform can proceed.
- **Gemini CLI** (deferred). Consumer access ended on 18 June 2026 and Antigravity CLI replaced it, which already has a door. Enterprise Code Assist licenses and paid API keys still work, so `.gemini/skills/` stays. Parked with antislop-compact.
- **Kiro** (candidate). Reads `.kiro/skills/` per project and `~/.kiro/skills/` globally, activating skills by description. Outside the shared `.agents` standard, so it would be an installer row and an `AGENTS.md` pointer rather than a marketplace door.
- **Roo** (candidate). Sources disagree on its skill folder: some say `.roo/skills/`, others `.roo/rules/`. The path has to be settled against Roo's own documentation before this can be a version.
- **More plugin doors** as other agents grow plugin systems antislop can ride from the same repository.
- **antislop-compact** (deferred). A standalone cheat-sheet version of each skill would have to track every change to the full ones, and it is only sound if it keeps the one-line why per rule and the Delivery Gate.
- **Skill candidates** still open: `antislop-docs` and `antislop-identity`.

## Not in scope

antislop stays a **filter, not a style guide**:

- No prescribed aesthetics, per-framework recipes, or trend bans.
- It never beautifies on its own; direction and beauty are yours, in `DESIGN.md`.
- It is not limited to building pages: the same filter writes and audits copy.
- UX and motion stay folded into `antislop-ui` rather than becoming separate skills, and data-integrity rules already live in the core.
