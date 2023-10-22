'use server'

import z from 'zod'
// import { createClient } from '@supabase/supabase-js'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { deleteRow, insertRow, updateRow } from '@/services/supabase'
const supabase = createServerActionClient({ cookies })
export async function createAgencie(formData) {
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

export async function updateAgencie(formData) {
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

export async function deleteAgencieForm(formData) {
  const id = formData.get('id')
  if (!id) return

  try {
    deleteRow({ table: 'agencies', client: supabase, id })
    revalidatePath('/')
  } catch (error) {
    console.log('eRror inserting Row', error)
  }
}
