import Pagination from '@/components/pagination'
import { AddProductForm } from '@/components/products'
import ProductTable from '@/components/products/table'
import Search from '@/components/search'
import { TableSkeleton } from '@/components/skeletons/table-skeleton'
import { fetchProductsPages } from '@/lib/data/products'
import { Suspense } from 'react'

async function ProductsPage({ searchParams }: {
	searchParams?: { page?: string; query?: string }
}) {
	const page = Number(searchParams?.page) || 1
	const query = searchParams?.query || ''
	const totalPages = await fetchProductsPages(query)
	return (
		<div className='flex flex-col gap-2'>
			<header className='flex items-center gap-2 justify-between mb-4'>
				<Search placeholder='Buscar producto...' searchValue={query} />
				<AddProductForm />
			</header>
			<Suspense key={query} fallback={<TableSkeleton />}>
				<ProductTable query={query} currentPage={page} />
			</Suspense>
			<Pagination totalPages={totalPages} />
		</div>
	)
}

export default ProductsPage
