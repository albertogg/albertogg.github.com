---
layout: post
title: Rack middleware
description: Introduction on how to build a Rack middleware
category: blog
tag: blog
---

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
