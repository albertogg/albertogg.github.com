---
categories:
- blog
date: 2013-07-13T00:00:00Z
description: |
  Add a scrollTo Top with fixed button to your site using jQuery and Font Awesome.
redirect_from:
- /wiki/scrollTo-Top-using-jQuery/
tag: blog
title: ScrollTo Top using jQuery and Font Awesome icon
url: /2013/07/13/scrollTo-Top-using-jQuery/
---

{{< highlight javascript >}}
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
{{< / highlight >}}

Add the Font Awesome Angle Double Up icon.

{{< highlight html >}}
<a href="#" class="scrollTo-top" style="display: inline;">
  <i class="fa fa-angle-double-up"></i>
</a>
{{< / highlight >}}

The scss style for the scrollTo-Top button using a Font Awesome icon.

{{< highlight scss >}}
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
{{< / highlight >}}
