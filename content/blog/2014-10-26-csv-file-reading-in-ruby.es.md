---
date: 2014-10-26T00:00:00Z
title: Lectura de archivos CSV en Ruby
slug: /csv-file-reading-in-ruby/
translationKey: "csv-file-reading-in-ruby"
description: |-
  Lectura de archivos CSV en Ruby usando los métodos read y foreach. También
  veremos cómo poblar una base de datos Rails con CSV.
categories:
  - Development
tags:
  - Ruby
  - CSV
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

En este post muestro cómo leer datos de un archivo `.csv` y volcarlos en un
Array de hashes en Ruby, y cómo usar eso para sembrar una base de datos en
Rails.

## Leer un archivo CSV

Ruby incluye soporte CSV en la Standard Library. Veremos dos maneras:
- leer todo con `read`
- leer línea por línea con `foreach`

### Archivo CSV

    Name,Lastname,Email,Birth Date,Hometown
    Alberto,Grespan,ag@gmail.com,30/11/1986,Mérida
    Pedro,Perez,pp@gmail.com,4/4/1984,Caracas
    John,Doe,jd@gmail.com,,Kansas
    José,González,jg@gmail.com,16/10/1984,Madrid
    Andrés,Márquez,,18/3/1987,Caracas

### Leer todo el archivo

    require 'csv'

    > data = CSV.read("csv_data.csv", { encoding: "UTF-8", headers: true, header_converters: :symbol, converters: :all})

    > hashed_data = data.map { |d| d.to_hash }

Opciones usadas:
- `encoding`: UTF-8
- `headers`: usar encabezados como claves
- `header_converters`: encabezados como símbolos
- `converters`: convertir tipos automáticamente

### Leer línea por línea

    require 'csv'

    data = Array.new

    > CSV.foreach("csv_data.csv", { encoding: "UTF-8", headers: true, header_converters: :symbol, converters: :all}) do |row|
      data << row.to_hash
    end

## Sembrar base de datos Rails

En `db/seeds.rb`:

    require 'csv'

    CSV.foreach("db/csv/csv_data.csv", { encoding: "UTF-8", headers: true, header_converters: :symbol, converters: :all}) do |row|
      User.create(row.to_hash)
    end

Ejecutar:

    $ bin/rake db:seed

Y validar en consola de Rails.

¡Gracias por leer!
