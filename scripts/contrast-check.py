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


# The reference table in antislop-human.md. Kept here so the doc has an oracle:
# a rounded ratio hides a failure (#777777 on white is 4.48, not 4.5).
REFERENCE_PAIRS = [
    ("#000000", "#FFFFFF", 21.00),
    ("#FFFFFF", "#000000", 21.00),
    ("#FFFFFF", "#333333", 12.63),
    ("#FFFFFF", "#666666", 5.74),
    ("#777777", "#FFFFFF", 4.48),
    ("#FFFFFF", "#888888", 3.54),
    ("#FFFFFF", "#999999", 2.85),
    ("#555555", "#000000", 2.82),
]


def selftest():
    for text, background, expected in REFERENCE_PAIRS:
        got = round(contrast_ratio(text, background), 2)
        assert got == expected, f"{text} on {background}: expected {expected}, got {got}"
    assert parse_hex("#fff") == (255, 255, 255), "3-digit hex must expand"
    assert parse_hex("777777") == (119, 119, 119), "a bare hex must parse"
    for bad in ("#GGGGGG", "#FFFF", ""):
        try:
            parse_hex(bad)
        except ValueError:
            continue
        raise AssertionError(f"{bad!r} should have been rejected")
    print(f"selftest: {len(REFERENCE_PAIRS)} reference pairs OK")
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
