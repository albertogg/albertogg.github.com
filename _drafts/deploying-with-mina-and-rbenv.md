---
layout: post
title: Deploying with mina and rbenv
description: 155 char description
category: blog
tag: blog
---

exclude: ['vendor', 'README.md', 'Gemfile', 'Gemfile.lock']

require 'mina/git'
require 'mina/bundler'
require 'mina/rbenv'

set :term_mode, nil
set :domain, ENV['domain']
set :deploy_to, '/var/www/bleh'
set :repository, 'git@github.com:albertogg/bleh.git'
set :branch, ENV['branch']

# Optional settings:
set :user, ENV['user']    # Username in the server to SSH to.
set :port, ENV['port']    # SSH port number.

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
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :'git:clone'
    invoke :'bundle:install'
    # if there is a dotenv file
    queue "mv .env-sample .env"
    queue "bundle exec rake server"
  end
end
