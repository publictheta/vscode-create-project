import * as vscode from "vscode"

import { getLocalization } from "../i18n"

export async function createProject(): Promise<void> {
    const localization = getLocalization()

    const isWritable = vscode.workspace.fs.isWritableFileSystem("file")

    if (!isWritable) {
        await vscode.window.showErrorMessage(
            localization.localize(
                "extension.create-project.message.errorFileSystemNotWritable"
            )
        )
        return
    }

    const defaultFolder = vscode.workspace
        .getConfiguration("create-project")
        .get<string>("defaultFolder", "")

    const UNTITLED = "untitled"

    let value: string

    try {
        value = vscode.Uri.joinPath(
            vscode.Uri.file(defaultFolder),
            UNTITLED
        ).fsPath.toString()
    } catch {
        value = UNTITLED
    }

    const input = await vscode.window.showInputBox({
        title: localization.localize(
            "extension.create-project.message.inputFolderPath"
        ),
        value,
        valueSelection: [value.length - UNTITLED.length, value.length],
    })

    if (!input) {
        await vscode.window.showInformationMessage(
            localization.localize(
                "extension.create-project.message.infoNoInput"
            )
        )

        return
    }

    let uri: vscode.Uri

    try {
        uri = vscode.Uri.file(input)
    } catch {
        await vscode.window.showErrorMessage(
            localization.localize(
                "extension.create-project.message.errorParseFolderPath",
                input
            )
        )

        return
    }

    try {
        await vscode.workspace.fs.createDirectory(uri)
    } catch {
        await vscode.window.showErrorMessage(
            localization.localize(
                "extension.create-project.message.errorCreateDirectory",
                uri.toString()
            )
        )

        return
    }

    await vscode.commands.executeCommand("vscode.openFolder", uri)
}
