'use server'

import z from 'zod'
// import { createClient } from '@supabase/supabase-js'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { deleteRow, insertRow, updateRow } from '@/services/supabase'

const CustomerSchema = z.object({
  name: z
    .string()
    .min(10, { message: 'El nombre debe tener al menos 10 caracteres' }),
  ruc: z.coerce
    .string()
    .length(11, { message: 'El ruc debe tener al menos 11 caracteres' }),
  address: z
    .string()
    .min(10, { message: 'La dirección debe tener al menos 10 caracteres' })
    .nullable(),
  phone: z.coerce.string().length(9, {
    message: 'El telefono debe tener 9 caracteres',
  }).nullable(),
  email: z.string().email({
    message: 'El correo no es valido',
  }).nullable(),
})

const coookiesStore = cookies()
const supabase = createServerActionClient({ cookies: () => coookiesStore })

export async function createCustomer(_, formData) {
  const rawData = {
    name: formData.get('name'),
    ruc: formData.get('ruc'),
    address: formData.get('address') || null,
    phone: formData.get('phone') || null,
    email: formData.get('email') || null,
  }

  console.log({ rawData })

  const validatedFields = CustomerSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    }
  }

  try {
    await insertRow({
      table: 'customers',
      row: validatedFields.data,
      client: supabase,
    })
  } catch (error) {
    console.log('Error inserting Row', error)
    return {
      message: 'Database Error: Failed to create customer',
    }
  }

  revalidatePath('/customers')
  redirect('/customers')
}

export async function updateCustomerAction(formData) {
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

export async function deleteCustomer(_, formData) {
  const id = formData.get('id')
  try {
    await deleteRow({ table: 'customers', client: supabase, id })
    revalidatePath('/customers')
    return {
      message: 'Cliente eliminado',
    }
  } catch (error) {
    return {
      message: 'Error eliminando cliente',
    }
  }
}
