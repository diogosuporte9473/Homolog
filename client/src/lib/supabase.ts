import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Se as chaves não estiverem presentes, evitamos criar o cliente para não quebrar o site.
// No Vercel, você deve adicionar VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
