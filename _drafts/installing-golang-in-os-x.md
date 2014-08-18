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

The Golang project as far as I know is versioned using Mercurial so it may be
convenient to install [hg](http://mercurial.selenic.com/) prior installing Go
because there are some things that need it, like some specific commands like
godoc.

> It seems that hg is not a Go dependency any more in Homebrew but I still
> recommend installing it.

For this installation process we'll start with this command:

```bash
$ brew install hg go
```

This will install hg and Go with the `--cross-compile-common` flag. The cross
compile common flag will build the language with cross-compilers and runtime
support for darwin, linux and windows. If you want cross-compilers and runtime
support for all Go supported platforms use the `--cross-compile-all` flag.

You can check the existing flags using `brew info go`.

## Setting the GOPATH

For the go path, I prefer to use a single one for all my projects and I like to
have all packages in the `~/go` directory. You can use any other directory, but,
I found this is a common one, so, lets stick with the "convention". If you feel
like a single GOPATH is not good, this is a [great article][article] that
explains why is a good idea and probably will convince you.

Lets create the GOPATH directory and export it:

```bash
$ mkdir ~/go
$ export GOPATH=$HOME/go
$ export PATH="$GOPATH/bin:$PATH"
```

Here we are exporting the GOPATH and adding the Go generated binaries to the
path.

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
