// import { ITEMS_PER_PAGE } from '@/constants'
import { ITEMS_PER_PAGE } from '@/constants'
import { createClient } from '@/lib/supabase/server'
import { type Product } from '@/types'
import { cookies } from 'next/headers'

export async function fetchFilteredProducts(
	{ query, currentPage }: { query: string; currentPage: number },
) {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const offset = (currentPage - 1) * ITEMS_PER_PAGE
	const { data: products, error } = await supabase
		.from('products')
		.select('*')
		.or(`description.ilike.%${query}%, code.ilike.${query}`)
		.range(offset, offset + ITEMS_PER_PAGE)
		.order('inserted_at', { ascending: false })
		.returns<Product[]>()

	// handle error
	if (error) throw new Error('Error fetching customers')

	return products
}

export async function fetchProductsPages(query: string) {
	// crate supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { count, error } = await supabase
		.from('products')
		.select('*', { count: 'exact' })
		.or(`description.ilike.%${query}%, code.ilike.${query}`)

	// handle error
	if (error) throw new Error('Failed to fetch total number of customers')

	if (count) {
		const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
		return totalPages
	} else {
		return 0
	}
}

export async function fetchProductById(
	{ id }: { id: string },
) {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	// get product from DB by id
	const { data: products, error } = await supabase.from('products').select('*')
		.eq('id', id)
		.returns<Product[]>()

	// handle error
	if (error) throw new Error('Failed to fetch product by id ')

	return products[0]
}
