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

// 🎯 进阶：精准挂载 (Targeted Injection)
// 如果你想把组件“塞进”网页的某个特定元素里，使用 getInlineAnchor
export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  // 比如我们想挂载到页面的第一个 h1 标签后面
  // return document.querySelector("h1")

  // 或者我们依然挂载到 body，但改用 fixed 定位，这样就不会挤压原网页内容了
  return document.body
}

const TopBanner = () => {
  return (
    /* 使用 fixed top-0 确保它漂浮在最顶部，不占用实际文档流空间 */
    <div className="fixed top-0 left-0 w-full bg-yellow-400 text-black py-2 px-4 text-center font-bold text-sm shadow-md z-[10000] border-b border-yellow-500">
      🚀 这是一个 Fixed 注入的通知栏，它不会挤压你的网页内容！
    </div>
  )
}

export default TopBanner
