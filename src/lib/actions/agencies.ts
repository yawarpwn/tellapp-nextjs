'use server'

import { BASE_URL } from '@/constants'
import { fetchData } from '@/lib/utils'
import { AgencyInsert, AgencyUpdate } from '@/types'
import { revalidatePath } from 'next/cache'

export async function createAgencyAction(input: AgencyInsert) {
  await fetchData(`${BASE_URL}/api/agencies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
  revalidatePath('/new-agencies')
}

export async function deleteAgencyAction(id: string) {
  await fetchData(`${BASE_URL}/api/agencies/${id}`, {
    method: 'DELETE',
  })
  revalidatePath('/new-agencies')
}

export async function updateAgencyAction(id: string, input: AgencyUpdate) {
  await fetchData(`${BASE_URL}/api/agencies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
  revalidatePath('/new-agencies')
}
