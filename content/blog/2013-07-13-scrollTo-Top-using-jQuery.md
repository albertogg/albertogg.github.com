---
categories:
- blog
date: 2013-07-13T00:00:00Z
description: |
  Add a scrollTo Top with fixed button to your site using jQuery and Font Awesome
redirect_from:
- /wiki/scrollTo-Top-using-jQuery/
tag: blog
title: ScrollTo Top using jQuery and Font Awesome icon
slug: /scrollTo-Top-using-jQuery/
---

Scrolling JavaScript:

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

Add the Font Awesome Angle Double Up icon.

    <a href="#" class="scrollTo-top" style="display: inline;">
      <i class="fa fa-angle-double-up"></i>
    </a>

The scss style for the scrollTo-Top button using a Font Awesome icon.

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
