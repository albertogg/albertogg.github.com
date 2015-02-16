---
layout: post
title: Creating DigitalOcean images with Packer
description: Creating a reproducible and provisioned Ubuntu 14.04 image with Packer for DigitalOcean.
category: blog
tag: blog
---

tl;dr we are going to create a simple DigitalOcean Ubuntu 14.04 image that uses
shell and file provisioner's to install a web server.

## Packer template

This template will create a new droplet on digitalocean copy our files, run the
provision, create a snapshot from the final state and destroy the droplet.

create a packer template for our installation called `nginx-template.json` and
drop this script in it.

```json
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
    "type": "file",
    "source": "nginx",
    "destination": "/tmp"
  },
  {
    "type": "shell",
    "script": "ready_to_use.sh"
  }]
}
```

Let me explain what this does. We are setting a variable named `do_api_token`
that will be read from the OS environment as `DIGITALOCEAN_API_TOKEN`. Then
creating a builder that for our case will be obviously DigitalOcean, setting the
token from the variables and setting what type of droplet we'll use to create
this snapshot. You can read more about this builder in the [packer
digitalocean][packer-do] docs.

After the builder we use the "fun" stuff, provisioners. Packer has the ability
to use various types of provisioners, like for example, shell scripts, Ansible,
Chef, Puppet, etc... For our case we will use two provisioners, "File" and
"Shell"; with the first we only tell packer to copy a file from our system to
the DO droplet, with the second we install dependencies and move our copied file
to the correct place. You can read more about this provisioners
[here][packer-file] and [here][packer-shell].

Once our template is done, like it is, we should validate it to see if there are
no parsing errors. **note:** this will not guarantee that you did a fine job
with your shell scripts.

```bash
packer validate nginx-template.json
```

## Scripts

For our scripts we will use some very simple things. As we intent to install
nginx and simply serve the "Hello, World!" static page we'll need to install
nginx from either Ubuntu or the Nginx PPA, then as an example copy over the
default `nginx.conf` and the `default` server block. The Nginx configuration and
the server block will be located inside a `nginx` dir that will get copied
to the droplet `/tmp`.

## Creating the snapshot

Before creating our snapshot make sure to have the DigitalOcean token created.
Remember that this token is only visible once. Export this token as
`DIGITALOCEAN_API_TOKEN` and prepare to have your snapshot ready in a few
minutes.

```bash
export DIGITALOCEAN_API_TOKEN="your_api_token"
packer build codehero-template.json
```

I'm not going to put the output of it but it sure will be what we wanted to be.
Now go to your DigitalOcean admin panel and create a new droplet using your
newly created snapshot and that's it!

From my point of view Packer is a Fantastic tool, it really is. Having the
ability of a "base" image ready to pull into a new droplet is a time saver and
an assurance that everything is exactly the same as the rest.

Remember to update your snapshots periodically for patches, etc...

Thanks for reading...


[packer-do]: https://packer.io/docs/builders/digitalocean.html
[packer-shell]: https://packer.io/docs/provisioners/shell.html
[packer-file]: https://packer.io/docs/provisioners/file.html

run
