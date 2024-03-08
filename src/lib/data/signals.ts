const ITEMS_PER_PAGE = 8

import { cookies } from 'next/headers'
import { createClient } from '../supabase/server'

const SIGNALS_TABLE = 'signals'

export async function fetchSignals() {
	const cookiesStore = cookies()
	const supabase = createClient(cookiesStore)

	const { data: signals, error } = await supabase.from(SIGNALS_TABLE).select()

	if (error) {
		throw error
	}

	return signals
}

export async function fetchSignalsPages(query = '') {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { count, error } = await supabase
		.from(SIGNALS_TABLE)
		.select('*', { count: 'exact' })
		.or(`name.ilike.%${query}%, code.ilike.%${query}%`)

	if (error) {
		console.log(error)
	}

	return Math.ceil(count / ITEMS_PER_PAGE)
}

export async function fetchFilteredSignals(query: string, currentPage: number) {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const offset = (currentPage - 1) * ITEMS_PER_PAGE

	const { data: signals, error } = await supabase
		.from(SIGNALS_TABLE)
		.select()
		.or(`name.ilike.%${query}%, code.ilike.%${query}%`)
		.range(offset, offset + ITEMS_PER_PAGE)

	if (error) {
		console.log(error)
	}

	return signals
}
