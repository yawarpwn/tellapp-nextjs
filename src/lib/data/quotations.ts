import { QuotationClient } from '@/types'
import { fetchData } from '@/lib/utils'
import { BASE_URL } from '@/constants'
import { RawQuotation } from '@/types'

export async function fetchQuotations(): Promise<QuotationClient[]> {
  const json = await fetchData<{ items: RawQuotation[] }>(`${BASE_URL}/api/quotations?limit=2000`)

  const quotationsMapped: QuotationClient[] = json.items.map(quo => {
    return {
      id: quo.id,
      number: quo.number,
      isRegularCustomer: quo.customer?.isRegular,
      deadline: quo.deadline,
      credit: quo.credit,
      includeIgv: quo.includeIgv,
      isPaymentPending: quo.isPaymentPending,
      items: quo.items.map(i => ({
        ...i,
        unit_size: i.unitSize,
      })),
      customerId: quo.customerId,
      company: quo.customer?.name,
      address: quo.customer?.address,
      ruc: quo.customer?.ruc,
      updatedAt: new Date(quo.updatedAt),
      createdAt: new Date(quo.createdAt),
    }
  })

  return quotationsMapped
}

export async function fetchQuotationByNumber(quotationNumber: number): Promise<QuotationClient> {
  const quo = await fetchData<RawQuotation>(`${BASE_URL}/api/quotations/${quotationNumber}`)

  return {
    id: quo.id,
    number: quo.number,
    isRegularCustomer: quo.customer?.isRegular,
    deadline: quo.deadline,
    credit: quo.credit,
    includeIgv: quo.includeIgv,
    isPaymentPending: quo.isPaymentPending,
    items: quo?.items.map(i => ({
      ...i,
      unit_size: i.unitSize,
    })),
    customerId: quo.customerId,
    company: quo.customer?.name,
    address: quo.customer?.address,
    ruc: quo.customer?.ruc,
    updatedAt: new Date(quo.updatedAt),
    createdAt: new Date(quo.createdAt),
  }
}

// export async function fetchQuotationById(id: string) {
//   const quotation = await QuotationsModel.getById(id)
//   return quotation
// }
//
// export async function fetchLastQuotation() {
//   // create supabase Client
//
//   const lastQuotation = await QuotationsModel.getLastQuotation()
//   return lastQuotation
// }
