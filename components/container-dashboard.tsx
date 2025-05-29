"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import {
  Play,
  Square,
  RotateCcw,
  Terminal,
  MoreHorizontal,
  Activity,
  HardDrive,
  Cpu,
  Network,
  Container,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  Upload,
  Settings,
  BarChart3,
  FileText,
  Wifi,
  Database,
  MapPin,
  Layers,
  Search,
  Filter,
  SortAsc,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Enhanced container data with more dynamic properties
const initialContainers = [
  {
    id: "web-server",
    name: "nginx-web",
    image: "nginx:latest",
    status: "running",
    uptime: "2 days",
    cpu: 12,
    memory: 256,
    memoryLimit: 512,
    network: { in: 2.1, out: 1.8 },
    ports: ["80:8080", "443:8443"],
    security: { score: 85, vulnerabilities: 2 },
    health: "healthy",
    restarts: 0,
    logs: [
      "[2024-01-15 10:30:15] [INFO] Server started on port 80",
      "[2024-01-15 10:30:16] [INFO] SSL certificate loaded successfully",
      "[2024-01-15 10:31:22] [INFO] New connection from 192.168.1.100",
      "[2024-01-15 10:32:45] [WARN] High memory usage detected",
      "[2024-01-15 10:33:12] [INFO] Cache cleared successfully",
      "[2024-01-15 10:34:01] [INFO] Processing 150 requests/sec",
    ],
    metrics: {
      cpuHistory: [8, 12, 15, 18, 12, 10, 14, 16, 12, 9],
      memoryHistory: [200, 220, 240, 256, 250, 245, 260, 255, 256, 250],
      networkHistory: [1.8, 2.1, 2.3, 1.9, 2.0, 2.1, 1.7, 2.2, 2.1, 1.9],
    },
    environment: {
      NODE_ENV: "production",
      PORT: "80",
      SSL_ENABLED: "true",
      MAX_CONNECTIONS: "1000",
    },
    volumes: ["/var/www/html", "/etc/nginx/conf.d"],
    networks: ["frontend", "monitoring"],
  },
  {
    id: "database",
    name: "postgres-db",
    image: "postgres:15",
    status: "running",
    uptime: "5 days",
    cpu: 8,
    memory: 512,
    memoryLimit: 1024,
    network: { in: 1.8, out: 0.9 },
    ports: ["5432:5432"],
    security: { score: 92, vulnerabilities: 0 },
    health: "healthy",
    restarts: 0,
    logs: [
      "[2024-01-10 08:15:30] [INFO] Database ready for connections",
      "[2024-01-10 08:16:45] [INFO] Checkpoint completed successfully",
      "[2024-01-15 09:22:10] [INFO] Query executed in 0.05ms",
      "[2024-01-15 10:15:33] [INFO] Backup completed successfully",
      "[2024-01-15 10:30:22] [INFO] Connection pool: 45/100 active",
      "[2024-01-15 10:35:15] [INFO] Index optimization completed",
    ],
    metrics: {
      cpuHistory: [5, 8, 6, 9, 7, 8, 10, 8, 7, 8],
      memoryHistory: [480, 500, 512, 520, 515, 512, 508, 512, 510, 512],
      networkHistory: [1.5, 1.8, 1.6, 1.9, 1.7, 1.8, 1.4, 2.0, 1.8, 1.6],
    },
    environment: {
      POSTGRES_DB: "app_production",
      POSTGRES_USER: "app_user",
      MAX_CONNECTIONS: "100",
      SHARED_BUFFERS: "256MB",
    },
    volumes: ["/var/lib/postgresql/data", "/backup"],
    networks: ["backend", "monitoring"],
  },
  {
    id: "redis-cache",
    name: "redis-cache",
    image: "redis:7-alpine",
    status: "stopped",
    uptime: "0 minutes",
    cpu: 0,
    memory: 0,
    memoryLimit: 256,
    network: { in: 0, out: 0 },
    ports: ["6379:6379"],
    security: { score: 88, vulnerabilities: 1 },
    health: "unhealthy",
    restarts: 3,
    logs: [
      "[2024-01-15 09:45:22] [ERROR] Connection refused - port 6379",
      "[2024-01-15 09:45:23] [WARN] Max memory reached, evicting keys",
      "[2024-01-15 09:45:24] [ERROR] Failed to bind to port 6379",
      "[2024-01-15 09:45:25] [INFO] Attempting restart...",
      "[2024-01-15 09:45:26] [ERROR] Restart failed - memory limit exceeded",
      "[2024-01-15 09:45:27] [WARN] Container stopped due to repeated failures",
    ],
    metrics: {
      cpuHistory: [15, 20, 25, 30, 0, 0, 0, 0, 0, 0],
      memoryHistory: [180, 200, 220, 256, 0, 0, 0, 0, 0, 0],
      networkHistory: [2.1, 2.5, 2.8, 3.0, 0, 0, 0, 0, 0, 0],
    },
    environment: {
      REDIS_PASSWORD: "***hidden***",
      MAXMEMORY: "256mb",
      MAXMEMORY_POLICY: "allkeys-lru",
    },
    volumes: ["/data"],
    networks: ["backend", "cache"],
  },
]

