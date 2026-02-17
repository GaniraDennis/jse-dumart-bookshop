"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 1500)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Loading"
      role="status"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="animate-bounce-in">
          <div className="relative">
            <Image
              src="/images/Book Store Shop Logo (1).png"
              alt="JSEdumart Logo"
              width={220}
              height={220}
              priority
              className="object-contain drop-shadow-2xl"
            />
            <div className="absolute inset-0 animate-pulse rounded-full blur-3xl bg-[var(--teal)]/20"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-[var(--navy)] [animation-delay:0ms]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[var(--teal)] [animation-delay:150ms]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[var(--yellow)] [animation-delay:300ms]" />
        </div>
        <p className="text-lg font-semibold tracking-widest text-[var(--navy)] animate-fade-in">
          JSEdumart
        </p>
      </div>
      <span className="sr-only">Application is loading</span>
    </div>
  )
}
