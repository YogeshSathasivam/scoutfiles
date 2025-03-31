import Link from "next/link"

export function AuthFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-3">
      <div className="flex flex-col items-center text-xs text-muted-foreground">
        <div className="mb-1">&copy; {currentYear} ScoutFiles. All rights reserved.</div>
        <div className="mb-1">
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
        <div className="flex space-x-3">
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

