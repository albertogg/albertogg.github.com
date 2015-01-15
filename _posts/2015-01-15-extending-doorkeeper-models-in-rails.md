---
layout: post
title: Extending Doorkeeper models in Rails
description: Extending Doorkeeper models in Ruby on Rails using class_eval. Associations, validations, new functionality etc.
category: blog
tag: blog
---

> tl;dr use `class_eval` to extend Doorkeeper models functionality in runtime.

A few weeks ago at work, we were extending our very basic OAuth2 provider by
adding the possibility to either login with Google OAuth2 or with our own. With
that we also did a role based level of authorization, nothing complex... but, as
we are using Doorkeeper for the OAuth2 we needed new validations, associations
and a couple of new methods in one of their models to fulfill our needs. To
achieve this we used `class_eval` inside a Rails initializer that allowed us to
extend the model in runtime without touching the code inside the gem.

Let's take a look at it.

```ruby
# config/initializers/doorkeeper_patch.rb
# Log the Doorkeeper extension
Rails.logger.info "Extending Doorkeeper from config/initializer/doorkeeper_patch.rb"

Doorkeeper::Application.class_eval do
  has_and_belongs_to_many :roles, foreign_key: "oauth_application_id"

  validates_uniqueness_of :name

  # keep adding any other methods, validations, relations here...
end
```

Note that there is a `Rails.logger` at the beginning of the file as a
notification that there is a "monkey patch" in Doorkeeper, this may be helpful
when debugging latter, after that, we proceed to add whatever was needed to that
model as if we were inside that Rails model.

You can do the same thing to the other Doorkeeper models or libraries.

That's all, pretty easily we manage to accomplish what we needed by extending
the models in runtime using `class_eval`.

Thanks for reading!
