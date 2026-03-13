"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

interface DemoAccount {
  email: string
  password: string
  role: string
}

const demoAccounts: DemoAccount[] = [
  { email: "admin@jsdumart.com", password: "admin@123", role: "Admin" },
  { email: "buyer@jsdumart.com", password: "buyer@123", role: "Buyer" },
]

export default function SignInPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showDemoHint, setShowDemoHint] = useState(true)

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setError("")
    setIsLoading(true)
    try {
      const success = await login(demoEmail, demoPassword)
      if (success) {
        router.push("/")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="animate-fade-in-up space-y-6">
          {/* Header */}
          <div className="text-center">
            <Link href="/" className="mb-6 inline-block hover:scale-110 transition-transform duration-200">
              <Image src="/images/Book Store Shop Logo (1).png" alt="JSEdumart" width={72} height={72} className="mx-auto object-contain" />
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome Back</h1>
            <p className="mt-2 text-sm text-slate-600">Sign in to access your bookshop account and manage orders</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="animate-fade-in rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-start gap-3">
              <i className="fa-solid fa-circle-exclamation mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Demo Credentials Hint */}
          {showDemoHint && (
            <div className="animate-fade-in rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-lightbulb mt-0.5 text-blue-600 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Demo Credentials Available</p>
                  <p className="text-xs opacity-90">Click demo buttons below to quickly test the platform</p>
                </div>
              </div>
              <button
                onClick={() => setShowDemoHint(false)}
                className="text-blue-600 hover:text-blue-700 flex-shrink-0"
                aria-label="Close hint"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          )}

          {/* Login Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover-lift">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-slate-300 bg-white py-3.5 pl-11 pr-12 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2.5 text-slate-700 cursor-pointer hover:text-slate-900">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600" />
                  <span>Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2.5 rounded-lg bg-slate-900 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95"
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

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-slate-500">or try a demo account</span>
              </div>
            </div>

            {/* Demo Account Buttons */}
            <div className="space-y-2.5">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => handleDemoLogin(account.email, account.password)}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2.5 rounded-lg border-2 border-slate-300 bg-white py-3 px-4 text-sm font-medium text-slate-700 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-70 transition-all active:scale-95"
                >
                  <i className="fa-solid fa-vial" />
                  Demo: {account.role} ({account.email.split("@")[0]})
                </button>
              ))}
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-slate-700">
            {"Don't have an account? "}
            <Link href="/auth/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
