import { ITEMS_PER_PAGE } from '@/constants'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
export async function fetchFilteredLabels({ query = '', currentPage = 1 }) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    const { data: labels } = await supabase
      .from('labels')
      .select('*')
      .ilike('recipient', `%${query}%`)
      .limit(ITEMS_PER_PAGE)
      .range(offset, offset + ITEMS_PER_PAGE)
    // .order('inserted_at', { ascending: false })
    const labelsWithRelationship = await Promise.all(
      labels.map(async label => {
        if (label.suggested_agency) {
          const { data: agency } = await supabase
            .from('agencies')
            .select('*')
            .eq('id', label.suggested_agency)
            .single()
          if (agency) {
            return {
              ...label,
              suggested_agency: agency,
            }
          }
        }
        return label
      }),
    )
    return labelsWithRelationship
  } catch (error) {
    console.log('Error Database', error)
    throw new Error('Error fetching customers')
  }
}

export async function fetchLabelsPages(query = '') {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  //WARN: noStore()
  try {
    const { count } = await supabase
      .from('labels')
      .select('*', { count: 'exact' })
      .ilike('recipient', `%${query}%`)
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.log('Database Error: ', error)
    throw new Error('Failed to fetch total number of customers')
  }
}

export async function fetchLabelsById({ id }) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  try {
    const { data } = await supabase.from('labels').select('*').eq('id', id)
    return data[0]
  } catch (error) {
    console.log('Database Error: ', error)
    throw new Error('Failed to fetch product by id ')
  }
}
