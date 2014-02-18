---
layout: wiki
title: Commit subdirectoy application to Heroku
description: How push a git subdirectory application to Heroku.
categoy: wiki
tag: wiki
---

Directory structure:

```bash
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
```

If you want to commit any of the proyects `express` or `railsapi` to heroku you
can use this command:

```bash
$ git subtree push --prefix railsapi heroku master
```

