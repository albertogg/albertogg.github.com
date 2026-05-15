---
date: 2014-08-24T00:00:00Z
title: Instalar Go en OS X
slug: /installing-golang-on-os-x/
translationKey: "installing-golang-on-os-x"
description: |-
  Instalar Go (golang) en OS X usando Homebrew y un único GOPATH.
categories:
  - Development
tags:
  - Go
  - Homebrew
  - OS X
  - CLI
  - Mercurial
  - Installing
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

> **tl;dr** estas son mis notas para instalar Go en OS X con Homebrew, añadir
completions en ZSH y usar un único GOPATH.

Hoy instalaremos Go y sus dependencias en OS X usando [Homebrew][brew].

## Instalar Go

El primer paso es instalar Mercurial (`hg`) junto con Go:

    $ brew install hg go

Puedes revisar flags disponibles con `brew info go`.

## Configurar GOPATH

Prefiero usar un solo GOPATH para todos mis proyectos, en `~/go`.

    $ mkdir ~/go
    $ export GOPATH=$HOME/go
    $ export PATH="$GOPATH/bin:$PATH"
    $ export PATH="$PATH:/usr/local/opt/go/libexec/bin"

## Completions en ZSH

> As of Go 1.4, Google Removed the completions files for zsh and bash due to the
> lack of maintenance. The following will no longer work.

Si tienes configuradas tus completions con `completion.zsh`, agrega:

    completion="$(brew --prefix)/share/zsh/site-functions/go"

    if test -f $completion
    then
      source <(cat $completion)
    fi

## Si usas Vim

Si usas Vim, recomiendo [vim-go][vim-go] de [fatih][fatih].

[article]: http://arslan.io/ten-useful-techniques-in-go
[brew]: http://brew.sh/
[hg]: http://mercurial.selenic.com/
[completions]: https://github.com/albertogg/dotfiles/blob/master/zsh/zshrc.symlink#L23-31
[so]: http://stackoverflow.com/a/14970926
[vim-go]: http://stackoverflow.com/a/14970926
[fatih]: http://stackoverflow.com/a/14970926
[ubuntu]: https://code.google.com/p/go-wiki/wiki/Ubuntu
[post]: http://obahua.com/setup-vim-for-go-development/
[gist]: https://gist.github.com/cridenour/74e7635275331d5afa6b
