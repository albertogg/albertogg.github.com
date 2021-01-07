---
date: 2021-01-02T23:48:47-04:00
title: "Klipper on an Ender 3"
slug: "/klipper-on-an-ender-3/"
description: |-
  The complete process of getting Klipper up and running on an Ender 3. From
  installation to configuration, tuning, etc... All you need to know.
categories:
  - Development
  - DevOps
tags:
  - tag
toc: true
draft: true
---

This post will take you through the process of getting [Klipper][klipper] up and
running from my experience of doing so on an Ender 3 Pro with some mods. I'm
going to try to keep this post as up to date as possible while I learn/use new
things.

## Whats Klipper?

_[Klipper][klipper] is a 3d-Printer firmware. It combines the power of a general
purpose computer with one or more micro-controllers._ &mdash; Klipper Website

This means that Klipper will use the Raspberry PI CPU to calculate printer
movements and then compress and transmit them to the micro-controller board for
execution.

## Installation Through Fluidd

What's [Fluidd][fluidd]? _"Fluidd is a free and Open Source [Klipper][klipper] Web
interface for managing your 3d Printer."_ &mdash; Fluidd GitHub

Installing Klipper through Fluidd is an easy task. To install it you'll need to
download [FluiddPI][fluiddpi] a Raspbian based distro for Fluidd that comes with
Klipper and everything you need pre-installed.

The [following instructions][installing-rpios] will guide you through the process of putting the OS
in the Raspberry PI.

Now on the Raspberry PI we need to build the software for the micro-controller.
For this follow the steps in [Building and flashing the
micro-controller][build-flash-micro-controller]. **In my case Flashing via USB
did not worked and I had to manually** by `scp` the `.bin` build file out of the
Raspberry PI into my computer for then to pasted it into the SD Card and rename
it to `flash.bin` that the micro-controller will use. After this I had the
process almost done.

For the final installation step we need to create the `printer.cfg` file. This
file will contain details details on the printer such as pins, drivers, probe,
etc... We will talk about this in the [Configuration File
section](#configuration-file)

## Installation Alternatives

[FluiddPI][fluiddpi] is not the only way to install Klipper. In fact there are
other more popular ones. Like [MainsailOS][mainsailos], [KIAUH][kiauh], and
there's always the manual approach. I haven't experimented with any of these but
MainsailOS seems to be very similar to what we did with Fluidd. KIAUH seems to
be a script that will allow for custom and different setups.

## Configuration File

My configuration file aka `printer.cfg` is based on a **SKR 1.4 Turbo**
micro-controller with **TMC 2209 drivers with sensorless homing**, an original
**BLTouch v3** and a **BMG extruder clone**.

I'm not going to get into my configuration details in here, but you can look at
them in [my GitHub repo][albertogg-klipper-config]. If your setup is different than
mine look into [Klipper's config examples][klipper-config] for more guidance.

There are a couple of things that I should mention.
- [Fluidd does require a couple of things to be added to that configuration
  file][fluidd-config-req]
- Using `!` in front of a pin number will flip/reverse the functionality of said
  pin
- Use `rotation_distance` instead of `step_distance` as the latter is deprecated
  and will be removed

### Marlin for port mappings

While I was working on the mappings for my setup and wasn't sure about something
I used Marlin as the source of truth. This because I had a working configuration
there.

For example for the SKR 1.4 I used this [Marlin PIN mappings][marlin-pins] to
look for probe pins and ensuring others were correct.

## Homing

Homing and checking that the 4 corners of the bed are correctly mapped is an
easy but requires testing. At first I thought that by setting up `position_max:
235` on X and Y I was good to go, but in reality that's not the case.

Things I had to account for and measure:
- As I have a probe I added `[safe_z_home]`. This is typically done near the
  center of the bed so that the probe has a safe surface to land. What I did
  here was look that the nozzle landed in the correct coordinates I set
- Move the nozzle to `0,0`, `0,235`, `235,235`, and `235,0`. See of the nozzle
  landed where expected and continue.
    - In my case this didn't worked for X correctly. What I had to tweak for it
      to work was the `homing_retract_dist` and set it to `0` for it to gather 0
      right where the end stop is. After that X started working normally.
- I had to flip the `dir_pin` so that the `position_endstop` reflected the
  correct end stop position (`0`)

After these changes homing was working as it should.

## Calibrating Probe Offsets

X,Y, and Z offsets

## PID Tuning

Extruder and Bed

## Bed leveling

### Screw Tilt Adjust

### Mesh Bed Leveling

## Calibrating Extruder Rotation

## Pressure Advance

Tuning tower

## Macros

[klipper]: https://www.klipper3d.org
[fluidd]: https://github.com/cadriel/fluidd
[fluiddpi]: https://github.com/cadriel/FluiddPI
[mainsailos]: https://github.com/raymondh2/MainsailOS
[kiauh]: https://github.com/th33xitus/KIAUH
[installing-rpios]: https://www.raspberrypi.org/documentation/installation/installing-images/
[build-flash-micro-controller]: https://www.klipper3d.org/Installation.html
[albertogg-klipper-config]: https://github.com/albertogg/klipper-config
[klipper-config]: https://github.com/KevinOConnor/klipper/tree/master/config
[fluidd-config-req]: https://github.com/cadriel/fluidd/blob/develop/docs/printer-setup-and-macros.md#printer-setup--macros
[marlin-pins]: https://github.com/MarlinFirmware/Marlin/blob/2.0.x/Marlin/src/pins/lpc1768/pins_BTT_SKR_V1_4.h
