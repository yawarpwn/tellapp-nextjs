import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import RealtimeQuotations from './realtime-quotations'
import { notFound, redirect } from 'next/navigation'
export default async function Home() {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore })

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()

  // if (!session) {
  //   redirect('/login')
  // }

  // const { data: serverQuotations } = await supabase
  //   .from('quotations')
  //   .select()
  //   .order('number', { ascending: false })

  // if (!serverQuotations) {
  //   notFound()
  // }
  redirect('/quotations')

  // return (
  //   <>
  //     {/* <NewQuotation /> */}
  //     <RealtimeQuotations serverQuotations={serverQuotations ?? []} />
  //   </>
  // )
}
