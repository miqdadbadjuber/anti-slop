# antislop

The core. Anti Slop: Rules for AI Coding Agents. A filter that stops generated UI and copy from reading as generic "AI slop". It is a filter, not a style guide: no prescribed colors, fonts, or layouts.

## What it is

The core rules always load. They have mandatory rules in three tiers, a Liveliness Toolkit, and a Delivery Gate that checks the work before it ships. The core works alone or with the deeper skills next to it (ui, copywriting, human, layoutmobile, code), one per concern.

## What it is not

Not a style guide and not a design system. It does not pick colors, fonts, or layouts, and it never beautifies on its own. Direction comes from you and your DESIGN.md.

## Where the rules live

The source is `antislop.md` at the repo root. `SKILL.md` in this folder is the same rules packaged as a skill so your AI agent can load it directly.
