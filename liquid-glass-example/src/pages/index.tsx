import { Geist } from "next/font/google"
import { useState, useRef, useEffect } from "react"
import LiquidGlass from "liquid-glass-react"
import { 
  Send, 
  Sparkles, 
  MessageCircle, 
  TrendingUp, 
  BookOpen, 
  Zap,
  BarChart3,
  Bot,
  User,
  ChevronRight,
  Lightbulb,
  FileText,
  Code
} from "lucide-react"
import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface RecommendedItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: string
}

const recommendedItems: RecommendedItem[] = [
  {
    id: "1",
    title: "开始使用 AI 助手",
    description: "了解如何与智能助手高效对话",
    icon: <Sparkles className="w-5 h-5" />,
    category: "入门指南"
  },
  {
    id: "2", 
    title: "代码生成与优化",
    description: "让 AI 帮你编写和优化代码",
    icon: <Code className="w-5 h-5" />,
    category: "开发工具"
  },
  {
    id: "3",
    title: "文档智能分析",
    description: "上传文档获取智能摘要和分析",
    icon: <FileText className="w-5 h-5" />,
    category: "效率工具"
  },
  {
    id: "4",
    title: "创意灵感生成",
    description: "获取创意写作和头脑风暴支持",
    icon: <Lightbulb className="w-5 h-5" />,
    category: "创作辅助"
  }
]

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [globalMousePos, setGlobalMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setGlobalMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "这是一个很好的问题！让我为您详细解答。根据我的分析，这个问题涉及多个方面...",
        "感谢您的提问。基于我的理解，我可以从以下几个角度来回答您的问题...",
        "我理解您的需求。这是一个常见但重要的话题，让我为您提供一些深入的见解...",
        "非常感谢您的咨询。针对您提出的问题，我建议从以下几个方面考虑..."
      ]
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant", 
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
      setShowAnswer(true)
      setCurrentAnswer(aiMessage.content)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  return (
    <div className={`${geistSans.className} min-h-screen bg-background`} ref={containerRef}>
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <LiquidGlass
            displacementScale={60}
            blurAmount={0.3}
            saturation={140}
            aberrationIntensity={1}
            elasticity={0.2}
            cornerRadius={16}
            padding="12px 20px"
            mouseContainer={containerRef}
          >
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6 text-accent" />
              <span className="font-semibold text-lg">智能问答助手</span>
            </div>
          </LiquidGlass>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <LiquidGlass
                displacementScale={50}
                blurAmount={0.2}
                saturation={140}
                aberrationIntensity={1}
                elasticity={0.25}
                cornerRadius={12}
                padding="10px 16px"
                mouseContainer={containerRef}
                onClick={() => {}}
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">监控面板</span>
                </div>
              </LiquidGlass>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-8rem)]">
          
          {/* Left Panel - Chat Window */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <LiquidGlass
              displacementScale={80}
              blurAmount={0.4}
              saturation={130}
              aberrationIntensity={2}
              elasticity={0.1}
              cornerRadius={24}
              padding="0"
              mouseContainer={containerRef}
              style={{ height: "100%" }}
            >
              <div className="flex flex-col h-full w-full min-w-[320px]">
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-accent" />
                    <h2 className="font-medium">对话窗口</h2>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {messages.length} 条消息
                    </span>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Sparkles className="w-12 h-12 text-accent/50 mb-4" />
                      <p className="text-muted-foreground text-sm">
                        开始对话，探索 AI 的无限可能
                      </p>
                      <div className="mt-6 space-y-2 w-full max-w-xs">
                        {["如何使用这个助手？", "帮我写一段代码", "解释一个概念"].map((q, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickQuestion(q)}
                            className="w-full text-left px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                        >
                          {message.role === "assistant" && (
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                              <Bot className="w-4 h-4 text-accent" />
                            </div>
                          )}
                          <div
                            className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                              message.role === "user"
                                ? "bg-accent text-accent-foreground"
                                : "bg-white/10"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                          {message.role === "user" && (
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-accent" />
                          </div>
                          <div className="px-4 py-3 rounded-2xl bg-white/10">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-white/60 rounded-full typing-dot" />
                              <span className="w-2 h-2 bg-white/60 rounded-full typing-dot" />
                              <span className="w-2 h-2 bg-white/60 rounded-full typing-dot" />
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Input Area */}
                <div className="px-4 py-4 border-t border-white/10">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="输入您的问题..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="px-4 py-3 bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </LiquidGlass>
          </div>

          {/* Right Panel - Homepage Display & Answer Display */}
          <div className="lg:col-span-3 flex flex-col gap-6 h-full overflow-hidden">
            
            {/* Homepage Display - Recommended Content */}
            <div className={`transition-all duration-500 ${showAnswer ? "h-1/3" : "h-full"}`}>
              <LiquidGlass
                displacementScale={70}
                blurAmount={0.35}
                saturation={135}
                aberrationIntensity={1.5}
                elasticity={0.12}
                cornerRadius={24}
                padding="0"
                mouseContainer={containerRef}
                style={{ height: "100%" }}
              >
                <div className="h-full w-full overflow-y-auto">
                  <div className="px-6 py-4 border-b border-white/10 sticky top-0 bg-black/20 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-success" />
                      <h2 className="font-medium">推荐内容</h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendedItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleQuickQuestion(item.title)}
                          className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                              {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs text-muted-foreground">{item.category}</span>
                              <h3 className="font-medium text-sm mt-1 group-hover:text-accent transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-xl bg-white/5">
                        <Zap className="w-5 h-5 mx-auto text-warning mb-2" />
                        <p className="text-xl font-semibold">1.2s</p>
                        <p className="text-xs text-muted-foreground">平均响应</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-white/5">
                        <MessageCircle className="w-5 h-5 mx-auto text-accent mb-2" />
                        <p className="text-xl font-semibold">10K+</p>
                        <p className="text-xs text-muted-foreground">今日对话</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-white/5">
                        <BookOpen className="w-5 h-5 mx-auto text-success mb-2" />
                        <p className="text-xl font-semibold">98%</p>
                        <p className="text-xs text-muted-foreground">满意度</p>
                      </div>
                    </div>
                  </div>
                </div>
              </LiquidGlass>
            </div>

            {/* Answer Display - Shows when there's an answer */}
            {showAnswer && (
              <div className="h-2/3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <LiquidGlass
                  displacementScale={75}
                  blurAmount={0.4}
                  saturation={140}
                  aberrationIntensity={2}
                  elasticity={0.1}
                  cornerRadius={24}
                  padding="0"
                  mouseContainer={containerRef}
                  style={{ height: "100%" }}
                >
                  <div className="h-full w-full overflow-y-auto">
                    <div className="px-6 py-4 border-b border-white/10 sticky top-0 bg-black/20 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-accent" />
                        <h2 className="font-medium">AI 回答详情</h2>
                        <button 
                          onClick={() => setShowAnswer(false)}
                          className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          收起
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="prose prose-invert prose-sm max-w-none">
                        <p className="leading-relaxed text-foreground">{currentAnswer}</p>
                        
                        {/* Enhanced Answer UI Components */}
                        <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
                          <h4 className="font-medium text-accent mb-2 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4" />
                            相关建议
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                              您可以尝试追问更具体的细节
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                              提供更多上下文可以获得更精准的回答
                            </li>
                          </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex gap-3">
                          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors">
                            <Code className="w-4 h-4" />
                            复制回答
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors">
                            <FileText className="w-4 h-4" />
                            导出文档
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </LiquidGlass>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
