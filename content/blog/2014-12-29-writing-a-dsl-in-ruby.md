---
categories:
- blog
date: 2014-12-29T00:00:00Z
description: Writing a simple Domain Specific Language (DSL) in Ruby
tag: blog
title: Writing a DSL in Ruby
slug: /writing-a-dsl-in-ruby/
---

A Domain Specific Language or DSL is a mini language focused in solving a
particular type of problem. That said, it's not a general purpose language like
Ruby. Writing a DSL can help us improve the code base by making it more
readable.

If you've used Rails, you've used and seen tons of DSLs. *e.g* inside
migrations, configuration files etc... DSLs in Ruby are a common thing and we
are making a simple but useful example in this post.

## What we want

At the end of the post we will end up with an `address_book` object with that
contains an array of contacts, all done with our simple DSL:

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

Let's start with the contact class.

## Contact

We want to save the contacts in our address book with their full name and email.

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

What we did here is very minimal and simple, and it will work for the example
used above and also with local block variables. Let me explain this a bit.

When we instantiate a new `Contact` object and pass it a block, it checks the
`block.arity`, if it's less than one it evaluates the block using
`instance_eval`, if it's more than one it uses `block.call(self)` this allow us
to use the block with either a local block variable or without it.

Let's try it out:

    contact = Contact.new do
      full_name "Alberto Grespan"
      email "alberto@example.com"
    end
    #=> #<Contact:0x007fa821b240c8 @email="alberto@example.com", @full_name="Alberto Grespan">

Or with local variables

    contact = Contact.new do |contact|
      contact.full_name "Alberto Grespan"
      contact.email "alberto@example.com"
    end
    #=> #<Contact:0x007fa821c25bc0 @email="alberto@example.com", @full_name="Alberto Grespan">

Now we need to wrap the `Contact` class functionality inside an `AdressBook` to
match our desired goal.

## AddressBook

The `AddressBook` class is pretty straight forward. It should be able to manage
an array of contacts and have a method named `add_contact` that receives a block
and appends a new `Contact` to the contacts array.

    class AddressBook
      attr_accessor :contacts

      def initialize(&block)
        @contacts = []
        (block.arity < 1 ? (instance_eval &block) : block.call(self)) if block_given?
      end

      def add_contact(&block)
        @contacts << Contact.new(&block)
      end
    end

In the same way we did with the `Contact` class we are using the `block.arity`,
`instance_eval` and `block.call(self)` on the `AddressBook` class. Now we can
wrap the `Contact` class functionality inside the `add_contact` method and have
our `AddressBook` object with contacts.

Inside **irb or pry**, require the two classes(`Contacts` and `AddressBook`) to
use the DSL:

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
    #=> #<AddressBook:0x007fa4eb10cee8 @contact=[
        #<Contact:0x007fa4eb10cdd0 @email="alberto@example.com", @full_name="Alberto Grespan">,
        #<Contact:0x007fa4eb10cce0 @email="johndoe@example.com", @full_name="John Doe">]>

Or with local block variable

    address_book = AddressBook.new do |contact|
      contact.add_contact do
        full_name "Alberto Grespan"
        email "alberto@example.com"
      end

      contact.add_contact do
        full_name "John Doe"
        email "johndoe@example.com"
      end
    end
    #=> #<AddressBook:0x007fa4ec8dcf50 @contact=[
        #<Contact:0x007fa4ec8dce60 @email="alberto@example.com", @full_name="Alberto Grespan">,
        #<Contact:0x007fa4ec8dcd70 @email="johndoe@example.com", @full_name="John Doe">]>

---

Keep in mind that this code can be improved performance wise and it's just a way
to make a DSL in Ruby, I also hope this is useful and simple enough to
understand.

Thanks for reading and thanks to **Diorman Colmenares** for the help!
