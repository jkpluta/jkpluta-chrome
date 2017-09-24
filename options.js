$(document).ready(function() {
  chrome.storage.sync.get({
    username: null,
    token: null
  }, function(items) {
    $('#username').val(items.username);
    $('#token').val(items.token);
  });
  $('#save').click(function() {
    chrome.storage.sync.set({
      username: $('#username').val(),
      token: $('#token').val()
    }, function() {
      if ($('#token').val() === '') {
      }
      window.close();
    });
  });
});
