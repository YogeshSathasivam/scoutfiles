"use client"

import type { FileItem } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, FileText, Image, FileSpreadsheet, File, Archive, Music, Video } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"

interface FileCardProps {
  file: FileItem
  onCopyLink: (url: string) => void
}

export function FileCard({ file, onCopyLink }: FileCardProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyLink = () => {
    onCopyLink(file.url)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const getFileIcon = () => {
    switch (file.type) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />
      case "doc":
        return <FileText className="h-6 w-6 text-primary" />
      case "image":
        return <Image className="h-6 w-6 text-green-500" />
      case "spreadsheet":
        return <FileSpreadsheet className="h-6 w-6 text-emerald-500" />
      case "zip":
        return <Archive className="h-6 w-6 text-amber-500" />
      case "rar":
        return <Archive className="h-6 w-6 text-orange-500" />
      case "audio":
        return <Music className="h-6 w-6 text-purple-500" />
      case "video":
        return <Video className="h-6 w-6 text-pink-500" />
      default:
        return <File className="h-6 w-6 text-muted-foreground" />
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
    <Card className="overflow-hidden transition-all h-full glass border border-border/40">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex items-start space-x-3 flex-grow">
          <div className="flex-shrink-0 bg-secondary/30 rounded-xl p-3">{getFileIcon()}</div>
          <div className="flex-grow min-w-0 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm truncate pr-2">{file.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 flex-shrink-0 -mr-1 rounded-full"
                onClick={handleCopyLink}
              >
                <Copy className="h-3.5 w-3.5" />
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex-grow">
              <span className="inline-flex items-center">
                <span>From: {file.accountName || "Unknown Account"}</span>
              </span>
            </p>
            <div className="flex flex-wrap items-center justify-between mt-2 text-xs text-muted-foreground gap-2">
              <div className="flex items-center space-x-1 bg-secondary/30 px-2 py-1 rounded-full">
                {getProviderIcon()}
                <span className="truncate max-w-[120px]">
                  {formatDistanceToNow(new Date(file.lastAccessed), { addSuffix: true })}
                </span>
              </div>
              {isCopied && (
                <span className="text-green-500 text-xs bg-green-500/10 px-2 py-1 rounded-full">Link copied!</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

