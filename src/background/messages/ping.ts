import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("📩 后台收到消息，请求参数为:", req.body)

  // 模拟一个异步操作（比如 API 请求）
  const greeting = process.env.PLASMO_PUBLIC_GREETING
  const secret = process.env.PLASMO_PUBLIC_SECRET_KEY

  const message = `${greeting}! 后台收到: ${req.body.text}。密钥验证: ${secret ? "成功" : "失败"}`

  // 返回结果给发送者
  res.send({
    message
  })
}

export default handler
