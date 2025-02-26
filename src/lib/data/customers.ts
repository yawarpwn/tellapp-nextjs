import { CustomersModel } from '@/models'
import type { Customer, RawCustomer } from '@/types'
import { fetchData } from '../utils'
import { BASE_URL } from '@/constants'

export async function fetchCustomers(): Promise<Customer[]> {
  const { items } = await fetchData<{ items: RawCustomer[] }>(
    `${BASE_URL}/api/customers?=onlyRegular=true`,
  )
  const mappedCustomers: Customer[] = items.map(prod => ({
    ...prod,
    createdAt: new Date(prod.createdAt),
    updatedAt: new Date(prod.updatedAt),
  }))

  return mappedCustomers
}
