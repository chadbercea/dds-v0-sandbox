"use client"

import { Building2, CreditCard, User, ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Context = "personal" | "organization" | "team" | "billing"

interface ContextSwitcherProps {
  currentContext: Context
  onContextChange: (context: Context) => void
}

const contexts = [
  {
    id: "personal" as const,
    label: "Personal Account",
    description: "Manage your Docker images and containers",
    icon: User,
  },
  {
    id: "organization" as const,
    label: "Acme Corporation (Admin)",
    description: "Manage team repositories and settings",
    icon: Building2,
  },
  {
    id: "team" as const,
    label: "Beta Corporation",
    description: "Access team repositories and resources",
    icon: Building2,
  },
  {
    id: "billing" as const,
    label: "Sigma Co (Billing)",
    description: "Manage billing and usage",
    icon: CreditCard,
  },
]

export function ContextSwitcher({ currentContext, onContextChange }: ContextSwitcherProps) {
  const currentContextData = contexts.find((ctx) => ctx.id === currentContext)

  if (!currentContextData) return null

  const CurrentIcon = currentContextData.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-between h-auto p-3 text-left">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <CurrentIcon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-sm truncate">{currentContextData.label}</div>
              <div className="text-xs text-muted-foreground truncate">{currentContextData.description}</div>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 flex-shrink-0 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start">
        {contexts.map((context) => {
          const Icon = context.icon
          const isSelected = context.id === currentContext

          return (
            <DropdownMenuItem
              key={context.id}
              onClick={() => onContextChange(context.id)}
              className="p-3 cursor-pointer"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{context.label}</div>
                  <div className="text-xs text-muted-foreground">{context.description}</div>
                </div>
                {isSelected && <Check className="h-4 w-4 text-primary flex-shrink-0" />}
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
