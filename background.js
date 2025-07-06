let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    if (activeTab && startTime) {
        let timeSpent = Date.now() - startTime;
        storeTime(activeTab.url, timeSpent);
    }
    let tab = await chrome.tabs.get(activeInfo.tabId);
    activeTab = tab;
    startTime = Date.now();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === 'complete') {
        activeTab = tab;
        startTime = Date.now();
    }
});

function storeTime(url, timeSpent) {
    let hostname = new URL(url).hostname;
    chrome.storage.local.get([hostname], (res) => {
        let totalTime = res[hostname] || 0;
        totalTime += timeSpent;
        chrome.storage.local.set({ [hostname]: totalTime });
    });
}