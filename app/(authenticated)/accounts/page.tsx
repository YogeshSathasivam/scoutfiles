"use client"

import { useState } from "react"
import { mockAccounts } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PlusCircle, CheckCircle, RefreshCw, AlertCircle } from "lucide-react"
import { getProviderBackground, getProviderIcon } from "@/lib/utils"
import type { CloudAccount } from "@/types"

export default function AccountsPage() {
  const { toast } = useToast()
  const [accounts, setAccounts] = useState<CloudAccount[]>([
    ...mockAccounts,
    {
      id: "4",
      name: "Design Assets",
      provider: "onedrive",
      email: "design@example.com",
      syncStatus: "synced",
      lastSynced: "2023-06-10T14:25:00Z",
    },
    {
      id: "5",
      name: "Client Documents",
      provider: "dropbox",
      email: "clients@company.com",
      syncStatus: "not-synced",
    },
  ])

  const handleSync = (accountId: string) => {
    setAccounts((prev) =>
      prev.map((account) => (account.id === accountId ? { ...account, syncStatus: "syncing" } : account)),
    )

    // Simulate sync process
    setTimeout(() => {
      setAccounts((prev) =>
        prev.map((account) =>
          account.id === accountId
            ? {
                ...account,
                syncStatus: "synced",
                lastSynced: new Date().toISOString(),
              }
            : account,
        ),
      )

      toast({
        title: "Sync Complete",
        description: "Your files have been successfully synced.",
      })
    }, 1500)
  }

  const handleDisconnect = (accountId: string) => {
    setAccounts((prev) => prev.filter((account) => account.id !== accountId))

    toast({
      title: "Account Disconnected",
      description: "The cloud storage account has been disconnected.",
    })
  }

  const handleAddAccount = () => {
    toast({
      title: "Connect Cloud Storage",
      description: "This would open the OAuth flow to connect a new account.",
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gradient">Connected Accounts</h1>
          <p className="text-muted-foreground mt-1">Manage your connected cloud storage accounts</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          <div className="flex-shrink-0">
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-3 py-4 px-4 rounded-lg border-dashed border-2 w-full h-full"
              onClick={handleAddAccount}
              style={{ height: "180px" }}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <PlusCircle className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Add Account</span>
            </Button>
          </div>
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
                    {account.syncStatus === "synced" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {account.syncStatus === "syncing" && <RefreshCw className="h-5 w-5 text-primary animate-spin" />}
                    {account.syncStatus === "error" && <AlertCircle className="h-5 w-5 text-destructive" />}
                  </div>
                </div>

                {/* Status information */}
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                  {account.syncStatus === "synced" && (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                      {"Last synced: " +
                        (account.lastSynced ? new Date(account.lastSynced).toLocaleDateString() : "Never")}
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
                  onClick={() => handleDisconnect(account.id)}
                >
                  Disconnect
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-4 text-xs font-medium bg-white dark:bg-gray-800"
                  onClick={() => handleSync(account.id)}
                  disabled={account.syncStatus === "syncing"}
                >
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                  Sync
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

