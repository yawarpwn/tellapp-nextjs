// import { ITEMS_PER_PAGE } from '@/constants'
import { type Product } from '@/types'
const ITEMS_PER_PAGE = 8
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function fetchFilteredProducts(
	{ query = '', currentPage = 1 },
): Promise<Product[]> {
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

	// handle error
	if (error) throw new Error('Error fetching customers')

	return products
}

export async function fetchProductsPages(query = '') {
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
): Promise<Product> {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	// get product from DB by id
	const { data: products, error } = await supabase.from('products').select('*')
		.eq('id', id)

	// handle error
	if (error) throw new Error('Failed to fetch product by id ')

	return products[0]
}
