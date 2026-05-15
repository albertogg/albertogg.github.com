---
date: 2013-07-13T00:00:00Z
title: jQuery scrollTo con pushState
slug: /jQuery-scrollTo-with-pushState/
translationKey: "jquery-scrollto-with-pushstate"
description: |-
  Cómo agregar scrollTo con pushState a tu sitio usando jQuery.
categories:
  - Development
tags:
  - JavaScript
  - jQuery
  - scroll
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

pushState:

    $(document).ready(function() {
      $('.nav-scroller > li > a').click(function(){
        var myUri = $(this).attr('href');
          $('html,body').animate({
             scrollTop: $('#' + $(this).prop('class')).offset().top
          }, 500);
          history.pushState('', document.title, myUri);
          return false;
      });
    });

- Cada elemento anchor de navegación necesita un nombre de clase único.
- Los elementos destino deben tener ese mismo nombre de clase único, pero como `id`.
