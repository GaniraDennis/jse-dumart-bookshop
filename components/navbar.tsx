"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { categories, formatPrice } from "@/lib/data"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const { totalItems, totalPrice, items, isCartOpen, setIsCartOpen, removeFromCart } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
    setShowUserMenu(false)
    setShowCategories(false)
  }, [pathname])

  return (
    <>
      {/* Top bar */}
      <div className="bg-[var(--navy)] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <a href="mailto:jsbookshop4@gmail.com" className="flex items-center gap-1 transition-colors hover:text-[var(--yellow)]">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">jsbookshop4@gmail.com</span>
            </a>
            <a href="tel:+254704454556" className="flex items-center gap-1 transition-colors hover:text-[var(--yellow)]">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+254 704 454556</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">Free delivery in Nairobi CBD</span>
            <a href="https://wa.me/254704454556" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--green)]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
            </a>
            <a href="#" className="transition-colors hover:text-[var(--teal)]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="transition-colors hover:text-[var(--teal)]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.769 5.017 15.622 5 12c.017-3.629.285-4.769 1.557-5.892 2.099-.143 6.782-.143 8.883 0 1.271 1.122 1.54 2.271 1.557 5.892-.017 3.621-.285 4.769-1.557 5.892z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-lg backdrop-blur-md"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-3 hover-lift">
            <div className="relative animate-bounce-in">
              <Image
                src="/images/Book Store Shop Logo (1).png"
                alt="JSEdumart Logo"
                width={56}
                height={56}
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-xl font-bold leading-tight text-[var(--navy)]">JSEdumart</p>
              <p className="text-xs leading-tight text-[var(--teal)] font-medium">Your Trusted Bookstore</p>
            </div>
          </Link>

          {/* Search Bar (desktop) */}
          <div className="mx-6 hidden max-w-md flex-1 lg:block">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (searchQuery.trim()) {
                  window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`
                }
              }}
              className="relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search textbooks, stationery, supplies..."
                className="w-full rounded-full border border-border bg-muted py-2.5 pl-4 pr-12 text-sm text-foreground transition-all placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)]/20"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--navy)] text-white transition-colors hover:bg-[var(--teal)]"
                aria-label="Search"
              >
                <i className="fa-solid fa-magnifying-glass text-xs" />
              </button>
            </form>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-[var(--teal)] ${
                  pathname === link.href
                    ? "text-[var(--navy)] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[var(--teal)]"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Categories dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-[var(--teal)]"
              >
                Categories
                <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${showCategories ? "rotate-180" : ""}`} />
              </button>
              {showCategories && (
                <div className="animate-slide-down absolute right-0 top-full mt-2 w-64 rounded-xl glass p-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                      onClick={() => setShowCategories(false)}
                    >
                      <i className={`fa-solid ${cat.icon} text-lg text-center text-[var(--teal)]`} />
                      <span>{cat.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{cat.count}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* User */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-muted hover:text-[var(--navy)] hover-lift"
                aria-label="Account"
              >
                <i className={`fa-solid ${isAuthenticated ? "fa-circle-user" : "fa-user"} text-2xl`} />
              </button>
              {showUserMenu && (
                <div className="animate-slide-down absolute right-0 top-full mt-2 w-56 rounded-xl glass p-2">
                  {isAuthenticated ? (
                    <>
                      <div className="border-b border-border px-3 py-2">
                        <p className="text-sm font-medium text-foreground">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                      <Link href="/account" className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted">
                        <i className="fa-solid fa-user-gear w-5 text-center" />My Account
                      </Link>
                      <Link href="/orders" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted">
                        <i className="fa-solid fa-box w-5 text-center" />My Orders
                      </Link>
                      <button
                        onClick={logout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <i className="fa-solid fa-right-from-bracket w-5 text-center" />Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/signin" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                        <i className="fa-solid fa-right-to-bracket w-5 text-center" />Sign In
                      </Link>
                      <Link href="/auth/signup" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--teal)] transition-colors hover:bg-muted">
                        <i className="fa-solid fa-user-plus w-5 text-center" />Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <Link
                href="/cart"
                className="relative flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-muted hover:text-[var(--navy)] hover-lift"
                aria-label="Shopping cart"
              >
                <i className="fa-solid fa-cart-shopping text-2xl" />
                {totalItems > 0 && (
                  <span className="animate-cart-bounce absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--orange)] text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mini cart popup */}
              {isCartOpen && items.length > 0 && (
                <div className="animate-slide-down absolute right-0 top-full mt-2 w-80 rounded-xl glass p-4">
                  <p className="mb-3 text-sm font-semibold text-foreground">Just Added</p>
                  {items.slice(-2).map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 rounded-lg bg-muted/50 p-2">
                      <div className="h-12 w-12 overflow-hidden rounded-lg bg-muted">
                        <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-[var(--teal)]">{formatPrice(item.product.salePrice ?? item.product.price)} x{item.quantity}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive">
                        <i className="fa-solid fa-xmark text-xs" />
                      </button>
                    </div>
                  ))}
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-sm font-semibold text-foreground">{formatPrice(totalPrice)}</span>
                    <Link
                      href="/cart"
                      className="rounded-lg bg-[var(--navy)] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--teal)]"
                      onClick={() => setIsCartOpen(false)}
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-muted lg:hidden hover-lift"
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${isMobileOpen ? "fa-xmark" : "fa-bars"} text-2xl`} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isMobileOpen && (
          <div className="animate-slide-down border-t border-border bg-white px-4 pb-4 lg:hidden">
            {/* Mobile search */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (searchQuery.trim()) {
                  window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`
                }
              }}
              className="relative mb-3 mt-3"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books, stationery..."
                className="w-full rounded-full border border-border bg-muted py-2.5 pl-4 pr-12 text-sm placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none"
              />
              <button type="submit" className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--navy)] text-white" aria-label="Search">
                <i className="fa-solid fa-magnifying-glass text-xs" />
              </button>
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  pathname === link.href ? "bg-muted text-[var(--navy)]" : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 border-t border-border pt-2">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</p>
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                >
                  <i className={`fa-solid ${cat.icon} w-5 text-center text-[var(--teal)]`} />
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
