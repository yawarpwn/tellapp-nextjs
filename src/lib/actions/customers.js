'use server'

import z from 'zod'
// import { createClient } from '@supabase/supabase-js'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { deleteRow, insertRow, updateRow } from '@/services/supabase'

const CustomerSchema = z.object({
  name: z.coerce.number({
    invalid_type_error: 'El nombre debe ser un número',
  }),
  ruc: z.string(),
  address: z.string().optional(),
  phone: z.string(),
  email: z.string(),
})

const coookiesStore = cookies()
const supabase = createServerActionClient({ cookies: () => coookiesStore })

export async function createCustomer(_, formData) {

  const rawData = {
    name:  formData.get('name'),
    ruc : formData.get('ruc'),
    address : formData.get('address'),
    phone : formData.get('phone'),
    email : formData.get('email'),
  }

  const validatedFields = CustomerSchema.safeParse(rawData)


  if(!validatedFields.success) {
    return {
      errors:
        validatedFields.error.flatten()
          .fieldErrors,
      message:
        'Missing Fields. Failed to Create Invoice.',
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
      message: 'Database Error: Failed to create customer'
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
      message: 'Cliente eliminado'
    }
  } catch (error) {
    return {
      message: 'Error eliminando cliente',
    }
  }


}
