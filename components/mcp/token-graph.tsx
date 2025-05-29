"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Brain,
  Command,
  Cpu,
  Database,
  GitBranch,
  HardDrive,
  Layers,
  Network,
  Pause,
  Play,
  Shield,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react"

// Sample data for all visualizations
const sampleNodes = {
  intent: { id: "intent", label: "User Intent", confidence: 98, status: "complete" },
  context: { id: "context", label: "Context Layer", confidence: 94, status: "processing" },
  constraints: { id: "constraints", label: "Constraints", confidence: 87, status: "pending" },
  reasoning: { id: "reasoning", label: "Reasoning", confidence: 91, status: "pending" },
  action: { id: "action", label: "Action", confidence: 89, status: "pending" },
}

const secondaryNodes = {
  historical: { label: "Historical Patterns", confidence: 96, status: "complete" },
  currentLoad: { label: "Current Load", confidence: 99, status: "complete" },
  topology: { label: "Service Topology", confidence: 92, status: "processing" },
  resources: { label: "Resource Limits", confidence: 95, status: "pending" },
  security: { label: "Security Policies", confidence: 88, status: "pending" },
  cost: { label: "Cost Boundaries", confidence: 82, status: "pending" },
}

export function TokenGraph() {
  const [agentPaused, setAgentPaused] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    if (!agentPaused) {
      const interval = setInterval(() => {
        setAnimationStep((prev) => (prev < 5 ? prev + 1 : 0))
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [agentPaused])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "border-green-500 bg-green-50 text-green-800"
      case "processing":
        return "border-blue-500 bg-blue-50 text-blue-800"
      case "pending":
        return "border-muted bg-muted text-muted-foreground"
      default:
        return "border-muted bg-background"
    }
  }

  const getNodeIcon = (type: string) => {
    switch (type) {
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
    <div className="h-full overflow-auto">
      {/* Header Strip */}
      <Card className="mb-6 border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-white text-lg">
                  <Command className="h-5 w-5" />
                  Token Graph Visualization Options
                </CardTitle>
                <p className="text-slate-300 text-sm mt-0.5">5 Different Approaches to Decision Flow</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={agentPaused ? "default" : "secondary"}
                onClick={() => setAgentPaused(!agentPaused)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                {agentPaused ? <Play className="h-3.5 w-3.5 mr-1.5" /> : <Pause className="h-3.5 w-3.5 mr-1.5" />}
                {agentPaused ? "Resume" : "Pause"} Animation
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 1. Swimlane + Node Pipeline */}
      <Card className="mb-8 border shadow-lg">
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-blue-600" />
            1. Swimlane + Node Pipeline
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Horizontal swimlanes with nodes flowing left-to-right, cross-lane dependencies
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Intent Swimlane */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-green-800 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Intent Layer
                </h4>
                <Badge variant="outline" className="text-green-700 border-green-300">
                  Complete
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <Card className={`p-3 w-32 ${getStatusColor(sampleNodes.intent.status)}`}>
                  <div className="text-center">
                    <div className="font-medium text-sm">{sampleNodes.intent.label}</div>
                    <div className="text-xs mt-1">{sampleNodes.intent.confidence}%</div>
                  </div>
                </Card>
                <ArrowRight className="h-4 w-4 text-green-600" />
                <div className="text-sm text-green-700">Scale web service to handle traffic spike</div>
              </div>
            </div>

            {/* Context Swimlane */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-800 flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Context Layer
                </h4>
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  Processing
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <Card className={`p-3 w-32 ${getStatusColor(sampleNodes.context.status)}`}>
                  <div className="text-center">
                    <div className="font-medium text-sm">{sampleNodes.context.label}</div>
                    <div className="text-xs mt-1">{sampleNodes.context.confidence}%</div>
                  </div>
                </Card>
                <ArrowRight className="h-4 w-4 text-blue-600" />
                <div className="flex gap-2">
                  <Card className="p-2 w-24 border-blue-300 bg-blue-100">
                    <div className="text-xs text-center">
                      <div className="font-medium">Historical</div>
                      <div>96%</div>
                    </div>
                  </Card>
                  <Card className="p-2 w-24 border-blue-300 bg-blue-100">
                    <div className="text-xs text-center">
                      <div className="font-medium">Load</div>
                      <div>99%</div>
                    </div>
                  </Card>
                  <Card className="p-2 w-24 border-blue-300 bg-blue-100">
                    <div className="text-xs text-center">
                      <div className="font-medium">Topology</div>
                      <div>92%</div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Constraints Swimlane */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-amber-800 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Constraints Layer
                </h4>
                <Badge variant="outline" className="text-amber-700 border-amber-300">
                  Pending
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <Card className={`p-3 w-32 ${getStatusColor(sampleNodes.constraints.status)}`}>
                  <div className="text-center">
                    <div className="font-medium text-sm">{sampleNodes.constraints.label}</div>
                    <div className="text-xs mt-1">{sampleNodes.constraints.confidence}%</div>
                  </div>
                </Card>
                <ArrowRight className="h-4 w-4 text-amber-600" />
                <div className="flex gap-2">
                  <Card className="p-2 w-24 border-amber-300 bg-amber-100">
                    <div className="text-xs text-center">
                      <div className="font-medium">Resources</div>
                      <div>95%</div>
                    </div>
                  </Card>
                  <Card className="p-2 w-24 border-amber-300 bg-amber-100">
                    <div className="text-xs text-center">
                      <div className="font-medium">Security</div>
                      <div>88%</div>
                    </div>
                  </Card>
                  <Card className="p-2 w-24 border-amber-300 bg-amber-100">
                    <div className="text-xs text-center">
                      <div className="font-medium">Cost</div>
                      <div>82%</div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Cross-lane connections */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-2">
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <div className="text-xs text-muted-foreground">Cross-lane dependencies</div>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Circuit Board / Flow Diagram */}
      <Card className="mb-8 border shadow-lg">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-slate-600" />
            2. Circuit Board / Flow Diagram
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Primary nodes as large chips, secondary as components, traced pathways
          </p>
        </CardHeader>
        <CardContent className="p-6 bg-slate-900 text-white">
          <div className="relative">
            {/* Circuit board background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 grid-rows-8 h-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border border-slate-700" />
                ))}
              </div>
            </div>

            {/* Main circuit path */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                {/* Primary Chips */}
                {Object.entries(sampleNodes).map(([key, node], index) => (
                  <div key={key} className="flex flex-col items-center">
                    <Card className="w-24 h-16 bg-slate-800 border-slate-600 shadow-lg">
                      <CardContent className="p-2 flex flex-col items-center justify-center h-full">
                        {getNodeIcon(key)}
                        <div className="text-xs font-medium mt-1">{node.label.split(" ")[0]}</div>
                        <div className="text-xs text-slate-400">{node.confidence}%</div>
                      </CardContent>
                    </Card>
                    {index < Object.keys(sampleNodes).length - 1 && (
                      <div className="absolute top-8 flex items-center" style={{ left: `${(index + 1) * 20}%` }}>
                        <div className="w-16 h-0.5 bg-green-400 shadow-sm shadow-green-400"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Secondary Components */}
              <div className="grid grid-cols-6 gap-4 mt-8">
                {Object.entries(secondaryNodes).map(([key, node]) => (
                  <Card key={key} className="w-16 h-12 bg-slate-700 border-slate-500">
                    <CardContent className="p-1 flex flex-col items-center justify-center h-full">
                      <div className="text-xs font-medium text-center leading-tight">{node.label.split(" ")[0]}</div>
                      <div className="text-xs text-slate-400">{node.confidence}%</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Circuit traces */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M 100 120 Q 150 140 200 120 Q 250 100 300 120"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    className="animate-pulse"
                  />
                  <path d="M 150 160 L 150 120" stroke="#3b82f6" strokeWidth="1" fill="none" filter="url(#glow)" />
                  <path d="M 250 160 L 250 120" stroke="#f59e0b" strokeWidth="1" fill="none" filter="url(#glow)" />
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Decision Tree with Parallel Branches */}
      <Card className="mb-8 border shadow-lg">
        <CardHeader className="bg-green-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-green-600" />
            3. Decision Tree with Parallel Branches
          </CardTitle>
          <p className="text-sm text-muted-foreground">Vertical tree structure with branching and convergence points</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Root */}
            <Card className="w-40 p-3 bg-green-50 border-green-200">
              <div className="text-center">
                <Target className="h-5 w-5 mx-auto mb-1 text-green-600" />
                <div className="font-medium">User Intent</div>
                <div className="text-sm text-green-600">98%</div>
              </div>
            </Card>

            {/* First Branch Level */}
            <div className="flex items-center gap-8">
              <Card className="w-32 p-3 bg-blue-50 border-blue-200">
                <div className="text-center">
                  <Layers className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                  <div className="font-medium text-sm">Context</div>
                  <div className="text-xs text-blue-600">94%</div>
                </div>
              </Card>
              <Card className="w-32 p-3 bg-amber-50 border-amber-200">
                <div className="text-center">
                  <Shield className="h-4 w-4 mx-auto mb-1 text-amber-600" />
                  <div className="font-medium text-sm">Constraints</div>
                  <div className="text-xs text-amber-600">87%</div>
                </div>
              </Card>
            </div>

            {/* Second Branch Level */}
            <div className="flex items-center gap-4">
              <Card className="w-24 p-2 bg-blue-100 border-blue-300">
                <div className="text-center text-xs">
                  <div className="font-medium">Historical</div>
                  <div className="text-blue-600">96%</div>
                </div>
              </Card>
              <Card className="w-24 p-2 bg-blue-100 border-blue-300">
                <div className="text-center text-xs">
                  <div className="font-medium">Load</div>
                  <div className="text-blue-600">99%</div>
                </div>
              </Card>
              <Card className="w-24 p-2 bg-amber-100 border-amber-300">
                <div className="text-center text-xs">
                  <div className="font-medium">Resources</div>
                  <div className="text-amber-600">95%</div>
                </div>
              </Card>
              <Card className="w-24 p-2 bg-amber-100 border-amber-300">
                <div className="text-center text-xs">
                  <div className="font-medium">Security</div>
                  <div className="text-amber-600">88%</div>
                </div>
              </Card>
            </div>

            {/* Convergence */}
            <Card className="w-40 p-3 bg-purple-50 border-purple-200">
              <div className="text-center">
                <Brain className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                <div className="font-medium">Reasoning</div>
                <div className="text-sm text-purple-600">91%</div>
              </div>
            </Card>

            {/* Final Action */}
            <Card className="w-40 p-3 bg-red-50 border-red-200">
              <div className="text-center">
                <Zap className="h-5 w-5 mx-auto mb-1 text-red-600" />
                <div className="font-medium">Action</div>
                <div className="text-sm text-red-600">89%</div>
              </div>
            </Card>

            {/* Tree connections */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full">
                <path d="M 400 100 L 350 150 M 400 100 L 450 150" stroke="#10b981" strokeWidth="2" fill="none" />
                <path
                  d="M 350 200 L 300 250 M 350 200 L 350 250 M 450 200 L 450 250 M 450 200 L 500 250"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  fill="none"
                />
                <path d="M 375 300 L 400 350" stroke="#8b5cf6" strokeWidth="2" fill="none" />
                <path d="M 400 400 L 400 450" stroke="#ef4444" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Pipeline with Tributary Flows */}
      <Card className="mb-8 border shadow-lg">
        <CardHeader className="bg-cyan-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-600" />
            4. Pipeline with Tributary Flows
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Main pipeline with tributary streams feeding in, confluence points
          </p>
        </CardHeader>
        <CardContent className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50">
          <div className="relative">
            {/* Main Pipeline */}
            <div className="flex items-center justify-between mb-8">
              {Object.entries(sampleNodes).map(([key, node], index) => (
                <div key={key} className="relative">
                  <Card className="w-28 h-20 bg-cyan-100 border-cyan-300 shadow-md">
                    <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                      {getNodeIcon(key)}
                      <div className="text-sm font-medium mt-1">{node.label.split(" ")[0]}</div>
                      <div className="text-xs text-cyan-600">{node.confidence}%</div>
                    </CardContent>
                  </Card>
                  {index < Object.keys(sampleNodes).length - 1 && (
                    <div className="absolute top-10 -right-8 w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Tributary Flows */}
            <div className="space-y-4">
              {/* Context Tributaries */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-2">
                  <Card className="w-20 h-12 bg-blue-100 border-blue-200">
                    <CardContent className="p-1 flex items-center justify-center h-full">
                      <div className="text-xs text-center">
                        <div className="font-medium">Historical</div>
                        <div className="text-blue-600">96%</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="w-20 h-12 bg-blue-100 border-blue-200">
                    <CardContent className="p-1 flex items-center justify-center h-full">
                      <div className="text-xs text-center">
                        <div className="font-medium">Load</div>
                        <div className="text-blue-600">99%</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-12 h-0.5 bg-blue-400 rounded"></div>
                  <div className="w-12 h-0.5 bg-blue-400 rounded"></div>
                </div>
                <ArrowRight className="h-4 w-4 text-blue-500" />
                <div className="text-sm text-blue-700">Feeding into Context Layer</div>
              </div>

              {/* Constraints Tributaries */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-2">
                  <Card className="w-20 h-12 bg-amber-100 border-amber-200">
                    <CardContent className="p-1 flex items-center justify-center h-full">
                      <div className="text-xs text-center">
                        <div className="font-medium">Resources</div>
                        <div className="text-amber-600">95%</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="w-20 h-12 bg-amber-100 border-amber-200">
                    <CardContent className="p-1 flex items-center justify-center h-full">
                      <div className="text-xs text-center">
                        <div className="font-medium">Security</div>
                        <div className="text-amber-600">88%</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-12 h-0.5 bg-amber-400 rounded"></div>
                  <div className="w-12 h-0.5 bg-amber-400 rounded"></div>
                </div>
                <ArrowRight className="h-4 w-4 text-amber-500" />
                <div className="text-sm text-amber-700">Feeding into Constraints Layer</div>
              </div>
            </div>

            {/* Flow indicators */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="relative w-full h-full">
                <div className="absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 opacity-50 rounded"></div>
                <div className="absolute top-10 left-0 w-1/3 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Radar/Hub with Spoke Connections */}
      <Card className="mb-8 border shadow-lg">
        <CardHeader className="bg-purple-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            5. Radar/Hub with Spoke Connections
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Central decision hubs with orbital secondary nodes and spoke connections
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-8">
            {/* Context Hub */}
            <div className="relative">
              <div className="flex items-center justify-center">
                <Card className="w-24 h-24 bg-blue-50 border-blue-200 shadow-lg relative z-10">
                  <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                    <Layers className="h-6 w-6 text-blue-600 mb-1" />
                    <div className="text-sm font-medium">Context</div>
                    <div className="text-xs text-blue-600">94%</div>
                  </CardContent>
                </Card>
              </div>

              {/* Orbital nodes */}
              <div className="absolute inset-0">
                <Card className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-16 h-12 bg-blue-100 border-blue-300">
                  <CardContent className="p-1 flex items-center justify-center h-full">
                    <div className="text-xs text-center">
                      <div className="font-medium">Historical</div>
                      <div className="text-blue-600">96%</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="absolute bottom-0 left-0 transform -translate-x-2 translate-y-2 w-16 h-12 bg-blue-100 border-blue-300">
                  <CardContent className="p-1 flex items-center justify-center h-full">
                    <div className="text-xs text-center">
                      <div className="font-medium">Load</div>
                      <div className="text-blue-600">99%</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="absolute bottom-0 right-0 transform translate-x-2 translate-y-2 w-16 h-12 bg-blue-100 border-blue-300">
                  <CardContent className="p-1 flex items-center justify-center h-full">
                    <div className="text-xs text-center">
                      <div className="font-medium">Topology</div>
                      <div className="text-blue-600">92%</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Spokes */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full">
                  <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#3b82f6" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#3b82f6" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#3b82f6" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Constraints Hub */}
            <div className="relative">
              <div className="flex items-center justify-center">
                <Card className="w-24 h-24 bg-amber-50 border-amber-200 shadow-lg relative z-10">
                  <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                    <Shield className="h-6 w-6 text-amber-600 mb-1" />
                    <div className="text-sm font-medium">Constraints</div>
                    <div className="text-xs text-amber-600">87%</div>
                  </CardContent>
                </Card>
              </div>

              {/* Orbital nodes */}
              <div className="absolute inset-0">
                <Card className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-16 h-12 bg-amber-100 border-amber-300">
                  <CardContent className="p-1 flex items-center justify-center h-full">
                    <div className="text-xs text-center">
                      <div className="font-medium">Resources</div>
                      <div className="text-amber-600">95%</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="absolute bottom-0 left-0 transform -translate-x-2 translate-y-2 w-16 h-12 bg-amber-100 border-amber-300">
                  <CardContent className="p-1 flex items-center justify-center h-full">
                    <div className="text-xs text-center">
                      <div className="font-medium">Security</div>
                      <div className="text-amber-600">88%</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="absolute bottom-0 right-0 transform translate-x-2 translate-y-2 w-16 h-12 bg-amber-100 border-amber-300">
                  <CardContent className="p-1 flex items-center justify-center h-full">
                    <div className="text-xs text-center">
                      <div className="font-medium">Cost</div>
                      <div className="text-amber-600">82%</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Spokes */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full">
                  <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#f59e0b" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#f59e0b" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#f59e0b" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Reasoning Hub */}
            <div className="relative">
              <div className="flex items-center justify-center">
                <Card className="w-24 h-24 bg-purple-50 border-purple-200 shadow-lg relative z-10">
                  <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                    <Brain className="h-6 w-6 text-purple-600 mb-1" />
                    <div className="text-sm font-medium">Reasoning</div>
                    <div className="text-xs text-purple-600">91%</div>
                  </CardContent>
                </Card>
              </div>

              {/* Orbital nodes */}
              <div className="absolute inset-0">
                <Card className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-16 h-12 bg-purple-100 border-purple-300">
                  <CardContent className="p-1 flex items-center justify-center h-full">
                    <div className="text-xs text-center">
                      <div className="font-medium">Strategy</div>
                      <div className="text-purple-600">93%</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="absolute bottom-0 left-0 transform -translate-x-2 translate-y-2 w-16 h-12 bg-purple-100 border-purple-300">
                  <CardContent className="p-1 flex items-center justify-center h-full">
                    <div className="text-xs text-center">
                      <div className="font-medium">Risk</div>
                      <div className="text-purple-600">89%</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="absolute bottom-0 right-0 transform translate-x-2 translate-y-2 w-16 h-12 bg-purple-100 border-purple-300">
                  <CardContent className="p-1 flex items-center justify-center h-full">
                    <div className="text-xs text-center">
                      <div className="font-medium">Options</div>
                      <div className="text-purple-600">76%</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Spokes */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full">
                  <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#8b5cf6" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#8b5cf6" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#8b5cf6" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Hub connections */}
          <div className="flex items-center justify-center mt-8 gap-8">
            <ArrowRight className="h-6 w-6 text-blue-500" />
            <ArrowRight className="h-6 w-6 text-amber-500" />
            <ArrowRight className="h-6 w-6 text-purple-500" />
          </div>
        </CardContent>
      </Card>

      {/* System Drivers (Bottom) */}
      <Card className="border shadow-lg">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-slate-600" />
            System Drivers (Common to All Approaches)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-4 gap-4">
            {[
              { id: "cpu", label: "CPU Pressure", value: 78, icon: Cpu, color: "amber" },
              { id: "memory", label: "Memory Usage", value: 64, icon: Database, color: "blue" },
              { id: "network", label: "Network I/O", value: 42, icon: Network, color: "green" },
              { id: "cost", label: "Cost Rate", value: 23, icon: HardDrive, color: "purple" },
            ].map((driver) => (
              <Card key={driver.id} className="p-3 border shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <driver.icon className={`h-4 w-4 mr-1.5 text-${driver.color}-500`} />
                    <span className="text-sm font-medium">{driver.label}</span>
                  </div>
                </div>
                <div className="flex items-end justify-between mb-2">
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold">{driver.value}</span>
                    <span className="text-xs ml-1 text-muted-foreground">%</span>
                  </div>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                </div>
                <Progress value={driver.value} className="h-1" />
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
