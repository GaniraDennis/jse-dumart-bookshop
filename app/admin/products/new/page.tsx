'use client'

import { ProductForm } from '@/components/admin/product-form'

export default function NewProductPage() {
  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Create New Product</h1>
        <p className="mt-1 text-sm text-slate-600">Add a new product to your inventory</p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-4xl">
          <ProductForm />
        </div>
      </div>
    </div>
  )
}
