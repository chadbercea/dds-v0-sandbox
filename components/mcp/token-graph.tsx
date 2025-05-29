"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Command } from "lucide-react"

export function TokenGraph() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Command className="h-5 w-5" />
          Token Graph
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground">Ready to build</p>
        </div>
      </CardContent>
    </Card>
  )
}
