# Contributing

antislop ships as text: rules, skills, an installer, and the manifests that put them in front of an agent. A change here is judged by one question, and it is not whether the idea is good. It is whether the change can be checked. Most of what follows exists because a pull request could not be checked, and the cost landed on the person reviewing it.

## Before you open a pull request

### Rebase onto the current main

Branch from the latest `main`. If `main` moves while you wait, rebase again before asking for review. This is the most common reason a pull request here stops moving. One branch was opened against v3.2.9 and sat while six releases landed under it, so it conflicted on five files; the rebase was asked for and never came, and the work was taken forward by the maintainer instead of by its author.

### Raise the version

If your change alters what ships, it needs a version. `cli/package.json` is the source of truth, and these files have to agree with it:

```
cli/package-lock.json
package.json
.claude-plugin/plugin.json
.claude-plugin/marketplace.json
.codex-plugin/plugin.json
.cursor-plugin/plugin.json
.kimi-plugin/plugin.json
.omp-plugin/marketplace.json
skills/antislop/VERSION
cli/lib/banner.mjs
skills/antislop-human/contrast-mcp.py
```

Eleven files, and one of them counts twice: `cli/package-lock.json` carries the version at the top level and again inside `packages[""]`, so a bump that misses the second one still fails. `npm ci` installs from a stale lock without correcting it, which is why CI reads both.

One more is checked, and it is not a file of its own: the contributors image in [README.md](README.md) pins the release in its URL. contrib.rocks caches that image against the exact URL, so a new URL is the only thing that makes it redraw. The prose in [README.md](README.md) and [ROADMAP.md](ROADMAP.md) carries the version too, and no check reads that part.

Do not pick the number yourself if you are unsure. Releases are planned one agent per version, so ask in the issue which slot your change takes.

### Do not edit generated files

`skills/antislop/SKILL.md` is generated from `antislop.md`. Edit the source, then run:

```bash
node cli/scripts/sync-skills.mjs
```

CI runs the same command and fails if the two disagree.

The same rule covers the catalogue of named patterns in [GUIDE.md](GUIDE.md), which is generated from the skills. Add or rename a pattern, then run:

```bash
node scripts/skill-index.mjs
```

`node scripts/check-repo.mjs` fails if the catalogue is stale, because a pattern nobody can read about may as well not exist.

## Before you ask for review

### Run the repository's checks

```bash
node scripts/check-repo.mjs
```

Fourteen checks, and they cover the things that break quietly: a manifest that no longer parses, a version that disagrees somewhere, a skill missing its frontmatter, a skill that is not registered in all four places the installer reads, a document link that points at a file that is gone or at a heading that no longer exists, and the catalogue of named patterns in [GUIDE.md](GUIDE.md) falling behind the skills it is generated from. The version check is the one that catches a bump you missed.

### Run the installer tests

```bash
cd cli
npm ci
npm test
```

Run these on your own machine, not only in CI. CI runs on `ubuntu-latest` and nothing else, so a green run there does not mean a green run on the maintainer's machine. A recent pull request passed every check and the installer tests on macOS and failed on Windows at its first assertion, because a helper asked to resolve a path for Linux used the host's path module instead of the one it was told to simulate. If you are on Windows or macOS, your run is the one that matters.

## What the files have to follow

- **Commands name this repository.** Every install or update command in a document, a manifest, or a printed line points at `miqdadbadjuber/anti-slop`. A command that points at your own fork breaks the moment the pull request is merged.
- **Documents move together.** Anything that changes what ships updates [README.md](README.md) and [ROADMAP.md](ROADMAP.md), and [GUIDE.md](GUIDE.md) too when an install path or a folder moves. The guide is the from-zero walkthrough, so a route is not documented until it is there.
- **No drafting language in a shipped document.** Words like `proposed`, `WIP`, or `TODO` do not belong in a file that ships. A heading that describes the change rather than the thing itself is a note to the reviewer, not documentation.
- **A plugin folder carries only what the vendor reads.** If an agent does not read a file, it is not shipped. A manifest nothing reads is a version to bump every release and a claim that something is wired up when it is not.
- **Comments are one or two lines.** A long comment reads as generated text, and this repository is judged by the standard it applies to others.
- **No em dashes or en dashes** in prose (R-02). The carve-out is documentation structure, not text: the rule and principle headings, the example row in the core's Part 1 table, the rule's own definition, a Delivery Gate item that quotes it, and the `Em Dashes` section in the copywriting skill.
- **One new agent per version.** A release opens at most one new agent's door, so a broken door is only ever one agent's problem.

## What a review checks

A claim about how an agent behaves is verified before it is merged, against the vendor's current documentation and, where it can be, against a real install. Documentation is read rather than assumed: a path is not added because it looks right, and a pull request that names one is expected to say where it came from.

This means a contribution is sometimes corrected rather than merged as written, and sometimes merged by the maintainer on top of its author's commits. Both are ordinary here. What is not ordinary is a change that cannot be checked at all, because the only way to accept it is to guess.

## Reporting a problem

Open an issue with the agent, the version, and the command you ran. Include what you expected and what happened, and paste what the installer printed. A report about a route that cannot be reproduced on this machine is still useful, but say so, because a route that cannot be checked is written down as unchecked rather than left looking verified.

## Conduct

Behavior in issues, pull requests, and discussions is covered by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
