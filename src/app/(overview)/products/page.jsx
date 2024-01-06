import { fetchProductsPages } from '@/lib/products-data'
import Pagination from '@/ui/pagination'
import { AddProductForm } from '@/ui/products'
import ProductTable from '@/ui/products/table'
import Search from '@/ui/search'
import { ProductsSkeleton } from '@/ui/skeletons/products'
import { Suspense } from 'react'

async function ProductsPage({ searchParams }) {
	const page = Number(searchParams?.page) || 1
	const query = searchParams?.query || ''
	const totalPages = await fetchProductsPages(query)
	return (
		<div className='flex flex-col gap-2'>
			<header className='flex items-center gap-2 justify-between'>
				<Search placeholder='Buscar producto...' />
				<AddProductForm />
				{/* <AddButton href={'/products/create'} /> */}
			</header>
			<Suspense fallback={<ProductsSkeleton />}>
				{/* <ProductsSkeleton /> */}
				<ProductTable query={query} currentPage={page} />
			</Suspense>
			<Pagination totalPages={totalPages} />
		</div>
	)
}

export default ProductsPage
