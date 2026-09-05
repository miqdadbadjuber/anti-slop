<p align="center">
  <img src="./assets/antislop-banner.png" alt="antislop" width="100%" />
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-2ea44f" alt="License: MIT"></a>
  <a href="https://github.com/miqdadbadjuber/anti-slop/releases"><img src="https://img.shields.io/github/v/release/miqdadbadjuber/anti-slop?label=version&color=1f6feb" alt="Version"></a>
</p>

<p align="center">
  <a href="https://skills.sh/miqdadbadjuber/anti-slop"><img src="https://skills.sh/b/miqdadbadjuber/anti-slop" alt="skills.sh"></a>
</p>

# antislop

> **Anti Slop: Rules for AI Coding Agents.** It stops them from generating generic "AI slop" UI and copy, without letting the result turn sterile. It is a **filter, not a style guide**: no prescribed colors, fonts, or layouts. It is not only for building pages: it also writes and audits copy, so AI text stops reading like AI. And it never beautifies on its own; `DESIGN.md` (yours) is where beauty and direction come from.

> **New here? Start with the [guide](GUIDE.md).** It explains what antislop is and how to install it, from zero.

## What it does

- **38 mandatory rules** (R-01 to R-38) in three tiers: Hard Gate (absolute), Purpose-Gate (technique allowed, reason required), Quality Locks (consistency)
- **A Liveliness Toolkit** with three dials (ENERGY / RHYTHM / MOTION) and a Design Read, so the result is alive and specific, not just "clean"
- **A Delivery Gate**: a mandatory PASS/FAIL report in four blocks, run before anything ships
- **Additive skills**, one per concern, so an agent only loads what a task needs

The core prevents slop but cannot invent direction. `DESIGN.md` (yours) supplies it; a sterile result means the direction was missing, not that the filter failed (R-37).

## Install

antislop ships as a set of **standard agent skills** (one folder per skill, holding a `SKILL.md`). The core is always loaded; the other skills load only when the task needs them. Pick one of these five paths from this one repo.

**1. The picker (recommended).** One command, then answer the prompts. It asks where to install (this project or everywhere), which agents you use, and which extra skills you want, then copies the folders and writes the pointer that loads antislop every session. Path 2 does not write that pointer, so start here:

```bash
npx antislop-ai
```

