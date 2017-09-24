$(document).ready(function() {
  $.ajax({
    url: 'https://jkpluta.github.io/icons.html',
    cache: false,
    success: function (html) {
      var links = $('a[icon], a[icon_uri]', html);
      $('#container').append('<p>');
      for (var i = 0; i < links.length; i++) {
          var link = links.eq(i);
          if (link.attr('ICON_URI') != null)
              $('#container').append('<a href="' + link.attr('href') + '"><img src="' + link.attr('ICON_URI') + '" alt="' + link.text() + '" title="' + link.text() + '" width="24" height="24"></a> ');
      }
      $('#container').append('</p>');
      $('#container').find('a').attr('target', '_blank');
    },
    error: function (xhr, status, error) {
      $('#container').append('BŁĄD!');
    }
  });
})
