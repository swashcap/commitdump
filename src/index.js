const debug = require('debug')
const execa = require('execa')

log = debug('commitdump')

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
    ['Author date', '%aD'],
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

module.exports.commitdump = commitdump
