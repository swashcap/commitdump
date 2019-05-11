#!/usr/bin/env node
require('hard-rejection/register')

const meow = require('meow')
const path = require('path')

const { commitdump } = require('./index.js')

const cli = meow(
  `
  Usage
    $ commitdump

  Options
    --since  Date
`,
  {
    flags: {
      since: {
        type: 'string',
      },
    },
  }
)

let cwd = process.cwd()

if (cli.input[0]) {
  cwd = path.isAbsolute(cli.input[0])
    ? cli.input[0]
    : path.join(process.cwd(), cli.input[0])
}

;async () => {
  console.log(
    await commitdump({
      cwd,
      since: cli.flags.since,
    })
  )
}
