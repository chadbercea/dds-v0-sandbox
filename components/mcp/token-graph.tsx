"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Activity,
  AlertTriangle,
  Brain,
  Clock,
  Command,
  Cpu,
  Database,
  Eye,
  GitBranch,
  HardDrive,
  Info,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Types for our decision cockpit
interface Node {
  id: string
  type: "primary" | "secondary"
  category: "intent" | "context" | "constraints" | "reasoning" | "action"
  label: string
  status: "pending" | "processing" | "complete" | "error" | "blocked"
  confidence: number
  processingTime: number
  description: string
  data: any
  x?: number
  y?: number
  width?: number
  height?: number
}

interface Connection {
  id: string
  source: string
  target: string
  confidence: number
  value: number
  status: "active" | "inactive" | "error"
  data: any
}

interface SystemDriver {
  id: string
  label: string
  value: number
  threshold: number
  trend: number[]
  influence: number
  status: "normal" | "warning" | "critical"
  unit: string
}

export function TokenGraph() {
  const [agentPaused, setAgentPaused] = useState(false)
  const [hoveredElement, setHoveredElement] = useState<{ type: "node" | "connection"; id: string } | null>(null)
  const [animationStep, setAnimationStep] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)

  // Simulate real-time progression
  useEffect(() => {
    if (!agentPaused) {
      const interval = setInterval(() => {
        setAnimationStep((prev) => (prev < 10 ? prev + 1 : 0))
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [agentPaused])

  // Node definitions - Docker 2035 context
  const nodes: Node[] = [
    // Primary nodes
    {
      id: "intent",
      type: "primary",
      category: "intent",
      label: "User Intent",
      status: animationStep >= 1 ? "complete" : "processing",
      confidence: 98,
      processingTime: 120,
      description: "Scale web service to handle traffic spike",
      data: { userRequest: "Handle traffic spike", priority: "high" },
    },
    {
      id: "context",
      type: "primary",
      category: "context",
      label: "Context Layer",
      status: animationStep >= 3 ? "complete" : animationStep >= 1 ? "processing" : "pending",
      confidence: 94,
      processingTime: 340,
      description: "Current system state and historical patterns",
      data: { currentLoad: "78%", historicalPattern: "spike-recovery", timeOfDay: "peak" },
    },
    {
      id: "constraints",
      type: "primary",
      category: "constraints",
      label: "Constraints",
      status: animationStep >= 5 ? "complete" : animationStep >= 3 ? "processing" : "pending",
      confidence: 87,
      processingTime: 180,
      description: "System and business limitations",
      data: { budget: "available", security: "cleared", resources: "sufficient" },
    },
    {
      id: "reasoning",
      type: "primary",
      category: "reasoning",
      label: "Reasoning",
      status: animationStep >= 7 ? "complete" : animationStep >= 5 ? "processing" : "pending",
      confidence: 91,
      processingTime: 220,
      description: "Decision logic and alternatives",
      data: { alternatives: 3, riskScore: "low", expectedOutcome: "latency-20%" },
    },
    {
      id: "action",
      type: "primary",
      category: "action",
      label: "Action",
      status: animationStep >= 9 ? "complete" : animationStep >= 7 ? "processing" : "pending",
      confidence: 89,
      processingTime: 450,
      description: "Execute container scaling operation",
      data: { command: "kubectl scale", target: "web-service", replicas: 3 },
    },

    // Secondary nodes - Context derivatives
    {
      id: "historical-patterns",
      type: "secondary",
      category: "context",
      label: "Historical Patterns",
      status: animationStep >= 2 ? "complete" : "pending",
      confidence: 96,
      processingTime: 110,
      description: "Analysis of previous traffic patterns",
      data: { pattern: "Daily spike at 12:30-14:00", recovery: "15-20 minutes", similarity: "92%" },
    },
    {
      id: "current-load",
      type: "secondary",
      category: "context",
      label: "Current Load",
      status: animationStep >= 2 ? "complete" : "pending",
      confidence: 99,
      processingTime: 50,
      description: "Real-time container metrics",
      data: { cpu: "78%", memory: "64%", network: "42%", containers: "24 active" },
    },
    {
      id: "service-topology",
      type: "secondary",
      category: "context",
      label: "Service Topology",
      status: animationStep >= 2 ? "complete" : "pending",
      confidence: 92,
      processingTime: 180,
      description: "Container service relationships",
      data: { dependencies: ["auth-api", "database", "cache"], critical: "auth-api" },
    },

    // Secondary nodes - Constraints derivatives
    {
      id: "resource-limits",
      type: "secondary",
      category: "constraints",
      label: "Resource Limits",
      status: animationStep >= 4 ? "complete" : "pending",
      confidence: 95,
      processingTime: 90,
      description: "Available compute resources",
      data: { cpu: "22% available", memory: "36% available", nodes: "4/5 active" },
    },
    {
      id: "security-policies",
      type: "secondary",
      category: "constraints",
      label: "Security Policies",
      status: animationStep >= 4 ? "complete" : "pending",
      confidence: 88,
      processingTime: 130,
      description: "Security constraints and policies",
      data: { vulnerabilities: "None critical", policies: "Compliant", isolation: "Required" },
    },
    {
      id: "cost-boundaries",
      type: "secondary",
      category: "constraints",
      label: "Cost Boundaries",
      status: animationStep >= 4 ? "complete" : "pending",
      confidence: 82,
      processingTime: 70,
      description: "Budget and cost limitations",
      data: { budget: "$120/day", current: "$78/day", projected: "+$0.42/hr" },
    },

    // Secondary nodes - Reasoning derivatives
    {
      id: "scaling-strategy",
      type: "secondary",
      category: "reasoning",
      label: "Scaling Strategy",
      status: animationStep >= 6 ? "complete" : "pending",
      confidence: 93,
      processingTime: 140,
      description: "Optimal scaling approach",
      data: { horizontal: "Preferred", vertical: "Not needed", replicas: "3 optimal" },
    },
    {
      id: "risk-assessment",
      type: "secondary",
      category: "reasoning",
      label: "Risk Assessment",
      status: animationStep >= 6 ? "complete" : "pending",
      confidence: 89,
      processingTime: 160,
      description: "Potential risks and mitigations",
      data: { overprovisioning: "Low risk", underprovisioning: "Medium risk", stability: "High confidence" },
    },
    {
      id: "alternatives",
      type: "secondary",
      category: "reasoning",
      label: "Alternatives",
      status: animationStep >= 6 ? "error" : "pending", // Intentional error for visual interest
      confidence: 76,
      processingTime: 190,
      description: "Alternative approaches considered",
      data: {
        throttling: "Rejected - poor UX",
        caching: "Partial - already optimized",
        queueing: "Rejected - latency sensitive",
      },
    },

    // Secondary nodes - Action derivatives
    {
      id: "container-scaling",
      type: "secondary",
      category: "action",
      label: "Container Scaling",
      status: animationStep >= 8 ? "complete" : "pending",
      confidence: 94,
      processingTime: 220,
      description: "Scale web service containers",
      data: { command: "kubectl scale deployment/web-service --replicas=3", namespace: "production" },
    },
    {
      id: "load-balancing",
      type: "secondary",
      category: "action",
      label: "Load Balancing",
      status: animationStep >= 8 ? "complete" : "pending",
      confidence: 91,
      processingTime: 180,
      description: "Adjust load balancer configuration",
      data: { algorithm: "least_conn", healthChecks: "Increased frequency", timeout: "5s" },
    },
    {
      id: "monitoring-alert",
      type: "secondary",
      category: "action",
      label: "Monitoring Alert",
      status: animationStep >= 8 ? "complete" : "pending",
      confidence: 97,
      processingTime: 50,
      description: "Update monitoring thresholds",
      data: { alert: "Created", threshold: "85% CPU for 2min", notification: "DevOps channel" },
    },
  ]

  // Connection definitions
  const connections: Connection[] = [
    // Intent to Context connections
    {
      id: "intent-context",
      source: "intent",
      target: "context",
      confidence: 94,
      value: 10,
      status: animationStep >= 1 ? "active" : "inactive",
      data: { dataPoints: "User request parameters", timestamp: "12:42:03" },
    },

    // Context to secondary nodes
    {
      id: "context-historical",
      source: "context",
      target: "historical-patterns",
      confidence: 96,
      value: 7,
      status: animationStep >= 2 ? "active" : "inactive",
      data: { query: "Similar traffic patterns", matches: 4, bestMatch: "92% similarity" },
    },
    {
      id: "context-load",
      source: "context",
      target: "current-load",
      confidence: 99,
      value: 8,
      status: animationStep >= 2 ? "active" : "inactive",
      data: { metrics: "Real-time container stats", source: "Prometheus", freshness: "5s" },
    },
    {
      id: "context-topology",
      source: "context",
      target: "service-topology",
      confidence: 92,
      value: 6,
      status: animationStep >= 2 ? "active" : "inactive",
      data: { source: "Service mesh", dependencies: 3, critical: 1 },
    },

    // Context secondaries to Constraints
    {
      id: "historical-constraints",
      source: "historical-patterns",
      target: "constraints",
      confidence: 90,
      value: 7,
      status: animationStep >= 3 ? "active" : "inactive",
      data: { insight: "Previous scaling needs", prediction: "3 replicas needed" },
    },
    {
      id: "load-constraints",
      source: "current-load",
      target: "constraints",
      confidence: 95,
      value: 8,
      status: animationStep >= 3 ? "active" : "inactive",
      data: { insight: "Current resource pressure", urgency: "High" },
    },
    {
      id: "topology-constraints",
      source: "service-topology",
      target: "constraints",
      confidence: 88,
      value: 6,
      status: animationStep >= 3 ? "active" : "inactive",
      data: { insight: "Service dependencies", critical: "Auth service stability" },
    },

    // Constraints to secondary nodes
    {
      id: "constraints-resources",
      source: "constraints",
      target: "resource-limits",
      confidence: 95,
      value: 7,
      status: animationStep >= 4 ? "active" : "inactive",
      data: { query: "Available cluster resources", source: "Kubernetes API" },
    },
    {
      id: "constraints-security",
      source: "constraints",
      target: "security-policies",
      confidence: 88,
      value: 6,
      status: animationStep >= 4 ? "active" : "inactive",
      data: { query: "Security policy compliance", source: "Policy engine" },
    },
    {
      id: "constraints-cost",
      source: "constraints",
      target: "cost-boundaries",
      confidence: 82,
      value: 5,
      status: animationStep >= 4 ? "active" : "inactive",
      data: { query: "Budget constraints", source: "Cost management API" },
    },

    // Constraints secondaries to Reasoning
    {
      id: "resources-reasoning",
      source: "resource-limits",
      target: "reasoning",
      confidence: 92,
      value: 7,
      status: animationStep >= 5 ? "active" : "inactive",
      data: { insight: "Sufficient resources available", conclusion: "Scaling possible" },
    },
    {
      id: "security-reasoning",
      source: "security-policies",
      target: "reasoning",
      confidence: 86,
      value: 6,
      status: animationStep >= 5 ? "active" : "inactive",
      data: { insight: "No security blockers", conclusion: "Compliant action" },
    },
    {
      id: "cost-reasoning",
      source: "cost-boundaries",
      target: "reasoning",
      confidence: 80,
      value: 5,
      status: animationStep >= 5 ? "active" : "inactive",
      data: { insight: "Within budget constraints", conclusion: "Economically viable" },
    },

    // Reasoning to secondary nodes
    {
      id: "reasoning-strategy",
      source: "reasoning",
      target: "scaling-strategy",
      confidence: 93,
      value: 7,
      status: animationStep >= 6 ? "active" : "inactive",
      data: { analysis: "Optimal scaling approach", options: 3 },
    },
    {
      id: "reasoning-risk",
      source: "reasoning",
      target: "risk-assessment",
      confidence: 89,
      value: 6,
      status: animationStep >= 6 ? "active" : "inactive",
      data: { analysis: "Risk evaluation", factors: 5 },
    },
    {
      id: "reasoning-alternatives",
      source: "reasoning",
      target: "alternatives",
      confidence: 76,
      value: 4,
      status: animationStep >= 6 ? "active" : "error", // Intentional error
      data: { analysis: "Alternative approaches", options: 3, viable: 0 },
    },

    // Reasoning secondaries to Action
    {
      id: "strategy-action",
      source: "scaling-strategy",
      target: "action",
      confidence: 91,
      value: 7,
      status: animationStep >= 7 ? "active" : "inactive",
      data: { decision: "Horizontal scaling", replicas: 3 },
    },
    {
      id: "risk-action",
      source: "risk-assessment",
      target: "action",
      confidence: 88,
      value: 6,
      status: animationStep >= 7 ? "active" : "inactive",
      data: { decision: "Acceptable risk level", monitoring: "Enhanced" },
    },

    // Action to secondary nodes
    {
      id: "action-scaling",
      source: "action",
      target: "container-scaling",
      confidence: 94,
      value: 7,
      status: animationStep >= 8 ? "active" : "inactive",
      data: { execution: "Container scaling command", target: "web-service" },
    },
    {
      id: "action-loadbalancing",
      source: "action",
      target: "load-balancing",
      confidence: 91,
      value: 6,
      status: animationStep >= 8 ? "active" : "inactive",
      data: { execution: "Load balancer configuration", algorithm: "least_conn" },
    },
    {
      id: "action-monitoring",
      source: "action",
      target: "monitoring-alert",
      confidence: 97,
      value: 5,
      status: animationStep >= 8 ? "active" : "inactive",
      data: { execution: "Monitoring alert creation", threshold: "85% CPU" },
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

  // Layout calculations for nodes
  const calculateNodePositions = () => {
    const svgWidth = svgRef.current?.clientWidth || 1000
    const svgHeight = svgRef.current?.clientHeight || 600

    const nodeWidth = 140
    const nodeHeight = 70
    const primaryNodeHeight = 90

    // Column positions (5 columns for primary nodes)
    const columnWidth = svgWidth / 5
    const columnPositions = [0, 1, 2, 3, 4].map((i) => i * columnWidth + columnWidth / 2 - nodeWidth / 2)

    // Categories for organizing nodes
    const categories = ["intent", "context", "constraints", "reasoning", "action"]

    // Position primary nodes in their columns
    const primaryNodes = nodes.filter((n) => n.type === "primary")
    primaryNodes.forEach((node) => {
      const columnIndex = categories.indexOf(node.category)
      node.x = columnPositions[columnIndex]
      node.y = svgHeight / 2 - primaryNodeHeight / 2
      node.width = nodeWidth
      node.height = primaryNodeHeight
    })

    // Position secondary nodes around their primary nodes
    const secondaryNodes = nodes.filter((n) => n.type === "secondary")
    const secondaryByCategory = categories.map((category) => secondaryNodes.filter((n) => n.category === category))

    secondaryByCategory.forEach((categoryNodes, columnIndex) => {
      if (categoryNodes.length === 0) return

      const primaryX = columnPositions[columnIndex]
      const primaryY = svgHeight / 2

      // Position secondary nodes in a vertical arrangement
      const totalHeight = categoryNodes.length * nodeHeight + (categoryNodes.length - 1) * 20
      const startY = primaryY - totalHeight / 2 - primaryNodeHeight / 2 - 40

      categoryNodes.forEach((node, i) => {
        node.x = primaryX
        node.y = startY + i * (nodeHeight + 20)
        node.width = nodeWidth
        node.height = nodeHeight
      })
    })

    return [...primaryNodes, ...secondaryNodes]
  }

  // Calculate Sankey paths between nodes
  const calculateSankeyPaths = (positionedNodes: Node[]) => {
    const nodeMap = positionedNodes.reduce(
      (acc, node) => {
        acc[node.id] = node
        return acc
      },
      {} as Record<string, Node>,
    )

    return connections
      .map((conn) => {
        const source = nodeMap[conn.source]
        const target = nodeMap[conn.target]

        if (!source || !target) return null

        // Calculate connection points
        const sourceX = source.x! + source.width!
        const sourceY = source.y! + source.height! / 2
        const targetX = target.x!
        const targetY = target.y! + target.height! / 2

        // Calculate control points for the curve
        const controlPointX = (sourceX + targetX) / 2

        // Calculate path thickness based on confidence
        const thickness = Math.max(2, Math.min(12, conn.confidence / 10))

        // Generate SVG path
        const path = `
        M ${sourceX} ${sourceY}
        C ${controlPointX} ${sourceY}, ${controlPointX} ${targetY}, ${targetX} ${targetY}
      `

        return {
          ...conn,
          path,
          thickness,
          sourceX,
          sourceY,
          targetX,
          targetY,
        }
      })
      .filter(Boolean) as (Connection & {
      path: string
      thickness: number
      sourceX: number
      sourceY: number
      targetX: number
      targetY: number
    })[]
  }

  // Get node icon based on category
  const getNodeIcon = (category: string) => {
    switch (category) {
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
        return <Info className="h-4 w-4" />
    }
  }

  // Get status color for nodes and connections
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

  // Get connection color based on status
  const getConnectionColor = (status: string) => {
    switch (status) {
      case "active":
        return "#3b82f6" // blue-500
      case "inactive":
        return "#d1d5db" // gray-300
      case "error":
        return "#ef4444" // red-500
      default:
        return "#d1d5db" // gray-300
    }
  }

  // Position nodes and calculate paths
  const positionedNodes = calculateNodePositions()
  const sankeyPaths = calculateSankeyPaths(positionedNodes)

  // Find hovered element details
  const hoveredNode = hoveredElement?.type === "node" ? nodes.find((n) => n.id === hoveredElement.id) : null

  const hoveredConnection =
    hoveredElement?.type === "connection" ? connections.find((c) => c.id === hoveredElement.id) : null

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
          {/* Main Area: Node + Sankey Hybrid Flow (12 columns) */}
          <div className="col-span-12 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <GitBranch className="h-5 w-5 mr-2 text-blue-500" />
                Decision Flow
              </h3>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-sm">
                  Confidence: {Math.round(nodes.reduce((sum, n) => sum + n.confidence, 0) / nodes.length)}%
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Step: {animationStep}/10
                </Badge>
              </div>
            </div>

            {/* Node + Sankey Visualization */}
            <div className="relative h-[500px] border rounded-lg bg-slate-50/50">
              <svg ref={svgRef} className="w-full h-full" style={{ overflow: "visible" }}>
                {/* Sankey Paths */}
                {sankeyPaths.map((conn) => (
                  <TooltipProvider key={conn.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <path
                          d={conn.path}
                          stroke={getConnectionColor(conn.status)}
                          strokeWidth={conn.thickness}
                          fill="none"
                          strokeOpacity={0.7}
                          className={`transition-all duration-300 ${conn.status === "active" ? "animate-pulse" : ""}`}
                          onMouseEnter={() => setHoveredElement({ type: "connection", id: conn.id })}
                          onMouseLeave={() => setHoveredElement(null)}
                          style={{ cursor: "pointer" }}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <div className="space-y-1">
                          <div className="font-medium">
                            {conn.source} → {conn.target}
                          </div>
                          <div className="text-xs">Confidence: {conn.confidence}%</div>
                          <div className="text-xs">
                            Data: {conn.data.insight || conn.data.execution || conn.data.query || "Data flow"}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}

                {/* Nodes */}
                {positionedNodes.map((node) => (
                  <TooltipProvider key={node.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <g
                          transform={`translate(${node.x}, ${node.y})`}
                          onMouseEnter={() => setHoveredElement({ type: "node", id: node.id })}
                          onMouseLeave={() => setHoveredElement(null)}
                          style={{ cursor: "pointer" }}
                        >
                          <rect
                            width={node.width}
                            height={node.height}
                            rx={6}
                            className={`stroke-2 ${
                              node.type === "primary"
                                ? node.status === "processing"
                                  ? "fill-blue-100 stroke-blue-500 animate-pulse"
                                  : node.status === "complete"
                                    ? "fill-green-100 stroke-green-500"
                                    : node.status === "error"
                                      ? "fill-red-100 stroke-red-500"
                                      : "fill-gray-100 stroke-gray-300"
                                : node.status === "processing"
                                  ? "fill-blue-50 stroke-blue-300 animate-pulse"
                                  : node.status === "complete"
                                    ? "fill-green-50 stroke-green-300"
                                    : node.status === "error"
                                      ? "fill-red-50 stroke-red-300"
                                      : "fill-gray-50 stroke-gray-200"
                            }`}
                          />
                          <text
                            x={node.width! / 2}
                            y={node.type === "primary" ? 30 : 25}
                            textAnchor="middle"
                            className={`text-sm font-medium ${
                              node.status === "processing"
                                ? "fill-blue-800"
                                : node.status === "complete"
                                  ? "fill-green-800"
                                  : node.status === "error"
                                    ? "fill-red-800"
                                    : "fill-gray-800"
                            }`}
                          >
                            {node.label}
                          </text>
                          {node.type === "primary" && (
                            <text x={node.width! / 2} y={55} textAnchor="middle" className="text-xs fill-gray-500">
                              {node.description}
                            </text>
                          )}
                          <text
                            x={node.width! / 2}
                            y={node.type === "primary" ? 75 : 45}
                            textAnchor="middle"
                            className="text-xs font-mono"
                          >
                            {node.confidence}%
                          </text>
                        </g>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <div className="space-y-1">
                          <div className="font-medium">{node.label}</div>
                          <div className="text-xs">{node.description}</div>
                          <div className="text-xs">Status: {node.status}</div>
                          <div className="text-xs">Processing time: {node.processingTime}ms</div>
                          {node.data && (
                            <div className="text-xs mt-1 pt-1 border-t">
                              {Object.entries(node.data).map(([key, value]) => (
                                <div key={key}>
                                  {key}: {value as string}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </svg>

              {/* Hover Details Panel */}
              {(hoveredNode || hoveredConnection) && (
                <div className="absolute bottom-4 right-4 w-64 bg-white p-3 rounded-lg border shadow-lg">
                  {hoveredNode && (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        {getNodeIcon(hoveredNode.category)}
                        <h4 className="font-medium">{hoveredNode.label}</h4>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge variant="outline" className="text-xs">
                            {hoveredNode.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Confidence:</span>
                          <span className="font-mono">{hoveredNode.confidence}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Processing:</span>
                          <span>{hoveredNode.processingTime}ms</span>
                        </div>
                      </div>
                    </>
                  )}

                  {hoveredConnection && (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <GitBranch className="h-4 w-4" />
                        <h4 className="font-medium">Data Flow</h4>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">From:</span>
                          <span>{hoveredConnection.source}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">To:</span>
                          <span>{hoveredConnection.target}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Confidence:</span>
                          <span className="font-mono">{hoveredConnection.confidence}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge variant="outline" className="text-xs">
                            {hoveredConnection.status}
                          </Badge>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
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
                      {driver.id === "cost" && <HardDrive className="h-4 w-4 mr-1.5 text-purple-500" />}
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
