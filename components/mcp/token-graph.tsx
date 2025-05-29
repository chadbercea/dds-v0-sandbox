"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Target,
  Activity,
  Eye,
  GitBranch,
  Timer,
  Gauge,
} from "lucide-react"
import { useState } from "react"

interface DecisionEvent {
  id: string
  trigger: string
  reasoning: string
  action: string
  confidence: number
  impact: "low" | "medium" | "high" | "critical"
  status: "executing" | "completed" | "failed" | "pending"
  timestamp: string
  factors: string[]
}

interface InfluenceFactor {
  name: string
  value: number
  trend: "up" | "down" | "stable"
  weight: number
  critical: boolean
}

export function TokenGraph() {
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null)

  const recentDecisions: DecisionEvent[] = [
    {
      id: "scale-001",
      trigger: "CPU Threshold Breach",
      reasoning: "Container CPU >85% for 3min, traffic pattern suggests sustained load",
      action: "Scale replicas 3→5",
      confidence: 94,
      impact: "medium",
      status: "executing",
      timestamp: "2s ago",
      factors: ["cpu-pressure", "traffic-pattern", "cost-budget"],
    },
    {
      id: "sec-002",
      trigger: "CVE Detection",
      reasoning: "Critical vulnerability in base image, no active exploits detected",
      action: "Isolate & rebuild",
      confidence: 99,
      impact: "high",
      status: "completed",
      timestamp: "45s ago",
      factors: ["security-scan", "vulnerability-db", "blast-radius"],
    },
    {
      id: "opt-003",
      trigger: "Cost Optimization",
      reasoning: "Low utilization pattern detected, consolidation opportunity",
      action: "Migrate to smaller nodes",
      confidence: 78,
      impact: "low",
      status: "pending",
      timestamp: "2m ago",
      factors: ["utilization-trend", "cost-target", "performance-sla"],
    },
  ]

  const influenceFactors: InfluenceFactor[] = [
    { name: "CPU Pressure", value: 87, trend: "up", weight: 0.9, critical: true },
    { name: "Memory Usage", value: 64, trend: "stable", weight: 0.7, critical: false },
    { name: "Network Latency", value: 23, trend: "down", weight: 0.8, critical: false },
    { name: "Security Score", value: 96, trend: "up", weight: 1.0, critical: true },
    { name: "Cost Efficiency", value: 71, trend: "up", weight: 0.6, critical: false },
    { name: "Error Rate", value: 12, trend: "down", weight: 0.9, critical: false },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "executing":
        return <Timer className="h-4 w-4 text-blue-500 animate-spin" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical":
        return "border-red-500 bg-red-50"
      case "high":
        return "border-orange-500 bg-orange-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      case "low":
        return "border-blue-500 bg-blue-50"
      default:
        return "border-muted"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-red-500" />
      case "down":
        return <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />
      case "stable":
        return <div className="h-3 w-3 rounded-full bg-gray-400" />
      default:
        return null
    }
  }

  return (
    <Card className="h-full bg-gradient-to-br from-slate-50 to-slate-100 border-2">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-blue-600 text-white">
              <Brain className="h-6 w-6" />
            </div>
            Decision Intelligence Dashboard
          </CardTitle>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="animate-pulse border-green-500 text-green-700">
              <Activity className="h-3 w-3 mr-1" />
              LIVE ANALYSIS
            </Badge>
            <Button size="sm" variant="outline" className="border-blue-500 text-blue-700">
              <Eye className="h-4 w-4 mr-1" />
              Deep Trace
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* TACTICAL COMMAND CENTER LAYOUT */}

        {/* TOP ROW: REAL-TIME INFLUENCE FACTORS */}
        <div className="grid grid-cols-6 gap-3">
          {influenceFactors.map((factor, index) => (
            <Card
              key={factor.name}
              className={`relative overflow-hidden transition-all hover:scale-105 cursor-pointer ${
                factor.critical ? "border-red-400 shadow-lg" : "border-slate-300"
              }`}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{factor.name}</span>
                  {getTrendIcon(factor.trend)}
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-black text-slate-800">{factor.value}</span>
                  <span className="text-xs text-slate-500 mb-1">%</span>
                </div>
                <Progress value={factor.value} className="h-1 mt-2" />
                {factor.critical && (
                  <div className="absolute top-1 right-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* MIDDLE ROW: DECISION STREAM */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-800">ACTIVE DECISION STREAM</h3>
            <Badge variant="secondary" className="ml-auto">
              3 EXECUTING
            </Badge>
          </div>

          <div className="grid gap-3">
            {recentDecisions.map((decision) => (
              <Card
                key={decision.id}
                className={`${getImpactColor(decision.impact)} border-l-4 hover:shadow-lg transition-all cursor-pointer ${
                  selectedDecision === decision.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedDecision(selectedDecision === decision.id ? null : decision.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(decision.status)}
                        <span className="font-bold text-slate-800">{decision.trigger}</span>
                        <Badge variant="outline" className="text-xs">
                          {decision.confidence}% CONFIDENCE
                        </Badge>
                        <span className="text-xs text-slate-500 ml-auto">{decision.timestamp}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            REASONING
                          </span>
                          <p className="text-sm text-slate-700 mt-1">{decision.reasoning}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            ACTION TAKEN
                          </span>
                          <p className="text-sm font-bold text-slate-800 mt-1">{decision.action}</p>
                        </div>
                      </div>

                      {selectedDecision === decision.id && (
                        <div className="border-t pt-3 mt-3">
                          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            INFLUENCE FACTORS
                          </span>
                          <div className="flex gap-2 mt-2">
                            {decision.factors.map((factor) => (
                              <Badge key={factor} variant="secondary" className="text-xs">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        variant={decision.impact === "critical" ? "destructive" : "secondary"}
                        className="text-xs font-bold"
                      >
                        {decision.impact.toUpperCase()}
                      </Badge>
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-1000"
                          style={{ width: `${decision.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: SYSTEM INTELLIGENCE METRICS */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-2xl font-black text-blue-800">94%</p>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Decision Accuracy</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-300">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Gauge className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-2xl font-black text-green-800">23ms</p>
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Decision Latency</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <GitBranch className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-black text-purple-800">7</p>
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Active Branches</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-2xl font-black text-orange-800">2</p>
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Interventions Req'd</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
