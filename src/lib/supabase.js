import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// The site runs in "preview mode" with sample content until
// the Supabase details are added to the .env file.
export const supabase = url && key ? createClient(url, key) : null
export const isConfigured = Boolean(supabase)
