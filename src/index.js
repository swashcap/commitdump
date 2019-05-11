const execa = require('execa')

export const commitdump = async ({ cwd, since } = {}) => {
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

  const { stdout } = await execa('git', argv, {
    cwd,
  })

  return `${Array.from(fields.keys()).join(',')}\n${stdout}`
}
