# Oh My Pi: antislop plugin

This folder contains the Oh My Pi marketplace catalog and plugin manifest for **antislop** (Anti Slop: Rules for AI Coding Agents).

## Quick start

Add this repository as an Oh My Pi marketplace, then install the plugin:

```bash
omp plugin marketplace add oggiesutrisna/omp-anti-slop-integration
omp plugin install antislop@anti-slop
```

Or from inside an active Oh My Pi session:

```text
/marketplace add oggiesutrisna/omp-anti-slop-integration
/marketplace install antislop@anti-slop
```

## What it loads

- **6 skills**:
  - `antislop`: Core filter, always on.
  - `antislop-ui`: UI and visual design rules.
  - `antislop-copywriting`: Copy & text rules.
  - `antislop-human`: Accessibility and contrast rules.
  - `antislop-layoutmobile`: Responsive layout and mobile viewport rules.
  - `antislop-code`: Code comments rules.
- **MCP server**:
  - `antislop-contrast`: Computes WCAG contrast ratios and pass/fail verdicts via JSON-RPC.

## Scope

- **User scope (default)**: Installed into `~/.omp/plugins/installed_plugins.json`, available across all projects automatically.
- **Project scope**: Pass `--scope project` to install only inside the active project.
