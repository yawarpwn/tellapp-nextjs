import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import RealtimeQuotations from "@/components/realtime-quotations"
import Link from 'next/link'
import NewQuotation from "@/components/new-quotation"
export default async function Home() {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore})
  const {data } = await supabase.from('quotations').select().order('number', { ascending: false })
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-yellow-500">Cotizaciones</h1>
      <Link href='/quotations/create' className='btn btn-primary'>Create</Link>
      {/* <NewQuotation /> */}
      <RealtimeQuotations serverQuotations={data ?? []} />
    </div>
  )
}
