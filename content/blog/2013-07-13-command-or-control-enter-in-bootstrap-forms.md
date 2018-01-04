---
date: 2013-07-13T00:00:00Z
title: Command or control enter in bootstrap forms
slug: /command-or-control-enter-in-bootstrap-forms/
description: |-
  How to add command or control enter action to your forms using jQuery and
  Twitter Bootstrap.
categories:
  - Development
tags:
  - JavaScript
  - jQuery
  - Twitter Bootstrap
---

Using command enter to submit:

    $(document).on('keydown', '.controls > .text, .controls > .string', function(event) {
      if(event.keyCode == 13 && (event.metaKey || event.ctrlKey)) {
        $('input.btn.submit-helper').click();
      }
    });

- Add a helper class to your submit button to identify it.
- If you want to target normal inputs use .text and to target textareas use
  .string or use both.
