import { AppLayout, AppHeader } from "@/components/layout/app-layout"
import { ContextShells } from "@/components/mcp/context-shells"
import { TokenGraph } from "@/components/mcp/token-graph"
import { PromptSurface } from "@/components/mcp/prompt-surface"
import { RuntimePanel } from "@/components/mcp/runtime-panel"
import { TraceWindow } from "@/components/mcp/trace-window"
import { DeploymentControls } from "@/components/mcp/deployment-controls"

export default function MCPRuntimePage() {
  return (
    <AppLayout
      header={<AppHeader />}
      leftPanel={<ContextShells />}
      rightPanel={
        <div className="space-y-4">
          <RuntimePanel />
          <TraceWindow />
        </div>
      }
      bottomPanel={<DeploymentControls />}
    >
      {/* Main Content: Token Graph + Prompt Surface */}
      <div className="h-full flex flex-col">
        <div className="flex-1 p-4">
          <TokenGraph />
        </div>
        <div className="h-80 border-t">
          <PromptSurface />
        </div>
      </div>
    </AppLayout>
  )
}
