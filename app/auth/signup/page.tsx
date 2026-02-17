"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

export default function SignUpPage() {
  const router = useRouter()
  const { register, checkEmailExists } = useAuth()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [checkingEmail, setCheckingEmail] = useState(false)

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleEmailBlur = async () => {
    if (!form.email) return
    
    setCheckingEmail(true)
    try {
      const exists = await checkEmailExists(form.email)
      if (exists) {
        setError("This email is already registered. Please sign in instead.")
      } else {
        setError("")
      }
    } catch (err) {
      console.error("Error checking email:", err)
    } finally {
      setCheckingEmail(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }
    if (!agreed) {
      setError("You must agree to the Terms & Conditions.")
      return
    }

    setIsLoading(true)
    try {
      const result = await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      })
      
      if (result.success) {
        // Redirect to email verification page
        router.push(`/auth/verify-email?email=${encodeURIComponent(form.email)}`)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="animate-fade-in-up rounded-2xl border border-border bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <Link href="/" className="mb-4 inline-block">
              <Image src="/images/Book Store Shop Logo (1).png" alt="JSEdumart" width={64} height={64} className="mx-auto object-contain" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Create an Account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Join JSEdumart and start shopping</p>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <i className="fa-solid fa-circle-exclamation" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-foreground">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  placeholder="John"
                  className="w-full rounded-lg border border-border bg-white py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-foreground">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  placeholder="Doe"
                  className="w-full rounded-lg border border-border bg-white py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="signupEmail" className="mb-1.5 block text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-3.5 top-3.5 text-xs text-muted-foreground" />
                <input
                  id="signupEmail"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={handleEmailBlur}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-border bg-white py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                  disabled={checkingEmail}
                  required
                />
                {checkingEmail && <i className="fa-solid fa-spinner fa-spin absolute right-3.5 top-3.5 text-xs text-muted-foreground" />}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">Phone Number</label>
              <div className="relative">
                <i className="fa-solid fa-phone absolute left-3.5 top-3.5 text-xs text-muted-foreground" />
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+254 7XX XXX XXX"
                  className="w-full rounded-lg border border-border bg-white py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="signupPassword" className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-3.5 top-3.5 text-xs text-muted-foreground" />
                <input
                  id="signupPassword"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder="At least 6 characters"
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

            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-foreground">Confirm Password</label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-3.5 top-3.5 text-xs text-muted-foreground" />
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full rounded-lg border border-border bg-white py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                  required
                />
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded border-border accent-[var(--teal)]"
              />
              <span>
                I agree to the{" "}
                <button type="button" className="font-medium text-[var(--teal)] hover:underline">Terms & Conditions</button>
                {" "}and{" "}
                <button type="button" className="font-medium text-[var(--teal)] hover:underline">Privacy Policy</button>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--navy)] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)] disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-user-plus" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/signin" className="font-semibold text-[var(--teal)] hover:text-[var(--navy)]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
