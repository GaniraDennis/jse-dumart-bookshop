"use client"

import { useState, useEffect } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { testimonials } from "@/lib/data"

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-16">
      <div className={`mb-10 text-center transition-all duration-500 ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}>
        <span className="mb-2 inline-block animate-pulse rounded-full bg-[var(--yellow)]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--orange)]">
          Testimonials
        </span>
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">What Our Customers Say</h2>
      </div>

      {/* Desktop grid */}
      <div className="hidden gap-6 md:grid md:grid-cols-3">
        {testimonials.slice(0, 3).map((t, idx) => (
          <div
            key={t.name}
            className={`flex flex-col rounded-xl border border-border bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-[var(--teal)]/30 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
            style={{
              animationDelay: isVisible ? `${idx * 0.1}s` : "0s",
            }}
          >
            <div className="mb-4 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className={`fa-solid fa-star text-xs transition-transform hover:scale-125 ${i < t.rating ? "text-[var(--yellow)]" : "text-border"}`} />
              ))}
            </div>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 border-t border-border pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--navy)] to-[var(--teal)] text-sm font-bold text-white">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-[10px] text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden">
        <div key={current} className="animate-fade-in rounded-xl border border-border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <i key={i} className={`fa-solid fa-star text-xs ${i < testimonials[current].rating ? "text-[var(--yellow)]" : "text-border"}`} />
            ))}
          </div>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            &ldquo;{testimonials[current].text}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--navy)] to-[var(--teal)] text-sm font-bold text-white">
              {testimonials[current].avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{testimonials[current].name}</p>
              <p className="text-[10px] text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-[var(--navy)]" : "w-2 bg-border"}`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
