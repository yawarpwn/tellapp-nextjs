import { ITEMS_PER_PAGE } from '@/constants'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
export async function fetchFilteredAgencies({ query = '', currentPage = 1 }) {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

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
	const supabase = createClient(cookieStore)
	const { count, error } = await supabase.from('agencies').select('*', {
		count: 'exact',
	}).ilike('company', `%${query}%`)

	// handle error
	if (error) throw new Error('Failed to fetch total number of customers')

	if (count) {
		const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
		return totalPages
	} else {
		return 0
	}
}

export async function fetchAgencyById({ id }) {
	// crete supabse client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	// fetch agency by id
	const { data: agencies, error } = await supabase.from('agencies').select('*')
		.eq('id', id)

	// handle error
	if (error) throw new Error('Failed to fetch product by id ')

	return agencies[0]
}
