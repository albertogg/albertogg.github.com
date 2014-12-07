---
layout: post
title: Installing Ruby the right way on OS X using rbenv
description: Installing Ruby the right way on OS X using rbenv and some interesting plugins. We will also use Homebrew to make this task even easier.
redirect_from:
  - /blog/installing-ruby-the-right-way-in-os-x-using-rbenv/
category: blog
tag: blog
---

> tl;dr there are millions of posts about installing Ruby using rbenv in OS X. Most of them miss the point about installing LibYAML and Readline on your system, but they also miss some of the best rbenv plugins that will help your workflow tremendously. In this post I'll handle it.

I know that Ruby is not the easiest language to install, there are many details and decisions to handle before installing it. I believe everyone has the same questions at some point *e.g.* Is RVM better than rbenv, or chruby? Do I install Ruby directly without a version manager? and so on... I do believe the answers to those questions are a personal decision, a bit of research will be implied, but you will find your answers. For me there is no "perfect" tool, so, if you are currently using RVM or chruby and you like them and they work well for you, just keep using them until you find something you dislike.

In this post I will show you why I'm using rbenv to handle my Rubies and I'll include some really great plugins that had made my life easier.

## Installing rbenv

On a Mac as on a Linux machine you can install rbenv using git. To install it for a user just `$ git clone https://github.com/sstephenson/rbenv.git ~/.rbenv` and afterwards [export the bin and enable shims and autocompletion](https://github.com/sstephenson/rbenv#basic-github-checkout). I use [Homebrew](http://brew.sh/) to handle all my installations and this will not be the exception.

> In order to compile you need to have installed *Xcode Command Line Tools*.

This line will install rbenv and all the plugins I normally use:

```bash
$ brew install rbenv ruby-build rbenv-default-gems rbenv-gem-rehash rbenv-vars
```

After that you will need to add this line to your `.bashrc`, `.zshrc`, profile or whatever:

```bash
if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi
```

### Why Plugins?

Rbenv was invented under the Unix philosophy of doing one thing well. That's why each component is intended to do just one thing... also why we need various plugins to extend functionalities.

#### A bit about the plugins


- [ruby-build](https://github.com/sstephenson/ruby-build): "Is an rbenv plugin that provides an `rbenv install` command to compile and install different versions of Ruby on UNIX-like systems."
- [rbenv-default-gems](https://github.com/sstephenson/rbenv-default-gems): "Is an rbenv plugin hooks into the `rbenv install` command to automatically install gems every time you install a new version of Ruby." That said, Imagine installing Bundler and Pry automatically every time a new Ruby is installed, awesome isn't it?
- [rbenv-gem-rehash](https://github.com/sstephenson/rbenv-gem-rehash): "Never run `rbenv rehash` again. This rbenv plugin automatically runs rbenv rehash every time you install or uninstall a gem."
- [rbenv-vars](https://github.com/sstephenson/rbenv-vars): "This is a plugin for rbenv that lets you set global and project-specific environment variables before spawning Ruby processes."

There are a bunch of plugins you can look up by doing `brew search rbenv`, Googling or using Github search. **Remember that all the plugins where meant to be installed using git**.

## Before the Ruby installation

Before installing any Rubies ask yourself if you want support for LibYAML, Readline and OpenSSL outside of rbenv. Rbenv and its plugins are a mature ecosystem that can solve common caveats in the Ruby installation by downloading, installing and compiling your rubies with the latest OpenSSL, LibYAML and if available on your system, Readline.

I like to install LibYAML apart from rbenv because if there's an update I can just upgrade it without having to recompile my Rubies again. I also like to Install Readline to use it instead of editline just to keep development and production Rubies the same and don't break things. Lets install those libraries with Homebrew and see what happens:

```bash
$ brew install libyaml readline openssl
```

That was fast, now we are ready to install our first Ruby!

```bash
$ rbenv install 2.1.5
```

When it's done, you just have to set this Ruby as the global Ruby for your system (if you want to).

```bash
$ rbenv global 2.1.5
```

Now you are done. I'll recommend refreshing your session by `exec $SHELL -l` or just closing and reopening your terminal. If you try to run `ruby -v` you should see the output of the new installed Ruby!

```bash
$ ruby -v
ruby 2.1.5p273 (2014-11-13 revision 48405) [x86_64-darwin13.0]
```
That was really easy... but what if you want to use a custom version of OpenSSL or LibYAML?

### Install with your own options

If you want to compile Ruby with your preferred versions of OpenSSL, Readline and LibYAML you just need to export or append `RUBY_CONFIGURE_OPTS` to your installation command.

```bash
$ RUBY_CONFIGURE_OPTS="--with-openssl-dir=`brew --prefix openssl` --with-readline-dir=`brew --prefix readline` --with-libyaml-dir=`brew --prefix libyaml`" rbenv install 2.1.5
```

**Remember that our libraries must be installed via homebrew for that command to work**. You can change *e.g.* `brew --prefix libyaml` to `/usr/local/opt/libyaml` to make it work in any environment.

## Conclusion

Enjoy your freshly installed Ruby version manager!
