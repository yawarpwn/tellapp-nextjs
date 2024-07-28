'use server'

import { CustomerInsert, CustomerUpdate } from '@/types'
import { revalidatePath } from 'next/cache'
import { CustomersModel } from '@/models'

export async function createCustomerAction(
  input: CustomerInsert,
): Promise<void> {
  const { data, message } = await CustomersModel.create(input)

  if (!data) {
    throw new Error(message)
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
  try {
    await CustomersModel.update(id, input)
    revalidatePath('/new-customers')
  } catch (error) {
    console.log('ERROR UPDATING CUSTOMER: ', error)
  }
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
  try {
    await CustomersModel.toggleIsRegular(id, value)
    if (quoationNumber) {
      revalidatePath(`/new-quos/${quoationNumber}`)
    }
    console.log('customer updated')
  } catch (error) {
    console.log('ERROR UPDATING CUSTOMER: ', error)
  }
}
