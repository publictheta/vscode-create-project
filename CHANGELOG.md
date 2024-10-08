# Changelog

## Unreleased

- Add a setup prompt for the default folder if not configured.
- Fix to unknown placeholders in the default name are replaced with a empty string instead of `undefined`.
- Update README.md.

## 0.3.1 - 2024-10-03

- Fix empty name not being set as the default name.

## 0.3.0 - 2024-10-03

- Add an option to set the default name for compatibility with legacy behavior.
- Add "Create Empty Project" button to the explorer. It is shown when no folder is open.
- Add a prompt to confirm the parent directory creation.
- Change the command name to "Create New Empty Project" form "Create New Project" for consistency and clarity.
- Remove the abort notification.

## 0.2.0 - 2024-10-01

- Bump minimum required version of VS Code to 1.93.0.
- Refactor the entire codebase.
- Change the default name to a random name (e.g. `fancy-zephyr`). [#5] by [@wmstack]

[#5]: https://github.com/publictheta/vscode-create-project/pull/5
[@wmstack]: https://github.com/wmstack

## 0.1.1 - 2022-03-06

- Improve error reporting.

## 0.1.0 - 2022-02-05

- Initial release.
