import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import RealtimeQuotations from '@/components/realtime-quotations'
export default async function Home() {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore })
  const { data } = await supabase
    .from('quotations')
    .select()
    .order('number', { ascending: false })
  return (
    <div>
      {/* <NewQuotation /> */}
      <RealtimeQuotations serverQuotations={data ?? []} />
    </div>
  )
}
