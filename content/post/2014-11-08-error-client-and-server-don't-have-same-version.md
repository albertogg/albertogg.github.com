---
categories:
- blog
date: 2014-11-08T00:00:00Z
description: |
  Fixing the Boot2docker error message that says that the client and the server don't have the same version.
tag: blog
title: 'Error: client and server don''t have same version'
url: /2014/11/08/error-client-and-server-don't-have-same-version/
---

When using Docker through Boot2docker there is a possibility you've seen:

> Error: client and server don't have same version (client : X, server: X)

This error occurs because the version of Docker installed on the Boot2docker
image and the version of Docker installed on the host machine (your mac) are not
the same.

```bash
$ docker version
Client version: 1.3.0
Client API version: 1.15
Go version (client): go1.3.3
Git commit (client): c78088f
OS/Arch (client): darwin/amd64
2014/11/03 13:21:38 Error response from daemon: client and server don't have same version (client : 1.15, server: 1.14)
```

Or

```bash
$ docker build -t my_containers .
2014/11/03 13:13:06 Error: client and server don't have same version (client : 1.15, server: 1.14)
```

The solution to this error is to update the Boot2docker VM image using the
provided CLI.

```bash
$ boot2docker stop # stop boot2docker running instances
$ boot2docker download # download and install the new VM image
$ boot2docker start # start the updated VM
```

Hope this helps!
