import { Quotation, QuotationClient } from '@/types'
import { QuotationsModel } from '@/models'

export async function fetchQuotations(): Promise<QuotationClient[]> {
  const { data, error } = await QuotationsModel.getAll()
  if (error) throw error
  return data
}

export async function fetchQuotationByNumber(quotationNumber: number) {
  const { data, error } = await QuotationsModel.getByNumber(quotationNumber)
  if (error) {
    throw error
  }
  return data
}

export async function fetchQuotationById(id: string) {
  const quotation = await QuotationsModel.getById(id)
  return quotation
}

export async function fetchLastQuotation() {
  // create supabase Client

  const lastQuotation = await QuotationsModel.getLastQuotation()
  return lastQuotation
}
