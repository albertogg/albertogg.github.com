---
date: 2015-03-30T00:00:00Z
title: Mis aliases de git más usados
slug: /my-most-used-git-aliases/
translationKey: "my-most-used-git-aliases"
description: |-
  Mis aliases de git más usados y una breve explicación de qué hacen.
categories:
  - Development
tags:
  - Git
  - CLI
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

> tl;dr descripción breve de mis aliases de git más usados.

En este post comparto mis aliases de git más usados.

Para agregar un alias por CLI:

    git config --global alias.st status

O en `~/.gitconfig`:

    [alias]
        st = status

## Cambiar de rama

    git co master

    git config --global alias.co checkout

## Empezar trabajo nuevo

    git cob test-branch

    git config --global alias.cob "checkout -b"

## Ver cambios

    git sts

    git config --global alias.sts "status -s"

## Renombrar rama

    git rename git-alias

    git config --global alias.rename "branch -m"

## Ver archivos con conflictos

    git conflicts

    git config --global alias.conflicts "diff --name-only --diff-filter=U"

## Diff por palabras

    git dw

    git config --global alias.dw "diff --word-diff"

## Log con grafo

    git lg

    git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%C(bold blue)<%an>%Creset' --abbrev-commit".

## Quitar del stage

    git unstage _drafts/my-most-used-git-aliases.md

    git config --global alias.unstage "reset HEAD --"

## Buscar ocurrencias

    git g openssl

    git config --global alias.g "grep -Ii"

## Contar commits

    git count 452a5de 4d58be2

    count = "!f() { git log $1..$2 --pretty=oneline | wc -l; }; f"

---

Espero que te sirvan tanto como a mí.

[indirect-tweet]: https://twitter.com/indirect/status/539529691380469760
[stackoverflow]: http://stackoverflow.com/a/17843908
