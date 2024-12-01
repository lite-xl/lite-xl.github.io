#!/usr/bin/python3

import re
import json
from argparse import ArgumentParser, FileType


def replace_key(key):
    REPLACE_MAP = {
        "": "plus",
        "|": "bar",
        "[": "bracket-left",
        "]": "bracket-right",
        "{": "brace-left",
        "}": "brace-right",
        ":": "colon",
        ",": "comma",
        "=": "equal",
        "!": "exclam",
        "`": "grave",
        ">": "greater",
        "<": "less",
        "-": "minus",
        ".": "period",
        "?": "question",
        ";": "semicolon",
        "'": "single-quote",
        "/": "slash",
        "~": "tilde",
        "_": "underscore",
        "\\": "backslash",
        '"': "double-quote",
        "pageup": "page-up",
        "pagedown": "page-down",
        "capslock": "caps-lock",
        "scrolllock": "scroll-lock",
        "printscreen": "print-screen",
        "keypad enter": "num-enter",
        "left gui": "left-windows",
    }
    REPLACE_MOUSE = {
        "l": "left-button",
        "r": "right-button",
        "m": "middle-button",
        "x": "x-button1",
        "y": "x-button2",
    }

    if key in REPLACE_MAP:
        return REPLACE_MAP[key]
    elif "click" in key:
        num_click, click_type = re.match("(\d*)([lrmxy]?)click", key).group(1, 2)
        num_click = int(num_click) if num_click !=  "" else 1
        click_type = click_type if click_type != "" else "l"
        return ("" if num_click == 1 else str(num_click)) + REPLACE_MOUSE[click_type]
    else:
        return key


def main():
    parser = ArgumentParser(
        description="Converts the keymap into something pymdown can handle"
    )
    parser.add_argument(
        "input", type=FileType("r", encoding="utf-8"), help="Input keymap JSON file"
    )
    parser.add_argument(
        "output", type=FileType("w", encoding="utf-8"), help="Output keymap JSON file"
    )
    args = parser.parse_args()

    content = json.load(args.input)
    for [entry, keys] in content:
        for i in range(0, len(keys)):
            keys[i] = "+".join(replace_key(key) for key in keys[i].split("+"))
        keys.sort()
    content.sort(key=lambda x: x[0])

    json.dump(content, args.output)


if __name__ == "__main__":
    main()