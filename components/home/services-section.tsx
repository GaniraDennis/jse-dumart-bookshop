"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const TruckIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM9 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20 8H4V4h16v4zm-11 11H3V9h6v10z"/>
  </svg>
)

const BoltIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)

const MoneyIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
  </svg>
)

const ShieldIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
  </svg>
)

const HeadsetIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1C6.48 1 2 5.48 2 11v7c0 1.66 1.34 3 3 3h2v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-2v8h2c1.66 0 3-1.34 3-3v-7c0-5.52-4.48-10-10-10z"/>
  </svg>
)

const ReturnIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z" transform="rotate(180 12 12)"/>
  </svg>
)

const services = [
  { Icon: TruckIcon, title: "Free Delivery", desc: "Free within Nairobi CBD", color: "var(--teal)" },
  { Icon: BoltIcon, title: "Same Day Delivery", desc: "Order before 2PM", color: "var(--yellow)" },
  { Icon: MoneyIcon, title: "M-Pesa Accepted", desc: "Easy mobile payments", color: "var(--green)" },
  { Icon: ShieldIcon, title: "Quality Guaranteed", desc: "100% original products", color: "var(--navy)" },
  { Icon: HeadsetIcon, title: "Customer Support", desc: "WhatsApp & Phone", color: "var(--orange)" },
  { Icon: ReturnIcon, title: "Easy Returns", desc: "7-day return policy", color: "var(--teal)" },
]

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 })

  return (
    <section ref={ref} className="border-y border-border bg-muted/50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {services.map((svc, idx) => (
            <div
              key={svc.title}
              className={`flex flex-col items-center gap-2 rounded-xl bg-white p-4 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:border hover:border-[var(--teal)]/30 group ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{
                animationDelay: isVisible ? `${idx * 0.08}s` : "0s",
              }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-125"
                style={{ backgroundColor: `${svc.color}15`, color: svc.color }}
              >
                <svc.Icon />
              </div>
              <h3 className="text-xs font-semibold text-foreground">{svc.title}</h3>
              <p className="text-[10px] text-muted-foreground">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
