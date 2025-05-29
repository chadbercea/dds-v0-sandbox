"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Target, Cog, Brain, GitBranch, Activity, TrendingUp, Clock, Layers, Network, Eye } from "lucide-react"
import { useState } from "react"

interface TokenNode {
  id: string
  label: string
  type: "intent" | "context" | "agent" | "system" | "memory"
  tokens: number
  maxTokens: number
  active: boolean
  health: "healthy" | "warning" | "critical"
  branches: number
  lastUpdate: string
}

interface TokenFlow {
  from: string
  to: string
  tokens: number
  rate: number
  active: boolean
  conditional: boolean
  branches?: string[]
}

export function TokenGraph() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"flow" | "health" | "trends">("flow")

  const nodes: TokenNode[] = [
    {
      id: "intent",
      label: "User Intent",
      type: "intent",
      tokens: 1247,
      maxTokens: 2000,
      active: true,
      health: "healthy",
      branches: 3,
      lastUpdate: "2s ago",
    },
    {
      id: "context",
      label: "Context Layer",
      type: "context",
      tokens: 892,
      maxTokens: 1500,
      active: true,
      health: "warning",
      branches: 5,
      lastUpdate: "1s ago",
    },
    {
      id: "memory",
      label: "Agent Memory",
      type: "memory",
      tokens: 445,
      maxTokens: 1000,
      active: true,
      health: "healthy",
      branches: 2,
      lastUpdate: "3s ago",
    },
    {
      id: "agent",
      label: "Agent Behavior",
      type: "agent",
      tokens: 203,
      maxTokens: 800,
      active: false,
      health: "critical",
      branches: 1,
      lastUpdate: "15s ago",
    },
    {
      id: "system",
      label: "System State",
      type: "system",
      tokens: 678,
      maxTokens: 1200,
      active: true,
      health: "healthy",
      branches: 4,
      lastUpdate: "1s ago",
    },
  ]

  const flows: TokenFlow[] = [
    { from: "intent", to: "context", tokens: 1247, rate: 45, active: true, conditional: false },
    {
      from: "context",
      to: "memory",
      tokens: 445,
      rate: 12,
      active: true,
      conditional: true,
      branches: ["short-term", "long-term"],
    },
    {
      from: "context",
      to: "agent",
      tokens: 203,
      rate: 8,
      active: false,
      conditional: true,
      branches: ["execute", "defer"],
    },
    { from: "memory", to: "agent", tokens: 203, rate: 8, active: false, conditional: false },
    { from: "agent", to: "system", tokens: 678, rate: 23, active: true, conditional: false },
    {
      from: "system",
      to: "context",
      tokens: 234,
      rate: 15,
      active: true,
      conditional: true,
      branches: ["feedback", "state-update"],
    },
  ]

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
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case "healthy":
        return "border-green-500 bg-green-50"
      case "warning":
        return "border-yellow-500 bg-yellow-50"
      case "critical":
        return "border-red-500 bg-red-50"
      default:
        return "border-muted"
    }
  }

  const selectedNodeData = nodes.find((n) => n.id === selectedNode)

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Token Graph
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="animate-pulse">
              Live
            </Badge>
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              Scope All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* View Mode Tabs */}
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="flow">Token Flow</TabsTrigger>
            <TabsTrigger value="health">System Health</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="flow" className="space-y-4">
            {/* Main Flow Visualization */}
            <div className="relative">
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-12 grid-rows-8 h-full">
                  {Array.from({ length: 96 }).map((_, i) => (
                    <div key={i} className="border border-muted" />
                  ))}
                </div>
              </div>

              {/* Node Network */}
              <div className="relative h-80 p-4">
                {/* Nodes positioned in a network layout */}
                <div className="absolute top-4 left-1/4">
                  <NodeComponent
                    node={nodes[0]}
                    selected={selectedNode === nodes[0].id}
                    onClick={() => setSelectedNode(nodes[0].id)}
                  />
                </div>

                <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
                  <NodeComponent
                    node={nodes[1]}
                    selected={selectedNode === nodes[1].id}
                    onClick={() => setSelectedNode(nodes[1].id)}
                  />
                </div>

                <div className="absolute top-32 left-1/4">
                  <NodeComponent
                    node={nodes[2]}
                    selected={selectedNode === nodes[2].id}
                    onClick={() => setSelectedNode(nodes[2].id)}
                  />
                </div>

                <div className="absolute bottom-20 left-3/4">
                  <NodeComponent
                    node={nodes[3]}
                    selected={selectedNode === nodes[3].id}
                    onClick={() => setSelectedNode(nodes[3].id)}
                  />
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <NodeComponent
                    node={nodes[4]}
                    selected={selectedNode === nodes[4].id}
                    onClick={() => setSelectedNode(nodes[4].id)}
                  />
                </div>

                {/* Animated Flow Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                    </marker>
                  </defs>

                  {/* Flow paths with animation */}
                  <path
                    d="M 120 60 Q 200 100 240 120"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                    className="animate-pulse"
                  />
                  <path
                    d="M 240 140 Q 180 200 120 220"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                  <path
                    d="M 140 240 Q 300 280 360 260"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div>
            </div>

            {/* Flow Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Throughput</p>
                    <p className="text-lg font-bold">1.2K/s</p>
                  </div>
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Branches</p>
                    <p className="text-lg font-bold">15</p>
                  </div>
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Latency</p>
                    <p className="text-lg font-bold">23ms</p>
                  </div>
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Active</p>
                    <p className="text-lg font-bold">3/5</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            {/* Health Dashboard */}
            <div className="grid grid-cols-2 gap-4">
              {nodes.map((node) => (
                <Card key={node.id} className={`p-4 ${getHealthColor(node.health)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getNodeIcon(node.type)}
                      <span className="font-medium">{node.label}</span>
                    </div>
                    <Badge variant={node.health === "healthy" ? "default" : "destructive"}>{node.health}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Token Usage</span>
                      <span>
                        {node.tokens}/{node.maxTokens}
                      </span>
                    </div>
                    <Progress value={(node.tokens / node.maxTokens) * 100} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{node.branches} branches</span>
                      <span>{node.lastUpdate}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            {/* Trend Visualization */}
            <div className="h-40 bg-muted/20 rounded-lg p-4 flex items-end justify-between">
              {/* Simple bar chart representation */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-4 bg-blue-500 rounded-t" style={{ height: `${Math.random() * 80 + 20}px` }} />
                  <span className="text-xs text-muted-foreground">{i + 1}h</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">↗ 23%</p>
                <p className="text-sm text-muted-foreground">Token Efficiency</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">↗ 15%</p>
                <p className="text-sm text-muted-foreground">Branch Success</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">↘ 8%</p>
                <p className="text-sm text-muted-foreground">Memory Drift</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Selected Node Details */}
        {selectedNodeData && (
          <Card className="border-blue-500 bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                {getNodeIcon(selectedNodeData.type)}
                {selectedNodeData.label} Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Tokens:</span>
                  <span className="ml-2 font-mono">{selectedNodeData.tokens}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Branches:</span>
                  <span className="ml-2 font-mono">{selectedNodeData.branches}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Health:</span>
                  <Badge className="ml-2" variant={selectedNodeData.health === "healthy" ? "default" : "destructive"}>
                    {selectedNodeData.health}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Updated:</span>
                  <span className="ml-2">{selectedNodeData.lastUpdate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

// Node Component
function NodeComponent({
  node,
  selected,
  onClick,
}: {
  node: TokenNode
  selected: boolean
  onClick: () => void
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
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case "healthy":
        return "border-green-500 bg-green-50"
      case "warning":
        return "border-yellow-500 bg-yellow-50"
      case "critical":
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
      `}
      onClick={onClick}
    >
      <Card className={`w-24 h-20 ${getHealthColor(node.health)} ${node.active ? "shadow-lg" : "opacity-60"}`}>
        <CardContent className="p-2 flex flex-col items-center justify-center h-full">
          <div className="flex items-center justify-center mb-1">{getNodeIcon(node.type)}</div>
          <p className="text-xs font-medium text-center leading-tight">{node.label}</p>
          <div className="text-xs text-muted-foreground mt-1">{node.tokens}</div>
        </CardContent>
      </Card>

      {/* Activity indicator */}
      {node.active && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />}

      {/* Branch indicator */}
      {node.branches > 1 && (
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">{node.branches}</span>
        </div>
      )}
    </div>
  )
}
