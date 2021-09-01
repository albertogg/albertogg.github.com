---
date: 2021-08-31T22:52:50-04:00
title: "UniFi Network Controller Install in a Raspberry Pi"
slug: "/unifi-network-controller-install-in-a-raspberry-pi/"
description: |-
  Setting up the UniFi Network Controller in a Raspberry Pi running Raspberry Pi
  OS. Optional nginx configuration using certificates generated with mkcert.
categories:
  - Raspberry Pi
tags:
  - UniFi
  - OpenJDK
  - nginx
  - mkcert
toc: true
---

Simple and direct instructions on how to install the UniFi Network Controller in
a Raspberry Pi. I've only tested this in Raspberry Pi OS, but it should also
work in Ubuntu.

I'm not going to show how to install Raspberry Pi OS. I assume at this point you
have a fresh installation of the OS. See the official website for [installation
instructions][raspberry-pi-os], and [remote access][remote-access] to the
Raspberry Pi.

## Rename hostname

We want to ensure the Raspberry Pi has the correct Hostname. In my case I have
dnsmasq in my network and I reach hosts by their hostnames. You can check the
following post on [domain names for home networks][homenet-domain-name].

    sudo hostnamectl set-hostname unifi-controller

## Install OpenJDK version 8

We will need OpenJDK version 8 for now. It seems that version 11 also works but
I haven't tested it.

    sudo apt install openjdk-8-jre

## Install UniFi Network Controller

Install some additional software requirements

    sudo apt update && sudo apt install ca-certificates apt-transport-https

Add the [Debian repository for the UniFi Network
Controller][install-unifi-via-apt].

    echo 'deb https://www.ui.com/downloads/unifi/debian stable ubiquiti' | sudo tee /etc/apt/sources.list.d/100-ubnt-unifi.list

Install the package.

    sudo apt install unifi -y

 At this point the `unifi` package installed all of its dependencies and it's
 ready to use.

### Start UniFi Network Controller

Now that everything is ready we need start the service.

    sudo service unifi start

Open your browser and point to `<raspberry-pi-IP-address>:8443` and you'll see
the UniFi Network Controller.

## Additional steps

These are some additional steps only if you'd like to serve the UniFi Network
Controller from nginx. Additional steps include:

- An SSL certificate.
- nginx and its configuration.

**Note:** additional steps will only work if you have DNS resolution to the IP
address of the Raspberry Pi.

### mkcert certificate

For the certificate we will use mkcert. [mkcert][mkcert] is a simple zero-config
tool to make locally trusted development certificates with any names you'd like.

At this point we are assuming that you have `dnsmasq` or local DNS resolution
that will allow you resolve `unifi-controller.home.arpa` to the IP address of
the Raspberry Pi.

Generate the cert.

    mkcert "unifi-controller.home.arpa"

With that cert ready we will proceed with the nginx install.

### Install nginx

Now we need nginx. Any reverse proxy server will work.

    sudo apt install nginx

### Set the nginx config

On to the configuration we would like to have custom redirects from HTTP to
HTTPS, some proxy headers, and our custom certs.

You can copy the cert from your local computer into the Raspberry Pi using SCP.

    scp ~/unifi-controller.home.arpa* pi@unifi-controller.home.arpa:/home/pi/

Now for the configuration piece. Create the following code in
`/etc/nginx/sites-avaliable/unifi`


    server {
      listen 80;
      server_name unifi-controller.home.arpa;

      return 301 https://$server_name$request_uri;
    }

    server {
      # SSL configuration
      listen 443 ssl;

      server_name unifi-controller.home.arpa;

      ssl on;
      ssl_protocols TLSv1.2 TLSv1.3;
      ssl_certificate /home/pi/unifi-controller.home.arpa.pem;
      ssl_certificate_key /home/pi/unifi-controller.home.arpa-key.pem;

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

That's it. At this point you can open your browser and point to
`unifi-controller.local.arpa` and you'll see the UniFi Network Controller.

[raspberry-pi-os]: https://www.raspberrypi.org/software/
[remote-access]: https://www.raspberrypi.org/documentation/computers/remote-access.html#remote-access
[homenet-domain-name]: https://www.ctrl.blog/entry/homenet-domain-name.html
[install-unifi-via-apt]: https://help.ui.com/hc/en-us/articles/220066768-UniFi-Network-How-to-Install-and-Update-via-APT-on-Debian-or-Ubuntu
[mkcert]: https://github.com/FiloSottile/mkcert
