---
layout: post
title: jQuery scrollTo with pushState
description: How to add scrollTo with pushState to your site using jQuery.
redirect_from:
  - /wiki/jQuery-scrollTo-with-pushState/
category: blog
tag: blog
---

{% highlight javascript  %}
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
{% endhighlight %}

- Every navigation anchor element needs a unique class name.
- The target elements needs the same unique class name but as id.
