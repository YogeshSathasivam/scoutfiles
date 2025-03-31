"use client"

import type React from "react"
import { BackgroundDecorator } from "@/components/background-decorator"
import { ThemeDebug } from "@/components/theme-debug"
import { ToastContainer } from "@/components/toast-provider"
import { BottomNav } from "@/components/bottom-nav"
import { AppHeader } from "@/components/app-header"
import { Footer } from "@/components/footer"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <BackgroundDecorator />
      <ThemeDebug />

      {/* Use the AppHeader component */}
      <AppHeader />

      {/* Main Content - Adjust padding to account for bottom nav */}
      <main className="flex-1 pb-12 lg:pb-0">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4">{children}</div>
      </main>

      {/* Bottom Navigation - Visible on mobile and tablet */}
      <BottomNav />
      <Footer className="hidden lg:block" />
      <ToastContainer />
    </div>
  )
}

