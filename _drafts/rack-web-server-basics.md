---
layout: post
title: Rack Web server basics
description: "A little summary of Ruby Rack Web server."
category: blog
tag: blog
---

If you like programming in Ruby it's plausible that you've used or heard about
the Rack Web server... After all Sinatra, Grape and Rails sit on top of Rack and
by that, I mean that Rack receives the requests and passes them to those
frameworks.

## What's Rack and how does it work

> Rack provides a minimal, modular and adaptable interface for developing web
> applications in Ruby. By wrapping HTTP requests and responses in the simplest
> way possible, it unifies and distills the API for web servers, web frameworks,
> and software in between (the so-called middleware) into a single method call.

> A Rack application is a Ruby object (not a class) that responds to call. It
> takes exactly one argument, the environment and returns an Array of exactly
> three values: The status, the headers, and the body.

Now that we got what it is and how it works a bit clearer let's jump into the
installation and some basic stuff.

## Installation

The installation it's pretty normal as any other gem:

```bash
$ gem install rack
```

With bundler

```bash
# Gemfile
gem 'rack', '~> 1.5'
```

## Hello World Application

There are two ways we can build a response for a request and return a "Hello
World!".

We can use the "normal" way adding the response body inside the array:

```ruby
# app.rb
require 'rack'

app = Proc.new do |env|
  ['200', {'Content-Type' => 'text/html'}, ["Hello World!]]
end

Rack::Handler::WEBrick.run app
```

Or we can use `Rack::Response`, a convenient interface to create a Rack
response.

```ruby
# app.rb
require 'rack'

app = Proc.new do |env|
  res = Rack::Response.new
  res.write("Hello World!")
  res.finish
end

Rack::Handler::WEBrick.run app
```

To run any of the applications type:

```bash
$ ruby app.rb
```

And test the response:

```bash
$ curl -X GET localhost:8080
Hello World!
```

## Redirect

In the same way that we did the "Hello World!" response we can set the
appropriate HTTP status code and header to redirect any response to a new page.

```ruby
require 'rack'

app = Proc.new do |env|
  ['302', { 'Content-Type' => 'text/html', 'Location' => "/redirected" }, ["302 you've redirected"]]
end

Rack::Handler::WEBrick.run app
```

Likewise we can use the `Rack::Response` interface.

```ruby
require 'rack'

app = Proc.new do |env|
  res = Rack::Response.new
  res.redirect("/redirected")
  res.write("302 you've redirected")
  res.finish
end

Rack::Handler::WEBrick.run app
```

Run the application in the same way as before `ruby app.rb`

```bash
$ curl -i -X GET localhost:8080
HTTP/1.1 302 Found
Location: http://localhost:8080/redirected
Content-Length: 21
Server: WEBrick/1.3.1 (Ruby/2.1.2/2014-05-08)
Date: Mon, 24 Nov 2014 03:28:35 GMT
Connection: Keep-Alive

302 you've redirected
```

**note:** one thing to keep in mind is that there is no other route/endpoint,
therefore we'll have a redirect loop.

Anyways, it's really straight forward. Let's go with some views.

## ERB views

Views are a really important part of the Web and adding ERB template views to a
Rack application is pretty easy. We can use plain HTML views in the same way we
will with ERB, but using a template system allow us to manipulate/show data in
the views.

Following the Rails convention we can create a view with `.html.erb` file
extension in the root of our application directory and create a simple function
that we'll call from inside the application Proc. Let's take a look:

```ruby
def erb(template)
  path = File.expand_path("#{template}")
  ERB.new(File.read(path)).result(binding)
end
```

This function will accept a template name, parse and return the resulting value
of an HTML template.

Let's try this all together:

Create an `index.html.erb` file in the root of the project

```html
<h1>Hello World <%= @var %>!</h1>
```

Now add the `erb` method to the current `app.rb`

```ruby
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
```

Run the `app.rb` and you'll see:

```bash
$ curl -X GET localhost:8080
<h1>Hello World Alberto!</h1>
```

Now let's do a simple *Hello Name* by catching the URL path, use it as a
"parameter" and print its value in the template.

Using the same `index.html.erb` as before we are going to read the request path
using `Rack::Request` and append the name of that path in the template as it was
the name of the person.

```ruby
require 'rack'
require 'erb'

def erb(template)
  path = File.expand_path("#{template}")
  ERB.new(File.read(path)).result(binding)
end

app = Proc.new do |env|
  req = Rack::Request.new(env)
  @var = req.path.tr("/", "")
  ['200', {'Content-Type' => 'text/html'}, [erb("index.html.erb")]]
end

Rack::Handler::WEBrick.run app
```

Run the `app.rb`:

```bash
$ curl -X GET localhost:8080/Alberto
<h1>Hello World Alberto!</h1>

$ curl -X GET localhost:8080/John
<h1>Hello World John!</h1>
```

The result is the expected.
