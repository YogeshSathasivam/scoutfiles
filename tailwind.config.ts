import type { Config } from "tailwindcss"

/**
 * Tailwind CSS Configuration
 *
 * This file controls the visual styling framework used throughout the application.
 * It defines colors, spacing, border radius, and other design elements that
 * create a consistent look and feel across all pages.
 */
const config = {
  // Enable dark mode using the 'class' strategy (toggle with a class name)
  darkMode: ["class"],

  // Specify which files Tailwind should scan for class names to include
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],

  // Optional prefix for all utility classes
  prefix: "",

  // Theme customization
  theme: {
    // Container settings for centered, padded content areas
    container: {
      center: true,
      padding: "1rem", // Consistent 1rem (16px) padding
      screens: {
        "2xl": "1400px", // Maximum width for extra large screens
      },
    },

    // Extensions to the default Tailwind theme
    extend: {
      // Custom color definitions using CSS variables
      // These allow for easy theme switching (light/dark mode)
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // Border radius (corner roundness) settings
      // These values control how rounded corners appear throughout the app
      // We're using a 4-8px range as requested for consistent, moderate rounding
      borderRadius: {
        lg: "8px", // Large radius - used for cards, modals, and prominent elements
        md: "6px", // Medium radius - used for buttons and form elements
        sm: "4px", // Small radius - used for smaller UI elements like badges
        DEFAULT: "6px", // Default radius - used when no specific size is specified
        full: "9999px", // Full radius - creates perfectly circular elements
      },

      // Animation keyframes for interactive elements
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      // Named animations that can be applied to elements
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  // Additional plugins to extend Tailwind's functionality
  plugins: [require("tailwindcss-animate")], // Adds animation utilities
} satisfies Config

export default config

