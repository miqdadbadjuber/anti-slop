# The antislop guide

antislop is a filter you give to the AI assistant you already use. It stops the AI from producing slop: pages, text, and code comments that look generic and obviously made by AI. It is a **filter, not a style guide**. It never picks your colors, fonts, or layout. It removes the slop and leaves the direction to you.

New to antislop? Read this top to bottom once. If you are here to install it, jump to [How to install](#how-to-install). It is written to answer the question people ask most: "how do I put this on my agent?"

## What is slop?

Slop is the default AI look and sound:

- The same color-fading banner at the top, the same rounded cards, the same "Unlock the power of..." headline.
- Text that sounds excited and says nothing.
- Pages that look fine in a screenshot but fail real people: text that blends into its background, keyboard-only users locked out.

If you have used AI to build a page or write a line of copy, you have seen slop. antislop exists to remove it.

## What you can use it for

Any AI output that can get sloppy benefits:

- Build a new page or app: layout, color, structure, animation.
- Write or rewrite copy: headlines, buttons, emails, and tone that do not sound AI-made.
- Keep the page usable by people: readable colors, keyboard use, clear focus, button states.
- Clean up code comments: remove the generic AI ones, keep the ones that matter.
- Check work you already have: it lists what to fix.

The core file covers all of it. Skills (see [What is a skill?](#what-is-a-skill)) go deeper into one concern when you want more.

## How to install

Pick the path that fits the tool you use. Three cases, three answers:

1. **I use a coding agent** (Claude Code, Codex, Antigravity, Cursor, OpenCode, Gemini CLI, or Hermes). Run one command. See [The one-command way](#the-one-command-way).
2. **I want the native plugin** on Claude Code, Antigravity, or Codex. See [The plugin doors](#the-plugin-doors).
3. **I only have a chat window** (ChatGPT on the web, plain Gemini, and so on) or no terminal. See [The manual way](#the-manual-way).

### The one-command way

Recommended for everyone who uses a coding agent. Run this in a terminal (the black window where you type commands):

```bash
npx antislop-ai
```

It shows you what antislop has, then asks three things:

- **Which agent(s) you use.** It detects the ones present in your project. Each agent reads antislop from its own folder, and the picker writes the pointer that reloads antislop in every session. Hermes installs globally (into `~/.hermes/skills/`) because it does not read project folders.
- **Which skills you want.** The core is always on. The extra skills load only for the work you do. See [What is a skill?](#what-is-a-skill).
- **Where antislop should live.** This project only, or everywhere on your machine.

That is the whole install. No agent entry file to write by hand, nothing else to run.

### The plugin doors

Claude Code, Antigravity, and Codex can also load antislop as a native plugin straight from this repository. The plugin points at the same shared skills, so there are no copies to keep in sync. Use one of these if you already run plugins on that agent.

**Claude Code.** Add the marketplace once, then install the plugin:

```text
/plugin marketplace add https://github.com/miqdadbadjuber/anti-slop
/plugin install antislop@anti-slop
```

**Antigravity.** One command installs the plugin (its `rules/` component loads antislop in every session):

```bash
agy plugin install https://github.com/miqdadbadjuber/anti-slop
```

**Codex.** Add the marketplace once, then install the plugin:

```bash
codex plugin marketplace add miqdadbadjuber/anti-slop
codex plugin add antislop@anti-slop
```

Which should you use, the one-command way or the plugin? Both load the same rules. The one-command way copies skill folders into your project and works on all seven agents. The plugin doors load straight from the repository and are per-agent, so if you switch projects there is nothing to reinstall. Start with the one-command way; add a plugin door later if you want the project-free setup.

### The manual way

Use this when you have no terminal, or when your AI is a chat window you cannot run commands in. Three steps:

**1. Download `antislop.md` once.** Two ways:

- From the browser: open the repository page [here](https://github.com/miqdadbadjuber/anti-slop), open `antislop.md`, and click the Download button.
- From the terminal:

  ```bash
  curl -o antislop.md https://raw.githubusercontent.com/miqdadbadjuber/anti-slop/main/antislop.md
  ```

**2. Give the file to your AI, then tell it what you want.**

`antislop.md` is plain text, so any AI can read it. If your AI works with files (Claude Code, Codex, Cursor, and similar), save the file in the same folder as your work. Not sure which folder? Ask your AI where to put it. If your AI is a chat window (ChatGPT on the web, and similar), open `antislop.md` in a text editor, copy everything, and paste it into the chat.

Then say:

> Read `antislop.md` and follow its install instructions. I want the UI and copywriting skill.

If you pasted the contents instead of giving the file, say: "Follow the install instructions I pasted. I want the UI and copywriting skill." The AI follows the instructions and sets antislop up. Say "core only" to skip skills.

**3. Answer the wizard's questions.**

It confirms which skills you want and asks when antislop should apply: while the AI is working (during), or after the work is done, to check it (after). Pick "during" for new work.

That is the whole manual setup.

### Where each agent reads antislop from

The one-command way installs into the folder your agent reads. This is what it writes and where:

| Agent | Reads antislop from |
|-------|---------------------|
| Claude Code | `.claude/skills/` |
| Codex | `.codex/skills/` |
| Antigravity | `.agents/skills/` |
| OpenCode | `.opencode/skills/` |
| Cursor | `.cursor/skills/` |
| Gemini CLI | `.gemini/skills/` |
| Hermes | `~/.hermes/skills/` (global only) |

## What is a skill?

A skill is an optional folder (with a `SKILL.md` inside) that goes deeper into one concern. The core works alone; a skill adds depth for one topic. Skills reference the core rules by number and never duplicate them, so adding one does not change the core.

There are five skills. Pick the one that matches your work:

- **UI work** (look and feel: layout, color, components, animation) → antislop-ui
- **Copy work** (headlines, buttons, tone, made-up statistics) → antislop-copywriting
- **People work** (readable colors, keyboard use, focus, button states) → antislop-human
- **Mobile layout work** (reflowing on a phone, tap targets, navigation) → antislop-layoutmobile
- **Code comments work** (remove generic AI comments, keep the valuable ones) → antislop-code
- **More than one kind of work** → pick several. The picker lets you choose as many as you want.
- **None of these** → fine. The core alone is a complete filter.

The names above are what you pick in the one-command way and what the wizard asks for in the manual way.

## What antislop does not do

It never beautifies on its own. antislop removes slop; it does not invent direction. If you have a specific look in mind, write it down in a file called `DESIGN.md` in your project and the AI builds toward it. You do not have to make one. Without a `DESIGN.md`, the AI labels its work "draft without direction" instead of passing it off as finished. A sterile result means the direction was missing, not that the filter failed.

## Where is this going?

antislop is packaged three ways at once: standard skill folders, native plugins for Claude Code, Antigravity, and Codex, and the single-file core that works anywhere. Agent support grows over time. For the current release and what comes next, see the [roadmap](ROADMAP.md). For the full picture of every skill, see the [README](README.md).

## Feedback

Found a new AI slop pattern, a rule that missed something, or an install that did not behave? Open an [issue](https://github.com/miqdadbadjuber/anti-slop/issues). It is the fastest way to make antislop sharper.

## Words used here

- **Slop**: output that looks or reads generic and AI-made.
- **Agent**: another word for your AI assistant, like Claude Code, Codex, Cursor, ChatGPT, or Gemini.
- **Core**: `antislop.md`, the main file that holds all the rules and the wizard.
- **Skill**: an optional folder (`<name>/SKILL.md`) that goes deeper into one concern. The core works alone; a skill adds depth for one topic.
- **Wizard**: the install instructions inside `antislop.md`. When you tell your AI to read the file, it follows them and asks you questions.
- **Picker**: the interactive installer (`npx antislop-ai`) that asks you what to install and where.
- **Copy**: the words on a page.
- **Contrast**: how clearly text stands out from its background.
- **Filter**: removes the bad and keeps the good. antislop removes slop, not your direction.
- **UI**: the look of a page or app.
- **DESIGN.md**: a file you write with your UI direction: who it is for, the mood, the colors. antislop does not invent direction.

For the full product, see the [README](README.md).
