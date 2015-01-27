---
layout: post
title: Rack middleware
description: Introduction on how to build a Rack middleware
category: blog
tag: blog
---

> tl;dr we are creating two Rack middlewares, one that adds  a custom header to
> all responses and one that adds a new route that has a custom response.

As explained in a previous post about [Rack basics][rack-basics], Rack is found
in most popular Ruby web frameworks as it's an adaptable interface for
developing web applications in Ruby. In this post we are going to create two
simple middleware. The first one will add a custom header to all responses and
the second one will add a custom route that will respond to `/ping`. We are also
talking about `Rack::Builder` to construct Rack applications.

## Things to know about middleware

There are few things that we need to know about Rack middleware in order to
fully understand everything:

- Each middleware responds to a `call()` method
- Only receives one argument, the environment (`env`)
- Responds with an array of integer of status code, hash of headers, array of strings
- Each middleware is responsible of calling the next

## Adding a custom header

```ruby
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

```ruby
# config.ru
app = Rack::Builder.new do
  use Rack::CustomHeader
  use Rack::Ping
  run Proc.new { |env| [200, {}, ["Say something to me!"]] }
end
```

[rack-basics]: http://albertogrespan.com/blog/rack-basics/
