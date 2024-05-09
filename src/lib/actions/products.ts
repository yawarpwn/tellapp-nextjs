'use server'

import { TABLES } from '@/constants'
import { createServerClient } from '@/lib/supabase'
import { ProductCreateType, ProductId, ProductUpdateType } from '@/types'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createProductAction(productToInsert: ProductCreateType) {
  console.log('create', productToInsert)
  // Insert to Database
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { error } = await supabase.from(TABLES.Products).insert(productToInsert)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/new-products', 'page')
}

export async function updateProductAction(
  id: ProductId,
  productToUpdate: ProductUpdateType,
) {
  console.log('update', productToUpdate)

  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { error } = await supabase
    .from(TABLES.Products)
    .update({
      ...productToUpdate,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    console.log(error)
    throw new Error(error.message)
  }

  revalidatePath('/new-products')
}

export async function deleteProductAction(id: number): Promise<void> {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  // delete data in database
  const { error } = await supabase.from(TABLES.Products).delete().eq('id', id)

  if (error) {
    console.log(error)
    throw new Error(error.message)
  }

  revalidatePath('/new-products')
}
