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
  id: string,
  quotation: QuotationClientUpdate,
  items: QuotationItem[],
): Promise<{ number: number }> {
  let customerId = quotation.customerId

  if (quotation.ruc && quotation.company && !customerId) {
    const { data } = await CustomersModel.create({
      name: quotation.company,
      ruc: quotation.ruc,
      address: quotation.address,
    })

    if (!data) {
      throw new Error('Error al crear cliente')
    }

    customerId = data.id
  }

  const { data } = await QuotationsModel.update(id, {
    deadline: quotation.deadline,
    includeIgv: quotation.includeIgv,
    credit: quotation.credit,
    customerId,
    items,
  })

  if (!data) {
    throw new Error('Error creando cotizacion')
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
    const { data } = await CustomersModel.create({
      name: quotation.company,
      ruc: quotation.ruc,
      address: quotation.address,
    })

    if (!data) {
      throw new Error('Error al crear cliente')
    }

    customerId = data.id
  }

  const lastQuotation = await QuotationsModel.getLastQuotation()

  const quoNumber = lastQuotation.number + 1

  const { data } = await QuotationsModel.create({
    number: quoNumber,
    deadline: quotation.deadline,
    includeIgv: quotation.includeIgv,
    credit: quotation.credit,
    customerId,
    items,
  })

  if (!data) {
    throw new Error('Error creando cotizacion')
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

    revalidatePath('/new-quos')
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
