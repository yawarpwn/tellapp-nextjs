import { db, client } from '../db'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'
import { usersTable } from './schemas'

const supabaseKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseKey) {
  throw new Error('Missing Supabase key')
}

const supabase = createClient(
  'https://mluiozpgwvyzpnbzfkwm.supabase.co',
  supabaseKey,
)

async function seed() {}
seed()
  .then(() => {
    client.end()
    console.log('success')
  })
  .catch(error => console.log(error))
