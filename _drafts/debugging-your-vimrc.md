---
layout: post
title: Debugging your vimrc
description: Short guide on how to debug your vimrc with Bisectly and finish.
category: blog
tag: blog
---

tl;dr this is a short guide on how to debug your `.vimrc` and hopefully it will
help you find what's making Vim slower or inconsistent.

A few days ago I added a bunch of new settings to my `.vimrc` that made my
motion sluggish. This was happening in MacVim and in Vim and it was making me
mad because apart from being slow, Vim was using a lot of CPU and with large
files it was unbearable. After being fed up with this I hopped on IRC and joined
the **#vim** channel to ask knowledgeable people how can I debug my Vim
configuration. A kind user named **watabou** (I believe) first pointed me to
[Bisectly][bisectly].

> Bisectly is a plugin-manager-agnostic fault-localisation tool for finding
> which Vim plugin is causing you nose-bleeds.

I followed the documentation on the `README.md` file and did multiple runs of
Bisectly but found no apparent problems with the plugins I had installed... I
asked again in the IRC channel and the same user (watabou) told me to put
`:finish` in the middle of the configuration and explain a bit what to do.

Let me explain it briefly:

`:finish` works just like a `git bisect` but in a manual way. e.g. It
deactivates the latter half or part of the `.vimrc` file to detect if the
problem is in the first half or the second half of that file. After `:finish` is
added to the middle or any part of the `.vimrc` file open Vim and test if the
problem has vanished, if it doesn't we need to put the `:finish` instruction on
the first or second half of the half (the first 25% or the last 25% of it)
depending on where the problem was initially located and keep doing this until
the error "vanishes" by deactivation. With that hint the bug should be between
the last two sections bisected. Repeat this procedure between that section until
the "bug" is completely localized, remove that setting or do whatever you want
and that's it...

In my case this sluggishness was caused by two options options, `relativenumber`
and `cursorline`. This is probably because using super fast keyboard repeat and
repaint doesn't get along well. After removing those options Vim was super fast
again.

Hope this super short post helps you figure out how to debug your `.vimrc`.

Thanks for reading!

[bisectly]: https://github.com/dahu/bisectly
