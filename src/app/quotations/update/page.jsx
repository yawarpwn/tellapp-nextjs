import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { cookies } from 'next/headers'
import CreateUpdateQuotation from '@/components/create-update-quotation'

async function UpdatePage({ searchParams }) {
  const { id } = searchParams
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore })
  const { data: quotation } = await supabase
    .from('quotations')
    .select()
    .match({ id })
    .single()
  return <CreateUpdateQuotation serverQuotation={quotation} />
}

export default UpdatePage
