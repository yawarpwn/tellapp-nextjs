import { ITEMS_PER_PAGE } from '@/constants'
import { TABLES } from '@/constants'
import { fetchCustomers } from '@/lib/data/customers'
import { createClient } from '@/lib/supabase/server'
import { isValidNumber } from '@/lib/utils'
import type { QuotationType } from '@/types'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export async function fetchQuotations() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { data: quotations, error } = await supabase.from(TABLES.Quotations)
		.select()
		.order('number', { ascending: false })
		.returns<QuotationType[]>()

	if (error) {
		throw new Error('Error fetching quotations')
	}

	return quotations
}

export async function fetchFilteredQuotations({ query, currentPage }: {
	query: string
	currentPage: number
}) {
	query.trim()

	// Create supabaseClient
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const offset = (currentPage - 1) * ITEMS_PER_PAGE

	// Build query
	let queryBuilder = supabase.from(TABLES.Quotations).select('*')
		.range(offset, offset + ITEMS_PER_PAGE)
		.order('created_at', {
			ascending: false,
		})

	// case is valid number
	if (isValidNumber(query)) {
		queryBuilder = queryBuilder.eq('number', query)
	} else {
		queryBuilder.ilike('company', `%${query}%`)
	}

	const { data: quotations, error } = await queryBuilder.returns<
		QuotationType[]
	>()

	if (error) {
		throw new Error('Error fetching quotations')
	}

	const customers = await fetchCustomers()

	const isRegularCustomer = (ruc: string) =>
		customers.some(customer => customer.ruc === ruc)

	const mappedQuotations = quotations.map(quo => ({
		...quo,
		is_regular_customer: isRegularCustomer(quo.ruc),
	}))

	return mappedQuotations
}

export async function fetchQuotationsPages({ query }: { query: string }) {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { count, error } = await supabase.from(TABLES.Quotations).select('*', {
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

export async function fetchQuotationById(
	{ number }: { number: number },
) {
	// create supabase Client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: quotations, error } = await supabase.from(TABLES.Quotations)
		.select()
		.eq('number', number)
		.returns<QuotationType[]>()
	if (error) {
		// throw new Error('Failed to fetch quotation by id ')
		console.log(error)
		notFound()
	}

	if (quotations.length === 0) {
		notFound()
	}

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

	const { data: quotations, error } = await supabase.from(TABLES.Quotations)
		.select(
			'number',
		).order(
			'number',
			{ ascending: false },
		).limit(1)

	// handle error
	if (error) throw new Error('Failed to fetch last quotation')

	return quotations[0]
}
