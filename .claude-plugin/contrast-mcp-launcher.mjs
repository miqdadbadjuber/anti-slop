#!/usr/bin/env node
/**
 * Starts contrast-mcp.py with whichever Python name this machine has.
 * The manifest's `command` is a single string and cannot pick per platform.
 */
import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const server = path.join(here, "..", "skills", "antislop-human", "contrast-mcp.py");

const candidates = process.platform === "win32" ? ["python", "python3"] : ["python3", "python"];

// Run each candidate: the Windows `python` stub is on PATH but only opens the
// Store, and pyenv shims exit non-zero when no version is set.
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
