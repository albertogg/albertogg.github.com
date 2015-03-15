---
layout: post
title: My most used git aliases
description: My most used git aliases and a brief explanation of what do they do.
category: blog
tag: blog
---

> tl;dr short description of my most used git aliases.

In this post I'll be talking about my most used git aliases in no particular
order. I'm going to throw all of my `.gitconfig` in here and that's all.

## Creating an alias

Aliases can be added globally or locally, I'll use alias globally. To add a new
alias you'll do something like this.

```bash
git config --global alias.st status
```

or directly **carefully** in the `~/.gitconfig` file

```
[alias]¬
    st = status¬
```

Let's start with the aliases...

## Change branch

To change branch I have a simple and widely used alias `co` an abbreviation for
`checkout`. This may be my most used alias.

```bash
git co master
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'.
```

The alias:

```bash
co = checkout
```

## Start new work

Start working on a new feature, fix, etc... I use `git cob <branch-name>`. This
is an alias for `co -b <branch-name>`

```bash
git co -b test-branch
Switched to a new branch 'test-branch'
```

```bash
cob 'checkout -b'
```

## Review what changed

```bash
sts 'status -s'
```

## Rename branch

```bash
rename 'branch -m'
```

## Review which file have conflicts

```bash
conflicts 'diff --name-only --diff-filter=UDX'
```

## Check the parent branch of a branch

```bash
dad 'show-branch | grep '*' | grep -v "$(git rev-parse --abbrev-ref HEAD)" |
head -n1 | sed 's/.*\[\(.*\)\].*/\1/' | sed 's/[\^~].*//''

## Diff by words

```bash
dfw 'diff --word-diff
```

## Pretty graph log

```
lg
```

## Unstage files

```bash
unstage 'reset HEAD --'
```

## Diff cached

```bash
dc 'diff --cached'
```

## Remove from git but not the file

```bash
trash 'rm --cached'
```

## Search for occurrences

```bash
g 'grep -Ii
```

## Count commits
