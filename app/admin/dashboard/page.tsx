'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Product, getProducts, deleteProduct } from '@/lib/supabase/products'
import { ProductsTable } from '@/components/admin/products-table'
import { Button } from '@/components/ui/button'

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setIsLoading(true)
      const data = await getProducts({ limit: 100 })
      setProducts(data)
      setError(null)
    } catch (err) {
      setError('Failed to load products')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await deleteProduct(id)
      setProducts(products.filter(p => p.id !== id))
    } catch (err) {
      setError('Failed to delete product')
      console.error(err)
    }
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[var(--navy)] to-[var(--teal)] flex items-center justify-center">
                  <i className="fa-solid fa-chart-line text-white text-lg" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">JSEdumart Admin</h1>
              </div>
              <p className="text-gray-600 mt-1 text-lg">Manage your products and grow your store</p>
            </div>
            <Link href="/admin/products/new">
              <Button className="bg-gradient-to-r from-[var(--navy)] to-[var(--teal)] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                <i className="fa-solid fa-plus mr-2" />
                Add New Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <i className="fa-solid fa-boxes text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">In Stock</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{products.filter(p => p.in_stock).length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <i className="fa-solid fa-check-circle text-green-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Low Stock</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{products.filter(p => p.stock_quantity < 10).length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <i className="fa-solid fa-exclamation-triangle text-orange-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 flex items-center gap-3">
            <i className="fa-solid fa-circle-exclamation" />
            {error}
          </div>
        )}

        {/* Products Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Products Library</h2>
              <span className="text-sm text-gray-600 font-medium">{filteredProducts.length} items</span>
            </div>
            <div className="relative">
              <i className="fa-solid fa-search absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--teal)] focus:border-transparent"
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-16">
              <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-[var(--teal)] animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-inbox text-gray-400 text-3xl" />
              </div>
              <p className="text-gray-600 mb-6 font-medium text-lg">
                {searchQuery ? 'No products found matching your search' : 'No products yet'}
              </p>
              <Link href="/admin/products/new">
                <Button className="bg-gradient-to-r from-[var(--navy)] to-[var(--teal)] text-white px-6 py-2 rounded-lg font-semibold">
                  <i className="fa-solid fa-plus mr-2" />
                  Create First Product
                </Button>
              </Link>
            </div>
          ) : (
            <ProductsTable products={filteredProducts} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  )
}
