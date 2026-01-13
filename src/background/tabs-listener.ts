export const initTabsListener = () => {
  chrome.tabs.onActivated.addListener(async (activeInfo) => {
    try {
      const tab = await chrome.tabs.get(activeInfo.tabId)
      console.log(`[Tabs] 切换到: ${tab.url || "未知"}`)
    } catch (e) {}
  })

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
      console.log(`[Tabs] 页面加载完成: ${tab.url}`)
    }
  })
}
