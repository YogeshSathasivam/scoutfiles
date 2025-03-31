"use client"

import type { CloudAccount } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface AccountCardProps {
  account: CloudAccount
  onSync: (accountId: string) => void
  onDisconnect: (accountId: string) => void
}

export function AccountCard({ account, onSync, onDisconnect }: AccountCardProps) {
  const getStatusIcon = () => {
    switch (account.syncStatus) {
      case "synced":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "syncing":
        return <RefreshCw className="h-4 w-4 text-primary animate-spin" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return <RefreshCw className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusText = () => {
    switch (account.syncStatus) {
      case "synced":
        return `Synced ${account.lastSynced ? formatDistanceToNow(new Date(account.lastSynced), { addSuffix: true }) : ""}`
      case "syncing":
        return "Syncing..."
      case "error":
        return account.errorMessage || "Sync error"
      default:
        return "Not synced"
    }
  }

  const getProviderIcon = () => {
    switch (account.provider) {
      case "google-drive":
        return (
          <svg className="h-5 w-5" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
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
          <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2L0 6l6 4-6 4 6 4 6-4-6-4 6-4-6-4zm12 0l-6 4 6 4-6 4 6 4 6-4-6-4 6-4-6-4z" fill="#0061FF" />
          </svg>
        )
      case "onedrive":
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.5 18.5h7.8c2.3 0 4.2-1.8 4.2-4.1 0-2.1-1.6-3.9-3.7-4.1-.5-2.4-2.6-4.2-5.1-4.2-1.4 0-2.7.6-3.7 1.5-.7-.5-1.6-.8-2.5-.8-2.3 0-4.2 1.9-4.2 4.2 0 .4.1.8.2 1.2-1.6.5-2.8 2-2.8 3.8 0 2.2 1.8 4 4 4h5.8z"
              fill="#0364B8"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="flex-shrink-0">{getProviderIcon()}</div>
            <div className="min-w-0">
              <h3 className="font-medium text-sm truncate">{account.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{account.email}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs">
            {getStatusIcon()}
            <span className={`${account.syncStatus === "error" ? "text-destructive" : "text-muted-foreground"}`}>
              {getStatusText()}
            </span>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => onSync(account.id)}
              disabled={account.syncStatus === "syncing"}
            >
              <RefreshCw className="mr-1 h-3 w-3" />
              Sync
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
              onClick={() => onDisconnect(account.id)}
            >
              Disconnect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

