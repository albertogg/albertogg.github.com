---
layout: post
title: Deploying Jekyll with Mina and rbenv
description: Deploying a Jekyll site with Mina and rbenv
category: blog
tag: blog
---

The purpose of this post is to show how to deploy a [Jekyll][jekyll] site using
[Mina][mina] and it will not show how to serve the site with Nginx or Apache or
install any dependencies like Ruby or rbenv on the server.

We'll need to have a running machine with the following things installed:

- Ruby installed and managed from rbenv
- Nginx or Apache
- If deploying from a private repo a new ssh keypair

## Installing Mina

As Mina is just a gem we will use the `gem` command to install it or just add
it to your Gemfile.

```bash
$ gem install mina
```

After Mina is installed we need to run the `init` command, this will create a
`config/deploy.rb` with the default instructions which are very complete and a
good base to work with.

```bash
$ mina init
```

## Getting everything ready

The first thing after installing Mina will be to exclude _vendor_ folder from
our Jekyll project build.

```ruby
# _config.yml
exclude: ['vendor']
```

After you've done that let's move onto the `config/deploy.rb` file and modify
a couple of things.

As we'll be using rbenv to do our deployment the first thing we need to
`require 'mina/rbenv'` module, then load rbenv in the `:environment` task.

> for some weird reason rbenv was not getting loaded in the terminal session
> because the `RBENV_ROOT` variable was not getting exported and the rbenv
> command was giving me errors. My solution was to explicitly export that
> variable in the `:environment` task.

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

Now let's add the domain, deploy directory, repo, branch and deploy user
variables. One important thing here is that we are deploy from a git repo so we
need to `require 'mina/git'` to have this feature.

```ruby
set :term_mode, nil
set :domain, example.com # can be an IP address
set :deploy_to, '/home/deployer/jekyll'
set :server_dir, '/var/www/site'
set :repository, 'git@github.com:albertogg/bleh.git'
set :branch, 'master'
set :user, 'deployer'   # Username in the server.
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
set :deploy_to, '/home/deployer/jekyll'
# apache or nginx serve directory
set :server_dir, '/var/www/site'

# repo and branch
set :repository, 'git@github.com:albertogg/jekyll-site.git'
set :branch, 'master'

# Optional settings:
set :user, 'deployer'   # Username in the server.

# Set rbenv path.
set :rbenv_path, "/usr/local/rbenv"

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
task :environment do
  queue %{export RBENV_ROOT=#{rbenv_path}}
  invoke :'rbenv:load'
end

# Put any custom mkdir's in here for when `mina setup` is ran.
desc "Deploys the current version to the server."
task :deploy => :environment do
  deploy do
    # clone the repo
    invoke :'git:clone'
    # install project dependencies
    invoke :'bundle:install'
    # build the jekyll site and drop the _site into the server_dir
    queue %{bundle exec jekyll build -s #{deploy_to} -d #{server_dir}}
  end
end
```

## Deploying

It's pretty easy I think. We just need to do two more things and we are done.
Let's setup Mina on the server by running:

```bash
$ mina setup
```

After this if everything worked we are just left with the final task, deploy:

```bash
$ mina deploy
```

It indeed was very nice and easy setup, If there is something wrong or find an
error or typo, write me a comment.

[rubygems]: http://rubygems.org/
[jekyll]: http://jekyllrb.com/
[mina]: http://nadarei.co/mina/
