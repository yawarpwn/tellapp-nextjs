'use server'

import { TABLES } from '@/constants'
import { createServerClient } from '@/lib/supabase'
import { CustomerCreateType, CustomerUpdateType } from '@/types'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function createCustomerAction(
  input: CustomerCreateType,
): Promise<void> {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase.from(TABLES.Customers).insert(input)

  if (error) {
    console.log('ERROR CREATING CUSTOMER: ', error)
    throw error
  }

  console.log('INSERTED CUSTOMER SUCCESS: ', data)
  revalidatePath('/new-customers')
}

export async function deleteCustomerAction(id: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase
    .from(TABLES.Customers)
    .delete()
    .eq('id', id)

  if (error) {
    console.log('ERROR DELETING CUSTOMER: ', error)
    throw error
  }

  console.log('DELETED CUSTOMER SUCCESS: ', data)
  revalidatePath('/new-customers')
}

export async function updateCustomerAction(input: CustomerUpdateType) {
  console.log({ input })
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase
    .from(TABLES.Customers)
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', input.id)

  if (error) {
    console.log('ERROR UPDATING CUSTOMER: ', error)
    throw error
  }

  console.log(' UPDATED CUSTOMER SUCCESS: ', data)
  revalidatePath('/new-customers')
}
