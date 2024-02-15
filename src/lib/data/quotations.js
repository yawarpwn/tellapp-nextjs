import { ITEMS_PER_PAGE } from '@/constants'
import { fetchCustomers } from '@/lib/data/customers'
import { createClient } from '@/lib/supabase/server'
import { isValidNumber } from '@/utils'
import { cookies } from 'next/headers'

const TABLE = 'quotations'

export async function fetchFilteredQuotations({ query = '', currentPage = 1 }) {
	query.trim()

	// Create supabaseClient
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const offset = (currentPage - 1) * ITEMS_PER_PAGE

	// Build query
	let queryBuilder = supabase.from(TABLE).select('*')
		.range(offset, offset + ITEMS_PER_PAGE)
		.order('number', {
			ascending: false,
		})

	// case is valid number
	if (isValidNumber(query)) {
		queryBuilder = queryBuilder.eq('number', query)
	} else {
		queryBuilder.ilike('company', `%${query}%`)
	}

	const { data: quotations, error } = await queryBuilder

	if (error) {
		throw new Error('Error fetching quotations')
	}

	const customers = await fetchCustomers()

	const isRegularCustomer = (ruc) =>
		customers.some(customer => customer.ruc === ruc)

	const mappedQuotations = quotations.map(quo => ({
		...quo,
		is_regular_customer: isRegularCustomer(quo.ruc),
	}))

	return mappedQuotations
}

export async function fetchQuotationsPages({ query = '' }) {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { count, error } = await supabase.from('quotations').select('*', {
		count: 'exact',
	}).ilike('company', `%${query}%`).limit(1)

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
	if (error) throw new Error('Failed to fetch quotation by id ')

	const quotation = quotations[0]
	const customers = await fetchCustomers()
	const isRegularCustomer = customers.some(c => c.ruc === quotation.ruc)
	return {
		...quotation,
		is_regular_customer: isRegularCustomer,
	}
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
	)

	// handle error
	if (error) throw new Error('Failed to fetch last quotation')

	return quotations[0]
}
