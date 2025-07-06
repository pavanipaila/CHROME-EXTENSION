chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let url = new URL(tabs[0].url).hostname;
    chrome.storage.local.get([url], function(result) {
        let time = result[url] || 0;
        document.getElementById("current").innerText =
            "Time spent on " + url + ": " + Math.round(time / 1000) + " sec";
    });
});