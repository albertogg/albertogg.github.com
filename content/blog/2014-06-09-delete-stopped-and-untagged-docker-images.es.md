---
date: 2014-06-09T00:00:00Z
title: Eliminar imágenes Docker detenidas y sin etiqueta
slug: /delete-stopped-and-untagged-docker-images/
translationKey: "delete-stopped-and-untagged-docker-images"
description: |-
  Elimina todas las imágenes Docker detenidas y sin etiqueta (none) generadas
  al construir imágenes múltiples veces.
categories:
  - Development
tags:
  - Docker
  - CLI
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

Si quieres o necesitas, primero detén los contenedores

    $ docker stop $(docker ps -a -q)

Eliminar todos los contenedores detenidos

    $ docker rm $(docker ps -a -q)

Eliminar todas las imágenes sin etiqueta (TAG: `<none>`)

    $ docker rmi $(docker images | awk '/^<none>/ { print $3 }')
