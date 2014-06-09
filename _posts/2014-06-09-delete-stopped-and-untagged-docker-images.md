---
layout: post
title: Delete stopped & untagged docker images
description: Delete all stopped and untagged (none) Docker images generated from building multiple times images.
category: wiki
tag: wiki
---

Delete all stopped containers (because running this containers will error out)

```bash
$ docker rm $(docker ps -a -q)
```

Delete all untagged images (TAG: `<none>`)

```bash
$ docker rmi $(docker images | awk '/^<none>/ { print $3 }')
```
