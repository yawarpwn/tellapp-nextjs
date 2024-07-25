import { createBrowserClient as createBrowserClientSupabase } from '@supabase/ssr'

export const createBrowserClient = () =>
  createBrowserClientSupabase(
    'https://mluiozpgwvyzpnbzfkwm.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
