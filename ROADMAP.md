# Roadmap

How antislop grows from a single rules file into an installable, cross-agent skill set. New to antislop? Read the [guide](GUIDE.md) first. [README.md](README.md) covers the product.

## Where we are

The latest release is [v3.2.32](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.32): a lean core plus five additive skills. What changed is in the [release notes](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.32), and the queue below is what comes next.

## What's next

| Version | Item | What it means |
|---------|------|---------------|
| v4.0.0 | /antislop-pixel | The new skills |

## Release history

Every version below links to its notes on [GitHub](https://github.com/miqdadbadjuber/anti-slop/releases).

| Version | What shipped |
|---------|--------------|
| [v2.1.0](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v2.1.0) | Usage modes (During / After), so the rules guide new work or audit work that already exists. |
| [v2.1.1](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v2.1.1) | English only. The Indonesian mirrors were removed. |
| [v2.2.0](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v2.2.0) | `antislop-ui`, the first additive skill: layout, color, components, decoration, motion, structure. |
| [v2.3.0](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v2.3.0) | `antislop-copywriting`: headlines, CTAs, tone, fake stats, anti-AI writing. |
| [v2.4.0](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v2.4.0) | `antislop-human`: contrast, keyboard, focus, states. Home of the contrast checker. |
| [v2.4.1](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v2.4.1) | `guide.md`, now GUIDE.md: a plain-English walkthrough for people new to antislop. Not a skill. |
| [v2.4.2](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v2.4.2) | Skill checklist polarity fix and a docs cleanup, merged from two community PRs. |
| [v2.5.0](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v2.5.0) | `antislop-layoutmobile`: reflow across screen widths, breakpoints, grids, overflow, tap targets. |
| [v3.0.0](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.0.0) | The packaging release: `skills/` folders, two distribution doors, the installer CLI, the contrast checker as an MCP tool, and the MIT license. |
| [v3.0.1](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.0.1) | Snyk W012 fix (no runtime curl in the packaged core), npm package author set to antislop, docs clarity. |
| [v3.0.2](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.0.2) | Adaptive python launcher, so the contrast checker runs on macOS, Linux, and Windows. App, Dashboard, and copy voice patterns. |
| [v3.1.0](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.1.0) | `antislop-code`, which covers AI-slop comments. Per-skill READMEs ship for the first time. |
| [v3.1.1](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.1.1) | The installer stops copying per-skill READMEs, and the wizard drops install commands, clearing the Socket warning. |
| [v3.1.2](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.1.2) | Per-skill READMEs are removed. The installer asks which agent to install into, so a fresh project lands in the right folder. |
| [v3.1.3](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.1.3) | The `DESIGN.md` boundary is stated: an external file is data to apply, not instructions to obey. SECURITY.md is added. |
| [v3.2.0](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.0) | The installer grows to seven agents, betting on a shared `.agents/skills/` folder to carry the long tail. |
| [v3.2.1](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.1) | UI slop gaps closed: bento grids, Lucide-style icon sets, colored left stripes, fake terminal windows, and demos without a product. |
| [v3.2.2](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.2) | Antigravity plugin door. The repository root is the plugin: a root `plugin.json` plus a `rules/antislop.md` pointer. |
| [v3.2.3](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.3) | Codex plugin door: a `.codex-plugin/plugin.json` manifest pointing at the shared `skills/` folder, plus a marketplace index. |
| [v3.2.4](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.4) | R-35 becomes a click-through smoke test: every interactive element is exercised one at a time and recorded as evidence. |
| [v3.2.5](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.5) | Cursor plugin door, with a `.mdc` rule pointer. The Codex plugin gains its app identity: icon, brand color, banner screenshot. |
| [v3.2.6](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.6) | Community round of five PRs: runtime python launcher, safer pointer writes, a smoke test that can fail, CI guardrails, and contributors. |
| [v3.2.7](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.7) | Three slop patterns earn names: Two-State Layout, Over-Explained Comment, Decorative Status Dot. R-37 gains the `DESIGN.md` conflict protocol. |
| [v3.2.8](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.8) | Repair round from a full door re-validation. Antigravity's global path moves, the entry-file writer stops losing content, no-TTY guard. |
| [v3.2.9](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.9) | Hermes gets its project scope, so a project's skills outrank the global ones. Install docs are rewritten around the reader's task. |
| [v3.2.10](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.10) | GitHub Copilot joins as an installer target. The installer groups agents by resolved path, so shared folders copy skills once. |
| [v3.2.11](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.11) | Community repair round. Codex gains its global folder, the shared-folder claim is corrected, and the README gains a star history chart. |
| [v3.2.12](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.12) | Kimi Code door, read out of vendor docs rather than assumed: the shared `.agents/skills/` folder at both scopes, plus a plugin manifest. |
| [v3.2.13](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.13) | The installed release is named on disk, so an update compares two versions. A fence scanner bug that replaced a documented example is fixed. |
| [v3.2.14](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.14) | Cline installer target and plugin door. Vendor docs broke the shared-folder premise, so Cline takes a folder of its own. |
| [v3.2.15](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.15) | Amp installer target, the fourth agent to read the shared `.agents/skills/` folder. Amp gets no plugin door, deliberately. |
| [v3.2.16](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.16) | `--update` replaces every antislop folder at both scopes, keeps each skill selection, and names the release it replaced. It also probes four plugin stores. |
| [v3.2.17](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.17) | Pi installer target and package door, verified on a real install. The package is read from a `pi` key in the root `package.json`. |
| [v3.2.18](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.18) | Oh My Pi plugin door, also verified on a real install. Only the documented catalog ships, since the manifest was not documented. |
| [v3.2.19](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.19) | The community files, a README and a guide read end to end for the first time since v3.0.0, and a skill catalogue generated into the guide. |
| [v3.2.20](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.20) | Usage modes become a saved preference, opt-in and announced with its source, with a session choice still winning. |
| [v3.2.21](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.21) | The contrast checker reads the threshold from the unrounded ratio, so 4.495 no longer reports 4.50 and passes 4.5:1. |
| [v3.2.22](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.22) | Maintenance round. The installer names all seven plugin doors, adding Kimi Code, Cline, and Oh My Pi, and CI runs on macOS too. |
| [v3.2.23](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.23) | Plugin-door probes report the newest copy, Codex versions compare as numbers, and `--update` from the home folder writes no pointer. |
| [v3.2.24](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.24) | Two Hard Gate rules: R-39 for semantics and affordances, R-40 for the performance mechanisms the code shows, with WCAG 2.2 and Core Web Vitals depth. |
| [v3.2.25](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.25) | Maintenance round. Node.js 20.12 fails with one line, no pointer is written in the home folder, the npm package ships its README and LICENSE. |
| [v3.2.26](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.26) | Three copywriting patterns: temporal runway clichés, theatrical takeaways, and title case in list elements. |
| [v3.2.27](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.27) | Maintenance round. The contrast MCP rejects hex values that are not 3 or 6 digits, so `#00000080` no longer reports 21:1. |
| [v3.2.28](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.28) | DeepSeek Harness becomes the eighth plugin door, shipped as a DSH bundle with an installer target for the shared `.agents/skills` folder. |
| [v3.2.29](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.29) | Muse Code becomes the ninth plugin door through its experimental plugin system, plus an installer target for `.agents/skills`. |
| [v3.2.30](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.30) | Kilo Code joins the installer on the shared `.agents/skills` folder, with the Scaffold Sidebar pattern and a `@clack/prompts` refresh. |
| [v3.2.31](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.31) | Qoder joins the installer on its own `.qoder/skills` folder with the `AGENTS.md` pointer, and `.qoder-plugin/plugin.json` makes the six skills importable in **Settings > Plugins**. The installer also names an installed plugin copy. |
| [v3.2.32](https://github.com/miqdadbadjuber/anti-slop/releases/tag/v3.2.32) | Qwen Code joins the installer on `.qwen/skills` with a `QWEN.md` pointer and the shared `.agents/skills` folder for a global install. No plugin door. |
