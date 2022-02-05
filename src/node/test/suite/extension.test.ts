import * as vscode from "vscode"

import assert from "assert"

suite("Extension Test Suite (Node.js)", () => {
    void vscode.window.showInformationMessage("Start all tests.")

    test("Sample test", () => {
        assert.strictEqual(true, true)
    })
})
