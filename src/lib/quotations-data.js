import { ITEMS_PER_PAGE } from '@/constants'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function fetchFilteredQuotations({ query = '', currentPage = 1 }) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  try {
    let queryBuilder = supabase.from('quotations').select('*')
    if (query === '') {
      queryBuilder = queryBuilder.or(`company.ilike.%${query}%`)
    } else if (!isNaN(query)) {
      queryBuilder = queryBuilder.or(`number.eq.${Number(query)}`)
    } else {
      queryBuilder = queryBuilder.or(`company.ilike.%${query}%`)
    }
    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    const { data } = await queryBuilder
      .range(offset, offset + ITEMS_PER_PAGE)
      .order('number', { ascending: false })
    return data
  } catch (error) {
    console.log('Error Database', error)
    throw new Error('Error fetching customers')
  }
}

export async function fetchQuotationsPages({ query = '' }) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  //WARN: noStore()
  try {
    const { count } = await supabase
      .from('quotations')
      .select('*', { count: 'exact' })
      .ilike('company', `%${query}%`)
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.log('Database Error: ', error)
    throw new Error('Failed to fetch total number of customers')
  }
}

export async function fetchQuotationById({ id }) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  try {
    const { data } = await supabase.from('quotations').select('*').eq('id', id)
    return data[0]
  } catch (error) {
    console.log('Database Error: ', error)
    throw new Error('Failed to fetch product by id ')
  }
}
