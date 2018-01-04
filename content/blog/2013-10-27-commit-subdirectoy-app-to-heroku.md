---
date: 2013-10-27T00:00:00Z
title: Commit subdirectoy application to Heroku
slug: /commit-subdirectoy-app-to-heroku/
description: |-
  How push a git subdirectory (subtree) application to Heroku.
categories:
  - Development
tags:
  - Ruby
  - Rake
  - Heroku
  - CLI
---

Directory structure:

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

If you want to commit any of the projects `express` or `railsapi` to Heroku you
can use this command:

    $ git subtree push --prefix railsapi heroku master
