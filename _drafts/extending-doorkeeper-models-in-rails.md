---
layout: post
title: Extending Doorkeeper models in Rails
description: Extending Doorkeeper models in Rails using class_eval. Associations, validations, new functionality etc.
category: blog
tag: blog
---

> tl;dr we can use `class_eval` to extend Doorkeeper models functionality in
> runtime within a Rails initializer.

A few weeks ago at work, we were extending our basic OAuth2 provider by adding
the possibility to either login with Google OAuth2 or with our own. We also
added a role based level of authorization, nothing complex... but we needed new
validations, associations and a couple of methods in a Doorkeeper model. To
achieve this we used `class_eval` inside a Rails initializer
(`doorkeeper_patch.rb`) where we added everything we needed.

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

You can do the same thing to the other Doorkeeper models, note that we are using
`Rails.logger` as an alert notification that there is a "monkey patch" in
Doorkeeper in order to extend its functionality.

That's all, pretty easily we manage to accomplish what we needed by extending
the models in runtime using `class_eval`.

Thanks for reading!
