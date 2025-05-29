"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Container,
  Shield,
  HardDrive,
  Network,
  Play,
  Square,
  RotateCcw,
  Terminal,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
  MemoryStick,
  Database,
  Globe,
  TrendingUp,
  Eye,
  Settings,
  Download,
  Upload,
  Layers,
  Package,
  Monitor,
  BarChart3,
  Gauge,
} from "lucide-react"

interface ContainerData {
  id: string
  name: string
  image: string
  status: "running" | "stopped" | "building" | "error" | "starting"
  uptime: string
  cpu: number
  memory: number
  memoryLimit: number
  networkIn: number
  networkOut: number
  diskRead: number
  diskWrite: number
  securityScore: number
  vulnerabilities: number
  ports: string[]
  volumes: string[]
  networks: string[]
  environment: string
  restartPolicy: string
  lastUpdated: string
  healthStatus: "healthy" | "unhealthy" | "starting" | "none"
}

const mockContainers: ContainerData[] = [
  {
    id: "nginx-web-001",
    name: "nginx-web-server",
    image: "nginx:1.25-alpine",
    status: "running",
    uptime: "2d 14h 32m",
    cpu: 12,
    memory: 64,
    memoryLimit: 512,
    networkIn: 1.2,
    networkOut: 2.8,
    diskRead: 0.5,
    diskWrite: 0.1,
    securityScore: 95,
    vulnerabilities: 0,
    ports: ["80:80", "443:443"],
    volumes: ["/var/log/nginx", "/etc/nginx/conf.d"],
    networks: ["web-network", "monitoring"],
    environment: "production",
    restartPolicy: "unless-stopped",
    lastUpdated: "2 hours ago",
    healthStatus: "healthy",
  },
  {
    id: "redis-cache-001",
    name: "redis-cache",
    image: "redis:7.2-alpine",
    status: "running",
    uptime: "5d 8h 15m",
    cpu: 8,
    memory: 128,
    memoryLimit: 256,
    networkIn: 0.8,
    networkOut: 1.2,
    diskRead: 2.1,
    diskWrite: 1.8,
    securityScore: 88,
    vulnerabilities: 1,
    ports: ["6379:6379"],
    volumes: ["/data"],
    networks: ["backend-network"],
    environment: "production",
    restartPolicy: "always",
    lastUpdated: "1 hour ago",
    healthStatus: "healthy",
  },
  {
    id: "postgres-db-001",
    name: "postgres-primary",
    image: "postgres:15.4-alpine",
    status: "running",
    uptime: "12d 3h 45m",
    cpu: 25,
    memory: 512,
    memoryLimit: 1024,
    networkIn: 2.5,
    networkOut: 1.8,
    diskRead: 15.2,
    diskWrite: 8.7,
    securityScore: 92,
    vulnerabilities: 0,
    ports: ["5432:5432"],
    volumes: ["/var/lib/postgresql/data", "/backup"],
    networks: ["backend-network", "db-network"],
    environment: "production",
    restartPolicy: "unless-stopped",
    lastUpdated: "30 minutes ago",
    healthStatus: "healthy",
  },
  {
    id: "api-server-001",
    name: "api-gateway",
    image: "node:18-alpine",
    status: "building",
    uptime: "0m",
    cpu: 0,
    memory: 0,
    memoryLimit: 512,
    networkIn: 0,
    networkOut: 0,
    diskRead: 0,
    diskWrite: 0,
    securityScore: 85,
    vulnerabilities: 2,
    ports: ["3000:3000", "3001:3001"],
    volumes: ["/app/logs", "/app/uploads"],
    networks: ["web-network", "backend-network"],
    environment: "staging",
    restartPolicy: "on-failure",
    lastUpdated: "Building...",
    healthStatus: "none",
  },
  {
    id: "monitoring-001",
    name: "prometheus-monitoring",
    image: "prom/prometheus:latest",
    status: "running",
    uptime: "7d 12h 8m",
    cpu: 15,
    memory: 256,
    memoryLimit: 512,
    networkIn: 1.5,
    networkOut: 3.2,
    diskRead: 5.8,
    diskWrite: 2.1,
    securityScore: 90,
    vulnerabilities: 1,
    ports: ["9090:9090"],
    volumes: ["/prometheus", "/etc/prometheus"],
    networks: ["monitoring"],
    environment: "production",
    restartPolicy: "unless-stopped",
    lastUpdated: "15 minutes ago",
    healthStatus: "healthy",
  },
  {
    id: "security-scanner-001",
    name: "trivy-scanner",
    image: "aquasec/trivy:latest",
    status: "stopped",
    uptime: "0m",
    cpu: 0,
    memory: 0,
    memoryLimit: 256,
    networkIn: 0,
    networkOut: 0,
    diskRead: 0,
    diskWrite: 0,
    securityScore: 98,
    vulnerabilities: 0,
    ports: [],
    volumes: ["/var/run/docker.sock", "/tmp/trivy"],
    networks: ["security-network"],
    environment: "production",
    restartPolicy: "no",
    lastUpdated: "2 days ago",
    healthStatus: "none",
  },
]

