"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GitBranch, Play, RotateCcw, Copy } from "lucide-react"

export function TraceWindow() {
  const traces = [
    { step: 1, action: "Intent parsed", result: "success", tokens: 247 },
    { step: 2, action: "Context loaded", result: "success", tokens: 892 },
    { step: 3, action: "Agent spawned", result: "pending", tokens: 445 },
    { step: 4, action: "Memory allocated", result: "waiting", tokens: 0 },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Trace Window
          </CardTitle>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Play className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-32">
          <div className="space-y-2">
            {traces.map((trace) => (
              <div key={trace.step} className="flex items-center justify-between p-2 rounded border">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                    {trace.step}
                  </Badge>
                  <span className="text-sm">{trace.action}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      trace.result === "success" ? "default" : trace.result === "pending" ? "secondary" : "outline"
                    }
                    className="text-xs"
                  >
                    {trace.result}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{trace.tokens}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-3 pt-3 border-t">
          <Button size="sm" variant="outline" className="w-full">
            Fork from Step 2
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
