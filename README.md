<div align="center">
  <h1><code>🦄</code> CZ Emoji Conversation</h1>
</div>

## `📄` Description

A [commitizen](https://github.com/commitizen/cz-cli) adapter for [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) that uses emojis for commit types.

## `🚀` Features

- [x] Commitizen adapter
- [x] Support for emojis
- [x] Searchable commit types

```shell
cz-cli@4.3.0, cz-emoji-conversation@1.0.1

? Select the type of change that you're committing: (Press <enter> to submit)
❯ feature    ✨  Introducing new features. (Features)
  fix        🐛  Fixing a bug. (Bug Fixes)
  docs       📝  Writing docs. (Documentation)
  style      🎨  Improving structure / format of the code. (Styles)
  perf       🚀  Improving performance. (Performance Improvements)
  refactor   🔨  A code change that neither fixes a bug nor adds a feature. (Code Refactoring)
  test       🧪  Adding missing tests or correcting existing tests. (Tests)
(Move up and down to reveal more choices)
```

```shell
[feature]:  ✨ Introducing new features. (Features)
[fix]:      🐛 Fixing a bug. (Bug Fixes)
[docs]:     📝 Writing docs. (Documentation)
[style]:    🎨 Improving structure / format of the code. (Styles)
[perf]:     🚀 Improving performance. (Performance Improvements)
[refactor]: 🔨 A code change that neither fixes a bug nor adds a feature. (Code Refactoring)
[test]:     🧪 Adding missing tests or correcting existing tests. (Tests)
[build]:    👷 Changes that affect the build system or external dependencies.
[ci]:       🔧 Changes to our CI configuration files and scripts. (Continuous Integrations)
[rev]:      ⏪ Reverting changes. (Reverts)
[wip]:      🚧 Work in progress. (WIP)
```

## `📦` Installation

```shell
npm install --save-dev cz-emoji-conversation
# or
npm install --global cz-emoji-conversation
```

## `🔧` Usage

### `📝` Commitizen

```json
{
  "config": {
    "commitizen": {
      "path": "cz-emoji-conversation"
    }
  }
}
```

## `📄` License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
