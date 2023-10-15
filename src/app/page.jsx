import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import RealtimeQuotations from '@/components/realtime-quotations'
import Link from 'next/link'
import NewQuotation from '@/components/new-quotation'
import { SearchIcon } from '@/icons'
export default async function Home() {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore })
  const { data } = await supabase
    .from('quotations')
    .select()
    .order('number', { ascending: false })
  return (
    <div>
      <header className='flex justify-between items-center'>
        <div className="group w-full flex flex-col sm:max-w-[40%]">
          <div className="h-full flex flex-col">
            <div className="inline-flex border border-foreground-300 px-2 min-h-[32px] h-8 rounded-lg  items-center w-full gap-1.5 group-hover:border-foreground-800">
              <SearchIcon />
              <input
                className="w-full h-full outline-none font-normal bg-transparent placeholder:text-foreground-500 text-xs"
                type="search"
              />
            </div>
          </div>
        </div>

        <Link href="/quotations/create" className="btn btn-primary">
          Create
        </Link>
      </header>
      {/* <NewQuotation /> */}
      <RealtimeQuotations serverQuotations={data ?? []} />
    </div>
  )
}
