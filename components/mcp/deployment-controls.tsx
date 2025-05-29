"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Rocket, Package, Globe, Download } from "lucide-react"

export function DeploymentControls() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Deployment Controls</h4>
        <Button className="flex items-center gap-2">
          <Rocket className="h-4 w-4" />
          Deploy Context
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-4 w-4" />
            <span className="text-sm font-medium">Containerized</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Build Progress</span>
              <span>87%</span>
            </div>
            <Progress value={87} className="h-1" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">Service Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs">
              3 contexts
            </Badge>
            <Badge variant="secondary" className="text-xs">
              scoped
            </Badge>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Download className="h-4 w-4" />
            <span className="text-sm font-medium">Export</span>
          </div>
          <Button size="sm" variant="outline" className="w-full">
            Download Runtime
          </Button>
        </Card>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Everything visible is scoped. Everything scoped is deployable.
      </div>
    </div>
  )
}