export function ContainerDashboard() {
  const [view, setView] = useState("grid")
  const [containers, setContainers] = useState(initialContainers)
  const [stats, setStats] = useState({
    total: 12,
    running: 8,
    stopped: 4,
    totalCpu: 23,
    totalMemory: 1.2,
    networkIO: 4.2,
    alerts: 3,
  })
  const [newContainers, setNewContainers] = useState<string[]>([])
  const [notifications, setNotifications] = useState(3)

  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("status-priority")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Modal/Drawer states
  const [logsModal, setLogsModal] = useState<{ open: boolean; container: any }>({ open: false, container: null })
  const [terminalDrawer, setTerminalDrawer] = useState<{ open: boolean; container: any }>({
    open: false,
    container: null,
  })
  const [metricsModal, setMetricsModal] = useState<{ open: boolean; container: any }>({ open: false, container: null })
  const [configModal, setConfigModal] = useState<{ open: boolean; container: any }>({ open: false, container: null })

  // Live terminal output
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [terminalInput, setTerminalInput] = useState("")

  // Simulate real-time logs
  const [liveLogs, setLiveLogs] = useState<{ [key: string]: string[] }>({})

  // Simulate real-time container events
  const simulateContainerEvents = useCallback(() => {
    setContainers((prev) =>
      prev.map((container) => {
        const events = Math.random()

        // Random CPU fluctuation
        if (container.status === "running" && events > 0.7) {
          const newCpu = Math.max(0, Math.min(100, container.cpu + (Math.random() - 0.5) * 10))
          return {
            ...container,
            cpu: Math.round(newCpu),
            metrics: {
              ...container.metrics,
              cpuHistory: [...container.metrics.cpuHistory.slice(1), Math.round(newCpu)],
            },
          }
        }

        // Random memory changes
        if (container.status === "running" && events > 0.8) {
          const newMemory = Math.max(0, Math.min(container.memoryLimit, container.memory + (Math.random() - 0.5) * 50))
          return {
            ...container,
            memory: Math.round(newMemory),
            metrics: {
              ...container.metrics,
              memoryHistory: [...container.metrics.memoryHistory.slice(1), Math.round(newMemory)],
            },
          }
        }

        // Network activity
        if (container.status === "running" && events > 0.6) {
          const newNetworkIn = Math.max(0, container.network.in + (Math.random() - 0.5) * 0.5)
          return {
            ...container,
            network: {
              in: newNetworkIn,
              out: Math.max(0, container.network.out + (Math.random() - 0.5) * 0.3),
            },
            metrics: {
              ...container.metrics,
              networkHistory: [...container.metrics.networkHistory.slice(1), newNetworkIn],
            },
          }
        }

        return container
      }),
    )
  }, [])

  // Simulate live logs
  const simulateLiveLogs = useCallback(() => {
    const logMessages = [
      "[INFO] Processing request from client",
      "[INFO] Cache hit for key: user_session_123",
      "[WARN] High CPU usage detected",
      "[INFO] Database query completed in 0.03ms",
      "[INFO] SSL handshake successful",
      "[ERROR] Connection timeout after 30s",
      "[INFO] Memory usage: 67% of limit",
      "[INFO] Backup process started",
      "[WARN] Disk space running low",
      "[INFO] Health check passed",
    ]

    setContainers((prev) =>
      prev.map((container) => {
        if (container.status === "running" && Math.random() > 0.8) {
          const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ")
          const message = logMessages[Math.floor(Math.random() * logMessages.length)]
          const newLog = `[${timestamp}] ${message}`

          return {
            ...container,
            logs: [...container.logs.slice(-5), newLog],
          }
        }
        return container
      }),
    )
  }, [])

  // Simulate terminal commands
  const simulateTerminalCommand = (command: string) => {
    const responses: { [key: string]: string[] } = {
      ls: ["app.js", "package.json", "node_modules", "public", "views"],
      "ps aux": ["PID  USER  %CPU %MEM    VSZ   RSS TTY", "1    root   0.1  0.5  12345  6789 ?"],
      top: ["Tasks: 15 total, 1 running, 14 sleeping", "Cpu(s): 12.5%us, 2.1%sy"],
      "df -h": ["Filesystem  Size  Used Avail Use%", "/dev/sda1   20G   8G   11G  42%"],
      "netstat -an": ["Active Internet connections", "tcp  0  0  0.0.0.0:80  LISTEN"],
      "docker stats": ["CONTAINER  CPU %  MEM USAGE", "nginx-web  12.5%  256MB"],
    }

    const response = responses[command] || [`Command '${command}' executed successfully`]

    setTerminalOutput((prev) => [...prev, `$ ${command}`, ...response, ""])
  }

  // Simulate new container deployments
  const simulateNewContainer = useCallback(() => {
    const newContainerNames = [
      "api-gateway",
      "auth-service",
      "payment-processor",
      "notification-service",
      "analytics-engine",
      "file-storage",
    ]

    const randomName = newContainerNames[Math.floor(Math.random() * newContainerNames.length)]
    const newContainer = {
      id: `${randomName}-${Date.now()}`,
      name: randomName,
      image: `${randomName}:latest`,
      status: "starting" as const,
      uptime: "0 seconds",
      cpu: 0,
      memory: Math.floor(Math.random() * 200) + 50,
      memoryLimit: 512,
      network: { in: 0, out: 0 },
      ports: [`${Math.floor(Math.random() * 9000) + 3000}:${Math.floor(Math.random() * 9000) + 3000}`],
      security: { score: Math.floor(Math.random() * 30) + 70, vulnerabilities: Math.floor(Math.random() * 3) },
      health: "starting" as const,
      restarts: 0,
      logs: [`[INFO] Starting ${randomName}...`, "[INFO] Initializing components"],
      metrics: {
        cpuHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        memoryHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        networkHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      environment: {
        NODE_ENV: "production",
        PORT: "3000",
        SERVICE_NAME: randomName,
      },
      volumes: ["/app", "/logs"],
      networks: ["backend", "monitoring"],
    }

    setContainers((prev) => [...prev, newContainer])
    setNewContainers((prev) => [...prev, newContainer.id])
    setStats((prev) => ({ ...prev, total: prev.total + 1 }))

    toast({
      title: "🚀 New Container Deployed",
      description: `${randomName} is starting up`,
    })

    setNotifications((prev) => prev + 1)

    setTimeout(() => {
      setNewContainers((prev) => prev.filter((id) => id !== newContainer.id))
      setContainers((prev) =>
        prev.map((c) =>
          c.id === newContainer.id ? { ...c, status: "running", health: "healthy", uptime: "1 minute" } : c,
        ),
      )
      setStats((prev) => ({ ...prev, running: prev.running + 1 }))
    }, 3000)
  }, [])

  // Set up intervals for simulations
  useEffect(() => {
    const intervals = [
      setInterval(simulateContainerEvents, 2000),
      setInterval(simulateLiveLogs, 3000),
      setInterval(simulateNewContainer, 15000),
    ]

    return () => intervals.forEach(clearInterval)
  }, [simulateContainerEvents, simulateLiveLogs, simulateNewContainer])

  // Update overall stats based on container changes
  useEffect(() => {
    const runningCount = containers.filter((c) => c.status === "running").length
    const stoppedCount = containers.filter((c) => c.status === "stopped").length
    const totalCpu = containers.reduce((sum, c) => sum + (c.status === "running" ? c.cpu : 0), 0)
    const totalMemory = containers.reduce((sum, c) => sum + (c.status === "running" ? c.memory : 0), 0) / 1000
    const totalNetworkIO = containers.reduce(
      (sum, c) => sum + (c.status === "running" ? c.network.in + c.network.out : 0),
      0,
    )

    setStats((prev) => ({
      ...prev,
      running: runningCount,
      stopped: stoppedCount,
      totalCpu: Math.round(totalCpu / Math.max(runningCount, 1)),
      totalMemory: Math.round(totalMemory * 10) / 10,
      networkIO: Math.round(totalNetworkIO * 10) / 10,
    }))
  }, [containers])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500"
      case "starting":
        return "bg-yellow-500 animate-pulse"
      case "stopped":
        return "bg-red-500"
      case "paused":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "unhealthy":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "starting":
        return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />
    }
  }

  const getSecurityColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusPriority = (status: string) => {
    const priorities = {
      running: 1,
      starting: 2,
      building: 3,
      stopped: 4,
      error: 5,
      paused: 6,
    }
    return priorities[status as keyof typeof priorities] || 7
  }

  const filteredAndSortedContainers = useMemo(() => {
    let filtered = containers

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((container) => container.status === statusFilter)
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (container) =>
          container.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          container.image.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "status-priority":
          return getStatusPriority(a.status) - getStatusPriority(b.status)
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "cpu-high":
          return b.cpu - a.cpu
        case "cpu-low":
          return a.cpu - b.cpu
        case "memory-high":
          return b.memory - a.memory
        case "memory-low":
          return a.memory - b.memory
        case "security-high":
          return b.security.score - a.security.score
        case "security-low":
          return a.security.score - b.security.score
        default:
          return 0
      }
    })

    return sorted
  }, [containers, statusFilter, sortBy, searchQuery])

  const handleContainerAction = (containerId: string, action: string) => {
    const container = containers.find((c) => c.id === containerId)
    if (!container) return

    switch (action) {
      case "logs":
        setLogsModal({ open: true, container })
        break
      case "terminal":
        setTerminalDrawer({ open: true, container })
        setTerminalOutput([
          `Connected to ${container.name}`,
          `Container ID: ${container.id}`,
          `Image: ${container.image}`,
          `Status: ${container.status}`,
          "",
          "Type 'help' for available commands",
          "",
        ])
        break
      case "metrics":
        setMetricsModal({ open: true, container })
        break
      case "config":
        setConfigModal({ open: true, container })
        break
      case "start":
        setContainers((prev) =>
          prev.map((c) =>
            c.id === containerId ? { ...c, status: "running", health: "healthy", uptime: "0 seconds" } : c,
          ),
        )
        toast({
          title: "▶️ Container Started",
          description: `${container.name} is now running`,
        })
        break
      case "stop":
        setContainers((prev) =>
          prev.map((c) =>
            c.id === containerId ? { ...c, status: "stopped", health: "unhealthy", cpu: 0, memory: 0 } : c,
          ),
        )
        toast({
          title: "⏹️ Container Stopped",
          description: `${container.name} has been stopped`,
        })
        break
      case "restart":
        setContainers((prev) =>
          prev.map((c) =>
            c.id === containerId ? { ...c, status: "starting", health: "starting", restarts: c.restarts + 1 } : c,
          ),
        )
        toast({
          title: "🔄 Container Restarted",
          description: `${container.name} is restarting`,
        })
        setTimeout(() => {
          setContainers((prev) =>
            prev.map((c) => (c.id === containerId ? { ...c, status: "running", health: "healthy" } : c)),
          )
        }, 2000)
        break
    }

    setNotifications((prev) => prev + 1)
  }

  const MiniChart = ({ data, color = "blue" }: { data: number[]; color?: string }) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    return (
      <div className="flex items-end gap-1 h-8">
        {data.map((value, index) => (
          <div
            key={index}
            className={`w-2 bg-${color}-500 rounded-t-[var(--border-radius)] transition-all duration-300`}
            style={{
              height: `${((value - min) / range) * 100}%`,
              minHeight: "2px",
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Containers
            <Badge variant="secondary" className="animate-pulse">
              LIVE
            </Badge>
          </h1>
          <p className="text-muted-foreground">Real-time container monitoring and management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => simulateNewContainer()}>
            <Play className="w-4 h-4 mr-2" />
            Deploy Container
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Containers</CardTitle>
            <Container className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stats.running} running</span>,{" "}
              <span className="text-red-600">{stats.stopped} stopped</span>
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 animate-pulse" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {stats.totalCpu}%
              {stats.totalCpu > 50 ? (
                <TrendingUp className="w-4 h-4 text-red-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-500" />
              )}
            </div>
            <Progress className="h-2 mt-2" value={stats.totalCpu} />
            <p className="text-xs text-muted-foreground mt-1">Average across running containers</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMemory} GB</div>
            <p className="text-xs text-muted-foreground">Total memory consumed</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network I/O</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {stats.networkIO} MB/s
              <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
            </div>
            <p className="text-xs text-muted-foreground">Combined network traffic</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse" />
          </CardContent>
        </Card>
      </div>

      {/* View Tabs */}
      <Tabs value={view} onValueChange={setView}>
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="metrics">Live Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          {/* Filtering and Sorting Toolbar */}
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-1">
                {/* Search */}
                <div className="relative min-w-[250px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search containers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="running">🟢 Running</SelectItem>
                    <SelectItem value="starting">🟡 Starting</SelectItem>
                    <SelectItem value="building">🔵 Building</SelectItem>
                    <SelectItem value="stopped">⚫ Stopped</SelectItem>
                    <SelectItem value="error">🔴 Error</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Options */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="status-priority">Status Priority</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="cpu-high">CPU (High-Low)</SelectItem>
                    <SelectItem value="cpu-low">CPU (Low-High)</SelectItem>
                    <SelectItem value="memory-high">Memory (High-Low)</SelectItem>
                    <SelectItem value="memory-low">Memory (Low-High)</SelectItem>
                    <SelectItem value="security-high">Security (Best-Worst)</SelectItem>
                    <SelectItem value="security-low">Security (Worst-Best)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results and Clear */}
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="whitespace-nowrap">
                  {filteredAndSortedContainers.length} of {containers.length} containers
                </Badge>
                {(statusFilter !== "all" || searchQuery || sortBy !== "status-priority") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStatusFilter("all")
                      setSearchQuery("")
                      setSortBy("status-priority")
                    }}
                    className="whitespace-nowrap"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedContainers.map((container) => (
              <Card
                key={container.id}
                className={cn(
                  "hover:shadow-lg transition-all duration-300 relative overflow-hidden",
                  newContainers.includes(container.id) && "animate-in slide-in-from-bottom-4 duration-500",
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(container.status)}`} />
                      <CardTitle className="text-lg">{container.name}</CardTitle>
                      {getHealthIcon(container.health)}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleContainerAction(container.id, "start")}>
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleContainerAction(container.id, "stop")}>
                          <Square className="w-4 h-4 mr-2" />
                          Stop
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleContainerAction(container.id, "restart")}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Restart
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleContainerAction(container.id, "terminal")}>
                          <Terminal className="w-4 h-4 mr-2" />
                          Terminal
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleContainerAction(container.id, "logs")}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Logs
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleContainerAction(container.id, "metrics")}>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Metrics
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleContainerAction(container.id, "config")}>
                          <Settings className="w-4 h-4 mr-2" />
                          Configuration
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-muted-foreground">{container.image}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Status</span>
                    <Badge
                      variant={
                        container.status === "running"
                          ? "default"
                          : container.status === "starting"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {container.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Uptime</span>
                    <span className="text-muted-foreground">{container.uptime}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>CPU</span>
                      <span className="text-muted-foreground">{container.cpu}%</span>
                    </div>
                    <Progress className="h-2" value={container.cpu} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Memory</span>
                      <span className="text-muted-foreground">
                        {container.memory}/{container.memoryLimit} MB
                      </span>
                    </div>
                    <Progress className="h-2" value={(container.memory / container.memoryLimit) * 100} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Network</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {container.network.in.toFixed(1)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        {container.network.out.toFixed(1)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Security Score</span>
                    <span className={getSecurityColor(container.security.score)}>{container.security.score}/100</span>
                  </div>
                  {container.restarts > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span>Restarts</span>
                      <Badge variant="outline" className="text-yellow-600">
                        {container.restarts}
                      </Badge>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {container.ports.map((port) => (
                      <Badge key={port} variant="outline" className="text-xs">
                        {port}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                {newContainers.includes(container.id) && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs rounded-bl">NEW</div>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          {/* Filtering and Sorting Toolbar */}
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-1">
                {/* Search */}
                <div className="relative min-w-[250px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search containers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="running">🟢 Running</SelectItem>
                    <SelectItem value="starting">🟡 Starting</SelectItem>
                    <SelectItem value="building">🔵 Building</SelectItem>
                    <SelectItem value="stopped">⚫ Stopped</SelectItem>
                    <SelectItem value="error">🔴 Error</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Options */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="status-priority">Status Priority</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="cpu-high">CPU (High-Low)</SelectItem>
                    <SelectItem value="cpu-low">CPU (Low-High)</SelectItem>
                    <SelectItem value="memory-high">Memory (High-Low)</SelectItem>
                    <SelectItem value="memory-low">Memory (Low-High)</SelectItem>
                    <SelectItem value="security-high">Security (Best-Worst)</SelectItem>
                    <SelectItem value="security-low">Security (Worst-Best)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results and Clear */}
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="whitespace-nowrap">
                  {filteredAndSortedContainers.length} of {containers.length} containers
                </Badge>
                {(statusFilter !== "all" || searchQuery || sortBy !== "status-priority") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStatusFilter("all")
                      setSearchQuery("")
                      setSortBy("status-priority")
                    }}
                    className="whitespace-nowrap"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredAndSortedContainers.map((container) => (
                  <div
                    key={container.id}
                    className={cn(
                      "flex items-center justify-between p-4 hover:bg-muted/50 transition-colors",
                      newContainers.includes(container.id) && "bg-green-50 animate-pulse",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(container.status)}`} />
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {container.name}
                          {getHealthIcon(container.health)}
                        </div>
                        <div className="text-sm text-muted-foreground">{container.image}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{container.cpu}%</div>
                        <div className="text-muted-foreground">CPU</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{container.memory} MB</div>
                        <div className="text-muted-foreground">Memory</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{container.uptime}</div>
                        <div className="text-muted-foreground">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {container.network.in.toFixed(1)}
                        </div>
                        <div className="text-muted-foreground">MB/s</div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleContainerAction(container.id, "start")}>
                            Start
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleContainerAction(container.id, "stop")}>
                            Stop
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleContainerAction(container.id, "restart")}>
                            Restart
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleContainerAction(container.id, "terminal")}>
                            Terminal
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleContainerAction(container.id, "logs")}>
                            View Logs
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleContainerAction(container.id, "metrics")}>
                            Metrics
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  System Performance
                  <Badge variant="outline" className="animate-pulse">
                    LIVE
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>{stats.totalCpu}%</span>
                    </div>
                    <Progress className="h-2" value={stats.totalCpu} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>{Math.round((stats.totalMemory / 8) * 100)}%</span>
                    </div>
                    <Progress className="h-2" value={(stats.totalMemory / 8) * 100} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Network I/O</span>
                      <span>{stats.networkIO} MB/s</span>
                    </div>
                    <Progress className="h-2" value={Math.min(100, (stats.networkIO / 10) * 100)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Overview
                  {stats.alerts > 0 && (
                    <Badge variant="destructive" className="animate-pulse">
                      {stats.alerts}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Vulnerabilities</span>
                    <Badge variant="destructive">
                      {containers.reduce((sum, c) => sum + c.security.vulnerabilities, 0)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Critical Alerts</span>
                    <Badge variant="destructive" className="animate-pulse">
                      {stats.alerts}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Containers at Risk</span>
                    <Badge variant="secondary">{containers.filter((c) => c.security.score < 80).length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Security Score</span>
                    <span className="font-medium text-yellow-600">
                      {Math.round(containers.reduce((sum, c) => sum + c.security.score, 0) / containers.length)}/100
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Logs Modal */}
      <Dialog open={logsModal.open} onOpenChange={(open) => setLogsModal({ open, container: null })}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Container Logs - {logsModal.container?.name}
              <Badge variant="outline" className="animate-pulse">
                LIVE
              </Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant={logsModal.container?.status === "running" ? "default" : "destructive"}>
                {logsModal.container?.status}
              </Badge>
              <span className="text-sm text-muted-foreground">Image: {logsModal.container?.image}</span>
              <span className="text-sm text-muted-foreground">Uptime: {logsModal.container?.uptime}</span>
            </div>
            <ScrollArea className="h-96 w-full border rounded-md p-4 bg-black text-green-400 font-mono text-sm">
              <div className="space-y-1">
                {logsModal.container?.logs.map((log, index) => (
                  <div key={index} className="hover:bg-gray-800 px-2 py-1 rounded transition-colors">
                    {log}
                  </div>
                ))}
                <div className="text-yellow-400 animate-pulse">● Live logs streaming...</div>
              </div>
            </ScrollArea>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Logs
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Follow Logs
              </Button>
              <Button variant="outline" size="sm">
                Clear Logs
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terminal Drawer */}
      <Sheet open={terminalDrawer.open} onOpenChange={(open) => setTerminalDrawer({ open, container: null })}>
        <SheetContent side="bottom" className="h-[60vh]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Terminal - {terminalDrawer.container?.name}
              <Badge variant="outline" className="animate-pulse">
                CONNECTED
              </Badge>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <ScrollArea className="h-80 w-full border rounded-md p-4 bg-black text-green-400 font-mono text-sm">
              <div className="space-y-1">
                {terminalOutput.map((line, index) => (
                  <div key={index} className={line.startsWith("$") ? "text-yellow-400" : "text-green-400"}>
                    {line}
                  </div>
                ))}
                <div className="flex items-center">
                  <span className="text-yellow-400">$ </span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => simulateTerminalCommand("ls")}>
                ls
              </Button>
              <Button variant="outline" size="sm" onClick={() => simulateTerminalCommand("ps aux")}>
                ps aux
              </Button>
              <Button variant="outline" size="sm" onClick={() => simulateTerminalCommand("top")}>
                top
              </Button>
              <Button variant="outline" size="sm" onClick={() => simulateTerminalCommand("docker stats")}>
                docker stats
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Metrics Modal */}
      <Dialog open={metricsModal.open} onOpenChange={(open) => setMetricsModal({ open, container: null })}>
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Metrics - {metricsModal.container?.name}
              <Badge variant="outline" className="animate-pulse">
                REAL-TIME
              </Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    CPU Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{metricsModal.container?.cpu}%</div>
                  <MiniChart data={metricsModal.container?.metrics.cpuHistory || []} color="blue" />
                </CardContent>
              </Card>
              <Card className="">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <HardDrive className="w-4 h-4" />
                    Memory Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{metricsModal.container?.memory} MB</div>
                  <MiniChart data={metricsModal.container?.metrics.memoryHistory || []} color="green" />
                </CardContent>
              </Card>
              <Card className="">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Network className="w-4 h-4" />
                    Network I/O
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{metricsModal.container?.network.in.toFixed(1)} MB/s</div>
                  <MiniChart data={metricsModal.container?.metrics.networkHistory || []} color="purple" />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="">
                <CardHeader>
                  <CardTitle className="text-sm">Resource Limits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory</span>
                      <span>
                        {metricsModal.container?.memory}/{metricsModal.container?.memoryLimit} MB
                      </span>
                    </div>
                    <Progress
                      className="h-2"
                      value={(metricsModal.container?.memory / metricsModal.container?.memoryLimit) * 100}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU</span>
                      <span>{metricsModal.container?.cpu}%</span>
                    </div>
                    <Progress className="h-2" value={metricsModal.container?.cpu} />
                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader>
                  <CardTitle className="text-sm">Health Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge variant={metricsModal.container?.status === "running" ? "default" : "destructive"}>
                      {metricsModal.container?.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Health</span>
                    <div className="flex items-center gap-2">
                      {getHealthIcon(metricsModal.container?.health)}
                      <span className="text-sm">{metricsModal.container?.health}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Restarts</span>
                    <Badge variant="outline">{metricsModal.container?.restarts}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Configuration Modal */}
      <Dialog open={configModal.open} onOpenChange={(open) => setConfigModal({ open, container: null })}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configuration - {configModal.container?.name}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6">
              <Card className="">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Environment Variables
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(configModal.container?.environment || {}).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="font-mono text-sm">{key}</span>
                        <span className="font-mono text-sm text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <HardDrive className="w-4 h-4" />
                    Volumes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {configModal.container?.volumes.map((volume, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <Layers className="w-4 h-4" />
                        <span className="font-mono text-sm">{volume}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Wifi className="w-4 h-4" />
                    Networks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {configModal.container?.networks.map((network, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <Network className="w-4 h-4" />
                        <span className="font-mono text-sm">{network}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Port Mappings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {configModal.container?.ports.map((port, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <Network className="w-4 h-4" />
                        <span className="font-mono text-sm">{port}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
