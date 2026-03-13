'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

interface ProductFormProps {
  productId?: string
  onSubmit?: (product: Product) => void
}

const categories = [
  'Fiction',
  'Science Fiction',
  'Romance',
  'Mystery',
  'Thriller',
  'Biography',
  'Self-Help',
  'History',
  'Educational',
  'Children',
]

export function ProductForm({ productId, onSubmit }: ProductFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(!!productId)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Fiction',
    brand: '',
    description: '',
    price: '',
    sale_price: '',
    discount: '',
    stock_quantity: '',
    image_url: 'https://images.unsplash.com/photo-1543002588-d83fb7f34b47?w=400&h=600&fit=crop',
    in_stock: true,
    rating: '0',
    review_count: '0',
    featured: false,
    trending: false,
    new_arrival: false,
  })

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`)
      if (response.ok) {
        const product = await response.json()
        setFormData({
          name: product.name,
          slug: product.slug,
          category: product.category,
          brand: product.brand || '',
          description: product.description,
          price: String(product.price),
          sale_price: product.sale_price ? String(product.sale_price) : '',
          discount: product.discount ? String(product.discount) : '',
          stock_quantity: String(product.stock_quantity),
          image_url: product.image_url,
          in_stock: product.in_stock,
          rating: String(product.rating),
          review_count: String(product.review_count),
          featured: product.featured,
          trending: product.trending || false,
          new_arrival: product.new_arrival || false,
        })
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Product name is required'
    if (!formData.category.trim()) newErrors.category = 'Category is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required'
    if (!formData.stock_quantity || parseInt(formData.stock_quantity) < 0) newErrors.stock_quantity = 'Valid stock quantity is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: generateSlug(value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSaving(true)
    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        brand: formData.brand,
        description: formData.description,
        price: parseFloat(formData.price),
        sale_price: formData.sale_price ? parseFloat(formData.sale_price) : undefined,
        discount: formData.discount ? parseInt(formData.discount) : undefined,
        stock_quantity: parseInt(formData.stock_quantity),
        image_url: formData.image_url,
        in_stock: formData.in_stock,
        rating: parseFloat(formData.rating),
        review_count: parseInt(formData.review_count),
        featured: formData.featured,
        trending: formData.trending,
        new_arrival: formData.new_arrival,
      }

      const method = productId ? 'PUT' : 'POST'
      const url = productId ? `/api/products/${productId}` : '/api/products'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const product = await response.json()
        if (onSubmit) {
          onSubmit(product)
        }
        router.push('/admin/products')
      } else {
        const error = await response.json()
        setErrors({ submit: error.error || 'Failed to save product' })
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred while saving the product' })
      console.error('Error saving product:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <i className="fa-solid fa-spinner fa-spin text-2xl text-slate-400" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Alert */}
      {errors.submit && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-start gap-3">
          <i className="fa-solid fa-circle-exclamation mt-0.5 flex-shrink-0" />
          <span>{errors.submit}</span>
        </div>
      )}

      {/* Basic Information */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold text-slate-900">Basic Information</h3>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Product Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter product name"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              URL Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="auto-generated-slug"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 bg-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Brand
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
              placeholder="Enter brand name"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Description <span className="text-red-600">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Enter product description"
              rows={4}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all resize-none ${
                errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold text-slate-900">Pricing</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Regular Price <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              placeholder="0.00"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                errors.price ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>

          {/* Sale Price */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Sale Price
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.sale_price}
              onChange={(e) => setFormData((prev) => ({ ...prev, sale_price: e.target.value }))}
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Discount %
            </label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) => setFormData((prev) => ({ ...prev, discount: e.target.value }))}
              placeholder="0"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Stock Quantity <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              value={formData.stock_quantity}
              onChange={(e) => setFormData((prev) => ({ ...prev, stock_quantity: e.target.value }))}
              placeholder="0"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                errors.stock_quantity ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            {errors.stock_quantity && <p className="mt-1 text-sm text-red-600">{errors.stock_quantity}</p>}
          </div>
        </div>

        {/* In Stock */}
        <div className="mt-4">
          <label className="flex items-center gap-2.5 text-sm text-slate-900 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.in_stock}
              onChange={(e) => setFormData((prev) => ({ ...prev, in_stock: e.target.checked }))}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600"
            />
            <span className="font-medium">In Stock</span>
          </label>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold text-slate-900">Additional Settings</h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mb-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Rating
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData((prev) => ({ ...prev, rating: e.target.value }))}
              placeholder="0"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Review Count */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Reviews
            </label>
            <input
              type="number"
              value={formData.review_count}
              onChange={(e) => setFormData((prev) => ({ ...prev, review_count: e.target.value }))}
              placeholder="0"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {/* Image Preview */}
        {formData.image_url && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-900 mb-2">Preview</label>
            <img
              src={formData.image_url}
              alt="Product preview"
              className="h-32 w-32 rounded-lg object-cover border border-slate-200"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1543002588-d83fb7f34b47?w=400&h=600&fit=crop'
              }}
            />
          </div>
        )}

        {/* Badges */}
        <div className="space-y-3">
          <label className="flex items-center gap-2.5 text-sm text-slate-900 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600"
            />
            <span className="font-medium">Featured Product</span>
          </label>

          <label className="flex items-center gap-2.5 text-sm text-slate-900 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.trending}
              onChange={(e) => setFormData((prev) => ({ ...prev, trending: e.target.checked }))}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600"
            />
            <span className="font-medium">Trending</span>
          </label>

          <label className="flex items-center gap-2.5 text-sm text-slate-900 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.new_arrival}
              onChange={(e) => setFormData((prev) => ({ ...prev, new_arrival: e.target.checked }))}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600"
            />
            <span className="font-medium">New Arrival</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          disabled={isSaving}
          className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving ? (
            <>
              <i className="fa-solid fa-spinner fa-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <i className="fa-solid fa-check mr-2" />
              {productId ? 'Update Product' : 'Create Product'}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
