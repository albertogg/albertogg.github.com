---
layout: post
title: Delete stopped & untagged docker images
description: Delete all stopped and untagged (none) Docker images generated from building multiple times images.
category: wiki
tag: wiki
---


If you want or need first stop the containers

```bash
$ docker stop $(docker ps -a -q)
```

Delete all stopped containers

```bash
$ docker rm $(docker ps -a -q)
```

Delete all untagged images (TAG: `<none>`)

```bash
$ docker rmi $(docker images | awk '/^<none>/ { print $3 }')
```
