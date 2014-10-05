---
layout: post
title: Deploying Jekyll with mina and rbenv
description: Deploying a Jekyll with mina and rbenv
category: blog
tag: blog
---

The purpose of this post is to show you how to deploy your jekyll blog using
mina. I'm not going to show how to serve the blog with nginx or apache or
install any dependencies in the server.

We'll need to have a running machine with the following things installed:

- Ruby installed through rbenv
- Nginx or Apache
- If deploying from a private repo a new ssh keypair

## Installing mina

As mina is just a gem we will use [rubygems.org][rubygems] to install it or just add it to
your gem file.

```bash
$ gem install mina
```

After mina is installed we need to run the `init` command, this will create a
`config/deploy.rb` with some default instructions, is very complete and a very
good base to work with.

```bash
$ mina init
```

## Getting everything ready

The first thing after installing mina will be to exclude _vendor_ folder from
our Jekyll project build.

```ruby
# _config.yml
exclude: ['vendor']
```

After you've done that let's move onto the `config/deploy.rb` file and modify
a couple of things.

As we'll be using rbenv to do our deployment the first thing we need to `require 'mina/rbenv'` module, then `invoke :'rbenv:load'`
in the `:environment` task.

> for some weird reason `invoke :'rbenv:load'` was not working correctly for me
> and the `RBENV_ROOT` variable was not getting exported. My solution was to
> explicitly `set :rbenv_path, "/usr/local/rbenv"` variable and add `queue
> %{export RBENV_ROOT=#{rbenv_path}}` to the `:environment` task to fix this.

We use the `:environment` task to do this because this task will be invoked
before our `:deploy` task helping us to get everything loaded prior needing
it.

Our `:environment` task will look like this:

```ruby
set :rbenv_path, "/usr/local/rbenv"

task :environment do
  queue %{export RBENV_ROOT=#{rbenv_path}}
  invoke :'rbenv:load'
end
```

Now let's add the domain, deploy directory, repo, branch and deploy user. One
important thing here is that we are deploy from a git repo so we need to
`require 'mina/git'` to have this feature.

```ruby
set :term_mode, nil
set :domain, example.com # can be an IP address
set :deploy_to, '/var/www/bleh'
set :repository, 'git@github.com:albertogg/bleh.git'
set :branch, 'master'
set :user, 'deployer'   # Username in the server to SSH to.
```

Our final and most important thing will be the `:deploy` task, this task will
do everything for us, clone our repo in our desired directory, bundle our
project gems, and build our blog. As we are using bundler we need to
`require 'mina/bunlder'` module also.

As there is no much to explain let's see the whole `deploy.rb` file:

```ruby
require 'mina/git'
require 'mina/bundler'
require 'mina/rbenv'

# give me normal output
set :term_mode, nil

# server ip or domain
set :domain, example.com

# deploy directory
set :deploy_to, '/var/www/bleh'

# repo and branch
set :repository, 'git@github.com:albertogg/bleh.git'
set :branch, 'master'

# Optional settings:
set :user, 'deployer'   # Username in the server to SSH to.

# Set rbenv path.
set :rbenv_path, "/usr/local/rbenv"

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
task :environment do
  queue %{export RBENV_ROOT=#{rbenv_path}}
  invoke :'rbenv:load'
end

# Put any custom mkdir's in here for when `mina setup` is ran.
# For Rails apps, we'll make some of the shared paths that are shared between
# all releases.
desc "Deploys the current version to the server."
task :deploy => :environment do
  deploy do
    # clone the repo
    invoke :'git:clone'
    # install project dependencies
    invoke :'bundle:install'
    # build the jekyll site
    queue "bundle exec rake build"
  end
end
```

It's pretty easy I think. We just need to do two more things and we are done.
Let's setup mina on the server by running:

```bash
$ mina setup
```

After this if everything worked we are just left to deploy:

```bash
$ mina deploy
```

[rubygems]: http://rubygems.org/
