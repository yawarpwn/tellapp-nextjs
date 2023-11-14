import { notFound, redirect } from 'next/navigation'
export default async function Home() {
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

}
