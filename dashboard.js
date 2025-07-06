const productiveKeywords = ['stackoverflow', 'github', 'w3schools'];
const unproductiveKeywords = ['facebook', 'instagram', 'youtube'];

chrome.storage.local.get(null, function(items) {
    let report = document.getElementById("report");
    for (let [host, time] of Object.entries(items)) {
        let type = "Neutral";
        if (productiveKeywords.some(k => host.includes(k))) type = "Productive";
        if (unproductiveKeywords.some(k => host.includes(k))) type = "Unproductive";
        let li = document.createElement("li");
        li.textContent = host + " - " + Math.round(time / 1000) + " sec - " + type;
        report.appendChild(li);
    }
});