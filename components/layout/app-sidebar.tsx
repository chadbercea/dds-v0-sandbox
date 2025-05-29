"use client"

import {
  Container,
  ImageIcon,
  HardDrive,
  Network,
  Layers,
  Activity,
  Shield,
  Settings,
  BookOpen,
  Play,
  Rocket,
  Database,
  Terminal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

interface AppSidebarProps {
  isOpen: boolean
}

const navigation = [
  {
    title: "Resources",
    items: [
      { title: "Containers", icon: Container, badge: "12", href: "/containers" },
      { title: "Images", icon: ImageIcon, badge: "24", href: "/images" },
      { title: "Volumes", icon: HardDrive, badge: "6", href: "/volumes" },
      { title: "Networks", icon: Network, badge: "4", href: "/networks" },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "Compose", icon: Layers, badge: "3", href: "/compose" },
      { title: "System Monitor", icon: Activity, href: "/system-monitor" },
      { title: "Security", icon: Shield, badge: "3 alerts", href: "/security" },
      { title: "Settings", icon: Settings, href: "/settings" },
      { title: "Documentation", icon: BookOpen, href: "/documentation" },
    ],
  },
]

const quickActions = [
  { title: "Run Container", icon: Play, color: "bg-green-500" },
  { title: "Build Image", icon: Rocket, color: "bg-blue-500" },
  { title: "Create Volume", icon: Database, color: "bg-purple-500" },
  { title: "Open Terminal", icon: Terminal, color: "bg-gray-500" },
]

export function AppSidebar({ isOpen }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside
      className={cn(
        "bg-background border-r border-border transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "w-64" : "w-0",
      )}
    >
      <div className="w-64 h-full flex flex-col">
        {/* Header */}

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 space-y-6">
          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  variant="outline"
                  size="sm"
                  className="h-auto flex-col gap-1 p-3 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className={`w-6 h-6 rounded ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs">{action.title}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">{section.title}</h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Button
                    key={item.title}
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 h-10"
                    onClick={() => {
                      if (item.href) {
                        router.push(item.href)
                      }
                    }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <Badge variant={pathname === item.href ? "default" : "secondary"} className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
      </div>
    </aside>
  )
}
