"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Play, Pause, Trash2, Brain, Database, Shield } from "lucide-react"

export function ContextShells() {
  const shells = [
    {
      id: "shell-1",
      name: "Data Analyst",
      status: "active",
      memory: "2.3GB",
      permissions: ["read:datasets", "write:reports"],
      tasks: 3,
      icon: Database,
    },
    {
      id: "shell-2",
      name: "Security Auditor",
      status: "paused",
      memory: "1.8GB",
      permissions: ["read:logs", "scan:vulnerabilities"],
      tasks: 1,
      icon: Shield,
    },
    {
      id: "shell-3",
      name: "Code Assistant",
      status: "spawning",
      memory: "0.5GB",
      permissions: ["read:code", "write:suggestions"],
      tasks: 0,
      icon: Brain,
    },
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Context Shells</h4>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New Shell
        </Button>
      </div>

      <div className="space-y-3">
        {shells.map((shell) => {
          const IconComponent = shell.icon
          return (
            <Card key={shell.id} className="p-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <IconComponent className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium truncate">{shell.name}</p>
                    <Badge
                      variant={
                        shell.status === "active" ? "default" : shell.status === "paused" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {shell.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {shell.memory} • {shell.tasks} tasks
                  </p>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      {shell.status === "active" ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-500">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
