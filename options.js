$(document).ready(function() {
    chrome.storage.sync.get({
        iconSize: "32",
        username: null,
        token: null
    }, function(items) {
        $('#iconSize').val(items.iconSize);
        $('#username').val(items.username);
        $('#token').val(items.token);
    });
    $('#save').click(function() {
        chrome.storage.sync.set({
            username: $('#username').val(),
              token: $('#token').val()
        }, function() {
            chrome.storage.sync.set({
                iconSize: $('#iconSize').val(),
                username: $('#username').val(),
                token: $('#token').val()
            }, function() {
            });
            if ($('#username').val() !== '' && $('#password').val() !== '') {
                $.ajax({
                    url: 'https://api.github.com/authorizations',
                    method: "POST",
                    dataType: "json",
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({ "scopes": ["gist"], "note": "jkpluta-chrome-".concat(new Date().toISOString()) }),
                    cache: false,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
                        xhr.setRequestHeader("Authorization", "Basic " + window.btoa($('#username').val() + ':' + $('#password').val()));
                        xhr.setRequestHeader("X-GitHub-OTP", "two-factor-code");
                    },
                    success: function (data) {
                        chrome.storage.sync.set({
                            token: data.token
                        }, function() {
                            window.close();
                        });
                    },
                    error: function (jqXHR, status, error) {
                        $('#message').text(jqXHR.status.toString() + ' - ' + status);
                    }
                });
            }
            else {
                window.close();
            }
        });
    });
});
