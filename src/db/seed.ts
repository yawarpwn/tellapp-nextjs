import { db, client } from '../db'
import { agenciesTable } from './schemas'

import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'

const supabaseKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseKey) {
  throw new Error('Missing Supabase key')
}

const supabase = createClient('https://mluiozpgwvyzpnbzfkwm.supabase.co', supabaseKey)

async function seed() {
  const { data: agencies, error } = await supabase.from('agencies').select()
  const mappedAgencies = agencies!.map(a => ({
    id: a.id,
    name: a.company,
    ruc: a.ruc,
    address: a.address,
    phone: a.phone,
    createdAt: new Date(a.created_at),
    updatedAt: new Date(a.updated_at),
  }))

  try {
    await db.insert(agenciesTable).values(mappedAgencies)
    console.log('success seed agencies')
  } catch (error) {
    console.log(error)
  }
}
seed()
