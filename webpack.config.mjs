// @ts-check
"use strict"

import path from "node:path"

const __dirname = path.dirname(new URL(import.meta.url).pathname)

/**
 * @param {{ }} env
 * @param {{ mode?: "production" | "development" | "none" }} argv
 * @returns { import("webpack").Configuration }
 */
export default function (env, argv) {
    const mode = argv.mode === "production" ? "production" : "development"

    const isProd = mode === "production"

    return {
        name: "extension",
        target: "webworker",
        mode,
        entry: {
            extension: `./src/extension.ts`,
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            library: {
                type: "commonjs",
            },
            clean: true,
        },
        devtool: isProd ? undefined : "source-map",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: {
                        loader: "swc-loader",
                        // https://swc.rs/docs/configuration/compilation
                        options: {
                            jsc: {
                                parser: {
                                    syntax: "typescript",
                                },
                            },
                        },
                    },
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [".ts", ".js", ".json"],
        },
        externals: {
            vscode: "commonjs vscode",
        },
    }
}
