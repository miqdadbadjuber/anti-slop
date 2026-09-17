# antislop: Roadmap

> How antislop grows from a single rules file into an installable, cross-agent skill/plugin. New to antislop? Read the [guide](GUIDE.md) first. See [README.md](README.md) for the product.

## Where we are

The latest release is **v3.2.9**. antislop is a **packaged system**: a lean, always-loaded core plus five additive skills, each shipped as a standard agent skill folder (`skills/<name>/SKILL.md`). There are no per-skill READMEs.

- **The core: 38 rules** across three tiers (Hard Gate, Purpose-Gate, Quality Locks), a Liveliness Toolkit, a mandatory Delivery Gate, and two usage modes (During / After). The count has held since v2.2 and the tiers have not moved, but individual rules have been sharpened many times since, and the release history below says where. The single-file `antislop.md` is still a complete filter you can paste into any chat window; its First-Run Install Wizard is the manual install path.
- **The six skills:** `antislop` (the core), plus `antislop-ui`, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, and `antislop-code`. Each skill only loads when the task needs it.
- **Distribution:** seven install paths from one repo, and the contrast checker is also exposed as an MCP tool inside the plugin. The paths are the interactive installer (`npx antislop-ai`), the skills.sh directory, and native plugin doors for Claude Code, Antigravity, Codex, Cursor, and Pi. Install commands live in the README, and the GUIDE walks through every route from zero.
- **The doors:** each native plugin loads antislop straight from this repository, so there are no copies to keep in sync. Pi has no plugin manifest of its own: the repo is an npm-style package whose `skills/` directory is a conventional Pi package root, declared by a root `package.json`, so `pi install git:...` loads the six skills with nothing copied.
- **The shared folder:** the bet behind the long tail is that `.agents/skills/` is read widely enough that a new agent costs one row instead of a bespoke door. Antigravity reads it by default, and Hermes treats it as a project tier beside its own `.hermes/skills/`, which ranks higher. Neither reads the home-level one. Claude Code is the holdout, reading `.claude/skills/` and nothing else. Global scope is not shared either: OpenCode reads `~/.config/opencode/skills/` and Antigravity `~/.gemini/config/skills/`. The installer writes each agent's own documented path, so no door depends on another vendor's convention holding.

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
| v2.4.1 | `guide.md` (now `GUIDE.md`): a plain-English guide for people new to antislop (not a skill). Fixes for issues #1, #2, #3, #6, #7. |
| v2.4.2 | Skill checklist polarity fix (#9) and docs cleanup, merged from PRs #8 and #10. |
| v2.5.0 | `antislop-layoutmobile` (mobile / responsive). |
| v3.0.0 | Skill/plugin packaging: `skills/` folders, two distribution doors, the installer CLI (`npx antislop-ai`), the contrast checker as an MCP tool, MIT license. |
| v3.0.1 | Snyk W012 fix (no runtime curl in the packaged core), npm package author to antislop, docs clarity. |
| v3.0.2 | Adaptive python (python3 on macOS/Linux, python on Windows); App and Dashboard plus copy voice patterns; pointer fix. |
| v3.1.0 | `antislop-code` (code comments); per-skill READMEs; Filler Data and Emoji as Decoration patterns. |
| v3.1.1 | The installer stops copying per-skill READMEs into projects; the wizard drops install commands (clears the Socket warning on skills.sh). |
| v3.1.2 | Per-skill READMEs removed; the installer asks which agent to install into, so a fresh Antigravity or Codex project lands in the right folder. |
| v3.1.3 | `DESIGN.md` boundary stated (external files are data to apply, not instructions to obey); SECURITY.md audit explainer; what `npx skills add` does and does not install. |
| v3.2.0 | The installer grows to seven agents (adds OpenCode, Cursor, Gemini CLI, Hermes global-only), on the bet that the shared `.agents/skills/` folder can carry the long tail. v3.2.13 onward tests that bet per agent instead of assuming it. |
| v3.2.1 | UI slop gaps closed: bento grids, Lucide-style icon sets, colored left stripes, fake terminal windows, demos without a product; rules extended for palette families, dot grids, typefaces, and 3-pricing-column layouts. |
| v3.2.2 | Antigravity plugin door: the repo root is the plugin (root `plugin.json` plus a `rules/antislop.md` pointer that loads antislop every session). |
| v3.2.3 | Codex plugin door: a `.codex-plugin/plugin.json` manifest pointing at the shared `skills/` folder, plus a `.agents/plugins/marketplace.json` index for the repo. |
| v3.2.4 | R-35 sharpened into a click-through smoke test: every interactive element must be run and exercised one at a time, and its result recorded as evidence in the Delivery Gate report. |
| v3.2.5 | Cursor plugin door: `.cursor-plugin/plugin.json` manifest plus a `.cursor-plugin/marketplace.json` index, with the six skills and a `.mdc` rule pointer. The Codex plugin also gains its app identity (plugin icon, brand color, banner screenshot). |
| v3.2.6 | Five-PR community round (PRs #22 to #26): a runtime Python launcher for the contrast MCP tool (fixes it on macOS), pointer writes that leave the user's entry file untouched, a smoke test that can actually fail, repo guardrails plus a CI workflow, and a contributors section. |
| v3.2.7 | Content round plus OpenCode verified as an installer target: three slop patterns earned names, "Two-State Layout" (a phone stack and a desktop grid with nothing defined between), "Over-Explained Comment" (a comment that runs on for several lines around a one-line fact), and "Decorative Status Dot" (a dot beside a heading that glows and pulses while marking nothing). R-37 gained the `DESIGN.md` conflict protocol: a direction that asks for a named slop pattern is surfaced and questioned, never silently followed or silently overridden. OpenCode is verified to load the skills from `.opencode/skills/` plus its `AGENTS.md` pointer. It is an installer target, not a plugin door: nothing loads from this repo. |
| v3.2.8 | Repair round, from a full re-validation of every shipped door against its vendor's current documentation. Antigravity's global install moves to `~/.gemini/config/skills/`: it had been writing the home-level `.agents/skills/`, which Antigravity does not read, so global installs aimed at Antigravity since v3.2.0 landed in a folder it never enumerates. The entry-file writer ignores markers that sit inside a code fence, keeps the author's line endings, no longer appends a fresh block on every run when one marker is unmatched, and no longer deletes the rest of the file when a `start` marker has no matching `end`. The installer refuses to run without a terminal, where it used to print its prompts, install nothing, and exit 0. OpenCode's global folder moves to the documented `~/.config/opencode/skills/`, where the old `~/.opencode/skills/` still loads, so nothing was broken there. Docs corrected wherever they disagreed with the code. |
| v3.2.9 | Hermes gets its project scope, and the install documentation is rewritten end to end. Hermes does read a project's skills, so the installer now writes `<project>/.hermes/skills/` and the `AGENTS.md` pointer, where it used to force every Hermes install into `~/.hermes/`; a project's skills also outrank the global ones, which the old behaviour could never reach. Hermes will not load skills out of a cloned repository until that repository is trusted, a deliberate vendor gate the installer must not bypass, so the installer names the one-time `hermes skills trust` step and the guide documents it, along with the version caveat: the official installer has project discovery and the older PyPI `hermes-agent` package does not. Cursor's install command is corrected, because `/add-plugin <url>` appears in no Cursor documentation and not in the shipped CLI bundle; the documented route is `agent plugin marketplace add <url>` followed by Install in the Customize panel. The installer's conflict prompt now distinguishes the choice that updates from the one that silently leaves the old version in place, and its closing line says so when it keeps existing folders. The guide is rebuilt around what the reader is doing rather than which tool they picked: Install, Update, and Remove are separate top-level sections, each covering the same four routes in the same order, so finding a route in one finds it in the others, and the parts that are reference rather than steps are collected under a Reference heading. Update and removal steps, which previously sat inside each route as bold text with no heading of their own, now have a section of their own for every route. Install gains step-by-step walkthroughs for both main routes and a phone and chat-window section. A live generate-test also produced two content fixes. "Eyebrow Badge Above the Headline" joins the pattern list: a pill parked directly above the H1, usually with a dot, holding a category label the headline already says, which slipped between R-09 (whose forbidden content list stops at "AI Powered", "Beta", "New") and Decorative Status Dot (which opens with a glowing, pulsing dot). And the core now states outright that three steps run in both usage modes whatever else is driving the session: direction resolution (R-37), asset clarification (R-23), and the Delivery Gate. The test that surfaced them ran another skill's planning workflow, which led the work while antislop's mandatory steps went unrun, including the gate report. The README also gains a comparison section, eight images drawn from one brief. Three page builds sit in a row, each captioned underneath in its own cell, followed by the fourth at full width as the payoff: with nothing, with antislop alone, with `DESIGN.md` alone, and then both together. They are separate outcomes rather than a before and after, because each one is a different set of tools rather than a stage of the same work, and none of them has to be read off a grid. Copy and code comments get before-and-after pairs instead, since there the filter is the whole of the job. |

## What's next

Two rules keep the queue honest:

> **One new agent per version.** A version opens at most one new agent's door, so a door that breaks is only ever one agent's problem. Repairs ride along: a break found in a door already shipped is fixed when it is found, never queued behind a slot.

> **A maintenance round ships no new agent.** It pays down what an earlier door left behind, chosen at the time from re-validating each door against its vendor's current documentation and from what the community reports. The slot is fixed; its contents are not.

Every door is verified against the vendor's current documentation before its version ships rather than assumed, and the installer and the guide are updated in the same release.

| Version | Item | What it means |
|---------|------|---------------|
| v3.2.10 | GitHub Copilot | The installer row, the `AGENTS.md` pointer, and its plugin marketplace command. |
| v3.2.11 | Maintenance | No new agent. Re-validate every door against its vendor's current documentation and the community's reports, then repair what drifted. The slot is fixed; the list is decided at the time, from what those checks surface. |
| v3.2.12 | Kimi Code | The installer row and its pointer. Moonshot also ships a plugin system and Kimi Code reads `.agents/skills/`, so the door class is decided when its current documentation is read rather than promised here. |
| v3.2.13 | Maintenance | No new agent. The same re-validation round. |
| v3.2.14 | Cline | One `.agents/skills` reader, confirmed on its own rather than assumed from the shared folder. |
| v3.2.15 | Amp | The next one, confirmed the same way. Cline and Amp are separate versions because a door that breaks should only ever be one agent's problem. |
| v3.2.16 | Maintenance | No new agent. The same round again. |

Beyond the numbered plan, with no promised version:

- **OpenAI public directory listing** (deferred). Listing prep for the plugin directory shared by ChatGPT and Codex: a versioned skill bundle, a submission document, and public privacy and terms pages. The submission happens on the OpenAI Platform after identity verification, outside this repo; parked until that can proceed.
- **Gemini CLI** (deferred). Consumer access ended on 18 June 2026 and Antigravity CLI replaced it, which already has a door (v3.2.2). It was not a total shutdown: enterprise Code Assist licenses and paid API keys still work, and the Apache 2.0 repository is still maintained, so `.gemini/skills/` stays. A completeness close would need an extension manifest for a tool whose consumer audience is gone; parked with antislop-compact.
- **Kiro** (candidate). Kiro reads agent skills from `.kiro/skills/` per project and `~/.kiro/skills/` globally, activating them by description. It sits outside the shared `.agents` standard, so it would be an installer row and an `AGENTS.md` pointer rather than a marketplace door.
- **Roo** (candidate). Sources disagree on its skill folder: some list `.roo/skills/`, others route it to `.roo/rules/`, and its own setup guides describe `.roo/rules/*.md` discovery rather than skill directories. It is a candidate rather than a long-tail row because the path has to be settled against Roo's own documentation before it can be a version.
- **More plugin doors** as other agents grow plugin systems that antislop can ride from the same repo.
- **antislop-compact**, a lightweight, standalone family of the five skills, each a self-contained cheat-sheet version that runs without the core alongside. Deferred: a parallel set of files would have to track every change to the full ones, and a compact skill is only sound if it keeps the one-line why per rule and the Delivery Gate.
- **Skill candidates** still open: `antislop-docs` and `antislop-identity`.

## Not in scope

antislop stays a **filter, not a style guide**:

- No prescribed aesthetics, per-framework recipes, or trend bans.
- It never beautifies on its own; direction and beauty are yours, in `DESIGN.md`.
- It is not limited to building pages: the same filter writes and audits copy (`antislop-copywriting`).
- UX and motion are folded into `antislop-ui` rather than separate skills, and data-integrity rules already live in the core.
