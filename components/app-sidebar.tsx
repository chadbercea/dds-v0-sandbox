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

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const navigation = [
  {
    title: "Resources",
    items: [
      { title: "Containers", icon: Container, badge: "12", isActive: true },
      { title: "Images", icon: ImageIcon, badge: "24" },
      { title: "Volumes", icon: HardDrive, badge: "6" },
      { title: "Networks", icon: Network, badge: "4" },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "Compose", icon: Layers, badge: "3" },
      { title: "System Monitor", icon: Activity },
      { title: "Security", icon: Shield, badge: "3 alerts" },
    ],
  },
]

const quickActions = [
  { title: "Run Container", icon: Play, color: "bg-green-500" },
  { title: "Build Image", icon: Rocket, color: "bg-blue-500" },
  { title: "Create Volume", icon: Database, color: "bg-purple-500" },
  { title: "Open Terminal", icon: Terminal, color: "bg-gray-500" },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-background">
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-semibold">Navigation</h2>
        <p className="text-sm text-muted-foreground">Manage your Docker environment</p>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
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
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Navigation */}
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.isActive}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant={item.isActive ? "default" : "secondary"} className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <BookOpen className="w-4 h-4" />
              <span>Documentation</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
