'use server'

import {
  type QuotationCreateType,
  type QuotationItemType,
  type QuotationUpdateType,
} from '@/types'
import { QuotationsModel, CustomersModel } from '@/models'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { getRuc } from '../sunat'

export async function updateQuotationAction(
  quotation: QuotationUpdateType,
  items: QuotationItemType[],
): Promise<{ number: number }> {
  try {
    let customerId = null

    //insert customer to DB
    if (quotation.ruc && quotation.company) {
      //verify is custom already exists/
      const foundCustomer = await CustomersModel.getByRuc(quotation.ruc)

      if (foundCustomer) {
        customerId = foundCustomer.id
      } else {
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

    //update quotation
    const updatedQuotation = await QuotationsModel.update(quotation.id!, {
      deadline: quotation.deadline,
      number: quotation.number,
      includeIgv: quotation.include_igv,
      updatedAt: new Date(),
      customerId,
      credit: quotation.credit,
      items: items,
    })

    revalidatePath(`/new-quos/${quotation.number}`)
    return { number: updatedQuotation.number }
  } catch (error) {
    throw new Error('Error al Actualizar cotizacion')
  }
}

export async function createQuotationAction(
  quotation: QuotationCreateType,
  items: QuotationItemType[],
): Promise<{ number: number }> {
  try {
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

    await QuotationsModel.create({
      number: quoNumber,
      deadline: quotation.deadline,
      includeIgv: quotation.include_igv,
      credit: quotation.credit ? Number(quotation.credit) : null,
      customerId,
      items,
    })

    revalidatePath('/new-quos')
    return { number: quoNumber }
  } catch (error) {
    console.log(error)
    throw new Error('Error creando cotizacion')
  }
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
