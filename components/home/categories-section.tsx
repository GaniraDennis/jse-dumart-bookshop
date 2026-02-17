"use client"

import Link from "next/link"
import { categories } from "@/lib/data"

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 text-center">
        <span className="mb-2 inline-block rounded-full bg-[var(--teal)]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--teal)]">
          Browse by Category
        </span>
        <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
          Shop Our Collections
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((cat, i) => (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.slug}`}
            className={`animate-fade-in-up stagger-${i + 1} group flex flex-col items-center gap-3 rounded-xl border border-border bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--teal)]/30 hover:shadow-lg`}
            style={{ opacity: 0, animationFillMode: "forwards" }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--navy)]/5 text-[var(--navy)] transition-all duration-300 group-hover:bg-[var(--teal)] group-hover:text-white group-hover:scale-110">
              <i className={`fa-solid ${cat.icon} text-xl`} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{cat.name}</h3>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{cat.count} products</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
