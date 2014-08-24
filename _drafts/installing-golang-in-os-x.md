---
layout: post
title: Installing Golang in OS X
description: Installing Golang in OS X using Homebrew and a single GOPATH
category: blog
tag: blog
---

> tl;dr this are my notes for installing Go (Golang) in OS X using hombrew,
adding command completions in ZSH, a single GOPATH and all around clean install.

## Installing Go

Today we'll install the Go programming language and dependencies using OS X
[Homebrew][brew]. Keep in mind that this an specific OS X installation, but the
core concept will be almost the same for all Unix like Operating Systems.

Our first and only step in the Homebrew installation department will be
installing Mercurial [(hg)][hg] version control along with go.

> Mercurial is not a Go dependency within Homebrew, but, there are some specific
> packages/tools like `go get` that use it, so keep that in mind.

```bash
$ brew install hg go
```

This will install hg and Go with the `--cross-compile-common` flag. The cross
compile common flag will build the language with cross-compilers and runtime
support for darwin, linux and windows. If you want cross-compilers and runtime
support for all Go supported platforms append `--cross-compile-all` flag to the
installation command.

You can check the existing flags using `brew info go`.

## Setting the GOPATH

For the go path, I prefer to use a unique/single one for all my projects and I
like to have all packages within the `~/go` directory. I'll have to admit that
I haven't done anything complex in Go that deserves more than a single GOPATH;
maybe I'll have to bite my tongue later on, but, you know... It's my current
opinion and if you feel like a single GOPATH is not good for you it's OK too.

I'll recommend you read this [article][article] that explains why it's a good
idea to have a single GOPATH and when it's not.

Enough talking, lets create our GOPATH directory and export to the environment:

```bash
$ mkdir ~/go
$ export GOPATH=$HOME/go
$ export PATH="$GOPATH/bin:$PATH"
```

You can use any other directory, but, I found this is a common one, so lets
stick with the "convention". Here we are exporting the GOPATH and adding any Go
generated binaries to the path.

## Set completions ZSH

When installing Go with Homebrew all ZSH completions are thrown at
`/usr/local/share/zsh/site-functions` if we want to use them you can add this
simple ZSH plugin.

```bash
completion="$(brew --prefix)/share/zsh/site-functions/go"

if test -f $completion
then
  source <(cat $completion)
fi
```

After restarting or reloading your shell session you'll be able to `tab`
complete the different go CLI commands.

## If using Vim

If you are using Vim as your text editor I blindly recommend you install
[vim-go](https://github.com/fatih/vim-go) from [fatih](https://github.com/fatih)
it's a fantastic plugin, really really complete and well crafted.

[article]: http://arslan.io/ten-useful-techniques-in-go
[brew]: http://brew.sh/
[hg]: http://mercurial.selenic.com/
