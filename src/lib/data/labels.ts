import { ITEMS_PER_PAGE } from '@/constants'
import { TABLES } from '@/constants'
import { createClient } from '@/lib/supabase/server'
import { LabelType } from '@/types'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export async function fetchLabels() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from(TABLES.Labels)
    .select('*, agencies(*)')
    .order('updated_at', { ascending: false })
    .returns<LabelType[]>()

  if (error) {
    console.log(error)
    throw new Error('Error fetching labels')
  }

  return data
}

export async function fetchFilteredLabels({ query = '', currentPage = 1 }) {
  // create supbase client
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // fetch filtered labels
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  const { data: labels, error } = await supabase
    .from('labels')
    .select('*, agencies(*)')
    .ilike('recipient', `%${query}%`)
    .limit(ITEMS_PER_PAGE)
    .range(offset, offset + ITEMS_PER_PAGE)
    .order('created_at', { ascending: false })

  // hanlde error
  if (error) throw new Error('Error fetching customers')

  return labels
}

export async function fetchLabelsPages(query = '') {
  // create supabase client
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // fetch total pages
  const { count, error } = await supabase
    .from('labels')
    .select('*', {
      count: 'exact',
    })
    .ilike('recipient', `%${query}%`)

  // handle error
  if (error) throw new Error('Failed to fetch total number of customers')

  if (count) {
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
    return totalPages
  } else {
    return 0
  }
}

export async function fetchLabelsById({ id }) {
  // create supabase client
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // fetch label by id
  const { data: labels, error } = await supabase
    .from('labels')
    .select(`*, agencies (*)`)
    .eq('id', id)

  // handle error
  if (error) {
    // throw new Error('Failed to fetch product by id ')
    notFound()
  }

  return labels[0]
}
