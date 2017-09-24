$(document).ready(function() {
    chrome.storage.sync.get({
        username: null,
        token: null,
        message: null
    }, function(items) {
        $('#username').val(items.username);
        $('#token').val(items.token);
        $('#message').text(items.message);
    });
    $('#save').click(function() {
        chrome.storage.sync.set({
            username: $('#username').val(),
              token: $('#token').val()
        }, function() {
            if ($('#token').val() === '') {
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
                            username: $('#username').val(),
                            token: data.token
                        }, function() {
                            window.close();
                        });
                    },
                    error: function (jqXHR, status, error) {
                        chrome.storage.sync.set({
                            message: jqXHR.status.toString() + ' ' + status,
                        }, function() {
                            window.close();
                        });
                    }
                });
            }
            else {
                window.close();
            }
        });
    });
});
