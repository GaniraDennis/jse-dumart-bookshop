"use client"

import { useEffect, useState, useRef } from "react"
import { flashDeals } from "@/lib/data"
import { ProductCard } from "@/components/product-card"

export function FlashDealsSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 })
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) { seconds = 59; minutes-- }
        if (minutes < 0) { minutes = 59; hours-- }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59 }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" })
  }

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <section className="bg-gradient-to-r from-[var(--navy)] to-[#2d4a7c] py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-fire text-[var(--orange)]" />
              <h2 className="text-2xl font-bold text-white">Flash Deals</h2>
            </div>
            <p className="mt-1 text-sm text-white/70">Grab these offers before they expire!</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-white/70">Ends in:</span>
            <div className="flex items-center gap-1">
              {[
                { label: "HRS", value: pad(timeLeft.hours) },
                { label: "MIN", value: pad(timeLeft.minutes) },
                { label: "SEC", value: pad(timeLeft.seconds) },
              ].map((t, i) => (
                <div key={t.label} className="flex items-center gap-1">
                  <div className="flex flex-col items-center rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                    <span className="text-lg font-bold text-white">{t.value}</span>
                    <span className="text-[8px] text-white/50">{t.label}</span>
                  </div>
                  {i < 2 && <span className="text-xl font-bold text-white/40">:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110"
            aria-label="Scroll left"
          >
            <i className="fa-solid fa-chevron-left text-sm text-[var(--navy)]" />
          </button>

          <div ref={scrollRef} className="scrollbar-hide flex gap-4 overflow-x-auto px-2 pb-4" style={{ scrollbarWidth: "none" }}>
            {flashDeals.map((product) => (
              <div key={product.id} className="w-[240px] shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110"
            aria-label="Scroll right"
          >
            <i className="fa-solid fa-chevron-right text-sm text-[var(--navy)]" />
          </button>
        </div>
      </div>
    </section>
  )
}
