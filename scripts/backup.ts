import dotenv from 'dotenv'
import { TABLES } from '../src/constants'
dotenv.config()

import { createClient } from '@supabase/supabase-js'

const supabaseKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseKey) {
  throw new Error('Missing Supabase key')
}

const supabase = createClient(
  'https://mluiozpgwvyzpnbzfkwm.supabase.co',
  supabaseKey,
)

async function main() {
  const { data: quotations, error } = await supabase
    .from(TABLES.Quotations)
    .select('*')

  if (error) throw error
  console.log(quotations)
}

main().catch(err => console.log(err))
