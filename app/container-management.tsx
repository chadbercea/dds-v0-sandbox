"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Play,
  Square,
  RotateCcw,
  Trash2,
  MoreHorizontal,
  Plus,
  Filter,
  Download,
  Settings,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Clock,
  User,
  Bell,
  Terminal,
  Pause,
} from "lucide-react"

// Container interface
interface Container {
  id: string
  name: string
  image: string
  status: "running" | "stopped" | "exited" | "starting" | "stopping"
  created: string
  ports: string
  cpu: number
  memory: number
  network: string
  uptime?: string
}

// Initial container data
const initialContainers: Container[] = [
  {
    id: "c1a2b3c4d5e6",
    name: "nginx-web-server",
    image: "nginx:latest",
    status: "running",
    created: "2 hours ago",
    ports: "80:8080, 443:8443",
    cpu: 15,
    memory: 45,
    network: "2.1 MB",
    uptime: "2h 15m",
  },
  {
    id: "f7g8h9i0j1k2",
    name: "postgres-db",
    image: "postgres:13",
    status: "running",
    created: "1 day ago",
    ports: "5432:5432",
    cpu: 8,
    memory: 62,
    network: "1.8 MB",
    uptime: "1d 3h",
  },
  {
    id: "l3m4n5o6p7q8",
    name: "redis-cache",
    image: "redis:alpine",
    status: "stopped",
    created: "3 days ago",
    ports: "6379:6379",
    cpu: 0,
    memory: 0,
    network: "0 MB",
  },
  {
    id: "r9s0t1u2v3w4",
    name: "node-api",
    image: "node:16-alpine",
    status: "running",
    created: "5 hours ago",
    ports: "3000:3000",
    cpu: 22,
    memory: 38,
    network: "5.2 MB",
    uptime: "5h 12m",
  },
  {
    id: "x5y6z7a8b9c0",
    name: "mongodb",
    image: "mongo:latest",
    status: "exited",
    created: "1 week ago",
    ports: "27017:27017",
    cpu: 0,
    memory: 0,
    network: "0 MB",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "running":
      return "bg-green-500"
    case "stopped":
      return "bg-yellow-500"
    case "exited":
      return "bg-red-500"
    case "starting":
      return "bg-blue-500"
    case "stopping":
      return "bg-orange-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "running":
      return "default"
    case "stopped":
      return "secondary"
    case "exited":
      return "destructive"
    case "starting":
      return "default"
    case "stopping":
      return "secondary"
    default:
      return "outline"
  }
}

