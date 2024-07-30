'use server'

import { QuotationsModel, CustomersModel } from '@/models'
import type { QuotationClientCreate, QuotationItem } from '@/types'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { getRuc } from '../sunat'

// export async function updateQuotationAction(
//   quotation: QuotationInsert,
//   customer: CustomerInsert,
// ): Promise<{ number: number }> {}

export async function createQuotationAction(
  quotation: QuotationClientCreate,
  items: QuotationItem[],
): Promise<{ number: number }> {
  let customerId = null
  if (quotation.ruc && quotation.company) {
    //search customer by ruc in DB
    const customerFound = await CustomersModel.getByRuc(quotation.ruc)

    if (customerFound) {
      customerId = customerFound.id
    } else {
      //if not exists add in DB
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
  }

  const lastQuotation = await QuotationsModel.getLastQuotation()

  const quoNumber = lastQuotation.number + 1

  const { data } = await QuotationsModel.create({
    number: quoNumber,
    deadline: quotation.deadline,
    includeIgv: quotation.includeIgv,
    credit: quotation.credit ? Number(quotation.credit) : null,
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
