import * as vscode from "vscode"

import { COMMAND_CREATE } from "./base/consts"
import { createProject } from "./features/project"

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand(COMMAND_CREATE, async () => {
            await createProject()
        })
    )
}

export function deactivate() {
    // noop
}
