import { Storage } from "@plasmohq/storage"
import { initTabsListener } from "./tabs-listener"

const storage = new Storage()

console.log("🚀 Background Service Worker 已启动！")

// 1. 初始化拆分出去的模块
initTabsListener()

// 2. 监听存储变化（第 5 章核心）
storage.watch({
  "eye-care-enabled": (c) => {
    console.log("---------------------------------------")
    console.log("🔔 [Storage] 感知到开关状态变化！")
    console.log("旧值:", c.oldValue)
    console.log("新值:", c.newValue)
    console.log("---------------------------------------")
  }
})

// 3. 插件安装监听
chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ 插件安装/更新成功")
})
