import { AgenciesModel } from '@/models/agencies'
import type { Agency } from '@/types'

export async function fetchAgencies(): Promise<Agency[]> {
  const { data, error } = await AgenciesModel.getAll()
  if (error) throw error
  return data
}
