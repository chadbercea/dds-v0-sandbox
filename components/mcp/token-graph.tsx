"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Command } from "lucide-react"

export function TokenGraph() {
  return (
    <div className="p-5 h-screen">
      <Card className="w-full h-full rounded-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Command className="h-5 w-5" />
            Token Graph
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Ready to build</p>
        </CardContent>
      </Card>
    </div>
  )
}
