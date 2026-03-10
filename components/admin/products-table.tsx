'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product } from '@/lib/supabase/products'
import { Button } from '@/components/ui/button'

interface ProductsTableProps {
  products: Product[]
  onDelete?: (id: string) => void
}

interface DeleteConfirmation {
  isOpen: boolean
  productId: string | null
  productName: string | null
}

export function ProductsTable({ products, onDelete }: ProductsTableProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmation>({
    isOpen: false,
    productId: null,
    productName: null,
  })
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteConfirm({
      isOpen: true,
      productId: id,
      productName: name,
    })
  }

  const handleConfirmDelete = async () => {
    if (!deleteConfirm.productId) return
    
    setIsDeleting(true)
    try {
      await onDelete?.(deleteConfirm.productId)
    } finally {
      setIsDeleting(false)
      setDeleteConfirm({ isOpen: false, productId: null, productName: null })
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Product</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Category</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-900">Price</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-900">Stock</th>
              <th className="px-6 py-3 text-center font-semibold text-gray-900">Featured</th>
              <th className="px-6 py-3 text-center font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sku}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-700">{product.category}</td>
              <td className="px-6 py-4 text-right">
                <span className="font-medium text-gray-900">KES {product.price.toFixed(2)}</span>
                {product.sale_price && (
                  <p className="text-xs text-red-600">Sale: KES {product.sale_price.toFixed(2)}</p>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <span className={product.in_stock ? 'text-green-600' : 'text-red-600'}>
                  {product.stock_quantity}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                {product.featured ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                    ★
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {hoveredId === product.id && (
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/products/${product.id}`}>
                      <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                        <i className="fa-solid fa-pencil text-sm mr-1"></i>
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(product.id, product.name)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <i className="fa-solid fa-trash-can text-sm mr-1"></i>
                      Delete
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Delete Confirmation Modal */}
    {deleteConfirm.isOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <i className="fa-solid fa-trash-can text-red-600"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Delete Product</h3>
          </div>
          
          <p className="text-gray-600 mb-2">Are you sure you want to delete this product?</p>
          <p className="text-sm font-medium text-gray-900 mb-6">
            <strong>{deleteConfirm.productName}</strong> will be permanently removed.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setDeleteConfirm({ isOpen: false, productId: null, productName: null })}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Deleting...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-trash-can"></i>
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  )
}
