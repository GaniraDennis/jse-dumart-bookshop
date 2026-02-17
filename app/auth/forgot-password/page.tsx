"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

type ForgotPasswordStep = "request" | "reset" | "success"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { resetPassword, confirmPasswordReset } = useAuth()
  
  const [step, setStep] = useState<ForgotPasswordStep>("request")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!email) {
      setError("Please enter your email address")
      return
    }

    setIsLoading(true)
    try {
      const result = await resetPassword(email)
      if (result.success) {
        setStep("reset")
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset email")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!code) {
      setError("Please enter the verification code")
      return
    }

    if (!newPassword) {
      setError("Please enter a new password")
      return
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      const success = await confirmPasswordReset(email, code, newPassword)
      if (success) {
        setStep("success")
        setTimeout(() => {
          router.push("/auth/signin")
        }, 2000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setError("")
    setIsLoading(true)
    try {
      const result = await resetPassword(email)
      setError(result.message || "Code resent successfully")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend code")
    } finally {
      setIsLoading(false)
    }
  }

  if (step === "success") {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-muted/30 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="animate-fade-in-up rounded-2xl border border-border bg-white p-8 shadow-sm text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <i className="fa-solid fa-check text-2xl text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Password Reset Successful!</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Your password has been reset. You can now sign in with your new password.
            </p>
            <p className="text-xs text-muted-foreground">
              Redirecting to sign in page...
            </p>
          </div>
        </div>
      </div>
    )
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
            <h1 className="text-2xl font-bold text-foreground">
              {step === "request" ? "Forgot Password?" : "Reset Password"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {step === "request"
                ? "Enter your email address and we'll send you a code to reset your password"
                : "Enter the code we sent to your email and create a new password"}
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <i className="fa-solid fa-circle-exclamation" />
              {error}
            </div>
          )}

          {step === "request" ? (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div>
                <label htmlFor="resetEmail" className="mb-1.5 block text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-3.5 top-3.5 text-xs text-muted-foreground" />
                  <input
                    id="resetEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-border bg-white py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--navy)] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)] disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane" />
                    Send Reset Code
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="resetCode" className="mb-1.5 block text-sm font-medium text-foreground">
                  Verification Code
                </label>
                <p className="mb-2 text-xs text-muted-foreground">
                  Enter the 6-digit code sent to {email}
                </p>
                <input
                  id="resetCode"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  maxLength={6}
                  placeholder="000000"
                  className="w-full rounded-lg border border-border bg-white py-3 px-4 text-center text-2xl font-bold tracking-widest text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-foreground">
                  New Password
                </label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-3.5 top-3.5 text-xs text-muted-foreground" />
                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                <label htmlFor="confirmNewPassword" className="mb-1.5 block text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-3.5 top-3.5 text-xs text-muted-foreground" />
                  <input
                    id="confirmNewPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full rounded-lg border border-border bg-white py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--navy)] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)] disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-check" />
                    Reset Password
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Didn't receive the code?
                </p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isLoading}
                  className="text-sm font-medium text-[var(--teal)] hover:text-[var(--navy)] disabled:opacity-70"
                >
                  <i className="fa-solid fa-envelope mr-1" />
                  Resend Code
                </button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/auth/signin" className="font-semibold text-[var(--teal)] hover:text-[var(--navy)]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
