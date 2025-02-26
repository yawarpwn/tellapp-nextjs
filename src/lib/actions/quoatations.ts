'use server'
import { QuotationsModel, CustomersModel } from '@/models'
import type {
  QuotationClientCreate,
  QuotationClientUpdate,
  QuotationItem,
  RawQuotation,
} from '@/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getRuc } from '../sunat'
import { BASE_URL } from '@/constants'
import { fetchData } from '@/lib/utils'
import { fetchQuotationByNumber } from '../data/quotations'

export async function updateQuotationAction(
  quotation: QuotationClientUpdate,
  items: QuotationItem[],
): Promise<{ number: number }> {
  const data = await fetchData(`${BASE_URL}/api/quotations/${quotation.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      deadline: quotation.deadline,
      credit: quotation.credit,
      includeIgv: quotation.includeIgv,
      customerId: quotation.customerId,
      isPaymentPending: quotation.isPaymentPending,
      customer: quotation.ruc
        ? {
            name: quotation.company,
            address: quotation.address,
            ruc: quotation.ruc,
          }
        : undefined,
      items: items.map(i => ({
        ...i,
        unitSize: i.unit_size,
      })),
    }),
  })

  revalidatePath(`/new-quos/${data.number}`)
  return { number: data.number }
}

export async function createQuotationAction(
  quotation: QuotationClientCreate,
  items: QuotationItem[],
): Promise<{ number: number }> {
  const result = await fetchData(`${BASE_URL}/api/quotations`, {
    method: 'POST',
    body: JSON.stringify({
      deadline: quotation.deadline,
      credit: quotation.credit,
      includeIgv: quotation.includeIgv,
      customerId: quotation.customerId,
      isPaymentPending: quotation.isPaymentPending,
      customer: quotation.ruc
        ? {
            name: quotation.company,
            address: quotation.address,
            ruc: quotation.ruc,
          }
        : undefined,
      items: items.map(i => ({
        ...i,
        unitSize: i.unit_size,
      })),
    }),
  })

  revalidatePath(`/new-quos/${result.insertedNumber}`)
  return { number: result.insertedNumber }
}

export async function deleteQuotationAction(quotationNumber: number): Promise<void> {
  await fetchData(`${BASE_URL}/api/quotations/${quotationNumber}`, {
    method: 'DELETE',
  })
  redirect(`/new-quos`)
}

export async function duplicateQuotationAction(quotationNumber: number): Promise<void> {
  const quo = await fetchData<RawQuotation>(`${BASE_URL}/api/quotations/${quotationNumber}`)

  const { insertedNumber } = await fetchData(`${BASE_URL}/api/quotations`, {
    method: 'POST',
    body: JSON.stringify({
      ...quo,
    }),
  })

  revalidatePath('/new-quos')
  redirect(`/new-quos/${insertedNumber}`)
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
