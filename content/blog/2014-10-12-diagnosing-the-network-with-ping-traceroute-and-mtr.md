---
categories:
- blog
date: 2014-10-12T00:00:00Z
description: Diagnosing the network with ping, traceroute and mtr.
tag: blog
title: Diagnosing the network with Ping, Traceroute and MTR
url: /2014/10/12/diagnosing-the-network-with-ping-traceroute-and-mtr/
---

When you deal with a really bad internet connection everyday, as I do, you
probably diagnose the network more frequently than usual and after that you
call your ISP and explain to a person (that may think you are crazy) how you
are having packet loss in a hop that belongs to them. Yes, you have to do this
as many times as you can, until you get someone at the other end of the phone
call that understand what's happening and sends someone to solve the issue, if
possible.

## Ping and Traceroute

As explained above this a weekly task I have to deal with, I start with a
simple `ping` to [google.com][google] and after that I do a `traceroute` to see
what the average `ping` for each hop in the network looks like. If there are
some hiccups, I `ping` and `traceroute` again, but this time to the faulty hop
or hops.

Let's try to send 10 ICMP packages to Google and see how it goes:

```bash
$ ping -c 10 google.com
PING google.com (173.194.37.9): 56 data bytes
64 bytes from 173.194.37.9: icmp_seq=0 ttl=57 time=58.831 ms
64 bytes from 173.194.37.9: icmp_seq=1 ttl=57 time=65.662 ms
64 bytes from 173.194.37.9: icmp_seq=2 ttl=57 time=85.932 ms
64 bytes from 173.194.37.9: icmp_seq=3 ttl=57 time=79.533 ms
64 bytes from 173.194.37.9: icmp_seq=4 ttl=57 time=56.756 ms
64 bytes from 173.194.37.9: icmp_seq=5 ttl=57 time=105.250 ms
64 bytes from 173.194.37.9: icmp_seq=6 ttl=57 time=53.718 ms
64 bytes from 173.194.37.9: icmp_seq=7 ttl=57 time=370.775 ms
64 bytes from 173.194.37.9: icmp_seq=8 ttl=57 time=76.991 ms
64 bytes from 173.194.37.9: icmp_seq=9 ttl=57 time=83.451 ms

--- google.com ping statistics ---
10 packets transmitted, 10 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 53.718/103.690/370.775/90.287 ms
```

It seems that is a good day, there's a bit more of latency in two packages,
nothing really significant.

Let's do a `traceroute` now using three flags,`-v` for verbose and richer
output, `-I` for ICMP packages instead of UDP and `-S` for a summary of probes
not answered

```bash
$ traceroute -v -I -S google.com
traceroute: Warning: google.com has multiple addresses; using 173.194.37.1
traceroute to google.com (173.194.37.1), 64 hops max, 72 byte packets
 1  10.0.1.1 (10.0.1.1) 36 bytes to 10.0.1.4  1.079 ms  0.733 ms  0.602 ms (0% loss)
 2  10.112.0.1 (10.112.0.1) 36 bytes to 10.0.1.4  19.496 ms  14.524 ms  19.342 ms (0% loss)
 3  10.10.21.7 (10.10.21.7) 36 bytes to 10.0.1.4  17.825 ms  9.740 ms  33.740 ms (0% loss)
 4  146.82.34.117 (146.82.34.117) 36 bytes to 10.0.1.4  36.919 ms  7.079 ms  44.011 ms (0% loss)
 5  72.14.197.197 (72.14.197.197) 36 bytes to 10.0.1.4  85.019 ms  51.686 ms  64.695 ms (0% loss)
 6  209.85.253.118 (209.85.253.118) 36 bytes to 10.0.1.4  46.485 ms *  49.122 ms (33% loss)
 7  209.85.251.203 (209.85.251.203) 36 bytes to 10.0.1.4  47.417 ms  76.920 ms  49.649 ms (0% loss)
 8  mia05s08-in-f1.1e100.net (173.194.37.1) 52 bytes to 10.0.1.4  81.094 ms  50.548 ms  54.033 ms (0% loss)
```

As you may see `traceroute` can be a little tricky to understand at first, so
let me explain it. It sends three packages to each hop in the network and
calculates the loss by the amount of package not answered or dropped that are
represented with an (*). It defaults to a maximum of 64 hops with a 72 byte
packet. Normally the first hop will be your router (if any) and the two or
three subsequent hops belongs to your ISP. For us those are the ones that
matter because they are the ones that we can complain about directly.

There are a lot more flags options you can use with `traceroute` that you can
check in the manual of the command.

## MTR

I recently found a tool that also helps me diagnose the network, it's called
MTR. At first glance MTR seems to be really similar to `traceroute` and it is.
It combines `ping` and `traceroute` in a single network diagnostic tool that's
easy to use and really complete.

It doesn't come pre-installed in the mayority of the OS, but it's fairly easy
to install via package managers:

### Ubuntu and Debian

```bash
$ apt-get install mtr
```
### CentOS

```bash
$ yum install mtr
```

### OS X

```
$ brew install mtr
```

Once we have it installed the CLI is really simple and the "defaults" are ok
for most cases I use `--no-dns` to omit the reverse DNS lookups and `--report`
that sends 10 ICMP packages to each hop of the network.

Let's try it out:

```bash
$ mtr --no-dns --report google.com
Start: Sun Oct 12 14:54:09 2014
HOST: x-wing.local       Loss%   Snt   Last   Avg  Best  Wrst StDev
  1.|-- 10.0.1.1                   0.0%    10    0.7   0.9   0.7   1.0   0.0
  2.|-- 10.112.0.1                 0.0%    10   61.6  32.3  15.5  71.9  19.6
  3.|-- 10.10.21.7                 0.0%    10   31.4  32.7  12.1 103.1  28.0
  4.|-- 146.82.34.117              0.0%    10   14.6  36.5  11.0  88.0  24.4
  5.|-- 72.14.210.75               0.0%    10   55.2  68.4  45.8 130.0  27.9
  6.|-- 209.85.253.120             0.0%    10   93.4  65.0  45.0 101.3  19.3
  7.|-- 209.85.251.203             0.0%    10   48.8  64.2  48.6  90.1  15.1
  8.|-- 173.194.37.2               0.0%    10   63.6  62.6  47.0 103.7  17.8
```

The output is more or less similar to the `traceroute`, a bit fancier and better
explained. Columns from left to right:

- Package loss `Loss%`
- Number of packages sent `Snt`
- Ping of the last package `Last`
- Average on all the sent packages `Avg`
- Best package response time `Best`
- Worst package response time `Wrst`
- Standard Deviation `StDev` in which the higher the value the greater the
  difference between package measurements (less is better).

The way I use MTR is the same one that I do with `traceroute` and `ping`, I
first use `ping` and afterwards use `mtr` just to be sure of what's happening.

That's it, we briefly talked about this three tools can help you diagnose your
network by detecting package loss, average response time and the standard
deviation between them.

Thanks!

[google]: https://www.google.com/
