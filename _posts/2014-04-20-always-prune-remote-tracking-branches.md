---
layout: post
title: Always prune remote-tracking branches
description: Always prune your remote-tracking branches with every fetch or pull with the correct configuration. You just need Git version 1.8.5 or newer.
category: blog
tag: blog
---

> tl;dr after version 1.8.5 of git, you can now configure it to automatically prune remote-tracking branches with every fetch/pull.

Before Git version 1.8.5 if you wanted to prune remote-tracking branches you where forced to use/remember the `git fetch --prune` command, even if your workflow didn't involve fetching directly with the `fetch` command. For that reason if you find yourself pulling and then using an alias or just typing `git fetch --prune` every once in a while, this new Git configuration is perfect for you.

There are two new configuration commands that will help you achieve this behavior (pruning) in different ways. The first command is:

```bash
$ git config fetch.prune true
```

This command will set in your configuration file the prune flag true, so it will prune automatically with every fetch. The default git behavior of this flag is false. Yes, if you're wondering `git pull` will implicitly use this flag.

For the last couple of weeks I've been giving this a try and it has been a dream come true, it's a perfect addition to my workflow (I'm also using the `rebase` flag with every pull).

Check out this output:

```bash
$ git pull
From github.com:albertogg/test-something
 x [deleted]         (none)     -> origin/fix-bleh
 x [deleted]         (none)     -> origin/fix-something
 x [deleted]         (none)     -> origin/add-gravatar
remote: Counting objects: 5, done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 5 (delta 1), reused 0 (delta 0)
Unpacking objects: 100% (5/5), done.
   def27ef..5596684  master     -> origin/master
First, rewinding head to replay your work on top of it...
Fast-forwarded master to 5596684fbd39d037e1a60a8b75f250d059c3e904.
```

The second command is somewhat similar to the first one, but it will only apply to the remote repo you want *e.g. origin*.

```bash
$ git config remote.origin.prune true
```

The results in both cases will be the same; you have to decide which one suites you better, although if you add both configurations to your repo or system wide the second one will overwrite the behavior of the first one, so be careful with that.

Remember, that you can make this configurations work system wide by just adding the `--global` flag when executing the command e.g. `git config --global fetch.prune true`.
