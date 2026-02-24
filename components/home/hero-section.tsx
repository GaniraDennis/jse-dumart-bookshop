"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

const SchoolIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L2 7v3h1v9h16v-9h1V7L12 2m0 3.75L8.5 7v2h7V7l-3.5-1.25m-5.5 6.25h11v7H6.5v-7z" />
  </svg>
)

const GraduationIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3L1 6v3h2v9h18v-9h2V6L12 3m8 12H4v-7h16v7m-9-5.5l-4 2.5V14h8v-2.5l-4-2.5z" />
  </svg>
)

const PaletteIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
)

const iconMap = {
  school: SchoolIcon,
  graduation: GraduationIcon,
  palette: PaletteIcon,
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
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused, isMounted])

  // Always render the first slide on server, switch to current on client
  const slideIndex = isMounted ? current : 0
  const slide = slides[slideIndex]
  const IconComponent = iconMap[slide.icon]

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
                <IconComponent />
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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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
              <div className="text-[180px] text-white/10">
                <IconComponent />
              </div>
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
              i === slideIndex ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Nav arrows */}
      <button
        onClick={() => setCurrent((slideIndex - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrent((slideIndex + 1) % slides.length)}
        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
}
