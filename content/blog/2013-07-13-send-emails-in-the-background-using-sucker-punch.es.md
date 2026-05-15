---
date: 2013-07-13T00:00:00Z
title: Enviar correos en segundo plano usando sucker punch
slug: /send-emails-in-the-background-using-sucker-punch/
translationKey: "send-emails-in-the-background-using-sucker-punch"
description: |-
  Envía correos en segundo plano usando la gema sucker_punch en una aplicación Rails.
categories:
  - Development
tags:
  - Ruby
  - Rails
  - Background jobs
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

## Sucker punch gem

This gem was created by [@brandonhilkert](https://twitter.com/brandonhilkert)
with a very specific use case in mind.

> **note:** If you are looking for a massive background processing gem with
> persistence, etc. go with something like
> [Sidekiq](https://github.com/mperham/sidekiq) instead.

### ¿Por qué sucker punch?

- Procesamiento asíncrono dentro de un solo proceso.
- Todas las colas pueden correr dentro de un único proceso Rails/Sinatra.
- No necesita configuración.
- Muy simple de usar.
- Reduce costos en servicios como Heroku.

## Enviar correos dentro de una aplicación Rails usando sucker_punch

Ya tienes una aplicación Rails funcionando y quieres enviar un correo desde un
formulario de contacto o al registrar un usuario. Hagámoslo con procesamiento
asíncrono usando sucker punch.

Primero instala la gema sucker punch.

    # Add this line to your Gemfile
    $ gem 'sucker_punch', '~> 1.0.1'

    # Run bundle
    $ bundle install

Genera el mailer.

    $ rails g mailer ContactMailer

Este comando creará todos los archivos necesarios para enviar correos dentro de
la aplicación Rails.

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

Crea tu plantilla de correo.

    # app/views/contact_mailer/contact_form.txt.erb
    # This template receives the @contact variable from the
    # app/mailers/contact_mailer.rb contact_form method.
    <%= @contact.name %>

    <%= @contact.content %>

Ahora crea el job de sucker punch.

    # app/jobs/contacts_email_job.rb
    class ContactsEmailJob
      include SuckerPunch::Job

      # The perform method is in charge of our code execution when enqueued.
      def perform(contact)
        ContactMailer.contact_form(contact).deliver
      end

    end

Ahora revisemos el controlador.

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

Cuando el usuario envía el formulario de contacto, dispara el controlador que
instancia un nuevo job y se ejecuta de forma asíncrona. Así, el usuario no se
queda esperando mientras se envía el correo, mejorando la experiencia.

---

En conclusión, tareas como los background jobs se vuelven muy sencillas al usar
las herramientas correctas. En este caso, sucker punch.
