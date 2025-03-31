import Link from "next/link"

export function Footer({ className = "" }: { className?: string }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={`w-full border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
        <div className="mb-2 sm:mb-0">&copy; {currentYear} ScoutFiles. All rights reserved.</div>
        <div className="mb-2 sm:mb-0 order-first sm:order-none">
          Designed with ❤️ by{" "}
          <Link
            href="https://www.yogeshdesign.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-primary transition-colors"
          >
            YOGESH S
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  )
}

