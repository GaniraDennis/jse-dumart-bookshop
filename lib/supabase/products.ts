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

// Mock product data for when Supabase is not configured
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'The Great Gatsby',
    slug: 'the-great-gatsby',
    category: 'Fiction',
    brand: 'Penguin Classics',
    description: 'A classic American novel by F. Scott Fitzgerald',
    price: 12.99,
    sale_price: 9.99,
    discount: 23,
    in_stock: true,
    stock_quantity: 50,
    image_url: 'https://images.unsplash.com/photo-1543002588-d83fb7f34b47?w=400&h=600&fit=crop',
    rating: 4.5,
    review_count: 128,
    featured: true,
    trending: false,
    new_arrival: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'To Kill a Mockingbird',
    slug: 'to-kill-a-mockingbird',
    category: 'Fiction',
    brand: 'Harper & Row',
    description: 'A gripping tale of racial injustice and childhood innocence',
    price: 14.99,
    sale_price: 11.99,
    discount: 20,
    in_stock: true,
    stock_quantity: 45,
    image_url: 'https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=400&h=600&fit=crop',
    rating: 4.7,
    review_count: 256,
    featured: true,
    trending: true,
    new_arrival: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: '1984',
    slug: '1984',
    category: 'Science Fiction',
    brand: 'Secker & Warburg',
    description: 'A dystopian social science fiction novel by George Orwell',
    price: 13.99,
    sale_price: 10.99,
    discount: 21,
    in_stock: true,
    stock_quantity: 30,
    image_url: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop',
    rating: 4.6,
    review_count: 342,
    featured: true,
    trending: true,
    new_arrival: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Pride and Prejudice',
    slug: 'pride-and-prejudice',
    category: 'Romance',
    brand: 'John Murray',
    description: 'A romantic novel of manners by Jane Austen',
    price: 11.99,
    sale_price: 9.49,
    discount: 21,
    in_stock: true,
    stock_quantity: 60,
    image_url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop',
    rating: 4.8,
    review_count: 189,
    featured: true,
    trending: false,
    new_arrival: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'The Catcher in the Rye',
    slug: 'the-catcher-in-the-rye',
    category: 'Fiction',
    brand: 'Little, Brown',
    description: 'A controversial novel about adolescent alienation and rebellion',
    price: 13.99,
    in_stock: true,
    stock_quantity: 25,
    image_url: 'https://images.unsplash.com/photo-1519995889033-1cd74a8bb6a9?w=400&h=600&fit=crop',
    rating: 4.2,
    review_count: 156,
    featured: true,
    trending: false,
    new_arrival: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'The Hobbit',
    slug: 'the-hobbit',
    category: 'Fantasy',
    brand: 'Allen & Unwin',
    description: 'A fantasy adventure of Bilbo Baggins',
    price: 15.99,
    sale_price: 12.99,
    discount: 19,
    in_stock: true,
    stock_quantity: 40,
    image_url: 'https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=400&h=600&fit=crop',
    rating: 4.7,
    review_count: 212,
    featured: true,
    trending: true,
    new_arrival: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export async function getProducts(options?: {
  category?: string
  limit?: number
  offset?: number
  featured?: boolean
  trending?: boolean
}) {
  // If Supabase is not configured, return mock data
  if (!supabase) {
    let filtered = [...mockProducts]

    if (options?.category) {
      filtered = filtered.filter(p => p.category === options.category)
    }

    if (options?.featured) {
      filtered = filtered.filter(p => p.featured)
    }

    if (options?.trending) {
      filtered = filtered.filter(p => p.trending)
    }

    const limit = options?.limit || 20
    const offset = options?.offset || 0
    
    return filtered.slice(offset, offset + limit)
  }

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
  if (!supabase) {
    const product = mockProducts.find(p => p.slug === slug)
    if (!product) throw new Error('Product not found')
    return product
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as Product
}

export async function searchProducts(query: string) {
  if (!supabase) {
    const searchTerm = query.toLowerCase()
    return mockProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description?.toLowerCase().includes(searchTerm)
    ).slice(0, 20)
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .limit(20)

  if (error) throw error
  return data as Product[]
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
  if (!supabase) {
    throw new Error('Cannot create product: Supabase not configured. Please add Supabase environment variables.')
  }

  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()

  if (error) throw error
  return data[0] as Product
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  if (!supabase) {
    throw new Error('Cannot update product: Supabase not configured. Please add Supabase environment variables.')
  }

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0] as Product
}

export async function deleteProduct(id: string) {
  if (!supabase) {
    throw new Error('Cannot delete product: Supabase not configured. Please add Supabase environment variables.')
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
}
