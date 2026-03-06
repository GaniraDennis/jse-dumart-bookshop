"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

const iconMap = {
  school: 'fa-school',
  graduation: 'fa-graduation-cap',
  palette: 'fa-palette',
}

const slides = [
  {
    title: "Back to School 2026",
    subtitle: "Get all your school supplies at unbeatable prices",
    cta: "Shop Now",
    href: "/shop",
    bg: "from-[var(--navy)] to-[#2d4a7c]",
    accent: "var(--yellow)",
    icon: "school" as const,
  },
  {
    title: "KCSE Revision Materials",
    subtitle: "Past papers, revision guides & calculators ready for exams",
    cta: "View Revision",
    href: "/shop?category=revision",
    bg: "from-[#0c4a6e] to-[var(--teal)]",
    accent: "var(--yellow)",
    icon: "graduation" as const,
  },
  {
    title: "Art Supplies Sale",
    subtitle: "Up to 20% off Faber-Castell, Pelikan & Crayola products",
    cta: "Shop Art Supplies",
    href: "/shop?category=art-supplies",
    bg: "from-[#7c2d12] to-[var(--orange)]",
    accent: "#fef3c7",
    icon: "palette" as const,
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused])

  // Use current slide index for both server and client to avoid hydration mismatch
  const slide = slides[current]
  const iconClass = iconMap[slide.icon]

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`flex min-h-[420px] items-center bg-gradient-to-r ${slide.bg} transition-all duration-700 md:min-h-[480px]`}
      >
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute right-1/4 top-1/4 h-40 w-40 rounded-full bg-white/5" />

        <div className="relative mx-auto flex w-full max-w-7xl items-center gap-8 px-4 py-16">
          <div className="max-w-xl">
            <div className="animate-fade-in-up">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                <i className={`fa-solid ${iconClass} text-sm`}></i>
                JSEdumart Bookstore
              </span>
              <h1 className="mb-4 text-balance text-3xl font-extrabold leading-tight text-white md:text-5xl">
                {slide.title}
              </h1>
              <p className="mb-8 text-pretty text-base leading-relaxed text-white/80 md:text-lg">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={slide.href}
                  className="flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-[var(--navy)] transition-all hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: slide.accent }}
                >
                  {slide.cta}
                  <i className="fa-solid fa-arrow-right text-sm"></i>
                </Link>
                <Link
                  href="/shop"
                  className="flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>

          {/* Big icon decoration */}
          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="animate-scale-in">
              <i className={`fa-solid ${iconClass} text-[180px] text-white/10`}></i>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Nav arrows */}
      <button
        onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Previous slide"
      >
        <i className="fa-solid fa-chevron-left text-sm"></i>
      </button>
      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Next slide"
      >
        <i className="fa-solid fa-chevron-right text-sm"></i>
      </button>
    </section>
  )
}