export default function ContainerManagement() {
  const [containers, setContainers] = useState<Container[]>(initialContainers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showLogsDialog, setShowLogsDialog] = useState(false)
  const [selectedContainerLogs, setSelectedContainerLogs] = useState<string>("")
  const [newContainerName, setNewContainerName] = useState("")
  const [newContainerImage, setNewContainerImage] = useState("")
  const [newContainerPort, setNewContainerPort] = useState("")
  const { toast } = useToast()

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setContainers((prev) =>
        prev.map((container) => {
          if (container.status === "running") {
            // Simulate CPU and memory fluctuations
            const cpuVariation = (Math.random() - 0.5) * 10
            const memoryVariation = (Math.random() - 0.5) * 5
            const networkVariation = Math.random() * 2

            return {
              ...container,
              cpu: Math.max(0, Math.min(100, container.cpu + cpuVariation)),
              memory: Math.max(0, Math.min(100, container.memory + memoryVariation)),
              network: `${(Number.parseFloat(container.network) + networkVariation).toFixed(1)} MB`,
            }
          }
          return container
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const filteredContainers = containers.filter(
    (container) =>
      container.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.image.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const runningContainers = containers.filter((c) => c.status === "running").length
  const totalContainers = containers.length
  const avgCpu = Math.round(
    containers.filter((c) => c.status === "running").reduce((acc, c) => acc + c.cpu, 0) / runningContainers || 0,
  )
  const avgMemory = Math.round(
    containers.filter((c) => c.status === "running").reduce((acc, c) => acc + c.memory, 0) / runningContainers || 0,
  )

  const handleContainerAction = useCallback(
    (containerId: string, action: string) => {
      setContainers(
        (prev) =>
          prev
            .map((container) => {
              if (container.id === containerId) {
                switch (action) {
                  case "start":
                    toast({
                      title: "Container Starting",
                      description: `Starting ${container.name}...`,
                    })
                    setTimeout(() => {
                      setContainers((current) =>
                        current.map((c) =>
                          c.id === containerId
                            ? {
                                ...c,
                                status: "running",
                                cpu: Math.random() * 30,
                                memory: Math.random() * 50,
                                uptime: "0m",
                              }
                            : c,
                        ),
                      )
                      toast({
                        title: "Container Started",
                        description: `${container.name} is now running`,
                      })
                    }, 2000)
                    return { ...container, status: "starting" }

                  case "stop":
                    toast({
                      title: "Container Stopping",
                      description: `Stopping ${container.name}...`,
                    })
                    setTimeout(() => {
                      setContainers((current) =>
                        current.map((c) =>
                          c.id === containerId ? { ...c, status: "stopped", cpu: 0, memory: 0, network: "0 MB" } : c,
                        ),
                      )
                      toast({
                        title: "Container Stopped",
                        description: `${container.name} has been stopped`,
                      })
                    }, 1500)
                    return { ...container, status: "stopping" }

                  case "restart":
                    toast({
                      title: "Container Restarting",
                      description: `Restarting ${container.name}...`,
                    })
                    setTimeout(() => {
                      setContainers((current) =>
                        current.map((c) =>
                          c.id === containerId
                            ? {
                                ...c,
                                status: "running",
                                cpu: Math.random() * 25,
                                memory: Math.random() * 45,
                                uptime: "0m",
                              }
                            : c,
                        ),
                      )
                      toast({
                        title: "Container Restarted",
                        description: `${container.name} has been restarted`,
                      })
                    }, 3000)
                    return { ...container, status: "starting" }

                  case "delete":
                    toast({
                      title: "Container Deleted",
                      description: `${container.name} has been removed`,
                      variant: "destructive",
                    })
                    return null

                  default:
                    return container
                }
              }
              return container
            })
            .filter(Boolean) as Container[],
      )
    },
    [toast],
  )

  const handleCreateContainer = () => {
    if (!newContainerName || !newContainerImage) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newContainer: Container = {
      id: Math.random().toString(36).substr(2, 12),
      name: newContainerName,
      image: newContainerImage,
      status: "starting",
      created: "Just now",
      ports: newContainerPort || "8080:8080",
      cpu: 0,
      memory: 0,
      network: "0 MB",
    }

    setContainers((prev) => [...prev, newContainer])

    toast({
      title: "Container Creating",
      description: `Creating ${newContainerName}...`,
    })

    setTimeout(() => {
      setContainers((current) =>
        current.map((c) =>
          c.id === newContainer.id
            ? { ...c, status: "running", cpu: Math.random() * 20, memory: Math.random() * 40, uptime: "0m" }
            : c,
        ),
      )
      toast({
        title: "Container Created",
        description: `${newContainerName} is now running`,
      })
    }, 3000)

    setShowCreateDialog(false)
    setNewContainerName("")
    setNewContainerImage("")
    setNewContainerPort("")
  }

  const handleViewLogs = (container: Container) => {
    const mockLogs = [
      `[${new Date().toISOString()}] Starting ${container.name}`,
      `[${new Date().toISOString()}] Container ${container.id} initialized`,
      `[${new Date().toISOString()}] Listening on port ${container.ports.split(":")[1]}`,
      `[${new Date().toISOString()}] Health check passed`,
      `[${new Date().toISOString()}] Ready to accept connections`,
      `[${new Date().toISOString()}] Processing requests...`,
    ].join("\n")

    setSelectedContainerLogs(mockLogs)
    setShowLogsDialog(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8">
                <img src="/sub-marks/subMarkWhite.svg" alt="Docker" className="w-full h-full" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-semibold">Container Management</h1>
                <p className="text-sm text-primary-foreground/80">Manage your Docker containers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="secondary" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="secondary" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Containers</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalContainers}</div>
              <p className="text-xs text-muted-foreground">Across all environments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Running</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{runningContainers}</div>
              <p className="text-xs text-muted-foreground">Active containers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgCpu}%</div>
              <Progress value={avgCpu} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
              <MemoryStick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgMemory}%</div>
              <Progress value={avgMemory} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="containers" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="containers">Containers</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="networks">Networks</TabsTrigger>
              <TabsTrigger value="volumes">Volumes</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Container
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Container</DialogTitle>
                    <DialogDescription>Configure your new Docker container settings.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newContainerName}
                        onChange={(e) => setNewContainerName(e.target.value)}
                        className="col-span-3"
                        placeholder="my-container"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="image" className="text-right">
                        Image
                      </Label>
                      <Select value={newContainerImage} onValueChange={setNewContainerImage}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select an image" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nginx:latest">nginx:latest</SelectItem>
                          <SelectItem value="node:16-alpine">node:16-alpine</SelectItem>
                          <SelectItem value="postgres:13">postgres:13</SelectItem>
                          <SelectItem value="redis:alpine">redis:alpine</SelectItem>
                          <SelectItem value="mongo:latest">mongo:latest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="port" className="text-right">
                        Port
                      </Label>
                      <Input
                        id="port"
                        value={newContainerPort}
                        onChange={(e) => setNewContainerPort(e.target.value)}
                        className="col-span-3"
                        placeholder="8080:8080"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateContainer}>Create Container</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <TabsContent value="containers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Container List</CardTitle>
                    <CardDescription>Manage and monitor your Docker containers</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search containers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Container</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Ports</TableHead>
                      <TableHead>Resources</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContainers.map((container) => (
                      <TableRow key={container.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{container.name}</div>
                            <div className="text-sm text-muted-foreground">{container.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${getStatusColor(container.status)} ${container.status === "starting" || container.status === "stopping" ? "animate-pulse" : ""}`}
                            />
                            <Badge variant={getStatusVariant(container.status)}>{container.status}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-sm">{container.image}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{container.created}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-sm">{container.ports}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-sm">
                              <Cpu className="h-3 w-3" />
                              <span>{Math.round(container.cpu)}%</span>
                              <MemoryStick className="h-3 w-3 ml-2" />
                              <span>{Math.round(container.memory)}%</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Network className="h-3 w-3" />
                              <span>{container.network}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {container.status === "running" ? (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleContainerAction(container.id, "stop")}
                                >
                                  <Square className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleContainerAction(container.id, "restart")}
                                >
                                  <RotateCcw className="h-3 w-3" />
                                </Button>
                              </>
                            ) : container.status === "stopped" || container.status === "exited" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleContainerAction(container.id, "start")}
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" disabled>
                                <Pause className="h-3 w-3" />
                              </Button>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Settings className="mr-2 h-4 w-4" />
                                  Configure
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleViewLogs(container)}>
                                  <Terminal className="mr-2 h-4 w-4" />
                                  View Logs
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Activity className="mr-2 h-4 w-4" />
                                  Stats
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleContainerAction(container.id, "delete")}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Docker Images</CardTitle>
                <CardDescription>Manage your Docker images and repositories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <HardDrive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Images Management</h3>
                  <p className="text-muted-foreground mb-4">View and manage your Docker images here</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Pull Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="networks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Docker Networks</CardTitle>
                <CardDescription>Configure and manage container networks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Network className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Network Management</h3>
                  <p className="text-muted-foreground mb-4">Create and configure Docker networks</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Network
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volumes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Docker Volumes</CardTitle>
                <CardDescription>Manage persistent data storage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <HardDrive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Volume Management</h3>
                  <p className="text-muted-foreground mb-4">Create and manage Docker volumes</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Volume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Logs Dialog */}
      <Dialog open={showLogsDialog} onOpenChange={setShowLogsDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Container Logs</DialogTitle>
            <DialogDescription>Real-time logs from the selected container</DialogDescription>
          </DialogHeader>
          <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm h-96 overflow-y-auto">
            <pre>{selectedContainerLogs}</pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
