"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, ChevronDown, Filter } from "lucide-react"
import type { SearchFilters } from "@/types"

interface SearchFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
}

export function SearchFiltersComponent({ filters, onFiltersChange }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters)

  const fileTypes = [
    { id: "pdf", label: "PDF" },
    { id: "doc", label: "Documents" },
    { id: "image", label: "Images" },
    { id: "spreadsheet", label: "Spreadsheets" },
  ]

  const providers = [
    { id: "google-drive", label: "Google Drive" },
    { id: "dropbox", label: "Dropbox" },
    { id: "onedrive", label: "OneDrive" },
  ]

  const handleFileTypeChange = (typeId: string, checked: boolean) => {
    setLocalFilters((prev) => {
      const fileType = prev.fileType || []
      if (checked) {
        return { ...prev, fileType: [...fileType, typeId] }
      } else {
        return { ...prev, fileType: fileType.filter((t) => t !== typeId) }
      }
    })
  }

  const handleProviderChange = (providerId: string, checked: boolean) => {
    setLocalFilters((prev) => {
      const provider = prev.provider || []
      if (checked) {
        return { ...prev, provider: [...provider, providerId] }
      } else {
        return { ...prev, provider: provider.filter((p) => p !== providerId) }
      }
    })
  }

  const handleDateChange = (date: Date | undefined, type: "from" | "to") => {
    setLocalFilters((prev) => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: date,
      },
    }))
  }

  const handleApply = () => {
    onFiltersChange(localFilters)
    setIsOpen(false)
  }

  const handleReset = () => {
    const resetFilters: SearchFilters = {}
    setLocalFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (localFilters.fileType?.length) count += localFilters.fileType.length
    if (localFilters.provider?.length) count += localFilters.provider.length
    if (localFilters.dateRange?.from || localFilters.dateRange?.to) count += 1
    return count
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Filter className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Filters</span>
          {getActiveFiltersCount() > 0 && (
            <span className="ml-1 rounded-full bg-primary w-4 h-4 text-xs flex items-center justify-center text-primary-foreground">
              {getActiveFiltersCount()}
            </span>
          )}
          <ChevronDown className="h-3.5 w-3.5 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">File Type</h4>
            <div className="grid grid-cols-2 gap-2">
              {fileTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`file-type-${type.id}`}
                    checked={localFilters.fileType?.includes(type.id)}
                    onCheckedChange={(checked) => handleFileTypeChange(type.id, checked === true)}
                  />
                  <Label htmlFor={`file-type-${type.id}`} className="text-sm">
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">Provider</h4>
            <div className="grid grid-cols-2 gap-2">
              {providers.map((provider) => (
                <div key={provider.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`provider-${provider.id}`}
                    checked={localFilters.provider?.includes(provider.id)}
                    onCheckedChange={(checked) => handleProviderChange(provider.id, checked === true)}
                  />
                  <Label htmlFor={`provider-${provider.id}`} className="text-sm">
                    {provider.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">Date Range</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left font-normal mt-1 text-xs h-7"
                    >
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {localFilters.dateRange?.from ? (
                        localFilters.dateRange.from.toLocaleDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={localFilters.dateRange?.from}
                      onSelect={(date) => handleDateChange(date, "from")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label className="text-xs">To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left font-normal mt-1 text-xs h-7"
                    >
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {localFilters.dateRange?.to ? (
                        localFilters.dateRange.to.toLocaleDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={localFilters.dateRange?.to}
                      onSelect={(date) => handleDateChange(date, "to")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" className="text-xs h-7" onClick={handleReset}>
              Reset
            </Button>
            <Button size="sm" className="text-xs h-7" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

