---
date: 2013-07-13T00:00:00Z
title: Command o Control + Enter en formularios de Bootstrap
slug: /command-or-control-enter-in-bootstrap-forms/
translationKey: "command-or-control-enter-in-bootstrap-forms"
description: |-
  Cómo agregar la acción de command o control + enter a tus formularios usando
  jQuery y Twitter Bootstrap.
categories:
  - Development
tags:
  - JavaScript
  - jQuery
  - Twitter Bootstrap
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

Usando command + enter para enviar:

    $(document).on('keydown', '.controls > .text, .controls > .string', function(event) {
      if(event.keyCode == 13 && (event.metaKey || event.ctrlKey)) {
        $('input.btn.submit-helper').click();
      }
    });

- Agrega una clase helper a tu botón de submit para identificarlo.
- Si quieres apuntar a inputs normales usa `.text` y para `textareas` usa
  `.string`, o usa ambos.
