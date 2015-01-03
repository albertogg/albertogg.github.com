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
the possibility to login with Google OAuth2 or with our own. We also added a
role based level of authorization, nothing complex... but we needed new
validations, associations and a couple of methods in a Doorkeeper model. To
achieve this we used `class_eval` inside a Rails initializer
(`doorkeeper_patch.rb`) where we added everything we needed.
