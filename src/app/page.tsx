"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function IndexPage({ name = "App" }) {
  const [inputValue, setInputValue] = useState("")
  const [submittedValue, setSubmittedValue] = useState("")

  return (
    <div className="flex flex-col w-[400px] min-h-[400px] bg-background p-4 border shadow-xl rounded-xl mx-auto space-y-4">
      <header className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-primary">基础 UI 学习</h1>
        <p className="text-xs text-muted-foreground">当前环境: {name}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">交互示例</CardTitle>
          <CardDescription className="text-[10px]">尝试输入内容并点击按钮</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="输入点什么..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="text-xs"
            />
            <Button
              size="sm"
              onClick={() => setSubmittedValue(inputValue)}
            >
              提交
            </Button>
          </div>

          {submittedValue && (
            <div className="p-3 bg-muted rounded-md border animate-in fade-in slide-in-from-bottom-2">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">你提交的内容：</p>
              <p className="text-sm font-medium mt-1">{submittedValue}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <footer className="mt-auto pt-4 border-t text-center">
        <p className="text-[10px] text-muted-foreground">
          编辑 <code>src/app/page.tsx</code> 继续探索
        </p>
      </footer>
    </div>
  )
}

