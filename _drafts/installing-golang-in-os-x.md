---
layout: post
title: Installing Golang in OS X
description: Installing Golang in OS X using Homebrew and a single GOPATH
category: blog
tag: blog
---

> tl;dr this are my notes for installing Go (Golang) in OS X using hombrew,
adding command completions in ZSH, a single GOPATH and all around clean
install.

## Installing Go

The Golang project as far as I know is versioned using Mercurial so it may be
convenient to install [hg](http://mercurial.selenic.com/) prior installing Go
because there are some things that need it.

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

## Set completions ZSH

## If using Vim

If you are using Vim as your text editor I blindly recommend you install
[vim-go](https://github.com/fatih/vim-go) from [fatih](https://github.com/fatih)
it's a fantastic plugin, really really complete and well crafted.
