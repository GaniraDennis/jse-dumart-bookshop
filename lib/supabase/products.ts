import { supabase } from './client'

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  subcategory?: string
  brand?: string
  description?: string
  price: number
  sale_price?: number
  discount?: number
  in_stock: boolean
  stock_quantity: number
  sku?: string
  image_url?: string
  rating?: number
  review_count?: number
  tags?: string[]
  featured?: boolean
  trending?: boolean
  new_arrival?: boolean
  created_at: string
  updated_at: string
}

export async function getProducts(options?: {
  category?: string
  limit?: number
  offset?: number
  featured?: boolean
  trending?: boolean
}) {
  let query = supabase.from('products').select('*')

  if (options?.category) {
    query = query.eq('category', options.category)
  }

  if (options?.featured) {
    query = query.eq('featured', true)
  }

  if (options?.trending) {
    query = query.eq('trending', true)
  }

  if (options?.offset) {
    query = query.range(options.offset, (options.offset + (options.limit || 20)) - 1)
  }

  const { data, error } = await query.limit(options?.limit || 20)

  if (error) throw error
  return data as Product[]
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as Product
}

export async function searchProducts(query: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .limit(20)

  if (error) throw error
  return data as Product[]
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()

  if (error) throw error
  return data[0] as Product
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0] as Product
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
}
