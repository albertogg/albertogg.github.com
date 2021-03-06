---
date: 2014-11-30T00:00:00Z
title: Rack basics
slug: /rack-basics/
description: |-
  A little summary of Ruby Rack Web server, installation, responses, redirects,
  Rack::Response, Rack::Request, ERB views, rackup and more.
categories:
  - Development
tags:
  - Ruby
  - Rack
  - ERB
  - DSL
  - Puma
---

If you like programming in Ruby it's plausible that you've used or heard about
Rack... After all Sinatra, Grape and Rails use Rack as a common interface.

## What's Rack and how does it work

According to [Wikipedia][wiki]:

> Rack provides a minimal, modular and adaptable interface for developing Web
> applications in Ruby. By wrapping HTTP requests and responses in the simplest
> way possible, it unifies and distills the API for Web servers, Web frameworks,
> and software in between (the so-called middleware) into a single method call.

> A Rack application is a Ruby object (not a class) that responds to call. It
> takes exactly one argument, the environment and returns an Array of exactly
> three values: The status, the headers, and the body.

Now that we got what it is and how it works (kind of), let's jump into the
installation and some basic stuff.

## Installation

Installation it's pretty normal:

    $ gem install rack

With bundler

    # Gemfile
    gem 'rack', '~> 1.5'

## Hello World Application

There are two ways we can build a response for a request and return a "Hello
World!".

We can use the "normal" way, that involves adding the response body inside the
array:

    # app.rb
    require 'rack'

    app = Proc.new do |env|
      ['200', {'Content-Type' => 'text/html'}, ["Hello World!]]
    end

    Rack::Handler::WEBrick.run app

Or to use `Rack::Response`, a convenient interface to create a Rack response.
You can read more about it [here][rack-response].

    # app.rb
    require 'rack'

    app = Proc.new do |env|
      res = Rack::Response.new
      res.write("Hello World!")
      res.finish
    end

    Rack::Handler::WEBrick.run app

To run any of these applications, type:

    $ ruby app.rb

And test the response:

    $ curl -X GET localhost:8080
    Hello World!

## Redirect

In the same way that we did the "Hello World!" response we can set the
appropriate HTTP status code and header to redirect any response to a new page.

    require 'rack'

    app = Proc.new do |env|
      ['302', { 'Content-Type' => 'text/html', 'Location' => "/redirected" }, ["302 you've redirected"]]
    end

    Rack::Handler::WEBrick.run app

Likewise we can use the `Rack::Response` interface.

    require 'rack'

    app = Proc.new do |env|
      res = Rack::Response.new
      res.redirect("/redirected")
      res.write("302 you've redirected")
      res.finish
    end

    Rack::Handler::WEBrick.run app

Run the application in the same way as before using `ruby app.rb`

    $ curl -i -X GET localhost:8080
    HTTP/1.1 302 Found
    Location: http://localhost:8080/redirected
    Content-Length: 21
    Server: WEBrick/1.3.1 (Ruby/2.1.2/2014-05-08)
    Date: Mon, 24 Nov 2014 03:28:35 GMT
    Connection: Keep-Alive

    302 you've redirected

One thing to keep in mind is that there is no other route/endpoint, therefore
we'll have a redirect loop.

## ERB views

Views are a really important part of the Web and adding ERB template views to a
Rack application is pretty easy. We can use plain HTML views in the same way we
will with ERB, but using a template system allow us to manipulate/show data in
the views.

Following the Rails convention we can create a view with `.html.erb` file
extension in the root of our application directory and create a simple method
that we'll call from inside the application Proc. Let's take a look:

    def erb(template)
      path = File.expand_path("#{template}")
      ERB.new(File.read(path)).result(binding)
    end

This method will accept a template name, expand its path, parse that file and
then return the resulting value as a plain HTML file.

Let's try this all together:

Create an `index.html.erb` file in the root of the project

    <h1>Hello World <%= @var %>!</h1>

Now add the `erb` method to the current `app.rb`

    require 'rack'
    require 'erb'

    def erb(template)
      path = File.expand_path("#{template}")
      ERB.new(File.read(path)).result(binding)
    end

    app = Proc.new do |env|
      @var = "Alberto"
      ['200', {'Content-Type' => 'text/html'}, [erb("index.html.erb")]]
    end

    Rack::Handler::WEBrick.run app

Run the `app.rb` and you'll see:

    $ curl -X GET localhost:8080
    <h1>Hello World Alberto!</h1>

Now let's do a simple *Hello Name* by catching the path URL, use it as a
"parameter" and print its value inside the template.

Using the same `index.html.erb` as before we are going to read the request path
with some `Rack::Request` help and append the name of that path in the template
as it was the name of the person. You can read more about Rack::Request
[here][rack-request].

    require 'rack'
    require 'erb'

    def erb(template)
      path = File.expand_path("#{template}")
      ERB.new(File.read(path)).result(binding)
    end

    app = Proc.new do |env|
      req = Rack::Request.new(env)
      @var = req.path.tr("/", "") # removing the route slash
      ['200', {'Content-Type' => 'text/html'}, [erb("index.html.erb")]]
    end

    Rack::Handler::WEBrick.run app

Run the `app.rb`:

    $ curl -X GET localhost:8080/Alberto
    <h1>Hello World Alberto!</h1>

    $ curl -X GET localhost:8080/John
    <h1>Hello World John!</h1>

## Rackup the application

According to Rack's GitHub [README file][rack] Rackup is:

> rackup is a useful tool for running Rack applications, which uses the
> Rack::Builder DSL to configure middleware and build up applications easily.

> rackup automatically figures out the environment it is run in, and runs your
> application as FastCGI, CGI, or standalone with Mongrel or WEBrick—all from
> the same configuration.

To rackup the application we need need to create a file with `.ru` file
extension, then drop our simple application inside it and use the `rackup`
command line tool to start it.

Let's start creating a `config.ru` file, adding the application contents,
removing the `Rack::Handler` and change the `do end` syntax to curly braces.

    require 'rack'
    require 'erb'

    def erb(template)
      path = File.expand_path("#{template}")
      ERB.new(File.read(path)).result(binding)
    end

    run Proc.new { |env|
      req = Rack::Request.new(env)
      @var = req.path.tr("/", "") # removing the route slash
      ['200', {'Content-Type' => 'text/html'}, [erb("index.html.erb")]]
    }

Start the application using the rackup command:

    $ rackup

The application should run and behave exactly the same as it did before.

There are many options to `rackup` command that you can check with the `-h`
option. e.g we can change the port where our application listens and the server
to [puma][puma] by doing:

    $ rackup -s puma -p 4000
    Puma 2.9.1 starting...
    * Min threads: 0, max threads: 16
    * Environment: development
    * Listening on tcp://0.0.0.0:4000

I hope this very basic post on Rack helps... Thanks for reading!

[wiki]: http://en.wikipedia.org/wiki/Rack_%28web_server_interface%29
[rack]: https://github.com/rack/rack#rackup
[rack-response]: http://www.rubydoc.info/github/rack/rack/Rack/Response
[rack-request]: http://www.rubydoc.info/github/rack/rack/Rack/Request
[puma]: http://puma.io/
