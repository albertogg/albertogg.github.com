---
date: 2021-01-11T00:35:47-04:00
title: "Klipper on an Ender 3"
slug: "/klipper-on-an-ender-3/"
description: |-
  The complete process of getting Klipper up and running on an Ender 3. From
  installation (Fluidd) to configuration, tuning, etc... All you need to know.
categories:
  - 3D Printing
tags:
  - Klipper
  - Calibration
  - Filament
  - Bed Leveling
  - Macros
toc: true
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
download [FluiddPI][fluiddpi], a Raspbian based distro for Fluidd that comes
with Klipper and everything you need pre-installed.

The [following instructions][installing-rpios] will guide you through the
process of putting the OS in the Raspberry PI.

Now on the Raspberry PI we need to build the software for the micro-controller.
For this follow the steps in [Building and flashing the
micro-controller][build-flash-micro-controller]. **In my case Flashing via USB
did not worked and I had to manually** by `scp` the `.bin` build file out of the
Raspberry PI into my computer for then to pasted it into the SD Card and rename
it to `flash.bin` that the micro-controller recognize it and flash it.

For the final installation step we need to create the `printer.cfg` file. This
file will contain details details on the printer such as pins, stepper motor
directions, drivers, probe, etc... We will talk about this in the [Configuration
File section](#configuration-file)

## Installation Alternatives

[FluiddPI][fluiddpi] is not the only way to install Klipper. In fact there are
other more popular ones. Like [MainsailOS][mainsailos], [KIAUH][kiauh], and
there's always the manual approach. I haven't experimented with any of these but
MainsailOS seems to be very similar to what we did with Fluidd. KIAUH seems to
be a script that will allow for custom and different setups.

## Configuration File

My configuration file aka `printer.cfg` is based on a **SKR 1.4 Turbo**
micro-controller with **TMC 2209 drivers with sensorless homing**, an original
**BL-Touch v3** and a **BMG extruder clone**.

I'm not going to get into my configuration details in here, but you can look at
them in [my GitHub repo][albertogg-klipper-config]. If your setup is different
than mine look into [Klipper's config examples][klipper-config] for more
guidance.

There are a couple of things that I should mention.
- [Fluidd does require a couple of things to be added to that configuration
  file][fluidd-config-req]
- Using `!` in front of a pin number will flip/reverse the functionality of said
  pin
- Use `rotation_distance` instead of `step_distance` as the latter is deprecated
  and will be removed
- Verify that the endstops are not in `TRIGGERED` state if they are not being
  triggered. Use `QUERY_ENDSTOPS` for this. You can read more about this in the
  [verify endstops section][klipper-config-check]
- Use the `STEPPER_BUZZ` command to verify the direction of your motors. For
  example: `STEPPER_BUZZ STEPPER=stepper_x`. You can read more about this in the
  [verify stepper motors section][klipper-config-check]

### Marlin for port mappings

While I was working on the mappings for my setup and wasn't sure about something
I used Marlin as the source of truth. This because I had a working configuration
there.

For example for the SKR 1.4 I used this [Marlin PIN mappings][marlin-pins] to
look for probe pins and ensuring others were correct.

## Proper Coordinates and Homing

At first I thought that by setting up `position_max: 235` on X and Y was more
than enough but in reality it was different.

Things I had to account for and measure to get proper homing:
- As I have a probe I added `[safe_z_home]`. This is typically done near the
  center of the bed so that the probe has a safe surface to land. What I did
  here was to ensure that the nozzle landed in the correct coordinates I set.
  The bed is `235` by `235` I used `117.5` and `117.5` and ensured nozzle was in
  the middle (it didn't at first, I explain why later in this section)
- Move the nozzle to each corner, meaning: `0,0`, `0,235`, `235,235`, and
  `235,0` and see where the nozzle lands
    - In my case this didn't worked for X correctly and I had to tweak the
      `homing_retract_dist` and set it to `0` for it to gather 0 right where the
      end stop is. After that X started working as expected
- I had to flip the `dir_pin` so that the `position_endstop` reflected the
  correct end stop position (`0`)

After these changes homing was working as expected.

## Calibrating Probe

In my case as I've mentioned before I have a BL-Touch. This type of probe even
though it's very popular it might be more delicate ~~problematic~~ than others.

There are a couple of things we need to do with the probe to make it work as
intended:

- Test that the it works. Read the following [BL-Touch
  section][klipper-bltouch-section]
- Calibrate the probe X, Y, and Z offsets. Read the following on [probe
  calibration][klipper-probe-calibration]
  - I recommend to Home the printer before attempting anything
- You need to set `position_min` to be able to complete the calibration in your
  Z axis to a negative number something like `-5` will work

## PID Tuning

Before you start **ensure that your bed and or hotend** is at room temperature.

This is the command to calibrate the hotend/extruder:

    PID_CALIBRATE HEATER=extruder TARGET=200

This is the command to calibrate the heated bed:

    PID_CALIBRATE HEATER=heater_bed TARGET=60

Once any of the above command run `SAVE_CONFIG` for it to save the values to the
`printer.cfg` file.

## Bed leveling

There are multiple ways to do bed leveling. As I have a probe I used the
following two methods. **Screw tilt Adjust** and then **Mesh Bed Leveling**.
Keep in mind that the former will throw the latter off-board so my
recommendation is to do it in such order.

### Screw Tilt Adjust

For this we need to do 4 things:
1. Measure the screw diameter (Mine is M4)
1. Know your probe offsets for X and Y
1. Measure where are the screws located in the bed (both X and Y references)
1. Once you know your screws location add your probe offsets
1. Home `G28` and then run `SCREWS_TILT_CALCULATE` and repeat the tilt calculate
   procedure until flat

For example based on the above my configuration ended like this:

    [screws_tilt_adjust]
    screw1: 74,47
    screw1_name: front left screw
    screw2: 245, 47
    screw2_name: front right screw
    screw3: 245, 217
    screw3_name: rear right screw
    screw4: 74,217
    screw4_name: rear left screw
    screw_thread: CW-M4

> **Note:** `screw2` and `screw3` X coordinate is `245` after adding (sum) the X
position with X probe offset; this forced me to change `position_max` to `245`
to be able to reach that coordinate.

Interpreting the output is simple. `CW 00:15` Turn clockwise 1/4 of a turn. `CCW
00:45` counter clockwise 3/4 of a turn.

For more information check [adjusting bed leveling screws using the bed
probe][klipper-config-screws-tilt].

### Mesh Bed Leveling

Mesh bed leveling is simpler than the Screw Tilt Adjust. The most important
thing is knowing what are the mesh limits and the amount of probe points you'll
want. For example:

    [bed_mesh]
    speed: 80
    horizontal_move_z: 5
    mesh_min: 18,18
    mesh_max: 175,202
    probe_count: 5,5
    algorithm: bicubic

After this run `BED_MESH_CALIBRATE` and wait for the results, then `SAVE_CONFIG`
to keep those numbers in the configuration file.

For more information check [bed mesh configuration][klipper-config-bed-mesh].

## Calibrating Rotation Distance

For X, Y, and Z I ["Obtained rotation_distance by inspecting the
hardware"][klipper-config-rotation-distance] as this is the simplest way to do
so. For E I went with the usual way [e-steps calibration][e-steps-calibration],
but I recommend following [this
guide][klipper-config-rotation-distance-extruders].

As I have a BMG extruder clone with a 3:1 gear ration I added this value to the
configuration and ended with the following:

    [extruder]
    step_pin: P2.13
    dir_pin: !P0.11
    enable_pin: !P2.12
    rotation_distance: 22.95 # Calculated distance
    microsteps: 16
    gear_ratio: 3:1 # BMG gear ratio
    ...

For more information check [extruder configuration][klipper-config-extruder].

## Pressure Advance

Pressure Advance in Klipper is the same as Marlin's Linear Advance but the
tuning part is different, and it seems to work better in Klipper (maybe it's the
way of tuning it).

> **Note:** the calculated pressure advance value is dependent on the extruder,
the nozzle, and the filament spool.

Steps for doing so can be found here, but in short:
- Download the [square tower STL][klipper-square-tower] file
- Slice the STL using:
    - Speed of 100mm/s of higher in internal and external perimeters
    - ZERO infill
    - ZERO to very low retraction (even if bowden tube)
    - 0.28mm layer height (or higher).
- Run `SET_VELOCITY_LIMIT SQUARE_CORNER_VELOCITY=1 ACCEL=500`
- And `TUNING_TOWER COMMAND=SET_PRESSURE_ADVANCE PARAMETER=ADVANCE START=0
  FACTOR=.020`
- Start printing

Once the print is done, we proceed to the next step, measuring and doing the
math to get our Pressure Advance value. Follow the official [tuning pressure
advance guide][klipper-pressure-advance] for how to measure and calculate the
value.

I'll explain how to set the Pressure Advance value within the slicer in a per
filament basis in the [Slicers section](#slicers).

## Macros

Macros are what you'll think they are; a set of commands that are called from a
single invocation.

These are the macros I currently have:

- `G29` Load the default bed mesh profile
- `PAUSE` Pause the print (macro suggested by Fluidd)
- `RESUME` Resume the print (macro suggested by Fluidd)
- `CANCEL_PRINT` Cancel the print (macro suggested by Fluidd)
- `PRIME_EXTRUDER` Macro created to prime the extruder on start print
- `START_PRINT` Set of instructions required at the start of every print
  (accepts parameters)
- `END_PRINT` Set of instructions required at the end of every print
- `LOAD_FILAMENT` Macro for loading filament on the BMG extruder clone
- `UNLOAD_FILAMENT` Required unloading filament on the BMG extruder clone based
  on the official [BMG scripts][bmg-scripts]

Check the macros in my [printer.cfg file][albertogg-klipper-macros].

## Slicers

There are some [Slicer requirements][klipper-slicer-reqs] from Klipper. Most of
the things are related to slicer features you should not use to avoid issues.
Other than those I'm going to use this section to explain how to use Macros in
you slicer.

For [PrusaSlicer][prusaslicer] for example:

Adding the `START_PRINT` macro and passing whatever first layer temp to it:

    START_PRINT BED_TEMP="M140 S[first_layer_bed_temperature]" EXTRUDER_TEMP="M104 S[first_layer_temperature]" ;

Adding the `END_PRINT` macro:

    END_PRINT ;

Add the Pressure Advance command to a filament:

    SET_PRESSURE_ADVANCE ADVANCE=0.544 ;

That's how a macro is used from within the slicer.

[klipper]: https://www.klipper3d.org
[fluidd]: https://github.com/cadriel/fluidd
[fluiddpi]: https://github.com/cadriel/FluiddPI
[mainsailos]: https://github.com/raymondh2/MainsailOS
[kiauh]: https://github.com/th33xitus/KIAUH
[installing-rpios]: https://www.raspberrypi.org/documentation/installation/installing-images/
[build-flash-micro-controller]: https://www.klipper3d.org/Installation.html
[albertogg-klipper-config]: https://github.com/albertogg/klipper-config
[albertogg-klipper-macros]: https://github.com/albertogg/klipper-config/blob/97b36987ebfe697a084584e684897f2f1b13dea1/ender-3/printer.cfg#L194
[klipper-config]: https://github.com/KevinOConnor/klipper/tree/master/config
[klipper-bltouch-section]: https://www.klipper3d.org/BLTouch.html
[klipper-probe-calibration]: https://www.klipper3d.org/Probe_Calibrate.html
[klipper-pressure-advance]: https://www.klipper3d.org/Pressure_Advance.html
[klipper-slicer-reqs]: https://www.klipper3d.org/Slicers.html
[klipper-config-check]: https://www.klipper3d.org/Config_checks.html
[klipper-config-bed-mesh]: https://www.klipper3d.org/Config_Reference.html#bed_mesh
[klipper-config-screws-tilt]: https://www.klipper3d.org/Manual_Level.html
[klipper-config-extruder]: https://www.klipper3d.org/Config_Reference.html#extruder
[klipper-config-rotation-distance]: https://www.klipper3d.org/Rotation_Distance.html
[klipper-config-rotation-distance-extruders]: https://www.klipper3d.org/Rotation_Distance.html#calibrating-rotation_distance-on-extruders
[klipper-square-tower]: https://www.klipper3d.org/prints/square_tower.stl
[fluidd-config-req]: https://github.com/cadriel/fluidd/blob/develop/docs/printer-setup-and-macros.md#printer-setup--macros
[marlin-pins]: https://github.com/MarlinFirmware/Marlin/blob/2.0.x/Marlin/src/pins/lpc1768/pins_BTT_SKR_V1_4.h
[e-steps-calibration]: https://albertogrespan.com/blog/3d-printing/lessons-from-3d-printing/#extruder-steps-e-steps
[bmg-scripts]: https://www.bondtech.se/en/2018/05/03/load-unload-script/
[prusaslicer]: https://github.com/prusa3d/PrusaSlicer
