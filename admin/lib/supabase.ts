import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['admin_users']['Insert']>;
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          category: string;
          price: number;
          stock_quantity: number;
          producer_id: string | null;
          image_url: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      customers: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone: string;
          address: string;
          city: string;
          country: string;
          status: string;
          total_orders: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['customers']['Insert']>;
      };
      producers: {
        Row: {
          id: string;
          email: string;
          company_name: string;
          contact_person: string;
          phone: string;
          address: string;
          city: string;
          country: string;
          status: string;
          verification_status: string;
          total_products: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['producers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['producers']['Insert']>;
      };
    };
  };
};