**2. The skills directory.** antislop is listed on [skills.sh](https://skills.sh/miqdadbadjuber/anti-slop), the open directory for agent skills:

```bash
npx skills add miqdadbadjuber/anti-slop
```

Add `--all` for every skill, `-g` for a global install, or `--skill <name>` for one skill. Run `--list` first to see what is available.

`npx skills add` copies the skill folders but does not write the agent entry pointer that loads antislop every session, and skills.sh does not write one either. If you used this path and want that pointer, run `npx antislop-ai`, pick the same skills and agent, and choose **Keep what is there** when it finds the folders.

skills.sh reads the folders straight from this repository, so the listing needs no setup beyond the repo being live.

**3. The plugin (Claude Code).** Add the marketplace once, then install the plugin:

```text
/plugin marketplace add https://github.com/miqdadbadjuber/anti-slop
/plugin install antislop@anti-slop
```

**4. The plugin (Antigravity).** The same repo is a full Antigravity plugin: a root `plugin.json`, the six skills registered as Antigravity skills, and a `rules/antislop.md` pointer that loads antislop into every session. Install it with the Antigravity CLI:

```bash
agy plugin install https://github.com/miqdadbadjuber/anti-slop
```

**5. The plugin (Codex).** The same repo is a Codex plugin and marketplace: a `.codex-plugin/plugin.json` manifest plus a `.agents/plugins/marketplace.json` index, both pointing at the shared `skills/` folder. Add the marketplace once, then install the plugin:

```bash
codex plugin marketplace add miqdadbadjuber/anti-slop
codex plugin add antislop@anti-slop
```

**Where the skills live.** Every skill is a folder of the open Agent Skills standard (`<name>/SKILL.md`), so it drops into any agent that reads the standard. The picker (path 1) installs into whichever of these you use, creating the folder if it is missing:

| Agent | Reads antislop from |
|-------|---------------------|
| Claude Code | `.claude/skills/` |
| Codex | `.codex/skills/` |
| Antigravity | `.agents/skills/` |
| OpenCode | `.opencode/skills/` |
| Cursor | `.cursor/skills/` |
| Gemini CLI | `.gemini/skills/` |
| Hermes | `~/.hermes/skills/` |

The plugins (paths 3, 4, 5) are per-agent doors: they load antislop straight from this repo, so there are no skill folders to keep in sync.

**Manual (single file, no packaging).** The core `antislop.md` alone is a complete filter you can paste into any chat window. Download it and tell your agent to read it; the First-Run wizard inside it installs skills the manual way:

```bash
curl -o antislop.md https://raw.githubusercontent.com/miqdadbadjuber/anti-slop/main/antislop.md
```

## Skills

| Skill | What it covers | Ships in |
|-------|----------------|----------|
| antislop | The core filter: rules, tiers, Delivery Gate, liveliness | v3.0.0 |
| antislop-ui | UI / visual: layout, color, components, decoration, motion, structure | v2.2.0 |
| antislop-copywriting | Copy & text: headlines, CTAs, tone, fake stats, anti-AI-writing patterns, markdown hygiene | v2.3.0 |
| antislop-human | Human: contrast (with the checker), keyboard, focus, states | v2.4.0 |
| antislop-layoutmobile | Mobile layout: responsive breakpoints, grids, overflow, tap targets, navigation | v2.5.0 |
| antislop-code | Code comments: remove generic AI-slop comments, keep the valuable ones, never touch the code | v3.1.0 |

Pick what matches the work:

- UI work → antislop-ui
- Copy work → antislop-copywriting
- People work → antislop-human
- Mobile layout work → antislop-layoutmobile
- Code comments work → antislop-code
- More than one kind of work → install several
- None → the core alone is a complete filter

## Usage Modes

antislop is used one of two ways, chosen at the start of a session:

- **During** guides the work while it is built, ending with the Delivery Gate. Use it when building new UI.
- **After** audits finished work: a numbered findings list, you approve which to fix, then a follow-up report. Use it to clean up existing output.

## Roadmap

What changed in each release. The full tracker, including the cross-agent plugin plan, lives in [ROADMAP.md](ROADMAP.md).

- **v3.1.0** shipped `antislop-code`, the code comment skill.
- **v3.1.1** and **v3.1.2** trimmed packaging: the picker stopped copying per-skill READMEs into projects and now asks which agent to install into.
- **v3.1.3** stated the `DESIGN.md` boundary and added [SECURITY.md](SECURITY.md).
- **v3.2.0** grew the picker to seven agents: Claude Code, Antigravity, Codex, OpenCode, Cursor, Gemini CLI, and Hermes.
- **v3.2.1** closed UI slop gaps: bento grids, Lucide-style icon sets, colored left stripes, fake terminal windows, demos without a product, and rule extensions for palette families, dot grids, typefaces, and pricing.
- **v3.2.2** opened the Antigravity door: `agy plugin install https://github.com/miqdadbadjuber/anti-slop` registers the six skills and loads antislop every session.
- **v3.2.3** opened the Codex door: `codex plugin marketplace add miqdadbadjuber/anti-slop`, then `codex plugin add antislop@anti-slop`.
- **v3.2.4** turned R-35 into a click-through smoke test: every interactive element must be run and exercised one at a time, and its result recorded as evidence in the Delivery Gate report.

## FAQ

**Is antislop a style guide?**
No, a filter. It does not prescribe colors, fonts, or layouts. It rejects technique without purpose and requires liveliness; direction is yours.

**Which agents does it work with?**
All of them, but the install paths differ:

- **The picker and the skills directory** support Claude Code, Codex, Antigravity, OpenCode, Cursor, Gemini CLI, and Hermes (the picker detects each agent's skill folder; Hermes installs globally only). These are the recommended paths.
- **The plugins** are per-agent doors: the Claude Code marketplace plugin (path 3), the Antigravity plugin (path 4), and the Codex plugin (path 5), all installed from the same repo.
- **The single file** (`antislop.md`) works with any agent that reads plain Markdown, including a plain chat window.

The packaged skills use the open Agent Skills standard (folder per skill), so they drop into any tool that reads the standard.

**What is a "skill"?**
A folder that goes deeper into one concern (UI, copywriting, accessibility, and so on), holding a `SKILL.md` with its rules. It references the core rules by number and never duplicates them, so adding a skill does not change the core.

**What are DURING and AFTER?**
The two usage modes: DURING applies the rules while building, AFTER audits finished work. You pick one at the start of a session.

## Contributing

Found a new AI slop pattern, a rule that missed something, or a bug in the installer? Open an [issue](https://github.com/miqdadbadjuber/anti-slop/issues). PRs are welcome for new AI slop patterns, clarifications, or checklist items out of sync with their rule.

## License

MIT: [LICENSE](LICENSE)
