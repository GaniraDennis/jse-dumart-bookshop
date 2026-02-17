const services = [
  { icon: "fa-truck-fast", title: "Free Delivery", desc: "Free within Nairobi CBD", color: "var(--teal)" },
  { icon: "fa-bolt", title: "Same Day Delivery", desc: "Order before 2PM", color: "var(--yellow)" },
  { icon: "fa-money-bill-wave", title: "M-Pesa Accepted", desc: "Easy mobile payments", color: "var(--green)" },
  { icon: "fa-shield-halved", title: "Quality Guaranteed", desc: "100% original products", color: "var(--navy)" },
  { icon: "fa-headset", title: "Customer Support", desc: "WhatsApp & Phone", color: "var(--orange)" },
  { icon: "fa-rotate-left", title: "Easy Returns", desc: "7-day return policy", color: "var(--teal)" },
]

export function ServicesSection() {
  return (
    <section className="border-y border-border bg-muted/50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="flex flex-col items-center gap-2 rounded-xl bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: `${svc.color}15`, color: svc.color }}
              >
                <i className={`fa-solid ${svc.icon} text-lg`} />
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
