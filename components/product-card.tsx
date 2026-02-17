"use client"

import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { formatPrice, type Product } from "@/lib/data"

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
      {/* Discount badge */}
      {product.discount > 0 && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--orange)] px-2.5 py-0.5 text-[10px] font-bold text-white">
          -{product.discount}%
        </span>
      )}
      {product.newArrival && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-[var(--green)] px-2.5 py-0.5 text-[10px] font-bold text-white">
          NEW
        </span>
      )}

      {/* Image */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
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
            <i
              key={i}
              className={`fa-${i < Math.floor(product.rating) ? "solid" : i < product.rating ? "solid fa-star-half-stroke" : "regular"} fa-star text-[10px] text-[var(--yellow)]`}
            />
          ))}
          <span className="ml-1 text-[10px] text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="text-base font-bold text-[var(--navy)]">
                {formatPrice(product.salePrice)}
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
          <i className={`fa-solid ${isAdding ? "fa-check" : "fa-cart-plus"}`} />
          {isAdding ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}
