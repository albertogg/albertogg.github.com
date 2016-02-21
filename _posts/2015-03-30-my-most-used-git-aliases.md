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

I believe git is one of the greatest pieces of software ever made. It's a
functional tool that _just works_. If you use git on daily basis I bet you type
`git` at least a hundreds of times a day. Aliases are a way to mitigate some
large, repeated or painful to type commands, they can be added globally (hole
system) or locally (one repo only). I'll use alias globally on the post.

To add a new alias via command line you'll do something like this:

    git config --global alias.st status

The other way of adding them is by **carefully** placing the alias directly in
the `~/.gitconfig` file in the same way `git config --global alias` does. All
aliases live under `[alias]` section on the file.

    [alias]
        st = status

Let's start with the aliases...

## Change branch

To change branch I have a simple and widely used alias: `co` an abbreviation for
`checkout`. It works like this:

    git co master
    Switched to branch 'master'
    Your branch is up-to-date with 'origin/master'.

To setup the alias use:

    git config --global alias.co checkout

Or copy the following into the `~/.gitconfig` file

    co = checkout

## Start new work

Start working on a new feature, fix, etc... I use `git cob <branch-name>`. This
is an alias for `checkout -b <branch-name>` that creates a new branch and moves
to it with a simple command.

    git cob test-branch
    Switched to a new branch 'test-branch'

To setup the alias use:

    git config --global alias.cob "checkout -b"

Or copy the following into the `~/.gitconfig` file

    cob = checkout -b

## Review what changed

To check the new state of your current work I use `git sts`. This is an alias
for `status -s` that will only show in a simple way which files where modified,
deleted, added, etc... with this simple command.

    git sts
     M _drafts/my-most-used-git-aliases.md

To setup the alias use:

    git config --global alias.sts "status -s"

Or copy the following into the `~/.gitconfig` file

    sts = status -s

## Rename branch

Sometimes we name a branch poorly or maybe we thought the name was "good" but
not meaningful to the work we are doing. To rename the branch locally I have a
_rename_ alias for `git branch -m`. One thing to keep in mind is that this
command works in two different ways if we are on the branch we want to rename we
can just `git rename <branch-name>` but if we are not we have to use `git rename
<old-branch-name> <new-branch-name>`

    git rename git-alias

To setup the alias use:

    git config --global alias.rename "branch -m"

Or copy the following into the `~/.gitconfig` file

    rename = branch -m

## Review which file have conflicts

This has been a really useful command for me. It tells you which files have
conflicts after merging. I picked up this command from an
[@indirect tweet][indirect-tweet] a few months back.

Let's create a "conflict" in a file to recreate how this command works.

    git merge --no-ff hello2
    Auto-merging hello
    CONFLICT (content): Merge conflict in hello
    Automatic merge failed; fix conflicts and then commit the result.

Now that we have a conflict let's try the alias.

    git conflicts
    hello

To setup the alias use:

    git config --global alias.conflicts "diff --name-only --diff-filter=U"

Or copy the following into the `~/.gitconfig` file

    conflicts = diff --name-only --diff-filter=U

## Diff by words

Diff by highlighting inline word changes instead of whole lines. It's just a
super simple alias for `git diff --word-diff`.

Here it shows that the word git was removed and changed by the word got.

    git dw
    [-git-]{+got+} conflicts

To setup the alias use:

    git config --global alias.dw "diff --word-diff"

Or copy the following into the `~/.gitconfig` file

    dw = diff --word-diff

## Pretty graph log

Show a pretty graph of commits with short inline message and custom colors.
This is a really cool command to review the commit history one of the most
useful things anyone could use. It's a long command that I bet no one could type
each time. Color can be modified easily if you dislike them.

    git lg
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

To setup the alias use:

    git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%C(bold blue)<%an>%Creset' --abbrev-commit".

Or copy the following into the `~/.gitconfig` file

    lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%C(bold blue)<%an>%Creset' --abbrev-commit

## Unstage files

Remove file from the stage area or unstage files.

    git unstage _drafts/my-most-used-git-aliases.md
    Unstaged changes after reset:
    M       _drafts/my-most-used-git-aliases.md

To setup the alias use:

    git config --global alias.unstage "reset HEAD --"

Or copy the following into the `~/.gitconfig` file

    unstage = reset HEAD --

## Search for occurrences

Searching for occurrences using `git grep` is a very common task for me.  I
normally search for function names, class namespace, variable, etc... This alias
came pretty handy a while a go because I added two flags `-Ii` to make the
search broader and that makes the command a little bit better for my use case.

Here is how to use it:

    git g openssl
    _posts/2014-05-13-installing-ruby-the-right-way-on-os-x-using-rbenv.md:Before installing any Rubies ask yourself if you want support for LibYAML, Readline and **OpenSSL** outside of rbenv. Rbenv and its plugins are a mature ecosystem that can solve common caveats in the Ruby installation by downloading, installing and compiling your rubies with the latest **OpenSSL**, LibYAML and if available on your system, Readline.
    _posts/2014-05-13-installing-ruby-the-right-way-on-os-x-using-rbenv.md:$ brew install libyaml readline **openssl**
    _posts/2014-05-13-installing-ruby-the-right-way-on-os-x-using-rbenv.md:That was really easy... but what if you want to use a custom version of **OpenSSL** or LibYAML?
    ...

To setup the alias use:

    git config --global alias.g "grep -Ii"

Or copy the following into the `~/.gitconfig` file

    g = grep -Ii

## Count commits

Count the commits between two commits. I often find myself wanting to know how
much commits in a day or how much commits do I have in a long lived feature
branch, this alias helps me with this. This is how this alias works:

    git count 452a5de 4d58be2
    5

Given that this alias is a function that receives parameters the way I advice to
setup this alias is to copy it directly into the `~/.gitconfig` file.

    count = "!f() { git log $1..$2 --pretty=oneline | wc -l; }; f"

These are all of my current aliases...

As I said before, some of my used aliases are for repetitive or long commands,
not all of them may be really useful but are easier to remember that typing a
series of options with a command. Over all I hope these aliases are helpful to
you as they are for me.

Thanks for reading!

[indirect-tweet]: https://twitter.com/indirect/status/539529691380469760
[stackoverflow]: http://stackoverflow.com/a/17843908
