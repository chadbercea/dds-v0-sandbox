import { AppLayout, AppHeader } from "@/components/layout/app-layout"

export default function HomePage() {
  return (
    <AppLayout
      header={<AppHeader />}
      leftPanel={
        <div className="p-4">
          <h4 className="font-medium mb-4">Left Panel</h4>
          <p className="text-sm text-muted-foreground">Panel content goes here</p>
        </div>
      }
      rightPanel={
        <div className="p-4">
          <h4 className="font-medium mb-4">Right Panel</h4>
          <p className="text-sm text-muted-foreground">Panel content goes here</p>
        </div>
      }
      bottomPanel={
        <div className="p-4">
          <h4 className="font-medium mb-4">Bottom Panel</h4>
          <p className="text-sm text-muted-foreground">Panel content goes here</p>
        </div>
      }
    >
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Main Content Area</h1>
          <p className="text-muted-foreground">Core panel interactions ready</p>
        </div>
      </div>
    </AppLayout>
  )
}
