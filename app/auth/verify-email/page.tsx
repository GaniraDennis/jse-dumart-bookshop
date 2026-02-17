"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { verifyEmail } = useAuth()
  
  const email = searchParams.get("email") || ""
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!code) {
      setError("Please enter the verification code")
      return
    }

    setIsLoading(true)
    try {
      const success = await verifyEmail(email, code)
      if (success) {
        setSuccess(true)
        // Redirect to signin after 2 seconds
        setTimeout(() => {
          router.push("/auth/signin")
        }, 2000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setResendLoading(true)
    // Simulate sending verification email again
    setTimeout(() => {
      setResendLoading(false)
      setCode("")
      setError("")
      alert(`Verification code resent to ${email}. Use code: 123456`)
    }, 1500)
  }

  if (!email) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-muted/30 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="animate-fade-in-up rounded-2xl border border-border bg-white p-8 shadow-sm text-center">
            <i className="fa-solid fa-exclamation-triangle text-4xl text-destructive mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Invalid Request</h1>
            <p className="text-sm text-muted-foreground mb-6">
              No email address found. Please sign up again.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--navy)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--teal)] transition-all"
            >
              <i className="fa-solid fa-arrow-left" />
              Back to Sign Up
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-muted/30 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="animate-fade-in-up rounded-2xl border border-border bg-white p-8 shadow-sm text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <i className="fa-solid fa-check text-2xl text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Email Verified!</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Your email has been successfully verified. You can now sign in to your account.
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
            <h1 className="text-2xl font-bold text-foreground">Verify Your Email</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              We sent a verification code to<br />
              <span className="font-medium text-foreground">{email}</span>
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <i className="fa-solid fa-circle-exclamation" />
              {error}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label htmlFor="code" className="mb-1.5 block text-sm font-medium text-foreground">
                Verification Code
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                Enter the 6-digit code sent to your email
              </p>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                maxLength={6}
                placeholder="000000"
                className="w-full rounded-lg border border-border bg-white py-3 px-4 text-center text-2xl font-bold tracking-widest text-foreground placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--navy)] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)] disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-check" />
                  Verify Email
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="text-sm font-medium text-[var(--teal)] hover:text-[var(--navy)] disabled:opacity-70"
            >
              {resendLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-1" />
                  Resending...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-envelope mr-1" />
                  Resend Code
                </>
              )}
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Changed your mind?{" "}
            <Link href="/auth/signin" className="font-medium text-[var(--teal)] hover:text-[var(--navy)]">
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
