import { AppLayout, AppHeader } from "@/components/layout/app-layout"

export default function HomePage() {
  return (
    <AppLayout
      header={<AppHeader />}
      leftPanel={
        <div className="p-4 space-y-4">
          <h4 className="font-medium">Left Navigation</h4>
          <div className="space-y-2">
            <div className="p-2 rounded hover:bg-muted cursor-pointer">Dashboard</div>
            <div className="p-2 rounded hover:bg-muted cursor-pointer">Containers</div>
            <div className="p-2 rounded hover:bg-muted cursor-pointer">Images</div>
            <div className="p-2 rounded hover:bg-muted cursor-pointer">Volumes</div>
          </div>
        </div>
      }
      rightPanel={
        <div className="p-4 space-y-4">
          <h4 className="font-medium">Right Panel</h4>
          <div className="space-y-2">
            <div className="p-2 rounded bg-muted">Inspector</div>
            <div className="p-2 rounded bg-muted">Properties</div>
            <div className="p-2 rounded bg-muted">Actions</div>
          </div>
        </div>
      }
      bottomPanel={
        <div className="space-y-4">
          <h4 className="font-medium">Bottom Panel Content</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded bg-muted">Terminal</div>
            <div className="p-4 rounded bg-muted">Logs</div>
            <div className="p-4 rounded bg-muted">Console</div>
          </div>
        </div>
      }
    >
      {/* Main Content */}
      <div className="h-full flex items-center justify-center">
        <img src="/sub-marks/subMarkPrimary.svg" alt="Docker Submark" className="w-[400px] h-[400px] object-contain" />
      </div>
    </AppLayout>
  )
}
