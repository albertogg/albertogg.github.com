document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    var customSelector = document.querySelectorAll('a[href="' + this.location.pathname +'"]');
      var selectorClass = customSelector[0].parentNode;
      if (selectorClass.parentNode.classList == 'menu') {
        if (selectorClass.classList)
          selectorClass.classList.add('active');
        else
          selectorClass.className += ' ' + 'active';
      }
   }
}
