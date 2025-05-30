"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TokenGraph() {
  return (
    <div className="p-5 h-full">
      <Card className="w-full h-full rounded-sm">
        <CardHeader>
          <CardTitle>Token Graph</CardTitle>
        </CardHeader>
        <CardContent>{/* Content area */}</CardContent>
      </Card>
    </div>
  )
}
