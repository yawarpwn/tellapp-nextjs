import CreateUpdateQuotation from '@/app/create-update-quotation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

async function NewQuotation() {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore })
  const { data: serverCustomers } = await supabase.from('customers').select().order('name')
  const { data: quotations } = await supabase.from('quotations').select().order('number', {ascending: false})
  const lastQuotationNumber = quotations[0].number

  return <CreateUpdateQuotation serverCustomers={serverCustomers} lastQuotationNumber={lastQuotationNumber}  />
}

export default NewQuotation
