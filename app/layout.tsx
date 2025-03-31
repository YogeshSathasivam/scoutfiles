import type React from "react"
import { ToastContainer } from "@/components/toast-provider"
import { ThemeProvider } from "@/components/theme-provider"
import "@/app/globals.css"

export const metadata = {
  title: "ScoutFiles",
  description: "Search across all your cloud storage in one place",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'