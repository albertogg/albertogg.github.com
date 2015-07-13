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
normal image and an on-build image.

One thing to keep in mind is that the image we'll build is only for Ruby and
will not contain any database related packages on the base image. If there's a
need to install a gem with native extensions requiring "extra" packages those
should go into that specific image unless all of your apps require it.

## Building the image

```bash
FROM ubuntu:14.04.2
MAINTAINER Alberto Grespan <https://twitter.com/albertogg>

# Ignore TTY warnings
ENV DEBIAN_FRONTEND noninteractive

# Set Locale to en_US.UTF-8
RUN locale-gen en_US.UTF-8 &&\
    dpkg-reconfigure locales

# export LANG
ENV LANG en_US.UTF-8

RUN apt-get update -qq && \
    apt-get install -y -qq \
      git \
      curl \
      wget \
      build-essential \
      ca-certificates \
      libyaml-dev \
      libreadline-dev \
      libcurl4-openssl-dev \
      libffi-dev \
      libgdbm-dev \
      libssl-dev \
      libxml2-dev \
      libxslt1-dev \
      libtool \
      zlib1g-dev \
      netbase

# Set the Ruby version of your preference
ENV RUBY_VERSION 2.2.2

RUN echo 'gem: --no-document' >> /usr/local/etc/gemrc &&\
    mkdir /src && cd /src && git clone https://github.com/sstephenson/ruby-build.git &&\
    cd /src/ruby-build && ./install.sh &&\
    cd / && rm -rf /src/ruby-build && ruby-build $RUBY_VERSION /usr/local

RUN gem update --system &&\
    gem install bundler
```

[docker-registry-ruby]: https://registry.hub.docker.com/search?q=ruby&searchfield=
