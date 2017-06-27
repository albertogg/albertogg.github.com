---
categories:
- blog
date: 2015-02-17T00:00:00Z
description: Creating a reproducible and Docker provisioned Ubuntu 14.04 image with
  Packer on DigitalOcean
tag: blog
title: Creating DigitalOcean images with Packer
slug: /creating-digitalocean-images-with-packer/
---

> **tl;dr** create a simple DigitalOcean Ubuntu 14.04 image that uses shell a
provisioner to install Docker.

This post will guide you through the steps needed to create a simple
DigitalOcean Ubuntu 14.04 image with the latest Docker and Kernel installed.
This is in a way like creating our own [DigitalOcean Docker
application][do-docker-app] image.  We'll use a shell script as provisioner for
this Packer template.

> **notes:** we assume that Packer is already installed on the system, refer to
the installation docs [here][packer-install]. You could use CentOS or any other
distro available at DigitalOcean in the same way. The script will need some
package manager adaptation and that's all.

## Packer template

This template will create a new droplet on DigitalOcean, run the provision
script, create a snapshot from the final state and destroy the droplet.

Create a packer template for our installation called
`docker-install-template.json` and drop this JSON in it.

    {
      "variables": {
        "do_api_token": "{{env `DIGITALOCEAN_API_TOKEN`}}"
      },

      "builders": [{
        "type": "digitalocean",
        "api_token": "{{user `do_api_token`}}",
        "size": "512mb",
        "region": "nyc3",
        "image": "ubuntu-14-04-x64",
        "droplet_name": "packer",
        "snapshot_name": "build-with-packer-{{timestamp}}"
      }],

      "provisioners": [{
        "type": "shell",
        "script": "install-script.sh"
      }]
    }

Let me explain what this does. We are setting a variable named `do_api_token`
that reads from the OS environment a variable named `DIGITALOCEAN_API_TOKEN`.
Then creating a builder that for our case will obviously be DigitalOcean,
setting the builder token from our custom variable and setting what type of
droplet we'll use to create this snapshot. You can read more about this builder
in the [packer digitalocean][packer-do] docs.

After the builder we have provisioners. Packer has the ability to use various
types of provisioners, like for example, shell scripts, Ansible, Chef, Puppet,
etc... For our case we will only use the "Shell" provisioner; it will install
dependencies. You can read more about this provisioner [here][packer-shell].

Notice that builders and provisioners are arrays. We can have multiple types of
provisioners and multiple builders so the same image can be generated on various
platforms.

Once our template is ready, we should validate it to see if there are no parsing
errors.

    packer validate docker-install-template.json

**notes:** this will not guarantee that we've done a fine job with the shell
script. If the required variables are not set up in our system this validation
will output an error message.

## Script

For our script we'll do some very simple things. As we intent to install Docker
and have an up to date snapshot we should update installed packages, install the
latest possible kernel and install the latest version of Docker.

Create a file with `install-script.sh` name and copy the following:

    #!/usr/bin/env sh

    # sleep timer for packer
    sleep 30

    # add additional repos
    add-apt-repository "deb http://archive.ubuntu.com/ubuntu $(lsb_release -sc) main universe"
    add-apt-repository "deb http://archive.ubuntu.com/ubuntu $(lsb_release -sc)-updates main universe"

    # update, install curl and linux kernel 3.16
    apt-get update --fix-missing
    apt-get upgrade -y
    apt-get install -y curl linux-headers-3.16.0-29 linux-headers-3.16.0-29-generic \
                       linux-image-3.16.0-29-generic linux-image-extra-3.16.0-29-generic

    # install docker
    curl -sSL https://get.docker.com/ubuntu/ | sudo sh

    # print docker version
    docker version

The sleep is to wait until the machine completely boots. Then we update the
kernel to the latest, install docker and print the docker version.

Let's try our script and template by creating the snapshot.

## Creating the snapshot

Before creating our snapshot make sure to have the DigitalOcean token created.
Remember that this token is only visible once. Export this token as
`DIGITALOCEAN_API_TOKEN` and prepare to have your snapshot ready in a few
minutes.

    export DIGITALOCEAN_API_TOKEN="your_api_token"

Once the environment variable is set up we should be able to run the following
command and wait till it's done.

    packer build docker-install-template.json

I'm not going to put the hole output, this is the final chunk...

        ...
        digitalocean: Client version: 1.5.0
        digitalocean: Client API version: 1.17
        digitalocean: Go version (client): go1.4.1
        digitalocean: Git commit (client): a8a31ef
        digitalocean: OS/Arch (client): linux/amd64
        digitalocean: Server version: 1.5.0
        digitalocean: Server API version: 1.17
        digitalocean: Go version (server): go1.4.1
        digitalocean: Git commit (server): a8a31ef
    ==> digitalocean: Gracefully shutting down droplet...
    ==> digitalocean: Creating snapshot: build-with-packer-1424129310
    ==> digitalocean: Waiting for snapshot to complete...
    ==> digitalocean: Destroying droplet...
    ==> digitalocean: Deleting temporary ssh key...
    Build 'digitalocean' finished.

    ==> Builds finished. The artifacts of successful builds are:
    --> digitalocean: A snapshot was created: 'build-with-packer-1424129310' in region 'New York 3'

This final chunk shows the output from the `docker version` command and the name
of the snapshot with the format we gave it `build-with-packer-{{timestamp}}`

Now go to your DigitalOcean admin panel and create a new droplet using your
newly created snapshot, remember that for the kernel update to work you must
follow [these instructions][do-kernel].

---

From my point of view Packer is a Fantastic tool. Being able to create a
reproducible image from a template that will be ready to put into a new droplet
is a time saver and an assurance that everything will work as it's suppose to.

Remember to update your snapshots periodically for patches, etc...

Thanks for reading...

[packer-do]: https://packer.io/docs/builders/digitalocean.html
[packer-shell]: https://packer.io/docs/provisioners/shell.html
[packer-install]: https://packer.io/docs/installation.html
[do-kernel]: https://www.digitalocean.com/community/questions/how-i-update-my-kernel
[do-docker-app]: https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-docker-application
