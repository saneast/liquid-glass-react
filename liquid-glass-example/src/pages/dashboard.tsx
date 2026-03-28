import { Geist } from "next/font/google"
import { useState, useRef, useEffect } from "react"
import LiquidGlass from "liquid-glass-react"
import { 
  BarChart3,
  Bot,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  MessageCircle,
  Clock,
  Activity,
  Zap,
  AlertCircle,
  CheckCircle,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  RefreshCw
} from "lucide-react"
import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

interface MetricCard {
  id: string
  title: string
  value: string
  change: number
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
  color: string
}

interface SystemStatus {
  name: string
  status: "operational" | "degraded" | "down"
  uptime: string
  latency: string
}

const metrics: MetricCard[] = [
  {
    id: "1",
    title: "总对话数",
    value: "24,521",
    change: 12.5,
    trend: "up",
    icon: <MessageCircle className="w-5 h-5" />,
    color: "accent"
  },
  {
    id: "2",
    title: "活跃用户",
    value: "1,842",
    change: 8.2,
    trend: "up",
    icon: <Users className="w-5 h-5" />,
    color: "success"
  },
  {
    id: "3",
    title: "平均响应时间",
    value: "1.2s",
    change: -5.3,
    trend: "down",
    icon: <Clock className="w-5 h-5" />,
    color: "warning"
  },
  {
    id: "4",
    title: "满意度",
    value: "98.5%",
    change: 2.1,
    trend: "up",
    icon: <Activity className="w-5 h-5" />,
    color: "accent"
  }
]

const systemStatuses: SystemStatus[] = [
  { name: "AI 推理服务", status: "operational", uptime: "99.99%", latency: "45ms" },
  { name: "数据库服务", status: "operational", uptime: "99.95%", latency: "12ms" },
  { name: "缓存服务", status: "operational", uptime: "99.99%", latency: "2ms" },
  { name: "消息队列", status: "degraded", uptime: "98.50%", latency: "125ms" },
  { name: "文件存储", status: "operational", uptime: "99.90%", latency: "35ms" }
]

const recentRequests = [
  { id: 1, path: "/api/chat", status: "2XX", requests: "12.5K", avgTime: "1.2s" },
  { id: 2, path: "/api/analyze", status: "2XX", requests: "8.2K", avgTime: "2.1s" },
  { id: 3, path: "/api/generate", status: "2XX", requests: "5.8K", avgTime: "3.5s" },
  { id: 4, path: "/api/search", status: "4XX", requests: "234", avgTime: "0.8s" },
  { id: 5, path: "/api/feedback", status: "2XX", requests: "1.2K", avgTime: "0.3s" }
]

