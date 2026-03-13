import { NextRequest, NextResponse } from 'next/server'
import { products, Product } from '@/lib/products-data'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category') || undefined
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const featured = searchParams.get('featured') === 'true'
    const trending = searchParams.get('trending') === 'true'

    let filtered = [...products]

    if (category) {
      filtered = filtered.filter(p => p.category === category)
    }

    if (featured) {
      filtered = filtered.filter(p => p.featured)
    }

    if (trending) {
      filtered = filtered.filter(p => p.trending)
    }

    const result = filtered.slice(offset, offset + limit)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
