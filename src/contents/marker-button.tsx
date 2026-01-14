import type { PlasmoCSConfig } from "plasmo"
import { useCallback, useEffect, useState } from "react"
import { BookmarkPlus } from "lucide-react"
import { useStorage } from "@plasmohq/storage/hook"
import styleText from "data-text:@/app/globals.css"

// 需要导入 React 以使用 useRef
import React from "react"

// ============================================================================
// Plasmo 配置
// ============================================================================

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

// ============================================================================
// 类型定义
// ============================================================================

export interface Note {
  id: string
  text: string
  url: string
  title: string
  createdAt: number
}

interface SelectionState {
  text: string
  position: { x: number; y: number }
  visible: boolean
}

// ============================================================================
// 自定义 Hook: 文本选择状态管理
// ============================================================================

function useTextSelection(ignoreHide: React.MutableRefObject<boolean>) {
  const [selection, setSelection] = useState<SelectionState>({
    text: "",
    position: { x: 0, y: 0 },
    visible: false
  })

  const hide = useCallback(() => {
    setSelection((prev) => ({ ...prev, visible: false }))
  }, [])

  const clearSelection = useCallback(() => {
    window.getSelection()?.removeAllRanges()
    hide()
  }, [hide])

  useEffect(() => {
    const onMouseUp = () => {
      const sel = window.getSelection()
      const text = sel?.toString().trim()

      if (!text) {
        hide()
        return
      }

      const range = sel?.getRangeAt(0)
      const rect = range?.getBoundingClientRect()

      if (rect) {
        setSelection({
          text,
          position: {
            x: rect.left + window.scrollX + rect.width / 2,
            y: rect.top + window.scrollY - 40
          },
          visible: true
        })
      }
    }

    const onMouseDown = () => {
      // 如果正在与按钮交互，跳过隐藏
      if (ignoreHide.current) {
        ignoreHide.current = false
        return
      }
      hide()
    }

    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mousedown", onMouseDown)

    return () => {
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mousedown", onMouseDown)
    }
  }, [hide, ignoreHide])

  return { selection, clearSelection }
}

// ============================================================================
// 自定义 Hook: 笔记存储管理
// ============================================================================

function useNotes() {
  const [notes, setNotes] = useStorage<Note[]>("my-notes", [])

  const addNote = useCallback(
    async (text: string) => {
      const newNote: Note = {
        id: crypto.randomUUID(),
        text,
        url: window.location.href,
        title: document.title,
        createdAt: Date.now()
      }

      const updatedNotes = [...(notes || []), newNote]
      await setNotes(updatedNotes)

      console.log("✅ 笔记已保存:", newNote.text.slice(0, 30) + "...")
      return newNote
    },
    [notes, setNotes]
  )

  return { notes, addNote }
}

// ============================================================================
// 主组件
// ============================================================================

export default function MarkerButton() {
  // 用于标记按钮正在被点击，阻止 mousedown 隐藏按钮
  const ignoreHideRef = React.useRef(false)

  const { selection, clearSelection } = useTextSelection(ignoreHideRef)
  const { addNote } = useNotes()
  const [saving, setSaving] = useState(false)

  const handleMouseDown = () => {
    // 标记正在与按钮交互
    ignoreHideRef.current = true
  }

  const handleSave = async () => {
    if (saving || !selection.text) return

    setSaving(true)
    try {
      await addNote(selection.text)
      alert("笔记保存成功！")
      clearSelection()
    } catch (err) {
      console.error("❌ 保存失败:", err)
      alert("保存失败，请检查插件权限")
    } finally {
      setSaving(false)
    }
  }

  if (!selection.visible) return null

  return (
    <button
      onMouseDown={handleMouseDown}
      onClick={handleSave}
      disabled={saving}
      style={{
        position: "fixed",
        left: selection.position.x,
        top: selection.position.y,
        transform: "translateX(-50%)",
        zIndex: 9999
      }}
      className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all active:scale-95 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <BookmarkPlus size={16} />
      <span className="text-xs font-bold">
        {saving ? "保存中..." : "保存笔记"}
      </span>
    </button>
  )
}
