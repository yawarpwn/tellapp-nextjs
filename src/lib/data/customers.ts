import { ITEMS_PER_PAGE } from '@/constants'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function fetchCustomers() {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	// await new Promise(resolve => setTimeout(resolve, 1000))
	const { data: customers, error } = await supabase.from('customers').select()
	if (error) throw new Error('Error fetching customers')
	return customers
}
export async function fetchFilteredCustomers({ query = '', currentPage = 1 }) {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

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
	const supabase = createClient(cookieStore)
	const { count, error } = await supabase.from('customers').select('*', {
		count: 'exact',
	}).ilike('name', `%${query}%`)

	// handle error
	if (error) throw new Error('Failed to fetch total number of customers')

	if (count) {
		const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
		return totalPages
	} else {
		return 0
	}
}
