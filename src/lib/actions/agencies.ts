'use server'
import { TABLES } from '@/constants'
import { createServerClient } from '@/lib/supabase'
import { AgencyCreateType, AgencyUpdateType } from '@/types'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function createAgencyAction(input: AgencyCreateType) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase.from(TABLES.Agencies).insert(input)
  if (error) {
    console.log('ERROR CREATING AGENCY: ', error)
    throw error
  }

  revalidatePath('/new-agencies')
}

export async function deleteAgencyAction(id: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase
    .from(TABLES.Agencies)
    .delete()
    .eq('id', id)

  if (error) {
    console.log('ERROR DELETING AGENCY: ', error)
    throw error
  }

  console.log('DELETED AGENCY SUCCESS: ', data)
  revalidatePath('/new-agencies')
}

export async function updateAgencyAction(input: AgencyUpdateType) {
  console.log({ input })
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase
    .from(TABLES.Agencies)
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', input.id)

  if (error) {
    console.log('ERROR UPDATING AGENCY: ', error)
    throw error
  }

  console.log(' UPDATED AGENCY SUCCESS: ', data)
  revalidatePath('/new-agencies')
}
