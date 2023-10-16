import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import RealtimeProducts from '@/components/realtime-products'
export default async function Home() {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore })
  const { data } = await supabase
    .from('products')
    .select()
    .order('description', { ascending: false })
  return (
    <div>
      {/* <NewQuotation /> */}
      <RealtimeProducts serverProducts={data ?? []} />
    </div>
  )
}

