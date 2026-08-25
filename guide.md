# The antislop guide

antislop is a rules file you give to the AI assistant you already talk to, like ChatGPT, Claude, or Gemini. It stops that AI from making slop: pages and text that look generic and obviously made by AI. It is a filter, not a style guide. It never picks your colors or fonts. It removes the slop and leaves the direction to you.

## What is slop?

Slop is the default AI look and sound:

- The same color-fading banner at the top, the same rounded cards, the same "Unlock the power of..." headline.
- Text that sounds excited and says nothing.
- Pages that look fine in a screenshot but fail real people: text that blends into its background, keyboard-only users locked out.

If you have used AI to build a page or write a line of copy, you have seen slop. antislop exists to remove it.

## What you can use it for

antislop is not only for building pages. Any AI output that can get sloppy benefits:

- Build a new page or app: layout, color, parts of the page, animation, structure.
- Write or rewrite copy: headlines, buttons, emails, and tone that do not sound AI-made.
- Keep the page usable by people: readable colors, keyboard use, clear focus, and button states.
- Clean up code comments: remove the generic AI ones, keep the ones that matter.
- Check work you already have: it can list what to fix.

The main file (the core) covers all of it. Skills (see What is a skill?) go deeper into one concern when you want more.

## Why use it?

Without a filter, AI output looks and sounds the same everywhere. With antislop, the result is specific and alive, not just clean: every major choice needs a reason, written down.

One thing antislop does not do: make things pretty. It removes slop. If you have a specific look in mind, write it down in a file called DESIGN.md and the AI builds toward it. You don't have to make one. Without a DESIGN.md, the AI labels its work "draft without direction" instead of passing it off as finished (see Words used here).

## What you need

An AI assistant, and antislop itself. The easiest way in is one command in the terminal:

```bash
npx antislop-ai
```

It shows you what antislop has, you pick the skills you want and where to put them, and it sets everything up. No terminal? There is a manual way below that only needs one file.

The main file, `antislop.md`, holds all the rules and the wizard that installs skills manually. Skills are optional add-ons; you do not need any to start.

## What is a skill?

A skill is an optional folder (with a `SKILL.md` inside) that goes deeper into one concern. The core works alone; a skill adds depth for one topic.

- `antislop-ui`: look and feel. Layout, color, parts of the page, animation.
- `antislop-copywriting`: the text. Headlines, buttons, tone, made-up statistics.
- `antislop-human`: the people. Readable colors, keyboard use, clear focus, and button states.
- `antislop-layoutmobile`: the small screen. Layout that reflows on a phone, tap targets, navigation.
- `antislop-code`: the comments in your code. Remove the generic AI ones, keep the ones that carry information.

Pick the one that matches your work. UI work means `antislop-ui`. Copy work means `antislop-copywriting`. People work means `antislop-human`. Mobile layout work means `antislop-layoutmobile`. Code comments work means `antislop-code`. More than one? Ask for "All". None? The core alone is enough.

## How to install

**The one-command way (recommended).** Run this in the terminal:

```bash
npx antislop-ai
```

Pick the skills you want, choose "this project" or "everywhere", pick which agent(s) you use, and antislop installs itself and writes the pointer that loads it every session. The core is always on; the skills load only for the work you do.

**The skills directory.** Or install the skill folders straight from skills.sh, the open directory for agent skills:

```bash
npx skills add miqdadbadjuber/anti-slop
```

Add `--all` for every skill, `-g` for a global install, or `--skill <name>` for a single one. Run `--list` first to see what is available. The skills directory reads the skills straight from the GitHub repository, so it works as soon as the repository is live; there is no separate setup step. One caveat: skills.sh copies the skill folders but does not write the agent entry pointer that loads antislop every session; that is a skills.sh limitation, not antislop's. Use the one-command way instead, or run it afterwards to write the pointer.

**The plugin (Claude Code).** If you use Claude Code, add the marketplace once, then install the plugin:

