import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import RealtimeQuotations from "@/components/realtime-quotations"
export default async function Home() {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore})
  const {data } = await supabase.from('quotations').select()
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-yellow-500">Tell AppPage</h1>
      <RealtimeQuotations serverQuotations={data ?? []} />
    </div>
  )
}
