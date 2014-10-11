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

[Bundler][bundler] comes with a CLI command that tell us our current platform.
e.g:


```bash
$ bundle platform
Your platform is: x86_64-darwin13.0

Your app has gems that work on these platforms:
* ruby

Your Gemfile does not specify a Ruby version requirement.
```

That's cool.

Apart from the bundler's CLI command it also have a `platforms` options that
can be used within the Gemfile and applied to a group of gems in a block form
or to a single gem.

```ruby
# Gemfile
gem 'jdbc-postgres', '~> 9.3.1102', :platforms => :jruby

platforms :ruby do
  gem "ruby-debug"
  gem "sqlite3"
end
```

The block tells that these two gems are only going to be installed when using *C Ruby
(MRI) or Rubinius, but NOT Windows* and `jdbc-postgres` will only be installed
when the platform is JRuby. You can check more [here][man-page].

But wait, there's another solution that can be used and is pure Ruby.

Let's test it:

```ruby
$ irb

> RUBY_PLATFORM
=> "x86_64-darwin13.0"
```

I'm currently in OS X so my platform is Darwin, Ruby is correct.
`RUBY_PLATFORM` is a constant that will give us our current platform, it's also
the same constant that Bundler uses when we type `bundle platform`. You might
be thinking how can we apply this to a Gemfile... Well, easy, in the same we
just did.

```ruby
# Gemfile
if RUBY_PLATFORM =~ /x86_64-linux/
  gem 'libv8', '~> 3.16.14.7'
  gem 'therubyracer', '~> 0.12.1'
end
```

This way you can be a bit more specific if it's needed, in the end being
careful about the gems and platforms can help a few installation minutes and
probably application loading time if some gems are unnecessary in your current
platform.

Thanks!

[bundler]: http://bundler.io/
[man-page]: http://bundler.io/v1.7/man/gemfile.5.html
