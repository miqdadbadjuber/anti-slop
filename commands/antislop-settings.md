---
description: Open the antislop settings menu to configure your usage mode (Always Ask, During, After).
---

Open the antislop settings menu and ask the user to choose their preferred usage mode.

1. Check the current setting in the platform settings file:
   - Linux and macOS: `~/.config/antislop/settings.json`
   - Windows: `%APPDATA%\antislop\settings.json` (falling back to `~/.config/antislop/settings.json` if `%APPDATA%` is unset)
2. Present the settings menu:
   > **When do you want to use antislop?**
   > 1. **Always Ask** (`ask`): Ask in every new session (default).
   > 2. **During** (`during`): Apply rules while working (planning and execution). Prevents slop from the start.
   > 3. **After** (`after`): Audit finished work. A numbered findings list is produced for review.
   >
   > Which one, 1, 2, or 3?
3. When the user responds with their choice (1/ask, 2/during, 3/after):
   - Update the `mode` property in the platform settings file, preserving any other fields.
   - Confirm the update to the user.
   - For `during` or `after`, explain that future sessions will use this mode automatically without asking.
   - For `ask`, confirm that the agent will ask at the start of each new session.
