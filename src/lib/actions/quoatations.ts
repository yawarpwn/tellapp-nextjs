'use server'

import { TABLES } from '@/constants'
import { createServerClient } from '@/lib/supabase/server'
import {
  QuotationCreateSchema,
  QuotationUpdateSchema,
} from '@/schemas/quotations'
import {
  type QuotationCreateType,
  type QuotationItemType,
  type QuotationType,
  type QuotationUpdateType,
} from '@/types'
import { Quotations, Customers } from '@/models'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  fetchLastQuotation,
  fetchQuotationById,
  fetchQuotationByNumber,
} from '../data/quotations'

export async function setQuotation(
  quotation: QuotationUpdateType,
  items: QuotationItemType[],
): Promise<[Error?, QuotationType?]> {
  try {
    let customerId = null

    //insert customer to DB
    if (quotation.ruc && quotation.company) {
      const createdCustomer = await Customers.create({
        name: quotation.company,
        ruc: quotation.ruc,
        address: quotation.address,
      })

      customerId = createdCustomer.id
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
    return [undefined, updatedQuotation]
  } catch (error) {
    return [new Error('Error al Actualizar')]
  }
}

export async function insertQuotation(
  quotation: QuotationCreateType,
  items: QuotationItemType[],
): Promise<[Error?, QuotationType?]> {
  try {
    let customerId = null
    if (quotation.ruc && quotation.company) {
      const createdCustomer = await Customers.create({
        name: quotation.company,
        ruc: quotation.ruc,
        address: quotation.address,
      })

      customerId = createdCustomer.id
    }

    const lastQuotation = await Quotations.getLastQuotation()

    const quotationToCreate = {}

    const createdQuotation = await Quotations.create({
      number: lastQuotation.number + 1,
      deadline: quotation.deadline,
      includeIgv: quotation.include_igv,
      credit: quotation.credit ? Number(quotation.credit) : null,
      customerId,
      items,
    })

    revalidatePath('/new-quos')
    return [undefined, createdQuotation]
  } catch (error) {
    return [new Error('Error creando cotizacion')]
  }
}

export async function deleteQuotationAction(id: string) {
  // create supabase client
  await Quotations.delete(id)

  revalidateTag('/new-quos')
  redirect(`/new-quos`)
}

export async function duplicateQuotationAction(id: string) {
  // create supabase client
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const quotation = await fetchQuotationById(id)
  const { is_regular_customer, ...restQuotation } = quotation

  const quotationToDuplicate = {
    ...restQuotation,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from(TABLES.Quotations)
    .insert(quotationToDuplicate)
    .select()

  if (error) {
    console.log('error duplicating', error)
    throw new Error('Error duplicando cotización')
  }

  if (!data) {
    console.log('no data')
    return
  }

  revalidateTag('/new-quos')
  redirect(`/new-quos/${data[0].number}`)
}

export async function duplicateQuotation(_: undefined, formData: FormData) {
  const number = Number(formData.get('number'))

  // create supabase client
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const quotation = await fetchQuotationByNumber({ number })
  const { number: lastQuotation } = await fetchLastQuotation()

  const dataToDuplicate = {
    number: lastQuotation + 1,
    company: quotation.company,
    ruc: quotation.ruc,
    address: quotation.address,
    deadline: quotation.deadline,
    items: quotation.items,
    include_igv: quotation.include_igv,
  }

  const { data, error } = await supabase
    .from(TABLES.Quotations)
    .insert(dataToDuplicate)

  if (error) {
    console.log(error)
    throw new Error('Error duplicando cotización')
  }

  redirect('/quotations')
}
