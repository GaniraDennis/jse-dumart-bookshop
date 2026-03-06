"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getProducts } from "@/lib/supabase/products"
import { ProductCard } from "@/components/product-card"

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  brand?: string
  description: string
  price: number
  sale_price?: number
  discount?: number
  in_stock: boolean
  stock_quantity: number
  image_url: string
  rating: number
  review_count: number
  featured: boolean
  new_arrival: boolean
  created_at?: string
  updated_at?: string
}

export function FlashSalesCarousel() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts()
        // Get 8 products for carousel
        setProducts(allProducts.slice(0, 8))
      } catch (error) {
        console.error('[v0] Error fetching flash sales products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, products.length - 4) : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= products.length - 4 ? 0 : prev + 1))
  }

  if (isLoading || products.length === 0) {
    return null
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="mb-2 inline-block rounded-full bg-[var(--orange)]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--orange)]">
            Limited Time
          </span>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Flash Sales</h2>
        </div>
        <Link
          href="/shop"
          className="hidden items-center gap-2 text-sm font-medium text-[var(--teal)] transition-colors hover:text-[var(--navy)] sm:flex"
        >
          View All
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </Link>
      </div>

      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div className="flex gap-4 transition-transform duration-300" style={{
            transform: `translateX(-${currentIndex * (100 / 4)}%)`
          }}>
            {products.map((product) => (
              <div key={product.id} className="w-1/4 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-[var(--navy)] hover:text-white"
          aria-label="Previous products"
        >
          <i className="fa-solid fa-chevron-left text-sm"></i>
        </button>

        <button
          onClick={handleNext}
          className="absolute -right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-[var(--navy)] hover:text-white"
          aria-label="Next products"
        >
          <i className="fa-solid fa-chevron-right text-sm"></i>
        </button>
      </div>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: Math.max(0, products.length - 3) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentIndex ? 'w-8 bg-[var(--orange)]' : 'w-2 bg-muted'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Mobile View All */}
      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)]"
        >
          View All Flash Sales
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </Link>
      </div>
    </section>
  )
}
