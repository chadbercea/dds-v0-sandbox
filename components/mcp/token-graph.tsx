"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Target, Cog } from "lucide-react"

export function TokenGraph() {
  const nodes = [
    { id: "intent", label: "User Intent", type: "input", active: true },
    { id: "context", label: "Context Layer", type: "processing", active: true },
    { id: "agent", label: "Agent Behavior", type: "output", active: false },
    { id: "system", label: "System State", type: "state", active: true },
  ]

  const flows = [
    { from: "intent", to: "context", tokens: 1247, active: true },
    { from: "context", to: "agent", tokens: 892, active: false },
    { from: "agent", to: "system", tokens: 445, active: false },
    { from: "system", to: "context", tokens: 203, active: true },
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Token Graph
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Live</Badge>
            <Button size="sm" variant="outline">
              Reset Scope
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 h-64">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex flex-col items-center justify-center">
              <Card
                className={`w-full h-20 flex items-center justify-center ${node.active ? "border-blue-500 bg-blue-50" : "border-muted"}`}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    {node.type === "input" && <Target className="h-4 w-4" />}
                    {node.type === "processing" && <Cog className="h-4 w-4" />}
                    {node.type === "output" && <Zap className="h-4 w-4" />}
                    {node.type === "state" && <div className="h-2 w-2 rounded-full bg-green-500" />}
                  </div>
                  <p className="text-xs font-medium">{node.label}</p>
                </div>
              </Card>
              {index < nodes.length - 1 && (
                <div className="flex items-center mt-2">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {flows[index]?.tokens || 0}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">1,247</p>
            <p className="text-xs text-muted-foreground">Active Tokens</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">3</p>
            <p className="text-xs text-muted-foreground">Scoped Contexts</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">2</p>
            <p className="text-xs text-muted-foreground">Deployable States</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
