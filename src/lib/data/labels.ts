import type { Label, RawLabel } from '@/types'
import { fetchData } from '@/lib/utils'
import { BASE_URL } from '@/constants'

export async function fetchLabels(): Promise<Label[]> {
  const { items } = await fetchData<{
    items: RawLabel[]
  }>(`${BASE_URL}/api/labels`)

  const mappedLabels: Label[] = items.map(label => ({
    id: label.id,
    address: label.address,
    agencyId: label.agencyId,
    destination: label.destination,
    dniRuc: label.dniRuc,
    observations: label.observations,
    phone: label.phone,
    recipient: label.recipient,
    createdAt: new Date(label.createdAt),
    updatedAt: new Date(label.updatedAt),
  }))

  return mappedLabels
}
