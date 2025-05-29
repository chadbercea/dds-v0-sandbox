"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { X, Pin, PinOff, ChevronUp, ChevronDown, PanelRight, PanelLeft } from "lucide-react"

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

export function AppLayout({ children, header, leftPanel, rightPanel, bottomPanel }: AppLayoutProps) {
  const [leftPanelOpen, setLeftPanelOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)
  const [leftPanelPinned, setLeftPanelPinned] = useState(false)
  const [rightPanelPinned, setRightPanelPinned] = useState(false)
  const [bottomPanelExpanded, setBottomPanelExpanded] = useState(false)
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
                  <h3 className="font-medium">Left Panel</h3>
                  <Button variant="ghost" size="icon" onClick={toggleLeftPanelPin} className="h-8 w-8">
                    <PinOff className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-auto">{leftPanel}</div>
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
                  <h3 className="font-medium">Right Panel</h3>
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
                <h3 className="font-medium">Left Panel</h3>
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
            </div>
          </SheetContent>
        </Sheet>

        {/* Right Panel - Overlay (Sheet) */}
        <Sheet open={rightPanelOpen && !rightPanelPinned} onOpenChange={setRightPanelOpen}>
          <SheetContent side="right" className="p-0 [&>button]:hidden" style={{ width: rightPanelWidth }}>
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-medium">Right Panel</h3>
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
export function AppHeader() {
  const { toggleLeftPanel, toggleRightPanel } = useLayout()

  return (
    <div className="h-14 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleLeftPanel}>
          <PanelLeft className="h-5 w-5" />
        </Button>
        <img src="/sub-marks/subMarkPrimary.svg" alt="Docker" className="h-8 w-auto" />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleRightPanel}>
          <PanelRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
