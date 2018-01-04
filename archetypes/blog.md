---
date: {{ .Date }}
title: "{{ replace .TranslationBaseName "-" " " | title }}"
slug: "/{{ .TranslationBaseName | lower }}/"
description: |-
  description between 50 and 200 chars ending with a dot.
categories:
  - Development
  - DevOps
tags:
  - tag
draft: true
---
