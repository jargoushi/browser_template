import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("📩 后台收到消息，请求参数为:", req.body)

  // 模拟一个异步操作（比如 API 请求）
  const message = `你好，我是后台！你刚才发给我的是: ${req.body.text}`

  // 返回结果给发送者
  res.send({
    message
  })
}

export default handler
