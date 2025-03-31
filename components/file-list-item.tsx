"use client"

import type { FileItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Copy, FileText, Image, FileSpreadsheet, File, Archive, Music, Video } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"

interface FileListItemProps {
  file: FileItem
  onCopyLink: (url: string) => void
}

export function FileListItem({ file, onCopyLink }: FileListItemProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyLink = () => {
    onCopyLink(file.url)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const getFileIcon = () => {
    switch (file.type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "doc":
        return <FileText className="h-5 w-5 text-primary" />
      case "image":
        return <Image className="h-5 w-5 text-green-500" />
      case "spreadsheet":
        return <FileSpreadsheet className="h-5 w-5 text-emerald-500" />
      case "zip":
        return <Archive className="h-5 w-5 text-amber-500" />
      case "rar":
        return <Archive className="h-5 w-5 text-orange-500" />
      case "audio":
        return <Music className="h-5 w-5 text-purple-500" />
      case "video":
        return <Video className="h-5 w-5 text-pink-500" />
      default:
        return <File className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getProviderIcon = () => {
    switch (file.provider) {
      case "google-drive":
        return (
          <svg className="h-3.5 w-3.5" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
              fill="#0066da"
            />
            <path
              d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
              fill="#00ac47"
            />
            <path
              d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
              fill="#ea4335"
            />
            <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
            <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
            <path
              d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
              fill="#ffba00"
            />
          </svg>
        )
      case "dropbox":
        return (
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2L0 6l6 4-6 4 6 4 6-4-6-4 6-4-6-4zm12 0l-6 4 6 4-6 4 6 4 6-4-6-4 6-4-6-4z" fill="#0061FF" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-4 border-b last:border-b-0 hover:bg-muted/30 transition-colors">
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        <div className="flex-shrink-0 bg-secondary/30 rounded-xl p-2">{getFileIcon()}</div>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-sm truncate">{file.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            <span className="inline-flex items-center">
              {getProviderIcon()}
              <span className="ml-1">{file.accountName || "Unknown Account"}</span>
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end space-x-4 mt-2 sm:mt-0 ml-0 sm:ml-4">
        <div className="flex items-center space-x-1 text-xs text-muted-foreground bg-secondary/30 px-2 py-1 rounded-full">
          <span className="whitespace-nowrap">
            {formatDistanceToNow(new Date(file.lastAccessed), { addSuffix: true })}
          </span>
        </div>

        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={handleCopyLink}>
            <Copy className="h-3.5 w-3.5" />
            <span className="sr-only">Copy link</span>
          </Button>
          {isCopied && (
            <span className="ml-2 text-green-500 text-xs hidden sm:inline bg-green-500/10 px-2 py-1 rounded-full">
              Link copied!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

