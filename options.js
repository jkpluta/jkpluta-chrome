$(document).ready(function() {
    chrome.storage.sync.get({
        iconSize: "32",
        token: null
    }, function(items) {
        $('#iconSize').val(items.iconSize);
        $('#token').val(items.token);
    });
    $('#save').click(function() {
        chrome.storage.sync.set({
            iconSize: $('#iconSize').val(),
            token: $('#token').val()
        }, function() {
            window.close();
        });
    });
});
