"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Send, Layers, MicroscopeIcon as Scope, History } from "lucide-react"

export function PromptSurface() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Prompt Surface
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Scope className="h-3 w-3" />
              Context: Data Analysis
            </Badge>
            <Button size="sm" variant="ghost">
              <History className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">@data-analyst</Badge>
          <Badge variant="secondary">scope:datasets</Badge>
          <Badge variant="secondary">memory:persistent</Badge>
        </div>

        <Separator />

        <div className="flex gap-4 h-32">
          <Textarea placeholder="Compose your prompt with scoped context layers..." className="flex-1 resize-none" />
          <div className="flex flex-col gap-2">
            <Button size="sm" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Execute
            </Button>
            <Button size="sm" variant="outline">
              Fork Context
            </Button>
            <Button size="sm" variant="outline">
              Save Scope
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Context layers: User Intent → Data Analysis → Security Constraints → Output Format
        </div>
      </CardContent>
    </Card>
  )
}
