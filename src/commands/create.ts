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
    // Check the file system

    if (!vscode.workspace.fs.isWritableFileSystem("file")) {
        await vscode.window.showErrorMessage(
            vscode.l10n.t("This file system is not writable."),
        )

        return
    }

    // Get configuration

    const defaultFolder = vscode.workspace
        .getConfiguration("create-project")
        .get<string>("defaultFolder", "")

    const defaultName = vscode.workspace
        .getConfiguration("create-project")
        .get<string>("defaultName", "{randomName}")

    // Check `defaultFolder`

    let defaultFolderUri: vscode.Uri

    try {
        defaultFolderUri = vscode.Uri.file(defaultFolder)
    } catch {
        await vscode.window.showErrorMessage(
            vscode.l10n.t(
                "Failed to parse the default folder: {0}",
                defaultFolder,
            ),
        )
        return
    }

    // Format `defaultName`

    const name = format(defaultName, { randomName: generateRandomName })

    // Check `defaultName`

    let value: string

    try {
        value = vscode.Uri.joinPath(defaultFolderUri, name).path
    } catch {
        await vscode.window.showErrorMessage(
            vscode.l10n.t("Failed to parse the default name: {0}", defaultName),
        )
        return
    }

    // Ask the project folder path

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

    // Parse the project folder path

    let uri: vscode.Uri

    try {
        uri = vscode.Uri.file(input)
    } catch {
        await vscode.window.showErrorMessage(
            vscode.l10n.t(
                "Failed to parse the project folder path: {0}",
                input,
            ),
        )

        return
    }

    // Create the directory

    try {
        await vscode.workspace.fs.createDirectory(uri)
    } catch {
        await vscode.window.showErrorMessage(
            vscode.l10n.t("Failed to create the directory: {0}", uri.path),
        )

        return
    }

    // Open the directory

    await vscode.commands.executeCommand("vscode.openFolder", uri)
}
