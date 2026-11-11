/*
# Caffe JDM - Initial Schema

## Overview
Creates the database schema for Caffe JDM, a startup cafe website. This is a single-tenant (no auth) application: all visitors share the public data.

## New Tables

1. `menu_items` — Coffee, food, and beverage offerings
   - `id` (uuid, primary key)
   - `name` (text, not null)
   - `description` (text)
   - `price` (numeric, not null)
   - `category` (text, not null) — e.g. 'coffee', 'non-coffee', 'food', 'pastry'
   - `image_url` (text)
   - `is_featured` (boolean, default false)
   - `is_available` (boolean, default true)
   - `created_at` (timestamptz, default now())

2. `reservations` — Table booking requests from customers
   - `id` (uuid, primary key)
   - `name` (text, not null)
   - `email` (text, not null)
   - `phone` (text)
   - `date` (date, not null)
   - `time` (time, not null)
   - `party_size` (integer, not null, default 2)
   - `notes` (text)
   - `status` (text, default 'pending') — pending, confirmed, cancelled
   - `created_at` (timestamptz, default now())

3. `newsletter_subscribers` — Email signup for marketing/newsletter
   - `id` (uuid, primary key)
   - `email` (text, unique, not null)
   - `created_at` (timestamptz, default now())

4. `reviews` — Customer reviews and testimonials
   - `id` (uuid, primary key)
   - `name` (text, not null)
   - `rating` (integer, not null, 1–5)
   - `comment` (text, not null)
   - `is_approved` (boolean, default false)
   - `created_at` (timestamptz, default now())

## Security
- RLS enabled on all tables.
- Grants: `anon, authenticated` for menu_items (SELECT) and reviews (SELECT where approved) and newsletter_subscribers (INSERT only).
- Reservations: anon + authenticated can INSERT (public booking form); SELECT/UPDATE/DELETE restricted to service_role for staff management.
- All policies documented as intentionally public where applicable.
*/

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL,
  category text NOT NULL,
  image_url text,
  is_featured boolean NOT NULL DEFAULT false,
  is_available boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON menu_items TO anon, authenticated;

DROP POLICY IF EXISTS "public_read_menu_items" ON menu_items;
CREATE POLICY "public_read_menu_items" ON menu_items FOR SELECT
  TO anon, authenticated USING (true);

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  date date NOT NULL,
  time time NOT NULL,
  party_size integer NOT NULL DEFAULT 2,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON reservations TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON reservations TO service_role;

DROP POLICY IF EXISTS "public_insert_reservations" ON reservations;
CREATE POLICY "public_insert_reservations" ON reservations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON newsletter_subscribers TO anon, authenticated;
GRANT SELECT ON newsletter_subscribers TO service_role;

DROP POLICY IF EXISTS "public_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "public_insert_newsletter" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON reviews TO anon, authenticated;
GRANT INSERT ON reviews TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON reviews TO service_role;

DROP POLICY IF EXISTS "public_read_approved_reviews" ON reviews;
CREATE POLICY "public_read_approved_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (is_approved = true);

DROP POLICY IF EXISTS "public_insert_reviews" ON reviews;
CREATE POLICY "public_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Seed menu items
INSERT INTO menu_items (name, description, price, category, image_url, is_featured) VALUES
  ('JDM Signature Espresso', 'Double shot of our house blend — bold, smooth, with notes of chocolate and caramel', 28000, 'coffee', 'https://images.pexels.com/photos/6747870/pexels-photo-6747870.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', true),
  ('Cappuccino Classico', 'Rich espresso topped with velvety steamed milk and microfoam art', 35000, 'coffee', 'https://images.pexels.com/photos/31139336/pexels-photo-31139336.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', true),
  ('Caffè Latte', 'Smooth espresso blended with steamed milk and a light layer of foam', 38000, 'coffee', 'https://images.pexels.com/photos/39537967/pexels-photo-39537967.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', true),
  ('Cold Brew', 'Slow-steeped 18 hours for a smooth, low-acid, naturally sweet coffee', 40000, 'coffee', 'https://images.pexels.com/photos/4913342/pexels-photo-4913342.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', false),
  ('Matcha Latte', 'Premium ceremonial matcha whisked with steamed milk', 42000, 'non-coffee', NULL, false),
  ('Hot Chocolate', 'Rich Belgian cocoa melted into steamed milk', 35000, 'non-coffee', NULL, false),
  ('Butter Croissant', 'Flaky, buttery, baked fresh every morning', 25000, 'pastry', 'https://images.pexels.com/photos/30853716/pexels-photo-30853716.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', true),
  ('Strawberry Cream Croissant', 'Buttery croissant filled with fresh cream and strawberries', 38000, 'pastry', 'https://images.pexels.com/photos/32300842/pexels-photo-32300842.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', false),
  ('Avocado Toast', 'Smashed avocado on sourdough with chili flakes and lime', 45000, 'food', NULL, false),
  ('Chicken Pesto Panini', 'Grilled chicken, mozzarella, basil pesto on ciabatta', 48000, 'food', NULL, false)
ON CONFLICT DO NOTHING;

-- Seed approved reviews
INSERT INTO reviews (name, rating, comment, is_approved) VALUES
  ('Sarah Wijaya', 5, 'The best coffee in town! The atmosphere is so cozy and the baristas really know their craft. The JDM Signature Espresso is a must-try.', true),
  ('Michael Tan', 5, 'Came here every morning during my visit. The croissants are baked fresh and the cappuccino art is beautiful. Highly recommend!', true),
  ('Linda Hartono', 4, 'Lovely place to work remotely. Great coffee, fast WiFi, and comfortable seating. The matcha latte is fantastic.', true),
  ('David Pratama', 5, 'JDM has become my go-to spot. The cold brew is incredibly smooth and the staff are always friendly. Feels like a second home.', true)
ON CONFLICT DO NOTHING;
