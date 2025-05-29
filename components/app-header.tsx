"use client"

import { Search, Bell, Settings, Grid3X3, User, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppHeader() {
  return (
    <header className="sticky top-0 h-20 w-full bg-blue-600 border-b border-blue-700 flex items-center justify-between px-4 lg:px-6 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-white hover:bg-blue-700 border-0" />
        <img src="/sub-marks/subMarkWhite.svg" alt="Docker" className="w-8 h-8" />
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-4 lg:mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 w-4 h-4" />
          <Input
            placeholder="Search containers, images, volumes... ⌘K"
            className="pl-10 bg-blue-700/50 border-blue-500 text-white placeholder:text-blue-200 focus:bg-blue-700/70 focus:border-blue-400"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* App Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 border-0">
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Docker Applications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-3 p-3">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-sm font-medium">D</span>
              </div>
              <div>
                <div className="font-medium">Docker Desktop</div>
                <div className="text-sm text-muted-foreground">Container management</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3 p-3">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <span className="text-white text-sm font-medium">H</span>
              </div>
              <div>
                <div className="font-medium">Docker Hub</div>
                <div className="text-sm text-muted-foreground">Image registry</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative text-white hover:bg-blue-700 border-0">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500 border-2 border-blue-600">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary" className="text-xs">
                3 new
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 border-l-4 border-red-500">
              <div className="font-medium text-red-600">🚨 Security Alert</div>
              <div className="text-sm text-muted-foreground">Critical vulnerability in nginx:latest</div>
              <div className="text-xs text-muted-foreground">2 minutes ago</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 border-l-4 border-yellow-500">
              <div className="font-medium text-yellow-600">⚠️ Container Alert</div>
              <div className="text-sm text-muted-foreground">web-server restarted 3 times</div>
              <div className="text-xs text-muted-foreground">5 minutes ago</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 border-0">
              <Settings className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>⚙️ Preferences</DropdownMenuItem>
            <DropdownMenuItem>🐳 Docker Engine</DropdownMenuItem>
            <DropdownMenuItem>🔧 Troubleshoot</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Account */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 p-2 text-white hover:bg-blue-700 border-0">
              <Avatar className="w-7 h-7">
                <AvatarImage src="/placeholder.svg?height=32&width=32&query=norm+macdonald+as+burt+reynolds+snl+mustache+cowboy+hat" />
                <AvatarFallback className="bg-blue-500 text-white text-xs">BR</AvatarFallback>
              </Avatar>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40&query=norm+macdonald+as+burt+reynolds+snl+mustache+cowboy+hat" />
                  <AvatarFallback className="bg-blue-500 text-white">BR</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Burt Reynolds</div>
                  <div className="text-sm text-muted-foreground">Turd Ferguson</div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>🎬 Celebrity Jeopardy</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
