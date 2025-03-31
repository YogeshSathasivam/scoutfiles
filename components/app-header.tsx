"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, ChevronDown, Home, LogOut, Settings, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScoutLogo } from "@/components/scout-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppHeader() {
  const pathname = usePathname()

  // Helper function to determine if a path is active
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/")
  }

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Remove the container class and use a div with fixed padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <ScoutLogo />
          <nav className="hidden lg:flex items-center space-x-4 ml-6">
            <Link
              href="/dashboard"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/dashboard") ? "bg-primary/10 text-primary" : "hover:bg-muted hover:text-primary"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/accounts"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/accounts") ? "bg-primary/10 text-primary" : "hover:bg-muted hover:text-primary"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Accounts</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-primary"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex gap-2 h-9 rounded-full items-center justify-center"
              >
                <User className="h-4 w-4 text-primary" />
                <span className="hidden md:inline text-sm">John Doe</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <DropdownMenuItem className="rounded-lg cursor-pointer" asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg cursor-pointer" asChild>
                <Link href="/login">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

