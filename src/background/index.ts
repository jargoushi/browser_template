import { Storage } from "@plasmohq/storage"
import { initTabsListener } from "./tabs-listener"

const storage = new Storage()

console.log("🚀 Background Service Worker 已启动！")
console.log("DEBUG - SECRET_KEY:", process.env.PLASMO_PUBLIC_SECRET_KEY)
console.log("DEBUG - PLASMO_PUBLIC_GREETING:", process.env.PLASMO_PUBLIC_GREETING)

// 1. 初始化拆分出去的模块
initTabsListener()

// 2. 监听存储变化
storage.watch({
  "eye-care-enabled": (c) => {
    console.log("存储变化了 (eye-care):", c.newValue)
  },
  "my-notes": (c) => {
    console.log("🔔 [Storage] 笔记库发生变化！")
    console.log("当前笔记总数:", c.newValue?.length || 0)
    console.log("最新笔记内容:", c.newValue?.[c.newValue.length - 1]?.text)
  }
})

// 3. 插件安装监听
chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ 插件安装/更新成功")
})
