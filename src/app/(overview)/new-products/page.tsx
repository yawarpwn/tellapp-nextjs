import { DataTable } from '@/components/data-table'
import { CreateProductDialog } from './_components/create-product-dialog'
import { productColumns } from './_components/product-columns'
import { ProductsModel } from '@/models/products'
import { PRODUCT_CATEGORIES } from '@/constants'

export default async function Page() {
  const { data: products, error } = await ProductsModel.getAll()
  if (error) throw error
  return (
    <DataTable
      showCategory
      categories={PRODUCT_CATEGORIES}
      createComponent={<CreateProductDialog />}
      columns={productColumns}
      data={products}
    />
  )
}
