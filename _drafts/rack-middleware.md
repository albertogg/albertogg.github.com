---
layout: post
title: Rack middleware
description: Introduction on how to build a Rack middleware
category: blog
tag: blog
---

> tl;dr we are creating two Rack middlewares, one that adds a custom header to
> all responses and one that adds a new route with a custom response.

As explained in a previous post about [Rack basics][rack-basics], Rack is found
on the most popular Ruby web frameworks as it's an adaptable interface for
developing web applications. In this post we are going to create two simple
middlewares. The first one will add a custom header to all responses and the
second one, will add a custom route that will respond to `/ping`. To glue all of
this together we are using `Rack::Builder`.

## Things to know about Rack middleware

There are few things that we need to know about Rack middleware in order to
fully understand how it works:

- Each middleware responds to a `call()` method.
- Only receives one argument, the environment (`env`).
- Responds with an array of: Integer as status code, hash of headers and array
  of body strings.
- Each middleware is responsible of calling the next.

Now that we know this let's go and start writing the middleware.

## Adding a custom header

For this first middleware we are going to add a custom header to all responses.
The header will be following: `X-Custom-Header: customheader.v1`, it doesn't
mean anything but we could also use something like `Content-Type:
application/json; charset=utf-8`.

Create a file in a `lib` directory named `custom_header.rb` where the middleware
will live and use the following code.

```ruby
# lib/custom_header.rb
module Rack
  class CustomHeader
    def initialize(app)
      @app = app
    end

    def call(env)
      status, headers, body = @app.call(env)

      headers['X-Custom-Header'] = "customheader.v1"

      [status, headers, body]
    end
  end
end
```

As explained in the section above, we are creating the `call()` method and
passing it the `env` argument. Inside this method we picking up the status,
headers, and body from the `@app.call(env)`. Then append our custom header to
the existing response headers and finally return the array of status code,
headers, and body.

We have our first middleware, let's go to the second one.

## Adding a new route

Inside this middleware we are adding a new route called `/ping`. This route will
respond with a `pong` text to differentiate the application response. How will
this middleware work? It will check the request path is `/ping` it will
respond if doesn't the call will pass to the rest of the stack.

```ruby
module Rack
  class Ping
    def initialize(app)
      @app = app
    end

    def call(env)
      req = Rack::Request.new(env).path
      if req == "/ping"
        [200, {}, ["pong"]]
      else
        @app.call(env)
      end
    end
  end
end
```

In the same way as with the `CustomHeader` middleware there will be a `call()`
method with the `env` argument. Inside this method we'll check with use of
`Rack::Request` the path of the current request and generate the desired
response array with the status code, empty headers and a body of string. Note
that if the route is not `/ping` we simply call `@app.call(env)` letting the
call go through the stack.

We could also read the request path like this: `if env["PATH_INFO"] == "/ping"`
but I like using the `Rack::Request` interface.

Now let's glue the middleware to an application.

## Rack Builder

According to the documentation is:

> Rack::Builder implements a small DSL to iteratively construct Rack
> applications

I can define this as the backbone that holds middlewares and applications
together into a single Rack application. With that said, what we need to
understand when we see `Rack::Builder.new` in an application, is that it's a
block that packs a bunch of middleware (defined by the `use` keyword) and an
application at the bottom (defined by the `run` keyword) into a single Rack
application `app` that will allow us to run the whole thing.

Let's give it a look...

```ruby
# config.ru
$:.unshift File.expand_path('../lib', __FILE__)

require 'custom_header'
require 'ping'

app = Rack::Builder.new do
  use Rack::CustomHeader
  use Rack::Ping
  run Proc.new { |env| [200, {}, ["Say something to me!"]] }
end

run app
```

The first thing we do is loading the `lib` directory into the `$LOAD_PATH` and
require the two files that contain our middleware. Now that we know that our
middleware is available, we'll pack the application with `Rack::Builder.new` by
adding the middleware on the top and the application at the bottom. The final
step will be to run the new packed Rack app.

Let's try this running the `config.ru` and doing some requests with `cURL`.

Start the application using the `rackup` command.

```bash
$ curl -i -X GET localhost:9292
HTTP/1.1 200 OK
X-Custom-Header: customheader.v1
Transfer-Encoding: chunked

Say something to me!
```

First we are trying is the `"/"` route but it will be the same with any route.
The response is the expected, there is our custom header with the response from
the application.

But what happens if we use the `/ping` route:

```bash
$ curl -i -X GET localhost:9292/ping
HTTP/1.1 200 OK
X-Custom-Header: customheader.v1
Transfer-Encoding: chunked

pong
```

One thing to notice is that this response apart from being from the Ping
middleware it also has the custom header because that middleware is before. This
will not happen if the order was different. That said, ordering correctly the
middleware matters.

This is a very simple example that shows how middleware are created and work. I
hope it's useful for some of you.

Thanks for reading!

[rack-basics]: http://albertogrespan.com/blog/rack-basics/
