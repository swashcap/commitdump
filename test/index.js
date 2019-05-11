const test = require('ava')

const {
  parseShortStat,
  getCommitDiffStat,
  commitdump,
} = require('../src/index.js')

test('parseShortStat', t => {
  t.deepEqual(
    parseShortStat(' 1 file changed, 20 insertions(+), 20 deletions(-)'),
    {
      deletions: 20,
      insertions: 20,
    },
    'insertions and deletions'
  )
  t.deepEqual(
    parseShortStat(' 7 files changed, 3941 insertions(+), 1 deletion(-)'),
    {
      deletions: 1,
      insertions: 3941,
    },
    'single deletion'
  )

  t.deepEqual(
    parseShortStat(' 1 file changed, 7 deletions(-)'),
    {
      deletions: 7,
      insertions: 0,
    },
    'no insertions'
  )
})

test('get shortstat', async t => {
  // Dogfood on this project's commit history
  const diffStat = await getCommitDiffStat({
    cwd: process.cwd(),
    sha: 'a633653',
  })
  t.deepEqual(diffStat, {
    deletions: 0,
    insertions: 3996,
  })
})
