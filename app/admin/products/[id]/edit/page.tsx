'use client'

import { useEffect } from 'react'
import { ProductForm } from '@/components/admin/product-form'

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = Promise.resolve(params)
  
  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Edit Product</h1>
        <p className="mt-1 text-sm text-slate-600">Update product information</p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-4xl">
          <EditProductForm resolvedParams={resolvedParams} />
        </div>
      </div>
    </div>
  )
}

function EditProductForm({ resolvedParams }: { resolvedParams: Promise<{ id: string }> }) {
  const [id, setId] = React.useState<string | null>(null)

  React.useEffect(() => {
    resolvedParams.then((params) => setId(params.id))
  }, [resolvedParams])

  if (!id) {
    return (
      <div className="flex items-center justify-center py-12">
        <i className="fa-solid fa-spinner fa-spin text-2xl text-slate-400" />
      </div>
    )
  }

  return <ProductForm productId={id} />
}

import React from 'react'
