-- Create products table
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

-- Create orders table
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

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL,
  product_name VARCHAR(255),
  product_image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_trending ON products(trending);
CREATE INDEX IF NOT EXISTS idx_products_new_arrival ON products(new_arrival);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_mpesa_transaction_id ON orders(mpesa_transaction_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products table
-- Allow all users to read products
CREATE POLICY "Allow all users to read products" ON products
  FOR SELECT USING (true);

-- Allow only authenticated admin users to insert products
CREATE POLICY "Allow authenticated users to insert products" ON products
  FOR INSERT WITH CHECK (
    auth.jwt() ->> 'user_role' = 'admin' OR 
    auth.jwt() ->> 'email' LIKE '%@admin%'
  );

-- Allow only authenticated admin users to update products
CREATE POLICY "Allow authenticated users to update products" ON products
  FOR UPDATE USING (
    auth.jwt() ->> 'user_role' = 'admin' OR 
    auth.jwt() ->> 'email' LIKE '%@admin%'
  );

-- Allow only authenticated admin users to delete products
CREATE POLICY "Allow authenticated users to delete products" ON products
  FOR DELETE USING (
    auth.jwt() ->> 'user_role' = 'admin' OR 
    auth.jwt() ->> 'email' LIKE '%@admin%'
  );

-- RLS Policies for orders table
-- Allow users to read their own orders
CREATE POLICY "Allow users to read own orders" ON orders
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.jwt() ->> 'user_role' = 'admin'
  );

-- Allow authenticated users to create orders
CREATE POLICY "Allow users to create orders" ON orders
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
  );

-- Allow users to update their own orders (limited fields)
CREATE POLICY "Allow users to update own orders" ON orders
  FOR UPDATE USING (
    auth.uid() = user_id OR
    auth.jwt() ->> 'user_role' = 'admin'
  );

-- RLS Policies for order_items table
-- Allow access through orders
CREATE POLICY "Allow users to read order items for their orders" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.user_id = auth.uid() OR auth.jwt() ->> 'user_role' = 'admin')
    )
  );

CREATE POLICY "Allow users to insert order items for their orders" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER products_update_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER orders_update_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