```text
/plugin marketplace add https://github.com/miqdadbadjuber/anti-slop
/plugin install antislop@anti-slop
```

**Which agents does it work with?**

All of them, but the install path differs by agent:

- **The one-command way (`npx antislop-ai`) is recommended**: it installs the skill folders and writes the pointer that loads antislop every session, in one run. It works with Claude Code, Codex, Antigravity, OpenCode, Cursor, Gemini CLI, and Hermes, and detects which of those agents exist in your project (Hermes installs globally, into `~/.hermes/skills/`).
- **The skills directory** (`npx skills add`) copies the skill folders but writes no agent pointer; skills.sh does not write them. Use it for the folders only, then run the one-command way to add the pointer.
- **The plugin** is Claude Code only.
- **The manual way** works with any agent that reads plain Markdown, including a plain chat window (ChatGPT, Gemini, and so on).

**The manual way.** Three steps. Use this when you want no packaging at all, or a chat window you cannot run commands in.

**1. Download `antislop.md` once.** Two ways:

- From the browser: open the repository page (the GitHub page where the product's files live, [here](https://github.com/miqdadbadjuber/anti-slop)), open `antislop.md`, and click the Download button.
- From the terminal (the black window where you type commands):

  ```bash
  curl -o antislop.md https://raw.githubusercontent.com/miqdadbadjuber/anti-slop/main/antislop.md
  ```

**2. Put the file where your AI can read it, then tell it what you want.**

`antislop.md` is a plain text file, so the AI can read it. If your AI works with files (like Claude, Gemini, or Cursor), save `antislop.md` in the same folder as your work. Not sure which folder? Ask your AI where to put it. If your AI is a chat window (like ChatGPT on the web), open `antislop.md` in a text editor (Notepad works), copy everything, and paste it into the chat.

Then tell it what you want. Say:

> Read `antislop.md` and follow its install instructions. I want the UI and copywriting skill.

If you pasted the contents instead of giving the file, say: "Follow the install instructions I pasted. I want the UI and copywriting skill." The AI follows the instructions, downloads the skills you asked for, and saves a note to use them next time. That is the whole setup. Say "core only" to skip skills.

**3. Answer the wizard's questions.**

It confirms which skills you want and asks when antislop should apply: while the AI is working (during), or after the work is done, to check it (after). Pick "during" for new work.

Done. Want the one-command install instead? See the README, the product's main page, [here](README.md).

## Why is one file enough?

The main file holds everything: the rules and the wizard. Skills are optional depth, downloaded only when you need them. That keeps the filter light and your AI fast.

## Where is this going?

antislop is packaged: installable as skills, installable as a plugin, and still available as one file. Skills keep shipping as they are ready; the next one is `antislop-code`. See the roadmap, the page that lists what is coming next, [here](ROADMAP.md).

## Feedback

Found a new AI slop pattern, a rule that missed something, or an install that did not behave? Open an [issue](https://github.com/miqdadbadjuber/anti-slop/issues). It is the fastest way to make antislop sharper.

## Words used here

- **Slop**: output that looks or reads generic and AI-made.
- **Agent**: another word for your AI assistant, like ChatGPT, Claude, or Gemini.
- **Core**: `antislop.md`, the main file that holds all the rules and the wizard.
- **Skill**: an optional folder (`<name>/SKILL.md`) that goes deeper into one concern. The core works alone; a skill adds depth for one topic.
- **Copy**: the words on a page.
- **Contrast**: how clearly text stands out from its background.
- **Wizard**: the install instructions inside `antislop.md`. When you tell your AI to read the file, it follows them and asks you questions.
- **Filter**: removes the bad and keeps the good. antislop removes slop, not your direction.
- **UI**: the look of a page or app.
- **DESIGN.md**: a file you write with your UI direction: who it is for, the mood, the colors. antislop does not invent direction.

For the full product, see the [README](README.md).
