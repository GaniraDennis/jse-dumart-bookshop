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
              <i className="fa-solid fa-envelope text-sm" />
              <span className="hidden sm:inline">jsbookshop4@gmail.com</span>
            </a>
            <a href="tel:+254704454556" className="flex items-center gap-1 transition-colors hover:text-[var(--yellow)]">
              <i className="fa-solid fa-phone text-sm" />
              <span>+254 704 454556</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">Free delivery in Nairobi CBD</span>
            <a href="https://wa.me/254704454556" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--green)]">
              <i className="fa-brands fa-whatsapp text-lg" />
            </a>
            <a href="#" className="transition-colors hover:text-[var(--teal)]">
              <i className="fa-brands fa-facebook text-lg" />
            </a>
            <a href="#" className="transition-colors hover:text-[var(--teal)]">
              <i className="fa-brands fa-instagram text-lg" />
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
                <i className="fa-solid fa-search text-xs" />
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
                        <img src={item.product.image_url} alt={item.product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-[var(--teal)]">{formatPrice(item.product.sale_price ?? item.product.price)} x{item.quantity}</p>
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
