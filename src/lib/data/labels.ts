import type { Label } from '@/types'
import { LabelsModel } from '@/models/labels'

export async function fetchLabels(): Promise<Label[]> {
  const { data, error } = await LabelsModel.getAll()
  if (error) throw error
  return data
}
