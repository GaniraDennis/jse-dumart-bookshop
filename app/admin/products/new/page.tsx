'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createProduct } from '@/lib/supabase/products'

export default function AddProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'stationery',
    subcategory: 'general',
    brand: '',
    price: '',
    sale_price: '',
    discount: '0',
    stock_quantity: '',
    in_stock: true,
    image_url: '',
    rating: '0',
    review_count: '0',
    featured: false,
    trending: false,
    new_arrival: false,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const categories = [
    { value: 'stationery', label: 'Stationery' },
    { value: 'books', label: 'Books' },
    { value: 'supplies', label: 'School Supplies' },
  ]

  const subcategories = {
    stationery: ['crayons', 'paper', 'pens', 'pencils', 'erasers', 'sharpeners', 'general'],
    books: ['textbooks', 'reference', 'fiction', 'children', 'general'],
    supplies: ['art', 'geometry', 'adhesive', 'files', 'general'],
  }

  const updateField = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        updateField('image_url', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = (): boolean => {
    if (!form.name.trim()) {
      setError('Product name is required')
      return false
    }
    if (!form.description.trim()) {
      setError('Description is required')
      return false
    }
    if (!form.price || parseFloat(form.price) <= 0) {
      setError('Valid price is required')
      return false
    }
    if (!form.stock_quantity || parseInt(form.stock_quantity) < 0) {
      setError('Valid stock quantity is required')
      return false
    }
    if (!form.image_url) {
      setError('Product image is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const productData = {
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category,
        subcategory: form.subcategory,
        brand: form.brand.trim(),
        price: parseFloat(form.price),
        sale_price: form.sale_price ? parseFloat(form.sale_price) : null,
        discount: parseInt(form.discount) || 0,
        stock_quantity: parseInt(form.stock_quantity),
        in_stock: form.in_stock,
        image_url: form.image_url,
        rating: parseFloat(form.rating) || 0,
        review_count: parseInt(form.review_count) || 0,
        featured: form.featured,
        trending: form.trending,
        new_arrival: form.new_arrival,
        tags: [form.category, form.subcategory, form.brand].filter(Boolean),
        sku: `SKU-${Date.now()}`,
      }

      await createProduct(productData)
      setSuccess(true)
      
      setTimeout(() => {
        router.push('/admin/dashboard')
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-[var(--teal)] hover:text-[var(--navy)] mb-6">
            <i className="fa-solid fa-arrow-left text-sm"></i>
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[var(--navy)] to-[var(--teal)] flex items-center justify-center">
              <i className="fa-solid fa-plus text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-gray-600 mt-1">Create a new product for your store</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 flex items-center gap-3">
                <i className="fa-solid fa-circle-exclamation"></i>
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-3">
                <i className="fa-solid fa-check-circle"></i>
                Product created successfully! Redirecting...
              </div>
            )}

            {/* Product Image */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Product Image</label>
              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[var(--teal)] transition-colors">
                      {imagePreview ? (
                        <div>
                          <i className="fa-solid fa-image text-4xl text-[var(--teal)] mb-2"></i>
                          <p className="text-sm text-gray-600">Click to change image</p>
                        </div>
                      ) : (
                        <div>
                          <i className="fa-solid fa-cloud-arrow-up text-4xl text-gray-400 mb-2"></i>
                          <p className="text-sm font-medium text-gray-700">Click to upload</p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </label>
                </div>
                {imagePreview && (
                  <div className="flex-shrink-0">
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                  </div>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g., Crayons Veda"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--teal)] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <input
                  id="brand"
                  type="text"
                  value={form.brand}
                  onChange={(e) => updateField('brand', e.target.value)}
                  placeholder="e.g., Veda"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--teal)] focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Enter detailed product description"
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--teal)] focus:border-transparent resize-none"
                required
              ></textarea>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => {
                    updateField('category', e.target.value)
                    updateField('subcategory', 'general')
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--teal)] focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                <select
                  id="subcategory"
                  value={form.subcategory}
                  onChange={(e) => updateField('subcategory', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--teal)] focus:border-transparent"
                >
                  {(subcategories[form.category as keyof typeof subcategories] || []).map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price (KSh) *</label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--teal)] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="sale_price" className="block text-sm font-medium text-gray-700 mb-2">Sale Price (KSh)</label>
                <input
                  id="sale_price"
                  type="number"
                  step="0.01"
                  value={form.sale_price}
                  onChange={(e) => updateField('sale_price', e.target.value)}
                  placeholder="Leave blank if no sale"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--teal)] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                <input
                  id="discount"
                  type="number"
                  value={form.discount}
                  onChange={(e) => updateField('discount', e.target.value)}
                  placeholder="0"
                  min="0"
                  max="100"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--teal)] focus:border-transparent"
                />
              </div>
            </div>

            {/* Inventory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                <input
                  id="stock_quantity"
                  type="number"
                  value={form.stock_quantity}
                  onChange={(e) => updateField('stock_quantity', e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--teal)] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">In Stock</label>
                <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={form.in_stock}
                    onChange={(e) => updateField('in_stock', e.target.checked)}
                    className="rounded border-gray-300 accent-[var(--teal)]"
                  />
                  <span className="text-sm text-gray-700">{form.in_stock ? 'In Stock' : 'Out of Stock'}</span>
                </label>
              </div>
            </div>

            {/* Flags */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">Product Flags</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => updateField('featured', e.target.checked)}
                    className="rounded border-gray-300 accent-[var(--teal)]"
                  />
                  <span className="text-sm text-gray-700">Featured Product</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.trending}
                    onChange={(e) => updateField('trending', e.target.checked)}
                    className="rounded border-gray-300 accent-[var(--teal)]"
                  />
                  <span className="text-sm text-gray-700">Trending</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.new_arrival}
                    onChange={(e) => updateField('new_arrival', e.target.checked)}
                    className="rounded border-gray-300 accent-[var(--teal)]"
                  />
                  <span className="text-sm text-gray-700">New Arrival</span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-8 border-t border-gray-200">
              <Link href="/admin/dashboard" className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading || success}
                className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[var(--navy)] to-[var(--teal)] text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Creating...
                  </>
                ) : success ? (
                  <>
                    <i className="fa-solid fa-check"></i>
                    Created!
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-save"></i>
                    Create Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
