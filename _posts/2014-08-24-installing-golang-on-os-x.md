---
layout: post
title: Installing Golang on OS X
description: Installing Golang on OS X using Homebrew and a single GOPATH
category: blog
tag: blog
---

> tl;dr this are my notes for installing Go (Golang) on OS X using hombrew,
adding command completions on ZSH, a single GOPATH and all around clean install.

Today we'll install the Go programming language and dependencies using OS X
[Homebrew][brew]. Keep in mind that this is an specific OS X installation. If
you need to install Go on Ubuntu you can follow [this guide][ubuntu], after
that you can just go on with this tutorial.

## Installing Go

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
opinion. If you feel like a single GOPATH is not good for you it's OK too.

I'll recommend you read this [article][article] that explains why it's a good
idea to have a single GOPATH and when it's not.

Enough talking, lets create our GOPATH directory and export to the environment:

```bash
$ mkdir ~/go
$ export GOPATH=$HOME/go
$ export PATH="$GOPATH/bin:$PATH"
```

You can use any other directory for the GOPATH, but I found this is a common
one within the community, so lets stick with this "convention".

We are exporting the `GOPATH` and the `$GOPATH/bin` directory to the `$PATH` to
add any existing Go generated binaries automatically to it.

## Set completions ZSH

When installing Go with Homebrew all ZSH completions are thrown to the
`/usr/local/share/zsh/site-functions` directory. If we have ZSH completions
configured to grab [completion.zsh][completions] files, we can just create a
new `completion.zsh` file for Go and add this snippet:

```bash
completion="$(brew --prefix)/share/zsh/site-functions/go"

if test -f $completion
then
  source <(cat $completion)
fi
```

After restarting or reloading your shell session you'll be able to `tab`
complete the different Go CLI commands.

> If you are a Bash user, there's a Homebrew package that's called
> `bash-completion` that will easily enable this functionality. You can check
> this comment on [stackoverflow][so] that shows how to install and configure
> the package.

## If using Vim

If you are using Vim as your text editor I blindly recommend [vim-go][vim-go]
from [fatih][fatih] it's a fantastic plugin, really really complete and well
crafted, give it a *Go*, you will not regret it.

[article]: http://arslan.io/ten-useful-techniques-in-go
[brew]: http://brew.sh/
[hg]: http://mercurial.selenic.com/
[completions]: https://github.com/albertogg/dotfiles/blob/master/zsh/zshrc.symlink#L23-31
[so]: http://stackoverflow.com/a/14970926
[vim-go]: http://stackoverflow.com/a/14970926
[fatih]: http://stackoverflow.com/a/14970926
[ubuntu]: https://code.google.com/p/go-wiki/wiki/Ubuntu
