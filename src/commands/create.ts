import * as vscode from "vscode"
import * as friendly from "friendly-words"
import { format } from "../utils/format"

function generateRandomName() {
    const rand_pred_idx = Math.floor(Math.random() * friendly.predicates.length)
    const rand_obj_idx = Math.floor(Math.random() * friendly.objects.length)

    return (
        friendly.predicates[rand_pred_idx] +
        "-" +
        friendly.objects[rand_obj_idx]
    )
}

export async function create() {
    if (!vscode.workspace.fs.isWritableFileSystem("file")) {
        await vscode.window.showErrorMessage(
            vscode.l10n.t("This file system is not writable."),
        )

        return
    }

    const defaultFolder = vscode.workspace
        .getConfiguration("create-project")
        .get<string>("defaultFolder", "")

    const defaultName = vscode.workspace
        .getConfiguration("create-project")
        .get<string>("defaultName", "{randomName}")

    const name = format(defaultName, { randomName: generateRandomName })

    let value: string

    try {
        value = vscode.Uri.joinPath(
            vscode.Uri.file(defaultFolder),
            name,
        ).fsPath.toString()
    } catch {
        await vscode.window.showErrorMessage(
            vscode.l10n.t(
                "Failed to parse the default folder path. Please check the extension settings.",
            ),
        )
        return
    }

    const input = await vscode.window.showInputBox({
        title: vscode.l10n.t("Input your project folder path."),
        value,
        valueSelection: [value.length - name.length, value.length],
    })

    if (!input) {
        await vscode.window.showInformationMessage(
            vscode.l10n.t("No input. Aborted."),
        )

        return
    }

    let uri: vscode.Uri

    try {
        uri = vscode.Uri.file(input)
    } catch {
        await vscode.window.showErrorMessage(
            vscode.l10n.t("Failed to parse the folder path: {0}", input),
        )

        return
    }

    try {
        await vscode.workspace.fs.createDirectory(uri)
    } catch {
        await vscode.window.showErrorMessage(
            vscode.l10n.t(
                "Failed to create the directory: {0}",
                uri.toString(),
            ),
        )

        return
    }

    await vscode.commands.executeCommand("vscode.openFolder", uri)
}
