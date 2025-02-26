import { AgenciesModel } from '@/models/agencies'
import type { Agency, RawAgency } from '@/types'
import { fetchData } from '../utils'
import { BASE_URL } from '@/constants'

export async function fetchAgencies(): Promise<Agency[]> {
  const data = await fetchData<{ items: RawAgency[] }>(`${BASE_URL}/api/agencies`)
  return data.items
}
