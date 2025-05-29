"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Menu, X, Pin, PinOff, ChevronUp, ChevronDown } from "lucide-react"

interface LayoutContextType {
  leftPanelOpen: boolean
  rightPanelOpen: boolean
  leftPanelPinned: boolean
  rightPanelPinned: boolean
  bottomPanelExpanded: boolean
  toggleLeftPanel: () => void
  toggleRightPanel: () => void
  toggleLeftPanelPin: () => void
  toggleRightPanelPin: () => void
  toggleBottomPanel: () => void
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

  const contextValue: LayoutContextType = {
    leftPanelOpen,
    rightPanelOpen,
    leftPanelPinned,
    rightPanelPinned,
    bottomPanelExpanded,
    toggleLeftPanel,
    toggleRightPanel,
    toggleLeftPanelPin,
    toggleRightPanelPin,
    toggleBottomPanel,
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
            <div className="w-80 border-r bg-background flex-shrink-0 transition-all duration-300 ease-in-out">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="font-medium">Left Panel</h3>
                  <Button variant="ghost" size="icon" onClick={toggleLeftPanelPin} className="h-8 w-8">
                    <PinOff className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-auto">{leftPanel}</div>
              </div>
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
            <div className="w-80 border-l bg-background flex-shrink-0 transition-all duration-300 ease-in-out">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="font-medium">Right Panel</h3>
                  <Button variant="ghost" size="icon" onClick={toggleRightPanelPin} className="h-8 w-8">
                    <PinOff className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-auto">{rightPanel}</div>
              </div>
            </div>
          )}
        </div>

        {/* Left Panel - Overlay (Sheet) */}
        <Sheet open={leftPanelOpen && !leftPanelPinned} onOpenChange={setLeftPanelOpen}>
          <SheetContent side="left" className="w-80 p-0 [&>button]:hidden">
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
          <SheetContent side="right" className="w-80 p-0 [&>button]:hidden">
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
          <Menu className="h-5 w-5" />
        </Button>
        <img src="/sub-marks/subMarkPrimary.svg" alt="Docker" className="h-8 w-auto" />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleRightPanel}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
