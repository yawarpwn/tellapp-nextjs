import { ITEMS_PER_PAGE } from '@/constants'
import { TABLES } from '@/constants'
import { createServerClient } from '@/lib/supabase/server'
import { type CustomerType } from '@/types'
import { cookies } from 'next/headers'

export async function fetchCustomers() {
  // create supabase client
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data: customers, error } = await supabase
    .from(TABLES.Customers)
    .select()
    .order('updated_at', { ascending: false })
    .returns<CustomerType[]>()
  if (error) {
    console.log('ERRROR FETCHING CUSTOMERS: ', error)
    throw new Error('Error fetching customers')
  }
  return customers
}
export async function fetchFilteredCustomers({ query = '', currentPage = 1 }) {
  // create supabase client
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  const { data: customers, error } = await supabase
    .from('customers')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('created_at', { ascending: false })
    .limit(ITEMS_PER_PAGE)
    .range(offset, offset + ITEMS_PER_PAGE)

  // handle error
  if (error) throw new Error('Error fetching customers')

  return customers
}

export async function fetchCustomersPages(query = '') {
  // create supabase client
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { count, error } = await supabase
    .from('customers')
    .select('*', {
      count: 'exact',
    })
    .ilike('name', `%${query}%`)

  // handle error
  if (error) throw new Error('Failed to fetch total number of customers')

  if (count) {
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
    return totalPages
  } else {
    return 0
  }
}
