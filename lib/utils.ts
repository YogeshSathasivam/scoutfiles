import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CheckCircle, RefreshCw, AlertCircle } from "lucide-react"

/**
 * Utility function to conditionally join class names
 * This is used throughout the application for dynamic styling
 *
 * @param inputs - Class names or conditional class expressions
 * @returns Merged class string with duplicates removed
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Ensures an element uses the application's consistent border radius
 * This can be used for any element that needs to follow the design system
 *
 * @param element - The element to style
 * @param size - The border radius size (sm, md, lg, or default)
 * @returns The element with proper border radius applied
 */
export function withConsistentRadius(element: HTMLElement, size: "sm" | "md" | "lg" | "default" = "default") {
  const radiusMap = {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    default: "var(--radius)",
  }

  element.style.borderRadius = radiusMap[size]
  return element
}

/**
 * Checks if a component is using the correct border radius
 * This is useful for development and testing
 *
 * @param element - The element to check
 * @returns Boolean indicating if the element follows the design system
 */
export function hasConsistentRadius(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element)
  const radius = style.borderRadius

  // Convert px values to numbers for comparison
  const numericRadius = Number.parseInt(radius)

  // Check if radius is within our 4-8px range or is 0 (no radius)
  return numericRadius === 0 || (numericRadius >= 4 && numericRadius <= 8)
}

/**
 * Utility function to get the background color for a provider.
 *
 * @param provider - The provider name.
 * @returns The background color class.
 */
export const getProviderBackground = (provider: string) => {
  switch (provider) {
    case "google-drive":
      return "bg-white dark:bg-gray-800"
    case "dropbox":
      return "bg-white dark:bg-gray-800"
    case "onedrive":
      return "bg-white dark:bg-gray-800"
    default:
      return "bg-white dark:bg-gray-800"
  }
}

/**
 * Utility function to get the icon for a provider.
 *
 * @param account - The cloud account object.
 * @returns The provider icon component.
 */
export const getProviderIcon = (account: any) => {
  switch (account.provider) {
    case "google-drive":
      return (
        <svg className="h-10 w-10" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
            fill="#0066da"
          />
          <path
            d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
            fill="#00ac47"
          />
          <path
            d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
            fill="#ea4335"
          />
          <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
          <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
          <path
            d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
            fill="#ffba00"
          />
        </svg>
      )
    case "dropbox":
      return (
        <svg className="h-10 w-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2L0 6l6 4-6 4 6 4 6-4-6-4 6-4-6-4zm12 0l-6 4 6 4-6 4 6 4 6-4-6-4 6-4-6-4z" fill="#0061FF" />
        </svg>
      )
    case "onedrive":
      return (
        <svg className="h-10 w-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.5 18.5h7.8c2.3 0 4.2-1.8 4.2-4.1 0-2.1-1.6-3.9-3.7-4.1-.5-2.4-2.6-4.2-5.1-4.2-1.4 0-2.7.6-3.7 1.5-.7-.5-1.6-.8-2.5-.8-2.3 0-4.2 1.9-4.2 4.2 0 .4.1.8.2 1.2-1.6.5-2.8 2-2.8 3.8 0 2.2 1.8 4 4 4h5.8z"
            fill="#0364B8"
          />
        </svg>
      )
    default:
      return null
  }
}

/**
 * Utility function to get the status icon for a cloud account.
 *
 * @param account - The cloud account object.
 * @returns The status icon component.
 */
export const getStatusIcon = (account: any) => {
  switch (account.syncStatus) {
    case "synced":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "syncing":
      return <RefreshCw className="h-5 w-5 text-primary animate-spin" />
    case "error":
      return <AlertCircle className="h-5 w-5 text-destructive" />
    default:
      return <RefreshCw className="h-5 w-5 text-muted-foreground" />
  }
}

