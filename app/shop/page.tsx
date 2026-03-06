"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { getProducts } from "@/lib/supabase/products"
import { useAuth } from "@/lib/auth-context"

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  subcategory?: string
  brand?: string
  description: string
  price: number
  sale_price?: number
  discount?: number
  in_stock: boolean
  stock_quantity: number
  sku: string
  image_url: string
  rating: number
  review_count: number
  featured: boolean
  trending: boolean
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

const categories = [
  { id: 'textbooks', slug: 'textbooks', name: 'Textbooks' },
  { id: 'exercise-books', slug: 'exercise-books', name: 'Exercise Books' },
  { id: 'stationery', slug: 'stationery', name: 'Stationery' },
  { id: 'art-supplies', slug: 'art-supplies', name: 'Art Supplies' },
  { id: 'school-supplies', slug: 'school-supplies', name: 'School Supplies' },
  { id: 'revision', slug: 'revision', name: 'Revision Materials' },
]

function searchProducts(query: string, allProducts: Product[]): Product[] {
  const lowerQuery = query.toLowerCase()
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.brand?.toLowerCase().includes(lowerQuery)
  )
}

type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "rating"

export default function ShopPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const searchParam = searchParams.get("q")

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)
  const [searchQuery, setSearchQuery] = useState(searchParam || "")
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/shop')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setAllProducts(data)
      } catch (error) {
        console.error('[v0] Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    setSelectedCategory(categoryParam)
  }, [categoryParam])

  useEffect(() => {
    setSearchQuery(searchParam || "")
  }, [searchParam])

  const filteredProducts = useMemo(() => {
    let result: Product[] = searchQuery ? searchProducts(searchQuery, allProducts) : [...allProducts]

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    result = result.filter((p) => {
      const price = p.sale_price || p.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price))
        break
      case "price-desc":
        result.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price))
        break
      case "newest":
        result.sort((a, b) => (b.new_arrival ? 1 : 0) - (a.new_arrival ? 1 : 0))
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [searchQuery, selectedCategory, sortBy, priceRange, allProducts])

  const clearFilters = () => {
    setSelectedCategory(null)
    setSearchQuery("")
    setSortBy("featured")
    setPriceRange([0, 5000])
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center" suppressHydrationWarning>
        <div className="text-center max-w-md">
          <div className="h-20 w-20 rounded-full bg-[var(--navy)]/10 flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-lock text-4xl text-[var(--navy)]"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to browse our shop. Sign in to your account or create one to get started.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/login" className="bg-[var(--navy)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--teal)] transition-all">
              <i className="fa-solid fa-sign-in-alt mr-2"></i>
              Sign In
            </Link>
            <Link href="/register" className="border-2 border-[var(--navy)] text-[var(--navy)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--navy)]/5 transition-all">
              <i className="fa-solid fa-user-plus mr-2"></i>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[var(--navy)]" />
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Breadcrumb + Header */}
      <div className="bg-gradient-to-r from-[var(--navy)] to-[#2d4a7c] py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <i className="fa-solid fa-chevron-right text-[8px]" />
            <span className="text-white">Shop</span>
            {selectedCategory && (
              <>
                <i className="fa-solid fa-chevron-right text-[8px]" />
                <span className="text-[var(--yellow)]">
                  {categories.find((c) => c.slug === selectedCategory)?.name}
                </span>
              </>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-bold text-white md:text-3xl">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : selectedCategory
                ? categories.find((c) => c.slug === selectedCategory)?.name || "Shop"
                : "All Products"}
          </h1>
          <p className="mt-1 text-sm text-white/70">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div className="rounded-xl border border-border bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-lg border border-border bg-muted py-2 pl-3 pr-9 text-sm placeholder:text-muted-foreground focus:border-[var(--teal)] focus:outline-none"
                  />
                  <i className="fa-solid fa-magnifying-glass absolute right-3 top-2.5 text-xs text-muted-foreground" />
                </div>
              </div>

              {/* Categories */}
              <div className="rounded-xl border border-border bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Categories</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      !selectedCategory ? "bg-[var(--navy)] text-white font-medium" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    All Products
                    <span className="text-xs opacity-70">{allProducts.length}</span>
                  </button>
                  {categories.map((cat) => {
                    const count = allProducts.filter((p) => p.category === cat.id).length
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                          selectedCategory === cat.slug ? "bg-[var(--navy)] text-white font-medium" : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`inline-block h-2 w-2 rounded-full ${selectedCategory === cat.slug ? "bg-white" : "bg-[var(--teal)]"}`} />
                          {cat.name}
                        </span>
                        <span className="text-xs opacity-70">{count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Price range */}
              <div className="rounded-xl border border-border bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Price Range</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{formatPrice(priceRange[0])}</span>
                  <span className="text-muted-foreground">-</span>
                  <span className="text-muted-foreground">{formatPrice(priceRange[1])}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="mt-3 w-full accent-[var(--teal)]"
                />
              </div>

              {/* Clear filters */}
              <button
                onClick={clearFilters}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
              >
                <i className="fa-solid fa-filter-circle-xmark text-xs" />
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-white p-3">
              <div className="flex items-center gap-2">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm font-medium text-foreground lg:hidden"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </button>

                {/* View mode */}
                <div className="hidden items-center gap-1 rounded-lg bg-muted p-1 sm:flex">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`rounded-md px-2.5 py-1.5 text-xs ${viewMode === "grid" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
                    aria-label="Grid view"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`rounded-md px-2.5 py-1.5 text-xs ${viewMode === "list" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
                    aria-label="List view"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zm0 6a1 1 0 011-1h16a1 1 0 011 1v2H3v-2zm0 6a1 1 0 011-1h16a1 1 0 011 1v2H3v-2z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden text-xs text-muted-foreground sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:border-[var(--teal)] focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Best Rating</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Mobile filters panel */}
            {showFilters && (
              <div className="animate-slide-down mb-6 rounded-xl border border-border bg-white p-4 lg:hidden">
                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-semibold text-foreground">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${!selectedCategory ? "bg-[var(--navy)] text-white" : "bg-muted text-foreground"}`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${selectedCategory === cat.slug ? "bg-[var(--navy)] text-white" : "bg-muted text-foreground"}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={clearFilters} className="text-xs font-medium text-[var(--teal)]">
                  Clear All
                </button>
              </div>
            )}

            {/* Active filters */}
            {(selectedCategory || searchQuery) && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">Active:</span>
                {selectedCategory && (
                  <span className="flex items-center gap-1 rounded-full bg-[var(--navy)]/10 px-3 py-1 text-xs font-medium text-[var(--navy)]">
                    {categories.find((c) => c.slug === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory(null)}>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="flex items-center gap-1 rounded-full bg-[var(--teal)]/10 px-3 py-1 text-xs font-medium text-[var(--teal)]">
                    &ldquo;{searchQuery}&rdquo;
                    <button onClick={() => setSearchQuery("")}>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === "grid"
                  ? "grid grid-cols-2 gap-4 md:grid-cols-3"
                  : "flex flex-col gap-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-white py-20">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[var(--navy)]" />
                <h3 className="mb-2 text-lg font-semibold text-foreground">Loading products...</h3>
                <p className="text-sm text-muted-foreground">Please wait while we fetch the latest products</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-white py-20">
                <svg className="mb-4 h-16 w-16 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mb-2 text-lg font-semibold text-foreground">No products found</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  {allProducts.length === 0 
                    ? "Products are being added. Check back soon!" 
                    : "Try adjusting your filters or search terms"}
                </p>
                <button
                  onClick={clearFilters}
                  className="rounded-lg bg-[var(--navy)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--teal)]"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
