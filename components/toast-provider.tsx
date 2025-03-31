"use client"

import { useToast } from "@/hooks/use-toast"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react"
import { useEffect, useRef } from "react"

export function ToastContainer() {
  const { toasts, dismiss } = useToast()
  const pathname = typeof window !== "undefined" ? window.location.pathname : ""

  // Use a ref to track which toasts have been shown already
  const shownToasts = useRef<Set<string>>(new Set())

  // Auto-dismiss toasts after 3 seconds (reduced from 5 seconds)
  useEffect(() => {
    const timeouts = new Map<string, NodeJS.Timeout>()

    toasts.forEach((toast) => {
      if (!timeouts.has(toast.id)) {
        const timeout = setTimeout(() => {
          dismiss(toast.id)
          // Add the toast ID to the set of shown toasts
          if (toast.id === "login-success") {
            shownToasts.current.add(toast.id)
          }
        }, 3000) // Reduced from 5000 to 3000

        timeouts.set(toast.id, timeout)
      }
    })

    return () => {
      timeouts.forEach((timeout) => {
        clearTimeout(timeout)
      })
    }
  }, [toasts, dismiss])

  // Filter out login success toast if it's already been shown or we're not on the dashboard
  const filteredToasts = toasts.filter((toast) => {
    // If it's a login success toast
    if (toast.id === "login-success") {
      // Only show it on the dashboard and only if it hasn't been shown before
      if (pathname !== "/dashboard" || shownToasts.current.has(toast.id)) {
        return false
      }

      // Mark it as shown immediately to prevent it from reappearing
      // when navigating back to the dashboard
      if (pathname === "/dashboard") {
        // We'll add it to the set after a small delay to ensure it's rendered first
        setTimeout(() => {
          shownToasts.current.add(toast.id)
        }, 100)
      }
    }
    return true
  })

  return (
    <ToastProvider>
      {filteredToasts.map(({ id, title, description, variant }) => (
        <Toast
          key={id}
          variant={variant}
          className={cn(
            "group flex flex-row items-start gap-3 rounded-lg p-4 shadow-lg border-l-4 animate-in slide-in-from-right-full duration-300",
            variant === "success" &&
              "border-l-green-500 bg-green-50 dark:bg-green-950/50 text-green-900 dark:text-green-100",
            variant === "warning" &&
              "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/50 text-yellow-900 dark:text-yellow-100",
            variant === "destructive" && "border-l-red-500 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-100",
            (!variant || variant === "default") &&
              "border-l-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100",
          )}
        >
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
            {variant === "success" && <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />}
            {variant === "warning" && <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
            {variant === "destructive" && <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
            {(!variant || variant === "default") && <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          </div>

          <div className="flex-1 space-y-1">
            {title && <ToastTitle className="font-medium text-sm">{title}</ToastTitle>}
            {description && <ToastDescription className="text-xs opacity-90">{description}</ToastDescription>}
          </div>

          <ToastClose
            className="h-6 w-6 rounded-full p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => {
              // Add the toast ID to the set of shown toasts when manually closed
              if (id === "login-success") {
                shownToasts.current.add(id)
              }
            }}
          >
            <X className="h-4 w-4" />
          </ToastClose>

          {/* Progress bar - updated animation duration to 3s */}
          <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden">
            <div
              className="h-full animate-progress-bar"
              style={{
                background:
                  variant === "success"
                    ? "linear-gradient(to right, rgba(34, 197, 94, 0.7), rgba(34, 197, 94, 0.3))"
                    : variant === "warning"
                      ? "linear-gradient(to right, rgba(234, 179, 8, 0.7), rgba(234, 179, 8, 0.3))"
                      : variant === "destructive"
                        ? "linear-gradient(to right, rgba(239, 68, 68, 0.7), rgba(239, 68, 68, 0.3))"
                        : "linear-gradient(to right, rgba(59, 130, 246, 0.7), rgba(59, 130, 246, 0.3))",
                animationDuration: "3s", // Reduced from 5s to 3s
              }}
            />
          </div>
        </Toast>
      ))}
      <ToastViewport
        className={cn(
          "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        )}
      />
    </ToastProvider>
  )
}

