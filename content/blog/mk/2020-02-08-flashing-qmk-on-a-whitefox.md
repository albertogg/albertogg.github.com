---
date: 2020-02-05T23:08:54-04:00
title: "Flashing QMK on a WhiteFox Mechanical Keyboard"
slug: "/flashing-qmk-on-a-whitefox/"
description: |-
  My experience using, flashing, and contributing the Vanilla layout for the
  WhiteFox Mechanical Keyboard to QMK.
categories:
  - MK
tags:
  - git
  - docker
  - qmk
  - whitefox
  - tmk
---

Awhile back I had this itch of wanting to try a different firmware for my then
recent mechanical keyboard. By that time I was also completely new to the
mechanical keyboard world. To get some new layout for the keyboard I had to jump
into a website, select my keyboard layout and start putting things together, it
was very straight forward. Some time after I started wondering if I could put a
different firmware on the keyboard. I found [TMK][tmk] and the fork with wider
adoption [QMK][qmk].

## Intro to QMK

The first time I compiled [QMK][qmk] for the [WhiteFox][whitefox] I remember
doing things that were not documented and had to do some research here and
there, this was around late 2017... Fast forward to just a few weeks ago that I
came back to upgrade the firmware and to my surprise I've found myself in a way
more mature ecosystem, good docs and some build tools like [Docker][docker] and
the [QMK Toolbox][qmk-toolbox] if you don't want to do the native install.

## Using and Flashing the QMK firmware

I decided to go the easy way and use [Docker][docker] for compiling the
firmware. For this we need [Docker][docker] installed, [Git][git] and a local
clone of the [qmk_firware][qmk-firmware], also the [QMK Toolbox][qmk-toolbox] if
you are not in Linux.

Clone the project

    git clone --recurse-submodules https://github.com/qmk/qmk_firmware.git

We will use the following script for compiling the firmware as we are using
[Docker][docker]:

    util/docker_build.sh keyboard:keymap

If you look inside the [util/docker_build.sh][docker-build] you'll see that it
uses the [qmkfm/base_container][base-container]. Running the above command with
the `keyboard:keymap` of your preference this will output build data in a
`.build` directory and the compiled `.bin` in the root of the project.

Now it's time to open the [QMK Toolbox][qmk-toolbox] open the `.bin` file put
your keyboard in DFU mode this is done by pressing the button at the bottom of
the keyboard and then pressing the flash button in the QMK Toolbox GUI.

I use a [custom layout inside my fork][whitefox-albertogg], and use the
following command to build:

    util/docker_build.sh whitefox:albertogg

Once you know all these details you are mostly good to go.

## Contributing

For the [WhiteFox][whitefox] there was no Vanilla layout so I had to made my
own. Once I knew it was working I contributed back to the [QMK][qmk] project.
The process of adding a new layout was a bit confusing but not impossible to
solve. Here is the [Pull Request][whitefox-vanilla-pr] where one can see the
layout getting added.

## Closing words

All this process of using a custom firmware that has so many options is very
cool and useful. The community around the project is huge. I still haven't
messed around with mouse buttons, LED layouts, macros, and other features that I
want to test. Either way I think it's a fun project and I'm eager to keep
testing [QMK][qmk] features.

[qmk]: https://qmk.fm
[tmk]: https://github.com/tmk/tmk_keyboard
[git]: https://git-scm.com
[qmk-firmware]: https://github.com/qmk/qmk_firmware
[docker]: https://www.docker.com
[base-container]: https://hub.docker.com/r/qmkfm/base_container
[docker-build]: https://github.com/qmk/qmk_firmware/blob/master/util/docker_build.sh
[qmk-toolbox]: https://github.com/qmk/qmk_toolbox
[whitefox-albertogg]: https://github.com/albertogg/qmk_firmware/tree/albertogg-whitefox-keymap/keyboards/whitefox/keymaps/albertogg
[whitefox]: https://input.club/whitefox/
[whitefox-vanilla-pr]: https://github.com/qmk/qmk_firmware/pull/8043
