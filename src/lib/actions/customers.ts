'use server'

import { CustomerInsert, CustomerUpdate } from '@/types'
import { revalidatePath } from 'next/cache'
import { CustomersModel } from '@/models'

export async function createCustomerAction(input: CustomerInsert): Promise<void> {
  const { error } = await CustomersModel.create(input)

  if (error) {
    throw error
  }
  revalidatePath('/new-customers')
}

export async function deleteCustomerAction(id: string) {
  try {
    await CustomersModel.delete(id)
    revalidatePath('/new-customers')
  } catch (error) {
    console.log('ERROR DELETING CUSTOMER: ', error)
  }
}

export async function updateCustomerAction(id: string, input: CustomerUpdate) {
  const { error } = await CustomersModel.update(id, input)
  if (error) throw error

  revalidatePath('/new-customers')
}

export async function setIsRegularCustomerAction({
  id,
  value,
  quoationNumber,
}: {
  id: string
  value: boolean
  quoationNumber?: number
}) {
  const { error } = await CustomersModel.toggleIsRegular(id, value)
  if (error) throw error
  if (quoationNumber) {
    revalidatePath(`/new-quos/${quoationNumber}`)
  }
  console.log('customer updated')
}
