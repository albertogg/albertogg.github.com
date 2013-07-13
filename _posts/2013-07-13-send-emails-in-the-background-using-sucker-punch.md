---
layout: post
title: Send emails in the background using sucker punch
category: blog
tag: blog
---

## Sucker punch gem

This gem was created by [@brandonhilkert](https://twitter.com/brandonhilkert) with a very specific use case in mind. I'm not sure what the use case was, but, I believe it's something like; taking advantage of [Heroku](http://heroku.com) web dynos, without needing to pay extra for a worker dyno (this is what I'm using it for). If It's not; I'm leaning towards simplicity. At this point with [sucker_punch](https://github.com/brandonhilkert/sucker_punch) in it's **version 1.0.1** became dead simple to install and use, no configuration needed. I'm really grateful that this gem was created.  

**note:** If you are looking for a massive background processing gem with persistence, etc. go with something like [Sidekiq](https://github.com/mperham/sidekiq) instead.

### Why sucker punch?

- Asynchronous processing within a single process.
- All queues can run within a single Rails/Sinatra process.
- No configuration needed.
- Dead simple to use.
- Reduces costs in services like Heroku.

## Sending emails within a Rails application using sucker_punch

You already have a Rails application running and you want to send a contact form email or an email when the user registers. Let's do this using asynchronous processing with sucker punch.

First install the sucker punch gem.

{% highlight bash %}
# Add this line to your Gemfile
$ gem 'sucker_punch', '~> 1.0.1'

# Run bundle
$ bundle install
{% endhighlight %}

Generate the mailer.

{% highlight bash %}
$ rails g mailer ContacMailer
{% endhighlight %}

This command will create all the files necessary to send emails within the rails application.

{% highlight ruby %}
# app/mailers/contact_mailer.rb
class ContactMailer < ActionMailer::Base
  default from: "alberto@example.com"

  # This method receives the data from the sucker punch job.
  def contact_form(contact)
    @contact = contact

    mail to: "alberto@example.com",
         subject: contact.subject,
         from: contact.email
  end
end
{% endhighlight %}

Create your email template.

{% highlight erb %}
# app/views/contact_mailer/contact_form.txt.erb
# This template receives the @contact variable from the app/mailers/contact_mailer.rb contact_form method.
<%= @contact.name %>

<%= @contact.content %>
{% endhighlight %}

Let's create the sucker punch job.

{% highlight ruby %}
# app/jobs/contacts_email_job.rb
class ContactsEmailJob
  include SuckerPunch::Job

  # The perform method is in charge of our code execution when enqueued.
  def perform(contact)
    ContactMailer.contact_form(contact).deliver
  end

end
{% endhighlight %}

Now let's take a look at the controller.

{% highlight ruby %}
# app/controllers/contacts_controller.rb
class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(params[:contact])

    if @contact.valid?
    
      # We call our sucker punch job asynchronously using "async"
      ContactsEmailJob.new.async.perform(@contact)
      flash[:success] = Your email has been send!
      redirect_to root_url
    else
      render :action => 'new'
    end
  end
end
{% endhighlight %}

When the user hits contact form and click the submit button of the form, they are triggering the controller which instantiates a *new* job that will *perform asynchronously* so the user will not be hold down waiting for the email to be send. In the end using background jobs for doing this things reflects in a better user experience.

## Conclusion

In conclusion doing complicated things like background jobs becomes really easy when using the appropriate tools. In this case using sucker punch. We didn't have to figure out how to install and configure persistence or configuring the job queues. It just works.
