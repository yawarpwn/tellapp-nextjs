'use server'

import { fetchData } from '@/lib/utils'
import { BASE_URL } from '@/constants'
import { LabelInsert, LabelUpdate } from '@/types'
import { revalidatePath } from 'next/cache'
import { getDni, getRuc } from '../sunat'

export async function createLabelAction(input: LabelInsert) {
  const cleanedPhone = input.phone
    ? input.phone.replace(/ /g, '').replace(' ', '').replace('+51', '')
    : null

  fetchData(`${BASE_URL}/api/labels`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...input,
      phone: cleanedPhone,
    }),
  })
  revalidatePath('/new-labels')
}

export async function deleteLabelAction(id: string) {
  await fetchData(`${BASE_URL}/api/labels/${id}`, {
    method: 'DELETE',
  })
  revalidatePath('/new-labels')
}

export async function updateLabelAction(id: string, input: LabelUpdate) {
  const cleanedPhone = input.phone
    ? input.phone.replace(/ /g, '').replace(' ', '').replace('+51', '')
    : null

  fetchData(`${BASE_URL}/api/labels/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...input,
      phone: cleanedPhone,
    }),
  })

  revalidatePath('/new-labels')
}

type Company = {
  ruc: string
  company: string
  address: string
}
export async function searchByDniOrRuc(dniRuc: string): Promise<Company> {
  try {
    const result = await fetchData<{
      id: string | undefined
      name: string
      address: string | undefined
      ruc: string
    }>(`${BASE_URL}/api/customers/search/${dniRuc}`)

    return {
      company: result.name,
      address: result.address || '',
      ruc: result.ruc,
    }
  } catch (error) {
    throw new Error('Error no se puede identificar  la razon social')
  }
}
