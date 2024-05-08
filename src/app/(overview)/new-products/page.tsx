import { DataTable } from '@/components/data-table'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { fetchProducts } from '@/lib/data/products'
import { Suspense } from 'react'
import { CreateProductDialog } from './_components/create-product-dialog'
import { productColumns } from './_components/product-columns'

async function ProductTable() {
	const products = await fetchProducts()

	return (
		<DataTable
			createComponent={<CreateProductDialog />}
			columns={productColumns}
			data={products}
		/>
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
			<ProductTable />
		</Suspense>
	)
}
