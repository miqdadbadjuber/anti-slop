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

<h1 align="center">Anti Slop: Rules for AI Coding Agents</h1>

<p align="center">
  A rulebook that stops an AI coding agent shipping generic UI, filler copy, and AI-shaped code.<br>
  A <strong>filter, not a style guide</strong>: no prescribed colors, fonts, or layouts, and direction stays yours.
</p>

<p align="center">
  <strong>New here?</strong> <a href="GUIDE.md">GUIDE.md</a> is the from-zero walkthrough.
</p>

## See the difference

The same brief, built four ways. antislop filters and `DESIGN.md` supplies direction. They are different jobs, and these are the four results.

### UI

| **Nothing at all** | **antislop alone** | **`DESIGN.md` alone** |
|:--|:--|:--|
| <a href="assets/compare/ui/without.webp"><img src="assets/compare/ui/without.webp" alt="A generic landing page: a sparkle logo, a NEXT-GEN AI 2.0 beta pill above the headline, and a fake terminal reporting 0.0001ms latency" width="100%"></a> | <a href="assets/compare/ui/w-antislop.webp"><img src="assets/compare/ui/w-antislop.webp" alt="The same page with antislop: honest copy on a restrained dark layout with a single accent color" width="100%"></a> | <a href="assets/compare/ui/w-design.webp"><img src="assets/compare/ui/w-design.webp" alt="The same page with `DESIGN.md` only: a photographic hero, with the stat cards still reading 10,000% ROI Synergy Multiplier and a 5.0 rating from 500,000 founders" width="100%"></a> |
| Where most AI output starts: a sparkle logo, a beta pill, and a fake terminal. | Honest, because the filter removed the invented numbers. Plain, because beauty is not its job. | The direction lands, but the slop stays, because `DESIGN.md` directs and does not filter. |

The fourth is the only one of the four that is clean and directed at the same time:

| **antislop + `DESIGN.md`** |
|:--|
| <a href="assets/compare/ui/w-all.webp"><img src="assets/compare/ui/w-all.webp" alt="The same page with antislop and `DESIGN.md`: a full-bleed illustrated hero with one honest headline and project-specific navigation" width="100%"></a> |
| Honest numbers and a real direction in the same build. The filter removes what should not be there; `DESIGN.md` fills the space that leaves, which is the one thing neither manages alone. |

### Copy

One prompt, run twice.

| Before | After |
|:--|:--|
| <a href="assets/compare/text/before.webp"><img src="assets/compare/text/before.webp" alt="An AI written Discord launch post: emoji bullet points, NEW DROP in capitals, and hype in every line" width="100%"></a> | <a href="assets/compare/text/after.webp"><img src="assets/compare/text/after.webp" alt="The same launch post written with antislop-copywriting: plain sentences, no emoji bullets, and a note to cut any line with nothing real to say" width="100%"></a> |

### Code

One file, run twice.

| Before | After |
|:--|:--|
| <a href="assets/compare/code/before.webp"><img src="assets/compare/code/before.webp" alt="Python with box-drawing section banners, emoji, and a comment on every constant that restates the constant" width="100%"></a> | <a href="assets/compare/code/after.webp"><img src="assets/compare/code/after.webp" alt="The same Python with the banners and emoji gone, one comment left that says what the module does, and the code itself untouched" width="100%"></a> |

Every image here opens full size if you click it.

## Install

