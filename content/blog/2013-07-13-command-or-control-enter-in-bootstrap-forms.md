---
categories:
- blog
date: 2013-07-13T00:00:00Z
description: |
  How to add command or control enter action to your forms using jQuey and twitter Boostrap.
redirect_from:
- /wiki/command-or-control-enter-in-bootstrap-forms/
tag: blog
title: Command or control enter in bootstrap forms
url: /2013/07/13/command-or-control-enter-in-bootstrap-forms/
---

{{< highlight javascript >}}
$(document).on('keydown', '.controls > .text, .controls > .string', function(event) {
  if(event.keyCode == 13 && (event.metaKey || event.ctrlKey)) {
    $('input.btn.submit-helper').click();
  }
});
{{< / highlight >}}

- Add a helper class to your submit button to identify it.
- If you want to target normal inputs use .text and to target textareas use .string or use both.
