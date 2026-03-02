"use client"

import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"

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
  image_url: string
  rating: number
  review_count: number
  featured: boolean
  new_arrival: boolean
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    setIsAdding(true)
    addToCart(product)
    setTimeout(() => setIsAdding(false), 600)
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* New arrival badge */}
      {product.new_arrival && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-[var(--green)] px-2.5 py-0.5 text-[10px] font-bold text-white">
          NEW
        </span>
      )}

      {/* Image */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[var(--teal)]">
          {product.brand}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-foreground transition-colors hover:text-[var(--teal)]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(product.rating)
                  ? 'fill-[var(--yellow)]'
                  : i < product.rating
                  ? 'fill-[var(--yellow)]'
                  : 'fill-gray-300'
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
          <span className="ml-1 text-[10px] text-muted-foreground">({product.review_count})</span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center gap-2">
          {product.sale_price ? (
            <>
              <span className="text-base font-bold text-[var(--navy)]">
                {formatPrice(product.sale_price)}
              </span>
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-[var(--navy)]">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          disabled={isAdding}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-all duration-300 ${
            isAdding
              ? "bg-[var(--green)] text-white"
              : "bg-[var(--navy)] text-white hover:bg-[var(--teal)]"
          }`}
        >
          {isAdding ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
              Adding...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}
