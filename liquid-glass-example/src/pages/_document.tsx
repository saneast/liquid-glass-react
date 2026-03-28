import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        <meta name="description" content="智能问答助手 - 使用液态玻璃风格 UI 的 AI 对话系统" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
