"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

export default function SignInPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      const success = await login(email, password)
      if (success) {
        router.push("/")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="animate-fade-in-up rounded-2xl border border-border bg-white p-8 shadow-sm">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link href="/" className="mb-4 inline-block">
              <Image src="/images/Book Store Shop Logo (1).png" alt="JSEdumart" width={64} height={64} className="mx-auto object-contain" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to your JSEdumart account</p>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <i className="fa-solid fa-circle-exclamation" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-3.5 top-3.5 text-xs text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-border bg-white py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-3.5 top-3.5 text-xs text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-border bg-white py-3 pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-xs text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" className="rounded border-border accent-[var(--teal)]" />
                Remember me
              </label>
              <Link href="/auth/forgot-password" className="text-sm font-medium text-[var(--teal)] hover:text-[var(--navy)]">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--navy)] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)] disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/auth/signup" className="font-semibold text-[var(--teal)] hover:text-[var(--navy)]">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
