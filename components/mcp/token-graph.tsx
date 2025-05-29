"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Brain,
  ChevronRight,
  Clock,
  Cog,
  Command,
  Cpu,
  Database,
  Eye,
  GitBranch,
  Layers,
  Lock,
  Network,
  Pause,
  Play,
  RefreshCw,
  Shield,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react"
import { useState, useEffect } from "react"

// Types for our decision cockpit
interface DecisionStage {
  id: string
  label: string
  type: "intent" | "context" | "constraints" | "reasoning" | "action"
  status: "pending" | "processing" | "complete" | "error" | "blocked"
  confidence: number
  processingTime: number
  impact: string
  data: any
}

interface SystemDriver {
  id: string
  label: string
  value: number
  threshold: number
  trend: number[]
  influence: number // 0-100, how much this affects decisions
  status: "normal" | "warning" | "critical"
  unit: string
}

interface DecisionTrace {
  id: string
  timestamp: string
  action: string
  trigger: string
  reasoning: string[]
  impact: string
  confidence: number
  status: "queued" | "executing" | "complete" | "failed"
  duration: number
}

export function TokenGraph() {
  const [currentStage, setCurrentStage] = useState(2)
  const [selectedTrace, setSelectedTrace] = useState<string | null>(null)
  const [agentPaused, setAgentPaused] = useState(false)
  const [timelineFilter, setTimelineFilter] = useState<"all" | "critical" | "failed">("all")

  // Simulate real-time progression
  useEffect(() => {
    if (!agentPaused) {
      const interval = setInterval(() => {
        setCurrentStage((prev) => (prev < 4 ? prev + 1 : 0))
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [agentPaused])

  // DAG Decision Stages (Base Layer)
  const stages: DecisionStage[] = [
    {
      id: "intent",
      label: "Intent",
      type: "intent",
      status: currentStage >= 0 ? "complete" : "pending",
      confidence: 98,
      processingTime: 120,
      impact: "Scale web service",
      data: { userRequest: "Handle traffic spike", priority: "high" },
    },
    {
      id: "context",
      label: "Context",
      type: "context",
      status: currentStage >= 1 ? "complete" : currentStage === 0 ? "processing" : "pending",
      confidence: 94,
      processingTime: 340,
      impact: "3 replicas needed",
      data: { currentLoad: "78%", historicalPattern: "spike-recovery", timeOfDay: "peak" },
    },
    {
      id: "constraints",
      label: "Constraints",
      type: "constraints",
      status: currentStage >= 2 ? "complete" : currentStage === 1 ? "processing" : "pending",
      confidence: 87,
      processingTime: 180,
      impact: "Budget: +$0.42/hr",
      data: { budget: "available", security: "cleared", resources: "sufficient" },
    },
    {
      id: "reasoning",
      label: "Reasoning",
      type: "reasoning",
      status: currentStage >= 3 ? "complete" : currentStage === 2 ? "processing" : "pending",
      confidence: 91,
      processingTime: 220,
      impact: "Optimal strategy",
      data: { alternatives: 3, riskScore: "low", expectedOutcome: "latency-20%" },
    },
    {
      id: "action",
      label: "Action",
      type: "action",
      status: currentStage >= 4 ? "complete" : currentStage === 3 ? "processing" : "pending",
      confidence: 89,
      processingTime: 450,
      impact: "Deploy 3 replicas",
      data: { command: "kubectl scale", target: "web-service", replicas: 3 },
    },
  ]

  // System Drivers (Bottom Layer - Trading Dashboard Style)
  const drivers: SystemDriver[] = [
    {
      id: "cpu",
      label: "CPU Pressure",
      value: 78,
      threshold: 75,
      trend: [65, 68, 72, 75, 78, 76, 78],
      influence: 95,
      status: "warning",
      unit: "%",
    },
    {
      id: "memory",
      label: "Memory Usage",
      value: 64,
      threshold: 80,
      trend: [60, 62, 63, 64, 64, 65, 64],
      influence: 45,
      status: "normal",
      unit: "%",
    },
    {
      id: "network",
      label: "Network I/O",
      value: 42,
      threshold: 70,
      trend: [35, 38, 40, 42, 44, 43, 42],
      influence: 30,
      status: "normal",
      unit: "%",
    },
    {
      id: "cost",
      label: "Cost Rate",
      value: 23,
      threshold: 50,
      trend: [20, 21, 22, 23, 24, 23, 23],
      influence: 65,
      status: "normal",
      unit: "$/hr",
    },
  ]

  // Decision Timeline (Right Sidebar - Debugger Style)
  const traces: DecisionTrace[] = [
    {
      id: "t1",
      timestamp: "12:42:15",
      action: "Scale Web Service",
      trigger: "CPU Pressure (78%)",
      reasoning: ["Traffic spike detected", "Historical pattern match", "Resource availability confirmed"],
      impact: "Latency -20%, Cost +$0.42/hr",
      confidence: 89,
      status: "executing",
      duration: 2300,
    },
    {
      id: "t2",
      timestamp: "12:41:47",
      action: "Isolate Auth Container",
      trigger: "Security Alert CVE-2035-4872",
      reasoning: ["Vulnerability detected", "Critical service isolation", "Patch deployment queued"],
      impact: "Security risk mitigated",
      confidence: 97,
      status: "complete",
      duration: 1200,
    },
    {
      id: "t3",
      timestamp: "12:40:22",
      action: "Optimize DB Queries",
      trigger: "Query Performance Degradation",
      reasoning: ["Index inefficiency detected", "Query pattern analysis", "Performance impact assessment"],
      impact: "Query time -35%",
      confidence: 84,
      status: "complete",
      duration: 4500,
    },
    {
      id: "t4",
      timestamp: "12:39:08",
      action: "Load Balancer Adjustment",
      trigger: "Uneven Traffic Distribution",
      reasoning: ["Traffic imbalance detected", "Health check analysis", "Routing optimization"],
      impact: "Load distribution improved",
      confidence: 92,
      status: "complete",
      duration: 800,
    },
  ]

  const getStageIcon = (type: string) => {
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
        return <Cog className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "border-green-500 bg-green-50 text-green-800"
      case "processing":
        return "border-blue-500 bg-blue-50 text-blue-800 animate-pulse"
      case "pending":
        return "border-gray-300 bg-gray-50 text-gray-600"
      case "error":
        return "border-red-500 bg-red-50 text-red-800"
      case "blocked":
        return "border-amber-500 bg-amber-50 text-amber-800"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const filteredTraces = traces.filter((trace) => {
    if (timelineFilter === "critical") return trace.confidence < 90
    if (timelineFilter === "failed") return trace.status === "failed"
    return true
  })

  return (
    <Card className="h-full overflow-hidden border-0 shadow-lg">
      {/* Header Strip: Status + Actions */}
      <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                <Command className="h-5 w-5" />
                Token Graph
              </CardTitle>
              <p className="text-slate-300 text-sm mt-0.5">Decision Intelligence Dashboard</p>
            </div>
            <Separator orientation="vertical" className="h-8 bg-slate-600" />
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>3 Agents Active</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>2 Decisions Queued</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                <span>1 Critical Warning</span>
              </div>
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
              {agentPaused ? "Resume" : "Pause"} Agent
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Lock className="h-3.5 w-3.5 mr-1.5" />
              Override
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              View Past
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 h-full">
        <div className="grid grid-cols-12 gap-0 h-full">
          {/* Main Area: DAG Flow (8 columns) */}
          <div className="col-span-8 p-6 border-r">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <GitBranch className="h-5 w-5 mr-2 text-blue-500" />
                Decision Flow
              </h3>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-sm">
                  Confidence: {stages[currentStage]?.confidence || 0}%
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Stage: {currentStage + 1}/5
                </Badge>
              </div>
            </div>

            {/* DAG Visualization - Horizontal Flow */}
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                {stages.map((stage, index) => (
                  <div key={stage.id} className="flex flex-col items-center">
                    {/* Stage Node */}
                    <Card
                      className={`w-32 h-24 cursor-pointer transition-all duration-300 hover:scale-105 ${getStatusColor(stage.status)}`}
                      onClick={() => setSelectedTrace(stage.id)}
                    >
                      <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                        <div className="flex items-center justify-center mb-1">{getStageIcon(stage.type)}</div>
                        <p className="text-sm font-medium text-center">{stage.label}</p>
                        <p className="text-xs text-center mt-1">{stage.confidence}%</p>
                      </CardContent>
                    </Card>

                    {/* Stage Details */}
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium">{stage.impact}</p>
                      <p className="text-xs text-muted-foreground">{stage.processingTime}ms</p>
                    </div>

                    {/* Arrow to next stage */}
                    {index < stages.length - 1 && (
                      <div className="absolute top-12 flex items-center" style={{ left: `${(index + 1) * 20 - 2}%` }}>
                        <ArrowRight className={`h-5 w-5 ${currentStage > index ? "text-blue-500" : "text-gray-300"}`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Current Stage Details */}
              {stages[currentStage] && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2 text-blue-800">
                      {getStageIcon(stages[currentStage].type)}
                      {stages[currentStage].label} Stage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className="ml-2" variant="outline">
                          {stages[currentStage].status}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Processing Time:</span>
                        <span className="ml-2 font-mono">{stages[currentStage].processingTime}ms</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Expected Impact:</span>
                        <span className="ml-2 font-medium">{stages[currentStage].impact}</span>
                      </div>
                    </div>
                    {stages[currentStage].status === "processing" && (
                      <Progress value={((Date.now() % 3000) / 3000) * 100} className="mt-3" />
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right Sidebar: Decision Timeline (4 columns) */}
          <div className="col-span-4 flex flex-col h-full">
            {/* Timeline Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-blue-500" />
                  Decision Timeline
                </h3>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant={timelineFilter === "all" ? "default" : "outline"}
                    onClick={() => setTimelineFilter("all")}
                    className="h-6 text-xs"
                  >
                    All
                  </Button>
                  <Button
                    size="sm"
                    variant={timelineFilter === "critical" ? "default" : "outline"}
                    onClick={() => setTimelineFilter("critical")}
                    className="h-6 text-xs"
                  >
                    Critical
                  </Button>
                  <Button
                    size="sm"
                    variant={timelineFilter === "failed" ? "default" : "outline"}
                    onClick={() => setTimelineFilter("failed")}
                    className="h-6 text-xs"
                  >
                    Failed
                  </Button>
                </div>
              </div>
            </div>

            {/* Timeline Traces */}
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {filteredTraces.map((trace) => (
                <Card
                  key={trace.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedTrace === trace.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedTrace(trace.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            trace.status === "executing"
                              ? "bg-blue-500 animate-pulse"
                              : trace.status === "complete"
                                ? "bg-green-500"
                                : trace.status === "failed"
                                  ? "bg-red-500"
                                  : "bg-amber-500"
                          }`}
                        />
                        <span className="font-medium text-sm">{trace.action}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{trace.timestamp}</span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-1">Trigger:</span>
                        <span>{trace.trigger}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-1">Impact:</span>
                        <span>{trace.impact}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <div className="flex items-center">
                          <span className="text-muted-foreground mr-1">Confidence:</span>
                          <span className="font-mono">{trace.confidence}%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-muted-foreground mr-1">Duration:</span>
                          <span className="font-mono">{trace.duration}ms</span>
                        </div>
                      </div>
                    </div>

                    {selectedTrace === trace.id && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs font-medium mb-1">Reasoning Chain:</p>
                        <ul className="text-xs space-y-0.5">
                          {trace.reasoning.map((reason, index) => (
                            <li key={index} className="flex items-center">
                              <ChevronRight className="h-3 w-3 mr-1 text-muted-foreground" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: System Drivers */}
        <div className="border-t bg-slate-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold flex items-center">
              <Activity className="h-4 w-4 mr-1.5 text-blue-500" />
              System Drivers
              <Badge variant="outline" className="ml-2 text-xs">
                Sorted by Influence
              </Badge>
            </h3>
            <Button size="sm" variant="outline" className="h-6 text-xs">
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {drivers
              .sort((a, b) => b.influence - a.influence)
              .map((driver) => (
                <Card key={driver.id} className="p-3 border shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      {driver.id === "cpu" && <Cpu className="h-4 w-4 mr-1.5 text-amber-500" />}
                      {driver.id === "memory" && <Database className="h-4 w-4 mr-1.5 text-blue-500" />}
                      {driver.id === "network" && <Network className="h-4 w-4 mr-1.5 text-green-500" />}
                      {driver.id === "cost" && <TrendingUp className="h-4 w-4 mr-1.5 text-purple-500" />}
                      <span className="text-sm font-medium">{driver.label}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        driver.status === "critical"
                          ? "text-red-600 border-red-200"
                          : driver.status === "warning"
                            ? "text-amber-600 border-amber-200"
                            : "text-green-600 border-green-200"
                      }`}
                    >
                      {driver.influence}% influence
                    </Badge>
                  </div>

                  <div className="flex items-end justify-between mb-2">
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold">{driver.value}</span>
                      <span className="text-xs ml-1 text-muted-foreground">{driver.unit}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {driver.trend[driver.trend.length - 1] > driver.trend[driver.trend.length - 2] ? (
                        <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                      )}
                      <span>
                        {Math.abs(
                          driver.trend[driver.trend.length - 1] - driver.trend[driver.trend.length - 2],
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>

                  {/* Mini Sparkline */}
                  <div className="h-8 flex items-end justify-between">
                    {driver.trend.map((value, index) => (
                      <div
                        key={index}
                        className={`w-2 rounded-t ${
                          driver.status === "critical"
                            ? "bg-red-500"
                            : driver.status === "warning"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                        }`}
                        style={{ height: `${(value / 100) * 32}px` }}
                      />
                    ))}
                  </div>

                  <Progress
                    value={driver.value}
                    className={`h-1 mt-2 ${
                      driver.status === "critical"
                        ? "bg-red-100"
                        : driver.status === "warning"
                          ? "bg-amber-100"
                          : "bg-blue-100"
                    }`}
                  />
                </Card>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
