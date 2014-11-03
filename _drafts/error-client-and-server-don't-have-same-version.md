---
layout: post
title: Error: client and server don't have same version
description: 155 char description
category: blog or wiki
tag: blog or wiki
---

When using Docker on a mac through Boot2docker and you get this error:

```bash
$ docker version
Client version: 1.3.0
Client API version: 1.15
Go version (client): go1.3.3
Git commit (client): c78088f
OS/Arch (client): darwin/amd64
2014/11/03 13:21:38 Error response from daemon: client and server don't have same version (client : 1.15, server: 1.14)
```

or

```bash
$ docker build -t my_containers .
2014/11/03 13:13:06 Error: client and server don't have same version (client : 1.15, server: 1.14)
```

You'll know an update of the Boot2docker image is needed:

```bash
$ boot2docker stop
$ boot2docker download
$ boot2docker start
```

Hope this helps!
