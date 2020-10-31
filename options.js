function xor(source1, source2) {
    while (source2.length < source1.length) source2 = source2 + source2;
    var target = '';
    for(i = 0; i < source1.length / 2; i++) {
        var val1 = parseInt(source1.substr(i * 2, 2), 16);
        var val2 = parseInt(source2.substr(i * 2, 2), 16);
        var val = val1 ^ val2;
        var hex = val.toString(16);
        if (hex.length < 2) hex = '0' + hex;
        target += hex;
    }
    return target;
}
function toHex(source) {
    var target = '';
    for(var i = 0 ; i < source.length; i++) {
        var hex = source.charCodeAt(i).toString(16);
        if (hex.length < 2) hex = '0' + hex;
        target += hex;
    }
    return target;
}
$(document).ready(function() {
    chrome.storage.sync.get({
        iconSize: "32",
        token: null
    }, function(items) {
        $('#iconSize').val(items.iconSize);
        $('#token').val(items.token);
    });
    $.ajax({
        url: 'https://jkpluta.github.io/json/token.json',
        method: 'GET',
        cache: false,
        success: function (data) {
            $('#secret').val(data.secret)
        }
    })
    $('#save').click(function() {
        chrome.storage.sync.set({
            iconSize: $('#iconSize').val(),
            token: $('#token').val()
        }, function() {
            if ($('#secret').val() !== '' && $('#password').val() !== '') {	            
                var password = toHex($('#password').val());
                var secret = $('#secret').val();
                var token = xor(secret, password);
                $('#token').val(token);
                chrome.storage.sync.set({
                    iconSize: $('#iconSize').val(),
                    token: $('#token').val()
                }, function() {
                    window.close();
                });
            } else {
                window.close();
            }
        });
    });
});
