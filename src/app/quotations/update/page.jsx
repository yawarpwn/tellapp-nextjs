import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { cookies } from 'next/headers'
import CreateUpdateQuotation from '@/app/create-update-quotation'

async function UpdatePage({ searchParams }) {
  const { id } = searchParams
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore })
  const { data: serverCustomers } = await supabase
    .from('customers')
    .select()
    .order('name')
  const { data: serverQuotations } = await supabase
    .from('quotations')
    .select()
    .match({ id })
    .single()
  return <CreateUpdateQuotation serverQuotation={serverQuotations} serverCustomers={serverCustomers} />
}

export default UpdatePage
