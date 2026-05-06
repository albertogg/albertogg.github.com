---
date: 2021-08-31T22:52:50-04:00
title: "Instalar UniFi Network Controller en una Raspberry Pi"
slug: "/instalar-unifi-network-controller-en-una-raspberry-pi/"
description: |-
  Configuración de UniFi Network Controller en una Raspberry Pi con Raspberry Pi
  OS. Configuración opcional de nginx usando certificados generados con mkcert.
translationKey: unifi-network-controller-raspberrypi
categories:
  - Raspberry Pi
tags:
  - UniFi
  - OpenJDK
  - nginx
  - mkcert
toc: true
---

Instrucciones simples y directas para instalar UniFi Network Controller en una
Raspberry Pi. Solo lo he probado en Raspberry Pi OS, pero también debería
funcionar en Ubuntu.

No voy a mostrar cómo instalar Raspberry Pi OS. Asumo que para este punto ya
tienes una instalación nueva del sistema operativo. Consulta el sitio oficial
para ver las [instrucciones de instalación][raspberry-pi-os] y cómo configurar
el [acceso remoto][remote-access] a la Raspberry Pi.

## Cambiar el hostname

Queremos asegurarnos de que la Raspberry Pi tenga el hostname correcto. En mi
caso tengo dnsmasq en mi red y accedo a los hosts por sus hostnames. Puedes leer
este post sobre [nombres de dominio para redes caseras][homenet-domain-name].

    sudo hostnamectl set-hostname unifi-controller

## Instalar OpenJDK versión 8

Por ahora necesitaremos OpenJDK versión 8. Parece que la versión 11 también
funciona, pero no la he probado.

    sudo apt install openjdk-8-jre

## Instalar UniFi Network Controller

Instala algunos requisitos adicionales de software.

    sudo apt update && sudo apt install ca-certificates apt-transport-https

Agrega el [repositorio Debian para UniFi Network
Controller][install-unifi-via-apt].

    echo 'deb https://www.ui.com/downloads/unifi/debian stable ubiquiti' | sudo tee /etc/apt/sources.list.d/100-ubnt-unifi.list

Instala el paquete.

    sudo apt install unifi -y

En este punto el paquete `unifi` instaló todas sus dependencias y está listo
para usarse.

### Iniciar UniFi Network Controller

Ahora que todo está listo, necesitamos iniciar el servicio.

    sudo service unifi start

Abre tu navegador y entra a `<dirección-IP-de-la-raspberry-pi>:8443`; verás
UniFi Network Controller.

## Pasos adicionales

Estos son pasos adicionales solo si quieres servir UniFi Network Controller
desde nginx. Los pasos adicionales incluyen:

- Un certificado SSL.
- nginx y su configuración.

**Nota:** los pasos adicionales solo funcionarán si tienes resolución DNS hacia
la dirección IP de la Raspberry Pi.

### Certificado con mkcert

Para el certificado usaremos mkcert. [mkcert][mkcert] es una herramienta simple
y sin configuración para crear certificados de desarrollo confiables localmente
con los nombres que quieras.

En este punto asumimos que tienes `dnsmasq` o resolución DNS local que te
permite resolver `unifi-controller.home.arpa` hacia la dirección IP de la
Raspberry Pi.

Genera el certificado.

    mkcert "unifi-controller.home.arpa"

Con ese certificado listo, seguimos con la instalación de nginx.

### Instalar nginx

Ahora necesitamos nginx. Cualquier servidor reverse proxy funcionará.

    sudo apt install nginx

### Configurar nginx

Para la configuración queremos tener redirects personalizados de HTTP a HTTPS,
algunos proxy headers y nuestros certificados personalizados.

Puedes copiar el certificado desde tu computadora local a la Raspberry Pi usando
SCP.

    scp ~/unifi-controller.home.arpa* pi@unifi-controller.home.arpa:/home/pi/

Ahora la parte de configuración. Crea el siguiente código en
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

Cuando lo tengas, enlázalo dentro de los sitios habilitados.

    sudo ln -s /etc/nginx/sites-available/unifi /etc/nginx/sites-enabled/unifi

Reinicia nginx.

    sudo systemctl restart nginx

Eso es todo. En este punto puedes abrir tu navegador y entrar a
`unifi-controller.local.arpa`; verás UniFi Network Controller.

[raspberry-pi-os]: https://www.raspberrypi.org/software/
[remote-access]: https://www.raspberrypi.org/documentation/computers/remote-access.html#remote-access
[homenet-domain-name]: https://www.ctrl.blog/entry/homenet-domain-name.html
[install-unifi-via-apt]: https://help.ui.com/hc/en-us/articles/220066768-UniFi-Network-How-to-Install-and-Update-via-APT-on-Debian-or-Ubuntu
[mkcert]: https://github.com/FiloSottile/mkcert
