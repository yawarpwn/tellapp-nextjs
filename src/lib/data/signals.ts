import { SignalsModel } from '@/models'
import type { SignalType } from '@/types'

export async function fetchSignals(): Promise<SignalType[]> {
  const { data, error } = await SignalsModel.getAll()
  if (error) throw error
  return data
}
