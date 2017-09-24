$(document).ready(function() {
  $('#add').click(function() {
    $("#add").prop('disabled', true);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      var tab = tabs[0];
      var page = { type: 'jkpluta.bookmark', title: tab.title, url: tab.url }
      var token = '5f06a451281e69046a966dccef4aa29cd4569ec2';
      var data = {
        "description": "Zakładka",
        "public": false,
        "files": {
          "bookmark.json": {
            "content": JSON.stringify(page)
          }
        }
      };
      $.ajax({
        url: 'https://api.github.com/gists',
        method: "POST",
        dataType: "json",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        cache: false,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
          xhr.setRequestHeader("Authorization", "Token " + token);
          xhr.setRequestHeader("X-GitHub-OTP", "two-factor-code");
        },
        success: function (data) {
          $("#add").prop('disabled', false);
        },
        error: function (jqXHR, status, error) {
          alert(error);
        }
      });
    });
  });
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
      $('#add').show();
    },
    error: function (xhr, status, error) {
      $('#container').append('BŁĄD!');
    }
  });
});
