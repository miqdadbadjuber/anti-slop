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

> **New here? Start with the [guide](guide.md).** It explains what antislop is and how to install it, from zero.

## What it does

- **38 mandatory rules** (R-01 to R-38) in three tiers: Hard Gate (absolute), Purpose-Gate (technique allowed, reason required), Quality Locks (consistency)
- **A Liveliness Toolkit** with three dials (ENERGY / RHYTHM / MOTION) and a Design Read, so the result is alive and specific, not just "clean"
- **A Delivery Gate**: a mandatory PASS/FAIL report in four blocks, run before anything ships
- **Additive skills**, one per concern, so an agent only loads what a task needs

The core prevents slop but cannot invent direction. `DESIGN.md` (yours) supplies it; a sterile result means the direction was missing, not that the filter failed (R-37).

## Install

antislop is a set of **standard agent skills** (one folder per skill, `SKILL.md`) you can install as a package. The core is always loaded; the skills load only for the task at hand. Pick one of these three paths.

**1. The picker (recommended).** One command, then choose. It shows the antislop banner, lists the skills with the core locked on, and asks where (project or global) and which agents (Claude Code, Antigravity, Codex):

```bash
npx antislop-ai
```

**2. The skills directory.** antislop is listed on [skills.sh](https://skills.sh/miqdadbadjuber/anti-slop), the open directory for agent skills:

```bash
npx skills add miqdadbadjuber/anti-slop
```

Add `--all` for every skill, `-g` for a global install, or `--skill <name>` for a single one. Run `--list` first to see what is available.

`npx skills add` copies the skill folders but does not write the agent entry pointer that loads antislop every session. To add the pointer, run `npx antislop-ai`, choose the same skills and agent, and pick **Keep what is there** when it finds the existing folders. The picker (path 1) does both in one run.

skills.sh reads the skill folders straight from this repository, so the listing appears as soon as the repo is live; there is no separate setup step.

**3. The plugin (Claude Code).** Add the marketplace once, then install the plugin:

```text
/plugin marketplace add https://github.com/miqdadbadjuber/anti-slop
/plugin install antislop@anti-slop
```

Every skill is a folder of the open Agent Skills standard (`<name>/SKILL.md`), so it drops into Claude Code (`.claude/skills/`), Codex (`.codex/skills/`), Antigravity (`.agents/skills/`), and any other agent that reads the standard. The picker (path 1) asks which of these agents you use and installs into them, creating the skill folder if it does not exist yet; the skills directory (path 2) handles the same agents and more. The plugin (path 3) is the Claude Code door only.

**Manual (single file, no packaging).** The core `antislop.md` alone remains a complete filter you can paste into any chat window. Download it and tell your agent to read it; the First-Run wizard inside it installs skills the manual way:

```bash
curl -o antislop.md https://raw.githubusercontent.com/miqdadbadjuber/anti-slop/main/antislop.md
```

## Skills

| Skill | What it covers | Ships in |
|-------|----------------|----------|
| `antislop` | The core filter: rules, tiers, Delivery Gate, liveliness | v3.0.0 |
| `antislop-ui` | UI / visual: layout, color, components, decoration, motion, structure | v2.2.0 |
| `antislop-copywriting` | Copy & text: headlines, CTAs, tone, fake stats, anti-AI-writing patterns, markdown hygiene | v2.3.0 |
| `antislop-human` | Human: contrast (with the checker), keyboard, focus, states | v2.4.0 |
| `antislop-layoutmobile` | Mobile layout: responsive breakpoints, grids, overflow, tap targets, navigation | v2.5.0 |
| `antislop-code` | Code comments: remove generic AI-slop comments, keep the valuable ones, never touch the code | v3.1.0 |

Pick what matches the work: UI work → `antislop-ui`, copy work → `antislop-copywriting`, people work → `antislop-human`, mobile layout work → `antislop-layoutmobile`, code comments work → `antislop-code`, more than one → install several, or none (the core alone is a complete filter).

## Usage Modes

antislop is used one of two ways, chosen at the start of a session:

- **During** guides the work while it is built, ending with the Delivery Gate. Use it when building new UI.
- **After** audits finished work: a numbered findings list, you approve which to fix, then a follow-up report. Use it to clean up existing output.

## Roadmap

**v3.1.0 shipped** the `antislop-code` skill, per-skill READMEs, and the tagline rename. **v3.1.1** was a patch: the picker stopped copying per-skill READMEs into projects, and the wizard dropped install commands. **v3.1.2** removes the per-skill READMEs entirely and makes the picker ask which agent to install into, so a fresh Antigravity or Codex project lands in the right folder. **v3.1.3** states the `DESIGN.md` boundary explicitly, adds a security explainer ([SECURITY.md](SECURITY.md)), and documents what `npx skills add` does and does not install. See [ROADMAP.md](ROADMAP.md) for the tracker, including the cross-agent plugin plan.

## FAQ

**Is antislop a style guide?**
No, a filter. It does not prescribe colors, fonts, or layouts. It rejects technique without purpose and requires liveliness; direction is yours.

**Which agents does it work with?**
All of them, but the install paths differ:

- **The picker and the skills directory** support Claude Code, Codex, and Antigravity (the picker detects each agent's skill folder; `npx skills add` handles the same agents and more). These are the recommended paths.
- **The plugin** is Claude Code only. It is the Claude-specific door.
- **The single file** (`antislop.md`) works with any agent that reads plain Markdown: Cursor, Gemini CLI, or a plain chat window.

The packaged skills use the open Agent Skills standard (folder per skill), so they drop into any tool that reads the standard.

**What is a "skill"?**
A folder that goes deeper into one concern (UI, copywriting, accessibility, and so on), holding a `SKILL.md` with its rules. It references the core rules by number and never duplicates them, so adding a skill does not change the core.

**What are DURING and AFTER?**
The two usage modes: DURING applies the rules while building, AFTER audits finished work. You pick one at the start of a session.

## Contributing

Found a new AI slop pattern, a rule that missed something, or a bug in the installer? Open an [issue](https://github.com/miqdadbadjuber/anti-slop/issues). PRs are welcome for new AI slop patterns, clarifications, or checklist items out of sync with their rule.

## License

MIT: [LICENSE](LICENSE)
