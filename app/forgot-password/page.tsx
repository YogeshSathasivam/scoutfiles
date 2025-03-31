"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/components/auth-layout"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // This would be replaced with your actual password reset logic
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <AuthLayout title="Forgot password" subtitle="Enter your email and we'll send you a link to reset your password">
      {!isSubmitted ? (
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              autoComplete="email"
              disabled={isLoading}
              className="input-visible"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send reset link"}
          </Button>
          <div className="text-center text-sm">
            <Link href="/login" className="font-medium text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="rounded-md bg-primary/10 p-4">
            <p className="text-sm text-primary">
              If an account exists with that email, we've sent a password reset link.
            </p>
          </div>
          <Button asChild className="w-full">
            <Link href="/login">Back to login</Link>
          </Button>
        </div>
      )}
    </AuthLayout>
  )
}

