"use client"

import type React from "react"

import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        {/* Sticky Header - 80px, spans full width */}
        <AppHeader />

        {/* Main Layout Container - Below header */}
        <div className="flex">
          {/* Sidebar - Pushes content when open */}
          <AppSidebar />

          {/* Main Content Area - Gets pushed by sidebar */}
          <main className="flex-1 min-w-0">
            <div className="h-[calc(100vh-5rem)] overflow-auto">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
