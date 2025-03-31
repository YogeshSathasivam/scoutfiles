"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileCard } from "@/components/file-card"
import { SearchFiltersComponent } from "@/components/search-filters"
import type { CloudAccount, FileItem, SearchFilters } from "@/types"
import { mockAccounts, mockRecentFiles, searchFiles } from "@/lib/mock-data"
import { X, CheckCircle, RefreshCw, AlertCircle, PlusCircle } from "lucide-react"
import { FileListItem } from "@/components/file-list-item"
import { ViewToggle } from "@/components/view-toggle"
import { MasterSearch } from "@/components/master-search"
import { ModernLoader } from "@/components/modern-loader"
import { getProviderIcon } from "@/lib/utils"

// Number of items per page
const ITEMS_PER_PAGE = 10

const getProviderBackground = (provider: string) => {
  switch (provider) {
    case "google":
      return "bg-google-bg"
    case "dropbox":
      return "bg-dropbox-bg"
    case "onedrive":
      return "bg-onedrive-bg"
    default:
      return "bg-gray-100 dark:bg-gray-800"
  }
}

export default function DashboardPage() {
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
  const [recentFiles, setRecentFiles] = useState<FileItem[]>(mockRecentFiles)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<FileItem[]>([])
  const [filters, setFilters] = useState<SearchFilters>({})
  const [isSearching, setIsSearching] = useState(false)
  const [view, setView] = useState<"list" | "grid">("list")
  const [hasSearched, setHasSearched] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Calculate pagination
  const getFilteredFiles = (files: FileItem[], tab: string) => {
    switch (tab) {
      case "documents":
        return files.filter((file) => file.type === "pdf" || file.type === "doc")
      case "images":
        return files.filter((file) => file.type === "image")
      case "other":
        return files.filter((file) => file.type !== "pdf" && file.type !== "doc" && file.type !== "image")
      default:
        return files
    }
  }

  const getPaginatedFiles = (files: FileItem[]) => {
    const filteredFiles = getFilteredFiles(files, activeTab)
    // Limit to 5 items only, no pagination
    return {
      paginatedFiles: filteredFiles.slice(0, 5),
      totalItems: filteredFiles.length,
    }
  }

  const { paginatedFiles: currentFiles, totalItems } = getPaginatedFiles(hasSearched ? searchResults : recentFiles)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const performSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true)
      setHasSearched(true)

      // Simulate search delay
      setTimeout(() => {
        const results = searchFiles(searchQuery)
        setSearchResults(results)
        setIsSearching(false)

        // Show warning toast if no results found
        if (results.length === 0) {
          toast({
            title: "No Results",
            description: `No files found matching "${searchQuery}"`,
            variant: "warning",
          })
        }
      }, 1500)
    }
  }

  const resetSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setHasSearched(false)
    setActiveTab("all")
  }

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
        variant: "success",
      })
    }, 1500)
  }

  const handleDisconnect = (accountId: string) => {
    setAccounts((prev) => prev.filter((account) => account.id !== accountId))

    toast({
      title: "Account Disconnected",
      description: "The cloud storage account has been disconnected.",
      variant: "warning",
    })
  }

  const handleAddAccount = () => {
    toast({
      title: "Connect Cloud Storage",
      description: "This would open the OAuth flow to connect a new account.",
    })
  }

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url)

    toast({
      title: "Link Copied",
      description: "File link copied to clipboard.",
      variant: "success",
    })
  }

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters)
    // In a real app, you would apply these filters to your search results
  }

  const renderTabs = (files: FileItem[]) => (
    <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-4 h-8 bg-secondary/50 rounded-lg p-1">
        <TabsTrigger
          value="all"
          className="text-xs h-6 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          All Files
        </TabsTrigger>
        <TabsTrigger
          value="documents"
          className="text-xs h-6 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Documents
        </TabsTrigger>
        <TabsTrigger
          value="images"
          className="text-xs h-6 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Images
        </TabsTrigger>
        <TabsTrigger
          value="other"
          className="text-xs h-6 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Other
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        {view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentFiles.map((file) => (
              <FileCard key={file.id} file={file} onCopyLink={handleCopyLink} />
            ))}
          </div>
        ) : (
          <div className="border rounded-xl overflow-hidden glass">
            {currentFiles.map((file) => (
              <FileListItem key={file.id} file={file} onCopyLink={handleCopyLink} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="documents">
        {view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentFiles.map((file) => (
              <FileCard key={file.id} file={file} onCopyLink={handleCopyLink} />
            ))}
          </div>
        ) : (
          <div className="border rounded-xl overflow-hidden glass">
            {currentFiles.map((file) => (
              <FileListItem key={file.id} file={file} onCopyLink={handleCopyLink} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="images">
        {view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentFiles.map((file) => (
              <FileCard key={file.id} file={file} onCopyLink={handleCopyLink} />
            ))}
          </div>
        ) : (
          <div className="border rounded-xl overflow-hidden glass">
            {currentFiles.map((file) => (
              <FileListItem key={file.id} file={file} onCopyLink={handleCopyLink} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="other">
        {view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentFiles.map((file) => (
              <FileCard key={file.id} file={file} onCopyLink={handleCopyLink} />
            ))}
          </div>
        ) : (
          <div className="border rounded-xl overflow-hidden glass">
            {currentFiles.map((file) => (
              <FileListItem key={file.id} file={file} onCopyLink={handleCopyLink} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  )

  return (
    <div className="w-full">
      {/* Search Bar - Always visible */}
      <div className="py-6">
        <div className="w-full max-w-3xl mx-auto">
          <MasterSearch value={searchQuery} onChange={setSearchQuery} onSearch={performSearch} />

          {hasSearched && (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">
                  {searchResults.length} results for "{searchQuery}"
                </span>
                <Button variant="outline" size="sm" className="h-8 flex items-center text-xs" onClick={resetSearch}>
                  <X className="h-3.5 w-3.5 mr-1" />
                  Clear search
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results or Recent Files */}
      <div className="py-4">
        {hasSearched ? (
          <>
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-xl font-bold text-gradient">Search Results</h1>

              <div className="flex items-center space-x-3">
                <ViewToggle view={view} onViewChange={setView} />
                <SearchFiltersComponent filters={filters} onFiltersChange={handleFiltersChange} />
              </div>
            </div>

            {isSearching ? (
              <ModernLoader text="Searching across all your cloud storage..." />
            ) : searchResults.length > 0 ? (
              renderTabs(searchResults)
            ) : (
              <div className="text-center py-16 glass rounded-xl p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                  <svg
                    className="h-8 w-8 text-muted-foreground"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="text-xl font-semibold mb-2">No results found</p>
                <p className="text-muted-foreground">We couldn't find any files matching "{searchQuery}"</p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-xl font-bold text-gradient">Recent Files</h1>
                <p className="text-muted-foreground mt-1">Your recently accessed files across all accounts</p>
              </div>
              <ViewToggle view={view} onViewChange={setView} />
            </div>

            {renderTabs(recentFiles)}
          </>
        )}
      </div>

      {/* Connected Accounts Section - Hidden for now */}
      {false && (
        <div className="py-6 border-t mt-6">
          <div>
            <h2 className="text-xl font-bold text-gradient">Connected Accounts</h2>
            <p className="text-muted-foreground mt-1 mb-4">Manage your connected cloud storage accounts</p>
          </div>
          <div className="pb-4">
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
                        {account.syncStatus === "syncing" && (
                          <RefreshCw className="h-5 w-5 text-primary animate-spin" />
                        )}
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
      )}
    </div>
  )
}

