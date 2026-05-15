---
date: 2012-12-04T00:00:00Z
title: Ejecutar múltiples dominios o subdominios en NGINX usando Server Blocks en Ubuntu
slug: /running-multiple-domains-or-subdomains-in-nginx-with-server-blocks/
translationKey: "running-multiple-domains-or-subdomains-in-nginx-with-server-blocks"
description: |-
  Ejecuta múltiples sitios web en NGINX usando Server Blocks (tutorial en Ubuntu).
categories:
  - DevOps
tags:
  - NGINX
  - Vim
  - Domains
  - Subdomains
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

¿Te has preguntado cómo tener múltiples dominios o subdominios apuntando a
proyectos distintos, todos en un solo servidor?

Este es un tutorial simple para hacerlo con NGINX.

### tareas del tutorial:

1. Crear o apuntar dominios/subdominios a la IP del servidor
2. Configurar NGINX
3. Crear un directorio para el proyecto
4. Cambiar permisos de carpeta
5. Crear una página HTML simple
6. Crear un nuevo Server Block con tu dominio/subdominio
7. Configurar y enlazar el Server Block
8. Reiniciar NGINX

### 1. Crear o apuntar dominios/subdominios a la IP del servidor

Ve a tu registrador de dominios o al DNS y apunta los registros a la IP de tu
servidor. Para pruebas locales modifica `/etc/hosts`.

    $ vim /etc/hosts

Y agrega algo como:

    127.0.0.1    example.com
    127.0.0.1    example2.com
    127.0.0.1    my.example.com

### 2. Configurar NGINX

Instala NGINX en Ubuntu si aún no lo tienes.

    $ sudo apt-get install NGINX

### 3. Crear un directorio para el proyecto

Crea un directorio donde prefieras guardar el proyecto.

    $ mkdir -p /home/username/www/example.com

### 4. Cambiar permisos de carpeta

Si creaste el directorio fuera de tu `$HOME` y usaste `sudo`, cambia propietario
 y permisos:

    $ sudo chown -R user:user /var/www/example.com/
    $ sudo chmod 755 /var/www/example.com/

### 5. Crear una página HTML simple

    $ cd /home/username/www/example.com
    $ touch index.html
    $ vi index.html

Contenido de ejemplo:

    <!DOCTYPE html>
    <html>
      <head>
        <title>Server Block</title>
      </head>
      <body>
        <h1>Hello, World!</h1>
      </body>
    </html>

### 6. Crear un nuevo Server Block

Copia el Server Block por defecto y modifícalo:

    $ sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/example.com

### 7. Configurar y enlazar el Server Block

Edita el archivo:

    $ sudo vi /etc/nginx/sites-available/example.com

Cambia `server_name`, `root` e `index`:

    server {
      listen   80; ## listen for ipv4; this line is default and implied
      listen   [::]:80 default ipv6only=on; ## listen for ipv6

      root /home/username/www/example.com;
      index index.html;

      # Make site accessible from http://localhost/
      server_name example.com;
    }

Crea el symlink:

    $ sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/example.com

### 8. Reiniciar NGINX

    $ sudo service nginx restart

Abre el navegador y entra al dominio; deberías ver el `index.html`.

---

Ahora podrás ejecutar múltiples aplicaciones en el mismo servidor.
