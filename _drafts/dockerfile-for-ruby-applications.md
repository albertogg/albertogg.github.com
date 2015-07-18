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

## Building the base image

This image will set base for the rest of the post as we will use the result of
the image to create our set of Ruby images.

This image contains all the things ruby expects to compile and run properly on a
Debian based OS. I'm not going to talk about each package that will be
installed, I'm just going to talk about configuration.

**What should you expect from this image?**

This image will not complain about any TTY warnings during installation because
of the `noninteractive` flag we are using, all your applications will use
`en_US.UTF-8` as the default encoding and the most of the installation process
will be silent do to the `-qq` flag.

```bash
FROM ubuntu:14.04.2
MAINTAINER Alberto Grespan <https://twitter.com/albertogg>

# Ignore TTY warnings on install
ENV DEBIAN_FRONTEND noninteractive

# configure Locale to en_US.UTF-8
RUN locale-gen en_US.UTF-8 &&\
    dpkg-reconfigure locales

# export LANG with en_US.UTF-8
ENV LANG en_US.UTF-8

# Quiet the update and install output
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

RUN rm -rf /var/lib/apt/lists/* &&\
    truncate -s 0 /var/log/*log
```

If you need any database gem you can add any of the following packages and
installing the database itself if required:

- `libpq-dev` for PostgreSQL
- `libmysqlclient-dev` for MySQL
- `libsqlite3-dev` for SQLite3

You can also use `--no-install-recommends` to avoid installing extra packages
and save some space.

## Building the Ruby image

The Ruby image will use our base dependency image container. We will install
Ruby version 2.2.2 using [ruby-build][ruby-build] and installing
[bundler][bundler] by default.

If you want to change the Ruby version just change it in the environment
variable and that's all.

```bash
FROM albertogg/ruby-base:14.04.2
MAINTAINER Alberto Grespan <https://twitter.com/albertogg>

# Set the Ruby version of your preference
ENV RUBY_VERSION 2.2.2

RUN echo 'gem: --no-document' >> /usr/local/etc/gemrc &&\
    mkdir /src && cd /src && git clone https://github.com/sstephenson/ruby-build.git &&\
    cd /src/ruby-build && ./install.sh &&\
    cd / && rm -rf /src/ruby-build && ruby-build $RUBY_VERSION /usr/local

RUN gem update --system &&\
    gem install bundler
```

You could also install here any other gems if you'd like.

## Building the onbuild image

The **onbuild** image is a very practical image to have if you are repeating
over an over again the same steps for each application Dockerfile.

What this image does is execute all commands that exist in this image prior any
commands on your application Dockerfile. For most ruby applications these
commands shown here are almost always the same. We will set an application dir,
copy the Gemfile and the Gemfile.lock to "cache" them out and running bundle
install, then copy the rest of the application files and remove the `.env` file
if available.

```bash
FROM albertogg/ruby:2.2.2
MAINTAINER Alberto Grespan <https://twitter.com/albertogg>

WORKDIR /usr/src/app

ONBUILD COPY Gemfile      /usr/src/app/
ONBUILD COPY Gemfile.lock /usr/src/app/
ONBUILD RUN bundle install --without test development

ONBUILD COPY . /usr/src/app
ONBUILD RUN rm -f .env
```

One thing to know is that onbuild images have a custom docker tag. For example
if our Ruby 2.2.2 image is named `ruby` with a tag of `2.2.2` the onbuild image
should be tagged `2.2.2-onbuild`.

[docker-registry-ruby]: https://registry.hub.docker.com/search?q=ruby&searchfield=
[ruby-build]: https://github.com/sstephenson/ruby-build
[bundler]: http://bundler.io/
