import { ITEMS_PER_PAGE } from '@/constants'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function fetchFilteredQuotations({ query = '', currentPage = 1 }) {
	// Create supabaseClient
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	let queryBuilder = supabase.from('quotations').select('*')
	if (query === '') {
		queryBuilder = queryBuilder.or(`company.ilike.%${query}%`)
	} else if (!isNaN(query)) {
		queryBuilder = queryBuilder.or(`number.eq.${Number(query)}`)
	} else {
		queryBuilder = queryBuilder.or(`company.ilike.%${query}%`)
	}
	const offset = (currentPage - 1) * ITEMS_PER_PAGE
	const { data: quotations, error } = await queryBuilder.range(
		offset,
		offset + ITEMS_PER_PAGE,
	)
		.order('number', { ascending: false })

	// handle error
	if (error) throw new Error('Error fetching quotations')

	return quotations
}

export async function fetchQuotationsPages({ query = '' }) {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	// WARN: noStore()
	const { count, error } = await supabase.from('quotations').select('*', {
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

export async function fetchQuotationById({ number }) {
	// create supabase Client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { data: quotations, error } = await supabase.from('quotations').select()
		.eq(
			'number',
			Number(number),
		)
	if (error) throw new Error('Failed to fetch product by id ')

	return quotations[0]
}

export async function fetchLastQuotation() {
	// create supabase Client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { data: quotations, error } = await supabase.from('quotations').select(
		'number',
	).order(
		'number',
		{ ascending: false },
	).limit(1)

	// handle error
	if (error) throw new Error('Failed to fetch last quotation')

	return quotations[0]
}
