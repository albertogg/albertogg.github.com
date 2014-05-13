---
layout: post
title: Installing Ruby the right way in OS X using rbenv
description: Installing Ruby the right way in OS X using rbenv and its dependencies. We will also use hombrew to make this task even easier.
category: blog
tag: blog
---

> tl;dr there are millions of posts about installing Ruby in OS X for your development machine, and most of them miss the point about installing yaml, readline on your system and also some of the best rbenv ecosystem plugins that will help your workflow. This post is here to handle this.

Yes, I know that Ruby is not the easiest language to install, there are many many details and decisions to handle before installing it. I believe everyone asks the same questions. Is RVM better than rbenv, or chruby? Do I install Ruby directly without a version manager? I do believe the answers to these questions are a personal decision, a bit of research is implied. For me there is no "perfect" tool, so, if you are using RVM or chruby, you like them and they work well for you, just use them until you find something you dislike.

In this post I will show you why I'm using rbenv to handle my Rubies and also I'll include some really great plugins that had made my life better.

## Installing rbenv

On a Mac as on a Linux machine you can install rbenv using git. To install it for a user just `$ git clone https://github.com/sstephenson/rbenv.git ~/.rbenv` and afterwards [export the bin and enable shims and autocompletion](git clone https://github.com/sstephenson/rbenv.git ~/.rbenv). I'll personally use [Homebrew](http://brew.sh/) to do my installation.

```bash
$ brew install rbenv ruby-build rbenv-default-gems rbenv-gem-rehash rbenv-vars
```

These are the rbenv plugins I normally use.

- `ruby-build`: "Is an rbenv plugin that provides an `rbenv install` command to compile and install different versions of Ruby on UNIX-like systems."
- `rbenv-default-gems`: "Is an rbenv plugin hooks into the `rbenv install` command to automatically install gems every time you install a new version of Ruby." That said, Imagine installing Bundler and Pry automagically every time a new Ruby is installed, awesome isn't it?
- `rbenv-gem-rehash`: "Never run `rbenv rehash` again. This rbenv plugin automatically runs rbenv rehash every time you install or uninstall a gem."
- `rbenv-vars`: "This is a plugin for rbenv that lets you set global and project-specific environment variables before spawning Ruby processes."

Before installing any Rubies ask yourself if you want support for LibYAML Readline and OpenSSL outside of rbenv. Rbenv and its plugins are a mature ecosystem that solves common caveats in the Ruby installation by downloading, installing and compiling your rubies with the latest OpenSSL, LibYAML and if available on your system Readline. With that said I really like installing LibYAML and Readline with homebrew and make my rubies use those.

I like installing LibYAML apart from rbenv because if there's an update I can install it without having to recompile my Rubies and I like to use Readline instead of editline to keep development and production Rubies the same and don't break things.

```bash
$ brew install libyaml readline openssl
```

Add this line to your `.bashrc` or `.zshrc`:

```bash
if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi
```

Now we are ready to install our first Ruby!

```bash
$ rbenv install 2.1.2
```

But what if you want to link OpenSSL and Readline manually? You can by doing this:

```bash
$ RUBY_CONFIGURE_OPTS="--with-openssl-dir=`brew --prefix openssl` --with-readline-dir=`brew --prefix readline`" rbenv install 2.1.2
```
