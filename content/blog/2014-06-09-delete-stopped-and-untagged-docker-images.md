---
categories:
- blog
date: 2014-06-09T00:00:00Z
description: |
  Delete all stopped and untagged (none) Docker images generated from building multiple times images
redirect_from:
- /wiki/delete-stopped-and-untagged-docker-images/
tag: blog
title: Delete stopped & untagged docker images
slug: /delete-stopped-and-untagged-docker-images/
---

If you want or need first stop the containers

    $ docker stop $(docker ps -a -q)

Delete all stopped containers

    $ docker rm $(docker ps -a -q)

Delete all untagged images (TAG: `<none>`)

    $ docker rmi $(docker images | awk '/^<none>/ { print $3 }')
