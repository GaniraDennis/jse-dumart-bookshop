import { NextRequest, NextResponse } from 'next/server'
import { productStore } from '@/lib/product-store'
import type { Product } from '@/lib/products-data'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category') || undefined
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const featured = searchParams.get('featured') === 'true'
    const trending = searchParams.get('trending') === 'true'
    const search = searchParams.get('search') || undefined

    const result = productStore.getFiltered({
      category,
      limit,
      offset,
      featured,
      trending,
      search,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.category || !body.price || body.description === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category, price, description' },
        { status: 400 }
      )
    }

    const productData = {
      name: body.name,
      slug: body.slug || productStore.generateSlug(body.name),
      category: body.category,
      brand: body.brand || '',
      description: body.description,
      price: parseFloat(body.price),
      sale_price: body.sale_price ? parseFloat(body.sale_price) : undefined,
      discount: body.discount ? parseInt(body.discount) : undefined,
      in_stock: body.in_stock !== false,
      stock_quantity: parseInt(body.stock_quantity) || 0,
      image_url: body.image_url || 'https://images.unsplash.com/photo-1543002588-d83fb7f34b47?w=400&h=600&fit=crop',
      rating: parseFloat(body.rating) || 0,
      review_count: parseInt(body.review_count) || 0,
      featured: body.featured || false,
      trending: body.trending || false,
      new_arrival: body.new_arrival || false,
    }

    const product = productStore.create(productData)

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
