"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardContent } from "@/components/dashboard-content"
import { NavigationProvider } from "@/components/layout/app-header"

type Context = "personal" | "organization" | "billing"

export default function DashboardPage() {
  const [currentContext, setCurrentContext] = useState<Context>("personal")

  return (
    <NavigationProvider>
      <DashboardLayout currentContext={currentContext} onContextChange={setCurrentContext}>
        <DashboardContent context={currentContext} />
      </DashboardLayout>
    </NavigationProvider>
  )
}
