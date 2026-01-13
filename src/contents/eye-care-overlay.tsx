import type { PlasmoCSConfig } from "plasmo"
import { useStorage } from "@plasmohq/storage/hook"
import styleText from "data-text:@/app/globals.css"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

const EyeCareOverlay = () => {
  // 核心：Content Script 也会实时感知存储的变化
  const [isEnabled] = useStorage("eye-care-enabled", false)

  // 如果开关没打开，直接不渲染任何内容
  if (!isEnabled) return null

  return (
    <div className="fixed bottom-5 right-5 z-[9999] p-4 bg-primary text-primary-foreground rounded-lg shadow-2xl animate-in fade-in zoom-in duration-300 border-2 border-primary-foreground/20">
      <p className="text-sm font-bold flex items-center gap-2">
        <span className="text-xl animate-pulse">👁️</span>
        护眼模式已开启
      </p>
    </div>
  )
}

export default EyeCareOverlay
