let token = null;
$(document).ready(function() {
    chrome.storage.sync.get({
        token: null
    }, function(items) {
        token = items.token;
    });
    chrome.tabs.get(parseInt(getParameterByName("tabId")), (tab) => {
        $('#title').val(tab.title);
        $('#url').val(tab.url);
    });
    $('#save').click(function() {
        alert($('#description').val())
        var page = { 
            type: 'jkpluta.bookmark', 
            title: $('#title').val(), 
            url: $('#url').val(),
            description: $('#description').val()
        }
        var data = {
            "description": "Jan K. Pluta",
            "public": true,
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
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    var tab = tabs[0];
                    chrome.tabs.remove(tab.id);
                });
            },
            error: function (jqXHR, status, error) {
                alert(error);
            }
        });
    });
    $('#cancel').click(function() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            var tab = tabs[0];
            chrome.tabs.remove(tab.id);
        });
    });
});
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