// Simple chart data
const hourlyData = [65, 78, 52, 89, 95, 72, 85, 91, 68, 75, 88, 92]
const hours = ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"]

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "text-success"
      case "degraded": return "text-warning"
      case "down": return "text-destructive"
      default: return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational": return <CheckCircle className="w-4 h-4 text-success" />
      case "degraded": return <AlertCircle className="w-4 h-4 text-warning" />
      case "down": return <AlertCircle className="w-4 h-4 text-destructive" />
      default: return null
    }
  }

  return (
    <div className={`${geistSans.className} min-h-screen bg-background`} ref={containerRef}>
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-success/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
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
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">返回</span>
                </div>
              </LiquidGlass>
            </Link>
            
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
                <BarChart3 className="w-6 h-6 text-accent" />
                <span className="font-semibold text-lg">监控面板</span>
              </div>
            </LiquidGlass>
          </div>

          <div className="flex items-center gap-3">
            {/* Time Range Selector */}
            <LiquidGlass
              displacementScale={40}
              blurAmount={0.2}
              saturation={130}
              aberrationIntensity={1}
              elasticity={0.2}
              cornerRadius={10}
              padding="8px 12px"
              mouseContainer={containerRef}
            >
              <div className="flex items-center gap-2">
                {["1h", "24h", "7d", "30d"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedTimeRange(range)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      selectedTimeRange === range 
                        ? "bg-accent text-accent-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </LiquidGlass>

            {/* Refresh Button */}
            <LiquidGlass
              displacementScale={50}
              blurAmount={0.2}
              saturation={140}
              aberrationIntensity={1}
              elasticity={0.25}
              cornerRadius={12}
              padding="10px"
              mouseContainer={containerRef}
              onClick={handleRefresh}
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
            </LiquidGlass>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <LiquidGlass
                key={metric.id}
                displacementScale={60}
                blurAmount={0.35}
                saturation={135}
                aberrationIntensity={1.5}
                elasticity={0.15}
                cornerRadius={20}
                padding="20px"
                mouseContainer={containerRef}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-lg bg-${metric.color}/20 flex items-center justify-center text-${metric.color}`}>
                      {metric.icon}
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.trend === "up" ? "text-success" : 
                      metric.trend === "down" ? "text-destructive" : "text-muted-foreground"
                    }`}>
                      {metric.trend === "up" ? <TrendingUp className="w-4 h-4" /> : 
                       metric.trend === "down" ? <TrendingDown className="w-4 h-4" /> : null}
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                  </div>
                </div>
              </LiquidGlass>
            ))}
          </div>

          {/* Charts and System Status Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Chart */}
            <div className="lg:col-span-2">
              <LiquidGlass
                displacementScale={70}
                blurAmount={0.4}
                saturation={130}
                aberrationIntensity={2}
                elasticity={0.1}
                cornerRadius={24}
                padding="24px"
                mouseContainer={containerRef}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center gap-2">
                      <Activity className="w-5 h-5 text-accent" />
                      请求趋势
                    </h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-accent" />
                        2XX
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-warning" />
                        4XX
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-destructive" />
                        5XX
                      </span>
                    </div>
                  </div>
                  
                  {/* Simple Bar Chart */}
                  <div className="h-48 flex items-end gap-2 pt-4">
                    {hourlyData.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-gradient-to-t from-accent to-accent/50 rounded-t-sm transition-all hover:from-accent/80"
                          style={{ height: `${value}%` }}
                        />
                        <span className="text-xs text-muted-foreground">{hours[index]?.slice(0, 2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </LiquidGlass>
            </div>

            {/* System Status */}
            <div>
              <LiquidGlass
                displacementScale={65}
                blurAmount={0.35}
                saturation={135}
                aberrationIntensity={1.5}
                elasticity={0.12}
                cornerRadius={24}
                padding="0"
                mouseContainer={containerRef}
              >
                <div className="h-full">
                  <div className="px-6 py-4 border-b border-white/10">
                    <h3 className="font-medium flex items-center gap-2">
                      <Server className="w-5 h-5 text-success" />
                      系统状态
                    </h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {systemStatuses.map((system, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {getStatusIcon(system.status)}
                          <div>
                            <p className="text-sm font-medium">{system.name}</p>
                            <p className="text-xs text-muted-foreground">
                              延迟: {system.latency}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {system.uptime}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </LiquidGlass>
            </div>
          </div>

          {/* Resources and Requests Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Resource Usage */}
            <LiquidGlass
              displacementScale={65}
              blurAmount={0.35}
              saturation={130}
              aberrationIntensity={1.5}
              elasticity={0.12}
              cornerRadius={24}
              padding="24px"
              mouseContainer={containerRef}
            >
              <div className="space-y-6">
                <h3 className="font-medium flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-warning" />
                  资源使用情况
                </h3>
                
                <div className="space-y-4">
                  {/* CPU */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-muted-foreground" />
                        CPU 使用率
                      </span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[45%] bg-gradient-to-r from-success to-success/70 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Memory */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-muted-foreground" />
                        内存使用
                      </span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[68%] bg-gradient-to-r from-warning to-warning/70 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Network */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-muted-foreground" />
                        网络带宽
                      </span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[32%] bg-gradient-to-r from-accent to-accent/70 rounded-full" />
                    </div>
                  </div>
                  
                  {/* GPU */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-muted-foreground" />
                        GPU 使用率
                      </span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-gradient-to-r from-destructive to-destructive/70 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </LiquidGlass>

            {/* Recent Requests */}
            <LiquidGlass
              displacementScale={65}
              blurAmount={0.35}
              saturation={130}
              aberrationIntensity={1.5}
              elasticity={0.12}
              cornerRadius={24}
              padding="0"
              mouseContainer={containerRef}
            >
              <div className="h-full">
                <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="font-medium flex items-center gap-2">
                    <Activity className="w-5 h-5 text-accent" />
                    API 请求
                  </h3>
                  <span className="text-xs text-muted-foreground">最近 1 小时</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">路径</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">状态</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">请求数</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">平均时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentRequests.map((req) => (
                        <tr key={req.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-3 text-sm font-mono">{req.path}</td>
                          <td className="px-6 py-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              req.status === "2XX" ? "bg-success/20 text-success" :
                              req.status === "4XX" ? "bg-warning/20 text-warning" :
                              "bg-destructive/20 text-destructive"
                            }`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-sm text-right">{req.requests}</td>
                          <td className="px-6 py-3 text-sm text-right text-muted-foreground">{req.avgTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </LiquidGlass>
          </div>
        </div>
      </main>
    </div>
  )
}
