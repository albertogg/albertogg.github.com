---
layout: wiki
title: ScrollTo Top using jQuery
category: wiki
tag: wiki
---
{% highlight javascript %}
  $(document).ready(function() {
    $(window).scroll(function(event){
      event.preventDefault();
      if ($(this).scrollTop() > 150) {
        $('.scrollTo-top').fadeIn();
      } else {
        $('.scrollTo-top').fadeOut();
      }
    });

    $('.scrollTo-top').click(function(){
      $('html, body').animate({scrollTop : 0 }, 600);
      return false;
    });
  });
{% endhighlight %}

The scss style for the scrollTo-Top button using a fontawesome icon.
{% highlight scss %}
  .scrollTo-top {
    position: fixed;
    text-align: center;
    right: 20px;
    bottom: 10px;
    background-color: $gray;
    color: $black;
    display: none;
    padding-top: 5px;
    width: 26px;
    height: 26px;
    border-radius: 6px;
    i {
      text-decoration: none;
      color: $black;
    }
  }
{% endhighlight %}