export default function AdvancedContainerDashboard() {
  const { toast } = useToast()
  const [containers, setContainers] = useState<ContainerData[]>(mockContainers)
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "topology" | "metrics">("grid")

  const getStatusColor = (status: ContainerData["status"]) => {
    switch (status) {
      case "running":
        return "bg-green-500"
      case "stopped":
        return "bg-gray-500"
      case "building":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      case "starting":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getHealthColor = (health: ContainerData["healthStatus"]) => {
    switch (health) {
      case "healthy":
        return "text-green-500"
      case "unhealthy":
        return "text-red-500"
      case "starting":
        return "text-yellow-500"
      case "none":
        return "text-gray-500"
      default:
        return "text-gray-500"
    }
  }

  const getSecurityBadgeVariant = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 75) return "secondary"
    return "destructive"
  }

  const handleContainerAction = (action: string, containerId: string) => {
    const container = containers.find((c) => c.id === containerId)
    toast({
      title: `${action} Container`,
      description: `${action} ${container?.name || containerId}`,
    })
  }

  const ContainerCard = ({ container }: { container: ContainerData }) => (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
        selectedContainer === container.id ? "ring-2 ring-blue-500" : ""
      }`}
    >
      {/* Status indicator bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${getStatusColor(container.status)}`} />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Container className="h-8 w-8 text-blue-600" />
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(container.status)} border-2 border-white`}
              />
            </div>
            <div>
              <CardTitle className="text-lg">{container.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Package className="h-3 w-3" />
                {container.image}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant={container.status === "running" ? "default" : "secondary"}>{container.status}</Badge>
            <Badge variant="outline" className="text-xs">
              {container.environment}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1">
                <Cpu className="h-3 w-3" />
                CPU
              </span>
              <span className="font-mono">{container.cpu}%</span>
            </div>
            <Progress value={container.cpu} className="h-1" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1">
                <MemoryStick className="h-3 w-3" />
                Memory
              </span>
              <span className="font-mono">{container.memory}MB</span>
            </div>
            <Progress value={(container.memory / container.memoryLimit) * 100} className="h-1" />
          </div>
        </div>

        {/* Network & Disk I/O */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Download className="h-3 w-3 text-green-500" />
                In
              </span>
              <span className="font-mono">{container.networkIn} MB/s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Upload className="h-3 w-3 text-blue-500" />
                Out
              </span>
              <span className="font-mono">{container.networkOut} MB/s</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <HardDrive className="h-3 w-3 text-purple-500" />
                Read
              </span>
              <span className="font-mono">{container.diskRead} MB/s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <HardDrive className="h-3 w-3 text-orange-500" />
                Write
              </span>
              <span className="font-mono">{container.diskWrite} MB/s</span>
            </div>
          </div>
        </div>

        {/* Security & Health */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <Badge variant={getSecurityBadgeVariant(container.securityScore)}>
              Security: {container.securityScore}%
            </Badge>
            {container.vulnerabilities > 0 && (
              <Badge variant="destructive" className="text-xs">
                {container.vulnerabilities} CVE
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {container.healthStatus === "healthy" && (
              <CheckCircle className={`h-4 w-4 ${getHealthColor(container.healthStatus)}`} />
            )}
            {container.healthStatus === "unhealthy" && (
              <AlertTriangle className={`h-4 w-4 ${getHealthColor(container.healthStatus)}`} />
            )}
            {container.healthStatus === "starting" && (
              <Clock className={`h-4 w-4 ${getHealthColor(container.healthStatus)}`} />
            )}
            <span className={`text-xs ${getHealthColor(container.healthStatus)}`}>{container.healthStatus}</span>
          </div>
        </div>

        {/* Ports & Volumes */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <Globe className="h-3 w-3" />
            <span>Ports:</span>
            <div className="flex gap-1">
              {container.ports.map((port, idx) => (
                <Badge key={idx} variant="outline" className="text-xs px-1 py-0">
                  {port}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Database className="h-3 w-3" />
            <span>Volumes:</span>
            <span className="text-muted-foreground">{container.volumes.length} mounted</span>
          </div>
        </div>

        {/* Uptime */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Uptime: {container.uptime}
          </span>
          <span>Updated: {container.lastUpdated}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleContainerAction("Start", container.id)}
                  disabled={container.status === "running"}
                >
                  <Play className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Start Container</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleContainerAction("Stop", container.id)}
                  disabled={container.status !== "running"}
                >
                  <Square className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Stop Container</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={() => handleContainerAction("Restart", container.id)}>
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Restart Container</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={() => handleContainerAction("Terminal", container.id)}>
                  <Terminal className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open Terminal</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={() => handleContainerAction("Logs", container.id)}>
                  <FileText className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Logs</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={() => setSelectedContainer(container.id)}>
                  <Eye className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Detailed View</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )

  const TopologyView = () => (
    <div className="relative h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg p-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Network Layers */}
      <div className="relative z-10 h-full">
        <div className="grid grid-cols-3 gap-8 h-full">
          {/* Frontend Layer */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-center text-blue-600">Frontend Layer</h3>
            <div className="space-y-3">
              {containers
                .filter((c) => c.name.includes("nginx") || c.name.includes("web"))
                .map((container) => (
                  <div
                    key={container.id}
                    className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border-l-4 border-blue-500"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(container.status)}`} />
                      <span className="text-sm font-medium">{container.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      CPU: {container.cpu}% | Mem: {container.memory}MB
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Backend Layer */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-center text-green-600">Backend Layer</h3>
            <div className="space-y-3">
              {containers
                .filter((c) => c.name.includes("api") || c.name.includes("server"))
                .map((container) => (
                  <div
                    key={container.id}
                    className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border-l-4 border-green-500"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(container.status)}`} />
                      <span className="text-sm font-medium">{container.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      CPU: {container.cpu}% | Mem: {container.memory}MB
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Data Layer */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-center text-purple-600">Data Layer</h3>
            <div className="space-y-3">
              {containers
                .filter((c) => c.name.includes("postgres") || c.name.includes("redis") || c.name.includes("db"))
                .map((container) => (
                  <div
                    key={container.id}
                    className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border-l-4 border-purple-500"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(container.status)}`} />
                      <span className="text-sm font-medium">{container.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      CPU: {container.cpu}% | Mem: {container.memory}MB
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
          </defs>
          {/* Example connection lines */}
          <line
            x1="33%"
            y1="50%"
            x2="66%"
            y2="50%"
            stroke="#94a3b8"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
            strokeDasharray="5,5"
          />
          <line
            x1="66%"
            y1="50%"
            x2="90%"
            y2="50%"
            stroke="#94a3b8"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
            strokeDasharray="5,5"
          />
        </svg>
      </div>
    </div>
  )

  const MetricsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* System Overview */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            System Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {containers.filter((c) => c.status === "running").length}
              </div>
              <div className="text-sm text-muted-foreground">Running</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {containers.filter((c) => c.status === "stopped").length}
              </div>
              <div className="text-sm text-muted-foreground">Stopped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {containers.reduce((acc, c) => acc + c.cpu, 0).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Total CPU</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(containers.reduce((acc, c) => acc + c.memory, 0) / 1024).toFixed(1)}GB
              </div>
              <div className="text-sm text-muted-foreground">Total Memory</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Container Metrics */}
      {containers
        .filter((c) => c.status === "running")
        .map((container) => (
          <Card key={container.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{container.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(container.status)}`} />
                {container.status}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span>{container.cpu}%</span>
                </div>
                <Progress value={container.cpu} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Memory</span>
                  <span>
                    {container.memory}MB / {container.memoryLimit}MB
                  </span>
                </div>
                <Progress value={(container.memory / container.memoryLimit) * 100} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    Network In
                  </div>
                  <div className="font-mono">{container.networkIn} MB/s</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <TrendingUp className="h-3 w-3" />
                    Network Out
                  </div>
                  <div className="font-mono">{container.networkOut} MB/s</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Container className="h-8 w-8 text-blue-600" />
                Advanced Container Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Visual container management for power users with real-time metrics and security insights
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Monitor className="mr-2 h-4 w-4" />
                Full Screen
              </Button>
            </div>
          </div>

          {/* View Mode Tabs */}
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="mb-6">
            <TabsList>
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Grid View
              </TabsTrigger>
              <TabsTrigger value="topology" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                Topology
              </TabsTrigger>
              <TabsTrigger value="metrics" className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                Metrics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {containers.map((container) => (
                  <ContainerCard key={container.id} container={container} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="topology" className="mt-6">
              <TopologyView />
            </TabsContent>

            <TabsContent value="metrics" className="mt-6">
              <MetricsView />
            </TabsContent>
          </Tabs>
        </div>
        <Toaster />
      </div>
    </TooltipProvider>
  )
}
