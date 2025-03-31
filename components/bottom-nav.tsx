"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/")
  }

  const handleLogout = () => {
    // Redirect to login page
    router.push("/login")
  }

  // Update the navItems array to remove Settings and make it more focused
  const navItems = [
    {
      name: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Accounts",
      href: "/accounts",
      icon: Users,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t lg:hidden">
      <div className="grid h-full grid-cols-3 max-w-md mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center text-xs",
              isActive(item.href) ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span>{item.name}</span>
          </Link>
        ))}
        <Link
          key="profile"
          href="/profile"
          className={cn(
            "flex flex-col items-center justify-center text-xs",
            isActive("/profile") ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <User className="h-5 w-5 mb-1" />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  )
}

