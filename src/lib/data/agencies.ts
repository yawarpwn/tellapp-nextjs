import { ITEMS_PER_PAGE } from '@/constants'
import { createServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function fetchAgencies() {
  // create supabase client
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  // fetch all agencieso
  const { data: agencies, error } = await supabase
    .from('agencies')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) throw new Error('Error fetching agencies')

  return agencies
}
export async function fetchFilteredAgencies({ query = '', currentPage = 1 }) {
  // create supabase client
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  // fetch filtered agencies
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  const { data: agencies, error } = await supabase
    .from('agencies')
    .select('*')
    .ilike('company', `%${query}%`)
    .limit(ITEMS_PER_PAGE)
    .range(offset, offset + ITEMS_PER_PAGE)
    .order('created_at', { ascending: true })

  // handle error
  if (error) throw new Error('Error fetching customers')

  return agencies
}

export async function fetchAgenciesPages(query = '') {
  // crete supabase client
  const cookieStore = cookies()

  // fetch total pages
  const supabase = createServerClient(cookieStore)
  const { count, error } = await supabase
    .from('agencies')
    .select('*', {
      count: 'exact',
    })
    .ilike('company', `%${query}%`)

  // handle error
  if (error) throw new Error('Failed to fetch total number of customers')

  if (count) {
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
    return totalPages
  } else {
    return 0
  }
}
