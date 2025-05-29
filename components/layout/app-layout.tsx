"use client"

import type React from "react"

import { useState } from "react"
import { AppHeader } from "./app-header"
import { AppSidebar } from "./app-sidebar"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header - Fixed height, full width */}
      <AppHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main content area - Below header */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Conditional width */}
        <AppSidebar isOpen={sidebarOpen} />

        {/* Page content - Fills remaining space */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
