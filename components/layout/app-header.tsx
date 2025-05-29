"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Search,
  Bell,
  Settings,
  Grid3X3,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Check,
  Shield,
  Zap,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

interface AppHeaderProps {
  onToggleSidebar: () => void
}

interface Notification {
  id: string
  type: "security" | "performance" | "deployment" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  severity: "low" | "medium" | "high" | "critical"
  containerId?: string
  containerName?: string
  details: {
    logs: string[]
    metrics?: {
      cpu: number
      memory: number
      network: number
    }
    actions: string[]
    resources: string[]
  }
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "security",
    title: "Critical Vulnerability Detected",
    message: "CVE-2024-1234 found in nginx:latest container",
    timestamp: "2 minutes ago",
    read: false,
    severity: "critical",
    containerId: "web-server",
    containerName: "nginx-web",
    details: {
      logs: [
        "[2024-01-15 10:35:22] [CRITICAL] CVE-2024-1234 detected in nginx binary",
        "[2024-01-15 10:35:23] [WARN] Vulnerability allows remote code execution",
        "[2024-01-15 10:35:24] [INFO] Affected version: nginx/1.20.1",
        "[2024-01-15 10:35:25] [RECOMMEND] Upgrade to nginx:1.24.0 or later",
        "[2024-01-15 10:35:26] [ACTION] Container should be updated immediately",
        "[2024-01-15 10:35:27] [SCAN] Security scan completed - 1 critical, 2 high, 5 medium issues found",
      ],
      metrics: { cpu: 12, memory: 256, network: 2.1 },
      actions: ["Update Container", "Apply Security Patch", "Quarantine Container", "Generate Report"],
      resources: ["Security Advisory CVE-2024-1234", "nginx Security Updates", "Container Hardening Guide"],
    },
  },
  {
    id: "2",
    type: "performance",
    title: "High Memory Usage Alert",
    message: "postgres-db container using 95% of allocated memory",
    timestamp: "5 minutes ago",
    read: false,
    severity: "high",
    containerId: "database",
    containerName: "postgres-db",
    details: {
      logs: [
        "[2024-01-15 10:32:15] [WARN] Memory usage exceeded 90% threshold",
        "[2024-01-15 10:32:45] [ALERT] Memory usage at 95% - 972MB/1024MB",
        "[2024-01-15 10:33:12] [INFO] Active connections: 87/100",
        "[2024-01-15 10:33:30] [WARN] Query cache full, evicting oldest entries",
        "[2024-01-15 10:33:45] [RECOMMEND] Consider increasing memory limit",
        "[2024-01-15 10:34:01] [MONITOR] Memory pressure detected, performance may degrade",
      ],
      metrics: { cpu: 8, memory: 972, network: 1.8 },
      actions: ["Increase Memory Limit", "Restart Container", "Optimize Queries", "Scale Horizontally"],
      resources: ["PostgreSQL Memory Tuning", "Container Resource Management", "Database Optimization Guide"],
    },
  },
  {
    id: "3",
    type: "deployment",
    title: "New Container Deployed",
    message: "api-gateway container successfully deployed and running",
    timestamp: "8 minutes ago",
    read: true,
    severity: "low",
    containerId: "api-gateway-1234",
    containerName: "api-gateway",
    details: {
      logs: [
        "[2024-01-15 10:29:30] [INFO] Starting container deployment...",
        "[2024-01-15 10:29:32] [INFO] Pulling image api-gateway:v2.1.0",
        "[2024-01-15 10:29:45] [INFO] Image pulled successfully",
        "[2024-01-15 10:29:46] [INFO] Creating container with ID: api-gateway-1234",
        "[2024-01-15 10:29:47] [INFO] Container started successfully",
        "[2024-01-15 10:29:50] [INFO] Health check passed - container is healthy",
      ],
      metrics: { cpu: 5, memory: 128, network: 0.5 },
      actions: ["View Container", "Check Health", "View Logs", "Configure Load Balancer"],
      resources: ["Deployment Guide", "API Gateway Documentation", "Service Mesh Configuration"],
    },
  },
  {
    id: "4",
    type: "system",
    title: "Docker Engine Update Available",
    message: "Docker Engine 24.0.7 is available with security fixes",
    timestamp: "15 minutes ago",
    read: false,
    severity: "medium",
    details: {
      logs: [
        "[2024-01-15 10:22:10] [INFO] Checking for Docker Engine updates...",
        "[2024-01-15 10:22:15] [UPDATE] New version available: 24.0.7",
        "[2024-01-15 10:22:16] [SECURITY] Contains fixes for CVE-2024-5678, CVE-2024-9012",
        "[2024-01-15 10:22:17] [RECOMMEND] Update recommended for security improvements",
        "[2024-01-15 10:22:18] [INFO] Update can be performed with minimal downtime",
        "[2024-01-15 10:22:19] [SCHEDULE] Maintenance window suggested: Tonight 2-4 AM",
      ],
      actions: ["Update Now", "Schedule Update", "View Release Notes", "Backup Configuration"],
      resources: ["Docker Engine Release Notes", "Update Procedures", "Rollback Guide"],
    },
  },
  {
    id: "5",
    type: "performance",
    title: "Network Latency Spike",
    message: "Increased response times detected across multiple containers",
    timestamp: "22 minutes ago",
    read: true,
    severity: "medium",
    details: {
      logs: [
        "[2024-01-15 10:15:30] [MONITOR] Network latency monitoring started",
        "[2024-01-15 10:15:45] [WARN] Average response time increased to 250ms",
        "[2024-01-15 10:16:12] [ALERT] Latency spike detected - 450ms average",
        "[2024-01-15 10:16:30] [INFO] Affected containers: nginx-web, api-gateway, auth-service",
        "[2024-01-15 10:16:45] [INVESTIGATE] Checking network configuration...",
        "[2024-01-15 10:17:01] [RESOLVED] Latency returned to normal - 85ms average",
      ],
      actions: ["Check Network Config", "Restart Network Stack", "Monitor Bandwidth", "Scale Services"],
      resources: ["Network Troubleshooting", "Performance Monitoring", "Load Balancing Guide"],
    },
  },
]

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(60) // percentage of viewport width
  const [isResizing, setIsResizing] = useState(false)
  const [isCloudMode, setIsCloudMode] = useState(false)
  const { toast } = useToast()

  // Load cloud mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("docker-cloud-mode")
    if (savedMode) {
      setIsCloudMode(savedMode === "true")
    }
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  // Simulate new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ["security", "performance", "deployment", "system"][Math.floor(Math.random() * 4)] as any,
          title: "New Alert Generated",
          message: "System detected an anomaly requiring attention",
          timestamp: "Just now",
          read: false,
          severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as any,
          details: {
            logs: ["[INFO] New notification generated", "[MONITOR] System status updated"],
            actions: ["Investigate", "Acknowledge", "Dismiss"],
            resources: ["Documentation", "Troubleshooting Guide"],
          },
        }
        setNotifications((prev) => [newNotification, ...prev])
      }
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const openNotificationDrawer = (notification: Notification) => {
    setSelectedNotification(notification)
    setNotificationDrawerOpen(true)
    setNotificationsPanelOpen(false)
    markAsRead(notification.id)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "security":
        return <Shield className="w-4 h-4" />
      case "performance":
        return <Activity className="w-4 h-4" />
      case "deployment":
        return <Zap className="w-4 h-4" />
      case "system":
        return <Settings className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500 bg-red-50"
      case "high":
        return "border-orange-500 bg-orange-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      case "low":
        return "border-blue-500 bg-blue-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "security":
        return "text-red-600 bg-red-100"
      case "performance":
        return "text-orange-600 bg-orange-100"
      case "deployment":
        return "text-green-600 bg-green-100"
      case "system":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true)
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return

    const newWidth = ((window.innerWidth - e.clientX) / window.innerWidth) * 100
    const clampedWidth = Math.min(Math.max(newWidth, 25), 85) // Min 25%, Max 85%
    setDrawerWidth(clampedWidth)
  }

  const handleMouseUp = () => {
    setIsResizing(false)

    // Snap to breakpoints for better UX
    const snapPoints = [30, 45, 60, 75]
    const closest = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - drawerWidth) < Math.abs(prev - drawerWidth) ? curr : prev,
    )

    // Only snap if we're within 5% of a breakpoint
    if (Math.abs(closest - drawerWidth) < 5) {
      setDrawerWidth(closest)
    }
  }

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "ew-resize"
      document.body.style.userSelect = "none"
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isResizing])

  const toggleCloudMode = () => {
    const newMode = !isCloudMode
    setIsCloudMode(newMode)
    localStorage.setItem("docker-cloud-mode", newMode.toString())

    toast({
      title: newMode ? "Cloud Mode" : "Desktop Mode",
      description: newMode ? "Connected to Docker Cloud" : "Using local Docker Desktop",
    })
  }

  return (
    <header
      className={cn(
        "w-full shrink-0 transition-all duration-300 relative overflow-hidden",
        isCloudMode ? "bg-blue-600" : "bg-blue-600",
      )}
      style={{
        background: isCloudMode
          ? "linear-gradient(90deg, rgba(236, 72, 153, 0.8) 0%, rgba(37, 99, 235, 1) 100%)"
          : "#2563eb",
      }}
    >
      <div className="w-full flex items-center justify-between px-4 lg:px-6 py-2.5">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={onToggleSidebar} className="text-white hover:bg-blue-700 border-0">
            <Menu className="w-4 h-4" />
          </Button>
          <img src="/sub-marks/subMarkWhite.svg" alt="Docker" className="w-8 h-8" />

          {/* Cloud Mode Toggle */}
          <div className="ml-3 pl-3 flex items-center">
            <Switch
              checked={isCloudMode}
              onCheckedChange={toggleCloudMode}
              className="data-[state=checked]:bg-pink-400 data-[state=unchecked]:bg-blue-700 border-0 shadow-none"
              style={{ border: "none", boxShadow: "none" }}
            />
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 w-4 h-4" />
            <Input
              placeholder="Search containers, images, volumes... ⌘K"
              className="pl-10 bg-blue-700/50 border-blue-500 text-white placeholder:text-blue-200 focus:bg-blue-700/70 focus:border-blue-400"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* App Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-blue-700 border-0">
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Docker Applications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-3 p-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-sm font-medium">D</span>
                </div>
                <div>
                  <div className="font-medium">Docker Desktop</div>
                  <div className="text-sm text-muted-foreground">Container management</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 p-3">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-sm font-medium">H</span>
                </div>
                <div>
                  <div className="font-medium">Docker Hub</div>
                  <div className="text-sm text-muted-foreground">Image registry</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Basic Notifications */}
          <Popover open={notificationsPanelOpen} onOpenChange={setNotificationsPanelOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="relative text-white hover:bg-blue-700 border-0">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-96 p-0">
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Notifications</h3>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                        <Check className="w-4 h-4 mr-1" />
                        Mark all read
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => setNotificationsPanelOpen(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <div className="border-b px-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all" className="text-xs">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="security" className="text-xs">
                      Security
                    </TabsTrigger>
                    <TabsTrigger value="performance" className="text-xs">
                      Performance
                    </TabsTrigger>
                    <TabsTrigger value="system" className="text-xs">
                      System
                    </TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="h-96">
                  <TabsContent value="all" className="m-0">
                    <div className="divide-y">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "p-4 hover:bg-muted/50 cursor-pointer border-l-4",
                            getSeverityColor(notification.severity),
                            !notification.read && "bg-blue-50/50",
                          )}
                          onClick={() => openNotificationDrawer(notification)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn("p-2 rounded-full", getTypeColor(notification.type))}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm truncate">{notification.title}</p>
                                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{notification.message}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {notification.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {["security", "performance", "system"].map((type) => (
                    <TabsContent key={type} value={type} className="m-0">
                      <div className="divide-y">
                        {notifications
                          .filter((n) => n.type === type)
                          .map((notification) => (
                            <div
                              key={notification.id}
                              className={cn(
                                "p-4 hover:bg-muted/50 cursor-pointer border-l-4",
                                getSeverityColor(notification.severity),
                                !notification.read && "bg-blue-50/50",
                              )}
                              onClick={() => openNotificationDrawer(notification)}
                            >
                              <div className="flex items-start gap-3">
                                <div className={cn("p-2 rounded-full", getTypeColor(notification.type))}>
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium text-sm truncate">{notification.title}</p>
                                    {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                                  </div>
                                  <p className="text-sm text-muted-foreground truncate">{notification.message}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {notification.severity}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  ))}
                </ScrollArea>
              </Tabs>
            </PopoverContent>
          </Popover>

          {/* Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-blue-700 border-0">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>⚙️ Preferences</DropdownMenuItem>
              <DropdownMenuItem>🐳 Docker Engine</DropdownMenuItem>
              <DropdownMenuItem>🔧 Troubleshoot</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Account */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2 text-white hover:bg-blue-700 border-0">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24&query=norm+macdonald+as+burt+reynolds+snl+mustache+cowboy+hat" />
                  <AvatarFallback className="bg-blue-500 text-white text-xs">BR</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40&query=norm+macdonald+as+burt+reynolds+snl+mustache+cowboy+hat" />
                    <AvatarFallback className="bg-blue-500 text-white">BR</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Burt Reynolds</div>
                    <div className="text-sm text-muted-foreground">Turd Ferguson</div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>🎬 Celebrity Jeopardy</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Notification Drawer */}
      <Sheet open={notificationDrawerOpen} onOpenChange={setNotificationDrawerOpen}>
        <div
          className="fixed inset-0 z-50 bg-black/80"
          style={{ display: notificationDrawerOpen ? "block" : "none" }}
          onClick={() => setNotificationDrawerOpen(false)}
        />
        <div
          className={cn(
            "fixed right-0 top-0 z-50 h-full bg-background shadow-lg transition-all duration-300 ease-in-out",
            notificationDrawerOpen ? "translate-x-0" : "translate-x-full",
          )}
          style={{
            width: `${drawerWidth}vw`,
            transition: isResizing ? "none" : "all 300ms ease-in-out",
          }}
        >
          <div
            className={cn(
              "absolute left-0 top-0 w-1 h-full hover:bg-blue-500 cursor-ew-resize transition-colors z-50 bg-border",
              isResizing && "bg-blue-500 w-2",
            )}
            onMouseDown={handleMouseDown}
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-8 -ml-1 flex items-center justify-center">
              <div className="w-0.5 h-4 bg-muted-foreground rounded-full"></div>
            </div>
          </div>

          {isResizing && (
            <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded text-xs font-mono z-50">
              {Math.round(drawerWidth)}%
            </div>
          )}

          <div className="flex flex-col h-full">
            <div className="p-6 border-b bg-background shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{selectedNotification?.title}</h2>
                  <p className="text-muted-foreground">{selectedNotification?.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={selectedNotification?.severity === "critical" ? "destructive" : "secondary"}>
                      {selectedNotification?.severity}
                    </Badge>
                    <Badge variant="outline">{selectedNotification?.type}</Badge>
                    <span className="text-sm text-muted-foreground">{selectedNotification?.timestamp}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNotificationDrawerOpen(false)}
                  className="shrink-0 ml-4"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {selectedNotification?.containerId && (
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">🐳 Container Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium">Container Name</span>
                          <p className="font-mono text-sm">{selectedNotification.containerName}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Container ID</span>
                          <p className="font-mono text-sm">{selectedNotification.containerId}</p>
                        </div>
                      </div>
                      {selectedNotification.details.metrics && (
                        <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {selectedNotification.details.metrics.cpu}%
                            </div>
                            <div className="text-sm text-muted-foreground">CPU</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {selectedNotification.details.metrics.memory}MB
                            </div>
                            <div className="text-sm text-muted-foreground">Memory</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {selectedNotification.details.metrics.network}MB/s
                            </div>
                            <div className="text-sm text-muted-foreground">Network</div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      📋 Live Logs
                      <Badge variant="outline">STREAMING</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64 w-full border rounded-md p-4 bg-black text-green-400 font-mono text-sm">
                      <div className="space-y-1">
                        {selectedNotification?.details.logs.map((log, index) => (
                          <div key={index} className="hover:bg-gray-800 px-2 py-1 rounded">
                            {log}
                          </div>
                        ))}
                        <div className="text-yellow-400">● Live monitoring active...</div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">⚡ Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedNotification?.details.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start"
                          onClick={() => {
                            console.log(`Executing: ${action}`)
                          }}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          {action}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">📚 Resources & Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedNotification?.details.resources.map((resource, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        >
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">📖</div>
                          <span className="font-medium">{resource}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">🎯 System Impact Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="text-sm font-medium text-red-800">Risk Level</div>
                        <div className="text-2xl font-bold text-red-600">
                          {selectedNotification?.severity.toUpperCase()}
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-800">Affected Services</div>
                        <div className="text-2xl font-bold text-blue-600">3</div>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="text-sm font-medium text-yellow-800 mb-2">Recommended Actions</div>
                      <div className="text-sm text-yellow-700">
                        Immediate attention required. Review logs, apply security patches, and monitor system
                        performance.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>

            <div className="bg-background border-t p-4 shrink-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    📋 Export Logs
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    🔄 Refresh Data
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    ⏰ Snooze
                  </Button>
                  <Button variant="default" size="sm" className="text-xs">
                    ✅ Mark Resolved
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sheet>
    </header>
  )
}
