"use client"

import Link from "next/link"
import { featuredProducts } from "@/lib/data"
import { ProductCard } from "@/components/product-card"

export function FeaturedSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="mb-2 inline-block rounded-full bg-[var(--navy)]/5 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--navy)]">
            Top Picks
          </span>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Featured Products</h2>
        </div>
        <Link
          href="/shop"
          className="hidden items-center gap-2 text-sm font-medium text-[var(--teal)] transition-colors hover:text-[var(--navy)] sm:flex"
        >
          View All
          <i className="fa-solid fa-arrow-right text-xs" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)]"
        >
          View All Products
          <i className="fa-solid fa-arrow-right text-xs" />
        </Link>
      </div>
    </section>
  )
}
