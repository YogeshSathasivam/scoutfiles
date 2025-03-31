import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirect root to the login page
  redirect("/login")
}

