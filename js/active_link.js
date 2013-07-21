$(document).ready(function () {
  $('a[href="' + this.location.pathname +'"]').parent("li").addClass('active');
});
