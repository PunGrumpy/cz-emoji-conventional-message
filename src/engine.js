'format cjs'

const _ = require('lodash')
const chalk = require('chalk')
const wrap = require('word-wrap')
const map = require('lodash.map')
const longest = require('longest')
const inquirer = require('inquirer')
const SearchList = require('inquirer-search-list')

const filter = function (array) {
  return array.filter(function (x) {
    return x
  })
}

const headerLength = function (answers) {
  return (
    answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0)
  )
}

const maxSummaryLength = function (options, answers) {
  return options.maxHeaderWidth - headerLength(answers)
}

const filterSubject = function (subject, disableSubjectLowerCase) {
  subject = subject.trim()
  if (
    !disableSubjectLowerCase &&
    subject.charAt(0).toLowerCase() !== subject.charAt(0)
  ) {
    subject = subject.charAt(0).toLowerCase() + subject.slice(1, subject.length)
  }
  while (subject.endsWith('.')) {
    subject = subject.slice(0, subject.length - 1)
  }
  return subject
}

module.exports = function (options) {
  const types = options.types

  const length = longest(Object.keys(types)).length + 1
  const choices = _.map(types, function (type, key) {
    const paddedKey = _.padEnd(key, length + 1)
    const formattedName = `${paddedKey} ${type.emoji}  ${
      type.description
    } ${chalk.dim(`(${type.title})`)}`.padEnd(80)
    // value => emoji key(scope): subject
    const formattedValue = `${type.emoji} ${key}`

    return {
      name: formattedName,
      emoji: type.emoji,
      value: formattedValue
    }
  })

  return {
    prompter: function (cz, commit) {
      inquirer.registerPrompt('search-list', SearchList)

      inquirer
        .prompt([
          {
            type: 'search-list',
            name: 'type',
            message: "Select the type of change that you're committing:",
            choices,
            default: options.defaultType
          },
          {
            type: 'input',
            name: 'scope',
            message:
              'What is the scope of this change (e.g. component or file name): (press enter to skip)',
            default: options.defaultScope,
            filter: function (value) {
              return options.disableScopeLowerCase
                ? value.trim()
                : value.trim().toLowerCase()
            }
          },
          {
            type: 'input',
            name: 'subject',
            message(answers) {
              return `Write a short, imperative tense description of the change (max ${maxSummaryLength(
                options,
                answers
              )} characters):\n`
            },
            default: options.defaultSubject,
            validate(subject, answers) {
              const filteredSubject = filterSubject(
                subject,
                options.disableSubjectLowerCase
              )
              return filteredSubject.length == 0
                ? `subject is required`
                : filteredSubject.length <= maxSummaryLength(options, answers)
                ? true
                : `Subject length must be less than or equal to ${maxSummaryLength(
                    options,
                    answers
                  )} characters. Current length is ${
                    filteredSubject.length
                  } characters.`
            },
            transformer(subject, answers) {
              const filteredSubject = filterSubject(subject, options)
              const color =
                filteredSubject.length <= maxSummaryLength(options, answers)
                  ? chalk.green.bold
                  : chalk.red.bold
              return `${color(`(${filteredSubject.length})`)} ${subject}`
            }
          },
          {
            type: 'input',
            name: 'body',
            message:
              'Provide a longer description of the change: (press enter to skip)\n',
            default: options.defaultBody
          },
          {
            type: 'confirm',
            name: 'isBreaking',
            message: 'Are there any breaking changes?',
            default: false
          },
          {
            type: 'input',
            name: 'breakingBody',
            default: '-',
            message:
              'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself:\n',
            when: function (answers) {
              return answers.isBreaking && !answers.body
            },
            validate: function (breakingBody, answers) {
              return (
                breakingBody.trim().length > 0 ||
                'Body is required for BREAKING CHANGE'
              )
            }
          },
          {
            type: 'input',
            name: 'breaking',
            message: 'Describe the breaking changes:\n',
            when: function (answers) {
              return answers.isBreaking
            }
          },

          {
            type: 'confirm',
            name: 'isIssueAffected',
            message: 'Does this change affect any open issues?',
            default: options.defaultIssues ? true : false
          },
          {
            type: 'input',
            name: 'issuesBody',
            default: '-',
            message:
              'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself:\n',
            when: function (answers) {
              return (
                answers.isIssueAffected &&
                !answers.body &&
                !answers.breakingBody
              )
            }
          },
          {
            type: 'input',
            name: 'issues',
            message: 'Add issue references (e.g. "fix #123", "re #123".):\n',
            when: function (answers) {
              return answers.isIssueAffected
            },
            default: options.defaultIssues ? options.defaultIssues : undefined
          }
        ])
        .then(function (answers) {
          const wrapOptions = {
            trim: true,
            cut: false,
            newline: '\n',
            indent: '',
            width: options.maxLineWidth
          }

          const scope = answers.scope ? `(${answers.scope})` : ``

          const head = `${answers.type}${scope}: ${answers.subject}`

          const body = answers.body ? wrap(answers.body, wrapOptions) : false

          let breaking = answers.breaking ? answers.breaking.trim() : ''
          breaking = breaking
            ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '')
            : ''
          breaking = breaking ? wrap(breaking, wrapOptions) : false

          const issues = answers.issues
            ? wrap(answers.issues, wrapOptions)
            : false

          commit(filter([head, body, breaking, issues]).join('\n\n'))
        })
    }
  }
}
