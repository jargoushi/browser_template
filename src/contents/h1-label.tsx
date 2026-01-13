import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import styleText from "data-text:@/app/globals.css"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

// 🎯 核心：精准定位锚点
export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  // 寻找页面上的第一个 h1 标签
  return document.querySelector("h1")
}

const H1Label = () => {
  return (
    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200 animate-in zoom-in duration-300">
      ✅ 已阅
    </span>
  )
}

export default H1Label
