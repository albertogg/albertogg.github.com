---
categories:
- blog
date: 2014-06-09T00:00:00Z
description: |
  Delete all stopped and untagged (none) Docker images generated from building multiple times images.
redirect_from:
- /wiki/delete-stopped-and-untagged-docker-images/
tag: blog
title: Delete stopped & untagged docker images
url: /2014/06/09/delete-stopped-and-untagged-docker-images/
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
