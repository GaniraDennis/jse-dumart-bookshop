import { products as initialProducts, Product } from './products-data'

// In-memory product store with localStorage persistence
class ProductStore {
  private products: Map<string, Product> = new Map()

  constructor() {
    this.initializeFromStorage()
  }

  private initializeFromStorage() {
    // Try to load from localStorage first
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('jsdumart_products')
        if (stored) {
          const parsed = JSON.parse(stored)
          parsed.forEach((p: Product) => this.products.set(p.id, p))
          return
        }
      } catch (e) {
        console.error('Failed to load products from localStorage:', e)
      }
    }

    // Fall back to initial products
    initialProducts.forEach((p) => this.products.set(p.id, p))
    this.persistToStorage()
  }

  private persistToStorage() {
    if (typeof window !== 'undefined') {
      try {
        const data = Array.from(this.products.values())
        localStorage.setItem('jsdumart_products', JSON.stringify(data))
      } catch (e) {
        console.error('Failed to persist products to localStorage:', e)
      }
    }
  }

  getAll(): Product[] {
    return Array.from(this.products.values())
  }

  getById(id: string): Product | undefined {
    return this.products.get(id)
  }

  getBySlug(slug: string): Product | undefined {
    return Array.from(this.products.values()).find((p) => p.slug === slug)
  }

  getFiltered(options: {
    category?: string
    featured?: boolean
    trending?: boolean
    search?: string
    limit?: number
    offset?: number
  }): Product[] {
    let filtered = this.getAll()

    if (options.category) {
      filtered = filtered.filter((p) => p.category === options.category)
    }

    if (options.featured) {
      filtered = filtered.filter((p) => p.featured)
    }

    if (options.trending) {
      filtered = filtered.filter((p) => p.trending)
    }

    if (options.search) {
      const search = options.search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search)
      )
    }

    const offset = options.offset || 0
    const limit = options.limit || 20

    return filtered.slice(offset, offset + limit)
  }

  create(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Product {
    const id = 'p-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
    const now = new Date().toISOString()

    const newProduct: Product = {
      ...product,
      id,
      created_at: now,
      updated_at: now,
    }

    this.products.set(id, newProduct)
    this.persistToStorage()
    return newProduct
  }

  update(id: string, updates: Partial<Product>): Product {
    const product = this.products.get(id)
    if (!product) {
      throw new Error('Product not found')
    }

    const updated: Product = {
      ...product,
      ...updates,
      id: product.id,
      created_at: product.created_at,
      updated_at: new Date().toISOString(),
    }

    this.products.set(id, updated)
    this.persistToStorage()
    return updated
  }

  delete(id: string): boolean {
    const deleted = this.products.delete(id)
    if (deleted) {
      this.persistToStorage()
    }
    return deleted
  }

  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }
}

// Export singleton instance
export const productStore = new ProductStore()
