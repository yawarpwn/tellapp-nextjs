import { ITEMS_PER_PAGE } from '@/constants'
import { createServerClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
export async function fetchFilteredLabels({ query = '', currentPage = 1 }) {
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)
	try {
		const offset = (currentPage - 1) * ITEMS_PER_PAGE
		const { data: labels } = await supabase.from('labels').select(
			'*, agencies(*)',
		).ilike('recipient', `%${query}%`).limit(ITEMS_PER_PAGE).range(
			offset,
			offset + ITEMS_PER_PAGE,
		).order('created_at', { ascending: false })

		return labels
	} catch (error) {
		console.log('Error Database', error)
		throw new Error('Error fetching customers')
	}
}

export async function fetchLabelsPages(query = '') {
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)
	// WARN: noStore()
	try {
		const { count } = await supabase.from('labels').select('*', {
			count: 'exact',
		}).ilike('recipient', `%${query}%`)
		const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
		return totalPages
	} catch (error) {
		console.log('Database Error: ', error)
		throw new Error('Failed to fetch total number of customers')
	}
}

export async function fetchLabelsById({ id }) {
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	try {
		const { data } = await supabase.from('labels').select(`*, agencies (*)`).eq(
			'id',
			id,
		)
		return data[0]
	} catch (error) {
		console.log('Database Error: ', error)
		throw new Error('Failed to fetch product by id ')
	}
}
