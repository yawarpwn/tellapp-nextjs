'use server'

import { AgencyInsert, AgencyUpdate } from '@/types'
import { revalidatePath } from 'next/cache'
import { AgenciesModel } from '@/models/agencies'

export async function createAgencyAction(input: AgencyInsert) {
  const { error } = await AgenciesModel.create(input)
  if (error) throw error
  revalidatePath('/new-agencies')
}

export async function deleteAgencyAction(id: string) {
  const { error } = await AgenciesModel.delete(id)
  if (error) throw error
  revalidatePath('/new-agencies')
}

export async function updateAgencyAction(id: string, input: AgencyUpdate) {
  const { error } = await AgenciesModel.update(id, input)
  if (error) throw error
  revalidatePath('/new-agencies')
}
