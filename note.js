$(document).ready(function() {
    $('#cancel').click(function() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            var tab = tabs[0];
            chrome.tabs.remove(tab.id);
        });
    });
});
