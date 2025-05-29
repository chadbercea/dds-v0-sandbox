"use client"

import type React from "react"
import {
  LayoutDashboard,
  Search,
  Database,
  User,
  Sparkles,
  Cloud,
  Users,
  Shield,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ContextSwitcher } from "./context-switcher"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Context = "personal" | "organization" | "team" | "billing"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentContext: Context
  onContextChange: (context: Context) => void
}

export function DashboardLayout({ children, currentContext, onContextChange }: DashboardLayoutProps) {
  const getNavigationForContext = (context: Context) => {
    const baseNavigation = [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: Search, label: "Explore Images", href: "/explore" },
      { icon: Database, label: "My Repositories", href: "/repositories" },
    ]

    switch (context) {
      case "personal":
        return [...baseNavigation, { icon: Cloud, label: "Cloud Containers", href: "/cloud" }]
      case "organization":
        return [...baseNavigation, { icon: Cloud, label: "Cloud Containers", href: "/cloud" }]
      case "team":
        return [...baseNavigation, { icon: Cloud, label: "Cloud Containers", href: "/cloud" }]
      case "billing":
        return []
      default:
        return baseNavigation
    }
  }

  const getAdministrationItems = (context: Context) => {
    switch (context) {
      case "organization":
        return [
          { icon: Users, label: "Organization", href: "/organization" },
          { icon: Shield, label: "Security Scans", href: "/security" },
          { icon: BarChart3, label: "Analytics", href: "/analytics" },
        ]
      case "billing":
        return [
          { icon: Users, label: "Organization", href: "/organization" },
          { icon: Shield, label: "Security Scans", href: "/security" },
          { icon: BarChart3, label: "Analytics", href: "/analytics" },
        ]
      case "team":
        return []
      default:
        return []
    }
  }

  const getAccountItems = (context: Context) => {
    return [
      { icon: CreditCard, label: "Billing", href: "/billing" },
      { icon: Settings, label: "Settings", href: "/settings" },
    ]
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <img src="/sub-marks/subMarkPrimary.svg" alt="Docker" className="h-6" />
            <span className="font-semibold text-lg">Docker</span>
          </div>
        </div>

        {/* Context Switcher */}
        <div className="p-2 border-b border-border">
          <ContextSwitcher currentContext={currentContext} onContextChange={onContextChange} />
        </div>

        {/* Navigation */}
        <div className="flex-1 p-2">
          {getNavigationForContext(currentContext).length > 0 && (
            <nav className="space-y-1">
              {getNavigationForContext(currentContext).map((item) => {
                const Icon = item.icon
                return (
                  <Button key={item.href} variant="ghost" className="w-full justify-start h-9 rounded-lg" asChild>
                    <a href={item.href}>
                      <Icon className="mr-3 h-4 w-4" />
                      {item.label}
                    </a>
                  </Button>
                )
              })}
            </nav>
          )}

          {/* Administration Section */}
          {getAdministrationItems(currentContext).length > 0 && (
            <div className="mt-8">
              <div className="px-3 py-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Administration</h3>
              </div>
              <nav className="space-y-1">
                {getAdministrationItems(currentContext).map((item) => {
                  const Icon = item.icon
                  return (
                    <Button key={item.href} variant="ghost" className="w-full justify-start h-9 rounded-lg" asChild>
                      <a href={item.href}>
                        <Icon className="mr-3 h-4 w-4" />
                        {item.label}
                      </a>
                    </Button>
                  )
                })}
              </nav>
            </div>
          )}

          {/* Account Section */}
          <div className="mt-8">
            <div className="px-3 py-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Account</h3>
            </div>
            <nav className="space-y-1">
              {getAccountItems(currentContext).map((item) => {
                const Icon = item.icon
                return (
                  <Button key={item.href} variant="ghost" className="w-full justify-start h-9 rounded-lg" asChild>
                    <a href={item.href}>
                      <Icon className="mr-3 h-4 w-4" />
                      {item.label}
                    </a>
                  </Button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-2 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start h-auto p-3">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-medium text-sm">John Doe</div>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Switch Account</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-end">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-80" />
            </div>
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" />
              AI Assistant
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
