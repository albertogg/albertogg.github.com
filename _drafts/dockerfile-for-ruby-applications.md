---
layout: post
title: Dockerfile for Ruby applications
description: >
  Create a Dockerfile for Ruby applications or use this one like a base for your
  applications. It's based on Ubuntu 14.04.
category: blog
tag: blog
---

There are different ways you can deploy your Ruby applications in a Docker
container. You can either choose one of the many existing Ruby images on the
[public docker registry][docker-registry-ruby] and use it as your base and adapt
it to your needs or... build your own base Ruby image from scratch based on your
favorite OS and then build your application image on top of it.

In this post we are going to do the whole process of building the Docker Ruby
image from scratch based on the official Ubuntu 14.04 container creating a
normal image and a `on-build` tagged image.

One thing to keep in mind is that the image we'll build is only for Ruby and
will not contain any database related packages on the base image. If there's a
need to install a gem with native extensions requiring "extra" packages those
should go into that specific image unless all of your apps require it.

[docker-registry-ruby]: https://registry.hub.docker.com/search?q=ruby&searchfield=
