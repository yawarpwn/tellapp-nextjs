import { TABLES } from '@/constants'
import { createServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { Quotations } from '@/models'

export async function fetchQuotations() {
  const quotations = await Quotations.getAll()
  return quotations
}

export async function fetchQuotationByNumber({ number }: { number: number }) {
  const quotation = await Quotations.getByNumber(number)
  return quotation
}

export async function fetchQuotationById(id: string) {
  const quotation = await Quotations.getById(id)
  return quotation
}

export async function fetchLastQuotation() {
  // create supabase Client
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const lastQuotation = await Quotations.getLastQuotation()
  return lastQuotation
}
