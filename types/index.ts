export interface CloudAccount {
  id: string
  name: string
  provider: "google-drive" | "dropbox" | "onedrive"
  email: string
  syncStatus: "synced" | "syncing" | "error" | "not-synced"
  lastSynced?: string
  errorMessage?: string
}

export interface FileItem {
  id: string
  name: string
  type: "pdf" | "doc" | "image" | "spreadsheet" | "other" | "zip" | "rar" | "audio" | "video"
  provider: "google-drive" | "dropbox" | "onedrive"
  accountName: string
  accountEmail?: string
  snippet?: string
  lastAccessed: string
  url: string
  thumbnail?: string
}

export interface SearchFilters {
  fileType?: string[]
  dateRange?: {
    from?: Date
    to?: Date
  }
  provider?: string[]
}

