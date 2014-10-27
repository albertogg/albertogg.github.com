---
layout: post
title: Installing platform specific gems with Bundler
description: Installing platform specific gems with Bundler
category: blog
tag: blog
---

Sometimes we'll need to install specific gems to make our project compatible in
different platforms such as MRI, Rubinius, a particular Ruby version, JRuby,
windows, etc...

As you may know, dependency management in Ruby is done through
[Bundler][bundler] Gemfile. Bundler comes with a handy CLI command that can
help us gather some information about our current platform and help us see a
bigger picture of what's going on with our project Gemfile e.g:

```bash
$ bundle platform
Your platform is: x86_64-darwin13.0

Your app has gems that work on these platforms:
* ruby

Your Gemfile does not specify a Ruby version requirement.
```

That's cool, but how do we manage platform specific gems?

## Managing platforms

Apart from the bundler's platform command it also have a `platforms` option
that can be used within the Gemfile and applied to a group of gems in a block
form or to a single gem in the same way we do it with `groups`.

```ruby
# Gemfile
platforms :ruby do
  gem "ruby-debug"
  gem "sqlite3"
end

gem 'jdbc-postgres', '~> 9.3.1102', :platforms => :jruby
```

The platforms block tells that these two gems are only going to be installed
when using *C Ruby (MRI) or Rubinius, but NOT Windows* and the `jdbc-postgres`
gem will only be installed when the platform is JRuby. You can check more
[here][man-page].

This can help us be more subtle with [rubygems.org][rubygems] servers and
probably with our application load times.

But wait, there's another "solution" that can be used and it's pure Ruby.

Let's test it:

```ruby
$ irb

> RUBY_PLATFORM
=> "x86_64-darwin13.0"
> puts "YAY" if RUBY_PLATFORM=~ /x86_64-darwin13.0/
=> YAY
```

I'm currently running under OS X so my platform will be Darwin. The output
above is telling me that. But what is `RUBY_PLATFORM` ?

`RUBY_PLATFORM` is a Ruby constant that will give us our current platform, it's
also the same constant that Bundler uses when we type `bundle platform`. You
might be thinking how can we apply this to a Gemfile... Well, easy, in the same
we just did.

```ruby
# Gemfile
if RUBY_PLATFORM =~ /x86_64-linux/
  gem 'libv8', '~> 3.16.14.7'
  gem 'therubyracer', '~> 0.12.1'
end
```

As you see we are using it to install some dependencies only on Linux. One
thing I've notice when using `RUBY_PLATFORM` is that it's a bit "unreliable". I
haven't test it in all possible platforms but when using this constant an JRuby
the output will be "Java" and not the current OS, this may be the intended
behaviour, but it wasn't for me, so be careful with this if you are planing on
using it for gem installation purposes, it may be better and safer to just
stick with Bundler's platforms.

Thanks!

[bundler]: http://bundler.io/
[man-page]: http://bundler.io/v1.7/man/gemfile.5.html
[rubygems]: http://rubygems.org/
