"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThemeDebug() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    console.log("Current theme:", theme)
    console.log("Resolved theme:", resolvedTheme)
  }, [theme, resolvedTheme])

  return null
}

