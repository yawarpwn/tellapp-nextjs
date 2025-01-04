import { WatermarkModel } from '@/models/watermarks'
import type { Watermark } from '@/types'

export async function fetchWatermarkPhotos(): Promise<Watermark[]> {
  const { data, error } = await WatermarkModel.getAll()
  if (error) throw error
  return data
}
