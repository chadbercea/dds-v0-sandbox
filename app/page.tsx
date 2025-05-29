"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardContent } from "@/components/dashboard-content"

type Context = "personal" | "organization" | "billing"

export default function HomePage() {
  const [currentContext, setCurrentContext] = useState<Context>("personal")

  return (
    <DashboardLayout currentContext={currentContext} onContextChange={setCurrentContext}>
      <DashboardContent context={currentContext} />
    </DashboardLayout>
  )
}
