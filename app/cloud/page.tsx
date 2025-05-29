"use client"

import { useState } from "react"
import { Plus, Play, Square, RotateCcw, Cpu, HardDrive, Wifi, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard-layout"
import { NavigationProvider } from "@/components/layout/app-header"

export default function CloudPage() {
  const [currentContext] = useState<"personal">("personal")

  const containers = [
    {
      name: "web-app-prod",
      image: "my-web-app:latest",
      status: "running",
      uptime: "5d 12h",
      cpu: 45,
      memory: 67,
      network: "2.3 GB",
      region: "us-east-1",
    },
    {
      name: "api-service-staging",
      image: "api-service:staging",
      status: "running",
      uptime: "2d 8h",
      cpu: 23,
      memory: 34,
      network: "890 MB",
      region: "us-west-2",
    },
    {
      name: "data-processor",
      image: "data-processor:v1.0.0",
      status: "stopped",
      uptime: "0h",
      cpu: 0,
      memory: 0,
      network: "0 B",
      region: "eu-west-1",
    },
    {
      name: "test-environment",
      image: "nginx:latest",
      status: "restarting",
      uptime: "0h",
      cpu: 12,
      memory: 15,
      network: "45 MB",
      region: "us-east-1",
    },
  ]

  const regions = [
    { name: "US East (N. Virginia)", id: "us-east-1", containers: 2 },
    { name: "US West (Oregon)", id: "us-west-2", containers: 1 },
    { name: "Europe (Ireland)", id: "eu-west-1", containers: 1 },
    { name: "Asia Pacific (Tokyo)", id: "ap-northeast-1", containers: 0 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "default"
      case "stopped":
        return "secondary"
      case "restarting":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Play className="h-3 w-3" />
      case "stopped":
        return <Square className="h-3 w-3" />
      case "restarting":
        return <RotateCcw className="h-3 w-3" />
      default:
        return <Square className="h-3 w-3" />
    }
  }

  return (
    <NavigationProvider>
      <DashboardLayout currentContext={currentContext} onContextChange={() => {}}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Cloud Containers</h1>
              <p className="text-muted-foreground">Manage your cloud-hosted container instances</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Deploy Container
            </Button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Running Containers</p>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground mt-1">Across 3 regions</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Total CPU Usage</p>
                  <p className="text-2xl font-bold">34%</p>
                  <Progress value={34} className="mt-2" />
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Memory Usage</p>
                  <p className="text-2xl font-bold">51%</p>
                  <Progress value={51} className="mt-2" />
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Monthly Cost</p>
                  <p className="text-2xl font-bold">$127</p>
                  <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Containers List */}
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Container Instances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {containers.map((container, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{container.name}</h3>
                          <Badge variant={getStatusColor(container.status)} className="text-xs">
                            {getStatusIcon(container.status)}
                            {container.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{container.image}</p>
                        <p className="text-xs text-muted-foreground">{container.region}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">Uptime</span>
                      </div>
                      <p className="font-medium">{container.uptime}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Cpu className="h-3 w-3" />
                        <span className="text-xs">CPU</span>
                      </div>
                      <p className="font-medium">{container.cpu}%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <HardDrive className="h-3 w-3" />
                        <span className="text-xs">Memory</span>
                      </div>
                      <p className="font-medium">{container.memory}%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Wifi className="h-3 w-3" />
                        <span className="text-xs">Network</span>
                      </div>
                      <p className="font-medium">{container.network}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Logs
                    </Button>
                    <Button variant="outline" size="sm">
                      Console
                    </Button>
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Regions */}
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Deployment Regions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {regions.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{region.name}</p>
                    <p className="text-sm text-muted-foreground">{region.id}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{region.containers} containers</p>
                      <p className="text-xs text-muted-foreground">Active instances</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Deploy Here
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </NavigationProvider>
  )
}
