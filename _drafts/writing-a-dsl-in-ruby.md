---
layout: post
title: Writing a DSL in Ruby
description: Writing a simple Domain Specific Language in Ruby
category: blog
tag: blog
---

A Domain Specific Language or DSL is a mini language focused in solving
particular type of problem. That said, it's not a general purpose language like
Ruby. Writing a DSL can help us improve the code base by making it more
readable.

If you've used Rails you've used tons of DSLs. e.g inside migrations,
configuration files etc... DSLs in Ruby are a common thing and we are making a
simple but useful example in this post.

## What we want

At the end of the post we will end up with an `address_book` object with that
contains an array of contacts, all done with our simple DSL:

```ruby
address_book = AddressBook.new do
  add_contact do
    full_name "Alberto Grespan"
    email "alberto@example.com"
  end

  add_contact do
    full_name "John Doe"
    email "johndoe@example.com"
  end
end
```

To get to the syntax displayed above let's start with the contacts class.

## Contact

We want to save the contacts in our address book with their full name and email.
Let's start with the `Contact` class.

```ruby
class Contact
  attr_accessor :full_name, :email

  def initialize(&block)
    (block.arity < 1 ? (instance_eval &block) : block.call(self)) if block_given?
  end

  def full_name(full_name=nil)
    full_name.nil? ? @full_name : @full_name = full_name
  end

  def email(email=nil)
    email.nil? ? @email : @email = email
  end
end
```

What we did here is very minimal and simple, and it will work for the example
used above and also with local block variables. Let me explain this a bit.

When we instantiate a new `Contact` object and we pass it a block it checks the
`block.arity`, if it's less than one it evaluates the block using
`instance_eval`, if it's is more than one it will use `block.call(self)` this
allow us to use the block with either a local block variable or without it.

Let's try it out:

```ruby
contact = Contact.new do
  full_name "Alberto Grespan"
  email "alberto@example.com"
end
#=> #<Contact:0x007fa821b240c8 @email="alberto@example.com", @full_name="Alberto Grespan">
```

Or with local variables

```ruby
contact = Contact.new do |contact|
  contact.full_name "Alberto Grespan"
  contact.email "alberto@example.com"
end
#=> #<Contact:0x007fa821c25bc0 @email="alberto@example.com", @full_name="Alberto Grespan">
```

Now we need to wrap the `Contact` class functionality inside an `AdressBook` to
match our desired functionality.

## AddressBook
