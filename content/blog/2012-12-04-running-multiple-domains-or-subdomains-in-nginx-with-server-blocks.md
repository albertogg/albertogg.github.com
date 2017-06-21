---
categories:
- blog
date: 2012-12-04T00:00:00Z
description: |
  Run multiple websites in nginx using Server Blocks (Ubuntu tutorial).
tag: blog
title: |
  Running multiple domains or subdomains in Nginx using Server Blocks in Ubuntu
url: /2012/12/04/running-multiple-domains-or-subdomains-in-nginx-with-server-blocks/
---

Have you ever wonder; how can I have multiple domains or subdomains pointing to different projects but all of them are in just one server? well...

This will be a very simple tutorial for doing that, with Nginx.

### tutorial tasks:

	1. Creating or pointing domains/subdomains to the server's ip address.
	2. setup nginx.
	3. Create a directory to keep the project.
	4. Change folder permissions.
	5. Create a simple html page to display.
	6. Create a new Server Block.
	7. Set up and link the Server Block.
	8. Restart nginx.
	9. Profit!.

### 1. Creating or pointing domains/subdomains to the server's ip address.

Go to your domain register or to the DNS where your domain records are stored and point them to your server ip address (you can do this with a subdomain too). If you are trying this locally modify the "/etc/hosts" files and create a new record.

{{< highlight bash >}}

$ nano /etc/hosts

{{< / highlight >}}

And add something like.

{{< highlight bash >}}

127.0.0.1    example.com
127.0.0.1    example2.com
127.0.0.1    my.example.com

{{< / highlight >}}


### 2. setup nginx.

Setup nginx in *Ubuntu* if you haven't.

{{< highlight bash >}}

$ sudo apt-get install nginx

{{< / highlight >}}


### 3. Create a directory to keep the project.

Create a directory wherever you prefer to store your project. If you want you can create it in the typical */var/www/* or elsewhere.

We will create the folder in our home directory just to skip task #4.

{{< highlight bash >}}

$ mkdir -p /home/username/www/example.com

{{< / highlight >}}

If you didn't do that, read on the next task.

### 4. Change folder permissions.

Now that you've created the folder in some random directory and not in your "$HOME", like we did; and and probably used ***sudo*** for that task, you should grant ownership of the directory to the right user and also give everyone permission to read it's content.

You do this by simply running:

{{< highlight bash >}}

$ sudo chown -R user:user /var/www/example.com/

$ sudo chmod 755 /var/www/example.com/

{{< / highlight >}}


### 5. Create a simple html page to display.

***cd*** into your applications directory and create a new file with the name *index.html*.

{{< highlight bash >}}

$ cd /home/username/www/example.com

$ touch index.html

$ vi index.html

{{< / highlight >}}

Now, add the content to be displayed in the index file. This will help us to notice if everything is working or not at the end of the tutorial.

{{< highlight html >}}

<!DOCTYPE html>
<html>
  <head>
    <title>Server Block</title>
  </head>
  <body>
    <h1>Profit!</h1>
  </body>
</html>

{{< / highlight >}}


### 6. Create a new Server Block.

In a short explanation of how *server block* works, we can say; It's a file that contains a variable called *server_name* that is used by *nginx* to figure out which application is being accessed on the server.

We need to have one *server block* for each application running in our server. To create a new one we have to copy the *default* *server block* and then modify it.

{{< highlight bash >}}

$ sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/example.com

{{< / highlight >}}

Name the *server block* as your domain or subdomain.


### 7. Set up and link the Server Block.

After we've created the *Server Block* we need to adapt it to meet our requirements, by doing:

{{< highlight bash >}}

$ sudo vi /etc/nginx/sites-available/example.com

{{< / highlight >}}

And changing it's ***server_name***, *root* folder and the previously created *index* file.

{{< highlight bash >}}

server {
        listen   80; ## listen for ipv4; this line is default and implied
        #listen   [::]:80 default ipv6only=on; ## listen for ipv6

        root /home/username/www/example.com;
        index index.html;

        # Make site accessible from http://localhost/
        server_name example.com;
}

{{< / highlight >}}

The last step is to link the newly created *Server Block* into the *sites-enable* folder with a symlink, to get it working.

{{< highlight bash >}}

$ sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/example.com

{{< / highlight >}}


### 8. Restart nginx.

Restart nginx before accessing the web browser by doing:

{{< highlight bash >}}

$ sudo service nginx restart

{{< / highlight >}}

At last open the browser and write down the domain in the search bar, you should be seeing the *index.html* file we created early.

### 9. Profit!

Now you will be able to run multiple applications in the same server. If you want another application running just repeat all the steps above.
