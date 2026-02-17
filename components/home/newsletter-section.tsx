"use client"

import { useState } from "react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="bg-gradient-to-r from-[var(--teal)] to-[#0e7490] py-14">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <i className="fa-solid fa-envelope-open-text mb-4 text-4xl text-white/30" />
        <h2 className="mb-2 text-2xl font-bold text-white">Get 10% Off Your First Order</h2>
        <p className="mb-8 text-sm text-white/80">
          Subscribe to our newsletter for exclusive deals, new arrivals, and back-to-school offers.
        </p>

        {submitted ? (
          <div className="animate-scale-in flex items-center justify-center gap-2 rounded-full bg-white/20 px-6 py-4 text-white backdrop-blur-sm">
            <i className="fa-solid fa-circle-check text-[var(--green)]" />
            <span className="text-sm font-medium">Thank you! Check your email for your 10% discount code.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-full px-6 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/30"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-[var(--navy)] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#0f172a] hover:scale-105"
            >
              Subscribe
              <i className="fa-solid fa-paper-plane text-xs" />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
