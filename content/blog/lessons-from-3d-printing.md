---
title: "Lessons From 3d Printing"
date: 2019-11-03T18:08:43-04:00
description: |-
  The lessons I've learned in the journey of 3D Printing. E-steps calibration,
  filament, flow rate multiplier, PID, adhesion, upgrades, etc...
categories:
  - 3D Printing
tags:
  - Calibration
  - Assembly
draft: true
---

This post talks about my experiences with 3D printing while using and Ender 3
Pro, what I've learned, misses and recommendations. My intention with this post
will be to keep it up to date with my latest findings.

## Calibration

One of the most important aspects for getting good prints is getting the printer
calibrated correctly. Extruder steps (e-steps), flow rate multiplier, and PID.

### Extruder steps "e-steps"

Depending on your printer setup, if it's bowden or direct you'll calibrate your
e-steps differently. In any bowden setup it's recommended that you calibrate the
extruder through free air, this means that you'll need to detach the tube
closest the hotend, extrude and measure the distance of the filament multiple
times until satisfied. Doing the calibration this way will ensure a proper
calibration of the extruder motor in isolation. For direct setups the process is
going directly through the nozzle.

References:
- [MatterHackers][matterhackers-extruder-calibration]

### Flow rate multiplier

Once you have your e-steps calibrated you'll then fine tune things per filament
spool, type, and or brand. For this the recommendation is to print the
calibration cube in vase mode (one perimeter), then measure, average, and
calculate your results to change the flow rate multiplier. Remember to **measure
only the top layer**.

References:
-

### PID

One additional calibration step per-filament and or brand that you'll end up
doing is printing the temperature tower. This will help you diagnose the
preferred temperature for that filament. Once you know that, calibrate the PID
to keep the temperature of your hotend as close to those numbers as possible.

References:
-

## What not to calibrate

There is a misconception that to gain print accuracy you need to also calibrate
the X, Y, or Z motors, and the reality is that **SHOULD NOT** be calibrate them
as they already are calibrated based on your belts and lead screws.

## Adhesion

Having good adhesion is (I think) the most important part of the printing
process. Materials, temperatures, and bed surfaces are the influencers. PLA for
example (theoretically) can be printed with the bed at room temperature but we
know that adhesion is better at higher temperatures, and if your are having
adhesion problems you should aim for a hotter first layer but keep the rest of
the print below the glass transition temperature, that's because once adhered
you want to avoid your first layer to get soft while applying the next layers to
reduce the elephant foot.

References:
-

## Filament

Read the spool information, don't follow the "default" settings on your slicer
of choice, read the specs of the filament you are printing and do some tests
such as the temperature tower.

## Assembly

Assembling your new 3D printer can be daunting at first but current printers are
not that complicated to assemble, and apart from the assembly instructions that
come with the printer it's also recommended to do some internet search on the
subject as well as seeing some videos on YouTube. Some of the most basic tips I
can give are:

- Make the frame if any square. This means, measure distances before tightening
  all screws and ensure things are not flexed
- Be wary about over-tightening the screws. Most of the frames can be made of
  aluminum and the bolts are steel, if you over-tight the bolt you could mill
  the frame
- Belt tension. Ensure that your belts are enough tensioned, if too loose your
  circles will not be round, etc...
- Check all of the wheels, and adjust all of the eccentric nuts as they are
  responsible of a fit movement of the carriages

## Nozzle

There are not many things I can write about the nozzle that are not obvious. In
general:

- Keep your nozzle clean
- Avoid crashes between the nozzle and the bed as it can damage the nozzle and
  scratch the bed pretty hardly
- If you see filament coming out the nozzle and curling pretty heavily into the
  nozzle it might be a sign of wear or damage

## Upgrades

There are some many upgrades you can do to a 3D Printer that things can get
overwhelming pretty fast. Of course upgrades are one of the coolest parts of
having a printer but, I recommend first knowing your printer. Once you feel
confident start changing things, but do them one at a time. It will help you
troubleshoot things.

[matterhackers-extruder-calibration]: https://www.matterhackers.com/articles/how-to-calibrate-your-extruder
[calibration-cube]:
[temperature-tower]:
[glass-transition-temperature]:
