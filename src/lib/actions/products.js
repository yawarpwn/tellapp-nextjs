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
  description: z
    .string()
    .min(10, { message: 'Mínimo 10 caracteres' }),
  code: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(6, { message: 'Máximo  6 caracteres' }),
  price: z.coerce.number().gt(0, { message: 'Debe ser mayor a 0' }),
  cost: z.coerce.number().gt(0, { message: 'Debe ser mayor a 0' }),
  category: z.enum(categoriesArray),
  unit_size: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' }),
})

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

  const validatedFields = ProductSchema.safeParse(rawData)

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

export async function updateCustomerAction(formData) {
  const coookiesStore = cookies()
  const supabase = createServerActionClient({ cookies: () => coookiesStore })
  const name = formData.get('name')
  const ruc = formData.get('ruc')
  const address = formData.get('address')
  const id = formData.get('id')
  const phone = formData.get('phone')
  const email = formData.get('email')

  const customerToUpdate = {
    id,
    name,
    ruc,
    phone,
    email,
    address,
  }

  try {
    await updateRow({
      client: supabase,
      table: 'customers',
      row: customerToUpdate,
    })
    revalidatePath('/')
  } catch (error) {
    console.log('ERror updating Row', error)
    return {
      message: 'Error actualizando agencia',
      success: false,
    }
  }
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
