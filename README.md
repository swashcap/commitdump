# commitdump

_Dump information about a repository's commits_

## You

* Have a git repository
* Want to know information about its commits

## What

This CLI outputs commit information in CSV format:

```shell
$ npx @swashcap/commitdump > dump.csv
$ cat dump.csv
Commit,Author name,Author email,Author date,Insertions,Deletions
8eecf51,Bananas Bananas,bananas@gmail.com,2019-05-11T13:45:53-07:00,20,1
eaacef6,Space Kittens ,space.kittens@gmail.com,2019-05-11T13:44:12-07:00,9,0
a633653,Dino DNA,dinosaurs@gmail.com,2019-05-11T13:42:57-07:00,264,0
```

👏

## Requirements

* [Node.js][node] >= v12.x.x
* [npx][npx]) (comes with Node.js)
* [Logged in][github-npm] to GitHub's npm registry:
  ```shell
  $ npm login --registry=https://npm.pkg.github.com
  ```

[github-npm]: https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages
[node]: https://nodejs.org/en/
[npx]: https://www.npmjs.com/package/npx