antislop ships as standard agent skills: one folder per skill, holding a `SKILL.md`. Installation differs per agent, so pick the section for the one you use. Each route is walked through from zero, with update and removal, in [GUIDE.md](GUIDE.md#install-update-and-remove).

### The installer (recommended)

One command, then answer the prompts. It asks which skills you want, where to install them (this project or everywhere), and which agents you use, then copies the folders and writes the pointer that reloads antislop every session.

```bash
npx antislop-ai
```

### The skills directory

antislop is listed on [skills.sh](https://skills.sh/miqdadbadjuber/anti-slop), the open directory for agent skills. This copies the same folders as the installer and nothing else, so antislop reloads by description alone.

```bash
npx skills add miqdadbadjuber/anti-slop
```

### Claude Code - Plugin

```text
/plugin marketplace add https://github.com/miqdadbadjuber/anti-slop
/plugin install antislop@anti-slop
```

### Antigravity - Plugin

```bash
agy plugin install https://github.com/miqdadbadjuber/anti-slop
```

### Codex - Plugin

```bash
codex plugin marketplace add miqdadbadjuber/anti-slop
codex plugin add antislop@anti-slop
```

### Cursor - Plugin

```bash
agent plugin marketplace add https://github.com/miqdadbadjuber/anti-slop
```

Then open **Customize**, find **antislop**, and select **Install**.

### Kimi Code - Plugin

```text
/plugins install https://github.com/miqdadbadjuber/anti-slop
```

### Cline - Plugin

```bash
cline plugin install https://github.com/miqdadbadjuber/anti-slop.git
```

This door covers the Cline CLI. For the VS Code or JetBrains extension, use the installer.

### Oh My Pi - Plugin

```bash
omp plugin marketplace add miqdadbadjuber/anti-slop
omp plugin install antislop@anti-slop
```

### Pi - Package

```bash
pi install git:github.com/miqdadbadjuber/anti-slop
```

### The single file

`antislop.md` on its own is a complete filter you can paste into any chat window, with no packaging and no folders.

```bash
curl -o antislop.md https://raw.githubusercontent.com/miqdadbadjuber/anti-slop/main/antislop.md
```

## What it does

- **38 mandatory rules** (R-01 to R-38) in three tiers: Hard Gate, Purpose-Gate, and Quality Locks.
- **A Liveliness Toolkit**: three dials (ENERGY / RHYTHM / MOTION) and a Design Read, so the result comes out alive rather than merely clean.
- **A Delivery Gate**: a mandatory PASS/FAIL report in four blocks, run before anything ships.
- **Six skills**, one per concern, so an agent loads only what a task needs.

The core prevents slop but cannot invent direction. `DESIGN.md` (yours) supplies it, and a sterile result means the direction was missing, not that the filter failed (R-37). antislop never beautifies on its own.

## Skills

| Skill | Covers | Pick it for |
|-------|--------|-------------|
| antislop | The core filter: rules, tiers, the Delivery Gate, liveliness | Everything. Always loaded |
| antislop-ui | Layout, color, components, decoration, motion, structure | UI and visual work |
| antislop-copywriting | Headlines, CTAs, tone, fake stats, anti-AI writing, markdown hygiene | Copy and text |
| antislop-human | Contrast, keyboard, focus, states | Accessibility |
| antislop-layoutmobile | Reflow across screen widths, breakpoints, grids, overflow, tap targets | Responsive work |
| antislop-code | AI-slop comments: which to remove, which to keep | Comment cleanup |

Install one, several, or the core alone.

## Usage modes

antislop runs one of two ways, and by default the agent asks which at the start of every session. Both end with a report you can check; they differ in when the rules apply.

- **During** guides the work while it is built, and the session closes with the Delivery Gate report. Use it when you are building something new.
- **After** audits work that already exists: a numbered findings list, you approve which to fix, then a follow-up report. Use it to clean up output you already have.

Saving a preference is opt-in. With no settings file, antislop keeps asking in every new session exactly as it does today. Save your preferred mode once to skip that question:

```bash
npx antislop-ai --mode during
```

Use `after` instead for audits, `ask` to restore the question in every session, or `--mode` alone to view the setting. The shared settings file is `~/.config/antislop/settings.json` on Linux and macOS, and `%APPDATA%\antislop\settings.json` on Windows (falling back to `~/.config` when `%APPDATA%` is unset). You can also ask your agent to "remember during as my global antislop mode".

When a saved preference is active, the skill announces **"antislop active: during (global preference)."** Mode resolution follows a strict order: an explicit mode request in the current chat, then the saved preference, then the question. A session request always wins and does not change the saved setting. The skill announces a saved preference or session override exactly once. With no saved `during` or `after` preference, it asks as before. Update existing skill installations and project pointers to use this behavior; older copies still contain the unconditional question. For installer-managed project pointers, rerun the installer in each project. Plugin users should update their plugin.

## Update

antislop does not update itself. If you installed through the installer, one command replaces what is already there, in this project and under your home directory, and prints the release it replaced:

```bash
npx antislop-ai --update
```

A plugin keeps its own copy under the agent that installed it, so it updates through its own command, and the Pi package updates through Pi. Every route is listed in [GUIDE.md](GUIDE.md#install-update-and-remove). Skills load when a session starts, so start a new one afterwards.

## FAQ

**Is antislop a style guide?**
No, a filter. It rejects technique without purpose and requires liveliness. Direction is yours.

**Which agents does it work with?**
Claude Code, Codex, Antigravity, OpenCode, Cursor, Cline, Amp, Gemini CLI, Hermes, GitHub Copilot, Kimi Code, Pi, and Oh My Pi. The installer covers twelve of them and detects which ones you have, and the plugin doors install from this same repository. [GUIDE.md](GUIDE.md) lists the folder each agent reads.

**What is a skill?**
A folder that goes deeper into one concern, holding a `SKILL.md` with its rules. Skills reference the core rules by number and never duplicate them, so adding one does not change the core.

## Roadmap

**v3.2.20** adds opt-in usage-mode preferences and announces the active mode and its source. It builds on the v3.2.19 changes:

- **The community files.** CONTRIBUTING.md, CODE_OF_CONDUCT.md, issue templates, and a pull request template, so the repository reads as one you can join and not only one you can install.
- **A README rebuilt.** One heading per install route, and the detail that used to be repeated here moved to the guide, where it is written out in more depth.
- **A guide rebuilt.** One section per route, so install, update, and removal sit together instead of being written out three times, and a catalogue of every named pattern generated from the skills themselves and checked in CI.

Every earlier release, and what comes next, is in [ROADMAP.md](ROADMAP.md).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=miqdadbadjuber/anti-slop&type=Date)](https://star-history.com/#miqdadbadjuber/anti-slop&Date)

## Contributors

Thanks to everyone who helps make antislop better.

<p align="center">
  <a href="https://github.com/miqdadbadjuber/anti-slop/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=miqdadbadjuber/anti-slop&v=3.2.20" alt="antislop contributors" />
  </a>
</p>

Found a new slop pattern, a rule that missed something, or a bug in the installer? Open an [issue](https://github.com/miqdadbadjuber/anti-slop/issues). What a pull request has to carry is in [CONTRIBUTING.md](CONTRIBUTING.md), and behavior in issues and pull requests is covered by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

<hr>

<p align="center"><em>“antislop is a filter, not magic.<br>
It clears the slop from your UI, text, and code.<br>
A beautiful UI is <code>DESIGN.md</code>'s job, and yours.”</em></p>

<hr>

## License

MIT: [LICENSE](LICENSE)
