import { fetchData } from '@/lib/utils'
import { BASE_URL } from '@/constants'
import type { Watermark } from '@/types'

export async function fetchWatermarkPhotos(): Promise<Watermark[]> {
  const data = await fetchData<{ items: Watermark[] }>(`${BASE_URL}/api/watermarks`)
  return data.items
}
