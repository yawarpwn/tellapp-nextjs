'use server'
import { BASE_URL } from '@/constants'
import { CustomerInsert, CustomerUpdate } from '@/types'
import { revalidatePath } from 'next/cache'
import { CustomersModel } from '@/models'
import { fetchData } from '@/lib/utils'

export async function createCustomerAction(input: CustomerInsert): Promise<void> {
  const { error } = await CustomersModel.create(input)

  if (error) {
    throw error
  }
  revalidatePath('/new-customers')
}

export async function deleteCustomerAction(id: string) {
  const { error } = await CustomersModel.delete(id)
  if (error) throw error
  revalidatePath('/new-customers')
}

export async function updateCustomerAction(id: string, input: CustomerUpdate) {
  const { error } = await CustomersModel.update(id, input)
  if (error) throw error

  revalidatePath('/new-customers')
}

export async function setIsRegularCustomerAction({
  customerId,
  value,
  quotationNumber,
}: {
  customerId: string
  value: boolean
  quotationNumber?: number
}) {
  const result = await fetchData(`${BASE_URL}/api/customers/${customerId}`, {
    method: 'PUT',
    body: JSON.stringify({
      isRegular: value,
    }),
  })

  if (quotationNumber) {
    revalidatePath(`/new-quos/${quotationNumber}`)
  }

  console.log('customer updated')
}
