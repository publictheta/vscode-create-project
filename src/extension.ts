import * as vscode from "vscode"

import { create } from "./commands/create"

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("create-project.create", create),
    )
}

export function deactivate() {
    // noop
}
