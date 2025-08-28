---
layout: post
title: Git Tricks
description: Source control tool
categories: software
tags: programming
author: Mason
---

## Git add KEY and push

```
ssh-keygen
ssh-copy-id -i ~/.ssh/id_rsa.pub gituser@git.server.com
```

## Common usage

```
git clone ssh://git@10.5.20.16:/home/git/bigdata/deploy.git
cd deploy
cp folders and files here
git status –s
git add .
git status –s
git commit -m 'Initial commit'
git log
git log --oneline --no-merges v4.03.00 ^v4.02.00 > change.log
git log --oneline --no-merges v4.03.00 ^v4.02.00 subfolder/ > change.log
git show commitID
git remote add origin ssh://git@10.5.20.16:/home/git/bigdata/deploy.git
git push origin master
git pull
git pull origin FixForBug
git push origin FixForBug
git diff HEAD (for the staged files)
git diff ':(exclude)*.pdf'
git diff --name-only HEAD~10 HEAD~5
git diff HEAD~5 hello.c
```

## Git config

```
git config --global user.name
git config --global user.email
```

```
git config --local user.name xxx
git config --local user.email xxx@example.com
```

## How do I include Git commit hash in managed source code?

```
git rev-parse --verify HEAD (getting the full SHA1)
git rev-parse --short HEAD
```

In PHP and other common languages, this would be done using the backtick operator.

```
<footer>
Version <?php echo `git rev-parse --verify HEAD`; ?>
</footer>
```

```
$ git describe --tags
v0.0.5-1-g1ef24e5

# v0.0.5  -- the last recent tag
# 1 -- number of commits done since that tag
# g1ef24e5 -- the SHA1 hash of the current commit
```

## Tag

### Checkout remote tag

First, make sure that the tag exists locally by doing

```
# --all will fetch all the remotes.
# --tags will fetch all tags as well
git fetch --all --tags --prune
```

Then check out the tag by running

```
git checkout tags/<tag_name> -b <branch_name>
```

### Add a tag

```
rm -rf my-submodule
git submodule update --init --recursive
cd my-submodule
git checkout $TAG-OF-SUBMODULE
cd ..
git diff
```

```
-Subproject commit ce83a24123592d41e80ea1b9436fb0ce67ead08b
+Subproject commit fc5afc6591b824c0477264daca9e60ac2fadb10f
```

```
git commit -m "Release version: 2.00.02"
git push
git tag MTP-WEB-2.00.02
git push origin MTP-WEB-2.00.02
```

### Delete a tags

To remove the tag from the remote repository:

```
git push --delete origin TAGNAME
```

You may also want to delete the tag locally:

```
git tag -d TAGNAME
```

## Git stash

* git stash: 备份当前的工作区的内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前的工作区内容保存到Git栈中。
* git stash pop: 从Git栈中读取最近一次保存的内容，恢复工作区的相关内容。由于可能存在多个Stash的内容，所以用栈来管理，pop会从最近的一个stash中读取内容并恢复。
* git stash list: 显示Git栈内的所有备份，可以利用这个列表来决定从那个地方恢复。
* git stash clear: 清空Git栈。此时使用gitg等图形化工具会发现，原来stash的哪些节点都消失了。

* 储藏

当你正在做一项复杂的工作时, 发现了一个和当前工作不相关但是又很讨厌的bug. 你这时想先修复bug再做手头的工作, 那么就可以用`git stash`来保存当前的工作状态, 等你修复完bug后,执行反储藏(unstash)操作就可以回到之前的工作里.

```
$ git stash "work in progress for foo feature"
```

上面这条命令会保存你的本地修改到储藏(stash)中, 然后将你的工作目录和索引里的内容全部重置, 回到你当前所在分支的上次提交时的状态.

好了, 你现在就可以开始你的修复工作了.

```
... edit and test ...
$ git commit -a -m "blorpl: typofix"
```

当你修复完bug后, 你可以用`git stash apply`来回复到以前的工作状态.

* 储藏队列

你也可多次使用`git stash`命令,　每执行一次就会把针对当前修改的储藏(stash)添加到储藏队列中. 用`git stash list`命令可以查看你保存的储藏(stashes):

```
$>git stash list
stash@{0}: WIP on book: 51bea1d... fixed images
stash@{1}: WIP on master: 9705ae6... changed the browse code to the official repo123
```

可以用类似`git stash apply stash@{1}`的命令来使用在队列中的任意一个储藏(stashes). `git stash clear`则是用来清空这个队列.

## Get specific version by a commit ID

```
git reset --hard <commit-hash>
```

## Determine the URL that a local Git repository was originally cloned from

```
git remote show origin
git remote -v
```

## Change the remote's URL

```
git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```

## Patch

Compare files from two different branches

```
git diff mybranch master -- myfile
```

Create patch file

```
git diff --no-prefix > [path file name]
git diff > patch.diff
git diff mybranch master > diff.patch
```

Apply path file

```
git apply diff.patch
patch -p0 < [path file name]
patch -p1 < patch.diff
```

## Branch

Switch to a certain local branch

```
git checkout webnotes
```

Create a new local branch

```
git checkout -b feature_branch_name
```

Edit, add and commit your files. Then push your branch to the remote repository

```
git push -u origin feature_branch_name
```

Delete a local branch

```
git branch -d the_local_branch
```

Change old to new

```
git branch -m gh-pages gh-pages-beforebs
git branch -m webnotes-bootstrap gh-pages
git remote set-head origin gh-pages-beforebs
```

Set the Master branch to another on GitHub, then do

```
git push origin --delete gh-pages
git push origin gh-pages
git remote set-head origin gh-pages
```

To update the local list of remote branches:

```
git remote update origin --prune
```

## Merge

Update a branch then switch to another one

```
git push -u origin gh-pages
git checkout webnotes
```

Merge all commits
```
git merge origin/gh-pages
```

Merge files or a particular file, not the whole instead
```
git checkout gh-pages _sass/_base.scss
git checkout gh-pages-beforebs _posts
```

## Push to Gerit

```
git push origin <local_branch>:refs/for/<remote_branch>
git clone ssh://
cd webservice
git branch -a
git checkout -b dev-br1 -t origin/dev-br1
git push origin HEAD:refs/for/master
```

## Reset one or more commits

```
git reset --hard HEAD~1
```

## Remove files from Git commit

```
git reset --soft HEAD~1
```

Then reset the unwanted files in order to leave them out from the commit:

```
git reset HEAD path/to/unwanted_file
```

Be cautious about doing this, since all your changes will be abandoned. So, please backup useful files in advance.

## Restore Deleted Files In Git

```
git log --diff-filter=D --summary
git checkout <COMMIT>^ -- <file>
```
![Demo](https://pic002.cnblogs.com/images/2012/26318/2012033016575974.png)

> Note: the file name is Case sensitive

## Migrate SVN to GitHub

```
sudo apt-get install git-svn
git svn clone file:///hdd/svn/SVN_175/YoyoSetup ./YoyoSetup
git remote add origin https://github.com/mason-mx/YoyoSetup.git
git push -u origin master
```

## GitHub

…or create a new repository on the command line

```
echo "# web" >> README.md
git init
git add README.mdgit commit -m "first commit"
git remote add origin https://github.com/mason-mx/web.git
git push -u origin master
```

…or push an existing repository from the command line

```
git remote add origin https://github.com/mason-mx/web.git
git push -u origin master
```

…or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.

## Troubleshooting

> Error pushing to GitHub - insufficient permission for adding an object to repository database

```
sudo chown -R 1680154:1680154 app/
```
