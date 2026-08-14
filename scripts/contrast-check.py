#!/usr/bin/env python3
"""WCAG 2.x contrast checker, home of the antislop-human contrast checker.

Usage:
    python contrast-check.py "#FFFFFF" "#777777"
    python contrast-check.py FFFFFF 777777
    python contrast-check.py --selftest

Prints the contrast ratio and a PASS/FAIL verdict for normal text (4.5:1)
and large text (3:1, 18px+ per antislop R-25). Exit code 0 only when both
verdicts pass, so scripts can chain on it.
"""

import pathlib
import re
import sys


def parse_hex(value):
    value = value.strip().lstrip("#")
    if len(value) == 3:
        value = "".join(ch * 2 for ch in value)
    if not re.fullmatch(r"[0-9A-Fa-f]{6}", value):
        raise ValueError(f"expected a hex color like #FFFFFF, got {value!r}")
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def linearize(channel):
    c = channel / 255.0
    if c <= 0.03928:
        return c / 12.92
    return ((c + 0.055) / 1.055) ** 2.4


def luminance(rgb):
    r, g, b = (linearize(ch) for ch in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast_ratio(color_a, color_b):
    lum_a, lum_b = luminance(parse_hex(color_a)), luminance(parse_hex(color_b))
    lighter, darker = sorted((lum_a, lum_b), reverse=True)
    return (lighter + 0.05) / (darker + 0.05)


# Row of the reference table in antislop-human.md, e.g.
# | #777777 on white | 4.48 | Fail | Pass |
TABLE_ROW = re.compile(
    r"\|\s*(\S+)\s+on\s+(\S+)\s*\|\s*([\d.]+)\s*\|\s*(\w+)\s*\|\s*(\w+)\s*\|"
)
SKILL_DOC = "antislop-human.md"


def _hex_of(name):
    return {"black": "#000000", "white": "#FFFFFF"}.get(name.lower(), name)


def check_reference_table(text):
    """Recompute every row of the skill's table. Returns a list of mismatches."""
    problems = []
    rows = 0
    for text_color, background, stated, normal, large in TABLE_ROW.findall(text):
        rows += 1
        pair = f"{text_color} on {background}"
        got = round(contrast_ratio(_hex_of(text_color), _hex_of(background)), 2)
        if got != float(stated):
            problems.append(f"{pair}: table says {stated}, the formula says {got}")
        for label, bar, stated_verdict in (("normal", 4.5, normal), ("large", 3.0, large)):
            want = "pass" if got >= bar else "fail"
            if stated_verdict.lower() != want:
                problems.append(
                    f"{pair}: {label} text marked {stated_verdict}, should be {want}"
                )
    if not rows:
        problems.append(f"{SKILL_DOC}: no reference table rows found")
    return rows, problems


def selftest():
    # No asserts anywhere in here: python -O strips them, and a checker that
    # goes silently green under a common flag is worse than no checker.
    problems = []
    doc = pathlib.Path(__file__).resolve().parent.parent / SKILL_DOC
    if doc.exists():
        rows, problems = check_reference_table(doc.read_text(encoding="utf-8"))
        checked = f"{rows} rows of the {SKILL_DOC} table"
    else:
        # The script is downloadable on its own, so a missing doc is not a failure.
        checked = f"hex parsing only, no {SKILL_DOC} next to the script"

    if parse_hex("#fff") != (255, 255, 255):
        problems.append("a 3-digit hex must expand")
    if parse_hex("777777") != (119, 119, 119):
        problems.append("a bare hex must parse")
    for bad in ("#GGGGGG", "#FFFF", ""):
        try:
            parse_hex(bad)
        except ValueError:
            continue
        problems.append(f"{bad!r} should have been rejected")

    for problem in problems:
        print(f"selftest: {problem}")
    if problems:
        return 1
    print(f"selftest: {checked}, all OK")
    return 0


def main(argv):
    if argv == ["--selftest"]:
        return selftest()
    if len(argv) != 2:
        print("usage: python contrast-check.py <hex1> <hex2> | --selftest")
        return 2
    try:
        ratio = contrast_ratio(*argv)
    except ValueError as exc:
        print(f"error: {exc}")
        return 2

    normal = ratio >= 4.5
    large = ratio >= 3.0
    print(f"ratio: {ratio:.2f}:1")
    print(f"normal text (4.5:1): {'PASS' if normal else 'FAIL'}")
    print(f"large text  (3.0:1): {'PASS' if large else 'FAIL'}")
    return 0 if normal and large else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
