-- Seed sample products into the products table
-- This data represents typical JSEdumart products

INSERT INTO products (
  name, slug, category, subcategory, brand, description, price, sale_price, 
  discount, in_stock, stock_quantity, sku, image_url, rating, review_count,
  featured, trending, new_arrival
) VALUES

-- KLB Textbooks
('KLB Biology Form 4 (Student''s Book)', 'klb-biology-form-4', 'textbooks', 'science', 'KLB Publishers', 
 'Comprehensive biology textbook for form 4 students following KCSE curriculum', 850.00, 750.00, 12, true, 45, 'KLB-BIO-4', 
 'https://images.unsplash.com/photo-1507842955343-583cf8270f8f?w=400', 4.8, 23, true, true, false),

('KLB Mathematics Form 3 (Student''s Book)', 'klb-mathematics-form-3', 'textbooks', 'math', 'KLB Publishers',
 'Essential mathematics textbook with practice problems and solutions', 950.00, 850.00, 11, true, 38, 'KLB-MATH-3',
 'https://images.unsplash.com/photo-1565690741144-e42ca9abf11f?w=400', 4.7, 18, true, true, false),

('English Language Form 2 (Student''s Book)', 'english-language-form-2', 'textbooks', 'languages', 'EAEP',
 'Learn English grammar, literature and communication skills', 750.00, 650.00, 13, true, 52, 'ENG-LAN-2',
 'https://images.unsplash.com/photo-1507842955343-583cf8270f8f?w=400', 4.6, 15, false, true, false),

('Chemistry Form 4 (Complete Series)', 'chemistry-form-4-complete', 'textbooks', 'science', 'Paces Publishers',
 'Detailed chemistry course with experiments and theory', 1200.00, 1000.00, 17, true, 28, 'CHEM-4-SET',
 'https://images.unsplash.com/photo-1507842955343-583cf8270f8f?w=400', 4.9, 31, true, false, false),

-- Exercise Books
('Exercise Book A4 160 Pages', 'exercise-book-a4-160', 'exercise-books', 'general', 'Paper Mate',
 'High quality exercise book, 160 pages, A4 size', 120.00, null, 0, true, 200, 'EXB-A4-160',
 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 4.5, 12, false, false, false),

('Ruled Notebook 200 Pages Hardcover', 'ruled-notebook-200-hardcover', 'exercise-books', 'general', 'Local Paperwork',
 'Durable hardcover notebook, perfect for study notes', 280.00, 250.00, 11, true, 85, 'NOTEBOOK-HC-200',
 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 4.4, 8, false, false, true),

-- Stationery
('Ballpoint Pen Set (50 pcs)', 'ballpoint-pen-set-50', 'stationery', 'writing-supplies', 'Paper Mate',
 'Smooth writing ballpoint pens, bulk pack of 50', 450.00, 400.00, 11, true, 120, 'PEN-BP-50',
 'https://images.unsplash.com/photo-1599917753413-310f84c8fe92?w=400', 4.7, 19, true, false, false),

('Colored Pencil Set 24 Colors', 'colored-pencil-24-colors', 'stationery', 'art-supplies', 'Faber-Castell',
 'Professional quality colored pencils, 24 vibrant colors', 850.00, null, 0, true, 60, 'CP-24-FC',
 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400', 4.8, 28, false, true, false),

('Correction Tape 10 Pack', 'correction-tape-10-pack', 'stationery', 'correction-supplies', 'Tombow',
 'Easy-to-use correction tape, 10 pieces per pack', 220.00, 190.00, 14, true, 150, 'TAPE-CORR-10',
 'https://images.unsplash.com/photo-1599917753413-310f84c8fe92?w=400', 4.3, 7, false, false, false),

-- Art Supplies
('Crayola Crayon Set 64 Colors', 'crayola-crayon-64-colors', 'art-supplies', 'drawing', 'Crayola',
 'Classic Crayola crayons, bright and vibrant colors', 650.00, 580.00, 11, true, 95, 'CRAY-64',
 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400', 4.6, 14, false, false, false),

('Acrylic Paint Set 24ml x 12 Colors', 'acrylic-paint-24-colors', 'art-supplies', 'painting', 'Pelikan',
 'Smooth acrylic paints, perfect for canvas and paper', 1200.00, 1050.00, 13, true, 40, 'PAINT-ACR-12',
 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400', 4.9, 22, false, true, true),

-- School Supplies
('Student Backpack Ergonomic Design', 'student-backpack-ergonomic', 'school-supplies', 'bags', 'School Comfort',
 'Comfortable and durable backpack with padded straps', 2500.00, 2200.00, 12, true, 30, 'BAG-ERG-BLU',
 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 4.8, 35, true, true, false),

('Scientific Calculator FX-991', 'scientific-calculator-fx-991', 'school-supplies', 'calculators', 'Casio',
 'Advanced scientific calculator for mathematics and physics', 3500.00, 3100.00, 11, true, 25, 'CALC-SCI-FX',
 'https://images.unsplash.com/photo-1587825589049-81a2e21b9d93?w=400', 4.9, 42, true, false, false),

('Geometry Set Compass & Ruler', 'geometry-set-compass-ruler', 'school-supplies', 'math-tools', 'Staedtler',
 'Complete geometry set with compass, protractor and rulers', 450.00, 390.00, 13, true, 70, 'GEO-SET-STD',
 'https://images.unsplash.com/photo-1599917753413-310f84c8fe92?w=400', 4.4, 11, false, false, false),

-- Revision Materials
('KCSE Past Papers Bundle 2020-2023', 'kcse-past-papers-bundle', 'revision', 'exam-papers', 'JSEdumart',
 'Complete collection of KCSE past papers with answers', 1800.00, 1500.00, 17, true, 50, 'KCSE-PP-20-23',
 'https://images.unsplash.com/photo-1507842955343-583cf8270f8f?w=400', 4.9, 56, true, true, false),

('Biology Revision Guide Form 4', 'biology-revision-form-4', 'revision', 'subject-guides', 'JSEdumart Academy',
 'Comprehensive biology revision guide with key concepts and practice questions', 650.00, 550.00, 15, true, 65, 'BIO-REV-4',
 'https://images.unsplash.com/photo-1507842955343-583cf8270f8f?w=400', 4.7, 28, false, true, true),

('Mathematics Formulae Sheet Laminated', 'math-formulae-sheet-laminated', 'revision', 'reference-materials', 'JSEdumart Academy',
 'Essential math formulas on durable laminated sheet', 280.00, 240.00, 14, true, 120, 'MATH-FORM-LAM',
 'https://images.unsplash.com/photo-1565690741144-e42ca9abf11f?w=400', 4.5, 18, false, false, false);
