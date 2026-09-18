# The antislop guide

antislop is a filter you give to the AI assistant you already use. It stops the AI from producing slop: pages, text, and code comments that look generic and obviously made by AI. It is a **filter, not a style guide**. It never picks your colors, fonts, or layout. It removes the slop and leaves the direction to you.

New to antislop? Read this top to bottom once.

This guide is in four parts. **Install** puts antislop on your agent. **Update** and **Remove** do the same job later on. **Reference** holds the facts you look up rather than act on: the skill list, the folder table, and what antislop deliberately does not do.

The first three parts cover the same routes in the same order, so once you find your route in one of them, you know where it is in the others. If you are only here to install, jump to [Install](#install).

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

## Install

There are four routes in, and the difference between them matters more than it looks:

| Route | What it does | Works on |
|-------|--------------|----------|
| **The installer** | Copies the skill folders into your project or your home folder | Seven agents, no setup beyond a terminal |
| **The skills directory** | Copies the same folders using the skills.sh tool | The agents that directory supports |
| **A plugin door** | Loads antislop straight from this repository, nothing copied | Claude Code, Antigravity, Codex, Cursor, Oh My Pi |
| **The single file** | One Markdown file you hand to any AI | Anything that reads text, including a phone |

Pick one. They load the same rules, so adding a second only gives you a second thing to keep updated.

### Which route should I pick?

- **The installer** if you want antislop in one project or everywhere, and you use any of the seven agents. It is the only route that covers OpenCode, Gemini CLI, and Hermes, and the only one that detects your agents for you.
- **The skills directory** if you already use that directory's tool and want the folders without the installer's questions. It writes no pointer, so antislop reloads by description alone.
- **A plugin door** if you use Claude Code, Antigravity, Codex, Cursor, or Oh My Pi and would rather not keep a copy in your project. You get updates from the plugin's own update command instead of re-running an installer.
- **The single file** if you have no terminal, or you want antislop in a chat window or on a phone.

### Before you start

Three of the four routes need a terminal, the window where you type commands instead of clicking. If you do not have one, or you cannot install software on this machine, go straight to [The single file](#the-single-file).

Here is how to open a terminal:

- **Windows.** Press the Start button, type `powershell`, and open it.
- **macOS.** Press Cmd and Space together, type `terminal`, and press Enter.
- **Linux.** Open your terminal.

You also need Node.js 18 or newer. Check it by typing this and pressing Enter:

```bash
node -v
```

If you see something like `v22.11.0`, you are ready. If you see an error instead, install Node from [nodejs.org](https://nodejs.org) first, then close the terminal and open it again so it picks up the new command.

---

### The installer

Copies the skill folders into the folder you choose. On a project install it also writes the pointer that reloads antislop every session.

**Step 1. Go to your project folder.** The terminal starts in your home folder, so tell it where your project is:

```bash
cd ~/projects/my-site
```

Use your real path. On Windows it might look like `cd C:\Users\You\projects\my-site`. If you would rather not type it, type `cd ` with a space after it and drag the folder into the terminal window, which fills the path in for you.

Not sure it worked? Type `ls` (macOS and Linux) or `dir` (Windows) and press Enter. You should see your project's files.

**Step 2. Run the installer.**

```bash
npx antislop-ai
```

The first run downloads antislop, so give it a few seconds.

**Step 3. Answer four questions.** Use the arrow keys to move, Space to select, and Enter to confirm.

- **Extra skills to install.** The core is already on and always included. Pick the extra skills that match your work, or pick none. See [What is a skill?](#what-is-a-skill) if you are not sure.
- **Install location.** *This project* writes into the folder you are standing in and adds the pointer that reloads antislop in every session. *Everywhere* writes into your home folder and covers all your projects, with no pointer. Choose *This project* the first time.
- **Which agent(s).** It pre-checks the agents it found in your project. Pick yours. If yours is not pre-checked, pick it anyway; the installer creates the folder.
- **Install N skill(s) now?** Yes.

**Step 4. Check what it printed.**

```
◇ Installed 2 skill(s) into 1 agent folder(s).
│ Pointer written to AGENTS.md
antislop is ready. The next agent session loads it.
```

**Step 5. Start a new agent session.** antislop loads when a session starts, so the window you already have open will not see it. Close it and open it again.

To confirm it is loaded, ask your agent something only the rules would answer, such as "what does antislop's R-02 say?" If it answers from the rules, you are done.

---

### The skills directory

[skills.sh](https://skills.sh/miqdadbadjuber/anti-slop) is an open directory of agent skills, and antislop is listed there. This route uses that directory's own tool to copy the same skill folders the installer copies, without its questions:

```bash
npx skills add miqdadbadjuber/anti-slop
```

Add `--all` for every skill, `-g` for a global install, or `--skill <name>` for one skill. Run `--list` first to see what is available.

What it does not do is write the pointer that reloads antislop every session. If you want that pointer as well, run `npx antislop-ai` afterwards, pick the same skills and the same agent, and choose **Keep what is there** when it says the folders already exist. That keeps the copies you already have and adds only the pointer.

---

### The plugin doors

A plugin is a feature of the agent, not of antislop. You point the agent at this repository once, and from then on the agent loads antislop directly from there. Nothing is copied into your project, so there is no snapshot that can quietly go stale. A new version arrives by updating the plugin, not by re-running an installer.

Two things to know before you pick one. A plugin fits exactly one agent, so this route exists for five agents and not for the other two. And every agent below keeps its own local copy, so none of them updates by itself unless that agent says it does.

#### Claude Code

In a Claude Code session, run these two:

```text
/plugin marketplace add https://github.com/miqdadbadjuber/anti-slop
/plugin install antislop@anti-slop
```

#### Antigravity

```bash
agy plugin install https://github.com/miqdadbadjuber/anti-slop
```

Its `rules/` component loads antislop in every session, so there is no pointer to write and nothing else to do.

#### Codex

```bash
codex plugin marketplace add miqdadbadjuber/anti-slop
codex plugin add antislop@anti-slop
```

#### Cursor

Add the repository as a plugin marketplace with the Cursor Agent CLI:

```bash
agent plugin marketplace add https://github.com/miqdadbadjuber/anti-slop
```

Then, inside Cursor, open **Customize** in the sidebar, find **antislop**, and select **Install**, choosing project or user scope. From the dashboard, **Dashboard → Plugins → Add Marketplace → Import from Repo** does the same.


#### Oh My Pi

Add the marketplace once, then install the plugin:

```bash
omp plugin marketplace add oggiesutrisna/omp-anti-slop-integration
omp plugin install antislop@anti-slop
```

Or from inside an active Oh My Pi session:

```text
/marketplace add oggiesutrisna/omp-anti-slop-integration
/marketplace install antislop@anti-slop
```
---

### The single file

Use this when you have no terminal, or when your AI is a chat window you cannot run commands in. Three steps.

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

---

### On a phone

The installer, the skills directory, and the plugin doors all need a terminal, so none of them runs on a phone. On a phone you use the single file, and the only real question is how to hand it to the app.

**A Project, a Gem, or a Custom GPT.** Claude Projects, ChatGPT Projects, and Gemini Gems all accept a file as reference material, and all three work on a phone. Download `antislop.md`, attach it to the project, and add a short instruction telling the AI to follow it. This is the simplest route and the one to try first. A 50 KB file is far below every limit these products publish.

**Claude Skills.** Claude can also take antislop as a real skill, and skills run in the Claude apps. The upload screen is on the web, so do this part at a computer: turn on code execution under Settings and Capabilities, then go to Customize and add a skill. Each antislop skill is a folder holding a `SKILL.md`, so zip the folder with the folder itself at the top level and upload that. Upload the core (`antislop`) as well, because the other skills reference the core rules by number instead of repeating them.

**One honest difference.** In a coding agent, antislop arrives as a skill, which is an instruction the agent is built to follow. In a chat app it arrives as reference material the AI is meant to follow. It is context, not a gate, and no chat app runs the Delivery Gate for you. The rules still do real work on tone and structure, but nothing enforces them.

**Do not try to install it from a terminal on a phone.** Android has Termux and it can run Node, but it is officially experimental. On iOS there is no supported way at all.

## Update

Nothing here is automatic unless a route below says it is. Every route updates by running that route's own command again, or by replacing the copy you made.

### The installer

The installer copies files, so your project holds a snapshot. When a new version is released, run the same command again:

```bash
npx antislop-ai
```

Answer the questions exactly as you did the first time. Because the folders already exist, it now asks one extra question:

- **Overwrite them** replaces your copies with the version it just downloaded. **This is the update.**
- **Keep what is there** leaves your old files alone and installs nothing.

Pick **Overwrite them**. Nothing of yours is at risk: the installer only writes inside the skill folders it created, and its pointer block is replaced in place rather than added a second time, so running it ten times leaves one block and not ten.

If you pick *Keep what is there* by mistake, nothing breaks. You are simply still on the old version, and the installer says so.

To see which version the installer would fetch before you run it:

```bash
npx antislop-ai --version
```

### The skills directory

Run the same command again and let it replace the folders:

```bash
npx skills add miqdadbadjuber/anti-slop
```

This route writes the same folders the installer writes, so the notes above about what gets replaced apply here too.

### The plugin doors

Each agent keeps its own local copy, so none of these updates by itself unless you turn that on.

#### Claude Code

Claude Code switches automatic updates **off** for third-party marketplaces, so this one is manual:

```bash
claude plugin update antislop@anti-slop
```

If you would rather it updated itself, open `/plugin`, go to Marketplaces, select `anti-slop`, and enable auto-update. Either way, Claude Code keeps its own copy of the plugin under `~/.claude/plugins/cache/`, so restart it or run `/reload-plugins` for the new version to take effect.

#### Antigravity

Antigravity has no plugin update command, so run the same install command again. It clones fresh and replaces the plugin folder:

```bash
agy plugin install https://github.com/miqdadbadjuber/anti-slop
```

#### Codex

```bash
codex plugin marketplace upgrade anti-slop
```

That one command is both the marketplace refresh and the plugin update, because the plugin installs from a folder inside the same repository. There is no `codex plugin update`.

#### Cursor

Cursor indexes the marketplace on its own side, so a new version arrives when that index refreshes:

```bash
agent plugin marketplace update https://github.com/miqdadbadjuber/anti-slop
```

In the dashboard you can also enable **Auto Refresh** for the marketplace, or press **Refresh** by hand. Cursor re-indexes a marketplace at most once every ten minutes. If new plugins were added to the repo, re-importing the repository URL is what picks them up.


#### Oh My Pi

Update the marketplace catalog and upgrade the plugin:

```bash
omp plugin marketplace update anti-slop
omp plugin upgrade antislop@anti-slop
```

Or inside an active session:

```text
/marketplace update anti-slop
/marketplace upgrade antislop@anti-slop
```
### The single file

Download the file again and replace your copy. There is nothing else to update, since this route installs no folders.

## Remove

### The installer

Two things to delete:

1. **The skill folders it copied.** Each looks like `antislop` or `antislop-something`, sitting inside your agent's skills folder (`.claude/skills/`, `.agents/skills/`, and so on; see [Where each agent reads antislop from](#where-each-agent-reads-antislop-from)). Delete only those folders.
2. **The pointer block in your entry file.** Open `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`, find the part between `<!-- antislop:start -->` and `<!-- antislop:end -->`, and delete it including those two marker lines. If that file holds nothing else, delete the file.

Nothing else was added to your project.

### The skills directory

This route writes the same folders the installer writes and no pointer, so remove it by deleting those folders the same way. There is no pointer block to remove.

### The plugin doors

#### Claude Code

```text
/plugin uninstall antislop@anti-slop
```

Adding the marketplace and installing the plugin are two separate steps, so removing the plugin leaves the marketplace behind. `/plugin marketplace remove anti-slop` removes that too, and it also uninstalls any plugin that came from it.

#### Antigravity

```bash
agy plugin uninstall antislop
```

`agy plugin disable antislop` switches it off without deleting it. The plugin lives in `~/.gemini/config/plugins/antislop/`.

#### Codex

```bash
codex plugin remove antislop@anti-slop
```

#### Cursor

Cursor documents no plugin uninstall command, so remove the plugin from the Customize panel. To drop the marketplace as well:

```bash
agent plugin marketplace remove anti-slop
```

#### Oh My Pi

```bash
omp plugin uninstall antislop@anti-slop
```

To drop the marketplace as well:

```bash
omp plugin marketplace remove anti-slop
```

### The single file

Delete the `antislop.md` file you downloaded. If you attached it to a chat project instead of keeping it as a file, remove it from that project's reference material.

## Reference

The rest of this guide is things you look up rather than steps you follow.

### Where each agent reads antislop from

The installer writes into the folder your agent reads. This is what it writes and where:

| Agent | Reads antislop from |
|-------|---------------------|
| Claude Code | `.claude/skills/` |
| Codex | `.codex/skills/` |
| Antigravity | `.agents/skills/` |
| OpenCode | `.opencode/skills/` |
| Cursor | `.cursor/skills/` |
| Gemini CLI | `.gemini/skills/` |
| Hermes | `.hermes/skills/` |

A global install writes the same folder under your home directory, with two exceptions. OpenCode documents its global skills folder as `~/.config/opencode/skills/`, so the installer writes there rather than to `~/.opencode/skills/`, which OpenCode still reads but does not document. Antigravity reads a project's `.agents/skills/`, but under your home directory it reads `~/.gemini/config/skills/` and not `~/.agents/skills/`, so the installer writes there on a global install.

On a project install the installer also writes the pointer that reloads antislop every session: into the project's `AGENTS.md` for Codex, Antigravity, OpenCode, Cursor, and Hermes, into `CLAUDE.md` for Claude Code, and into `GEMINI.md` for Gemini CLI. For OpenCode that is the whole mechanism: it loads the skill folders from `.opencode/skills/` and reads the pointer from `AGENTS.md`, which was verified against the opencode CLI.

**Hermes needs one more step.** Hermes reads a project's `.hermes/skills/`, and a project's skills outrank your global ones, but it will not load skills out of a cloned repository until you say that repository is yours. After a project install, run this once in that project:

```bash
hermes skills trust
```

It prints the folder it trusted and how many skills will now load. Hermes tells you this itself, with a banner naming the command, so a forgotten step is loud rather than silent. Run `hermes skills untrust` to take it back.

One caveat on versions: project skills are a newer Hermes feature. The official installer tracks the newest code and has it. The `hermes-agent` package on PyPI is older and does not, so if `hermes skills trust` is not a command your Hermes knows, either update Hermes or install antislop globally instead.

Gemini CLI is legacy support. Consumer access ended on 18 June 2026 and Antigravity replaced it, but it was not a total shutdown: enterprise Code Assist licences and paid API keys still work, and the repository is still maintained. The installer still writes into `.gemini/skills/` for existing Gemini CLI setups.

### What is a skill?

A skill is an optional folder (with a `SKILL.md` inside) that goes deeper into one concern. The core works alone; a skill adds depth for one topic. Skills reference the core rules by number and never duplicate them, so adding one does not change the core.

There are five skills on top of the core. Pick the one that matches your work:

- **UI work** (look and feel: layout, color, components, animation) → antislop-ui
- **Copy work** (headlines, buttons, tone, made-up statistics) → antislop-copywriting
- **People work** (readable colors, keyboard use, focus, button states) → antislop-human
- **Responsive layout work** (reflowing across every screen width, phone to desktop, tap targets, navigation) → antislop-layoutmobile
- **Code comments work** (remove generic AI comments, keep the valuable ones) → antislop-code
- **More than one kind of work** → pick several. The installer lets you choose as many as you want.
- **None of these** → fine. The core alone is a complete filter.

The names above are what you pick in the installer and what the wizard asks for in the single-file route.

### What antislop does not do

It never beautifies on its own. antislop removes slop; it does not invent direction. If you have a specific look in mind, write it down in a file called `DESIGN.md` in your project and the AI builds toward it. You do not have to make one. Without a `DESIGN.md`, the AI labels its work "draft without direction" instead of passing it off as finished. A sterile result means the direction was missing, not that the filter failed.

If your `DESIGN.md` happens to ask for something antislop counts as slop, it does not obey quietly and it does not overrule you: it names the element, names the rule, and asks whether to keep it. Direction that is simply bold or unusual is not slop, and stays.

## Where is this going?

antislop is packaged three ways at once: standard skill folders, native plugins for Claude Code, Antigravity, Codex, Cursor, and Oh My Pi, and the single-file core that works anywhere. Agent support grows over time. For the current release and what comes next, see the [roadmap](ROADMAP.md). For the full picture of every skill, see the [README](README.md).

## Feedback

Found a new AI slop pattern, a rule that missed something, or an install that did not behave? Open an [issue](https://github.com/miqdadbadjuber/anti-slop/issues). It is the fastest way to make antislop sharper.

For the full product, see the [README](README.md).
