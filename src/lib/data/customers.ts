import { CustomersModel } from '@/models'
import type { Customer } from '@/types'

export async function fetchCustomers(): Promise<Customer[]> {
  const { data, error } = await CustomersModel.getAll()
  if (error) throw error
  return data
}
