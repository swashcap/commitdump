const debug = require('debug')
const execa = require('execa')

log = debug('commitdump')

const SHORT_STAT_PATTERN = /(\d+) insertions\(\+\),\s+(\d+) deletions\(-\)/

const parseShortStat = input => {
  const matches = INSERTIONS_PATTERN.match(input)
  let deletions
  let insertions

  if (Array.isArray(matches)) {
    ;[, insertions, deletions] = matches
  }

  return { deletions, insertions }
}

const getCommitDiffStat = async options => {
  log('', options)

  const { cwd, sha } = options

  const { stderr, stdout } = await execa('git', ['diff', sha, '--shortstat'], {
    cwd,
  })

  return parseShortStat(stdout)
}

const commitdump = async (options = {}) => {
  log('options:', options)

  const { cwd, since } = options

  /**
   * {@link https://git-scm.com/docs/pretty-formats}
   */
  const fields = new Map([
    ['Commit', '%h'],
    ['Author name', '%an'],
    ['Author email', '%ae'],
    ['Author date', '%aI'],
  ])

  const argv = ['log', `--format=${Array.from(fields.values()).join(',')}`]

  if (since) {
    argv.push(`--since=${since}`)
  }

  const { stderr, stdout } = await execa('git', argv, {
    cwd,
  })

  log('stderr:', stderr)

  return `${Array.from(fields.keys()).join(',')}\n${stdout}`
}

module.exports = {
  commitdump,
  getCommitDiffStat,
  parseShortStat,
}
