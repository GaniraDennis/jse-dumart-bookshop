import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const products = [
  {
    name: "Crayons Veda",
    slug: "crayons-veda",
    category: "art-supplies",
    brand: "Veda",
    description: "Colorful wax crayons for art and craft projects",
    price: 80,
    in_stock: true,
    stock_quantity: 50,
    sku: "CRAY-001",
    image_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop",
    rating: 4.5,
    review_count: 12,
    featured: true,
  },
  {
    name: "Crayons Veda (Large Pack)",
    slug: "crayons-veda-large",
    category: "art-supplies",
    brand: "Veda",
    description: "Large pack of colorful wax crayons with more colors",
    price: 100,
    in_stock: true,
    stock_quantity: 35,
    sku: "CRAY-002",
    image_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop",
    rating: 4.7,
    review_count: 18,
    featured: true,
  },
  {
    name: "Ream Paper",
    slug: "ream-paper",
    category: "stationery",
    brand: "Generic",
    description: "High quality A4 ream paper for printing and writing",
    price: 750,
    in_stock: true,
    stock_quantity: 20,
    sku: "PAPER-001",
    image_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=500&fit=crop",
    rating: 4.6,
    review_count: 24,
    trending: true,
  },
  {
    name: "Mathematical Tables",
    slug: "mathematical-tables",
    category: "revision",
    brand: "Educational",
    description: "Essential mathematical tables and formulas for students",
    price: 250,
    in_stock: true,
    stock_quantity: 40,
    sku: "MATH-001",
    image_url: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop",
    rating: 4.8,
    review_count: 35,
    featured: true,
  },
  {
    name: "Office Glue",
    slug: "office-glue",
    category: "stationery",
    brand: "Astra",
    description: "Strong adhesive glue for paper and card bonding",
    price: 50,
    in_stock: true,
    stock_quantity: 100,
    sku: "GLUE-001",
    image_url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop",
    rating: 4.4,
    review_count: 8,
  },
  {
    name: "Pens",
    slug: "pens",
    category: "stationery",
    brand: "Bic",
    description: "Smooth writing ballpoint pens in various colors",
    price: 10,
    in_stock: true,
    stock_quantity: 200,
    sku: "PEN-001",
    image_url: "https://images.unsplash.com/photo-1578502494516-69c3a8b61fa1?w=500&h=500&fit=crop",
    rating: 4.3,
    review_count: 45,
  },
  {
    name: "Luminous Paper",
    slug: "luminous-paper",
    category: "art-supplies",
    brand: "Generic",
    description: "Special luminous paper that glows in the dark",
    price: 50,
    in_stock: true,
    stock_quantity: 30,
    sku: "PAPER-002",
    image_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=500&fit=crop",
    rating: 4.5,
    review_count: 14,
    new_arrival: true,
  },
  {
    name: "Sound and Read",
    slug: "sound-and-read",
    category: "textbooks",
    brand: "Educational",
    description: "Interactive educational book with sound features",
    price: 250,
    in_stock: true,
    stock_quantity: 25,
    sku: "BOOK-001",
    image_url: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop",
    rating: 4.6,
    review_count: 20,
  },
  {
    name: "Water Colour",
    slug: "water-colour",
    category: "art-supplies",
    brand: "Artist",
    description: "Professional quality water color paints for artists",
    price: 80,
    in_stock: true,
    stock_quantity: 40,
    sku: "PAINT-001",
    image_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop",
    rating: 4.7,
    review_count: 16,
  },
  {
    name: "Sharpeners",
    slug: "sharpeners",
    category: "stationery",
    brand: "Generic",
    description: "Durable pencil sharpeners with metal blades",
    price: 10,
    in_stock: true,
    stock_quantity: 150,
    sku: "SHARP-001",
    image_url: "https://images.unsplash.com/photo-1577720643272-265f434a6e7f?w=500&h=500&fit=crop",
    rating: 4.2,
    review_count: 12,
  },
  {
    name: "Erasers",
    slug: "erasers",
    category: "stationery",
    brand: "Staedtler",
    description: "Soft erasers that leave no marks on paper",
    price: 10,
    in_stock: true,
    stock_quantity: 180,
    sku: "ERASE-001",
    image_url: "https://images.unsplash.com/photo-1577720643272-265f434a6e7f?w=500&h=500&fit=crop",
    rating: 4.4,
    review_count: 18,
  },
  {
    name: "Manila Paper",
    slug: "manila-paper",
    category: "stationery",
    brand: "Generic",
    description: "Brown manila papers for packaging and filing",
    price: 20,
    in_stock: true,
    stock_quantity: 80,
    sku: "PAPER-003",
    image_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=500&fit=crop",
    rating: 4.3,
    review_count: 10,
  },
  {
    name: "Helix Oxford Mathematical Set",
    slug: "helix-oxford-mathematical-set",
    category: "school-supplies",
    brand: "Helix",
    description: "Complete mathematical set with compass, ruler, and protractor",
    price: 350,
    in_stock: true,
    stock_quantity: 35,
    sku: "MATH-002",
    image_url: "https://images.unsplash.com/photo-1577720643272-265f434a6e7f?w=500&h=500&fit=crop",
    rating: 4.8,
    review_count: 28,
    featured: true,
  },
  {
    name: "Spring File",
    slug: "spring-file",
    category: "school-supplies",
    brand: "Generic",
    description: "Metal spring file for organizing and storing documents",
    price: 50,
    in_stock: true,
    stock_quantity: 60,
    sku: "FILE-001",
    image_url: "https://images.unsplash.com/photo-1577720643272-265f434a6e7f?w=500&h=500&fit=crop",
    rating: 4.5,
    review_count: 14,
  },
  {
    name: "Cellotape",
    slug: "cellotape",
    category: "stationery",
    brand: "Scotch",
    description: "Clear adhesive tape for general purposes",
    price: 50,
    in_stock: true,
    stock_quantity: 120,
    sku: "TAPE-001",
    image_url: "https://images.unsplash.com/photo-1577720643272-265f434a6e7f?w=500&h=500&fit=crop",
    rating: 4.5,
    review_count: 22,
  },
  {
    name: "HB Pencils",
    slug: "hb-pencils",
    category: "stationery",
    brand: "Staedtler",
    description: "Standard HB pencils for writing and sketching",
    price: 180,
    in_stock: true,
    stock_quantity: 70,
    sku: "PENCIL-001",
    image_url: "https://images.unsplash.com/photo-1578502494516-69c3a8b61fa1?w=500&h=500&fit=crop",
    rating: 4.6,
    review_count: 25,
    trending: true,
  },
];

async function seedProducts() {
  console.log("[v0] Starting product seeding...");
  
  try {
    // First, delete existing products to avoid duplicates
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    
    if (deleteError && deleteError.code !== "PGRST116") {
      console.error("[v0] Error deleting existing products:", deleteError);
    }

    // Insert new products
    const { data, error } = await supabase
      .from("products")
      .insert(products)
      .select();

    if (error) {
      console.error("[v0] Error seeding products:", error);
      process.exit(1);
    }

    console.log(`[v0] Successfully seeded ${data.length} products!`);
    console.log("[v0] Products:", data.map((p) => `${p.name} - KSh ${p.price}`));
  } catch (error) {
    console.error("[v0] Seeding failed:", error);
    process.exit(1);
  }
}

seedProducts();
