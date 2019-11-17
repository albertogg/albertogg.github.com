---
date: 2019-11-16T18:08:43-04:00
title: "Lessons From 3D Printing"
slug: /lessons-from-3d-printing/
description: |-
  Lessons learned while 3D Printing. From, E-steps calibration, filament, flow
  rate multiplier, PID, bed leveling, adhesion, assembly, etc...
categories:
  - 3D Printing
tags:
  - Calibration
  - Assembly
  - Adhesion
  - Nozzle
  - Filament
  - Bed Leveling
---

This post talks about my experiences with 3D printing while using and Ender 3
Pro, what I've learned, misses and recommendations. My intention with this post
will be to keep it up to date with my latest findings.

## Calibration

Calibration is important no matter what; to get good prints you'll have to
calibrate: Extruder steps (e-steps), flow rate multiplier, and PID.

### Extruder steps "e-steps"

Depending on your printer setup, if it's bowden or direct you'll calibrate your
e-steps differently. In any bowden setup it's recommended that you calibrate the
extruder through free air, this means that you'll need to detach the tube
closest the hotend, extrude and measure the distance of the filament, repeat the
process multiple times until satisfied. Doing the calibration this way will
ensure a proper calibration of the extruder motor in isolation. For direct
setups the process is going directly through the nozzle.

References:

- [MatterHackers Extruder Calibration][matterhackers-extruder-calibration]
- [Extruder Calibration][extruder-calibration]

### Flow rate multiplier

Once you have your e-steps calibrated you'll then fine tune things per filament
spool, type, and or brand. The recommendation for this is to print the
calibration cube in vase mode in one and two perimeters variants, then measure,
average, and calculate your results to change the flow rate multiplier. Remember
to **measure only the top layer**.

References:

- [Flow rate calibration guide][extruder-multiplier-calibration-guide]
- [Extrusion multiplier calibration][prusa-extruder-multiplier-calibration]
- [Calibrating Extruder Multiplier][extruder-calibration]

### PID

One additional calibration step per-filament and or brand that you'll end up
doing is printing the temperature tower. This will help you diagnose the
preferred temperature for that filament. Once you know that, calibrate the PID
to keep the temperature of your hotend as close to those numbers as possible.

References:

- [PID Tuning][pid-tuning]

## What not to calibrate

There is a misconception that to gain print accuracy you need to also calibrate
the X, Y, or Z motors, and the reality is that **YOU SHOULD NOT** calibrate them
as they already are calibrated based on your belts and lead screws.

## Bed leveling

Bed leveling as crucial as it is, is something we struggle quite a bit as
there's not a go to setting that will let you know if you are doing it right or
not, for most part we know that a good distance from the bed to the nozzle will
be 0.2mm (a sheet of paper thick) to 0.3mm, some materials prefer to be more
squished than others. Getting your bed perfectly leveled is a thing of practice
and patience. Things I could recommend is to try to use [mesh bed leveling in
Marlin][marlin-mesh-bed-level] and using a piece of paper as a reference spacer
to know how close are you between the bed and the nozzle.

References:

- [Mesh Bed Leveling][marlin-mesh-bed-level]
- [CHEP - Easy Way To Level Your Bed][chep-bed-leveling]

## Adhesion

Having good adhesion is tied to a bunch of things such as: bed leveling,
filament materials, bed and ambient temperatures, how clean is your bed, and
lastly bed surface material. PLA for example (theoretically) can be printed with
the bed at room temperature but we know that adhesion is better at higher
temperatures, and if your are having adhesion problems you should aim for a
hotter first layer but keep the rest of the print below the [glass transition
temperature][glass-transition-temperature], that's because once adhered you want
to avoid your first layer to get soft while applying the next layers to reduce
the elephant foot. In general start with a "cold" temperature and start raising
it as you need.

References:

- [Print not sticking to the bed][print-not-sticking]

## Filament

Read the spool information, don't follow the "default" settings on your slicer
of choice, read the specs of the filament you are printing and do some tests
such as the temperature tower to know where it work the best.

## Assembly

Assembling your new 3D printer can be daunting at first but current printers are
not that complicated to assemble; apart from the assembly instructions that come
with the printer it's also recommended to do some searches on the subject as
well as seeing some videos on YouTube. Some of the most basic tips I can give
are:

- Make the frame (if any) square. Measure distances before tightening all screws
  and ensure things are not flexed
- Be wary about over-tightening the screws. Most of the frames are made of
  aluminum and the bolts are steel, if you over-tight the bolt you could mill
  the frame
- Belt tension. Ensure that your belts are enough tensioned, if too loose your
  circles could not be round, leaning prints, misaligned layers, etc...
- Check all of the wheels, and adjust all of the eccentric nuts as they are
  responsible of a fit movement of the carriages

References:

- [Creality Ender 3 assembly and pro build tips][assembly-build-tips]

## Nozzle

There are not many things I can write about the nozzle that are not obvious. In
general you'll want to:

- Keep your nozzle clean
- Avoid crashes between the nozzle and the bed as it can damage the nozzle and
  scratch the bed
- If you see filament coming out the nozzle and curling pretty heavily into the
  nozzle it might be a sign of wear or damage and will need a replacement

## Final notes

While doing all of the calibration you'll start to know your printer, one super
important thing than can not be overlooked is to **TAKE NOTES**, I recommend
using a Spreadsheet. Write down the amount of filament used per spool, once you
start doing big prints that'll help you know if you'll have enough filament to
finish. Write down the configuration of your printer for any given spool, and or
any detail you might think you'll need in the long run to compare. The more data
you store the less time you'll need in the future to retune things. Do lots of
testing and annotate prints while you go. Print lots of upgrades for your
printer and enjoy things.

Thanks for reading.

[matterhackers-extruder-calibration]: https://www.matterhackers.com/articles/how-to-calibrate-your-extruder
[extruder-calibration]: https://mattshub.com/2017/04/19/extruder-calibration/
[extruder-multiplier-calibration-guide]: https://e3d-online.dozuki.com/Guide/Flow+rate+(Extrusion+multiplier)+calibration+guide./89
[prusa-extruder-multiplier-calibration]: https://help.prusa3d.com/article/d9j1xdg7vj-extrusion-multiplier-calibration
[pid-tuning]: https://reprap.org/wiki/PID_Tuning
[calibration-cube]: https://www.thingiverse.com/thing:1278865
[temperature-tower]: https://www.thingiverse.com/thing:2893943
[glass-transition-temperature]: https://en.wikipedia.org/wiki/Glass_transition
[assembly-build-tips]: https://youtu.be/me8Qrwh907Q
[bed-leveling]: https://support.3dverkstan.se/article/47-getting-started
[chep-bed-leveling]: https://youtu.be/_EfWVUJjBdA
[marlin-mesh-bed-level]: http://marlinfw.org/docs/gcode/G029-mbl.html
[print-not-sticking]: https://rigid.ink/pages/ultimate-troubleshooting-guide#issue-print-not-sticking-to-the-bed-2
