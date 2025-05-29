"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Pause, Play, Square, AlertTriangle } from "lucide-react"

export function RuntimePanel() {
  const agents = [
    { name: "Data Analyst", status: "running", memory: 85, cpu: 23 },
    { name: "Security Auditor", status: "paused", memory: 45, cpu: 0 },
    { name: "Code Assistant", status: "spawning", memory: 12, cpu: 67 },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Runtime Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {agents.map((agent, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{agent.name}</span>
                <Badge
                  variant={agent.status === "running" ? "default" : agent.status === "paused" ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {agent.status}
                </Badge>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  {agent.status === "running" ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </Button>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-500">
                  <Square className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Memory</span>
                <span>{agent.memory}%</span>
              </div>
              <Progress value={agent.memory} className="h-1" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>CPU</span>
                <span>{agent.cpu}%</span>
              </div>
              <Progress value={agent.cpu} className="h-1" />
            </div>
          </div>
        ))}

        <div className="pt-2 border-t">
          <div className="flex items-center gap-2 text-xs text-orange-600">
            <AlertTriangle className="h-3 w-3" />
            Memory drift detected in Data Analyst context
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
