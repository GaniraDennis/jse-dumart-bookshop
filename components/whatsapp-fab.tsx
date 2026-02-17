"use client"

import { useState } from "react"

export function WhatsAppFAB() {
  const [isHovered, setIsHovered] = useState(false)

  const phone = "254704454556"
  const message = encodeURIComponent(
    "Hi JSEdumart! I'd like to enquire about your products."
  )

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3">
      {isHovered && (
        <div className="animate-fade-in glass rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground shadow-xl">
          <i className="fa-solid fa-message mr-2 text-[var(--green)]"></i>
          Chat with us now!
        </div>
      )}
      <a
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="animate-whatsapp-pulse flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#25d366] to-[#20ba5f] text-white shadow-2xl transition-all hover:scale-125 hover-lift"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp text-3xl" />
      </a>
    </div>
  )
}
