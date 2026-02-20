'use client'

import { useState } from 'react'
import { Product } from '@/lib/supabase/products'
import { Button } from '@/components/ui/button'

interface ProductFormProps {
  initialData?: Product
  onSubmit: (data: Partial<Product>) => Promise<void>
  isLoading?: boolean
}

export function ProductForm({ initialData, onSubmit, isLoading = false }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    initialData || {
      name: '',
      slug: '',
      category: '',
      subcategory: '',
      brand: '',
      description: '',
      price: 0,
      sale_price: undefined,
      discount: 0,
      in_stock: true,
      stock_quantity: 0,
      sku: '',
      image_url: '',
      rating: 0,
      featured: false,
      trending: false,
      new_arrival: false,
    }
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseFloat(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Price (KES)</label>
          <input
            type="number"
            name="price"
            value={formData.price || 0}
            onChange={handleChange}
            step="0.01"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Sale Price (KES)</label>
          <input
            type="number"
            name="sale_price"
            value={formData.sale_price || ''}
            onChange={handleChange}
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Stock Quantity</label>
          <input
            type="number"
            name="stock_quantity"
            value={formData.stock_quantity || 0}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={formData.image_url || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured || false}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-900">Featured</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="trending"
            checked={formData.trending || false}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-900">Trending</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="new_arrival"
            checked={formData.new_arrival || false}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-900">New Arrival</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="in_stock"
            checked={formData.in_stock !== false}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-900">In Stock</span>
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Product'}
        </Button>
      </div>
    </form>
  )
}
