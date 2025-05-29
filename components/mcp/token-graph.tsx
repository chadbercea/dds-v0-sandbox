"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  Brain,
  Command,
  Cpu,
  Database,
  GitBranch,
  HardDrive,
  Layers,
  Network,
  Shield,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react"

export function TokenGraph() {
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev < 5 ? prev + 1 : 0))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Decision nodes
  const nodes = [
    { id: "intent", label: "User Intent", confidence: 98, status: "complete", x: 50, y: 200 },
    { id: "context", label: "Context", confidence: 94, status: "processing", x: 200, y: 150 },
    { id: "constraints", label: "Constraints", confidence: 87, status: "pending", x: 350, y: 200 },
    { id: "reasoning", label: "Reasoning", confidence: 91, status: "pending", x: 500, y: 150 },
    { id: "action", label: "Action", confidence: 89, status: "pending", x: 650, y: 200 },
  ]

  // Secondary nodes
  const secondaryNodes = [
    { id: "historical", label: "Historical", confidence: 96, x: 200, y: 80 },
    { id: "load", label: "Current Load", confidence: 99, x: 200, y: 220 },
    { id: "resources", label: "Resources", confidence: 95, x: 350, y: 130 },
    { id: "security", label: "Security", confidence: 88, x: 350, y: 270 },
  ]

  // System drivers
  const drivers = [
    { id: "cpu", label: "CPU Pressure", value: 78, status: "warning", trend: [65, 70, 75, 78] },
    { id: "memory", label: "Memory", value: 64, status: "normal", trend: [60, 62, 63, 64] },
    { id: "network", label: "Network", value: 42, status: "normal", trend: [38, 40, 41, 42] },
    { id: "cost", label: "Cost Rate", value: 23, status: "normal", trend: [20, 21, 22, 23] },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "border-green-500 bg-green-50"
      case "processing":
        return "border-blue-500 bg-blue-50 animate-pulse"
      case "pending":
        return "border-muted bg-muted"
      default:
        return "border-muted bg-background"
    }
  }

  const getNodeIcon = (id: string) => {
    switch (id) {
      case "intent":
        return <Target className="h-4 w-4" />
      case "context":
        return <Layers className="h-4 w-4" />
      case "constraints":
        return <Shield className="h-4 w-4" />
      case "reasoning":
        return <Brain className="h-4 w-4" />
      case "action":
        return <Zap className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Command className="h-5 w-5" />
            Token Graph
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Step {animationStep + 1}/5</Badge>
            <Badge variant="outline">Confidence: 92%</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Main Flow Visualization */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="h-4 w-4 text-blue-500" />
            <h3 className="font-medium">Decision Flow</h3>
          </div>

          <div className="relative h-80 bg-slate-50 rounded-lg p-4">
            {/* Primary nodes */}
            {nodes.map((node, index) => (
              <div
                key={node.id}
                className={`absolute w-24 h-16 rounded-lg border-2 p-2 ${getStatusColor(node.status)}`}
                style={{ left: node.x, top: node.y }}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  {getNodeIcon(node.id)}
                  <div className="text-xs font-medium mt-1">{node.label}</div>
                  <div className="text-xs">{node.confidence}%</div>
                </div>
              </div>
            ))}

            {/* Secondary nodes */}
            {secondaryNodes.map((node) => (
              <div
                key={node.id}
                className="absolute w-20 h-12 rounded border bg-background p-1"
                style={{ left: node.x, top: node.y }}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-xs font-medium">{node.label}</div>
                  <div className="text-xs text-muted-foreground">{node.confidence}%</div>
                </div>
              </div>
            ))}

            {/* Flow connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 125 220 L 175 170"
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
                className={animationStep >= 1 ? "opacity-100" : "opacity-30"}
              />
              <path
                d="M 275 170 L 325 220"
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
                className={animationStep >= 2 ? "opacity-100" : "opacity-30"}
              />
              <path
                d="M 425 220 L 475 170"
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
                className={animationStep >= 3 ? "opacity-100" : "opacity-30"}
              />
              <path
                d="M 575 170 L 625 220"
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
                className={animationStep >= 4 ? "opacity-100" : "opacity-30"}
              />

              {/* Secondary connections */}
              <path d="M 200 100 L 200 130" stroke="#6b7280" strokeWidth="1" fill="none" />
              <path d="M 200 190 L 200 200" stroke="#6b7280" strokeWidth="1" fill="none" />
              <path d="M 350 150 L 350 180" stroke="#6b7280" strokeWidth="1" fill="none" />
              <path d="M 350 220 L 350 250" stroke="#6b7280" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>

        {/* System Drivers */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-blue-500" />
            <h3 className="font-medium">System Drivers</h3>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {drivers.map((driver) => (
              <Card key={driver.id} className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {driver.id === "cpu" && <Cpu className="h-4 w-4 text-amber-500" />}
                    {driver.id === "memory" && <Database className="h-4 w-4 text-blue-500" />}
                    {driver.id === "network" && <Network className="h-4 w-4 text-green-500" />}
                    {driver.id === "cost" && <HardDrive className="h-4 w-4 text-purple-500" />}
                    <span className="text-sm font-medium">{driver.label}</span>
                  </div>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-xl font-bold">{driver.value}</span>
                  <span className="text-xs text-muted-foreground">%</span>
                </div>

                {/* Mini sparkline */}
                <div className="flex items-end gap-1 h-6 mb-2">
                  {driver.trend.map((value, index) => (
                    <div
                      key={index}
                      className="bg-blue-500 rounded-t"
                      style={{ height: `${(value / 100) * 24}px`, width: "4px" }}
                    />
                  ))}
                </div>

                <Progress value={driver.value} className="h-1" />
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
