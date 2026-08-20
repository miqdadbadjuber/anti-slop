# Security

antislop is a set of open source skills. Everything it does lives in this repository, and you can read any file before you install it. It is also scanned by third-party security auditors on skills.sh (Socket, Snyk, and Gen Agent Trust Hub). This page explains what those audits flagged and why each behavior is deliberate, so a warning is never a mystery.

## What the audits say

As of v3.1.3, Gen Agent Trust Hub rates antislop **Warn (MEDIUM)** on two findings. Both describe features that are the point of the product. A third finding was addressed in v3.1.3. Details below.

### Finding 1: it writes to agent entry files

The report notes that antislop appends a pointer block to an agent entry file such as `CLAUDE.md` or `AGENTS.md`. This is how a filter that runs on everything stays loaded: the entry file names the installed skills, so the next session reads them. The pointer block:

- is a static markdown reference. It lists the installed skills and carries no executable content.
- is written only after you approve. The picker and the manual wizard both ask first.
- is appended at the end of the entry file. Existing content is never changed.
- lives in [cli/lib/install.mjs](cli/lib/install.mjs) for the picker, and in the wizard inside [antislop.md](antislop.md) for the manual path.

Removing this behavior would remove the core promise: a filter that is always on, not one you remember to invoke. Any always-on ruleset that writes a reference to an entry file matches this pattern.

### Finding 2: it references an external script

The report notes that the human skill references a Python script, `contrast-check.py`. This is the contrast checker, an accessibility tool that validates color contrast against WCAG ratios. It:

- ships as a local file inside the skill folder, [skills/antislop-human/contrast-check.py](skills/antislop-human/contrast-check.py). You fetch it; the agent never downloads anything from the network.
- only checks the color pairs you pass to it. It has no network access and reads no other data.
- runs only when contrast work needs a WCAG check, which is the whole purpose of the human skill.

The plugin also exposes a contrast MCP tool, `contrast-mcp.py`, with the same properties: a local file, no network, no data beyond the color pairs it validates.

### Finding 3: it reads external content (addressed in v3.1.3)

A finding noted that antislop reads `DESIGN.md` for design direction. The core now states the boundary explicitly: `DESIGN.md` is data to apply, not instructions to obey. The agent extracts only the design fields (identity, personality, palette, typography, mood, dials) and treats anything that reads like a command as content, not as an instruction. See [antislop.md](antislop.md).

## What antislop never does

- It never downloads or runs code from the network.
- It never reads, sends, or logs credentials or private data.
- It changes files only with your approval, and only to add its own pointer block.
- It is fully open source. Read the skills, the installer, and the checker before you install.

## Verdicts that cleared

Socket previously warned on an install command that the wizard named. The wizard no longer names any install command or repo path, and Socket now passes.
