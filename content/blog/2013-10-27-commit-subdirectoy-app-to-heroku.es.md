---
date: 2013-10-27T00:00:00Z
title: Publicar una aplicación en subdirectorio en Heroku
slug: /commit-subdirectoy-app-to-heroku/
translationKey: "commit-subdirectoy-app-to-heroku"
description: |-
  Cómo hacer push de una aplicación en un subdirectorio de git (subtree) a Heroku.
categories:
  - Development
tags:
  - Ruby
  - Rake
  - Heroku
  - CLI
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

Estructura de directorios:

    .
    ├── LICENSE
    ├── README.md
    ├── express
    │   ├── Procfile
    │   ├── README.md
    │   ├── app.js
    │   ├── models
    │   │   └── user.js
    │   ├── ormConfig.js
    │   ├── package.json
    │   └── seeds.js
    └── railsapi
        ├── Gemfile
        ├── Gemfile.lock
        ├── Procfile
    ...

Si quieres publicar cualquiera de los proyectos `express` o `railsapi` en Heroku,
puedes usar este comando:

    $ git subtree push --prefix railsapi heroku master
