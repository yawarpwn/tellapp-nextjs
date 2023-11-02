'use server'

import z from 'zod'
// import { createClient } from '@supabase/supabase-js'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { deleteRow, insertRow, updateRow } from '@/services/supabase'

export async function createAgencieAction(formData) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })
  const company = formData.get('company')
  const ruc = formData.get('ruc')
  const address = formData.get('address')

  const agencieToInsert = {
    company,
    ruc,
    address,
    destinations: [],
  }

  try {
    await insertRow({
      table: 'agencies',
      row: agencieToInsert,
      client: supabase,
    })
    revalidatePath('/')
  } catch (error) {
    console.log('ERror inserting Row', error)
  }
}

export async function updateAgencieAction(formData) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })
  const company = formData.get('company')
  const ruc = formData.get('ruc')
  const address = formData.get('address')
  const id = formData.get('id')

  const agencieToUpdate = {
    id,
    company,
    ruc,
    address,
    destinations: [],
  }

  try {
    await updateRow({
      client: supabase,
      table: 'agencies',
      row: agencieToUpdate,
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

export async function deleteAgencieAction(formData) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })
  const id = formData.get('id')
  console.log('>>>>id:', id)
  if (!id) return

  try {
    await deleteRow({ table: 'agencies', client: supabase, id })
    revalidatePath('/')
  } catch (error) {
    console.log('error deleting Agencie', formData)
  }
}
