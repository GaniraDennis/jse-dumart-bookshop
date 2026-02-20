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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage products and orders</p>
          </div>
          <Link href="/admin/products/new">
            <Button>Add New Product</Button>
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Products ({products.length})</h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No products yet</p>
              <Link href="/admin/products/new">
                <Button>Create First Product</Button>
              </Link>
            </div>
          ) : (
            <ProductsTable products={products} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  )
}
