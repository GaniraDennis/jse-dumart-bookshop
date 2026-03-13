'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Product {
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
  trending?: boolean
  new_arrival?: boolean
  created_at: string
  updated_at: string
}

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/products?limit=1000')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteProductId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/products/${deleteProductId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== deleteProductId))
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    } finally {
      setIsDeleting(false)
      setDeleteProductId(null)
    }
  }

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !categoryFilter || p.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(products.map((p) => p.category))].sort()

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Products</h1>
            <p className="mt-1 text-sm text-slate-600">Manage your product inventory</p>
          </div>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            <i className="fa-solid fa-plus" />
            New Product
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <div className="relative">
              <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Products Table */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <i className="fa-solid fa-spinner fa-spin text-2xl text-slate-400" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <i className="fa-solid fa-inbox text-4xl text-slate-400 mb-4 inline-block" />
              <p className="text-slate-600 mb-6">
                {searchQuery || categoryFilter ? 'No products found matching your filters' : 'No products yet'}
              </p>
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                <i className="fa-solid fa-plus" />
                Create Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium text-slate-900 max-w-xs truncate">{product.name}</p>
                            <p className="text-xs text-slate-500">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        ${product.price.toFixed(2)}
                        {product.sale_price && (
                          <p className="text-xs text-slate-500 line-through">${product.sale_price.toFixed(2)}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`font-medium ${
                            product.stock_quantity < 10
                              ? 'text-orange-600'
                              : product.stock_quantity === 0
                                ? 'text-red-600'
                                : 'text-green-600'
                          }`}
                        >
                          {product.stock_quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          {product.featured && (
                            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                              Featured
                            </span>
                          )}
                          {product.trending && (
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                              Trending
                            </span>
                          )}
                          {product.new_arrival && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                              New
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="rounded px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <i className="fa-solid fa-pen mr-1" />
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeleteProductId(product.id)}
                            className="rounded px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <i className="fa-solid fa-trash mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination Info */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="mt-6 text-center text-sm text-slate-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteProductId} onOpenChange={(open) => !open && setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this product? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end pt-4">
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
