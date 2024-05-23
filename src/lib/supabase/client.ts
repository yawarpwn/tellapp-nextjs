import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    'https://mluiozpgwvyzpnbzfkwm.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
