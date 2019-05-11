const debug = require('debug')
const execa = require('execa')

log = debug('commitdump')

const DELETIONS_PATTERN = /(\d+) deletions?\(-\)/
const INSERTIONS_PATTERN = /(\d+) insertions?\(\+\)/

const parseShortStat = input => {
  const deletionsMatches = input.match(DELETIONS_PATTERN)
  const insertionsMatches = input.match(INSERTIONS_PATTERN)
  let deletions = 0
  let insertions = 0

  if (deletionsMatches && deletionsMatches[1]) {
    deletions = parseInt(deletionsMatches[1], 10)
  }
  if (insertionsMatches && insertionsMatches[1]) {
    insertions = parseInt(insertionsMatches[1], 10)
  }

  return { deletions, insertions }
}

const getCommitDiffStat = async options => {
  log('diffstat options:', options)

  const { cwd, sha } = options

  const { stderr, stdout } = await execa('git', ['show', sha, '--shortstat'], {
    cwd,
  })

  log('diffstat stderr:', stderr)
  log('diffstat stdout:', stdout)

  return parseShortStat(stdout)
}

const commitdump = async (options = {}) => {
  log('dump options:', options)

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

  log('dump stderr:', stderr)

  const results = await Promise.all(
    stdout.split('\n').map(async line => {
      const sha = line.split(',')[0]
      const { deletions, insertions } = await getCommitDiffStat({ cwd, sha })
      return `${line},${insertions},${deletions}`
    })
  )

  return `${[...Array.from(fields.keys()), 'Insertions', 'Deletions'].join(
    ','
  )}\n${results.join('\n')}`
}

module.exports = {
  commitdump,
  getCommitDiffStat,
  parseShortStat,
}
