---
date: 2014-11-08T00:00:00Z
title: 'Error: client and server don''t have same version'
slug: /error-client-and-server-don't-have-same-version/
translationKey: "error-client-and-server-dont-have-same-version"
description: |-
  Cómo corregir el error de Boot2docker cuando cliente y servidor no tienen la
  misma versión.
categories:
  - Development
tags:
  - Docker
  - Boot2docker
  - CLI
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

Al usar Docker con Boot2docker, quizá viste este error:

> Error: client and server don't have same version (client : X, server: X)

Ocurre porque la versión de Docker en la imagen de Boot2docker y la versión en
la máquina host no coinciden.

    $ docker version
    Client version: 1.3.0
    Client API version: 1.15
    Go version (client): go1.3.3
    Git commit (client): c78088f
    OS/Arch (client): darwin/amd64
    2014/11/03 13:21:38 Error response from daemon: client and server don't have same version (client : 1.15, server: 1.14)

La solución es actualizar la imagen de la VM de Boot2docker:

    $ boot2docker stop # stop boot2docker running instances
    $ boot2docker download # download and install the new VM image
    $ boot2docker start # start the updated VM

¡Espero que ayude!
