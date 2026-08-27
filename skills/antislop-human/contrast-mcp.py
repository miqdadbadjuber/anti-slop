#!/usr/bin/env python3
"""Minimal MCP stdio server that exposes the antislop contrast checker as a tool.

Speaks the Model Context Protocol over stdio. All logging must go to stderr;
stdout is reserved for newline-delimited JSON-RPC responses.
"""
import json
import sys

PROTOCOL_VERSION = "2024-11-05"
SERVER_NAME = "antislop-contrast"
SERVER_VERSION = "3.2.1"

TOOLS = [
    {
        "name": "check_contrast",
        "description": "Compute the WCAG contrast ratio between two hex colors and the pass or fail verdict for normal and large text. Use this instead of guessing whether a color pairing meets AA.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "foreground": {"type": "string", "description": "Hex color of the text, for example #777777"},
                "background": {"type": "string", "description": "Hex color of the background, for example #FFFFFF"},
            },
            "required": ["foreground", "background"],
        },
    }
]


def _channel(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def relative_luminance(hex_color):
    h = hex_color.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(ch * 2 for ch in h)
    r, g, b = (int(h[i : i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _channel(r) + 0.7152 * _channel(g) + 0.0722 * _channel(b)


def contrast_ratio(fg, bg):
    l1, l2 = relative_luminance(fg), relative_luminance(bg)
    lighter, darker = max(l1, l2), min(l1, l2)
    return round((lighter + 0.05) / (darker + 0.05), 2)


def check_contrast(fg, bg):
    ratio = contrast_ratio(fg, bg)
    return {
        "foreground": fg,
        "background": bg,
        "ratio": ratio,
        "normal_text": {"threshold": 4.5, "pass": ratio >= 4.5},
        "large_text": {"threshold": 3.0, "pass": ratio >= 3.0},
    }


def _send(msg):
    sys.stdout.write(json.dumps(msg) + "\n")
    sys.stdout.flush()


def _text(content):
    return {"content": [{"type": "text", "text": content}], "isError": False}


def _error(message):
    return {"content": [{"type": "text", "text": message}], "isError": True}


def _reply(msg_id, result):
    _send({"jsonrpc": "2.0", "id": msg_id, "result": result})


def main():
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            msg = json.loads(line)
        except json.JSONDecodeError:
            continue

        msg_id = msg.get("id")
        method = msg.get("method")

        if method == "initialize":
            _reply(msg_id, {
                "protocolVersion": PROTOCOL_VERSION,
                "capabilities": {"tools": {}},
                "serverInfo": {"name": SERVER_NAME, "version": SERVER_VERSION},
            })
        elif method == "notifications/initialized":
            pass
        elif method == "ping":
            _reply(msg_id, {})
        elif method == "tools/list":
            _reply(msg_id, {"tools": TOOLS})
        elif method == "tools/call":
            params = msg.get("params") or {}
            name = params.get("name")
            args = params.get("arguments") or {}
            if name == "check_contrast":
                try:
                    result = check_contrast(args["foreground"], args["background"])
                    _reply(msg_id, _text(json.dumps(result)))
                except Exception as exc:
                    _reply(msg_id, _error("check_contrast failed: " + str(exc)))
            else:
                _reply(msg_id, _error("Unknown tool: " + str(name)))
        elif msg_id is not None:
            _reply(msg_id, {})


if __name__ == "__main__":
    main()
