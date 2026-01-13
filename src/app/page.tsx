"use client"

import "@/app/globals.css"
import { useStorage } from "@plasmohq/storage/hook"
import { sendToBackground } from "@plasmohq/messaging"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function IndexPage({ name = "App" }) {
  const [isEnabled, setIsEnabled] = useStorage("eye-care-enabled", false)

  const handlePing = async () => {
    try {
      const resp = await (sendToBackground as any)({
        name: "ping",
        body: { text: "Hello Background!" }
      })
      alert(resp.message)
    } catch (error) {
      console.error("发送消息失败:", error)
      alert("通信失败")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-[400px] min-h-[400px] p-4 space-y-4 bg-background">
      <Card className={`w-full transition-colors duration-500 ${isEnabled ? "bg-orange-50 border-orange-200" : "bg-card"}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">👁️</span>
            护眼助手
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-sm font-medium">开启滤镜</span>
              <p className="text-[10px] text-muted-foreground">状态将同步到所有网页</p>
            </div>
            <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
          </div>

          <div className="pt-4 border-t">
            <Button
              variant="outline"
              className="w-full"
              onClick={handlePing}
            >
              向后台发个消息 (Ping)
            </Button>
          </div>
        </CardContent>
      </Card>
      <footer className="text-[10px] text-muted-foreground">
        Plasmo + Next.js + Tailwind ({name})
      </footer>
    </div>
  )
}
