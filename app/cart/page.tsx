"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useCart } from "@/lib/cart-context"

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    console.log('[v0] Cart mounted, items:', items)
  }, [items])

  // Show empty state while hydrating
  if (!isMounted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[var(--navy)]" />
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
        <div className="animate-fade-in-up text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <i className="fa-solid fa-shopping-cart text-4xl text-muted-foreground"></i>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">Your Cart is Empty</h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Looks like you haven{"'"}t added any items to your cart yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)] hover:scale-105"
          >
            <i className="fa-solid fa-arrow-left text-sm"></i>
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  const deliveryFee = totalPrice >= 3000 ? 0 : 200
  const grandTotal = totalPrice + deliveryFee

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="transition-colors hover:text-[var(--teal)]">Home</Link>
        <i className="fa-solid fa-chevron-right text-[8px]"></i>
        <span className="font-medium text-foreground">Shopping Cart</span>
      </nav>

      <h1 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
        Shopping Cart <span className="text-lg font-normal text-muted-foreground">({items.length} {items.length === 1 ? "item" : "items"})</span>
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="space-y-4">
            {items.map((item, i) => (
              <div
                key={item.product.id}
                className="animate-fade-in-up flex gap-4 rounded-xl border border-border bg-white p-4 shadow-sm transition-all hover:shadow-md"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Image */}
                <Link href={`/product/${item.product.slug}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="h-full w-full object-cover transition-transform hover:scale-110"
                  />
                </Link>

                {/* Details */}
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--teal)]">{item.product.brand}</p>
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 className="text-sm font-semibold text-foreground transition-colors hover:text-[var(--teal)]">
                          {item.product.name}
                        </h3>
                      </Link>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <i className="fa-solid fa-trash-can text-sm"></i>
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-1 rounded-lg border border-border">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-l-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Decrease quantity"
                      >
                        <i className="fa-solid fa-minus text-xs"></i>
                      </button>
                      <span className="flex h-8 w-10 items-center justify-center text-sm font-medium text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Increase quantity"
                      >
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-sm font-bold text-[var(--navy)]">
                        {formatPrice((item.product.sale_price ?? item.product.price) * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-muted-foreground">
                          {formatPrice(item.product.sale_price ?? item.product.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={clearCart}
              className="flex items-center gap-2 rounded-lg border border-destructive/30 px-4 py-2.5 text-xs font-medium text-destructive transition-all hover:bg-destructive/10"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Cart
            </button>
            <Link
              href="/shop"
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-medium text-foreground transition-all hover:bg-muted"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-[380px]">
          <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-foreground">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-medium text-foreground">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span className={`font-medium ${deliveryFee === 0 ? "text-[var(--green)]" : "text-foreground"}`}>
                  {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="rounded-lg bg-[var(--teal)]/5 px-3 py-2 text-[10px] text-[var(--teal)] flex items-center gap-2">
                  <svg className="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Free delivery on orders above KSh 3,000
                </p>
              )}
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="text-base font-bold text-foreground">Total</span>
                  <span className="text-lg font-bold text-[var(--navy)]">{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--navy)] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--teal)] hover:scale-[1.02]"
            >
              Proceed to Checkout
              <i className="fa-solid fa-arrow-right text-xs" />
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
              <i className="fa-solid fa-shield-halved text-[var(--green)]" />
              Secure checkout with M-Pesa
            </div>

            {/* Payment methods */}
            <div className="mt-4 flex items-center justify-center gap-3 border-t border-border pt-4">
              <span className="rounded bg-[#4caf50] px-2 py-0.5 text-[10px] font-bold text-white">M-PESA</span>
              <i className="fa-brands fa-cc-visa text-lg text-muted-foreground" />
              <i className="fa-brands fa-cc-mastercard text-lg text-muted-foreground" />
              <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">COD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
