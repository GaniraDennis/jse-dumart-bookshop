import { NextRequest, NextResponse } from 'next/server'
import { productStore } from '@/lib/product-store'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const product = productStore.getById(id)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const product = productStore.getById(id)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Validate required fields if they're being updated
    if (body.price !== undefined && body.price === null) {
      return NextResponse.json(
        { error: 'Price is required' },
        { status: 400 }
      )
    }

    const updates = {
      ...(body.name && { name: body.name }),
      ...(body.slug && { slug: body.slug }),
      ...(body.category && { category: body.category }),
      ...(body.brand !== undefined && { brand: body.brand }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.price !== undefined && { price: parseFloat(body.price) }),
      ...(body.sale_price !== undefined && { sale_price: body.sale_price ? parseFloat(body.sale_price) : undefined }),
      ...(body.discount !== undefined && { discount: body.discount ? parseInt(body.discount) : undefined }),
      ...(body.in_stock !== undefined && { in_stock: body.in_stock }),
      ...(body.stock_quantity !== undefined && { stock_quantity: parseInt(body.stock_quantity) }),
      ...(body.image_url !== undefined && { image_url: body.image_url }),
      ...(body.rating !== undefined && { rating: parseFloat(body.rating) }),
      ...(body.review_count !== undefined && { review_count: parseInt(body.review_count) }),
      ...(body.featured !== undefined && { featured: body.featured }),
      ...(body.trending !== undefined && { trending: body.trending }),
      ...(body.new_arrival !== undefined && { new_arrival: body.new_arrival }),
    }

    const updated = productStore.update(id, updates)

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const product = productStore.getById(id)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const deleted = productStore.delete(id)

    if (!deleted) {
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
