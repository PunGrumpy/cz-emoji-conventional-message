const CommitType = {
  feature: {
    title: 'Features',
    name: 'feat',
    emoji: '✨',
    description: 'Introducing new features.'
  },
  fix: {
    title: 'Bug Fixes',
    name: 'fix',
    emoji: '🐛',
    description: 'Fixing a bug.'
  },
  docs: {
    title: 'Documentation',
    name: 'docs',
    emoji: '📝',
    description: 'Writing docs.'
  },
  style: {
    title: 'Styles',
    name: 'style',
    emoji: '🎨',
    description: 'Improving structure / format of the code.'
  },
  perf: {
    title: 'Performance Improvements',
    name: 'perf',
    emoji: '🚀',
    description: 'Improving performance.'
  },
  refactor: {
    title: 'Code Refactoring',
    emoji: '🔨',
    description: 'A code change that neither fixes a bug nor adds a feature.',
    name: 'refactor'
  },
  test: {
    title: 'Tests',
    name: 'test',
    emoji: '🧪',
    description: 'Adding missing tests or correcting existing tests.'
  },
  build: {
    title: 'Builds',
    name: 'build',
    emoji: '👷',
    description:
      'Changes that affect the build system or external dependencies.'
  },
  ci: {
    title: 'Continuous Integrations',
    name: 'ci',
    emoji: '🔧',
    description: 'Changes to our CI configuration files and scripts.'
  },
  chore: {
    title: 'Chores',
    name: 'chore',
    emoji: '🧹',
    description: "Other changes that don't modify src or test files."
  },
  revert: {
    title: 'Reverts',
    name: 'revert',
    emoji: '⏪',
    description: 'Reverts a previous commit.'
  },
  wip: {
    title: 'WIP',
    name: 'wip',
    emoji: '🚧',
    description: 'Work in progress.'
  },
  container: {
    title: 'Container',
    name: 'container',
    emoji: '🐳',
    description: 'Updating containers. Docker, CircleCI, BrowserStack, etc.'
  },
  ui: {
    title: 'User Interface',
    name: 'ui',
    emoji: '💄',
    description: 'Changes affecting the user interface.'
  },
  ux: {
    title: 'User Experience',
    name: 'ux',
    emoji: '👁️',
    description: 'Changes affecting the user experience.'
  },
  i18n: {
    title: 'Internationalization',
    name: 'i18n',
    emoji: '🌐',
    description: 'Changes affecting internationalization and localization.'
  },
  analytics: {
    title: 'Analytics',
    name: 'analytics',
    emoji: '📈',
    description: 'Changes affecting analytics.'
  },
  security: {
    title: 'Security',
    name: 'sec',
    emoji: '🔒',
    description: 'Changes affecting security.'
  }
}

module.exports = CommitType
