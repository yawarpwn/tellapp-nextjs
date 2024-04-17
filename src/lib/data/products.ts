// import { ITEMS_PER_PAGE } from '@/constants'
import { ITEMS_PER_PAGE } from '@/constants'
import { TABLES } from '@/constants'
import { createClient } from '@/lib/supabase/server'
import { ProductType } from '@/types'
import { cookies } from 'next/headers'

export async function fetchProducts() {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: products, error } = await supabase
		.from(TABLES.Products)
		.select()
		.order('rank', { ascending: false })
		.returns<ProductType[]>()

	if (error) {
		throw new Error('Error fetching products')
	}

	return products
}

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
		.returns<ProductType[]>()

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
		.returns<ProductType[]>()

	// handle error
	if (error) throw new Error('Failed to fetch product by id ')

	return products[0]
}
