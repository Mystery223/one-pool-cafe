import { createClient } from '@supabase/supabase-js';

const defaultUrl = 'https://lkwibiwjkzttmbparjnc.supabase.co';
const defaultKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrd2liaXdqa3p0dG1icGFyam5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NjUzODIsImV4cCI6MjEwODM0MTM4Mn0.jcoH2WBVWbi6YzLZCCkHdoMw56RlIGi2bFTtUVzYDrk';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  is_featured: boolean;
  is_available: boolean;
  created_at: string;
};

export type Reservation = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  date: string;
  time: string;
  party_size: number;
  notes: string | null;
  status: string;
  created_at: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  created_at: string;
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};
