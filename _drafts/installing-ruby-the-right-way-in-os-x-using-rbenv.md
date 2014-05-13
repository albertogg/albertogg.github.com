---
layout: post
title: Installing Ruby the right way in OS X using rbenv
description: Installing Ruby the right way in OS X using rbenv and its dependencies. We will also use hombrew to make this task even easier.
category: blog
tag: blog
---

> tl;dr there are millions of posts about installing Ruby in OS X for your development machine, and most of them miss the point about installing yaml, readline on your system and also some of the best rbenv ecosystem plugins that will help your workflow. This post is here to handle this.

Yes, I know that Ruby is not the easiest language to install, there are many many details and decisions to handle before installing it. I believe everyone asks the same questions. There is RVM better than rbenv, or chruby? Do I install Ruby directly without a version manager? I do believe the answers to these quiestions are a personal decision, do your research. For me there is no "perfect" tool, so, if you are using RVM or chruby and you like them and working well for you just use them until you find something wrong.

In this post I will show you different ways to install Ruby using rbenv on a Mac for development and also I'll include some really great plugins that made my life better while using this fantastic tool.

## Installing rbenv

On a Mac as on a Linux machine you can install rbenv using git. To install it for a user just `$ git clone https://github.com/sstephenson/rbenv.git ~/.rbenv` and afterwards [export the bin and enable shims and autocompletion](git clone https://github.com/sstephenson/rbenv.git ~/.rbenv). I'll personally use [Homebrew](http://brew.sh/) to do my installation.

```bash
$ brew install rbenv ruby-build rbenv-default-gems rbenv-readline rbenv-gem-rehash rbenv-vars
```

This are the rbenv plugins I normally use.

- `ruby-build`:
- `rbenv-default-gems`:
- `rbenv-readline`:
- `rbenv-gem-rehash`:
- `rbenv-vars`:

Before installing any Rubies you need to ask you if you want support for LibYAML and OpenSSL outside of rbenv. Rbenv is a mature version manager and it solves some common caveats by installing and compiling your rubies with the latest OpenSSL and LibYAML available if they are not available in your system. With that said I really like installing LibYAML and Readline with homebrew and make my rubies use those.

I like installing LibYAML apart from rbenv because if there's an update I can install it without having to recompile my Rubies and I like to use Readline instead of editline to keep a development and production Rubies the same.

```bash
$ brew install libyaml readline
```

Now we are ready to install our first Ruby!

```bash
$ rbenv install 2.1.2
```

But what if you want to use your system OpenSSL and Readline without the `rbenv-readline` plugin? Yes, you can:

```bash
$ RUBY_CONFIGURE_OPTS="--with-openssl-dir=`brew --prefix openssl` --with-readline-dir=`brew --prefix readline`" rbenv install 2.1.2
```
