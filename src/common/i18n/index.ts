import * as vscode from "vscode"

import * as DEFAULT from "../../../package.nls.json"
import * as JA from "../../../package.nls.ja.json"

export function getLocalization(): Localization {
    const language = vscode.env.language

    switch (language.slice(0, 2)) {
        case "ja":
            return new Localization(JA)
        default:
            return new Localization(DEFAULT)
    }
}

class Localization {
    constructor(private readonly json: typeof DEFAULT) {}

    localize(key: keyof typeof DEFAULT, ...args: (string | number)[]): string {
        return args.length <= 0
            ? this.json[key]
            : `${this.json[key]} (${args.join(", ")})`
    }
}
