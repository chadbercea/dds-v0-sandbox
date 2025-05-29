"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Menu, X, Pin, PinOff, ChevronUp, ChevronDown, PanelRight, Rocket } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Settings, LogOut, User, CreditCard } from "lucide-react"

interface LayoutContextType {
  leftPanelOpen: boolean
  rightPanelOpen: boolean
  leftPanelPinned: boolean
  rightPanelPinned: boolean
  bottomPanelExpanded: boolean
  leftPanelWidth: number
  rightPanelWidth: number
  toggleLeftPanel: () => void
  toggleRightPanel: () => void
  toggleLeftPanelPin: () => void
  toggleRightPanelPin: () => void
  toggleBottomPanel: () => void
  setLeftPanelWidth: (width: number) => void
  setRightPanelWidth: (width: number) => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}

interface AppLayoutProps {
  children: ReactNode
  header?: ReactNode
  leftPanel?: ReactNode
  rightPanel?: ReactNode
  bottomPanel?: ReactNode
}

function UserAccountWidget() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="p-3 border-t bg-background cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  MCP Pro
                </Badge>
                <span className="text-xs text-muted-foreground truncate">Runtime Admin</span>
              </div>
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" align="end" className="w-64 p-0">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">john@docker.com</p>
            </div>
          </div>
          <Separator className="mb-3" />
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start h-8 px-2">
              <User className="h-4 w-4 mr-2" />
              Profile Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start h-8 px-2">
              <CreditCard className="h-4 w-4 mr-2" />
              MCP Billing
            </Button>
            <Button variant="ghost" className="w-full justify-start h-8 px-2">
              <Settings className="h-4 w-4 mr-2" />
              Runtime Config
            </Button>
            <Separator className="my-2" />
            <Button
              variant="ghost"
              className="w-full justify-start h-8 px-2 text-red-600 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function AppLayout({ children, header, leftPanel, rightPanel, bottomPanel }: AppLayoutProps) {
  const [leftPanelOpen, setLeftPanelOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)
  const [leftPanelPinned, setLeftPanelPinned] = useState(true) // Start pinned for demo
  const [rightPanelPinned, setRightPanelPinned] = useState(true) // Start pinned for demo
  const [bottomPanelExpanded, setBottomPanelExpanded] = useState(true) // Start expanded for demo
  const [leftPanelWidth, setLeftPanelWidth] = useState(320) // md default
  const [rightPanelWidth, setRightPanelWidth] = useState(320) // md default

  const toggleLeftPanel = () => setLeftPanelOpen(!leftPanelOpen)
  const toggleRightPanel = () => setRightPanelOpen(!rightPanelOpen)

  const toggleLeftPanelPin = () => {
    const newPinnedState = !leftPanelPinned
    setLeftPanelPinned(newPinnedState)
    if (!newPinnedState) {
      // Close the panel when unpinning
      setLeftPanelOpen(false)
    } else {
      // Auto-open when pinning
      setLeftPanelOpen(true)
    }
  }

  const toggleRightPanelPin = () => {
    const newPinnedState = !rightPanelPinned
    setRightPanelPinned(newPinnedState)
    if (!newPinnedState) {
      // Close the panel when unpinning
      setRightPanelOpen(false)
    } else {
      // Auto-open when pinning
      setRightPanelOpen(true)
    }
  }

  const toggleBottomPanel = () => setBottomPanelExpanded(!bottomPanelExpanded)

  // Resize logic
  const handleResize = (panelSide: "left" | "right", startX: number, startWidth: number) => {
    const handleMouseMove = (e: MouseEvent) => {
      const delta = panelSide === "left" ? e.clientX - startX : startX - e.clientX
      let newWidth = startWidth + delta

      // Constrain width
      newWidth = Math.max(200, Math.min(480, newWidth))

      // Snap to presets
      const presets = [240, 320, 400] // sm, md, lg
      for (const preset of presets) {
        if (Math.abs(newWidth - preset) < 20) {
          newWidth = preset
          break
        }
      }

      if (panelSide === "left") {
        setLeftPanelWidth(newWidth)
      } else {
        setRightPanelWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.body.style.userSelect = "none"
    document.body.style.cursor = "col-resize"
  }

  const contextValue: LayoutContextType = {
    leftPanelOpen,
    rightPanelOpen,
    leftPanelPinned,
    rightPanelPinned,
    bottomPanelExpanded,
    leftPanelWidth,
    rightPanelWidth,
    toggleLeftPanel,
    toggleRightPanel,
    toggleLeftPanelPin,
    toggleRightPanelPin,
    toggleBottomPanel,
    setLeftPanelWidth,
    setRightPanelWidth,
  }

  return (
    <LayoutContext.Provider value={contextValue}>
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Sticky Header */}
        {header && <header className="sticky top-0 z-50 border-b bg-background">{header}</header>}

        {/* Main Layout Container */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Pinned */}
          {leftPanelPinned && (
            <div
              className="border-r bg-background flex-shrink-0 transition-all duration-300 ease-in-out relative"
              style={{ width: leftPanelWidth }}
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="font-medium">MCP Runtime</h3>
                  <Button variant="ghost" size="icon" onClick={toggleLeftPanelPin} className="h-8 w-8">
                    <PinOff className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-auto">{leftPanel}</div>
                <UserAccountWidget />
              </div>
              {/* Resize Handle */}
              <div
                className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-border transition-colors"
                onMouseDown={(e) => handleResize("left", e.clientX, leftPanelWidth)}
              />
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">{children}</div>

            {/* Bottom Panel */}
            <div
              className={cn(
                "border-t bg-background transition-all duration-300 ease-in-out flex-shrink-0",
                bottomPanelExpanded ? "h-80" : "h-5",
              )}
            >
              <div className="h-full flex flex-col">
                {/* Bottom Panel Header - Always Visible */}
                <div className="h-5 flex items-center justify-center border-b cursor-pointer hover:bg-muted/50 transition-colors">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleBottomPanel}
                    className="h-4 w-full flex items-center justify-center p-0"
                  >
                    {bottomPanelExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
                  </Button>
                </div>

                {/* Bottom Panel Content - Only when expanded */}
                {bottomPanelExpanded && <div className="flex-1 overflow-auto p-4">{bottomPanel}</div>}
              </div>
            </div>
          </div>

          {/* Right Panel - Pinned */}
          {rightPanelPinned && (
            <div
              className="border-l bg-background flex-shrink-0 transition-all duration-300 ease-in-out relative"
              style={{ width: rightPanelWidth }}
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="font-medium">Agent Control</h3>
                  <Button variant="ghost" size="icon" onClick={toggleRightPanelPin} className="h-8 w-8">
                    <PinOff className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-auto">{rightPanel}</div>
              </div>
              {/* Resize Handle */}
              <div
                className="absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-border transition-colors"
                onMouseDown={(e) => handleResize("right", e.clientX, rightPanelWidth)}
              />
            </div>
          )}
        </div>

        {/* Left Panel - Overlay (Sheet) */}
        <Sheet open={leftPanelOpen && !leftPanelPinned} onOpenChange={setLeftPanelOpen}>
          <SheetContent side="left" className="p-0 [&>button]:hidden" style={{ width: leftPanelWidth }}>
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-medium">MCP Runtime</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={toggleLeftPanelPin} className="h-8 w-8">
                    <Pin className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={toggleLeftPanel} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">{leftPanel}</div>
              <UserAccountWidget />
            </div>
          </SheetContent>
        </Sheet>

        {/* Right Panel - Overlay (Sheet) */}
        <Sheet open={rightPanelOpen && !rightPanelPinned} onOpenChange={setRightPanelOpen}>
          <SheetContent side="right" className="p-0 [&>button]:hidden" style={{ width: rightPanelWidth }}>
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-medium">Agent Control</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={toggleRightPanelPin} className="h-8 w-8">
                    <Pin className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={toggleRightPanel} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">{rightPanel}</div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </LayoutContext.Provider>
  )
}

// Header component with panel triggers
function AppHeader() {
  const { toggleLeftPanel, toggleRightPanel } = useLayout()

  return (
    <div className="h-14 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleLeftPanel}>
          <Menu className="h-5 w-5" />
        </Button>
        <img src="/sub-marks/subMarkPrimary.svg" alt="Docker MCP" className="h-8 w-auto" />
        <Badge variant="outline" className="text-xs">
          MCP Runtime 2035
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="default" className="flex items-center gap-2">
          <Rocket className="h-4 w-4" />
          Deploy Context
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleRightPanel}>
          <PanelRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
export { AppHeader }
