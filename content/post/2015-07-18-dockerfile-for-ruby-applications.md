---
categories:
- blog
date: 2015-07-18T00:00:00Z
description: |
  Create a Dockerfile for Ruby applications or use this one like a base for your applications. It's based on Ubuntu 14.04.
tag: blog
title: Dockerfile for Ruby applications
url: /2015/07/18/dockerfile-for-ruby-applications/
---

There are different ways you can deploy your Ruby applications in a Docker
container. You can either choose one of the many existing Ruby images on the
[public docker registry][docker-registry-ruby], use it as your base and adapt it
to your needs or... build your own Ruby base image from scratch based on your
favorite OS and then build your application image on top of it.

In this post we are going through the whole process of building the Ruby image
from scratch based on the official Ubuntu 14.04 container. We will also create
an onbuild image.

## Building the base image

This image will set base for the rest of the post as we will use the resulting
image to create our set of Ruby images.

The image will contain all the things Ruby expects to compile and run properly
on a Debian based OS. I'm not going to talk about the required packages, instead
I'm going to focus on the separation of concerns and configuration of the set of
images.

One thing to keep in mind is that the image we'll build is only for Ruby and
will not contain any database related packages. If there's a need to install a
gem with native extensions requiring "extra" packages those should go into that
specific image unless all of your apps require it.

**What should you expect from this image?**

This image will not complain about any TTY warnings during installation because
of the `noninteractive` flag we are using, all your applications will use
`en_US.UTF-8` as the default encoding and most of the installation process will
be silent do to the `-qq` flag.

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

It's a pretty straightforward image nothing rare so far. You can also use
`--no-install-recommends` to avoid installing extra packages and save some
space.

For building this image run the following command:

```bash
docker build -t dependency-image:14.04.2 .
```

> **note:** If you need any database gem you can add any of the following
> packages and installing the database itself if required:
>
> - `libpq-dev` for PostgreSQL
> - `libmysqlclient-dev` for MySQL
> - `libsqlite3-dev` for SQLite3

## Building the Ruby image

The Ruby image will use our base dependency image (the one we just build) and
we'll install Ruby version 2.2.2 through [ruby-build][ruby-build] and we'll also
install [bundler][bundler] by default.

If you need another Ruby version just change it in the `RUBY_VERSION`
environment variable.

```bash
FROM dependency-image:14.04.2
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

This image still straightforward. We avoid gems installing documentation by
setting the `--no-document`. You could also install any other "default" gems
here.

For building this image run the following command:

```bash
docker build -t ruby:2.2.2 .
```

## Building the onbuild image

The **onbuild** image is very practical if you are repeating over an over again
the same steps in each application Dockerfile.

What this image does is execute all commands that exist in this image prior any
commands on your application Dockerfile. For most ruby applications these
commands shown here are almost always the same.

Commands will do:

  - Set the app directory
  - Copy the `Gemfile` and the `Gemfile.lock` to _cache_ them out
  - Running `bundle install`
  - Copy the rest of the app files and remove the `.env` file if available.

```bash
FROM ruby:2.2.2
MAINTAINER Alberto Grespan <https://twitter.com/albertogg>

WORKDIR /usr/src/app

ONBUILD COPY Gemfile      /usr/src/app/
ONBUILD COPY Gemfile.lock /usr/src/app/
ONBUILD RUN bundle install --without test development

ONBUILD COPY . /usr/src/app
ONBUILD RUN rm -f .env
```

One thing to know about **onbuild** images is that they _always_ have a custom
docker tag with `-onbuild` in it. For example if our Ruby 2.2.2 image is named
`ruby` with a tag `2.2.2` the onbuild image should be tagged `2.2.2-onbuild`.

For building this image run the following command:

```bash
docker build -t ruby:2.2.2-onbuild .
```

**How would an application Dockerfile look like while using onbuild image?**

It would look something like this:

```bash
FROM ruby:2.2.2-onbuild

EXPOSE 3000

CMD ["foreman", "start"]
```

> **note:** The CMD can also be added to **onbuild** Dockerfile if it's always
> the same.

Thanks for reading!

[docker-registry-ruby]: https://registry.hub.docker.com/search?q=ruby&searchfield=
[ruby-build]: https://github.com/sstephenson/ruby-build
[bundler]: http://bundler.io/
