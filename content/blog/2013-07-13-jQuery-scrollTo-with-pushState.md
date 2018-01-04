---
date: 2013-07-13T00:00:00Z
title: jQuery scrollTo with pushState
slug: /jQuery-scrollTo-with-pushState/
description: |-
  How to add scrollTo with pushState to your site using jQuery.
categories:
  - Development
tags:
  - JavaScript
  - jQuery
  - scroll
---

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

- Every navigation anchor element needs a unique class name.
- The target elements needs the same unique class name but as id.
