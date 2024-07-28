import { db, client } from '../db'
import { ProductType } from '@/types'

import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'
import { productsTable, ProductInsert } from './schemas/products'

const supabaseKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseKey) {
  throw new Error('Missing Supabase key')
}

const supabase = createClient(
  'https://mluiozpgwvyzpnbzfkwm.supabase.co',
  supabaseKey,
)

async function seed() {
  const { data: products } = await supabase
    .from('products')
    .select()
    .returns<ProductType[]>()

  const mappedProducts = products!.map(prod => {
    return {
      description: prod.description,
      code: prod.code,
      unitSize: prod.unit_size,
      category: prod.category,
      link: prod.link,
      rank: prod.rank,
      price: prod.price,
      cost: prod.cost,
      createdAt: new Date(prod.inserted_at),
      updatedAt: new Date(prod.updated_at),
    }
  })

  const res = await db.insert(productsTable).values(mappedProducts)
  console.log(res)
}
seed()
  .then(() => {
    client.end()
    console.log('success')
  })
  .catch(error => console.log(error))
