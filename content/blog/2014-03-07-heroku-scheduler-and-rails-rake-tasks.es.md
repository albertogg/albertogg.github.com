---
date: 2014-03-07T00:00:00Z
title: Heroku scheduler y tareas Rake en Rails
slug: /heroku-scheduler-and-rails-rake-tasks/
translationKey: "heroku-scheduler-and-rails-rake-tasks"
description: |-
  Usando Heroku Scheduler con Rails y Rake para mantener despierto el dyno;
  también sirve para cualquier tarea periódica corta personalizada.
categories:
  - Development
tags:
  - Ruby
  - Rake
  - Heroku
  - CLI
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

> **tl;dr** we are using the heroku scheduler with Rails and Rake to keep our
> dyno awake; this will also work for any custom short periodical task.

## Heroku scheduler

Heroku Scheduler es un add-on "gratuito" que te ayuda a ejecutar tareas cortas
cada 10, 60 o 3600 minutos. Puedes usarlo tanto como quieras al mes, pero
*AFAIK* consume minutos de tus dynos.

### Agregar el scheduler

Hay 2 maneras de agregar este add-on a tu aplicación: desde la [interfaz web](https://addons.heroku.com/scheduler)
o por CLI.

> To use the CLI you must have the [heroku
> toolbelt](https://toolbelt.heroku.com/) installed.

    $ heroku addons:add scheduler

### ping.rake

Es momento de crear la tarea Rake en Rails. Primero crea un archivo dentro de
`lib/tasks`.

    $ touch lib/tasks/ping.rake

Luego agrega este código:

    require 'net/http'

    namespace :ping do
      desc "Ping our heroku dyno every 10, 60 or 3600 min"
      task :start do
        puts "Making the attempt to ping the dyno"

        if ENV['URL']
          puts "Sending ping"

          uri = URI(ENV['URL'])
          Net::HTTP.get_response(uri)

          puts "success..."
        end
      end
    end

### Variables de entorno

Ahora la tarea está lista, pero usa variables de entorno que deben exportarse
en Heroku y localmente (para pruebas):

    $ heroku config:set URL=http://xxx.herokuapp.com/ #replace xxx with your heroku appmane

> to test the task locally you can either use `export
> URL=http://xxx.herokuapp.com/` or the [dotenv
> gem](https://github.com/bkeepers/dotenv) and run `rake ping:start`.

### Probar la tarea

Para probar la tarea en Heroku, haz commit y despliega. Luego usa `heroku run`:

    $ heroku run rake ping:start

Si la salida fue correcta, solo falta agregarla al scheduler.

### Agregar la tarea al scheduler

$ heroku addons:open scheduler

Esto abrirá la web donde debes agregar la tarea (por ejemplo `rake ping:start`),
tamaño de dyno (1x) y frecuencia (60minutes).

---

Listo. Para validar ejecuciones, revisa logs luego de unas horas:
`heroku logs --ps scheduler.1`.
