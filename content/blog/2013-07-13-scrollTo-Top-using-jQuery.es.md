---
date: 2013-07-13T00:00:00Z
title: ScrollTo Top usando jQuery y el ícono de Font Awesome
slug: /scrollTo-Top-using-jQuery/
translationKey: "scrollto-top-using-jquery"
description: |-
  Agrega un botón fijo de scrollTo Top a tu sitio usando jQuery y Font Awesome.
categories:
  - Development
tags:
  - JavaScript
  - jQuery
  - scroll
---

> **Nota:** Esta publicación fue traducida al español con ayuda de IA.

JavaScript de scrolling:

    $(function() {
      var viewPortWidth = $(window).width();

      $(window).scroll(function(event) {
        event.preventDefault();
        if (viewPortWidth > 480) {
          if ($(this).scrollTop() > 180) {
            $('.scrollTo-top').fadeIn();
          } else {
            $('.scrollTo-top').fadeOut();
          }
        }
      });

      $('.scrollTo-top').click(function(event) {
        $('html, body').animate({scrollTop : 0 }, 600);
        event.preventDefault();
      });
    });

Agrega el ícono Angle Double Up de Font Awesome.

    <a href="#" class="scrollTo-top" style="display: inline;">
      <i class="fa fa-angle-double-up"></i>
    </a>

El estilo scss para el botón scrollTo-Top usando un ícono de Font Awesome.

    .scrollTo-top {
      display: none;
      position: fixed;
      bottom: 16px;
      right: 20px;
      font-size: 32px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 0.3rem;
      z-index: 500;

      &:hover {
        background-color: rgba(0, 0, 0, 0.6);
      }

      i {
        padding: 3px 10px;
      }
    }
