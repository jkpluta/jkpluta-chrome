$(document).ready(function() {
  chrome.storage.sync.get({
    token: null
  }, function(items) {
    $('#token').val(items.token);
  });
  $('#save').click(function() {
    chrome.storage.sync.set({
      token: $('#token').val()
    }, function() {
      $('#status').html("Ustawienia zostały zapisane");
    });
  });
});
