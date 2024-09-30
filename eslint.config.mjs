// @ts-check

import eslint from "@eslint/js"
import ts from "typescript-eslint"
import prettier from "eslint-plugin-prettier/recommended"
import globals from "globals"

export default ts.config(
    eslint.configs.recommended,
    ...ts.configs.strictTypeChecked,
    ...ts.configs.stylisticTypeChecked,
    prettier,
    {
        ignores: ["dist/**/*", "node_modules/**/*"],
    },
    {
        files: ["src/**/*"],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.json"],
            },
            globals: {
                ...globals.worker,
            },
        },
    },
    {
        ignores: ["src/**/*"],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.config.json"],
            },
            globals: {
                ...globals.node,
            },
        },
    },
)
