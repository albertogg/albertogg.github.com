---
date: 2021-08-27T16:58:50-04:00
title: "UniFi Network Controller Install in a Raspberry Pi"
slug: "/unifi-network-controller-install-in-a-raspberry-pi/"
description: |-
  Installing and configuring the UniFi Network Controller in a Raspberry Pi
  running Raspberry Pi OS. Optional nginx configuration using certificates
  generated with mkcert.
categories:
  - Development
  - DevOps
tags:
  - tag
toc: true
draft: true
---

This are some simple and direct instructions on how to install the UniFi Network
Controller on a Raspberry Pi. I've only tested this in Raspberry Pi OS.

Instructions start after a fresh installation of the OS. For installation
instructions [see the official website][raspberry-pi-os]. We also require
[remote access][remote-access] to the Raspberry Pi.

## Rename hostname

We want to ensure the Raspberry Pi has the correct Hostname. In my case I have
dnsmasq in my network and I reach hosts by using their hostnames. You can check
the following post on [domain names for home networks][homenet-domain-name].

    sudo hostnamectl set-hostname unifi-network

## Install OpenJDK version 8

We will need OpenJDK version 8 for now. It seems that version 11 also works but
I haven't tested it.

    sudo apt install openjdk-8-jre

## Install UniFi Network Controller

Add the [Debian repository for the UniFi Network
Controller][install-unifi-via-apt]. It should work in both Debian or Ubuntu.

    sudo apt update && sudo apt install ca-certificates apt-transport-https

    echo 'deb https://www.ui.com/downloads/unifi/debian stable ubiquiti' | sudo tee /etc/apt/sources.list.d/100-ubnt-unifi.list

Install the package. At this point the `unifi` package will install all of its
dependencies and everything will be ready to use.

    sudo apt install unifi -y

### Start UniFi Network (Controller)

Now that everything is ready we just need to start the service.

    sudo service unifi start

In the browser open `<raspberry-pi-IP-address>:8443` and you'll see the UniFi
Network Controller.

## Additional steps

These are some additional steps only if you'd like to serve the UniFi Network
Controller from nginx. For this we will need a couple of things:

- An SSL certificate.
- nginx and its configuration.

### Install mkcert

For the certificate we will use mkcert. [mkcert][mkcert] is a simple zero-config
tool to make locally trusted development certificates with any names you'd like.

I'm not going to go over how to use this but this is a great tool to use for
this.

### Install nginx

Now we need nginx or any other reverse reverse proxy server.

    sudo apt install nginx

### Set the nginx config

Now on to the configuration piece. For this one we would like to have some
things. We want custom redirects from HTTP to HTTPS. We will also need to send
some proxy headers and our custom certs.

You can copy the cert from your local computer into the Raspberry Pi using SCP.

    scp ~/mycert* pi@<raspberry-pi-ip>:/home/pi/

Now for the configuration piece. Create the following code in
`/etc/nginx/sites-avaliable/unifi`


    server {
      listen 80;
      server_name _;

      return 301 https://$server_name$request_uri;
    }

    server {
      # SSL configuration
      listen 443 ssl;

      server_name _;

      ssl on;
      ssl_protocols TLSv1.2 TLSv1.3;
      ssl_certificate /home/pi/mycert.pem;
      ssl_certificate_key /home/pi/mycert-key.pem;

      location / {
        proxy_pass https://localhost:8443;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_buffering off;
      }
    }

Once you have it. Now link it into the enabled sites.

    sudo ln -s /etc/nginx/sites-available/unifi /etc/nginx/sites-enabled/unifi

Restart nginx.

    sudo systemctl restart nginx

That's it.

[raspberry-pi-os]: https://www.raspberrypi.org/software/
[remote-access]: https://www.raspberrypi.org/documentation/computers/remote-access.html#remote-access
[homenet-domain-name]: https://www.ctrl.blog/entry/homenet-domain-name.html
[install-unifi-via-apt]: https://help.ui.com/hc/en-us/articles/220066768-UniFi-Network-How-to-Install-and-Update-via-APT-on-Debian-or-Ubuntu
[mkcert]: https://github.com/FiloSottile/mkcert
