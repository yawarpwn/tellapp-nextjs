import { ITEMS_PER_PAGE } from '@/constants'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function fetchFilteredProducts({ query = '', currentPage = 1 }) {
	const cookieStore = cookies()
	const supabase = createServerComponentClient({ cookies: () => cookieStore })
	try {
		const offset = (currentPage - 1) * ITEMS_PER_PAGE
		const { data } = await supabase
			.from('products')
			.select('*')
			.or(`description.ilike.%${query}%, code.ilike.${query}`)
			.range(offset, offset + ITEMS_PER_PAGE)
			.order('inserted_at', { ascending: false })
		// .limit(ITEMS_PER_PAGE)
		//
		return data
	} catch (error) {
		console.log('Error Database', error)
		throw new Error('Error fetching customers')
	}
}

export async function fetchProductsPages(query = '') {
	const cookieStore = cookies()
	const supabase = createServerComponentClient({ cookies: () => cookieStore })
	// WARN: noStore()
	try {
		const { count } = await supabase
			.from('products')
			.select('*', { count: 'exact' })
			.or(`description.ilike.%${query}%, code.ilike.${query}`)
		const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
		return totalPages
	} catch (error) {
		console.log('Database Error: ', error)
		throw new Error('Failed to fetch total number of customers')
	}
}

export async function fetchProductById({ id }) {
	const cookieStore = cookies()
	const supabase = createServerComponentClient({ cookies: () => cookieStore })

	try {
		const { data } = await supabase.from('products').select('*').eq('id', id)
		return data[0]
	} catch (error) {
		console.log('Database Error: ', error)
		throw new Error('Failed to fetch product by id ')
	}
}
