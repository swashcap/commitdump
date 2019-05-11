# commitdump

_Dump information about a repository's commits_

## You

* Have a git repository
* Want to know information about its commits

## What

This CLI outputs commit information in CSV format:

```shell
$ ./src/bin.js > dump.csv
$ cat dump.csv
Commit,Author name,Author email,Author date,Insertions,Deletions
8eecf51,Bananas Bananas,bananas@gmail.com,2019-05-11T13:45:53-07:00,20,1
eaacef6,Space Kittens ,space.kittens@gmail.com,2019-05-11T13:44:12-07:00,9,0
a633653,Dino DNA,dinosaurs@gmail.com,2019-05-11T13:42:57-07:00,264,0
```

👏
