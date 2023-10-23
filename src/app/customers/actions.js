'use server'

import z from 'zod'
// import { createClient } from '@supabase/supabase-js'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { deleteRow, insertRow, updateRow } from '@/services/supabase'
const supabase = createServerActionClient({ cookies })

export async function createCustomerAction(formData) {
  const name = formData.get('name')
  const ruc = formData.get('ruc')
  const address = formData.get('address')
  const phone = formData.get('phone')
  const email = formData.get('email')

  const customerToInsert = {
    name,
    ruc,
    address,
    phone,
    email,
  }

  try {
    await insertRow({
      table: 'customers',
      row: customerToInsert,
      client: supabase,
    })
    revalidatePath('/')
  } catch (error) {
    console.log('Error inserting Row', error)
  }
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

export async function deleteCustomerAction(formData) {
  const id = formData.get('id')
  if (!id) return

  try {
    await deleteRow({ table: 'customers', client: supabase, id })
    revalidatePath('/')
  } catch (error) {
    console.log('error deleting customer', formData)
  }
}
