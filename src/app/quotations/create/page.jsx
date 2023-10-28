import CreateUpdateQuotation from '@/app/create-update-quotation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

async function NewQuotation() {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore })
  const { data: serverCustomers } = await supabase
    .from('customers')
    .select()
    .order('name')

  return <CreateUpdateQuotation serverCustomers={serverCustomers} />
}

export default NewQuotation
