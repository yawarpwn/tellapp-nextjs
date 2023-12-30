import { ITEMS_PER_PAGE } from '@/constants'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
export async function fetchFilteredAgencies({ query = '', currentPage = 1 }) {
	const cookieStore = cookies()
	const supabase = createServerComponentClient({ cookies: () => cookieStore })

	try {
		const offset = (currentPage - 1) * ITEMS_PER_PAGE
		const { data } = await supabase
			.from('agencies')
			.select('*')
			.ilike('company', `%${query}%`)
			.limit(ITEMS_PER_PAGE)
			.range(offset, offset + ITEMS_PER_PAGE)
		return data
	} catch (error) {
		console.log('Error Database', error)
		throw new Error('Error fetching customers')
	}
}

export async function fetchAgenciesPages(query = '') {
	const cookieStore = cookies()
	const supabase = createServerComponentClient({ cookies: () => cookieStore })
	// WARN: noStore()
	try {
		const { count } = await supabase
			.from('agencies')
			.select('*', { count: 'exact' })
			.ilike('company', `%${query}%`)
		const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
		return totalPages
	} catch (error) {
		console.log('Database Error: ', error)
		throw new Error('Failed to fetch total number of customers')
	}
}

export async function fetchAgencyById({ id }) {
	const cookieStore = cookies()
	const supabase = createServerComponentClient({ cookies: () => cookieStore })

	try {
		const { data } = await supabase.from('agencies').select('*').eq('id', id)
		return data[0]
	} catch (error) {
		console.log('Database Error: ', error)
		throw new Error('Failed to fetch product by id ')
	}
}
