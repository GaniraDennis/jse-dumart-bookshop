import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const setupDatabase = async () => {
  try {
    console.log('Creating products table...')
    const { error: productsError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS products (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          category VARCHAR(100),
          subcategory VARCHAR(100),
          brand VARCHAR(100),
          description TEXT,
          price NUMERIC(10, 2) NOT NULL,
          sale_price NUMERIC(10, 2),
          discount NUMERIC(5, 2) DEFAULT 0,
          in_stock BOOLEAN DEFAULT true,
          stock_quantity INTEGER DEFAULT 0,
          sku VARCHAR(100),
          image_url VARCHAR(500),
          rating NUMERIC(3, 2) DEFAULT 0,
          review_count INTEGER DEFAULT 0,
          tags TEXT[],
          featured BOOLEAN DEFAULT false,
          trending BOOLEAN DEFAULT false,
          new_arrival BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    })

    if (productsError) throw productsError
    console.log('Products table created successfully')

    console.log('Creating orders table...')
    const { error: ordersError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS orders (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES auth.users(id),
          order_number VARCHAR(50) NOT NULL UNIQUE,
          status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'delivered', 'cancelled')),
          payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('mpesa', 'cod')),
          mpesa_transaction_id VARCHAR(100),
          mpesa_phone VARCHAR(20),
          total_amount NUMERIC(10, 2) NOT NULL,
          delivery_fee NUMERIC(10, 2) DEFAULT 0,
          shipping_address JSONB,
          notes TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    })

    if (ordersError) throw ordersError
    console.log('Orders table created successfully')

    console.log('Database setup completed!')
  } catch (error) {
    console.error('Database setup error:', error)
    process.exit(1)
  }
}

setupDatabase()
