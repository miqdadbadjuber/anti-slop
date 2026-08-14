<p align="center">
  <img src="./assets/antislop-banner.png" alt="antislop" width="100%" />
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-2ea44f?style=for-the-badge" alt="License: MIT"></a>
  <a href="https://github.com/miqdadbadjuber/anti-slop/releases"><img src="https://img.shields.io/github/v/release/miqdadbadjuber/anti-slop?label=version&style=for-the-badge&color=1f6feb" alt="Version"></a>
</p>

# antislop

> **Anti AI Slop: Design & Copy Rules.** A rules file for AI coding agents. It stops them from generating generic "AI slop" UI and copy, without letting the result turn sterile. It is a **filter, not a style guide**: no prescribed colors, fonts, or layouts.

## What it does

- **38 mandatory rules** (R-01 to R-38) in three tiers: Hard Gate (absolute), Purpose-Gate (technique allowed, reason required), Quality Locks (consistency)
- **A Liveliness Toolkit** with three dials (ENERGY / RHYTHM / MOTION) and a Design Read, so the result is alive and specific, not just "clean"
- **A Delivery Gate**: a mandatory PASS/FAIL report in four blocks, run before anything ships
- **Additive skills**, one per concern, so an agent only loads what a task needs

The core prevents slop but cannot invent direction. `DESIGN.md` (yours) supplies it; a sterile result means the direction was missing, not that the filter failed (R-37).

## Install

**The easy way (wizard).** Download the core once, tell your agent to read it, and the wizard does the rest: it asks which skills to install, downloads them into the same folder, and appends a managed pointer block to your entry file.

```bash
curl -o antislop.md https://raw.githubusercontent.com/miqdadbadjuber/anti-slop/main/antislop.md
```

> "Read `antislop.md` and follow its install instructions. I want the UI skill."

That's it. The pointer block is the source of truth: every later session loads the core plus only the skills you installed. Say "core only" to skip skills entirely. For a permanent setup that needs no first-run chat, add one line to your entry file (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, etc.): "For UI, copy, or people work, read `antislop.md`."

**Manual (the 3-file system).**

```
Project root/
├── AGENTS.md (or CLAUDE.md, GEMINI.md, etc.)    # router: tells the agent what to read
├── DESIGN.md                                    # direction: the soul of your UI (yours)
└── antislop.md                                  # filter: from this repo
```

```bash
curl -o antislop.md https://raw.githubusercontent.com/miqdadbadjuber/anti-slop/main/antislop.md
```

`antislop.md` alone is a complete filter. Skills add depth for one concern at a time; the wizard installs them, or download any you want the same way (`curl -o <skill-name>.md`).

Then add a pointer block to your entry file, listing exactly the skills you installed:

```md
<!-- antislop: auto-managed block, do not edit -->
## antislop
For UI, copy, or people work, read `antislop.md` (core) and then the skill for the task:
- UI / visual: `antislop-ui.md`
- Copy & text: `antislop-copywriting.md`
- People: `antislop-human.md`
Before starting, ask the user when antislop applies: during the work, or after it is done.
```

You can optionally put a dial line in `DESIGN.md` (`Dial: ENERGY 2 / RHYTHM 3 / MOTION 1`) to set the liveliness target directly. No `DESIGN.md`? The agent labels any output *"draft without direction"* instead of passing it off as a deliverable.

## Skills

| Skill | What it covers | Ships in |
|-------|----------------|----------|
| `antislop-ui` | UI / visual: layout, color, components, decoration, motion, structure | v2.2.0 |
| `antislop-copywriting` | Copy & text: headlines, CTAs, tone, fake stats, anti-AI-writing patterns, markdown hygiene | v2.3.0 |
| `antislop-human` | Human: contrast, keyboard, focus, states | v2.4.0 |
| `antislop-layoutmobile` | Mobile layout: responsive breakpoints, grids, overflow, tap targets | v2.5.0 (planned) |
| `antislop-docs` | Documentation: READMEs, API references, changelogs, tutorials | v2.6.0 (planned) |
| `antislop-identity` | Identity & naming: product names, taglines, brand voice | v2.7.0 (planned) |

Pick what matches the work: UI work → `antislop-ui`, copy work → `antislop-copywriting`, accessibility work → `antislop-human`, any combination → "All", or none (the core alone is a complete filter).

## Usage Modes

antislop is used one of two ways, chosen at the start of a session:

- **During** guides the work while it is built, ending with the Delivery Gate. Use it when building new UI.
- **After** audits finished work: a numbered findings list, you approve which to fix, then a follow-up report. Use it to clean up existing output.

## Roadmap

Heading to **v3.0.0**: the whole system packaged as an installable skill/plugin (Claude Code, Codex, Cursor, etc.) with a `/antislop` router. One skill ships per version until then. See [ROADMAP.md](ROADMAP.md).

## FAQ

**Is antislop a style guide?**
No, a filter. It does not prescribe colors, fonts, or layouts. It rejects technique without purpose and requires liveliness; direction is yours.

**Which agents does it work with?**
Any agent that reads plain Markdown: Claude Code, Codex, Cursor, Gemini CLI, and others. No plugin or special packaging is needed in v2.x; v3.0.0 adds installable packaging.

**What is a "skill"?**
An additive file that goes deeper into one concern (UI, copywriting, accessibility, and so on). It references the core rules by number and never duplicates them, so adding a skill does not change the core.

**What are DURING and AFTER?**
The two usage modes: DURING applies the rules while building, AFTER audits finished work. You pick one at the start of a session.

## Contributing

PRs are welcome for new AI slop patterns, clarifications, or checklist items out of sync with their rule.

## License

MIT: [LICENSE](LICENSE)
