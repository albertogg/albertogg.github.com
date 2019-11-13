---
title: "Lessons From 3d Printing"
date: 2019-11-03T18:08:43-04:00
description: |-
  These are all of the lessons I wish I knew before I started in the 3D Printing
  hobby. E-steps calibration, filament, cleaning, etc...
categories:
  - 3D Printing
tags:
  - Calibration
  - Cura
  - Slic3r
draft: true
---

This post talks about my experiences with 3D printing while using and Ender 3
Pro, what I've learned, misses and recommendations. My intention with this post
will be to keep it up to date with my latest findings.

## Calibration

One of the most important aspects for getting good prints is getting the printer
calibrated correctly, but what actually do we need to calibrate? Mostly Extruder
steps (e-steps), flow rate multiplier, and PID for the hotend and bed.

### Extruder steps "e-steps"

As the Ender 3 is a bowden setup printer you'll need to calibrate the extruder
through free air, this means that you'll need to unscrew the fitting closest the
hotend and then measure the distance of the filament. Doing it this way will
actually calibrate your motor in isolation with only the tube interfering in the
process because that's a variable that will always be there no matter what. Once
you have this you'll fine tune per-filament using the flow rate multiplier
because your motor was tuned in isolation and it's outputting the correct amount
of filament.

Reference: [MatterHackers][matterhackers-extruder-calibration]

### Flow rate multiplier

Once you have your e-steps calibrated you'll then fine tune things for that
specific filament type and or brand. You could go as far as proper calibration
of each spool indistinct of them being the same brand. So what do you do? you
print the calibration cube in vase mode (one perimeter), then measure multiple
times in different places and average your results and change the flow rate
multiplier. Remember to **measure only the top layer**.

### PID

One additional calibration step per-filament and or brand that you'll end up
doing is printing the temperature tower. This will help you diagnose the
preferred temperature for that filament. With that in mind you'll have to
calibrate your PID to keep the temperature of your hotend as close to those
numbers as possible.

## What not do calibrate

There are other things that you will not need to calibrate as they are fine with
factory calibration:

X, Y or Z motors. These SHOULD NOT be calibrated as they already are calibrated
based on your belts and lead screws. You'll read in some places that you should
calibrate them, but you don't, period.

## Adhesion

Having good adhesion is (I think) the most important part of the printing
process. Materials, temperatures, and bed surfaces are heavy influencers in this
game. PLA for example (theoretically) can be printed with the bed at room
temperature but we know that adhesion is better at higher temperatures, and if
your are having adhesion problems you should aim for a hotter first layer but
keep the rest of the print below the glass transition temperature, that's
because once adhered you want to avoid your first layer to get soft.

Elephant foot

## Filament

Read the spool information.

## Assembling

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
