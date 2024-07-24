'use server'

import {
  type QuotationCreateType,
  type QuotationItemType,
  type QuotationType,
  type QuotationUpdateType,
} from '@/types'
import { Quotations, Customers } from '@/models'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateQuotationAction(
  quotation: QuotationUpdateType,
  items: QuotationItemType[],
): Promise<{ number: number }> {
  try {
    let customerId = null

    //insert customer to DB
    if (quotation.ruc && quotation.company) {
      //verify is custom already exists/
      const foundCustomer = await Customers.getByRuc(quotation.ruc)

      if (!foundCustomer) {
        const createdCustomer = await Customers.create({
          name: quotation.company,
          ruc: quotation.ruc,
          address: quotation.address,
        })

        customerId = createdCustomer.id
      }
    }

    //update quotation
    const updatedQuotation = await Quotations.update(quotation.id!, {
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
) {
  try {
    let customerId = null
    if (quotation.ruc && quotation.company) {
      //search customer by ruc in DB
      const customerFound = await Customers.getByRuc(quotation.ruc)

      if (customerFound) {
        customerId = customerFound.id
      } else {
        //if not exists add in DB
        const createdCustomer = await Customers.create({
          name: quotation.company,
          ruc: quotation.ruc,
          address: quotation.address,
        })

        customerId = createdCustomer.id
      }
    }

    const lastQuotation = await Quotations.getLastQuotation()

    const quoNumber = lastQuotation.number + 1

    await Quotations.create({
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
  await Quotations.delete(id)

  revalidateTag('/new-quos')
  redirect(`/new-quos`)
}

export async function duplicateQuotationAction(
  id: string,
): Promise<{ number: number }> {
  try {
    const quotation = await Quotations.getById(id)

    const lastQuotation = await Quotations.getLastQuotation()
    const quoNumber = lastQuotation.number + 1
    await Quotations.create({
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
