"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  AlertTriangle,
  Brain,
  Check,
  ChevronRight,
  Clock,
  Cog,
  Command,
  Cpu,
  Database,
  Eye,
  GitCommit,
  GitMerge,
  HardDrive,
  Layers,
  Lock,
  Network,
  Play,
  Server,
  Shield,
  Target,
  Terminal,
  TrendingUp,
  Zap,
} from "lucide-react"
import { useState, useEffect } from "react"

// Types
interface DecisionNode {
  id: string
  label: string
  type: "intent" | "context" | "agent" | "system" | "memory" | "security" | "resource" | "network"
  status: "active" | "pending" | "complete" | "error"
  confidence: number
  priority: "low" | "medium" | "high" | "critical"
  timestamp: string
}

interface SystemMetric {
  id: string
  label: string
  value: number
  unit: string
  trend: "up" | "down" | "stable"
  status: "optimal" | "warning" | "critical"
  change: number
}

interface AgentDecision {
  id: string
  action: string
  trigger: string
  reasoning: string
  impact: string
  confidence: number
  timestamp: string
  status: "pending" | "approved" | "executing" | "complete"
}

export function TokenGraph() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [animationStep, setAnimationStep] = useState(0)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 5)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Decision nodes
  const nodes: DecisionNode[] = [
    {
      id: "intent",
      label: "User Intent",
      type: "intent",
      status: "complete",
      confidence: 98,
      priority: "high",
      timestamp: "12:42:03",
    },
    {
      id: "context",
      label: "Context Layer",
      type: "context",
      status: "active",
      confidence: 92,
      priority: "medium",
      timestamp: "12:42:05",
    },
    {
      id: "security",
      label: "Security Context",
      type: "security",
      status: "active",
      confidence: 87,
      priority: "critical",
      timestamp: "12:42:06",
    },
    {
      id: "resource",
      label: "Resource Allocation",
      type: "resource",
      status: "pending",
      confidence: 76,
      priority: "medium",
      timestamp: "12:42:08",
    },
    {
      id: "agent",
      label: "Agent Decision",
      type: "agent",
      status: "pending",
      confidence: 84,
      priority: "high",
      timestamp: "12:42:10",
    },
  ]

  // System metrics
  const metrics: SystemMetric[] = [
    {
      id: "cpu",
      label: "CPU Pressure",
      value: 78,
      unit: "%",
      trend: "up",
      status: "warning",
      change: 12,
    },
    {
      id: "memory",
      label: "Memory Usage",
      value: 64,
      unit: "%",
      trend: "stable",
      status: "optimal",
      change: 2,
    },
    {
      id: "network",
      label: "Network Load",
      value: 42,
      unit: "%",
      trend: "down",
      status: "optimal",
      change: -8,
    },
    {
      id: "containers",
      label: "Active Containers",
      value: 24,
      unit: "",
      trend: "up",
      status: "optimal",
      change: 3,
    },
  ]

  // Agent decisions
  const decisions: AgentDecision[] = [
    {
      id: "d1",
      action: "Scale Web Service",
      trigger: "CPU Pressure (78%)",
      reasoning: "Traffic spike detected, 3-minute sustained load",
      impact: "Latency reduction, +$0.42/hr cost",
      confidence: 92,
      timestamp: "12:42:03",
      status: "approved",
    },
    {
      id: "d2",
      action: "Isolate Auth Container",
      trigger: "Security Alert CVE-2035-4872",
      reasoning: "Vulnerability in auth library detected",
      impact: "Minimal service disruption, patch pending",
      confidence: 97,
      timestamp: "12:41:47",
      status: "executing",
    },
    {
      id: "d3",
      action: "Optimize Storage Allocation",
      trigger: "Usage Pattern Analysis",
      reasoning: "DB write patterns suggest index inefficiency",
      impact: "20% storage reduction, query speedup",
      confidence: 84,
      timestamp: "12:40:22",
      status: "complete",
    },
  ]

  // Node icon mapping
  const getNodeIcon = (type: string) => {
    switch (type) {
      case "intent":
        return <Target className="h-4 w-4" />
      case "context":
        return <Layers className="h-4 w-4" />
      case "memory":
        return <Brain className="h-4 w-4" />
      case "agent":
        return <Cog className="h-4 w-4" />
      case "system":
        return <Network className="h-4 w-4" />
      case "security":
        return <Shield className="h-4 w-4" />
      case "resource":
        return <Cpu className="h-4 w-4" />
      case "network":
        return <Activity className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  // Status badge mapping
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-500">Active</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Pending
          </Badge>
        )
      case "complete":
        return <Badge className="bg-green-500">Complete</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "executing":
        return <Badge className="bg-blue-500 animate-pulse">Executing</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Priority indicator
  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case "critical":
        return <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
      case "high":
        return <div className="w-3 h-3 rounded-full bg-amber-500" />
      case "medium":
        return <div className="w-3 h-3 rounded-full bg-blue-500" />
      case "low":
        return <div className="w-3 h-3 rounded-full bg-green-500" />
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-500" />
    }
  }

  return (
    <Card className="h-full overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Command className="h-5 w-5" />
              Token Graph
            </CardTitle>
            <CardDescription className="text-blue-100 mt-0.5">Decision Intelligence Dashboard</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-white border-white/30 bg-white/10 animate-pulse">
              <Clock className="h-3 w-3 mr-1" />
              Live
            </Badge>
            <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              Scope All
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-12 gap-0 h-full">
          {/* Left Column - Decision Flow */}
          <div className="col-span-7 p-4 border-r">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold flex items-center">
                <GitMerge className="h-4 w-4 mr-1.5 text-blue-500" />
                Decision Flow
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Confidence: 84%
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Branches: 3
                </Badge>
              </div>
            </div>

            {/* Main Flow Visualization */}
            <div className="relative h-[340px] mb-4">
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-12 grid-rows-8 h-full">
                  {Array.from({ length: 96 }).map((_, i) => (
                    <div key={i} className="border border-muted" />
                  ))}
                </div>
              </div>

              {/* Decision Flow Network */}
              <div className="relative h-full">
                {/* Nodes positioned in a tactical layout */}
                <div className="absolute top-4 left-8">
                  <DecisionNodeComponent
                    node={nodes[0]}
                    selected={selectedNode === nodes[0].id}
                    onClick={() => setSelectedNode(nodes[0].id)}
                    active={animationStep >= 0}
                  />
                </div>

                <div className="absolute top-20 left-1/3">
                  <DecisionNodeComponent
                    node={nodes[1]}
                    selected={selectedNode === nodes[1].id}
                    onClick={() => setSelectedNode(nodes[1].id)}
                    active={animationStep >= 1}
                  />
                </div>

                <div className="absolute top-20 right-8">
                  <DecisionNodeComponent
                    node={nodes[2]}
                    selected={selectedNode === nodes[2].id}
                    onClick={() => setSelectedNode(nodes[2].id)}
                    active={animationStep >= 1}
                  />
                </div>

                <div className="absolute bottom-32 left-1/4">
                  <DecisionNodeComponent
                    node={nodes[3]}
                    selected={selectedNode === nodes[3].id}
                    onClick={() => setSelectedNode(nodes[3].id)}
                    active={animationStep >= 2}
                  />
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <DecisionNodeComponent
                    node={nodes[4]}
                    selected={selectedNode === nodes[4].id}
                    onClick={() => setSelectedNode(nodes[4].id)}
                    active={animationStep >= 3}
                  />
                </div>

                {/* Animated Flow Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                    </marker>
                    <marker id="security-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                    </marker>
                  </defs>

                  {/* Flow paths with animation */}
                  <path
                    d="M 80 40 Q 150 60 200 80"
                    stroke={animationStep >= 1 ? "#3b82f6" : "#d1d5db"}
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                    className={animationStep >= 1 ? "animate-pulse" : ""}
                  />
                  <path
                    d="M 80 40 Q 250 20 350 80"
                    stroke={animationStep >= 1 ? "#ef4444" : "#d1d5db"}
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#security-arrow)"
                    className={animationStep >= 1 ? "animate-pulse" : ""}
                  />
                  <path
                    d="M 200 100 Q 150 180 120 220"
                    stroke={animationStep >= 2 ? "#3b82f6" : "#d1d5db"}
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                  <path
                    d="M 350 100 Q 250 200 120 220"
                    stroke={animationStep >= 2 ? "#ef4444" : "#d1d5db"}
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#security-arrow)"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M 120 240 Q 200 300 250 320"
                    stroke={animationStep >= 3 ? "#3b82f6" : "#d1d5db"}
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                </svg>

                {/* Decision Annotations */}
                {animationStep >= 2 && (
                  <div className="absolute bottom-24 right-12 bg-amber-50 border border-amber-200 p-2 rounded-md text-xs w-48 shadow-sm">
                    <div className="flex items-center text-amber-800 font-medium mb-1">
                      <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                      Resource Constraint
                    </div>
                    <p className="text-amber-700">CPU pressure affecting decision confidence (-12%)</p>
                  </div>
                )}

                {animationStep >= 4 && (
                  <div className="absolute bottom-4 right-4 bg-green-50 border border-green-200 p-2 rounded-md text-xs w-48 shadow-sm">
                    <div className="flex items-center text-green-800 font-medium mb-1">
                      <Check className="h-3 w-3 mr-1 text-green-500" />
                      Decision Ready
                    </div>
                    <p className="text-green-700">Scale Web Service (3 replicas)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Node Details or Current Decision */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardHeader className="py-2 px-4">
                <CardTitle className="text-sm flex items-center gap-2 text-blue-800">
                  <GitCommit className="h-4 w-4 text-blue-500" />
                  {selectedNode ? "Node Details" : "Current Decision"}
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4">
                {selectedNode ? (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <span className="ml-2 font-medium">Resource Allocation</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className="ml-2" variant="outline">
                        Pending
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Confidence:</span>
                      <span className="ml-2 font-mono">76%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Priority:</span>
                      <span className="ml-2 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
                        Medium
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-blue-800">Scale Web Service</span>
                      <Badge className={animationStep >= 4 ? "bg-green-500" : "bg-amber-500"}>
                        {animationStep >= 4 ? "Ready" : "Processing"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Cpu className="h-3 w-3 text-amber-500" />
                      <span className="text-muted-foreground">Trigger:</span>
                      <span className="font-medium">CPU Pressure (78%)</span>
                    </div>
                    <Progress value={animationStep * 25} className="h-1" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - System State & Decisions */}
          <div className="col-span-5 flex flex-col h-full">
            {/* System Metrics */}
            <div className="p-4 border-b">
              <h3 className="text-sm font-semibold flex items-center mb-3">
                <Server className="h-4 w-4 mr-1.5 text-blue-500" />
                System Drivers
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {metrics.map((metric) => (
                  <Card key={metric.id} className="p-2 border shadow-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {metric.id === "cpu" && <Cpu className="h-3.5 w-3.5 mr-1.5 text-amber-500" />}
                        {metric.id === "memory" && <Database className="h-3.5 w-3.5 mr-1.5 text-blue-500" />}
                        {metric.id === "network" && <Activity className="h-3.5 w-3.5 mr-1.5 text-green-500" />}
                        {metric.id === "containers" && <HardDrive className="h-3.5 w-3.5 mr-1.5 text-purple-500" />}
                        <span className="text-xs font-medium">{metric.label}</span>
                      </div>
                      <div className="flex items-center">
                        {metric.trend === "up" && <TrendingUp className="h-3 w-3 text-amber-500" />}
                        {metric.trend === "down" && <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />}
                        {metric.trend === "stable" && <Activity className="h-3 w-3 text-blue-500" />}
                      </div>
                    </div>
                    <div className="mt-1 flex items-end justify-between">
                      <div className="flex items-baseline">
                        <span className="text-lg font-bold">{metric.value}</span>
                        <span className="text-xs ml-0.5 text-muted-foreground">{metric.unit}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          metric.change > 0 ? "text-amber-600 border-amber-200" : "text-green-600 border-green-200"
                        }`}
                      >
                        {metric.change > 0 ? "+" : ""}
                        {metric.change}%
                      </Badge>
                    </div>
                    <Progress
                      value={metric.value}
                      className={`h-1 mt-1 ${
                        metric.status === "warning"
                          ? "bg-amber-100"
                          : metric.status === "critical"
                            ? "bg-red-100"
                            : "bg-blue-100"
                      }`}
                    />
                  </Card>
                ))}
              </div>
            </div>

            {/* Agent Decisions */}
            <div className="p-4 flex-1 overflow-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold flex items-center">
                  <Brain className="h-4 w-4 mr-1.5 text-blue-500" />
                  Agent Decisions
                </h3>
                <Badge variant="outline" className="text-xs">
                  Last 5 minutes
                </Badge>
              </div>

              <div className="space-y-3">
                {decisions.map((decision) => (
                  <Card key={decision.id} className="p-3 border shadow-sm">
                    <div className="flex justify-between items-start mb-1.5">
                      <div className="flex items-center">
                        <div
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            decision.status === "approved"
                              ? "bg-green-500"
                              : decision.status === "executing"
                                ? "bg-blue-500 animate-pulse"
                                : "bg-amber-500"
                          }`}
                        />
                        <span className="font-medium text-sm">{decision.action}</span>
                      </div>
                      <div className="flex items-center gap-1">{getStatusBadge(decision.status)}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mt-1">
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-1">Trigger:</span>
                        <span>{decision.trigger}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-1">Confidence:</span>
                        <span className="font-mono">{decision.confidence}%</span>
                      </div>
                      <div className="col-span-2 flex items-start">
                        <span className="text-muted-foreground mr-1">Reasoning:</span>
                        <span>{decision.reasoning}</span>
                      </div>
                      <div className="col-span-2 flex items-start">
                        <span className="text-muted-foreground mr-1">Impact:</span>
                        <span>{decision.impact}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2 pt-1 border-t text-xs text-muted-foreground">
                      <span>{decision.timestamp}</span>
                      <Button variant="ghost" size="sm" className="h-6 text-xs gap-0.5">
                        Details
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Command Bar */}
            <div className="p-2 border-t bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <Terminal className="h-3.5 w-3.5" />
                  Console
                </Button>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <Lock className="h-3.5 w-3.5" />
                  Override
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Play className="h-3.5 w-3.5" />
                  Execute
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Decision Node Component
function DecisionNodeComponent({
  node,
  selected,
  onClick,
  active,
}: {
  node: DecisionNode
  selected: boolean
  onClick: () => void
  active: boolean
}) {
  const getNodeIcon = (type: string) => {
    switch (type) {
      case "intent":
        return <Target className="h-4 w-4" />
      case "context":
        return <Layers className="h-4 w-4" />
      case "memory":
        return <Brain className="h-4 w-4" />
      case "agent":
        return <Cog className="h-4 w-4" />
      case "system":
        return <Network className="h-4 w-4" />
      case "security":
        return <Shield className="h-4 w-4" />
      case "resource":
        return <Cpu className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-blue-500 bg-blue-50"
      case "pending":
        return "border-amber-500 bg-amber-50"
      case "complete":
        return "border-green-500 bg-green-50"
      case "error":
        return "border-red-500 bg-red-50"
      default:
        return "border-muted"
    }
  }

  return (
    <div
      className={`
        relative cursor-pointer transition-all duration-200 hover:scale-105
        ${selected ? "ring-2 ring-blue-500 ring-offset-2" : ""}
        ${!active ? "opacity-40" : ""}
      `}
      onClick={onClick}
    >
      <Card className={`w-24 h-20 ${getStatusColor(node.status)}`}>
        <CardContent className="p-2 flex flex-col items-center justify-center h-full">
          <div className="flex items-center justify-center mb-1">{getNodeIcon(node.type)}</div>
          <p className="text-xs font-medium text-center leading-tight">{node.label}</p>
          <div className="text-xs text-muted-foreground mt-1">{node.confidence}%</div>
        </CardContent>
      </Card>

      {/* Priority indicator */}
      <div className="absolute -top-1 -right-1">
        {node.priority === "critical" && <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />}
        {node.priority === "high" && <div className="w-3 h-3 rounded-full bg-amber-500" />}
        {node.priority === "medium" && <div className="w-3 h-3 rounded-full bg-blue-500" />}
        {node.priority === "low" && <div className="w-3 h-3 rounded-full bg-green-500" />}
      </div>

      {/* Timestamp */}
      <div className="absolute -bottom-1 -left-1 bg-white text-[10px] px-1 rounded border shadow-sm">
        {node.timestamp}
      </div>
    </div>
  )
}
