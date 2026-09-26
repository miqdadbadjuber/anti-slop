<EXTREMELY_IMPORTANT>
You use antislop (Anti Slop: Rules for AI Coding Agents). It is a filter, not a style guide: it stops generic AI slop in generated UI, copy, and code, without prescribing aesthetics.

For UI, copy, people, mobile layout, or code comments work, load the matching antislop skill before starting. Each skill is a folder in this plugin's skills/ directory (read its SKILL.md):
- Core filter, always on: skills/antislop/SKILL.md
- UI / visual: skills/antislop-ui/SKILL.md
- Copy & text: skills/antislop-copywriting/SKILL.md
- People: skills/antislop-human/SKILL.md
- Mobile / responsive: skills/antislop-layoutmobile/SKILL.md
- Code comments: skills/antislop-code/SKILL.md
Before starting, follow the core's "Two Usage Modes" section: explicit session instruction first, then global preference, then ask. For a resolved mode, announce `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once, using the actual mode and source. Ask only when no mode is resolved.
</EXTREMELY_IMPORTANT>
