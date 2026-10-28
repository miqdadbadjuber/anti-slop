<p align="center">
  <img src="./assets/antislop-banner.png" alt="antislop" width="100%" />
</p>

<div align="center">

<a href="https://trendshift.io/repositories/137042?utm_source=trendshift-badge&amp;utm_medium=badge&amp;utm_campaign=badge-trendshift-137042" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/trendshift/repositories/137042/daily?language=JavaScript" alt="Trendshift Daily Trending" width="250" height="55"/></a>
<a href="https://trendshift.io/repositories/137042?utm_source=trendshift-badge&amp;utm_medium=badge&amp;utm_campaign=badge-trendshift-137042" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/trendshift/repositories/137042/weekly?language=JavaScript" alt="Trendshift Weekly Trending" width="250" height="55"/></a>

[![npm version](https://img.shields.io/npm/v/antislop-ai?style=flat-square&color=cb3837&label=npm)](https://www.npmjs.com/package/antislop-ai)
[![Node.js](https://img.shields.io/badge/Node.js-20.12%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](cli/package.json)
[![skills.sh](https://skills.sh/b/miqdadbadjuber/anti-slop?style=flat-square)](https://skills.sh/miqdadbadjuber/anti-slop)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Discord](https://img.shields.io/badge/Discord-join-5865F2?style=flat-square&logo=discord&logoColor=white)](https://discord.gg/VWKggJfHFR)

# Anti Slop: Rules for AI Coding Agents

### A rulebook that stops an AI coding agent shipping generic UI, text, and AI-shaped code.

**A filter, not a style guide.** No prescribed colors, fonts, or layouts, and direction stays yours.

**[Website](https://antislop.ai.id) · [Guide](GUIDE.md) · [Install](https://antislop.ai.id/install)**

[Before and after](#before-and-after) · [Install](#install) · [What it does](#what-it-does) · [Skills](#skills) · [FAQ](#faq)

<code>npx antislop-ai</code>

</div>

---

## Before and after

The same brief, run more than once, so the difference is visible side by side.

### UI

antislop alone is not the after. It removes the slop and stops there; direction comes from `DESIGN.md`. For UI work you intend to ship, that file is mandatory: without it the result is labelled a draft without direction. The pair below is the result.

| **Before: without antislop** | **After: antislop + `DESIGN.md`** |
|:--|:--|
| <a href="assets/compare/ui/without.webp"><img src="assets/compare/ui/without.webp" alt="The before: a generic landing page with a sparkle logo, a NEXT-GEN AI 2.0 beta pill above the headline, and a fake terminal reporting 0.0001ms latency" width="100%"></a> | <a href="assets/compare/ui/w-all.webp"><img src="assets/compare/ui/w-all.webp" alt="The after: the same page with antislop and DESIGN.md, a full-bleed illustrated hero with one honest headline and project-specific navigation" width="100%"></a> |
| This is what most AI output looks like: slop everywhere once you take a closer look. | Much better. antislop kills the slop, and `DESIGN.md` gives it a real visual direction. |

The two partial states are worth seeing, because each one shows why the other half matters:

| **Partial: antislop alone** | **Partial: `DESIGN.md` alone** |
|:--|:--|
| <a href="assets/compare/ui/w-antislop.webp"><img src="assets/compare/ui/w-antislop.webp" alt="Partial result: antislop with no design direction, a plain dark layout with the invented numbers removed" width="100%"></a> | <a href="assets/compare/ui/w-design.webp"><img src="assets/compare/ui/w-design.webp" alt="Partial result: DESIGN.md with no filter, a photographic hero with stat cards still reading 10,000% ROI Synergy Multiplier" width="100%"></a> |
| The slop is gone, but so is the direction. That is why antislop needs a `DESIGN.md`. | The direction is there, but honestly it is still far from good: the slop still shows. |

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

- **40 mandatory rules** (R-01 to R-40) in three tiers: Hard Gate, Purpose-Gate, and Quality Locks.
- **A Liveliness Toolkit**: three dials (ENERGY / RHYTHM / MOTION) and a Design Read, so the result comes out alive rather than merely clean.
- **A Delivery Gate**: a mandatory PASS/FAIL report in four blocks, run before anything ships.
- **Six skills**, one per concern, so an agent loads only what a task needs.

The core prevents slop but cannot invent direction. `DESIGN.md` (yours) supplies it, and a sterile result means the direction was missing, not that the filter failed (R-37). antislop never beautifies on its own.

## Skills

| Skill | Covers | Pick it for |
|-------|--------|-------------|
| antislop | The core filter: rules, tiers, the Delivery Gate, liveliness | Everything. Always loaded |
| antislop-ui | Layout, color, components, decoration, motion, structure, performance | UI and visual work |
| antislop-copywriting | Headlines, CTAs, tone, fake stats, anti-AI writing, markdown hygiene | Copy and text |
| antislop-human | Contrast, keyboard, focus, states, interaction affordances | Accessibility |
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

Use `after` instead for audits, `ask` to restore the question in every session, or `--mode` alone to view the setting. The file is shared, so one command covers every agent and every project: `~/.config/antislop/settings.json` on Linux and macOS, `%APPDATA%\antislop\settings.json` on Windows.

A mode you ask for in the current chat always wins for that session and never changes what is saved. When a saved preference applies, the skill says so once: **"antislop active: during (global preference)."** Older installs still carry the unconditional question, so run the update below to pick this up.

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

**v3.2.25** is a maintenance round for the installer:

- **Node.js 20.12 or newer, said plainly.** The prompt library needs it, and an older Node used to stop with an error from inside `node_modules`. The wizard now names the Node it found and asks for an update, while `--version`, `--mode`, and `--update` still run on an older one. CI runs the smoke test on 20.12 too.
- **No pointer in the home folder.** Picking "This project" from the home folder no longer writes `~/CLAUDE.md`. From community PR #48.
- **A real npm package page.** The package ships the README and LICENSE. From community PR #51.
- **A smoke test that stays in its temp folder.** It gets its own home from launch, so no runtime can write into the real one.

Every earlier release, and what comes next, is in [ROADMAP.md](ROADMAP.md).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=miqdadbadjuber/anti-slop&type=Date)](https://star-history.com/#miqdadbadjuber/anti-slop&Date)

## Contributors

Thanks to everyone who helps make antislop better.

<p align="center">
  <a href="https://github.com/miqdadbadjuber/anti-slop/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=miqdadbadjuber/anti-slop&v=3.2.25" alt="antislop contributors" />
  </a>
</p>

Found a new slop pattern, a rule that missed something, or a bug in the installer? Open an [issue](https://github.com/miqdadbadjuber/anti-slop/issues). What a pull request has to carry is in [CONTRIBUTING.md](CONTRIBUTING.md), and behavior in issues and pull requests is covered by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

<hr>

<p align="center"><em>“antislop is a filter, not magic.<br>
It clears the slop from your UI, text, and code.<br>
A beautiful UI is <code>DESIGN.md</code>'s job, and yours.”</em></p>

<hr>

## Disclaimer

Get antislop from [miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop), [antislop.ai.id](https://antislop.ai.id), or the [antislop-ai npm package](https://www.npmjs.com/package/antislop-ai). The npm name `antislop` belongs to a different package, so `npx antislop` does not install this project.

There is no antislop coin, token, or fundraise. Any crypto coin, token, NFT, or fundraising that uses the antislop name was not created by this project and is a scam. antislop takes no donations, and nobody is authorized to collect money on its behalf.

## License

MIT: [LICENSE](LICENSE)
