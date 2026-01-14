"use client"

import "@/app/globals.css"
import { useStorage } from "@plasmohq/storage/hook"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, ExternalLink, StickyNote } from "lucide-react"
import { useEffect } from "react"

interface Note {
  id: string
  text: string
  url: string
  title: string
  createdAt: number
}

export default function IndexPage() {
  const [notes, setNotes] = useStorage<Note[]>("my-notes", [])

  // 调试日志
  useEffect(() => {
    console.log("Popup 收到笔记更新:", notes)
  }, [notes])

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const clearAll = () => {
    if (confirm("确定要清空所有笔记吗？")) {
      setNotes([])
    }
  }

  return (
    <div className="flex flex-col w-[400px] h-[500px] bg-slate-50 border shadow-xl overflow-hidden">
      <header className="p-4 bg-white border-b flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <StickyNote className="text-white" size={20} />
          </div>
          <h1 className="font-bold text-slate-900">标注助手</h1>
        </div>
        {notes?.length > 0 && (
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 text-xs" onClick={clearAll}>
            清空
          </Button>
        )}
      </header>

      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
          {(!notes || notes.length === 0) ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-slate-400 space-y-3">
              <div className="bg-slate-100 p-4 rounded-full">
                <BookmarkPlus size={40} className="opacity-20" />
              </div>
              <p className="text-sm">还没有笔记，去网页上划词试试吧！</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <Card key={note.id} className="group border-slate-200 hover:border-blue-200 transition-colors shadow-sm">
                  <CardContent className="p-3 space-y-2">
                    <p className="text-sm text-slate-800 leading-relaxed font-medium line-clamp-3">
                      “{note.text}”
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="flex flex-col max-w-[240px]">
                        <span className="text-[10px] text-slate-400 truncate" title={note.title}>
                          来源: {note.title}
                        </span>
                        <span className="text-[10px] text-slate-300">
                          {new Date(note.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                          onClick={() => window.open(note.url, "_blank")}
                        >
                          <ExternalLink size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-400 hover:text-red-500 hover:bg-red-50"
                          onClick={() => deleteNote(note.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </main>

      <footer className="p-3 bg-white border-t text-center shrink-0">
        <p className="text-[10px] text-slate-400">
          共 {notes?.length || 0} 条笔记 · 实时同步中
        </p>
      </footer>
    </div>
  )
}

function BookmarkPlus({ size, className }: { size: number, className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      <line x1="12" y1="7" x2="12" y2="13" />
      <line x1="9" y1="10" x2="15" y2="10" />
    </svg>
  )
}
