enum CommitType {
  Feat = 'feat',
  Fix = 'fix',
  Docs = 'docs',
  Style = 'style',
  Refactor = 'refactor',
  Perf = 'perf',
  Test = 'test',
  Build = 'build',
  CI = 'ci',
  Chore = 'chore',
  Revert = 'revert'
}

interface CommitTypeInfo {
  description: string
  title: string
  emoji: string
}

const commitTypes: Record<CommitType, CommitTypeInfo> = {
  [CommitType.Feat]: {
    description: 'A new feature',
    title: 'Features',
    emoji: '🌟'
  },
  [CommitType.Fix]: {
    description: 'A bug fix',
    title: 'Bug Fixes',
    emoji: '🐞'
  },
  [CommitType.Docs]: {
    description: 'Documentation only changes',
    title: 'Documentation',
    emoji: '📚'
  },
  [CommitType.Style]: {
    description:
      'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    title: 'Styles',
    emoji: '💅'
  },
  [CommitType.Refactor]: {
    description: 'A code change that neither fixes a bug nor adds a feature',
    title: 'Code Refactoring',
    emoji: '🛠️'
  },
  [CommitType.Perf]: {
    description: 'A code change that improves performance',
    title: 'Performance Improvements',
    emoji: '🚀'
  },
  [CommitType.Test]: {
    description: 'Adding missing tests or correcting existing tests',
    title: 'Tests',
    emoji: '🧪'
  },
  [CommitType.Build]: {
    description:
      'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
    title: 'Builds',
    emoji: '🏗️'
  },
  [CommitType.CI]: {
    description:
      'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
    title: 'Continuous Integrations',
    emoji: '🔧'
  },
  [CommitType.Chore]: {
    description: "Other changes that don't modify src or test files",
    title: 'Chores',
    emoji: '🧹'
  },
  [CommitType.Revert]: {
    description: 'Reverts a previous commit',
    title: 'Reverts',
    emoji: '⏪'
  }
}

export { CommitType, commitTypes }
