import type React from "react"
import { ScoutLogo } from "./scout-logo"
import { ThemeToggle } from "./theme-toggle"
import { BackgroundDecorator } from "./background-decorator"
import { AuthFooter } from "./auth-footer"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <BackgroundDecorator />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8 relative z-10 bg-white/90 dark:bg-gray-900/80 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center space-y-2 text-center">
          <ScoutLogo />
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-gradient">{title}</h1>
          {subtitle && <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </div>
      <div className="mt-8 w-full max-w-md">
        <AuthFooter />
      </div>
    </div>
  )
}

