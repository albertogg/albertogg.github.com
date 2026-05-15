---
date: 2014-04-20T00:00:00Z
title: Haz prune siempre de las ramas remote-tracking
slug: /always-prune-remote-tracking-branches/
translationKey: "always-prune-remote-tracking-branches"
description: |-
  Haz prune automáticamente de tus ramas remote-tracking en cada fetch o pull
  con la configuración correcta. Solo necesitas Git 1.8.5 o superior.
categories:
  - Development
tags:
  - Git
  - CLI
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

> **tl;dr** after version 1.8.5 of git, you can now configure it to
> automatically prune remote-tracking branches with every fetch/pull.

Antes de Git 1.8.5, si querías limpiar ramas remote-tracking debías recordar
`git fetch --prune`. Si sueles hacer `pull` y luego usar ese comando cada tanto,
esta configuración es para ti.

Hay dos comandos de configuración para lograr este comportamiento.
El primero es:

    $ git config fetch.prune true

Este comando activa prune automáticamente en cada fetch. Por defecto está en
false. Y sí, `git pull` usa esta bandera implícitamente.

Salida de ejemplo:

    $ git pull
    From github.com:albertogg/test-something
     x [deleted]         (none)     -> origin/fix-bleh
     x [deleted]         (none)     -> origin/fix-something
     x [deleted]         (none)     -> origin/add-gravatar
    remote: Counting objects: 5, done.
    remote: Compressing objects: 100% (5/5), done.
    remote: Total 5 (delta 1), reused 0 (delta 0)
    Unpacking objects: 100% (5/5), done.
       def27ef..5596684  master     -> origin/master
    First, rewinding head to replay your work on top of it...
    Fast-forwarded master to 5596684fbd39d037e1a60a8b75f250d059c3e904.

El segundo comando es similar, pero aplica solo a un remoto específico (por
 ejemplo `origin`):

    $ git config remote.origin.prune true

En ambos casos el resultado es el mismo. Si configuras ambos, el segundo
sobrescribe al primero.

---

Recuerda que puedes aplicar esto globalmente usando `--global`, por ejemplo:
`git config --global fetch.prune true`.

¡Gracias por leer!
