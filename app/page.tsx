import { AppLayout, AppHeader } from "@/components/layout/app-layout"
import { TokenGraph } from "@/components/mcp/token-graph"

export default function HomePage() {
  return (
    <AppLayout
      header={<AppHeader />}
      leftPanel={
        <div className="p-4">
          <h4 className="font-medium mb-4">Context Shells</h4>
          <p className="text-sm text-muted-foreground">MCP runtime contexts</p>
        </div>
      }
      rightPanel={
        <div className="p-4">
          <h4 className="font-medium mb-4">Agent Control</h4>
          <p className="text-sm text-muted-foreground">Runtime controls</p>
        </div>
      }
      bottomPanel={
        <div className="p-4">
          <h4 className="font-medium mb-4">Deployment Controls</h4>
          <p className="text-sm text-muted-foreground">Deploy context controls</p>
        </div>
      }
    >
      <TokenGraph />
    </AppLayout>
  )
}
