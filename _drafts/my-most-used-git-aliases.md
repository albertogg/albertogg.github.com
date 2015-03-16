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

The other way of adding them is by **carefully** placing the alias directly in
the `~/.gitconfig` file in the same way `git config --global alias` does.

```
[alias]¬
    st = status¬
```

Let's start with the aliases...

## Change branch

To change branch I have a simple and widely used alias: `co` an abbreviation for
`checkout`. It works like this:

```bash
git co master
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'.
```

To setup the alias, copy the following into the `~/.gitconfig` or use `git
config --global alias.co checkout`.

```bash
co = checkout
```

## Start new work

Start working on a new feature, fix, etc... I use `git cob <branch-name>`. This
is an alias for `checkout -b <branch-name>` that creates a new branch and moves
to it with a simple command.

```bash
git co -b test-branch
Switched to a new branch 'test-branch'
```

To setup the alias, copy the following into the `~/.gitconfig` or use `git
config --global alias.cob "checkout -b"`.

```bash
cob = checkout -b
```

## Review what changed

```bash
sts = status -s
```

## Rename branch

Sometimes we name a branch poorly or maybe we thought the name was "good" but
not meaningful to the work we are doing. To rename the branch locally I have a
rename alias for `git branch -m`. One thing to keep in mind is that this command
works in two different ways if we are on the branch we want to rename we can
just `git rename <branch-name>` but if we are not we have to use `git rename
<old-branch-name> <new-branch-name>`

```bash
git rename git-alias
```

To setup the alias, copy the following into the `~/.gitconfig` or use `git
config --global alias.rename "branch -m"`.

```bash
rename = branch -m
```

## Review which file have conflicts

This has been a really useful command for me. It tells you which files have
conflicts after merging. I picked up this command from an
[@indirect tweet][indirect-tweet] a few months back.

```bash
git merge --no-ff hello2
Auto-merging hello
CONFLICT (content): Merge conflict in hello
Automatic merge failed; fix conflicts and then commit the result.

git conflicts
hello
```

To setup the alias, copy the following into the `~/.gitconfig` or use `git
config --global alias.conflicts "diff --name-only --diff-filter=U"`.

```bash
conflicts = diff --name-only --diff-filter=U
```

## Diff by words

```bash
dw = diff --word-diff
```

## Pretty graph log

```bash
*   4d58be2 - Merge branch 'packer' (4 weeks ago)<Alberto Grespan>
|\
| * 2a3b6ad - Publishing the Packer post (4 weeks ago)<Alberto Grespan>
| * 5323348 - Final draft version (4 weeks ago)<Alberto Grespan>
| * 9aed7c8 - Almost final draft (4 weeks ago)<Alberto Grespan>
| * aceb69e - Updated version of the packer draft (4 weeks ago)<Alberto Grespan>
| * 452a5de - Dropping some content for the packer do draft (4 weeks ago)<Alberto Grespan>
| * be17ffd - Creating the packer draft (5 weeks ago)<Alberto Grespan>
|/
* 6848854 - Missing file name rack-middleware post (6 weeks ago)<Alberto Grespan>
...
```

```
lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%C(bold blue)<%an>%Creset' --abbrev-commit
```

## Unstage files

```bash
git unstage _drafts/my-most-used-git-aliases.md
Unstaged changes after reset:
M       _drafts/my-most-used-git-aliases.md
```

```bash
unstage = reset HEAD --
```

## Diff cached

```bash
dc = diff --cached
```

## Search for occurrences

```bash
git g openssl
_posts/2014-05-13-installing-ruby-the-right-way-on-os-x-using-rbenv.md:Before installing any Rubies ask yourself if you want support for LibYAML, Readline and OpenSSL outside of rbenv. Rbenv and its plugins are a mature ecosystem that can solve common caveats in the Ruby installation by downloading, installing and compiling your rubies with the latest OpenSSL, LibYAML and if available on your system, Readline.
_posts/2014-05-13-installing-ruby-the-right-way-on-os-x-using-rbenv.md:$ brew install libyaml readline openssl
_posts/2014-05-13-installing-ruby-the-right-way-on-os-x-using-rbenv.md:That was really easy... but what if you want to use a custom version of OpenSSL or LibYAML?
```

```bash
g = grep -Ii
```

## Count commits

```bash
git count 452a5de 4d58be2
5
```

```bash
count = "!f() { git log $1..$2 --pretty=oneline | wc -l; }; f"
```

## Check the parent branch of a branch

```bash
git dad
master
```

```bash
dad = !"git show-branch -a | ack '\\*' | ack -v \"`git rev-parse --abbrev-ref HEAD`\" | head -n1 | sed 's/.*\\[\\(.*\\)\\].*/\\1/' | sed 's/[\\^~].*//'"
```

[indirect-tweet]: https://twitter.com/indirect/status/539529691380469760
