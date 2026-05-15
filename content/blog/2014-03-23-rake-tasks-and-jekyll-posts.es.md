---
date: 2014-03-23T00:00:00Z
title: Tareas Rake y posts de Jekyll
slug: /rake-tasks-and-jekyll-posts/
translationKey: "rake-tasks-and-jekyll-posts"
description: |-
  Crear posts en Jekyll puede doler a veces. Deja de repetirte y usa una tarea
  Rake personalizada. Gracias Jim.
categories:
  - Development
tags:
  - Ruby
  - Rake
  - Jekyll
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

> **tl;dr** use Rake tasks to create drafts/posts in Jekyll.

Crear un borrador o un post nuevo es una tarea repetitiva. Si eres como yo y
olvidas cosas con frecuencia, probablemente necesitas algo de automatización.

## Historia

Durante casi 2 años en los que casi no publiqué, usaba dos tareas Rake
*prestadas* de [Zack Holman](http://zachholman.com/) para crear posts en Jekyll.
Unas semanas atrás renové por completo el blog y también esas tareas.

## Nuevas tareas *"tasks"*

Aquí explico brevemente qué hace cada tarea:

Crear un nuevo borrador:

- Pide el título del post.
- Crea un slug con ese título.
- Convierte el slug a minúsculas y reemplaza espacios por guiones.
- Elimina acentos del slug.
- Crea un archivo `.md` en `_drafts` con el slug como nombre.
- Agrega front-matter con: layout, title, description, category y tag.

Cuando el borrador está listo:

- Lista borradores en `_drafts`.
- Pide el nombre del borrador a publicar.
- Mueve el borrador de `_drafts` a `_posts`.
- Renombra el archivo agregando la fecha actual.

> These features are a WIP but they work fine ATM.

## El código

Para usar estas tareas: crea un archivo `Rakefile`, pega el código y guárdalo.
Si ya tienes uno, el namespace debería evitar colisiones.

    require 'fileutils'

    namespace :draft do
      desc "Creating a new draft for post/entry"
      task :new do
        puts "What's the name for your next post?"
        @name = STDIN.gets.chomp
        @slug = "#{@name}"
        @slug = @slug.tr('ÁáÉéÍíÓóÚú', 'AaEeIiOoUu')
        @slug = @slug.downcase.strip.gsub(' ', '-')
        FileUtils.touch("_drafts/#{@slug}.md")
        open("_drafts/#{@slug}.md", 'a' ) do |file|
          file.puts "---"
          file.puts "layout: post"
          file.puts "title: #{@name}"
          file.puts "description: maximum 155 char description"
          file.puts "category: blog"
          file.puts "tag: blog"
          file.puts "---"
        end
      end

      desc "copy draft to production post!"
      task :ready do
        puts "Posts in _drafts:"
        Dir.foreach("_drafts") do |fname|
          next if fname == '.' or fname == '..' or fname == '.keep'
          puts fname
        end
        puts "what's the name of the draft to post?"
        @post_name = STDIN.gets.chomp
        @post_date = Time.now.strftime("%F")
        FileUtils.mv("_drafts/#{@post_name}", "_posts/#{@post_name}")
        FileUtils.mv("_posts/#{@post_name}", "_posts/#{@post_date}-#{@post_name}")
        puts "Post copied and ready to deploy!"
      end
    end

Puedes ejecutar estas tareas con:

    $ rake draft:new    # Creating a new draft for post/entry
    $ rake draft:ready  # copy draft to production post!

Como ves, ambas tareas son directas, hacen cosas simples y funcionan bien.

---

Sé que se pueden mejorar bastante, pero espero que al menos le sirvan a alguien.
