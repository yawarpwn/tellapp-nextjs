import { DataTable } from '@/components/data-table'
import { CreateProductDialog } from './_components/create-product-dialog'
import { productColumns } from './_components/product-columns'
import { PRODUCT_CATEGORIES } from '@/constants'
import { fetchProducts } from '@/lib/data/products'

export default async function Page() {
  const products = await fetchProducts()
  console.log('Total Products: ', products.length)
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
