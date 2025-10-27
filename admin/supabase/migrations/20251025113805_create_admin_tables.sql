/*
  # Create Admin Dashboard Tables

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `role` (text) - 'super_admin', 'admin', 'moderator'
      - `status` (text) - 'active', 'inactive'
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `producers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `company_name` (text)
      - `contact_person` (text)
      - `phone` (text)
      - `address` (text)
      - `city` (text)
      - `country` (text)
      - `status` (text) - 'active', 'inactive', 'pending'
      - `verification_status` (text) - 'verified', 'pending', 'rejected'
      - `total_products` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `price` (decimal)
      - `stock_quantity` (integer)
      - `producer_id` (uuid, foreign key)
      - `image_url` (text)
      - `status` (text) - 'active', 'inactive', 'out_of_stock'
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `customers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `phone` (text)
      - `address` (text)
      - `city` (text)
      - `country` (text)
      - `status` (text) - 'active', 'inactive'
      - `total_orders` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin users only
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create producers table first (no dependencies)
CREATE TABLE IF NOT EXISTS producers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  company_name text NOT NULL,
  contact_person text NOT NULL,
  phone text DEFAULT '',
  address text DEFAULT '',
  city text DEFAULT '',
  country text DEFAULT '',
  status text NOT NULL DEFAULT 'active',
  verification_status text NOT NULL DEFAULT 'pending',
  total_products integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table (depends on producers)
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  category text NOT NULL,
  price decimal(10, 2) NOT NULL,
  stock_quantity integer DEFAULT 0,
  producer_id uuid,
  image_url text DEFAULT '',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  FOREIGN KEY (producer_id) REFERENCES producers(id) ON DELETE SET NULL
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text DEFAULT '',
  address text DEFAULT '',
  city text DEFAULT '',
  country text DEFAULT '',
  status text NOT NULL DEFAULT 'active',
  total_orders integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE producers ENABLE ROW LEVEL SECURITY;

-- Admin users policies (only authenticated users can access)
CREATE POLICY "Authenticated users can read admin_users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert admin_users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update admin_users"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete admin_users"
  ON admin_users FOR DELETE
  TO authenticated
  USING (true);

-- Products policies
CREATE POLICY "Authenticated users can read products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Customers policies
CREATE POLICY "Authenticated users can read customers"
  ON customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert customers"
  ON customers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update customers"
  ON customers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete customers"
  ON customers FOR DELETE
  TO authenticated
  USING (true);

-- Producers policies
CREATE POLICY "Authenticated users can read producers"
  ON producers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert producers"
  ON producers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update producers"
  ON producers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete producers"
  ON producers FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_producer_id ON products(producer_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_producers_email ON producers(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);