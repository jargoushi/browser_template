"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function IndexPage({ name = "App" }) {
  const [data, setData] = useState("")

  return (
    <div className="flex flex-col p-4 w-[400px] gap-4 bg-background text-foreground">
      <h1 className="text-2xl font-bold">
        Welcome to your <a href="https://www.plasmo.com" className="text-primary hover:underline">Plasmo</a> {name}!
      </h1>
      <input
        onChange={(e) => setData(e.target.value)}
        value={data}
        className="border rounded px-2 py-1 text-black"
        placeholder="Type something..."
      />

      <div className="p-4 border rounded bg-muted/50">
        <p className="text-sm">当前输入内容: <span className="font-mono text-primary">{data || "(空)"}</span></p>
      </div>

      <Button asChild>
        <a href="https://docs.plasmo.com">READ THE DOCS!</a>
      </Button>
    </div>
  )
}
