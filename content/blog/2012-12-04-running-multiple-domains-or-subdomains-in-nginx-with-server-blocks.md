---
date: 2012-12-04T00:00:00Z
title: |-
  Running multiple domains or subdomains in NGINX using Server Blocks in Ubuntu
slug: /running-multiple-domains-or-subdomains-in-nginx-with-server-blocks/
description: |-
  Run multiple websites in NGINX using Server Blocks (Ubuntu tutorial).
categories:
  - DevOps
tags:
  - NGINX
  - Vim
  - Domains
  - Subdomains
---

Have you ever wonder; how can I have multiple domains or subdomains pointing to
different projects but all of them are in just one server? well...

This will be a very simple tutorial for doing that, with NGINX.

### tutorial tasks:

1. Creating or pointing domains/subdomains to the server's IP address
2. Setup NGINX
3. Create a directory to keep the project
4. Change folder permissions
5. Create a simple html page to display
6. Create a new Server Block with your domain or subdomain
7. Setup and link the Server Block
8. Restart NGINX

### 1. Creating or pointing domains/subdomains to the server's ip address

Go to your domain register or to the DNS where your domain records are stored
and point them to your server ip address (you can do this with a subdomain too).
If you are trying this locally modify the `/etc/hosts` files and create a new
record.

    $ vim /etc/hosts

And add something like.

    127.0.0.1    example.com
    127.0.0.1    example2.com
    127.0.0.1    my.example.com

### 2. Setup NGINX

Setup NGINX in *Ubuntu* if you haven't.

    $ sudo apt-get install NGINX

### 3. Create a directory to keep the project

Create a directory wherever you prefer to store your project. If you want you
can create it in the typical `/var/www/` or elsewhere.

We will create the folder in our home directory just to skip task #4.

    $ mkdir -p /home/username/www/example.com

If you didn't do that, read on the next task.

### 4. Change folder permissions

Now that you've created the folder in some random directory and not in your
"$HOME", like we did; and probably used `sudo` for that task, you should grant
ownership of the directory to the right user and also give everyone permission
to read it's content.

You do this by simply running:

    $ sudo chown -R user:user /var/www/example.com/
    $ sudo chmod 755 /var/www/example.com/

### 5. Create a simple html page to display

`cd` into your applications directory and create a new file with the name
`index.html`:

    $ cd /home/username/www/example.com
    $ touch index.html
    $ vi index.html

Now, add the content to be displayed in the index file. This will help us to
notice if everything is working or not at the end of the tutorial.

    <!DOCTYPE html>
    <html>
      <head>
        <title>Server Block</title>
      </head>
      <body>
        <h1>Hello, World!</h1>
      </body>
    </html>

### 6. Create a new Server Block with your domain or subdomain

In a short explanation of how *server block* works, we can say; It's a file that
contains a variable called `server_name` that is used by *NGINX* to figure out
which application is being accessed on the server.

We need to have one *server block* for each application running in our server.
To create a new one we have to copy the *default* *server block* and then modify
it.

    $ sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/example.com

> Name the *server block* as your domain or subdomain, in this case we are using
> example.com as the domain.

### 7. Setup and link the Server Block

After we've created the *Server Block* we need to adapt it to meet our
requirements, by doing:

    $ sudo vi /etc/nginx/sites-available/example.com

And changing it's `server_name`, `root` folder and the previously created
`index` file.

    server {
      listen   80; ## listen for ipv4; this line is default and implied
      listen   [::]:80 default ipv6only=on; ## listen for ipv6

      root /home/username/www/example.com;
      index index.html;

      # Make site accessible from http://localhost/
      server_name example.com;
    }

The last step is to link the newly created *Server Block* into the
`sites-enable` folder with a symlink, to get it working.

    $ sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/example.com

### 8. Restart NGINX

Restart NGINX before accessing the web browser by doing:

    $ sudo service nginx restart

At last open the browser and write down the domain in the search bar, you should
be seeing the `index.html` file we created early.

---

Now you will be able to run multiple applications in the same server. If you
want another application running just repeat all the steps above.
