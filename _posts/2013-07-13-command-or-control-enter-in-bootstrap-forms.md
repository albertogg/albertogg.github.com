---
layout: wiki
title: Command or control enter in bootstrap forms
description: How to add command or control enter action to your forms using jQuey and twitter Boostrap.
category: wiki
tag: wiki
---

{% highlight javascript %}
$(document).on('keydown', '.controls > .text, .controls > .string', function(event) {
  if(event.keyCode == 13 && (event.metaKey || event.ctrlKey)) {
    $('input.btn.submit-helper').click();
  }
});
{% endhighlight %}

- Add a helper class to your submit button to identify it.
- If you want to target normal inputs use .text and to target textareas use .string or use both.
