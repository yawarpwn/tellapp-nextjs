import { DataTableSkeleton } from '@/components/skeletons/data-table'

import { fetchProducts } from '@/lib/data/products'
import { Suspense } from 'react'
import { ProductsTable } from './_components/products-table'

async function ProductTablePage() {
	const products = await fetchProducts()
	return (
		<div>
			<ProductsTable data={products} />
		</div>
	)
}

export default async function Page() {
	return (
		<Suspense
			fallback={
				<DataTableSkeleton
					columnCount={5}
					rowCount={20}
					searchableColumnCount={1}
				/>
			}
		>
			<ProductTablePage />
		</Suspense>
	)
}
