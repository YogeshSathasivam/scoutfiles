import type { CloudAccount, FileItem } from "@/types"

export const mockAccounts: CloudAccount[] = [
  {
    id: "1",
    name: "Personal Drive",
    provider: "google-drive",
    email: "user@example.com",
    syncStatus: "synced",
    lastSynced: "2023-06-15T10:31:00Z",
  },
  {
    id: "2",
    name: "Work Drive",
    provider: "google-drive",
    email: "work@company.com",
    syncStatus: "syncing",
  },
  {
    id: "3",
    name: "Project Files",
    provider: "dropbox",
    email: "projects@example.com",
    syncStatus: "error",
    errorMessage: "Authentication failed. Please reconnect.",
  },
]

export const mockRecentFiles: FileItem[] = [
  {
    id: "file1",
    name: "Project Proposal.pdf",
    type: "pdf",
    provider: "google-drive",
    accountName: "Personal Drive",
    accountEmail: "user@example.com",
    snippet: "This proposal outlines the key objectives and milestones for the Q3 marketing campaign...",
    lastAccessed: "2023-06-15T09:45:00Z",
    url: "https://drive.google.com/file/d/abc123",
  },
  {
    id: "file2",
    name: "Budget Spreadsheet.xlsx",
    type: "spreadsheet",
    provider: "google-drive",
    accountName: "Work Drive",
    accountEmail: "work@company.com",
    snippet: "Q3 budget allocation for marketing, development, and operations departments.",
    lastAccessed: "2023-06-14T16:20:00Z",
    url: "https://drive.google.com/file/d/def456",
  },
  {
    id: "file3",
    name: "Meeting Notes.doc",
    type: "doc",
    provider: "dropbox",
    accountName: "Project Files",
    accountEmail: "projects@example.com",
    snippet: "Notes from the weekly team meeting discussing project progress and upcoming deadlines.",
    lastAccessed: "2023-06-14T11:15:00Z",
    url: "https://dropbox.com/file/ghi789",
  },
  {
    id: "file4",
    name: "Product Mockup.png",
    type: "image",
    provider: "google-drive",
    accountName: "Personal Drive",
    accountEmail: "user@example.com",
    lastAccessed: "2023-06-13T14:30:00Z",
    url: "https://drive.google.com/file/d/jkl012",
  },
  {
    id: "file5",
    name: "Company Podcast.mp3",
    type: "audio",
    provider: "onedrive",
    accountName: "Personal Drive",
    accountEmail: "user@example.com",
    lastAccessed: "2023-05-20T16:30:00Z",
    url: "https://onedrive.com/file/abc890",
  },
]

export function searchFiles(query: string): FileItem[] {
  if (!query) return []

  const lowerQuery = query.toLowerCase()
  return mockRecentFiles.filter(
    (file) => file.name.toLowerCase().includes(lowerQuery) || file.snippet?.toLowerCase().includes(lowerQuery),
  )
}

