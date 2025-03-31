"use client"

import type React from "react"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface MasterSearchProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export function MasterSearch({ value, onChange, onSearch }: MasterSearchProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 relative">
          <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500 bg-clip-text text-transparent">
            Find Your Files
          </span>
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-blue-500 dark:from-blue-400 dark:to-indigo-400 rounded-full"></span>
        </h1>
        <p className="text-muted-foreground mt-4 text-sm sm:text-base">
          Search across all your cloud storage in one place
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <Input
          type="search"
          placeholder="Search across all your cloud storage..."
          className="w-full pl-12 pr-20 h-12 sm:h-14 text-base sm:text-lg border-2 focus-visible:ring-primary input-visible placeholder:text-sm sm:placeholder:text-base"
          style={{ borderRadius: "8px" }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg h-8 sm:h-10 bg-gradient-to-r from-primary to-blue-500 hover:from-blue-600 hover:to-primary transition-all dark:from-blue-500 dark:to-indigo-500"
        >
          Search
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <span className="text-xs bg-secondary px-3 py-1.5 rounded-lg text-secondary-foreground">#documents</span>
        <span className="text-xs bg-secondary px-3 py-1.5 rounded-lg text-secondary-foreground">#images</span>
        <span className="text-xs bg-secondary px-3 py-1.5 rounded-lg text-secondary-foreground">#spreadsheets</span>
        <span className="text-xs bg-secondary px-3 py-1.5 rounded-lg text-secondary-foreground">#presentations</span>
      </div>
    </form>
  )
}

