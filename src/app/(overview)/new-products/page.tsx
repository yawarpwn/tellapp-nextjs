import { DataTable } from '@/components/data-table'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { Suspense } from 'react'
import { CreateProductDialog } from './_components/create-product-dialog'
import { productColumns } from './_components/product-columns'
import { ProductsModel } from '@/models/products'
import { notFound } from 'next/navigation'

async function ProductTable() {
  const { data: products, error } = await ProductsModel.getAll()

  if (error) {
    notFound()
  }

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
