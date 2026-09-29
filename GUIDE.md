# The antislop guide

antislop is a filter you give to the AI assistant you already use. It stops that assistant producing slop: pages, text, and code comments that look generic and obviously made by AI.

This guide goes from zero to installed. Every route below carries its own update and removal in the same place, so you pick one route once and never have to look anywhere else for it. New to antislop? Read [What is antislop?](#what-is-antislop) and [What is slop?](#what-is-slop) first.

## Table of Contents

- [What is antislop?](#what-is-antislop)
- [What is slop?](#what-is-slop)
- [What you can use it for](#what-you-can-use-it-for)
- [Install, update, and remove](#install-update-and-remove)
  - [Which route should I pick?](#which-route-should-i-pick)
  - [Before you start](#before-you-start)
  - [The installer](#the-installer)
  - [The skills directory](#the-skills-directory)
  - [Claude Code plugin](#claude-code-plugin)
  - [Antigravity plugin](#antigravity-plugin)
  - [Codex plugin](#codex-plugin)
  - [Cursor plugin](#cursor-plugin)
  - [Kimi Code plugin](#kimi-code-plugin)
  - [Cline plugin](#cline-plugin)
  - [Oh My Pi plugin](#oh-my-pi-plugin)
  - [The Pi package](#the-pi-package)
  - [The single file](#the-single-file)
  - [On a phone](#on-a-phone)
- [Skills](#skills)
  - [antislop](#antislop)
  - [antislop-ui](#antislop-ui)
  - [antislop-copywriting](#antislop-copywriting)
  - [antislop-human](#antislop-human)
  - [antislop-layoutmobile](#antislop-layoutmobile)
  - [antislop-code](#antislop-code)
- [Reference](#reference)
  - [Which version do I have?](#which-version-do-i-have)
  - [Where each agent reads antislop from](#where-each-agent-reads-antislop-from)
  - [What is a skill?](#what-is-a-skill)
  - [What antislop does not do](#what-antislop-does-not-do)
- [Something is wrong](#something-is-wrong)
- [Where is this going?](#where-is-this-going)
- [Contributing](#contributing)

## What is antislop?

A rulebook the assistant reads every session, plus optional skills that go deeper into one kind of work.

- **38 rules in three tiers.** Hard Gate rules are absolute. The other two ask whether a choice has a purpose, and reject technique that has none.
- **A Delivery Gate.** Before anything ships, the assistant runs a mandatory PASS/FAIL report you can check.
- **A Liveliness Toolkit.** Three dials and a Design Read, so the result comes out alive rather than merely clean.
- **Six skills.** One core that always loads, plus five that load only when a task needs them.
- **Two usage modes.** During guides the work as it is built. After audits work you already have and lists what to fix.

It is a filter, not a style guide: it never picks your colors, fonts, or layout. Direction stays yours, in a `DESIGN.md` you write or in what you tell the assistant.

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

## Install, update, and remove

There are eleven routes in, and the difference between them matters more than it looks:

| Route | What it does | Works on |
|-------|--------------|----------|
| The installer | Copies the skill folders into your project or your home folder | Twelve agents, no setup beyond a terminal |
| The skills directory | Copies the same folders using the skills.sh tool | The agents that directory supports |
| Seven plugin doors | Loads antislop straight from this repository, nothing copied | Claude Code, Antigravity, Codex, Cursor, Kimi Code, Cline, Oh My Pi |
| The Pi package | Loads antislop through Pi's own package manager, nothing copied | Pi |
| The single file | One Markdown file you hand to any AI | Anything that reads text, including a phone |

Those five rows are eleven routes: one installer, one directory, seven plugin doors, one package, and one file.

Pick one. They load the same rules, so adding a second only gives you a second thing to keep updated.

Every route below is built the same way: a one-line summary, then three headings in the same order, **Install**, **Update**, and **Remove**. Nothing updates by itself unless the route says so.

One thing is true of all of them: an agent loads skills when a session starts, so after installing or updating, close the session you are in and open a new one. Until you do, the old rules are the ones still loaded.

### Which route should I pick?

- The installer, if you want antislop in one project or everywhere, and you use any of the twelve agents. It is the only route that covers OpenCode, Amp, Gemini CLI, Hermes, and GitHub Copilot, and the only one that detects your agents for you.
- The skills directory, if you already use that directory's tool and want the folders without the installer's questions. It writes no pointer, so antislop reloads by description alone.
- A plugin door, if you use one of the seven agents that has one. A plugin is a feature of the agent, not of antislop: you point the agent at this repository once and it loads antislop from there. Nothing is copied into your project, so there is no snapshot that can quietly go stale, and a new version arrives by running the agent's own plugin update command rather than an installer.
- The Pi package, if you use Pi and would rather have it installed and updated by Pi itself, from the same repository.
- The single file, if you have no terminal, or you want antislop in a chat window or on a phone.

### Before you start

Ten of the eleven routes need a terminal, the window where you type commands instead of clicking. If you do not have one, or you cannot install software on this machine, go straight to [The single file](#the-single-file).

Here is how to open a terminal:

- Windows: press the Start button, type `powershell`, and open it.
- macOS: press Cmd and Space together, type `terminal`, and press Enter.
- Linux: open your terminal.

You also need Node.js 18 or newer. Check it by typing this and pressing Enter:

```bash
node -v
```

If you see something like `v22.11.0`, you are ready. If you see an error instead, install Node from [nodejs.org](https://nodejs.org) first, then close the terminal and open it again so it picks up the new command.

### The installer

*Copies the skill folders into the folder you choose, and writes the pointer that reloads antislop every session.*

It covers twelve agents and detects which ones you have.

#### Install

1. Go to your project folder. The terminal starts in your home folder, so tell it where your project is:

   ```bash
   cd ~/projects/my-site
   ```

   Use your real path. On Windows it might look like `cd C:\Users\You\projects\my-site`. If you would rather not type it, type `cd ` with a space after it and drag the folder into the terminal window, which fills the path in for you.

   Not sure it worked? Type `ls` (macOS and Linux) or `dir` (Windows) and press Enter. You should see your project's files.

2. Run the installer.

   ```bash
   npx antislop-ai
   ```

   The first run downloads antislop, so give it a few seconds.

3. Answer four questions. Use the arrow keys to move, Space to select, and Enter to confirm.

   - Extra skills to install. The core is already on and always included. Pick the extra skills that match your work, or pick none. See [What is a skill?](#what-is-a-skill) if you are not sure.
   - Install location. `This project` writes into the folder you are standing in and adds the pointer that reloads antislop in every session. `Everywhere` writes into your home folder and covers all your projects, with no pointer. Choose `This project` the first time.
   - Which agent(s). It pre-checks the agents it found in your project. Pick yours. If yours is not pre-checked, pick it anyway; the installer creates the folder.
   - Install N skill(s) now? Yes.

4. Check what it printed.

   ```
   ◇ Pointer written to AGENTS.md
   └ Installed 2 skill(s) into 1 agent folder(s).
   antislop is ready. The next agent session loads it.
   ```

5. Start a new agent session. antislop loads when a session starts, so the window you already have open will not see it. Close it and open it again.

   To confirm it is loaded, ask your agent something only the rules would answer, such as "what does antislop's R-02 say?" If it answers from the rules, you are done.

#### Update

The installer copies files, so your project holds a snapshot. There are two ways to replace it, and the first covers the skills directory route as well, because both write the same folders into the same places and nothing on disk records which one you used:

```bash
npx antislop-ai --update
```

It looks in the current project and in your home directory, replaces every antislop folder it finds, keeps the skill selection each folder was installed with, and prints the release it replaced next to the one it wrote. It asks nothing, so it is also the one to use in a script.

The second way is to run the install command again:

```bash
npx antislop-ai
```

Answer the questions exactly as you did the first time. When it reaches folders you already have, it prints what it found before asking anything:

```
▲ Already here: antislop 3.2.10. This installer carries 3.2.13.
```

Then it asks one extra question:

- `Overwrite them` replaces your copies with the version it just downloaded. This is the update.
- `Keep what is there` leaves your old files alone and installs nothing.

Pick `Overwrite them`. Nothing of yours is at risk: the installer only writes inside the skill folders it created, and its pointer block is replaced in place rather than added a second time, so running it ten times leaves one block and not ten. If you pick `Keep what is there` by mistake, nothing breaks; you are simply still on the old version, and the installer says so.

To see which version the installer would fetch before you run it:

```bash
npx antislop-ai --version
```

#### Remove

Two things to delete.

1. The skill folders it copied. Each looks like `antislop` or `antislop-something`, sitting inside your agent's skills folder (`.claude/skills/`, `.agents/skills/`, and so on; see [Where each agent reads antislop from](#where-each-agent-reads-antislop-from)). Delete only those folders.
2. The pointer block in your entry file. Open `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`, find the part between `<!-- antislop:start -->` and `<!-- antislop:end -->`, and delete it including those two marker lines. If that file holds nothing else, delete the file.

Nothing else was added to your project.

### The skills directory

*The same folders the installer writes, copied by skills.sh instead, and with no questions.*

[skills.sh](https://skills.sh/miqdadbadjuber/anti-slop) is an open directory of agent skills, and antislop is listed there. This route uses that directory's own tool.

#### Install

```bash
npx skills add miqdadbadjuber/anti-slop
```

Add `-g` for a global install, `--skill <name>` for one skill, or `--skill '*'` for every skill. Run `--list` first to see what is available.

What it does not do is write the pointer that reloads antislop every session. If you want that pointer as well, run `npx antislop-ai` afterwards, pick the same skills and the same agent, and choose `Keep what is there` when it says the folders already exist. That keeps the copies you already have and adds only the pointer.

#### Update

The directory's own tool updates what it installed:

```bash
npx skills update
```

It asks which scope to update. `-p` narrows that to this project, `-g` to the global copies, and `-y` skips the question.

`npx antislop-ai --update` covers this route too, for the reason given under [The installer](#the-installer).

#### Remove

```bash
npx skills remove
```

With no skill names it shows a selection menu, `--all` takes every skill it installed, and `-g` removes the global copies rather than the ones in this project.

This route writes the same folders the installer writes and no pointer, so removing them by hand works too: that is the first of the two steps listed under [The installer](#the-installer). There is no pointer block to remove.

### Claude Code plugin

*Loads antislop through Claude Code's own plugin system. Nothing is copied into your project.*

#### Install

In a Claude Code session, run these two:

```text
/plugin marketplace add https://github.com/miqdadbadjuber/anti-slop
/plugin install antislop@anti-slop
```

#### Update

Claude Code switches automatic updates off for third-party marketplaces, so this one is manual:

```bash
claude plugin update antislop@anti-slop
```

If you would rather it updated itself, open `/plugin`, go to Marketplaces, select `anti-slop`, and enable auto-update. Either way, Claude Code keeps its own copy of the plugin under `~/.claude/plugins/cache/`, so restart it or run `/reload-plugins` for the new version to take effect.

#### Remove

```text
/plugin uninstall antislop@anti-slop
```

Adding the marketplace and installing the plugin are two separate steps, so removing the plugin leaves the marketplace behind. `/plugin marketplace remove anti-slop` removes that too, and it also uninstalls any plugin that came from it.

### Antigravity plugin

*Loads antislop through Antigravity's own plugin system. Nothing is copied into your project.*

#### Install

```bash
agy plugin install https://github.com/miqdadbadjuber/anti-slop
```

Its `rules/` component loads antislop in every session, so there is no pointer to write and nothing else to do.

#### Update

Antigravity has no plugin update command, so run the same install command again. It clones fresh and replaces the plugin folder:

```bash
agy plugin install https://github.com/miqdadbadjuber/anti-slop
```

#### Remove

```bash
agy plugin uninstall antislop
```

`agy plugin disable antislop` switches it off without deleting it. The plugin lives in `~/.gemini/config/plugins/antislop/`.

### Codex plugin

*Loads antislop through Codex's own plugin system. Nothing is copied into your project.*

#### Install

```bash
codex plugin marketplace add miqdadbadjuber/anti-slop
codex plugin add antislop@anti-slop
```

#### Update

```bash
codex plugin marketplace upgrade anti-slop
```

That one command is both the marketplace refresh and the plugin update, because the plugin installs from a folder inside the same repository. There is no `codex plugin update`.

#### Remove

```bash
codex plugin remove antislop@anti-slop
```

### Cursor plugin

*Loads antislop through Cursor's own plugin marketplace. Nothing is copied into your project.*

#### Install

Add the repository as a plugin marketplace with the Cursor Agent CLI:

```bash
agent plugin marketplace add https://github.com/miqdadbadjuber/anti-slop
```

Then, inside Cursor, open Customize in the sidebar, find antislop, and select Install, choosing project or user scope. From the dashboard, Dashboard → Plugins → Add Marketplace → Import from Repo does the same.

#### Update

Cursor indexes the marketplace on its own side, so a new version arrives when that index refreshes:

```bash
agent plugin marketplace update https://github.com/miqdadbadjuber/anti-slop
```

In the dashboard you can also enable Auto Refresh for the marketplace, or press Refresh by hand. Cursor re-indexes a marketplace at most once every ten minutes. If new plugins were added to the repo, re-importing the repository URL is what picks them up.

#### Remove

Cursor documents no plugin uninstall command, so remove the plugin from the Customize panel. To drop the marketplace as well:

```bash
agent plugin marketplace remove anti-slop
```

### Kimi Code plugin

*Loads antislop through Kimi Code's own plugin system. Nothing is copied into your project.*

#### Install

In a Kimi Code session:

```text
/plugins install https://github.com/miqdadbadjuber/anti-slop
```

The URL resolves to the latest release. Plugin changes do not reach the session you ran the command in, so run `/reload` or `/new` afterwards. Kimi Code installs plugins per user, and has no project scope for them, so one install covers every project. Its `systemPromptPath` loads the antislop pointer in every session, so there is nothing else to do.

#### Update

Kimi Code has no plugin update command, so run the same install command again:

```text
/plugins install https://github.com/miqdadbadjuber/anti-slop
```

`/plugins` then Enter on the antislop row in the Installed tab does the same. Either way, run `/reload` or `/new` after it.

#### Remove

```text
/plugins remove antislop
```

It asks for confirmation. `/plugins disable antislop` switches it off without removing it. Removing only deletes the installation record, so the copy under `$KIMI_CODE_HOME/plugins/managed/antislop/` (default `~/.kimi-code/plugins/managed/antislop/`) stays on disk until you delete it.

### Cline plugin

*Loads antislop through the Cline CLI's own plugin system. Nothing is copied into your project.*

#### Install

```bash
cline plugin install https://github.com/miqdadbadjuber/anti-slop.git
```

The plugin registers no tools and no hooks. Its whole payload is the `skills/` folder it bundles, which Cline discovers when the plugin is installed, so there is no pointer to write and nothing is copied into your project.

> **Before you pick this one.** Cline's own documentation limits plugins to the SDK, the CLI, and Kanban, and states that the feature does not apply to the VS Code and JetBrains extensions. So this door is for a Cline CLI install. If you run Cline inside an editor, use [The installer](#the-installer) instead: it writes the same skills into `.cline/skills/`, which both the CLI and the extensions read.

#### Update

Cline replaces an existing install only when you say so, so the update carries `--force`:

```bash
cline plugin install https://github.com/miqdadbadjuber/anti-slop.git --force
```

Without it, Cline keeps what is installed and tells you so.

#### Remove

Cline documents no plugin uninstall command, only `cline plugin install`, so delete the plugin's folder under `~/.cline/plugins/_installed/` instead. Nothing was copied into your project, so that is the whole removal.

### Oh My Pi plugin

*Loads antislop through Oh My Pi's own plugin system. Nothing is copied into your project.*

#### Install

Oh My Pi reads the catalog this repository keeps at `.omp-plugin/marketplace.json`, and it resolves the plugin's manifest from there: `.claude-plugin/plugin.json`, the same file the Claude Code door uses, is what points at the `skills/` folder. Add the marketplace once, then install the plugin:

```bash
omp plugin marketplace add miqdadbadjuber/anti-slop
omp plugin install antislop@anti-slop
```

Or from inside an active Oh My Pi session:

```text
/marketplace add miqdadbadjuber/anti-slop
/marketplace install antislop@anti-slop
```

#### Update

```bash
omp plugin marketplace update anti-slop
omp plugin upgrade antislop@anti-slop
```

#### Remove

```bash
omp plugin uninstall antislop@anti-slop
```

To drop the marketplace as well:

```bash
omp plugin marketplace remove anti-slop
```

### The Pi package

*Pi fetches and installs the skills itself, from the `pi` key in this repository's root `package.json`.*

It is the one route here that is not a plugin and not a folder copy.

#### Install

```bash
pi install git:github.com/miqdadbadjuber/anti-slop
```

That writes the package declaration to `~/.pi/agent/settings.json`, so it covers every project. Add `-l` to write it to this project's `.pi/settings.json` instead, where it covers this repository only.

> **Pi will ask you to trust the project.** Everything Pi loads out of a project is gated behind that decision, including the skills, and it has no command for granting it the way Hermes does. Pi asks on the first run; `/trust` saves your answer for later sessions, and `--approve` answers it once for an automated run. Context files are the exception, so `AGENTS.md` loads either way.

Pi also reads the shared `.agents/skills/` folder at both scopes, so the installer reaches it too. If you would rather not have Pi hold a package declaration of its own, that is the route to use.

#### Update

Let Pi reconcile what it has installed, which covers antislop and anything else you added:

```bash
pi update --extensions
```

Running the install command again works as well. Nothing is copied into your project by this route, so there is no folder to replace and no pointer to refresh. If you installed with `-l`, the declaration is in this project's `.pi/settings.json` and loads after project trust is granted.

#### Remove

```bash
pi remove git:github.com/miqdadbadjuber/anti-slop
```

That deletes the entry from Pi's `packages` list, in `~/.pi/agent/settings.json` or in this project's `.pi/settings.json` if you installed with `-l`. `pi list` shows what Pi still has configured. Nothing was copied into your project by this route, so that is the whole removal.

### The single file

*One Markdown file you hand to any AI. No terminal needed, and nothing installed.*

Use this when you have no terminal, or when your AI is a chat window you cannot run commands in. `antislop.md` is plain text, so any AI can read it.

#### Install

1. Download `antislop.md` once. Two ways:
   - From the browser: open the repository page [here](https://github.com/miqdadbadjuber/anti-slop), open `antislop.md`, and click the Download button.
   - From the terminal:

     ```bash
     curl -o antislop.md https://raw.githubusercontent.com/miqdadbadjuber/anti-slop/main/antislop.md
     ```

2. Give the file to your AI, then tell it what you want.

   If your AI works with files (Claude Code, Codex, Cursor, and similar), save the file in the same folder as your work. Not sure which folder? Ask your AI where to put it. If your AI is a chat window (ChatGPT on the web, and similar), open `antislop.md` in a text editor, copy everything, and paste it into the chat.

   Then say:

   > Read `antislop.md` and follow its install instructions. I want the UI and copywriting skill.

   If you pasted the contents instead of giving the file, say: "Follow the install instructions I pasted. I want the UI and copywriting skill." The AI follows the instructions and sets antislop up. Say "core only" to skip skills.

3. Answer the wizard's questions. It confirms which skills you want and asks when antislop should apply: while the AI is working (during), or after the work is done, to check it (after). Pick "during" for new work. With no saved preference, the agent keeps asking in every new session. To opt out, run `npx antislop-ai --mode during` (or `after`); `--mode ask` restores the question and `--mode` alone shows the setting. The shared setting lives in `~/.config/antislop/settings.json` on Linux and macOS, and `%APPDATA%\antislop\settings.json` on Windows, falling back to `~/.config` if `%APPDATA%` is unset. The skill announces the active mode and its source; an explicit mode requested in chat overrides the saved preference for that session.

#### Update

Download the file again and replace your copy. There is nothing else to update, since this route installs no folders.

#### Remove

Delete the `antislop.md` file you downloaded. If you attached it to a chat project instead of keeping it as a file, remove it from that project's reference material.

### On a phone

*The single file route, plus the one question a phone adds: how to hand the file to the app.*

The installer, the skills directory, and the plugin doors all need a terminal, so none of them runs on a phone. Updating and removing are the same as [The single file](#the-single-file).

- Claude Projects, ChatGPT Projects, and Gemini Gems all accept a file as reference material, and all three work on a phone. Download `antislop.md`, attach it to the project, and add a short instruction telling the AI to follow it. This is the simplest route and the one to try first. A 50 KB file is far below every limit these products publish.
- Claude Skills is the second option, and the one that behaves most like a real install. Claude can take antislop as a skill, and skills run in the Claude apps. The upload screen is on the web, so do this part at a computer: turn on code execution under Settings and Capabilities, then go to Customize and add a skill. Each antislop skill is a folder holding a `SKILL.md`, so zip the folder with the folder itself at the top level and upload that. Upload the core (`antislop`) as well, because the other skills reference the core rules by number instead of repeating them.
- One honest difference. In a coding agent, antislop arrives as a skill, which is an instruction the agent is built to follow. In a chat app it arrives as reference material the AI is meant to follow. It is context, not a gate, and no chat app runs the Delivery Gate for you. The rules still do real work on tone and structure, but nothing enforces them.
- Do not try to install it from a terminal on a phone. Android has Termux and it can run Node, but it is officially experimental. On iOS there is no supported way at all.

## Skills

The core is always loaded. The five skills load only when your task needs them. Here is what each one does, so you can see what you are getting before you install.

<!-- antislop:skills:start -->
### antislop

The core, and it is always loaded. All 38 rules and the Delivery Gate live here, so every task gets them whether or not you pick anything else. The five skills below add depth to it.

### antislop-ui

Load it when the AI builds or restyles anything you can see: color, layout, cards, buttons, motion.

| What it covers | The patterns it names |
|----------------|-----------------------|
| Visual & Color | Generic Blue-Purple Gradient, Excessive Glassmorphism, Excessive Border Radius, Overly Soft Shadows, Glow Everywhere, Background Grid, Dark Mode Default for No Reason, Too Many Colors in the Palette, Excessive Accent Color, Sterile Default |
| Layout & Components | Monotonous Template Layout, Copy-Paste Feature Cards, Bento Grid, Uniform Spacing, "How It Works" Always 3 Steps, "Trusted By" Logo Bar, "Most Popular" Pricing Card, Demo Without a Product, 4-Column Template Footer, Uniform Section Rhythm |
| Decorative Elements | Generic AI Icons, Lucide Icons, Emoji as Decoration, Small Arrows on Every Button, Colored Left Stripe, AI Capsule Badges, Eyebrow Badge Above the Headline, Decorative Status Dot, Generic AI Typography, Fake Terminal Window, Illustrations With No Connection |
| Structural & Flow | Dead Navigation, Non-Functional Controls, Sections That Fill a Template |
| App & Dashboard | Default Dashboard Shell, Stat Cards With Invented Numbers, Filler Activity Feed, Charts Without a Question, Generic Table Columns, Filler Data in Fields and Columns, Placeholder Empty and Loading States |
| Motion | Endless Pulses and Loops, Template Animations Stacked |

### antislop-copywriting

Load it when the AI writes or edits text: headlines, buttons, emails, or a page of prose. It removes the excited, empty voice and the made-up numbers.

| What it covers | The patterns it names |
|----------------|-----------------------|
| Tone & Voice | Empty AI Vocabulary, Significance Inflation, Empty Claims and Social Proof with No Evidence, Weasel Attributions, Persuasive Authority Tropes, Chatbot Closers, Fake-Candid Openers, Signposting Announcements, All-Caps Emphasis, Actorless Passive, Inanimate Subject, Human Verb |
| Rhythm & Structure | Rule of Three Overuse, Negative Parallelism and Tailing Negations, Aphorism Formulas, Staccato Drama, Synonym Cycling, False Ranges |
| Honesty & Evidence | Fabricated Specifics, Speculative Gap-Filling, Generic Positive Conclusion |
| Hygiene & Markdown | Em Dashes, Boldface Overuse, Excessive Quotation Marks, Inline-Header Lists, Emojis in Headings, Filler Phrases, Excessive Hedging |

### antislop-human

Load it when real people have to use the result. Readable colors, keyboard use, visible focus, button states, and the contrast checker.

| What it covers | The patterns it names |
|----------------|-----------------------|
| Color & Contrast | Low-Contrast Text, Text Over a Photo or Gradient, The Grey-on-Grey Hallucination, Non-Text Contrast |
| Keyboard | Removed Focus Outline, Mouse-Only Patterns, Broken Tab Order |
| Focus & States | Weak or Invisible Focus Indicator, Color-Only Feedback, Missing UI States |
| Zoom & Mobile Use | Text That Cannot Zoom, Mobile Keyboard Covers the Form |

### antislop-layoutmobile

Load it when the same page has to work on a phone and on a desktop. Reflow, breakpoints, overflow, tap targets, mobile navigation.

| What it covers | The patterns it names |
|----------------|-----------------------|
| Breakpoints | Desktop-Only Layout, Breakpoint Driven by Device List, Mobile Styled Last, Two-State Layout |
| Scale & Sizing | Desktop-Sized Everything, Fixed Pixel Type, 100vh Sections, Huge Empty Padding |
| Grids & Stacking | Columns That Don't Collapse, Fixed-Width Grid, Forced 12-Column |
| Overflow | Horizontal Scroll Leak, Overflow Hidden Clipping, Fixed-Width Children |
| Tap Targets | Under-Sized Targets, Targets Too Close, Hover-Only Interactions |
| Mobile Navigation | Nav That Stays Desktop, The Bare Hamburger, Bottom Nav That Eats Content, Sticky Nav Steals the Screen |

### antislop-code

Load it when the AI writes or reviews code comments. It removes the ones an AI adds out of habit and keeps the ones that carry information.

| What it covers | The patterns it names |
|----------------|-----------------------|
| Comments That Add Nothing | Decorative Separators, Restating the Obvious, Workflow Narration, Empty Labels, Vague Placeholders, Signature Echo, Decorative Emoji, End Markers |
| How It Should Read | The Over-Explained Comment, Line-by-Line Narration, Stiff or Loud Wording |
<!-- antislop:skills:end -->

## Reference

The rest of this guide is things you look up rather than steps you follow.

### Which version do I have?

Nothing notifies you that a new version is out. Two places always carry the current one: the [releases page](https://github.com/miqdadbadjuber/anti-slop/releases) and the version badge at the top of the [README](README.md).

To find out what you have, open the installed `antislop` folder and read its `VERSION` file, which names the release it came from. Or ask your agent "which antislop version is installed?" and it reads the file for you. A folder with no `VERSION` file predates that file, so it is old enough to update without checking anything else. The installer route can skip this entirely, because it prints both versions itself.

### Where each agent reads antislop from

The installer writes into the folder your agent reads. This is what it writes and where:

| Agent | Reads antislop from |
|-------|---------------------|
| Claude Code | `.claude/skills/` |
| Codex | `.codex/skills/` |
| Antigravity | `.agents/skills/` |
| OpenCode | `.opencode/skills/` |
| Cursor | `.cursor/skills/` |
| Cline | `.cline/skills/` |
| Amp | `.agents/skills/` |
| Gemini CLI | `.gemini/skills/` |
| Hermes | `.hermes/skills/` |
| GitHub Copilot | `.agents/skills/` |
| Kimi Code | `.agents/skills/` |
| Pi | `.pi/skills/` |

#### Global installs differ for five agents

A global install writes the same folder under your home directory, with five exceptions.

- OpenCode documents its global skills folder as `~/.config/opencode/skills/`, so the installer writes there rather than to `~/.opencode/skills/`, which OpenCode still reads but does not document.
- Antigravity reads a project's `.agents/skills/`, but under your home directory it reads `~/.gemini/config/skills/` and not `~/.agents/skills/`, so the installer writes there on a global install.
- Codex goes the other way: it marks its own `~/.codex/skills/` as the deprecated user location and documents `~/.agents/skills/` in its place, so a global Codex install writes the shared folder.
- Amp documents `~/.config/agents/skills/` as its user-level folder, so a global install writes there and not to `~/.agents/skills/`, which Amp still reads at a lower rank.
- Pi is the fifth: a project install writes `.pi/skills/`, and `~/.pi/agent/skills/` at user level, which is not the shared folder either.

Copilot, OpenCode, Kimi Code, and Pi read that home-level folder too, so a global install reaches them through the folder name a project install uses.

#### Four agents share one folder

Antigravity, Copilot, Kimi Code, and Amp all read `.agents/skills/`. Copilot also reads `.github/skills/` and `.claude/skills/`, and Kimi Code also reads `.kimi-code/skills/`, but there is no reason to write a second copy, so picking them together installs once.

Cline is the exception to the pattern: its own folder is `.cline/skills/`, and it reads `.claude/skills/` beside it, so there is a real second copy to worry about. Amp and Pi sit in both groups, because each shares the folder above and also reads a second one.

#### Six agents read more than one folder, and that is a problem

OpenCode loads skills from `.opencode/skills/`, `.claude/skills/`, and `.agents/skills/`, and its documentation asks that skill names be unique across every location while never saying which copy wins if they are not. Codex walks `.agents/skills/` up from the working directory, Hermes reads both `.hermes/skills/` and `.agents/skills/`, Cline and Amp each load `.claude/skills/` beside their own folder, and Pi loads `.agents/skills/` beside its own.

So a collision takes two selections: OpenCode, Cline, or Amp beside Claude Code, or Codex, Hermes, or Pi beside any of Antigravity, Copilot, Kimi Code, or Amp, or OpenCode beside any of those. The same skill names then land in two folders that one agent reads. The installer names that when it happens, and the fix is to remove the copy you do not need, usually the `.opencode/skills/` one, since OpenCode reads the other folder by its own documentation.

Two of the six also resolve a collision that comes from scope rather than from two folders, and they resolve it the unusual way round: Cline and Amp both let a global skill outrank a project skill of the same name, so a stale global install silently wins over a fresh project one. Their own documentation is the source for that. Pi settles a collision of its own, in the opposite direction: project `.pi/skills/` outranks both the shared `.agents/skills/` and the user-level `~/.pi/agent/skills/`, which its own loader was read for. The other agents here do not settle it.

#### The pointer file each agent reads

On a project install the installer also writes the pointer that reloads antislop every session: into the project's `AGENTS.md` for Codex, Antigravity, OpenCode, Cursor, Cline, Amp, Hermes, Copilot, Kimi Code, and Pi, into `CLAUDE.md` for Claude Code, and into `GEMINI.md` for Gemini CLI.

For OpenCode that is the whole mechanism: it loads the skill folders from `.opencode/skills/` and reads the pointer from `AGENTS.md`, which was verified against the opencode CLI.

#### Claude Code reads AGENTS.md too, since v2.1.277

antislop still writes `CLAUDE.md` for it, because the two are not equal: Claude reads `AGENTS.md` only when no `CLAUDE.md` or `CLAUDE.local.md` exists in the working directory or any directory above it. In a project that has one, an `AGENTS.md`-only pointer would be ignored without an error. The setting under Project instructions in `/config` can change that, and `AGENTS.md` is not read at all on Bedrock, Vertex, or Foundry.

#### Hermes needs one more step

Hermes reads a project's `.hermes/skills/`, and a project's skills outrank your global ones, but it will not load skills out of a cloned repository until you say that repository is yours. After a project install, run this once in that project:

```bash
hermes skills trust
```

It prints the folder it trusted and how many skills will now load. Hermes tells you this itself, with a banner naming the command, so a forgotten step is loud rather than silent. Run `hermes skills untrust` to take it back.

> **One caveat on versions.** Project skills are a newer Hermes feature. The official installer tracks the newest code and has it. The `hermes-agent` package on PyPI is older and does not, so if `hermes skills trust` is not a command your Hermes knows, either update Hermes or install antislop globally instead.

#### Pi needs one more step, and it is not the same one

Pi gates everything it loads out of a project, including `.pi/skills/` and the shared `.agents/skills/`, behind a trust decision. Unlike Hermes, Pi has no command for granting it: Pi asks on the first run and remembers the answer once you give it, `/trust` saves that answer for later sessions, and `--approve` answers it once for a single automated run. The setting `defaultProjectTrust` decides what happens when Pi cannot ask, in print, JSON, or RPC mode.

Context files are not gated, so the `AGENTS.md` pointer loads either way. That is the part worth knowing: the skills stay dark until you answer, while the pointer is already there telling you antislop is installed.

#### Gemini CLI is legacy support

Consumer access ended on 18 June 2026 and Antigravity replaced it, but it was not a total shutdown: enterprise Code Assist licenses and paid API keys still work, and the repository is still maintained. The installer still writes into `.gemini/skills/` for existing Gemini CLI setups.

### What is a skill?

A skill is an optional folder (with a `SKILL.md` inside) that goes deeper into one concern. The core works alone; a skill adds depth for one topic. Skills reference the core rules by number and never duplicate them, so adding one does not change the core.

There are five skills on top of the core. Pick the one that matches your work:

- UI work (look and feel: layout, color, components, animation) → antislop-ui
- Copy work (headlines, buttons, tone, made-up statistics) → antislop-copywriting
- People work (readable colors, keyboard use, focus, button states) → antislop-human
- Responsive layout work (reflowing across every screen width, phone to desktop, tap targets, navigation) → antislop-layoutmobile
- Code comments work (remove generic AI comments, keep the valuable ones) → antislop-code
- More than one kind of work → pick several. The installer lets you choose as many as you want.
- None of these → fine. The core alone is a complete filter.

The names above are what you pick in the installer and what the wizard asks for in the single-file route. The [Skills](#skills) section shows what every one of them covers, in this same order.

### What antislop does not do

It never beautifies on its own. antislop removes slop; it does not invent direction. If you have a specific look in mind, write it down in a file called `DESIGN.md` in your project and the AI builds toward it. You do not have to make one. Without a `DESIGN.md`, the AI labels its work "draft without direction" instead of passing it off as finished. A sterile result means the direction was missing, not that the filter failed.

If your `DESIGN.md` happens to ask for something antislop counts as slop, it does not obey quietly and it does not overrule you: it names the element, names the rule, and asks whether to keep it. Direction that is simply bold or unusual is not slop, and stays.

## Something is wrong

Most first-run problems are one of three things:

- The skills are not loading. They load when a session starts, so start a new one after installing.
- Your agent needed an extra step. Hermes wants `hermes skills trust` in the project, and Pi asks a trust question the first time it runs.
- The folder is not where your agent looks. [Where each agent reads antislop from](#where-each-agent-reads-antislop-from) has the table for that.

If none of those is it, open a [bug report](https://github.com/miqdadbadjuber/anti-slop/issues/new?template=bug_report.yml). Name your agent and its version, and say what you expected instead. The template asks for those, the route you installed by, your operating system, and the output you saw, so a report that uses it can be acted on in one round instead of two.

## Where is this going?

antislop is packaged four ways at once: standard skill folders, native plugins for Claude Code, Antigravity, Codex, Cursor, Kimi Code, Cline, and Oh My Pi, a Pi package read from the root `package.json`, and the single-file core that works anywhere. Agent support grows over time. For the current release and what comes next, see the [roadmap](ROADMAP.md). For what each skill does, see [Skills](#skills). For the product at a glance, see the [README](README.md).

## Contributing

You do not need permission to open an issue, and a slop pattern antislop misses is one worth filing. Use the [rule gap report](https://github.com/miqdadbadjuber/anti-slop/issues/new?template=rule_gap.yml) for that. A paste of what got through is worth more than a description of it.

Before a pull request, read [CONTRIBUTING.md](CONTRIBUTING.md). It lists the checks a change has to pass, where the version is written, and what has to move with it. The [pull request template](.github/PULL_REQUEST_TEMPLATE.md) is the same list as a checklist.

Releases are planned ahead, one agent per version, so ask in the issue which slot your change takes instead of picking a number yourself.

Anything from a typo to a whole new skill is welcome. [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) covers how people treat each other here, and [SECURITY.md](SECURITY.md) covers what the third-party audits flagged and why each behavior is deliberate.
