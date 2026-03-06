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

export function FeaturedSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts()
        // Show all products from Supabase
        setProducts(allProducts.slice(0, 12))
      } catch (error) {
        console.error('[v0] Error fetching featured products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

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
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[var(--navy)]" />
          </div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No products available</p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)]"
        >
          View All Products
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </Link>
      </div>
    </section>
  )
}
