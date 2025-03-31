"use client"

import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ViewToggleProps {
  view: "list" | "grid"
  onViewChange: (view: "list" | "grid") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center border rounded-lg overflow-hidden">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-none ${view === "list" ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => onViewChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>List view</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-none ${view === "grid" ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => onViewChange("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Grid view</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

