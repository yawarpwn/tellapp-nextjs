'use server'

import z from 'zod'
// import { createClient } from '@supabase/supabase-js'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { deleteRow, insertRow, updateRow } from '@/services/supabase'
import { CATEGORIES } from '@/constants'
const categoriesArray = Object.values(CATEGORIES)

const ProductSchema = z.object({
  id: z.string(),
  description: z
    .string()
    .min(10, { message: 'Mínimo 10 caracteres' }),
  code: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(10, { message: 'Máximo  6 caracteres' }),
  price: z.coerce.number().gt(0, { message: 'Debe ser mayor a 0' }),
  cost: z.coerce.number().gt(0, { message: 'Debe ser mayor a 0' }),
  category: z.enum(categoriesArray),
  unit_size: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' }),
})

// Create Product 
const CreateProduct = ProductSchema.omit({ id: true })
export async function createProduct(_, formData) {
  const coookiesStore = cookies()
  const supabase = createServerActionClient({ cookies: () => coookiesStore })
  const rawData = {
    description: formData.get('description'),
    code: formData.get('code'),
    price: formData.get('price'),
    cost: formData.get('cost'),
    category: formData.get('category'),
    unit_size: formData.get('unit_size'),
  }

  console.log({ rawData })

  const validatedFields = CreateProduct.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    }
  }

  try {
    await insertRow({
      table: 'products',
      row: validatedFields.data,
      client: supabase,
    })
  } catch (error) {
    console.log('Error inserting Row', error)
    return {
      message: 'Database Error: Failed to create customer',
    }
  }

  revalidatePath('/products')
  redirect('/products')
}

// Update Product 
const UpdateProduct = ProductSchema
export async function updateProduct(_, formData) {
  const coookiesStore = cookies()
  const supabase = createServerActionClient({ cookies: () => coookiesStore })
  const rawData = {
    id: formData.get('id'),
    description: formData.get('description'),
    code: formData.get('code'),
    price: formData.get('price'),
    cost: formData.get('cost'),
    category: formData.get('category'),
    unit_size: formData.get('unit_size'),
  }

  console.log({ rawData })

  const validatedFields = UpdateProduct.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to UPdate Product.',
    }
  }

  try {
    await updateRow({
      table: 'products',
      row: validatedFields.data,
      client: supabase,
    })
  } catch (error) {
    console.log('Error inserting Row', error)
    return {
      message: 'Database Error: Failed to update product',
    }
  }

  revalidatePath('/products')
  redirect('/products')
}

export async function deleteProduct(_, formData) {
  const coookiesStore = cookies()
  const supabase = createServerActionClient({ cookies: () => coookiesStore })
  const id = formData.get('id')
  try {
    await deleteRow({ table: 'products', client: supabase, id })
    revalidatePath('/products')
    return {
      message: 'Cliente eliminado',
    }
  } catch (error) {
    return {
      message: 'Error eliminando cliente',
    }
  }
}
