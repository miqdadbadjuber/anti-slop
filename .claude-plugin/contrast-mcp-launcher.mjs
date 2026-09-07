#!/usr/bin/env node
/**
 * Starts contrast-mcp.py with whichever Python name this machine actually has.
 *
 * The manifest's `command` is one string with no shell, so it cannot pick per
 * platform on its own, and every single-name answer breaks somewhere: macOS has
 * had no `python` since 12.3 removed Python 2, and Windows has no `python3` on
 * some installs. v3.0.2 made allowed-tools and the skill prose accept both; this
 * is the same fix for the one place that only takes a single value.
 */
import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const server = path.join(here, "..", "skills", "antislop-human", "contrast-mcp.py");

const candidates = process.platform === "win32" ? ["python", "python3"] : ["python3", "python"];

// Run each candidate rather than just looking it up: Windows ships a `python`
// stub that exists on PATH and only opens the Store page, and pyenv leaves
// shims that exit non-zero when no version is selected.
const python = candidates.find(
  (bin) => spawnSync(bin, ["-c", ""], { stdio: "ignore" }).status === 0
);

if (!python) {
  // stderr, never stdout: stdout is the JSON-RPC channel.
  console.error(
    `antislop-contrast: no working Python found (tried ${candidates.join(", ")}). ` +
      "Install Python 3 to use the contrast tool."
  );
  process.exit(1);
}

const child = spawn(python, [server], { stdio: "inherit" });
child.on("exit", (code, signal) => process.exit(signal ? 1 : (code ?? 0)));
