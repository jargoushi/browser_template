"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Settings, Activity, LayoutDashboard, Zap, Shield, Globe, Download, Upload, CheckCircle2, AlertCircle } from "lucide-react"

export default function IndexPage({ name = "App" }) {
  const [activeTab, setActiveTab] = useState("overview")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 插件状态
  const [apiKey, setApiKey] = useState("")
  const [isProtectionEnabled, setIsProtectionEnabled] = useState(true)
  const [isAccelerationEnabled, setIsAccelerationEnabled] = useState(false)
  const [isAutoUpdateEnabled, setIsAutoUpdateEnabled] = useState(true)
  const [isDevModeEnabled, setIsDevModeEnabled] = useState(false)

  // 提示状态
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error", text: string } | null>(null)

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMsg({ type, text })
    setTimeout(() => setStatusMsg(null), 3000)
  }

  // 导出配置 (下载)
  const handleExport = () => {
    const config = {
      apiKey,
      isProtectionEnabled,
      isAccelerationEnabled,
      isAutoUpdateEnabled,
      isDevModeEnabled,
      version: "1.0.0",
      exportedAt: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `antigravity-config-${new Date().getTime()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    showStatus("success", "配置导出成功")
  }

  // 导入配置 (上传)
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string)

        // 简单校验并更新状态
        if (config.apiKey !== undefined) setApiKey(config.apiKey)
        if (config.isProtectionEnabled !== undefined) setIsProtectionEnabled(config.isProtectionEnabled)
        if (config.isAccelerationEnabled !== undefined) setIsAccelerationEnabled(config.isAccelerationEnabled)
        if (config.isAutoUpdateEnabled !== undefined) setIsAutoUpdateEnabled(config.isAutoUpdateEnabled)
        if (config.isDevModeEnabled !== undefined) setIsDevModeEnabled(config.isDevModeEnabled)

        showStatus("success", "配置导入成功")
      } catch (error) {
        showStatus("error", "无效的配置文件")
      }
    }
    reader.readAsText(file)
    // 重置 input 以便下次选择同一文件
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="flex flex-col w-[400px] h-[550px] bg-background overflow-hidden border shadow-2xl rounded-xl mx-auto relative">
      {/* 浮动状态提示 */}
      {statusMsg && (
        <div className={`absolute top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-top-4 ${
          statusMsg.type === "success" ? "bg-emerald-500 text-white" : "bg-destructive text-white"
        }`}>
          {statusMsg.type === "success" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
          {statusMsg.text}
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b glass-morphism sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none">Antigravity</h1>
            <p className="text-[10px] text-muted-foreground mt-1">v1.0.0 • {name}</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1 px-2 py-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          在线
        </Badge>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <Tabs defaultValue="overview" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
          <div className="px-4 pt-3">
            <TabsList className="grid w-full grid-cols-3 h-9">
              <TabsTrigger value="overview" className="text-xs gap-1.5">
                <LayoutDashboard className="w-3.5 h-3.5" />
                概览
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs gap-1.5">
                <Settings className="w-3.5 h-3.5" />
                设置
              </TabsTrigger>
              <TabsTrigger value="activity" className="text-xs gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                动态
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 px-4 py-3">
            <TabsContent value="overview" className="mt-0 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Card className="shadow-sm border-none bg-muted/30">
                  <CardHeader className="p-3 pb-0">
                    <CardDescription className="text-[10px] uppercase tracking-wider font-semibold">今日请求</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-1">
                    <p className="text-2xl font-bold">1,284</p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-none bg-muted/30">
                  <CardHeader className="p-3 pb-0">
                    <CardDescription className="text-[10px] uppercase tracking-wider font-semibold">拦截威胁</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-1">
                    <p className="text-2xl font-bold text-primary">42</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-morphism border-none">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">快速操作</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-background/50 border">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium">实时防护</span>
                    </div>
                    <Switch checked={isProtectionEnabled} onCheckedChange={setIsProtectionEnabled} />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-background/50 border">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium">全局加速</span>
                    </div>
                    <Switch checked={isAccelerationEnabled} onCheckedChange={setIsAccelerationEnabled} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-0 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium px-1">API 密钥</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-••••••••••••••••"
                    className="w-full h-9 px-3 rounded-md border bg-background text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium">自动更新</p>
                      <p className="text-[10px] text-muted-foreground">保持插件处于最新版本</p>
                    </div>
                    <Switch checked={isAutoUpdateEnabled} onCheckedChange={setIsAutoUpdateEnabled} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium">开发者模式</p>
                      <p className="text-[10px] text-muted-foreground">启用高级调试工具</p>
                    </div>
                    <Switch checked={isDevModeEnabled} onCheckedChange={setIsDevModeEnabled} />
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="space-y-3">
                  <p className="text-xs font-medium px-1">数据管理</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="text-xs gap-2" onClick={handleExport}>
                      <Download className="w-3.5 h-3.5" />
                      导出配置
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs gap-2" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-3.5 h-3.5" />
                      导入配置
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".json"
                      onChange={handleImport}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-0">
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-default group">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">成功拦截恶意脚本</p>
                      <p className="text-[10px] text-muted-foreground">2 分钟前 • google.com</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground">© 2026 Antigravity Studio</p>
        <div className="flex items-center gap-3">
          <a href="#" className="text-[10px] text-primary hover:underline font-medium">文档</a>
          <a href="#" className="text-[10px] text-primary hover:underline font-medium">支持</a>
        </div>
      </footer>
    </div>
  )
}
