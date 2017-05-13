---
categories:
- blog
date: 2014-03-07T00:00:00Z
description: Using the heroku scheduler with Rails and Rake to keep our dyno awake;
  this will also work for any custom short periodical task.
tag: blog
title: Heroku scheduler and Rails rake tasks
url: /2014/03/07/heroku-scheduler-and-rails-rake-tasks/
---

> tl;rd we are using the heroku scheduler with Rails and Rake to keep our dyno
> awake; this will also work for any custom short periodical task.

## Heroku scheduler

The Heroku scheduler is a "free" application add-on that helps you run short tasks
every 10, 60 or 3600 minutes. You can use it as much as you want per month, but *AFAIK*
it uses minutes from your dynos. That said, be careful if you are on a tight budget.

For our use case this will work flawlessly given it's not a key aspect of our
application and it's mostly for development use.

### Adding the scheduler

There are 2 ways to apply this add-on to your application; from the [web interface](https://addons.heroku.com/scheduler)
or the CLI.

> To use the CLI you must have the [heroku toolbelt](https://toolbelt.heroku.com/) installed.

```bash
$ heroku addons:add scheduler
```
### ping.rake

It's time to create our rake task in Rails. First step is to create a file within
the `lib/tasks` directory of our Rails application.

```bash
$ touch lib/tasks/ping.rake
```

Then add this code:

```ruby
require 'net/http'

namespace :ping do
  desc "Ping our heroku dyno every 10, 60 or 3600 min"
  task :start do
    puts "Making the attempt to ping the dyno"

    if ENV['URL']
      puts "Sending ping"

      uri = URI(ENV['URL'])
      Net::HTTP.get_response(uri)

      puts "success..."
    end
  end
end
```

### Environment variables

Now you have your rake task ready to use, but... we are using environment variables
in our task and they must be exported to heroku and locally (testing):

```bash
$ heroku config:set URL=http://xxx.herokuapp.com/ #replace xxx with your heroku appmane
```

> to test the task locally you can either use `export URL=http://xxx.herokuapp.com/`
> or the [dotenv gem](https://github.com/bkeepers/dotenv) and run `rake ping:start`.

### Testing the task

To test if task is working as expected within the heroku environment you have to
commit this code and deploy your application; after that you will be able to
use `heroku run` to test the task:

```bash
$ heroku run rake ping:start
```

If the output from the command was successful you just need to add the task to the
scheduler and that's it.

### Adding the task to the scheduler

```bash
$ heroku addons:open scheduler
```

This will open the website in which you will need to add the task to be run
(e.g. `rake ping:start`), dyno size (1x) and frequency (60minutes).

You are all set, if you want to check if it's been run just check the heroku log
in a couple of hours `heroku logs --ps scheduler.1`.
