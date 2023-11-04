import RealtimeQuotation from './realtime-quotation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

async function QuotationPage({ params }) {
  const cookiesStore = cookies()
  const { number } = params
  const supabase = createServerComponentClient({ cookies: () => cookiesStore })

  const { data: session } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  const { data: quotation } = await supabase
    .from('quotations')
    .select()
    .match({ number })
    .single()

  if (!quotation) {
    notFound()
  }

  return <RealtimeQuotation serverQuotation={quotation} />
}

export default QuotationPage
