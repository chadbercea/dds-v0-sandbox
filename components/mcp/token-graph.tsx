"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Brain, Command, Layers, Pause, Play, Shield, Target, Zap } from "lucide-react"

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
    <Card className="h-full overflow-hidden border-0 shadow-lg">
      {/* Header Strip */}
      <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white text-lg">
              <Command className="h-5 w-5" />
              Token Graph
            </CardTitle>
            <p className="text-slate-300 text-sm mt-0.5">Decision Intelligence Dashboard</p>
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
          </div>
        </div>
      </CardHeader>

      {/* Main Content Area */}
      <CardContent className="p-6 h-full">
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">Clean Slate</h3>
            <p className="text-sm text-muted-foreground">Ready to build the perfect decision flow visualization</p>
            <Badge variant="outline" className="mt-4">
              DDS + shadcn/ui only
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
