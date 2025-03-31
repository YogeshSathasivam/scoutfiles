"use client"

import type { CloudAccount } from "@/types"
import { Button } from "@/components/ui/button"
import { CheckCircle, RefreshCw, AlertCircle, PlusCircle } from "lucide-react"

interface AccountRowProps {
  accounts: CloudAccount[]
  onSync: (accountId: string) => void
  onDisconnect: (accountId: string) => void
  onAddAccount: () => void
}

export function AccountRow({ accounts, onSync, onDisconnect, onAddAccount }: AccountRowProps) {
  const getStatusIcon = (account: CloudAccount) => {
    switch (account.syncStatus) {
      case "synced":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "syncing":
        return <RefreshCw className="h-5 w-5 text-primary animate-spin" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-destructive" />
      default:
        return <RefreshCw className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getProviderIcon = (account: CloudAccount) => {
    switch (account.provider) {
      case "google-drive":
        return (
          <svg className="h-10 w-10" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
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
          <svg className="h-10 w-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2L0 6l6 4-6 4 6 4 6-4-6-4 6-4-6-4zm12 0l-6 4 6 4-6 4 6 4 6-4-6-4 6-4-6-4z" fill="#0061FF" />
          </svg>
        )
      case "onedrive":
        return (
          <svg className="h-10 w-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

  const getProviderBackground = (provider: string) => {
    switch (provider) {
      case "google-drive":
        return "bg-white dark:bg-gray-800"
      case "dropbox":
        return "bg-white dark:bg-gray-800"
      case "onedrive":
        return "bg-white dark:bg-gray-800"
      default:
        return "bg-white dark:bg-gray-800"
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <Button
        variant="outline"
        className="flex items-center justify-center space-x-3 py-4 px-4 rounded-lg border-dashed border-2 w-full"
        onClick={onAddAccount}
        style={{ height: "180px" }}
      >
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <PlusCircle className="h-6 w-6 text-primary" />
        </div>
        <span className="font-medium">Add Account</span>
      </Button>
      {accounts.map((account) => (
        <div
          key={account.id}
          className={`flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${getProviderBackground(
            account.provider,
          )}`}
          style={{ height: "180px" }}
        >
          {/* Header with icon and status */}
          <div className="flex flex-col p-4 border-b border-gray-100 dark:border-gray-800 flex-grow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-2 rounded-full">
                  {getProviderIcon(account)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-base truncate">{account.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{account.email}</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                {account.syncStatus === "synced" && getStatusIcon(account)}
                {account.syncStatus === "syncing" && getStatusIcon(account)}
                {account.syncStatus === "error" && getStatusIcon(account)}
              </div>
            </div>

            {/* Status information moved here */}
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
              {account.syncStatus === "synced" && (
                <>
                  <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                  {"Last synced: " + (account.lastSynced ? new Date(account.lastSynced).toLocaleDateString() : "Never")}
                </>
              )}
              {account.syncStatus === "syncing" && (
                <>
                  <RefreshCw className="h-3.5 w-3.5 text-primary animate-spin mr-1.5" />
                  Syncing...
                </>
              )}
              {account.syncStatus === "error" && (
                <>
                  <AlertCircle className="h-3.5 w-3.5 text-destructive mr-1.5" />
                  {account.errorMessage || "Sync error"}
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="p-3 bg-gray-50 dark:bg-gray-900/30 flex justify-between items-center mt-auto">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-4 text-xs text-gray-500 dark:text-gray-400 hover:text-destructive dark:hover:text-destructive"
              onClick={() => onDisconnect(account.id)}
            >
              Disconnect
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-xs font-medium bg-white dark:bg-gray-800"
              onClick={() => onSync(account.id)}
              disabled={account.syncStatus === "syncing"}
            >
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Sync
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

