'use server'
import { QuotationsModel, CustomersModel } from '@/models'
import type {
  QuotationClientCreate,
  QuotationClientUpdate,
  QuotationItem,
} from '@/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getRuc } from '../sunat'

export async function updateQuotationAction(
  quotation: QuotationClientUpdate,
  items: QuotationItem[],
): Promise<{ number: number }> {
  let customerId = quotation.customerId

  if (quotation.ruc && quotation.company && !customerId) {
    const { error, data } = await CustomersModel.create({
      name: quotation.company,
      ruc: quotation.ruc,
      address: quotation.address,
    })

    if (error) {
      throw error
    }

    customerId = data.id
  }

  const { data, error } = await QuotationsModel.update(quotation.id, {
    deadline: quotation.deadline,
    includeIgv: quotation.includeIgv,
    credit: quotation.credit,
    customerId,
    items,
    updatedAt: new Date(),
  })

  if (error) {
    throw error
  }

  revalidatePath(`/new-quos/${data.number}`)
  return { number: data.number }
}

export async function createQuotationAction(
  quotation: QuotationClientCreate,
  items: QuotationItem[],
): Promise<{ number: number }> {
  let customerId = quotation.customerId

  if (quotation.ruc && quotation.company && !customerId) {
    const { data, error } = await CustomersModel.create({
      name: quotation.company,
      ruc: quotation.ruc,
      address: quotation.address,
    })

    if (error) {
      throw error
    }

    customerId = data.id
  }

  const { data: lastQuotation, error: lastQuotationError } =
    await QuotationsModel.getLastQuotation()

  if (lastQuotationError) {
    throw lastQuotationError
  }

  const quoNumber = lastQuotation.number + 1

  const { error } = await QuotationsModel.create({
    number: quoNumber,
    deadline: quotation.deadline,
    includeIgv: quotation.includeIgv,
    credit: quotation.credit,
    customerId,
    items,
  })

  if (error) {
    throw error
  }

  revalidatePath('/new-quos')
  return { number: quoNumber }
}

export async function deleteQuotationAction(id: string) {
  // create supabase client
  await QuotationsModel.delete(id)

  revalidatePath('/new-quos')
  redirect(`/new-quos`)
}

export async function duplicateQuotationAction(
  id: string,
): Promise<{ number: number }> {
  const { data: quotation, error } = await QuotationsModel.getById(id)

  if (error) throw error

  const { data: lastQuotation, error: lastQuotationError } =
    await QuotationsModel.getLastQuotation()
  if (lastQuotationError) throw lastQuotationError

  const quoNumber = lastQuotation.number + 1
  await QuotationsModel.create({
    ...quotation,
    id: crypto.randomUUID(),
    number: quoNumber,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  revalidatePath('/new-quos')
  return { number: quoNumber }
  // redirect(`/new-quos/${lastQuotation.number}`)
}

export async function searchRucAction(ruc: string) {
  //search in customers Db
  const { data: customer, error } = await CustomersModel.getByRuc(ruc)

  if (error) throw error

  if (customer) {
    return {
      company: customer.name,
      address: customer.address,
      ruc: customer.ruc,
      customerIsFromDb: true,
      customerId: customer.id,
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

export async function setIsPaymentPending({
  id,
  value,
  quoNumber,
}: {
  id: string
  value: boolean
  quoNumber: number
}) {
  const { error } = await QuotationsModel.setIsPaymentPending(id, value)
  if (error) throw error

  revalidatePath(`/new-quos/${quoNumber}`)
}
