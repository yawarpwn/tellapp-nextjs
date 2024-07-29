'use server'

import { QuotationsModel, CustomersModel } from '@/models'
import type { Quotation, QuotationInsert, CustomerInsert } from '@/types'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { getRuc } from '../sunat'
// type QuotationInsert = {}

export async function createQuotationAction(
  quotation: Omit<QuotationInsert, 'number'>,
  customer?: CustomerInsert,
): Promise<{ number: number }> {
  let customerId = null

  if (customer) {
    const { data, message } = await CustomersModel.create(customer)
    if (!data) throw new Error(message)
    customerId = data.id
  }

  const lastQuotation = await QuotationsModel.getLastQuotation()
  const { data, message } = await QuotationsModel.create({
    ...quotation,
    number: lastQuotation.number + 1,
    customerId,
  })

  if (!data) throw new Error(message)

  return data
}

export async function updateQuotationAction(
  quotation: QuotationInsert,
  customer: CustomerInsert,
) {}

export async function deleteQuotationAction(id: string) {
  // create supabase client
  await QuotationsModel.delete(id)

  revalidateTag('/new-quos')
  redirect(`/new-quos`)
}

export async function duplicateQuotationAction(
  id: string,
): Promise<{ number: number }> {
  try {
    const quotation = await QuotationsModel.getById(id)

    const lastQuotation = await QuotationsModel.getLastQuotation()
    const quoNumber = lastQuotation.number + 1
    await QuotationsModel.create({
      ...quotation,
      id: crypto.randomUUID(),
      number: quoNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    revalidateTag('/new-quos')
    return { number: quoNumber }
    // redirect(`/new-quos/${lastQuotation.number}`)
  } catch (error) {
    console.log(error)
    throw new Error('Error duplicando cotizacion')
  }
}

export async function searchRucAction(ruc: string) {
  //search in customers Db
  const customer = await CustomersModel.getByRuc(ruc)

  if (customer) {
    return {
      company: customer.name,
      address: customer.address,
      ruc: customer.ruc,
      customerIsFromDb: true,
    }
  }

  const data = await getRuc(ruc)

  return {
    company: data.company,
    address: data.address,
    ruc: data.ruc,
    customerIsFromDb: false,
  }
}
