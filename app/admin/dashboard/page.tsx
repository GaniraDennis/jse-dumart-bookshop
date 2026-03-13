'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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

interface DashboardStats {
  totalProducts: number
  totalValue: number
  lowStockProducts: number
  categories: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalValue: 0,
    lowStockProducts: 0,
    categories: 0,
  })
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/products?limit=1000')
        const products = await response.json()

        const uniqueCategories = new Set(products.map((p: Product) => p.category))
        const totalValue = products.reduce((sum: number, p: Product) => sum + p.price * p.stock_quantity, 0)
        const lowStock = products.filter((p: Product) => p.stock_quantity < 10).length

        setStats({
          totalProducts: products.length,
          totalValue,
          lowStockProducts: lowStock,
          categories: uniqueCategories.size,
        })

        setRecentProducts(products.slice(0, 5))
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statCards = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: 'fa-box',
      color: 'blue',
    },
    {
      label: 'Inventory Value',
      value: `$${stats.totalValue.toFixed(2)}`,
      icon: 'fa-dollar-sign',
      color: 'green',
    },
    {
      label: 'Low Stock Items',
      value: stats.lowStockProducts,
      icon: 'fa-exclamation-triangle',
      color: 'orange',
    },
    {
      label: 'Categories',
      value: stats.categories,
      icon: 'fa-tag',
      color: 'purple',
    },
  ]

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">Welcome to your admin panel</p>
          </div>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            <i className="fa-solid fa-plus" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <i className="fa-solid fa-spinner fa-spin text-2xl text-slate-400" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {statCards.map((stat, index) => (
                <div
                  key={index}
                  className={`rounded-xl border-2 p-6 ${colorClasses[stat.color as keyof typeof colorClasses]}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium opacity-75">{stat.label}</p>
                      <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                    </div>
                    <i className={`fa-solid ${stat.icon} text-2xl opacity-50`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Products */}
            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">Recent Products</h2>
                  <Link href="/admin/products" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    View All →
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Stock</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProducts.length > 0 ? (
                      recentProducts.map((product) => (
                        <tr key={product.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="h-10 w-10 rounded object-cover"
                              />
                              <div>
                                <p className="font-medium text-slate-900">{product.name}</p>
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
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-700">
                            <span
                              className={`font-medium ${
                                product.stock_quantity < 10 ? 'text-orange-600' : 'text-green-600'
                              }`}
                            >
                              {product.stock_quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/admin/products/${product.id}/edit`}
                                className="rounded px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50"
                              >
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-600">
                          No products found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
