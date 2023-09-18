import wrap from 'word-wrap'
import { red, green } from 'chalk'
import { commitTypes } from './cz.type'
import { configLoader } from 'commitizen'
import { AnswerInterface } from './cz.interface'

const config = configLoader.load() || {}

const defaults = {
  type: process.env.CZ_TYPE || config.defaultType || 'feat',
  scope: process.env.CZ_SCOPE || config.defaultScope || '',
  subject: process.env.CZ_SUBJECT || config.defaultSubject || '',
  body: process.env.CZ_BODY || config.defaultBody || '',
  issues: process.env.CZ_ISSUES || config.defaultIssues || '',
  scopeLowercase:
    process.env.DISABLE_SCOPE_LOWERCASE ||
    config.defaultScopeLowercase ||
    false,
  subjectLowercase:
    process.env.DISABLE_SUBJECT_LOWERCASE ||
    config.defaultSubjectLowercase ||
    false,
  maxHeaderWidth:
    (process.env.CZ_MAX_HEADER_WIDTH &&
      parseInt(process.env.CZ_MAX_HEADER_WIDTH)) ||
    config.maxHeaderWidth ||
    100,
  maxLineWidth:
    (process.env.CZ_MAX_LINE_WIDTH &&
      parseInt(process.env.CZ_MAX_LINE_WIDTH)) ||
    config.maxLineWidth ||
    100
}

const options = {
  types: config.types || commitTypes,
  ...defaults
}

const headerLength = (answers: AnswerInterface): number => {
  return (
    answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0)
  )
}

const maxSummaryLength = (
  options: { maxHeaderWidth: number },
  answers: AnswerInterface
): number => {
  return options.maxHeaderWidth - headerLength(answers)
}

const formatSubject = (
  subject: string,
  disableSubjectLowerCase: boolean
): string => {
  subject = subject.trim()
  if (!disableSubjectLowerCase) {
    subject = subject[0].toLowerCase() + subject.slice(1)
  }
  return subject
}

export const prompter = (
  cz: {
    prompt: (e: any) => Promise<{
      answers: AnswerInterface
    }>
  },
  commit: (c: string) => void
): void => {
  const typeList = Object.keys(options.types)
  const length =
    typeList.reduce((prev, curr) => Math.max(prev, curr.length), 0) + 2
  const choices = typeList.map(type => ({
    name: `${options.types[type].emoji} ${type}: ${options.types[type].description}`,
    value: options.types[type].description
  }))

  cz.prompt([
    {
      type: 'list',
      name: 'type',
      message: "Select the type of change that you're committing:",
      choices,
      default: options.type
    },
    {
      type: 'input',
      name: 'scope',
      message:
        'What is the scope of this change (e.g. component or file name): (press enter to skip)\n',
      default: options.scope,
      filter(value: string) {
        return options.scopeLowercase
          ? value.trim().toLowerCase()
          : value.trim()
      }
    },
    {
      type: 'input',
      name: 'subject',
      message: (answers: AnswerInterface) => {
        return (
          `Write a short, imperative tense description of the change (max ${maxSummaryLength(
            options,
            answers
          )} chars):\n` + ` ${red('?')} `
        )
      },
      transformer(subject: string, answers: AnswerInterface) {
        const formattedSubject = formatSubject(
          subject,
          options.subjectLowercase
        )
        const color =
          formattedSubject.length <= maxSummaryLength(options, answers)
            ? green
            : red
        return color(`(${formattedSubject.length}) ${subject}`)
      },
      filter(value: string) {
        return formatSubject(value, options.subjectLowercase)
      }
    },
    {
      type: 'input',
      name: 'body',
      message:
        'Provide a longer description of the change: (press enter to skip)\n',
      default: options.body
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
      when(answers: AnswerInterface) {
        return answers.isBreaking && !answers.body
      },
      validate(breakingBody: string) {
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
      when(answers: AnswerInterface) {
        return answers.isBreaking
      }
    },
    {
      type: 'confirm',
      name: 'isIssueAffected',
      message: 'Does this change affect any open issues?',
      default: !!options.issues
    },
    {
      type: 'input',
      name: 'issues',
      message: 'Add issue references (e.g. "fix #123", "re #123".):\n',
      default: options.issues,
      when(answers: AnswerInterface) {
        return answers.isIssueAffected
      },
      validate(issues: string) {
        return issues.trim().length > 0 || 'Issue references are required'
      }
    }
  ]).then((answers: any) => {
    const wrapOptions = {
      trim: true,
      cut: false,
      newline: '\n',
      indent: '',
      width: options.maxLineWidth
    }

    const scope = answers.scope ? `(${answers.scope})` : ''

    const head = `${answers.type}${scope}: ${answers.subject}`
    const body = answers.body ? wrap(answers.body, wrapOptions) : false

    let breaking = answers.breaking ? answers.breaking.trim() : ''
    breaking = breaking ? wrap(`BREAKING CHANGE: ${breaking}`, wrapOptions) : ''
    breaking = breaking ? wrap(breaking, wrapOptions) : false

    const issues = answers.issues ? wrap(answers.issues, wrapOptions) : false

    commit([head, body, breaking, issues].filter(Boolean).join('\n\n'))
  })
}
